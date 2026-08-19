import { LiturgicalColor, LiturgicalDay, CelebrationRank } from '../types/liturgia';

/**
 * Computus - Calculation of Easter Sunday according to the Western Gregorian calendar
 * (Anonymous Gregorian algorithm / Meeus/Jones/Butcher)
 */
export function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = March, 4 = April
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(Date.UTC(year, month - 1, day));
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

export function formatDateISO(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseDateISO(isoStr: string): Date {
  const [y, m, d] = isoStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

const DIAS_SEMANA = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
];

/**
 * Returns the Sunday Lectionary Cycle (A, B, C)
 * 2026 is Year A (starts 1st Advent 2025 until Christ the King 2026)
 */
export function getSundayCycle(date: Date): 'A' | 'B' | 'C' {
  const year = date.getUTCFullYear();
  // Check if date is in Advent (new liturgical year)
  const christmas = new Date(Date.UTC(year, 11, 25));
  const dayOfWeekChristmas = christmas.getUTCDay();
  const daysBeforeToSunday = dayOfWeekChristmas === 0 ? 28 : (dayOfWeekChristmas + 21);
  const adventStart = addDays(christmas, -daysBeforeToSunday);

  const effectiveYear = date >= adventStart ? year + 1 : year;
  const remainder = (effectiveYear - 2020) % 3;
  if (remainder === 0) return 'A'; // 2023, 2026
  if (remainder === 1) return 'B'; // 2024, 2027
  return 'C'; // 2025, 2028
}

/**
 * Returns the Weekday Lectionary Year (I or II)
 * Odd years = Year I, Even years = Year II
 */
export function getWeekdayYear(date: Date): 'I' | 'II' {
  const year = date.getUTCFullYear();
  return year % 2 === 0 ? 'II' : 'I';
}

/**
 * Computes liturgical metadata for any given calendar date
 */
export function getLiturgicalSeasonInfo(date: Date): {
  tiempo: string;
  color: LiturgicalColor;
  grado: CelebrationRank;
  tituloCelebracion: string;
  diaSemana: string;
  ciclo: 'A' | 'B' | 'C';
  anoFerial: 'I' | 'II';
} {
  const year = date.getUTCFullYear();
  const easter = calculateEaster(year);
  const ashWednesday = addDays(easter, -46);
  const palmSunday = addDays(easter, -7);
  const holyThursday = addDays(easter, -3);
  const goodFriday = addDays(easter, -2);
  const holySaturday = addDays(easter, -1);
  const easterOctaveEnd = addDays(easter, 7);
  const ascension = addDays(easter, 42); // celebrated 7th Sunday of Easter in most regions
  const pentecost = addDays(easter, 49);
  const trinitySunday = addDays(pentecost, 7);
  const corpusChristi = addDays(trinitySunday, 7);
  const sacredHeart = addDays(corpusChristi, 5);

  const christmas = new Date(Date.UTC(year, 11, 25));
  const dayOfWeekChristmas = christmas.getUTCDay();
  const daysBeforeToSunday = dayOfWeekChristmas === 0 ? 28 : (dayOfWeekChristmas + 21);
  const adventStart = addDays(christmas, -daysBeforeToSunday);
  
  // Previous year Christmas for Jan dates
  const prevChristmas = new Date(Date.UTC(year - 1, 11, 25));
  const epiphany = new Date(Date.UTC(year, 0, 6));
  // Baptism of the Lord: Sunday after Epiphany
  const baptismLord = addDays(epiphany, epiphany.getUTCDay() === 0 ? 7 : (7 - epiphany.getUTCDay()));

  const dayOfWeek = date.getUTCDay();
  const diaSemana = DIAS_SEMANA[dayOfWeek];
  const ciclo = getSundayCycle(date);
  const anoFerial = getWeekdayYear(date);

  const dateMs = date.getTime();

  // 1. Holy Week and Easter Triduum
  if (dateMs === palmSunday.getTime()) {
    return {
      tiempo: 'Semana Santa',
      color: 'Rojo',
      grado: 'Solemnidad',
      tituloCelebracion: 'Domingo de Ramos en la Pasión del Señor',
      diaSemana,
      ciclo,
      anoFerial,
    };
  }
  if (dateMs === holyThursday.getTime()) {
    return {
      tiempo: 'Triduo Pascual',
      color: 'Blanco',
      grado: 'Solemnidad',
      tituloCelebracion: 'Jueves Santo de la Cena del Señor',
      diaSemana,
      ciclo,
      anoFerial,
    };
  }
  if (dateMs === goodFriday.getTime()) {
    return {
      tiempo: 'Triduo Pascual',
      color: 'Rojo',
      grado: 'Solemnidad',
      tituloCelebracion: 'Viernes Santo en la Pasión del Señor',
      diaSemana,
      ciclo,
      anoFerial,
    };
  }
  if (dateMs === holySaturday.getTime()) {
    return {
      tiempo: 'Triduo Pascual',
      color: 'Blanco',
      grado: 'Solemnidad',
      tituloCelebracion: 'Sábado Santo - Solemne Vigilia Pascual',
      diaSemana,
      ciclo,
      anoFerial,
    };
  }
  if (dateMs === easter.getTime()) {
    return {
      tiempo: 'Pascua',
      color: 'Blanco',
      grado: 'Solemnidad',
      tituloCelebracion: 'Domingo de Resurrección del Señor',
      diaSemana,
      ciclo,
      anoFerial,
    };
  }

  // 2. Easter Octave
  if (dateMs > easter.getTime() && dateMs <= easterOctaveEnd.getTime()) {
    const isDomingo = dateMs === easterOctaveEnd.getTime();
    return {
      tiempo: 'Octava de Pascua',
      color: 'Blanco',
      grado: 'Solemnidad',
      tituloCelebracion: isDomingo ? 'Segundo Domingo de Pascua (o de la Divina Misericordia)' : `${diaSemana} de la Octava de Pascua`,
      diaSemana,
      ciclo,
      anoFerial,
    };
  }

  // 3. Easter Season
  if (dateMs > easterOctaveEnd.getTime() && dateMs <= pentecost.getTime()) {
    if (dateMs === pentecost.getTime()) {
      return {
        tiempo: 'Pascua',
        color: 'Rojo',
        grado: 'Solemnidad',
        tituloCelebracion: 'Domingo de Pentecostés',
        diaSemana,
        ciclo,
        anoFerial,
      };
    }
    const daysSinceEaster = Math.round((dateMs - easter.getTime()) / (1000 * 60 * 60 * 24));
    const weekOfEaster = Math.floor(daysSinceEaster / 7) + 1;
    return {
      tiempo: 'Pascua',
      color: 'Blanco',
      grado: dayOfWeek === 0 ? 'Domingo' : 'Feria',
      tituloCelebracion: dayOfWeek === 0 ? `${weekOfEaster}° Domingo de Pascua` : `${diaSemana} de la ${weekOfEaster}ª semana de Pascua`,
      diaSemana,
      ciclo,
      anoFerial,
    };
  }

  // 4. Lent
  if (dateMs >= ashWednesday.getTime() && dateMs < palmSunday.getTime()) {
    if (dateMs === ashWednesday.getTime()) {
      return {
        tiempo: 'Cuaresma',
        color: 'Morado',
        grado: 'Feria',
        tituloCelebracion: 'Miércoles de Ceniza',
        diaSemana,
        ciclo,
        anoFerial,
      };
    }
    const daysSinceAsh = Math.round((dateMs - ashWednesday.getTime()) / (1000 * 60 * 60 * 24));
    const weekOfLent = Math.floor((daysSinceAsh + 3) / 7);
    const isLaetare = weekOfLent === 4 && dayOfWeek === 0;
    return {
      tiempo: 'Cuaresma',
      color: isLaetare ? 'Rosa' : 'Morado',
      grado: dayOfWeek === 0 ? 'Domingo' : 'Feria',
      tituloCelebracion: dayOfWeek === 0 ? `${weekOfLent}° Domingo de Cuaresma${isLaetare ? ' (Laetare)' : ''}` : `${diaSemana} de la ${weekOfLent}ª semana de Cuaresma`,
      diaSemana,
      ciclo,
      anoFerial,
    };
  }

  // 5. Advent
  if (dateMs >= adventStart.getTime() && dateMs < christmas.getTime()) {
    const daysSinceAdventStart = Math.round((dateMs - adventStart.getTime()) / (1000 * 60 * 60 * 24));
    const weekOfAdvent = Math.floor(daysSinceAdventStart / 7) + 1;
    const isGaudete = weekOfAdvent === 3 && dayOfWeek === 0;
    return {
      tiempo: 'Adviento',
      color: isGaudete ? 'Rosa' : 'Morado',
      grado: dayOfWeek === 0 ? 'Domingo' : 'Feria',
      tituloCelebracion: dayOfWeek === 0 ? `${weekOfAdvent}° Domingo de Adviento${isGaudete ? ' (Gaudete)' : ''}` : `${diaSemana} de la ${weekOfAdvent}ª semana de Adviento`,
      diaSemana,
      ciclo,
      anoFerial,
    };
  }

  // 6. Christmas Season
  if (dateMs >= christmas.getTime() || dateMs <= baptismLord.getTime()) {
    const isChristmasDay = date.getUTCMonth() === 11 && date.getUTCDate() === 25;
    const isMaryMotherOfGod = date.getUTCMonth() === 0 && date.getUTCDate() === 1;
    const isEpiphany = date.getUTCMonth() === 0 && date.getUTCDate() === 6;
    const isBaptism = dateMs === baptismLord.getTime();

    if (isChristmasDay) {
      return {
        tiempo: 'Navidad',
        color: 'Blanco',
        grado: 'Solemnidad',
        tituloCelebracion: 'La Natividad del Señor (Navidad)',
        diaSemana,
        ciclo,
        anoFerial,
      };
    }
    if (isMaryMotherOfGod) {
      return {
        tiempo: 'Navidad',
        color: 'Blanco',
        grado: 'Solemnidad',
        tituloCelebracion: 'Santa María, Madre de Dios',
        diaSemana,
        ciclo,
        anoFerial,
      };
    }
    if (isEpiphany) {
      return {
        tiempo: 'Navidad',
        color: 'Blanco',
        grado: 'Solemnidad',
        tituloCelebracion: 'La Epifanía del Señor',
        diaSemana,
        ciclo,
        anoFerial,
      };
    }
    if (isBaptism) {
      return {
        tiempo: 'Navidad',
        color: 'Blanco',
        grado: 'Fiesta',
        tituloCelebracion: 'El Bautismo del Señor',
        diaSemana,
        ciclo,
        anoFerial,
      };
    }

    return {
      tiempo: 'Navidad',
      color: 'Blanco',
      grado: dayOfWeek === 0 ? 'Domingo' : 'Feria',
      tituloCelebracion: `${diaSemana} del Tiempo de Navidad`,
      diaSemana,
      ciclo,
      anoFerial,
    };
  }

  // 7. Special Solemnities in Ordinary Time
  if (dateMs === trinitySunday.getTime()) {
    return {
      tiempo: 'Tiempo Ordinario',
      color: 'Blanco',
      grado: 'Solemnidad',
      tituloCelebracion: 'La Santísima Trinidad',
      diaSemana,
      ciclo,
      anoFerial,
    };
  }
  if (dateMs === corpusChristi.getTime()) {
    return {
      tiempo: 'Tiempo Ordinario',
      color: 'Blanco',
      grado: 'Solemnidad',
      tituloCelebracion: 'El Santísimo Cuerpo y Sangre de Cristo (Corpus Christi)',
      diaSemana,
      ciclo,
      anoFerial,
    };
  }
  if (dateMs === sacredHeart.getTime()) {
    return {
      tiempo: 'Tiempo Ordinario',
      color: 'Blanco',
      grado: 'Solemnidad',
      tituloCelebracion: 'El Sagrado Corazón de Jesús',
      diaSemana,
      ciclo,
      anoFerial,
    };
  }

  // 8. Ordinary Time (Default)
  // Approximate week computation based on calendar progression
  const weekApprox = Math.min(34, Math.max(1, Math.floor(((date.getUTCMonth() * 30 + date.getUTCDate()) / 365) * 34)));
  const isChristKing = weekApprox === 34 && dayOfWeek === 0;

  if (isChristKing) {
    return {
      tiempo: 'Tiempo Ordinario',
      color: 'Blanco',
      grado: 'Solemnidad',
      tituloCelebracion: 'Jesucristo, Rey del Universo (XXXIV Domingo Ordinario)',
      diaSemana,
      ciclo,
      anoFerial,
    };
  }

  return {
    tiempo: 'Tiempo Ordinario',
    color: 'Verde',
    grado: dayOfWeek === 0 ? 'Domingo' : 'Feria',
    tituloCelebracion: dayOfWeek === 0 ? `${weekApprox}° Domingo del Tiempo Ordinario` : `${diaSemana} de la ${weekApprox}ª semana del Tiempo Ordinario`,
    diaSemana,
    ciclo,
    anoFerial,
  };
}

export function getColorHex(color: LiturgicalColor): { bg: string; text: string; border: string; accent: string } {
  switch (color) {
    case 'Verde':
      return { bg: 'bg-emerald-800', text: 'text-emerald-800', border: 'border-emerald-700', accent: '#166534' };
    case 'Blanco':
      return { bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-400', accent: '#b45309' };
    case 'Morado':
      return { bg: 'bg-purple-900', text: 'text-purple-900', border: 'border-purple-800', accent: '#6b21a8' };
    case 'Rojo':
      return { bg: 'bg-rose-800', text: 'text-rose-800', border: 'border-rose-700', accent: '#9f1239' };
    case 'Rosa':
      return { bg: 'bg-pink-600', text: 'text-pink-700', border: 'border-pink-500', accent: '#db2777' };
    case 'Negro':
      return { bg: 'bg-stone-900', text: 'text-stone-900', border: 'border-stone-800', accent: '#1c1917' };
    default:
      return { bg: 'bg-emerald-800', text: 'text-emerald-800', border: 'border-emerald-700', accent: '#166534' };
  }
}
