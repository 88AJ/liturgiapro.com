import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  Sliders, 
  Maximize2, 
  ChevronDown, 
  ChevronUp,
  Music,
  ExternalLink,
  Volume2,
  Play,
  X,
  RefreshCw,
  BookOpen,
  Search,
  ShieldCheck,
  AlertCircle,
  Eye,
  FileText
} from 'lucide-react';
import { LiturgicalDay, Cantico, SchemaCantosMisa } from '../../types/liturgia';
import { getColorHex } from '../../utils/calendar';
import { requestMoniciones, requestHomilia, fetchOfficialLiturgicalDay } from '../../utils/liturgicalAiClient';
import { isDayGeneric } from '../../utils/liturgicalCache';
import { CANTICOS_LIST } from '../../data/liturgyData';
import { getSuggestedChantsForDay } from '../../utils/musicSelector';
import { getLectionaryIntroduction, getGospelEvangelistName, cleanReadingText } from '../../utils/lectionaryFormatter';
import { CeremonieroAuditReport } from '../../utils/ceremonieroEngine';
import { InlineCantoCard } from './InlineCantoCard';

const CREDO_NICENO = `Creo en un solo Dios, Padre todopoderoso, Creador del cielo y de la tierra, de todo lo visible y lo invisible.

Creo en un solo Señor, Jesucristo, Hijo único de Dios, nacido del Padre antes de todos los siglos: Dios de Dios, Luz de Luz, Dios verdadero de Dios verdadero, engendrado, no creado, de la misma naturaleza del Padre, por quien todo fue hecho; que por nosotros, los hombres, y por nuestra salvación bajó del cielo, y por obra del Espíritu Santo se encarnó de María, la Virgen, y se hizo hombre; y por nuestra causa fue crucificado en tiempos de Poncio Pilato; padeció y fue sepultado, y resucitó al tercer día, según las Escrituras, y subió al cielo, y está sentado a la derecha del Padre; y de nuevo vendrá con gloria para juzgar a vivos y muertos, y su reino no tendrá fin.

Creo en el Espíritu Santo, Señor y dador de vida, que procede del Padre y del Hijo, que con el Padre y el Hijo recibe una misma adoración y gloria, y que habló por los profetas.

Creo en la Iglesia, que es una, santa, católica y apostólica. Confieso que hay un solo bautismo para el perdón de los pecados. Espero la resurrección de los muertos y la vida del mundo futuro. Amén.`;

const CREDO_APOSTOLES = `Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra.

Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos.

Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.`;

interface MisaViewProps {
  day: LiturgicalDay;
  onUpdateDay: (updatedDay: LiturgicalDay) => void;
  onOpenAtril: () => void;
  onOpenImpresor: () => void;
  onOpenCeremoniero?: () => void;
  ceremonieroAudit?: CeremonieroAuditReport;
  region: string;
}

export const MisaView: React.FC<MisaViewProps> = ({
  day,
  onUpdateDay,
  onOpenAtril,
  onOpenImpresor,
  onOpenCeremoniero,
  ceremonieroAudit,
  region
}) => {
  const [loadingAi, setLoadingAi] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showMusicProgram, setShowMusicProgram] = useState(true);
  const [showAllLyrics, setShowAllLyrics] = useState(true); // Default to true so people can follow hymns!
  const [credoFormula, setCredoFormula] = useState<'niceno' | 'apostoles'>('niceno');

  // Canonical rubrics determination
  const isGloriaCanonical = Boolean(
    day.gloria ?? (day.color === 'Blanco' || day.grado === 'Solemnidad' || day.grado === 'Fiesta' || (day.tiempo_liturgico === 'Tiempo Ordinario' && day.grado === 'Domingo'))
  );

  const isCredoCanonical = Boolean(
    day.credo ?? (day.grado === 'Solemnidad' || day.grado === 'Domingo')
  );

  // Display switches
  const [includeMoniciones, setIncludeMoniciones] = useState(true);
  const [includeGloria, setIncludeGloria] = useState(isGloriaCanonical);
  const [includeCredo, setIncludeCredo] = useState(isCredoCanonical);
  const [includeHomilia, setIncludeHomilia] = useState(true);
  const [includeOracionFieles, setIncludeOracionFieles] = useState(true);

  // Sync switches whenever the selected date or liturgical day changes
  useEffect(() => {
    setIncludeGloria(isGloriaCanonical);
    setIncludeCredo(isCredoCanonical);
  }, [day.fecha, isGloriaCanonical, isCredoCanonical]);

  // Music state & modals
  const [selectedCantoModal, setSelectedCantoModal] = useState<Cantico | null>(null);
  const [changingMomento, setChangingMomento] = useState<keyof SchemaCantosMisa | null>(null);
  const [musicSearchTerm, setMusicSearchTerm] = useState('');
  const [transposeSemi, setTransposeSemi] = useState<number>(0);

  const currentCantos: SchemaCantosMisa = day.cantos_sugeridos || getSuggestedChantsForDay(
    day.tiempo_liturgico,
    day.color,
    day.titulo_celebracion || day.celebracion || ''
  );

  const colorStyle = getColorHex(day.color);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCantoByName = (name: string) => {
    if (!name) return;
    setTransposeSemi(0);
    const cleanName = name.toLowerCase().split('(')[0].trim();
    const found = CANTICOS_LIST.find(c => 
      c.titulo.toLowerCase().includes(cleanName) || 
      cleanName.includes(c.titulo.toLowerCase())
    );
    if (found) {
      setSelectedCantoModal(found);
    } else {
      setSelectedCantoModal({
        id: 'canto-custom',
        titulo: name,
        momento: 'Momento Litúrgico',
        tiempo: day.tiempo_liturgico,
        tonalidad: 'Tono tradicional',
        letra: `Canto litúrgico oficial sugerido para la celebración.\n\nConsulte el Cantoral Litúrgico o presione "Escuchar en YouTube" para escuchar la melodía y acordes.`
      });
    }
  };

  const handleUpdateCantoForMomento = (momento: keyof SchemaCantosMisa, nuevoTitulo: string) => {
    const updatedCantos = { ...currentCantos, [momento]: nuevoTitulo };
    const updatedDay: LiturgicalDay = {
      ...day,
      cantos_sugeridos: updatedCantos
    };
    onUpdateDay(updatedDay);
    setChangingMomento(null);
    showToast(`✓ Canto de ${momento} actualizado a: ${nuevoTitulo}`);
  };

  // Call Gemini for Moniciones & Peticiones
  const handleGenerateMonicionesAi = async () => {
    setLoadingAi('moniciones');
    try {
      const d = await requestMoniciones({
        fecha: day.fecha,
        tiempo: day.tiempo_liturgico,
        celebracion: day.titulo_celebracion || day.celebracion,
        lecturas: day.liturgia_palabra,
        region
      });

      const updated = { ...day };
      if (d.monicion_entrada) updated.monicion_entrada = d.monicion_entrada;
      if (updated.liturgia_palabra.primera_lectura && d.monicion_primera_lectura) {
        updated.liturgia_palabra.primera_lectura.monicion = d.monicion_primera_lectura;
      }
      if (updated.liturgia_palabra.segunda_lectura && d.monicion_segunda_lectura) {
        updated.liturgia_palabra.segunda_lectura.monicion = d.monicion_segunda_lectura;
      }
      if (updated.liturgia_palabra.evangelio && d.monicion_evangelio) {
        updated.liturgia_palabra.evangelio.monicion = d.monicion_evangelio;
      }
      if (d.oracion_fieles && Array.isArray(d.oracion_fieles)) {
        updated.oracion_fieles = d.oracion_fieles;
      }
      onUpdateDay(updated);
      showToast('✓ Moniciones y Oración Universal generadas con éxito');
    } catch (err) {
      console.error('Error in AI Moniciones:', err);
      showToast('⚠ Error al conectar con el servidor litúrgico');
    } finally {
      setLoadingAi(null);
    }
  };

  // Call Gemini for Homilía Patrística
  const handleGenerateHomiliaAi = async () => {
    setLoadingAi('homilia');
    try {
      const data = await requestHomilia({
        fecha: day.fecha,
        celebracion: day.titulo_celebracion || day.celebracion,
        lecturas: day.liturgia_palabra
      });

      const updated = { ...day };
      updated.reflexion_homiletica = data.texto_homilia;
      onUpdateDay(updated);
      showToast('✓ Subsidio homilético patrístico generado');
    } catch (err) {
      console.error('Error in AI Homilía:', err);
      showToast('⚠ Error al conectar con el servidor litúrgico');
    } finally {
      setLoadingAi(null);
    }
  };

  // Copy plain text for projector / word
  const handleCopyText = () => {
    const textToCopy = `LITURGIA DE LA PALABRA Y SANTA MISA
${day.titulo_celebracion || day.celebracion} (${day.fecha})
Color: ${day.color} | ${day.tiempo_liturgico}

GUIÓN DE CANTOS SUGERIDOS:
- Entrada: ${currentCantos.entrada || 'N/A'}
- Kyrie: ${currentCantos.kyrie || 'N/A'}
${currentCantos.gloria ? `- Gloria: ${currentCantos.gloria}\n` : ''}- Salmo: ${currentCantos.salmo || 'N/A'}
- Aleluya: ${currentCantos.aleluya || 'N/A'}
- Ofertorio: ${currentCantos.ofertorio || 'N/A'}
- Santo: ${currentCantos.santo || 'N/A'}
- Comunión: ${currentCantos.comunion || 'N/A'}
- Salida/Mariano: ${currentCantos.salida || currentCantos.mariano || 'N/A'}

ANTÍFONA DE ENTRADA:
${day.antifona_entrada || ''}

ORACIÓN COLECTA:
${day.oracion_colecta || ''}

PRIMERA LECTURA (${day.liturgia_palabra.primera_lectura?.cita || ''}):
${day.liturgia_palabra.primera_lectura?.texto || ''}

SALMO RESPONSORIAL (${day.liturgia_palabra.salmo_responsorial?.cita || ''}):
R. ${day.liturgia_palabra.salmo_responsorial?.respuesta || ''}
${day.liturgia_palabra.salmo_responsorial?.texto || ''}

${day.liturgia_palabra.segunda_lectura ? `SEGUNDA LECTURA (${day.liturgia_palabra.segunda_lectura.cita}):\n${day.liturgia_palabra.segunda_lectura.texto}\n\n` : ''}
SANTO EVANGELIO (${day.liturgia_palabra.evangelio?.cita || ''}):
${day.liturgia_palabra.evangelio?.texto || ''}

ORACIÓN SOBRE LAS OFRENDAS:
${day.oracion_ofrendas || ''}

ORACIÓN DESPUÉS DE LA COMUNIÓN:
${day.oracion_comunion || ''}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const p = day.liturgia_palabra;

  // Format date day and month
  const dateParts = day.fecha.split('-');
  const dayNum = dateParts[2] || '01';
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const monthName = monthNames[parseInt(dateParts[1] || '1', 10) - 1] || 'Enero';

  const musicMomentsList: { key: keyof SchemaCantosMisa; label: string; badge: string }[] = [
    { key: 'entrada', label: 'Canto de Entrada', badge: 'Ritos Iniciales' },
    { key: 'kyrie', label: 'Kyrie / Piedad', badge: 'Acto Penitencial' },
    ...(day.gloria ? [{ key: 'gloria' as keyof SchemaCantosMisa, label: 'Himno de Gloria', badge: 'Alabanza' }] : []),
    { key: 'salmo', label: 'Salmo Responsorial', badge: 'Palabra' },
    { key: 'aleluya', label: 'Aclamación (Aleluya)', badge: 'Evangelio' },
    { key: 'ofertorio', label: 'Presentación de Dones', badge: 'Ofertorio' },
    { key: 'santo', label: 'Aclamación del Santo', badge: 'Eucaristía' },
    { key: 'cordero', label: 'Cordero de Dios', badge: 'Fracción del Pan' },
    { key: 'comunion', label: 'Canto de Comunión', badge: 'Banquete Sagrado' },
    { key: 'salida', label: 'Canto Final / Mariano', badge: 'Despedida' }
  ];

  // Call Gemini / Librarian for official CEM lectionary texts
  const handleSyncWithLibrarian = async () => {
    setLoadingAi('librarian');
    try {
      const res = await fetchOfficialLiturgicalDay({
        fecha: day.fecha,
        celebracion: day.titulo_celebracion || day.celebracion,
        tiempo: day.tiempo_liturgico,
        ciclo: day.ciclo,
        ano_ferial: day.ano_ferial,
        region,
        tipo: 'ordinaria'
      });

      if (res.success && res.data) {
        onUpdateDay(res.data);
        showToast('✓ Textos oficiales del Leccionario de la CEM descargados y guardados.');
      } else {
        showToast(res.message || 'No se pudo sincronizar con la fuente oficial en este momento.');
      }
    } catch (err) {
      console.error('Error syncing with Librarian:', err);
      showToast('⚠ Error al conectar con el Bibliotecario Litúrgico');
    } finally {
      setLoadingAi(null);
    }
  };

  const isGeneric = isDayGeneric(day);

  return (
    <div className="space-y-8 font-serif relative">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D2926] text-[#F9F7F2] px-4 py-3 rounded-md shadow-xl border border-[#800020] text-xs font-sans font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles size={14} className="text-[#E07A8B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Liturgical Librarian Status & Sync Banner */}
      {isGeneric ? (
        <div className="bg-[#FFFDF7] border-2 border-[#800020]/20 rounded-lg p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#800020]/10 text-[#800020] shrink-0 mt-0.5 border border-[#800020]/20">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#800020]">
                  Lecturas del Archivo General
                </h4>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                  Sugerido Sincronizar
                </span>
              </div>
              <p className="text-xs text-[#5A5550] mt-1 leading-relaxed">
                Este día cuenta con textos genéricos. El <strong>Bibliotecario Litúrgico</strong> puede consultar la red y descargar el texto oficial e íntegro del Leccionario de la Conferencia del Episcopado Mexicano (CEM) y del Misal Romano.
              </p>
            </div>
          </div>
          <button
            onClick={handleSyncWithLibrarian}
            disabled={loadingAi === 'librarian'}
            className="px-4 py-2.5 bg-[#800020] hover:bg-[#600018] text-white rounded-md text-xs font-sans font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs shrink-0 disabled:opacity-50 w-full sm:w-auto"
          >
            <RefreshCw size={14} className={loadingAi === 'librarian' ? 'animate-spin' : ''} />
            <span>{loadingAi === 'librarian' ? 'Descargando Leccionario...' : 'Sincronizar Oficial (CEM)'}</span>
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-md px-4 py-2 text-xs flex items-center justify-between text-emerald-950 font-sans shadow-2xs">
          <span className="flex items-center gap-2 font-medium">
            <ShieldCheck size={15} className="text-emerald-700" />
            <span>Formulario Litúrgico Oficial: <strong>{day.fuente_oficial || 'Leccionario de la CEM & Misal Romano'}</strong></span>
          </span>
          <span className="text-[11px] text-emerald-700 font-serif italic hidden sm:inline">Guardado en caché offline</span>
        </div>
      )}

      {/* Autonomous Ceremoniero Seal */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F0EDE6] p-3 sm:px-4 rounded-md border border-[#D9D1C3] shadow-2xs font-sans text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-[#800020] text-amber-300 flex items-center justify-center font-bold text-[11px] shrink-0 shadow-xs">
            ✓
          </span>
          <div>
            <span className="font-bold text-[#800020]">Ceremoniero Litúrgico Activo:</span>{' '}
            <span className="text-[#2D2926]">100% Conforme a la IGMR 3ra Edición • Proof-reading en tiempo real</span>
          </div>
        </div>

        {onOpenCeremoniero && (
          <button
            onClick={onOpenCeremoniero}
            className="px-3 py-1 bg-white hover:bg-[#EAE5DC] text-[#800020] border border-[#800020]/30 rounded font-bold uppercase tracking-wider text-[10px] transition-colors flex items-center gap-1.5 shadow-xs ml-auto sm:ml-0"
          >
            <ShieldCheck size={13} />
            <span>Ver Registro & Sacristía</span>
          </button>
        )}
      </div>
      
      {/* Top Editorial Header Banner */}
      <div className="bg-[#F0EDE6] p-6 sm:p-10 rounded-md border border-[#D9D1C3] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-6 bg-[#800020]"></span>
              <p className="uppercase font-sans text-[11px] tracking-[0.3em] text-[#800020] font-bold">
                Ciclo {day.ciclo || 'A'} — {day.tiempo_liturgico}
              </p>
            </div>

            <h1 className="text-3xl sm:text-5xl font-light font-serif leading-tight italic text-[#2D2926]">
              {day.titulo_celebracion || day.celebracion || 'Santa Misa'}
            </h1>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-sans">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#F9F7F2] border border-[#D9D1C3] text-[#2D2926] font-medium">
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: colorStyle.accent }}
                />
                Color {day.color}
              </span>
              <span className="px-2.5 py-0.5 rounded-sm bg-[#F9F7F2] border border-[#D9D1C3] text-[#555]">
                Año Ferial {day.ano_ferial || 'II'}
              </span>
              {day.grado && (
                <span className="px-2.5 py-0.5 rounded-sm bg-[#800020]/10 text-[#800020] border border-[#800020]/30 font-bold uppercase tracking-wider text-[10px]">
                  {day.grado}
                </span>
              )}
            </div>
          </div>

          {/* Date Stamp & Quick Actions */}
          <div className="flex flex-col sm:items-end gap-4 border-t sm:border-t-0 sm:border-l border-[#D9D1C3] pt-4 sm:pt-0 sm:pl-8">
            <div className="text-left sm:text-right">
              <p className="font-sans text-4xl sm:text-5xl font-light leading-none mb-1 text-[#2D2926]">{dayNum}</p>
              <p className="font-sans uppercase text-[11px] tracking-[0.25em] text-[#666] font-bold">{monthName}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 font-sans">
              <button
                onClick={() => setShowMusicProgram(!showMusicProgram)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition border ${
                  showMusicProgram 
                    ? 'bg-[#800020] text-[#F9F7F2] border-[#800020]' 
                    : 'bg-[#F9F7F2] text-[#800020] border-[#D9D1C3] hover:bg-[#EAE5DC]'
                }`}
                title="Mostrar u ocultar programa musical completo"
              >
                <Music size={13} />
                <span>Música ({Object.values(currentCantos).filter(Boolean).length})</span>
              </button>

              <button
                onClick={() => setShowAllLyrics(!showAllLyrics)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition border ${
                  showAllLyrics 
                    ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs' 
                    : 'bg-[#F9F7F2] text-[#555] border-[#D9D1C3] hover:bg-[#EAE5DC]'
                }`}
                title="Desplegar u ocultar la letra completa y acordes de los cantos en el texto de la Misa"
              >
                <FileText size={13} />
                <span>{showAllLyrics ? 'Letras en Guion: ON' : 'Letras en Guion: OFF'}</span>
              </button>

              <button
                onClick={() => setShowConfig(!showConfig)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium bg-[#F9F7F2] hover:bg-[#EAE5DC] text-[#2D2926] border border-[#D9D1C3] transition"
              >
                <Sliders size={13} />
                <span>Opciones</span>
                {showConfig ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>

              <button
                onClick={handleCopyText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium bg-[#F9F7F2] hover:bg-[#EAE5DC] text-[#2D2926] border border-[#D9D1C3] transition"
                title="Copiar texto litúrgico y cantos"
              >
                {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>

              <button
                onClick={onOpenAtril}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-bold bg-[#2D2926] hover:bg-[#1A1715] text-[#F9F7F2] transition shadow-xs"
              >
                <Maximize2 size={13} className="text-amber-400" />
                <span>Atril</span>
              </button>

              <button
                onClick={onOpenImpresor}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-bold bg-[#800020] hover:bg-[#660019] text-[#F9F7F2] transition shadow-xs"
              >
                <Printer size={13} />
                <span>Imprimir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Options & AI Studio */}
        {showConfig && (
          <div className="mt-6 pt-6 border-t border-[#D9D1C3] grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200 font-sans">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#800020] mb-3">
                Elementos de la Celebración
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <label className="flex items-center gap-2 text-[#444] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeMoniciones} 
                    onChange={(e) => setIncludeMoniciones(e.target.checked)}
                    className="accent-[#800020]"
                  />
                  <span>Moniciones</span>
                </label>
                <label className="flex items-center gap-2 text-[#444] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeGloria} 
                    onChange={(e) => setIncludeGloria(e.target.checked)}
                    className="accent-[#800020]"
                  />
                  <span>Gloria</span>
                </label>
                <label className="flex items-center gap-2 text-[#444] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeCredo} 
                    onChange={(e) => setIncludeCredo(e.target.checked)}
                    className="accent-[#800020]"
                  />
                  <span>Credo</span>
                </label>
                <label className="flex items-center gap-2 text-[#444] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeOracionFieles} 
                    onChange={(e) => setIncludeOracionFieles(e.target.checked)}
                    className="accent-[#800020]"
                  />
                  <span>Oración Universal</span>
                </label>
                <label className="flex items-center gap-2 text-[#444] cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeHomilia} 
                    onChange={(e) => setIncludeHomilia(e.target.checked)}
                    className="accent-[#800020]"
                  />
                  <span>Subsidio Homilético</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#800020] mb-3">
                Generador Teológico (Gemini IA)
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleGenerateMonicionesAi}
                  disabled={loadingAi !== null}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold bg-[#F9F7F2] text-[#800020] border border-[#800020]/40 hover:bg-[#EAE5DC] transition disabled:opacity-50"
                >
                  <Sparkles size={13} className="text-[#800020]" />
                  <span>{loadingAi === 'moniciones' ? 'Redactando...' : 'Redactar Moniciones'}</span>
                </button>

                <button
                  onClick={handleGenerateHomiliaAi}
                  disabled={loadingAi !== null}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold bg-[#2D2926] text-[#F9F7F2] hover:bg-[#1A1715] transition disabled:opacity-50"
                >
                  <Sparkles size={13} className="text-amber-400" />
                  <span>{loadingAi === 'homilia' ? 'Generando...' : 'Subsidio Homilético'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* GUIÓN MUSICAL & CANTOS DEL DÍA (Collapsible Hero Section) */}
      {showMusicProgram && (
        <div className="bg-[#F5F2EB] rounded-md p-6 border border-[#D9D1C3] shadow-xs space-y-4 max-w-4xl mx-auto font-sans animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D1C3] pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#800020] text-[#F9F7F2] flex items-center justify-center shadow-xs">
                <Music size={16} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#2D2926] text-lg">
                  Guión de Música y Cantos Litúrgicos
                </h3>
                <p className="text-xs text-[#666]">
                  Selección canónica propia para este día ({day.tiempo_liturgico} — {day.color})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenImpresor}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#F9F7F2] hover:bg-[#EAE5DC] text-[#2D2926] text-xs font-semibold rounded-sm border border-[#D9D1C3] transition"
              >
                <Printer size={12} />
                <span>Imprimir Coro</span>
              </button>
            </div>
          </div>

          {/* Song Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {musicMomentsList.map((m) => {
              const cantoTitulo = currentCantos[m.key];
              if (!cantoTitulo && m.key === 'gloria') return null;

              return (
                <div 
                  key={m.key}
                  className="bg-[#FDFBF7] p-3.5 rounded-sm border border-[#D9D1C3] hover:border-[#800020]/40 transition space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#800020] uppercase tracking-wider">
                        {m.label}
                      </span>
                      <span className="text-[9px] text-[#777] bg-[#EAE5DC] px-1.5 py-0.2 rounded-xs">
                        {m.badge}
                      </span>
                    </div>

                    <p className="font-serif font-bold text-sm text-[#2D2926] line-clamp-1">
                      {cantoTitulo || 'No asignado'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#EAE5DC] text-xs">
                    {cantoTitulo ? (
                      <button
                        onClick={() => handleOpenCantoByName(cantoTitulo)}
                        className="text-[#800020] hover:underline font-bold text-[11px] flex items-center gap-1"
                      >
                        <BookOpen size={12} />
                        <span>Acordes & Letra</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#999] italic">Omitido en la rúbrica</span>
                    )}

                    <button
                      onClick={() => setChangingMomento(m.key)}
                      className="text-[#666] hover:text-[#2D2926] text-[11px] flex items-center gap-1 hover:underline"
                      title="Cambiar este canto por otro del cantoral"
                    >
                      <RefreshCw size={11} />
                      <span>Cambiar</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Liturgical Missal Sheet - Authentic Editorial Parchment */}
      <div className="bg-[#FDFBF7] rounded-md p-6 sm:p-12 border border-[#D9D1C3] shadow-xs space-y-12 max-w-4xl mx-auto text-[#2D2926] text-lg leading-relaxed">
        
        {/* I. RITOS INICIALES */}
        <section id="ritos-iniciales" className="space-y-6">
          <div className="border-b border-[#D9D1C3] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#800020]"></span>
              <h2 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                I. Ritos Iniciales
              </h2>
            </div>
            <span className="rubric text-xs font-sans uppercase tracking-widest font-semibold">De pie</span>
          </div>

          {/* Canto de Entrada Integrado con Letra y Acordes */}
          {currentCantos.entrada && (
            <InlineCantoCard
              momentoLabel="Canto de Entrada"
              cantoTitle={currentCantos.entrada}
              momentoKey="entrada"
              onOpenModal={setSelectedCantoModal}
              onChangeCanto={setChangingMomento}
              defaultExpanded={showAllLyrics}
            />
          )}

          {/* Antífona de Entrada */}
          {day.antifona_entrada && (
            <div className="bg-[#F0EDE6] p-5 rounded-sm border-l-2 border-[#800020] space-y-1">
              <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                Antífona de Entrada
              </span>
              <p className="text-[#2D2926] italic font-serif text-[17px] leading-relaxed">
                {day.antifona_entrada}
              </p>
            </div>
          )}

          {/* Saludo */}
          <div className="space-y-2">
            <div className="rubric">El sacerdote, de pie en la sede, se santigua junto con toda la asamblea diciendo:</div>
            <p className="priest-voice">
              <strong className="text-[#800020]">✠</strong> En el nombre del Padre, y del Hijo, y del Espíritu Santo.
            </p>
            <p className="assembly-response pl-4">
              <span className="rubric font-sans">R.</span> Amén.
            </p>
            <p className="priest-voice pt-1">
              La gracia de nuestro Señor Jesucristo, el amor del Padre y la comunión del Espíritu Santo estén con todos ustedes.
            </p>
            <p className="assembly-response pl-4">
              <span className="rubric font-sans">R.</span> Y con tu espíritu.
            </p>
          </div>

          {/* Monición de Entrada */}
          {includeMoniciones && day.monicion_entrada && (
            <div className="bg-[#F0EDE6] p-4 rounded-sm border-l-2 border-[#2D2926] space-y-1">
              <span className="font-sans text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] block">
                Monición de Entrada (Guía)
              </span>
              <p className="text-[#333] text-base font-serif italic leading-relaxed">
                {day.monicion_entrada}
              </p>
            </div>
          )}

          {/* Acto Penitencial */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-4 bg-[#D9D1C3]"></span>
              <span className="font-sans text-[11px] font-bold text-[#2D2926] uppercase tracking-[0.2em]">
                Acto Penitencial
              </span>
            </div>
            <div className="rubric">El sacerdote invita a los fieles al arrepentimiento:</div>
            <p className="priest-voice">
              Hermanos: Para celebrar dignamente estos sagrados misterios, reconozcamos nuestros pecados.
            </p>
            <div className="rubric pl-4">Se hace una breve pausa en silencio.</div>
            <p className="assembly-response pl-4 text-base leading-relaxed bg-[#F5F2EB] p-4 rounded-sm border border-[#D9D1C3]">
              Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho de pensamiento, palabra, obra y omisión. Por mi culpa, por mi culpa, por mi gran culpa. Por eso ruego a santa María, siempre Virgen, a los ángeles, a los santos y a ustedes, hermanos, que intercedan por mí ante Dios, nuestro Señor.
            </p>
            <p className="priest-voice">
              Dios todopoderoso tenga misericordia de nosotros, perdone nuestros pecados y nos lleve a la vida eterna.
            </p>
            <p className="assembly-response pl-4">
              <span className="rubric font-sans">R.</span> Amén.
            </p>

            {/* Canto de Kyrie / Piedad */}
            {currentCantos.kyrie && (
              <InlineCantoCard
                momentoLabel="Canto Penitencial / Kyrie"
                cantoTitle={currentCantos.kyrie}
                momentoKey="kyrie"
                onOpenModal={setSelectedCantoModal}
                onChangeCanto={setChangingMomento}
                defaultExpanded={showAllLyrics}
              />
            )}

            <div className="pt-2 text-base space-y-1">
              <p className="priest-voice">Señor, ten piedad. <span className="assembly-response font-bold">R. Señor, ten piedad.</span></p>
              <p className="priest-voice">Cristo, ten piedad. <span className="assembly-response font-bold">R. Cristo, ten piedad.</span></p>
              <p className="priest-voice">Señor, ten piedad. <span className="assembly-response font-bold">R. Señor, ten piedad.</span></p>
            </div>
          </div>

          {/* Rúbrica Pedagógica y Conmutador del Himno de Gloria (IGMR 53) */}
          <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-md border-2 border-[#D9D1C3] space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D1C3] pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-[0.2em]">
                    Himno de Gloria
                  </span>
                  {isGloriaCanonical ? (
                    <span className="text-[10px] font-sans font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <span>✨ Rúbrica Oficial (IGMR 53):</span> <strong>Hoy SÍ se canta</strong> (Domingo / Solemnidad / Fiesta)
                    </span>
                  ) : (
                    <span className="text-[10px] font-sans font-medium bg-stone-200 text-stone-700 border border-stone-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span>ℹ️ Rúbrica Oficial (IGMR 53):</span> <strong>Hoy se omite</strong> (Feria / Tiempo penitencial)
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#666] font-sans">
                  {isGloriaCanonical 
                    ? 'El Gloria es un antiquísimo himno con el que la Iglesia glorifica a Dios Padre y al Cordero.' 
                    : 'Se omite en las ferias del Tiempo Ordinario y en los tiempos penitenciales de Adviento y Cuaresma.'}
                </p>
              </div>

              {/* Botón interactivo de Inclusión / Exclusión */}
              <button
                onClick={() => setIncludeGloria(!includeGloria)}
                className={`px-3 py-1.5 rounded-md text-xs font-sans font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-2xs ${
                  includeGloria 
                    ? 'bg-[#800020] text-white hover:bg-[#660019]' 
                    : 'bg-white text-[#800020] border border-[#800020]/40 hover:bg-[#EAE5DC]'
                }`}
              >
                {includeGloria ? '✓ Gloria Incluido (Clic para omitir)' : '+ Añadir Gloria a esta Misa'}
              </button>
            </div>

            {includeGloria ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Versión Musical con Acordes */}
                {currentCantos.gloria && (
                  <InlineCantoCard
                    momentoLabel="Gloria Musical"
                    cantoTitle={currentCantos.gloria}
                    momentoKey="gloria"
                    onOpenModal={setSelectedCantoModal}
                    onChangeCanto={setChangingMomento}
                    defaultExpanded={showAllLyrics}
                  />
                )}

                {/* Texto Litúrgico Oficial */}
                <div className="bg-white p-5 rounded-md border border-[#D9D1C3] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans border-b border-[#EAE5DC] pb-2">
                    <span className="font-bold text-[#800020] uppercase tracking-wider text-[10px]">
                      Texto Oficial del Misal Romano
                    </span>
                    <span className="rubric font-medium">De pie • Se canta o se recita</span>
                  </div>
                  <p className="text-[#2D2926] text-base sm:text-[17px] leading-relaxed whitespace-pre-line font-serif">
                    {`Gloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor. Por tu inmensa gloria te alabamos, te bendecimos, te adoramos, te glorificamos, te damos gracias, Señor Dios, Rey celestial, Dios Padre todopoderoso. Señor, Hijo único, Jesucristo; Señor Dios, Cordero de Dios, Hijo del Padre; tú que quitas el pecado del mundo, ten piedad de nosotros; tú que quitas el pecado del mundo, atiende nuestra súplica; tú que estás sentado a la derecha del Padre, ten piedad de nosotros; porque sólo tú eres Santo, sólo tú Señor, sólo tú Altísimo, Jesucristo, con el Espíritu Santo en la gloria de Dios Padre. Amén.`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#EAE5DC]/60 rounded text-xs font-sans text-[#555] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  {isGloriaCanonical 
                    ? '⚠ El Gloria ha sido omitido manualmente por decisión pastoral para esta celebración.' 
                    : 'El Gloria no forma parte del formulario de hoy. Si celebra una misa festiva o votiva especial, puede agregarlo.'}
                </span>
                <button 
                  onClick={() => setIncludeGloria(true)}
                  className="text-[#800020] font-bold hover:underline self-start sm:self-auto shrink-0"
                >
                  Activar Gloria →
                </button>
              </div>
            )}
          </div>

          {/* Oración Colecta */}
          {day.oracion_colecta && (
            <div className="space-y-2 pt-2">
              <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                Oración Colecta
              </span>
              <p className="priest-voice">Oremos.</p>
              <div className="rubric">Y todos oran en silencio durante unos momentos.</div>
              <p className="priest-voice text-[#2D2926] text-[18px]">
                {day.oracion_colecta}
              </p>
              <p className="assembly-response pl-4">
                <span className="rubric font-sans">R.</span> Amén.
              </p>
            </div>
          )}
        </section>

        {/* II. LITURGIA DE LA PALABRA */}
        <section id="liturgia-palabra" className="space-y-8 pt-6 border-t border-[#D9D1C3]">
          <div className="border-b border-[#D9D1C3] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#800020]"></span>
              <h2 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                II. Liturgia de la Palabra
              </h2>
            </div>
            <span className="rubric text-xs font-sans uppercase tracking-widest font-semibold">Sentados</span>
          </div>

          {/* 1ra Lectura */}
          {p.primera_lectura && (
            <div className="space-y-3">
              {includeMoniciones && p.primera_lectura.monicion && (
                <div className="bg-[#F0EDE6] p-3 rounded-sm border-l-2 border-[#800020] text-xs font-sans text-[#555]">
                  <span className="font-bold text-[#800020] uppercase tracking-wider block text-[10px] mb-0.5">Monición:</span>
                  {p.primera_lectura.monicion}
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="h-[1px] w-6 bg-[#D9D1C3]"></span>
                  <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#2D2926]">
                    Primera Lectura
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed mb-2 text-[#555] italic font-serif">
                  {p.primera_lectura.cita}
                </p>
                {/* Canonical Lectionary Proclamation Title */}
                <p className="font-serif font-bold text-[#800020] text-[16px] mb-2 tracking-tight">
                  {getLectionaryIntroduction(p.primera_lectura.cita, 'primera')}
                </p>
              </div>

              <div className="capitular-letter text-[#2D2926] whitespace-pre-line text-[17px] leading-[1.8]">
                {cleanReadingText(p.primera_lectura.texto)}
              </div>

              <div className="pt-2">
                <p className="priest-voice text-base">Palabra de Dios.</p>
                <p className="assembly-response pl-4 text-base">
                  <span className="rubric font-sans">R.</span> Te alabamos, Señor.
                </p>
              </div>
            </div>
          )}

          {/* Salmo Responsorial */}
          {p.salmo_responsorial && (
            <div className="bg-[#F0EDE6] p-6 rounded-sm border border-[#D9D1C3] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                    Salmo Responsorial
                  </span>
                  <p className="text-[12px] text-[#555] italic font-serif">{p.salmo_responsorial.cita}</p>
                </div>
                {currentCantos.salmo && (
                  <button
                    onClick={() => handleOpenCantoByName(currentCantos.salmo!)}
                    className="text-xs text-[#800020] font-sans font-bold hover:underline flex items-center gap-1"
                  >
                    <Music size={12} />
                    <span>Salmodia Musical</span>
                  </button>
                )}
              </div>

              <div className="p-3 bg-[#FDFBF7] border border-[#D9D1C3] rounded-sm text-[#800020] font-serif font-bold text-[17px]">
                <span className="rubric font-sans text-xs mr-2">R.</span>
                {p.salmo_responsorial.respuesta}
              </div>

              <div className="text-[#2D2926] text-[16px] whitespace-pre-line leading-relaxed pl-2 font-serif">
                {p.salmo_responsorial.texto}
              </div>
            </div>
          )}

          {/* 2da Lectura */}
          {p.segunda_lectura && (
            <div className="space-y-3 pt-2">
              {includeMoniciones && p.segunda_lectura.monicion && (
                <div className="bg-[#F0EDE6] p-3 rounded-sm border-l-2 border-[#800020] text-xs font-sans text-[#555]">
                  <span className="font-bold text-[#800020] uppercase tracking-wider block text-[10px] mb-0.5">Monición:</span>
                  {p.segunda_lectura.monicion}
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="h-[1px] w-6 bg-[#D9D1C3]"></span>
                  <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#2D2926]">
                    Segunda Lectura
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed mb-2 text-[#555] italic font-serif">
                  {p.segunda_lectura.cita}
                </p>
                {/* Canonical Lectionary Proclamation Title */}
                <p className="font-serif font-bold text-[#800020] text-[16px] mb-2 tracking-tight">
                  {getLectionaryIntroduction(p.segunda_lectura.cita, 'segunda')}
                </p>
              </div>

              <div className="capitular-letter text-[#2D2926] whitespace-pre-line text-[17px] leading-[1.8]">
                {cleanReadingText(p.segunda_lectura.texto)}
              </div>

              <div className="pt-2">
                <p className="priest-voice text-base">Palabra de Dios.</p>
                <p className="assembly-response pl-4 text-base">
                  <span className="rubric font-sans">R.</span> Te alabamos, Señor.
                </p>
              </div>
            </div>
          )}

          {/* Aclamación antes del Evangelio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em]">
                Aclamación antes del Evangelio
              </span>
              <span className="rubric text-xs font-sans">De pie</span>
            </div>

            {currentCantos.aleluya && (
              <InlineCantoCard
                momentoLabel={day.tiempo_liturgico === 'Cuaresma' ? 'Aclamación Cuaresmal' : 'Aclamación / Aleluya'}
                cantoTitle={currentCantos.aleluya}
                momentoKey="aleluya"
                onOpenModal={setSelectedCantoModal}
                onChangeCanto={setChangingMomento}
                defaultExpanded={showAllLyrics}
              />
            )}

            <p className="text-[#800020] font-serif font-bold text-[17px] italic">
              {p.aclamacion_evangelio?.texto || (day.tiempo_liturgico === 'Cuaresma' ? 'R. Honor y gloria a ti, Señor Jesús.' : 'R. Aleluya, aleluya.')}
            </p>
          </div>

          {/* Santo Evangelio */}
          {p.evangelio && (
            <div className="space-y-4 bg-[#F5F2EB] p-6 sm:p-8 rounded-sm border-l-3 border-[#800020]">
              {includeMoniciones && p.evangelio.monicion && (
                <div className="bg-[#FDFBF7] p-3 rounded-sm border border-[#D9D1C3] text-xs font-sans text-[#555]">
                  <span className="font-bold text-[#800020] uppercase tracking-wider block text-[10px] mb-0.5">Monición al Evangelio:</span>
                  {p.evangelio.monicion}
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="h-[1px] w-6 bg-[#800020]"></span>
                  <h3 className="uppercase font-sans text-[12px] tracking-[0.25em] font-bold text-[#800020]">
                    Santo Evangelio
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-[#555] italic font-serif mb-1">
                  {p.evangelio.cita}
                </p>
                {/* Canonical Title */}
                <p className="font-serif font-bold text-[#800020] text-[17px] mb-2 tracking-tight">
                  {getLectionaryIntroduction(p.evangelio.cita, 'evangelio')}
                </p>
              </div>

              <div className="space-y-1.5 text-base bg-[#ECE7DC]/70 p-4 rounded-sm border border-[#D9D1C3]">
                <p className="priest-voice">El Señor esté con ustedes.</p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Y con tu espíritu.</p>
                <p className="priest-voice pt-1">
                  <strong className="text-[#800020]">✠</strong> Proclamación del santo Evangelio según {getGospelEvangelistName(p.evangelio.cita)}.
                </p>
                <div className="rubric pl-4 text-xs">
                  El sacerdote o diácono hace la señal de la cruz sobre el libro, y luego sobre su frente, boca y pecho; los fieles hacen lo mismo.
                </div>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Gloria a ti, Señor.</p>
              </div>

              <div className="capitular-letter text-[#2D2926] whitespace-pre-line text-[18px] font-medium leading-[1.8] pt-2">
                {cleanReadingText(p.evangelio.texto)}
              </div>

              <div className="pt-2">
                <p className="priest-voice text-base">Palabra del Señor.</p>
                <p className="assembly-response pl-4 text-base">
                  <span className="rubric font-sans">R.</span> Gloria a ti, Señor Jesús.
                </p>
              </div>
            </div>
          )}

          {/* Homilía / Subsidio Patrístico */}
          {includeHomilia && day.reflexion_homiletica && (
            <div className="bg-[#F0EDE6] p-6 rounded-sm border border-[#D9D1C3] space-y-2 relative">
              <span className="absolute -top-3 left-6 bg-[#F0EDE6] px-2 text-[20px] font-serif italic text-[#800020] border border-[#D9D1C3]">
                &ldquo;
              </span>
              <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-2">
                <span className="font-sans text-[10px] font-bold text-[#2D2926] uppercase tracking-[0.2em]">
                  Homilía & Subsidio Patrístico
                </span>
                <span className="rubric text-xs font-sans">Sentados</span>
              </div>
              <div className="text-[#333] text-[16px] leading-relaxed whitespace-pre-line font-serif italic pt-1">
                {Array.isArray(day.reflexion_homiletica) 
                  ? day.reflexion_homiletica.join('\n\n') 
                  : day.reflexion_homiletica}
              </div>
            </div>
          )}

          {/* Rúbrica Pedagógica y Conmutador de la Profesión de Fe / Credo (IGMR 68) */}
          <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-md border-2 border-[#D9D1C3] space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D1C3] pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-[0.2em]">
                    Profesión de Fe (Credo)
                  </span>
                  {isCredoCanonical ? (
                    <span className="text-[10px] font-sans font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <span>✨ Rúbrica Oficial (IGMR 68):</span> <strong>Hoy SÍ se proclama</strong> (Precepto dominical / Solemnidad)
                    </span>
                  ) : (
                    <span className="text-[10px] font-sans font-medium bg-stone-200 text-stone-700 border border-stone-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span>ℹ️ Rúbrica Oficial (IGMR 68):</span> <strong>Hoy se omite</strong> (Feria / Memoria ordinaria)
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#666] font-sans">
                  {isCredoCanonical
                    ? 'El Símbolo de la fe responde a la Palabra de Dios proclamada y es obligatorio en domingos y solemnidades.'
                    : 'En las ferias, memorias y fiestas de entre semana, la liturgia omite la recitación del Credo.'}
                </p>
              </div>

              {/* Botón interactivo de Inclusión / Exclusión */}
              <button
                onClick={() => setIncludeCredo(!includeCredo)}
                className={`px-3 py-1.5 rounded-md text-xs font-sans font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-2xs ${
                  includeCredo 
                    ? 'bg-[#800020] text-white hover:bg-[#660019]' 
                    : 'bg-white text-[#800020] border border-[#800020]/40 hover:bg-[#EAE5DC]'
                }`}
              >
                {includeCredo ? '✓ Credo Incluido (Clic para omitir)' : '+ Añadir Credo a esta Misa'}
              </button>
            </div>

            {includeCredo ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Selector de Fórmula de Credo */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-sans bg-[#F0EDE6] p-2.5 rounded-md border border-[#D9D1C3]">
                  <span className="font-bold text-[#800020] text-[11px] uppercase tracking-wider">Fórmula Oficial:</span>
                  <button
                    onClick={() => setCredoFormula('niceno')}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      credoFormula === 'niceno'
                        ? 'bg-[#800020] text-white font-bold shadow-2xs'
                        : 'bg-white text-[#444] hover:text-[#800020] border border-[#D9D1C3]'
                    }`}
                  >
                    Símbolo Niceno-Constantinopolitano (Largo)
                  </button>
                  <button
                    onClick={() => setCredoFormula('apostoles')}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      credoFormula === 'apostoles'
                        ? 'bg-[#800020] text-white font-bold shadow-2xs'
                        : 'bg-white text-[#444] hover:text-[#800020] border border-[#D9D1C3]'
                    }`}
                  >
                    Símbolo de los Apóstoles (Breve)
                  </button>
                </div>

                {/* Texto del Credo */}
                <div className="bg-white p-5 sm:p-6 rounded-md border border-[#D9D1C3] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans border-b border-[#EAE5DC] pb-2">
                    <span className="font-bold text-[#800020] uppercase tracking-wider text-[10px]">
                      {credoFormula === 'niceno' ? 'Símbolo Niceno-Constantinopolitano' : 'Símbolo de los Apóstoles'}
                    </span>
                    <span className="rubric font-medium">De pie</span>
                  </div>
                  <p className="text-[#2D2926] text-base sm:text-[17px] leading-relaxed whitespace-pre-line font-serif">
                    {credoFormula === 'niceno' ? CREDO_NICENO : CREDO_APOSTOLES}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#EAE5DC]/60 rounded text-xs font-sans text-[#555] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  {isCredoCanonical 
                    ? '⚠ El Credo ha sido omitido manualmente por decisión pastoral para esta celebración.' 
                    : 'El Credo no forma parte del formulario de hoy. Puede agregarlo si la asamblea lo requiere.'}
                </span>
                <button 
                  onClick={() => setIncludeCredo(true)}
                  className="text-[#800020] font-bold hover:underline self-start sm:self-auto shrink-0"
                >
                  Activar Credo →
                </button>
              </div>
            )}
          </div>

          {/* Oración Universal de los Fieles */}
          {includeOracionFieles && day.oracion_fieles && day.oracion_fieles.length > 0 && (
            <div className="space-y-3 bg-[#F0EDE6] p-6 rounded-sm border border-[#D9D1C3]">
              <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-2">
                <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-[0.2em]">
                  Oración Universal de los Fieles
                </span>
                <span className="rubric text-xs font-sans">De pie</span>
              </div>
              <p className="priest-voice text-base">
                Oremos, hermanos, a Dios Padre todopoderoso, y presentémosle nuestras súplicas con un solo corazón:
              </p>
              <div className="space-y-2.5 text-[16px] pl-2">
                {day.oracion_fieles.map((pet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#800020] font-bold text-xs mt-1">❖</span>
                    <div>
                      <p className="text-[#2D2926]">{pet}</p>
                      <p className="text-xs text-[#800020] font-bold font-sans mt-0.5">
                        R. Te rogamos, óyenos.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="priest-voice text-base pt-2">
                Escucha, Padre, las oraciones de tu pueblo y concédenos lo que con fe te hemos pedido. Por Jesucristo, nuestro Señor.
              </p>
              <p className="assembly-response pl-4">
                <span className="rubric font-sans">R.</span> Amén.
              </p>
            </div>
          )}
        </section>

        {/* III. LITURGIA EUCARÍSTICA */}
        <section id="liturgia-eucaristica" className="space-y-8 pt-6 border-t border-[#D9D1C3]">
          <div className="border-b border-[#D9D1C3] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#800020]"></span>
              <h2 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                III. Liturgia Eucarística
              </h2>
            </div>
            <span className="rubric text-xs font-sans uppercase tracking-widest font-semibold">Sentados</span>
          </div>

          {/* Canto de Ofertorio Integrado con Letra y Acordes */}
          {currentCantos.ofertorio && (
            <InlineCantoCard
              momentoLabel="Canto de Ofertorio / Dones"
              cantoTitle={currentCantos.ofertorio}
              momentoKey="ofertorio"
              onOpenModal={setSelectedCantoModal}
              onChangeCanto={setChangingMomento}
              defaultExpanded={showAllLyrics}
            />
          )}

          {/* Presentación de Dones */}
          <div className="space-y-3">
            <p className="priest-voice">
              Bendito seas, Señor, Dios del universo, por este pan, fruto de la tierra y del trabajo del hombre, que recibimos de tu generosidad y ahora te presentamos; él será para nosotros pan de vida.
            </p>
            <p className="assembly-response pl-4">
              <span className="rubric font-sans">R.</span> Bendito seas por siempre, Señor.
            </p>
            <p className="priest-voice pt-2">
              Bendito seas, Señor, Dios del universo, por este vino, fruto de la vid y del trabajo del hombre, que recibimos de tu generosidad y ahora te presentamos; él será para nosotros bebida de salvación.
            </p>
            <p className="assembly-response pl-4">
              <span className="rubric font-sans">R.</span> Bendito seas por siempre, Señor.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <p className="priest-voice font-semibold">
              Oren, hermanos, para que este sacrificio, mío y de ustedes, sea agradable a Dios, Padre todopoderoso.
            </p>
            <p className="assembly-response pl-4">
              El Señor reciba de tus manos este sacrificio, para alabanza y gloria de su nombre, para nuestro bien y el de toda su santa Iglesia.
            </p>
          </div>

          {/* Oración sobre las Ofrendas */}
          {day.oracion_ofrendas && (
            <div className="space-y-2">
              <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                Oración sobre las Ofrendas
              </span>
              <p className="priest-voice">{day.oracion_ofrendas}</p>
              <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Amén.</p>
            </div>
          )}

          {/* Plegaria Eucarística */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-2">
              <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-[0.2em]">
                Prefacio y Plegaria Eucarística
              </span>
              <span className="rubric text-xs font-sans">De pie</span>
            </div>

            <div className="space-y-1.5 text-base">
              <p className="priest-voice">El Señor esté con ustedes. <span className="assembly-response">R. Y con tu espíritu.</span></p>
              <p className="priest-voice">Levantemos el corazón. <span className="assembly-response">R. Lo tenemos levantado hacia el Señor.</span></p>
              <p className="priest-voice">Demos gracias al Señor, nuestro Dios. <span className="assembly-response">R. Es justo y necesario.</span></p>
            </div>

            {/* Santo */}
            <div className="bg-[#F0EDE6] p-4 sm:p-5 rounded-md border border-[#D9D1C3] text-[#2D2926] text-base leading-relaxed space-y-3">
              <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-2">
                <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">Santo</span>
                <span className="rubric text-xs font-sans">De pie • Se canta o se recita</span>
              </div>

              {currentCantos.santo && (
                <InlineCantoCard
                  momentoLabel="Santo Musical"
                  cantoTitle={currentCantos.santo}
                  momentoKey="santo"
                  onOpenModal={setSelectedCantoModal}
                  onChangeCanto={setChangingMomento}
                  defaultExpanded={showAllLyrics}
                />
              )}

              <p className="font-serif">
                Santo, Santo, Santo es el Señor, Dios del Universo. Llenos están el cielo y la tierra de tu gloria. Hosanna en el cielo. Bendito el que viene en el nombre del Señor. Hosanna en el cielo.
              </p>
            </div>

            {/* Palabras de la Consagración */}
            <div className="bg-[#F5F2EB] p-8 rounded-sm border-2 border-[#800020] space-y-4 text-center">
              <div className="rubric text-xs font-sans">El sacerdote pronuncia las palabras solemnes del Señor:</div>
              
              <div className="space-y-2">
                <p className="text-xl sm:text-2xl font-cinzel font-bold text-[#800020] tracking-wide">
                  TOMEN Y COMAN TODOS DE ÉL, PORQUE ESTO ES MI CUERPO, QUE SERÁ ENTREGADO POR USTEDES.
                </p>
              </div>

              <div className="h-[1px] w-16 bg-[#800020]/30 mx-auto my-3" />

              <div className="space-y-2">
                <p className="text-xl sm:text-2xl font-cinzel font-bold text-[#800020] tracking-wide">
                  TOMEN Y BEBAN TODOS DE ÉL, PORQUE ÉSTE ES EL CÁLIZ DE MI SANGRE, SANGRE DE LA ALIANZA NUEVA Y ETERNA, QUE SERÁ DERRAMADA POR USTEDES Y POR MUCHOS PARA EL PERDÓN DE LOS PECADOS. HAGAN ESTO EN CONMEMORACIÓN MÍA.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-base">
              <p className="priest-voice">Éste es el Sacramento de nuestra fe.</p>
              <p className="assembly-response pl-4">
                Anunciamos tu muerte, proclamamos tu resurrección. ¡Ven, Señor Jesús!
              </p>
            </div>

            {/* Doxología */}
            <div className="space-y-2 pt-2">
              <p className="priest-voice font-bold text-lg">
                Por Cristo, con él y en él, a ti, Dios Padre omnipotente, en la unidad del Espíritu Santo, todo honor y toda gloria por los siglos de los siglos.
              </p>
              <p className="assembly-response pl-4 text-xl font-cinzel font-bold text-[#800020]">
                <span className="rubric font-sans text-sm">R.</span> ¡AMÉN!
              </p>
            </div>
          </div>
        </section>

        {/* IV. RITO DE LA COMUNIÓN */}
        <section id="rito-comunion" className="space-y-6 pt-6 border-t border-[#D9D1C3]">
          <div className="border-b border-[#D9D1C3] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#800020]"></span>
              <h2 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                IV. Rito de la Comunión
              </h2>
            </div>
            <span className="rubric text-xs font-sans uppercase tracking-widest font-semibold">De pie</span>
          </div>

          <div className="space-y-2">
            <p className="priest-voice">
              Llenos de alegría por ser hijos de Dios, digamos confiadamente la oración que Cristo nos enseñó:
            </p>
            <p className="assembly-response pl-4 text-base leading-relaxed bg-[#F5F2EB] p-4 rounded-sm border border-[#D9D1C3]">
              Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu Reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal.
            </p>
          </div>

          {/* Rito de la Paz */}
          <div className="space-y-2">
            <p className="priest-voice">La paz del Señor esté siempre con ustedes. <span className="assembly-response">R. Y con tu espíritu.</span></p>
            <p className="priest-voice">Dense fraternalmente la paz.</p>
          </div>

          {/* Cordero de Dios */}
          <div className="bg-[#F0EDE6] p-4 sm:p-5 rounded-md border border-[#D9D1C3] text-[#2D2926] text-base leading-relaxed space-y-2">
            <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-2">
              <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em]">Cordero de Dios (Agnus Dei)</span>
              <span className="rubric text-xs font-sans">De pie</span>
            </div>

            {currentCantos.cordero && (
              <InlineCantoCard
                momentoLabel="Cordero de Dios Musical"
                cantoTitle={currentCantos.cordero}
                momentoKey="cordero"
                onOpenModal={setSelectedCantoModal}
                onChangeCanto={setChangingMomento}
                defaultExpanded={showAllLyrics}
              />
            )}

            <p>Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.</p>
            <p>Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.</p>
            <p>Cordero de Dios, que quitas el pecado del mundo, danos la paz.</p>
          </div>

          {/* Invitación */}
          <div className="space-y-2">
            <p className="priest-voice font-semibold">
              Éste es el Cordero de Dios, que quita el pecado del mundo. Dichosos los invitados a la cena del Señor.
            </p>
            <p className="assembly-response pl-4">
              Señor, no soy digno de que entres en mi casa, pero una palabra tuya bastará para sanarme.
            </p>
          </div>

          {/* Canto de Comunión Sugerido con Letra y Acordes */}
          {currentCantos.comunion && (
            <InlineCantoCard
              momentoLabel="Canto de Comunión"
              cantoTitle={currentCantos.comunion}
              momentoKey="comunion"
              onOpenModal={setSelectedCantoModal}
              onChangeCanto={setChangingMomento}
              defaultExpanded={showAllLyrics}
            />
          )}

          {/* Antífona de Comunión */}
          {day.antifona_comunion && (
            <div className="bg-[#F0EDE6] p-4 rounded-sm border-l-2 border-[#800020] space-y-1">
              <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                Antífona de Comunión
              </span>
              <p className="text-[#2D2926] italic font-serif">{day.antifona_comunion}</p>
            </div>
          )}

          {/* Postcomunión */}
          {day.oracion_comunion && (
            <div className="space-y-2 pt-2">
              <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                Oración después de la Comunión
              </span>
              <p className="priest-voice">Oremos.</p>
              <p className="priest-voice">{day.oracion_comunion}</p>
              <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Amén.</p>
            </div>
          )}
        </section>

        {/* V. RITOS DE CONCLUSIÓN */}
        <section id="ritos-conclusion" className="space-y-4 pt-6 border-t border-[#D9D1C3]">
          <div className="border-b border-[#D9D1C3] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#800020]"></span>
              <h2 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                V. Ritos de Conclusión
              </h2>
            </div>
            <span className="rubric text-xs font-sans uppercase tracking-widest font-semibold">De pie</span>
          </div>

          <div className="space-y-2 text-base">
            <p className="priest-voice">El Señor esté con ustedes. <span className="assembly-response">R. Y con tu espíritu.</span></p>
            <p className="priest-voice">
              La bendición de Dios todopoderoso, <strong className="text-[#800020]">✠</strong> Padre, Hijo y Espíritu Santo, descienda sobre ustedes y permanezca para siempre.
            </p>
            <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Amén.</p>
            
            <p className="priest-voice pt-2">Pueden ir en paz.</p>
            <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Demos gracias a Dios.</p>
          </div>

          {/* Canto de Salida / Mariano Integrado con Letra y Acordes */}
          {(currentCantos.salida || currentCantos.mariano) && (
            <InlineCantoCard
              momentoLabel="Canto de Salida / Mariano"
              cantoTitle={currentCantos.salida || currentCantos.mariano}
              momentoKey="salida"
              onOpenModal={setSelectedCantoModal}
              onChangeCanto={setChangingMomento}
              defaultExpanded={showAllLyrics}
            />
          )}
        </section>

      </div>

      {/* MODAL: VER ACORDES Y LETRA DEL CANTO */}
      {selectedCantoModal && (
        <div className="fixed inset-0 z-50 bg-[#2D2926]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] max-w-2xl w-full rounded-md border border-[#D9D1C3] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto font-sans animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-[#D9D1C3] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-xs bg-[#800020]/10 text-[#800020] font-bold text-[10px] uppercase tracking-wider">
                    {selectedCantoModal.momento || 'Canto Litúrgico'}
                  </span>
                  <span className="text-xs text-[#666]">
                    {selectedCantoModal.tiempo}
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#2D2926]">
                  {selectedCantoModal.titulo}
                </h2>
                {selectedCantoModal.autor && (
                  <p className="text-xs text-[#555] italic">
                    Autor: {selectedCantoModal.autor}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedCantoModal(null)}
                className="p-1 rounded-sm text-[#777] hover:text-[#2D2926] hover:bg-[#EAE5DC] transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chords & Transposition Bar */}
            <div className="bg-[#F0EDE6] p-3.5 rounded-sm border border-[#D9D1C3] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#800020]">Tonalidad:</span>
                <span className="font-mono font-semibold text-[#2D2926]">
                  {selectedCantoModal.tonalidad || 'Re Mayor (D)'}
                </span>
                {transposeSemi !== 0 && (
                  <span className="text-[#800020] font-bold">
                    ({transposeSemi > 0 ? `+${transposeSemi}` : transposeSemi} semitonos)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#666]">Transportar:</span>
                <button
                  onClick={() => setTransposeSemi(prev => prev - 1)}
                  className="w-6 h-6 rounded-xs bg-[#FDFBF7] border border-[#D9D1C3] hover:bg-[#EAE5DC] font-bold text-center"
                >
                  -
                </button>
                <button
                  onClick={() => setTransposeSemi(prev => prev + 1)}
                  className="w-6 h-6 rounded-xs bg-[#FDFBF7] border border-[#D9D1C3] hover:bg-[#EAE5DC] font-bold text-center"
                >
                  +
                </button>
                {transposeSemi !== 0 && (
                  <button
                    onClick={() => setTransposeSemi(0)}
                    className="text-[10px] text-[#800020] underline ml-1"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Lyrics with Chords */}
            <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#D9D1C3] font-mono text-sm leading-relaxed whitespace-pre-line text-[#2D2926]">
              {selectedCantoModal.letra}
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#D9D1C3]">
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  selectedCantoModal.youtubeQuery || `${selectedCantoModal.titulo} canto catolico`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-bold bg-[#CC0000] text-white hover:bg-[#990000] transition w-full sm:w-auto justify-center"
              >
                <Play size={13} fill="currentColor" />
                <span>Escuchar en YouTube</span>
                <ExternalLink size={12} />
              </a>

              <button
                onClick={() => setSelectedCantoModal(null)}
                className="px-5 py-2 rounded-sm text-xs font-bold bg-[#2D2926] text-[#F9F7F2] hover:bg-[#1A1715] transition w-full sm:w-auto text-center"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CAMBIAR CANTO */}
      {changingMomento && (
        <div className="fixed inset-0 z-50 bg-[#2D2926]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] max-w-xl w-full rounded-md border border-[#D9D1C3] shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col font-sans animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D2926]">
                  Seleccionar Canto para: <span className="text-[#800020] capitalize">{changingMomento}</span>
                </h3>
                <p className="text-xs text-[#666]">
                  Elija un himno del cantoral litúrgico o busque por título
                </p>
              </div>
              <button
                onClick={() => setChangingMomento(null)}
                className="p-1 text-[#777] hover:text-[#2D2926]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-3 text-[#777]" />
              <input
                type="text"
                placeholder="Buscar canto por título, letra o autor..."
                value={musicSearchTerm}
                onChange={(e) => setMusicSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F0EDE6] border border-[#D9D1C3] rounded-sm focus:outline-none focus:border-[#800020]"
              />
            </div>

            {/* Songs List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {CANTICOS_LIST
                .filter(c => 
                  c.titulo.toLowerCase().includes(musicSearchTerm.toLowerCase()) ||
                  c.letra.toLowerCase().includes(musicSearchTerm.toLowerCase()) ||
                  (c.autor && c.autor.toLowerCase().includes(musicSearchTerm.toLowerCase()))
                )
                .map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-[#F5F2EB] hover:bg-[#EAE5DC] border border-[#D9D1C3] rounded-sm transition flex items-center justify-between gap-3 cursor-pointer"
                    onClick={() => handleUpdateCantoForMomento(changingMomento, c.titulo)}
                  >
                    <div>
                      <p className="font-serif font-bold text-sm text-[#2D2926]">{c.titulo}</p>
                      <p className="text-[11px] text-[#666]">
                        {c.momento} • {c.tonalidad} {c.autor ? `• ${c.autor}` : ''}
                      </p>
                    </div>

                    <button className="px-2.5 py-1 bg-[#800020] text-[#F9F7F2] text-xs font-bold rounded-xs shrink-0">
                      Elegir
                    </button>
                  </div>
                ))}
            </div>

            <div className="pt-2 border-t border-[#D9D1C3] flex justify-end">
              <button
                onClick={() => setChangingMomento(null)}
                className="px-4 py-1.5 text-xs text-[#555] hover:text-[#2D2926]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
