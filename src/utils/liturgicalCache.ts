import { LiturgicalDay } from '../types/liturgia';

const DB_NAME = 'LiturgiaPRO_LibrarianDB_v3';
const DB_VERSION = 3;
const STORE_NAME = 'liturgical_days';
const LOCAL_STORAGE_KEY = 'liturgia_pro_cached_days_v3';

/**
 * Opens or initializes the IndexedDB database.
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'fecha' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Checks if a given liturgical day has generic/fallback placeholder texts.
 */
export function isDayGeneric(day?: LiturgicalDay | null): boolean {
  if (!day || !day.liturgia_palabra) return true;

  const p1 = day.liturgia_palabra.primera_lectura?.texto || '';
  const ev = day.liturgia_palabra.evangelio?.texto || '';
  const p1Cita = day.liturgia_palabra.primera_lectura?.cita || '';
  const evCita = day.liturgia_palabra.evangelio?.cita || '';

  // Detect any placeholder markers
  if (
    p1Cita.includes('Lectura bíblica del Leccionario') ||
    p1Cita.includes('Lectura bíblica de la feria') ||
    p1Cita.includes('Lectura bíblica') ||
    p1.includes('Proclamación de la Palabra de Dios según el Leccionario Oficial.') ||
    p1.includes('Proclamación de la Palabra de Dios.') ||
    p1.includes('La gracia de Dios se ha manifestado para la salvación de todos los hombres') ||
    ev.includes('Jesús se manifestó a sus discípulos...') ||
    evCita === 'Lectura del santo Evangelio'
  ) {
    return true;
  }

  return false;
}

/**
 * Saves a liturgical day into persistent storage (IndexedDB + LocalStorage backup).
 */
export async function saveLiturgicalDayToCache(day: LiturgicalDay): Promise<void> {
  if (!day || !day.fecha || isDayGeneric(day)) return;

  // 1. Try IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(day);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB write error, using LocalStorage fallback:', err);
  }

  // 2. LocalStorage backup
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      const map: Record<string, LiturgicalDay> = raw ? JSON.parse(raw) : {};
      map[day.fecha] = day;
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(map));
    }
  } catch (err) {
    console.warn('LocalStorage write error:', err);
  }
}

/**
 * Retrieves a cached liturgical day from storage if available.
 */
export async function getCachedLiturgicalDay(date: string): Promise<LiturgicalDay | null> {
  if (!date) return null;

  // 1. Try IndexedDB first
  try {
    const db = await openDB();
    const result = await new Promise<LiturgicalDay | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(date);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });

    if (result) {
      if (isDayGeneric(result)) return null;
      return result;
    }
  } catch (err) {
    // IndexedDB not ready or error, continue to LocalStorage
  }

  // 2. Fallback to LocalStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const map: Record<string, LiturgicalDay> = JSON.parse(raw);
        if (map[date]) {
          if (isDayGeneric(map[date])) return null;
          return map[date];
        }
      }
    }
  } catch (err) {
    console.warn('LocalStorage read error:', err);
  }

  return null;
}

/**
 * Bulk save multiple liturgical days to storage.
 */
export async function saveBulkDaysToCache(days: LiturgicalDay[]): Promise<void> {
  for (const day of days) {
    await saveLiturgicalDayToCache(day);
  }
}

/**
 * Retrieves all stored liturgical days.
 */
export async function getAllCachedDays(): Promise<LiturgicalDay[]> {
  const days: LiturgicalDay[] = [];

  try {
    const db = await openDB();
    const result = await new Promise<LiturgicalDay[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });

    if (result && result.length > 0) return result;
  } catch (err) {
    // Fallback to localstorage
  }

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const map: Record<string, LiturgicalDay> = JSON.parse(raw);
        return Object.values(map);
      }
    }
  } catch (err) {
    // Ignore
  }

  return days;
}

/**
 * Clear the cache.
 */
export async function clearLiturgicalCache(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    // Ignore
  }

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch (err) {
    // Ignore
  }
}
