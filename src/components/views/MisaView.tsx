import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  Sliders, 
  Maximize2, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { LiturgicalDay } from '../../types/liturgia';
import { getColorHex } from '../../utils/calendar';
import { requestMoniciones, requestHomilia } from '../../utils/liturgicalAiClient';

interface MisaViewProps {
  day: LiturgicalDay;
  onUpdateDay: (updatedDay: LiturgicalDay) => void;
  onOpenAtril: () => void;
  onOpenImpresor: () => void;
  region: string;
}

export const MisaView: React.FC<MisaViewProps> = ({
  day,
  onUpdateDay,
  onOpenAtril,
  onOpenImpresor,
  region
}) => {
  const [loadingAi, setLoadingAi] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  // Display switches
  const [includeMoniciones, setIncludeMoniciones] = useState(true);
  const [includeGloria, setIncludeGloria] = useState(Boolean(day.gloria));
  const [includeCredo, setIncludeCredo] = useState(Boolean(day.credo));
  const [includeHomilia, setIncludeHomilia] = useState(true);
  const [includeOracionFieles, setIncludeOracionFieles] = useState(true);

  const colorStyle = getColorHex(day.color);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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

  return (
    <div className="space-y-8 font-serif relative">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D2926] text-[#F9F7F2] px-4 py-3 rounded-md shadow-xl border border-[#800020] text-xs font-sans font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles size={14} className="text-[#E07A8B]" />
          <span>{toastMessage}</span>
        </div>
      )}
      
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
                title="Copiar texto litúrgico"
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

            <div className="pt-2 text-base space-y-1">
              <p className="priest-voice">Señor, ten piedad. <span className="assembly-response font-bold">R. Señor, ten piedad.</span></p>
              <p className="priest-voice">Cristo, ten piedad. <span className="assembly-response font-bold">R. Cristo, ten piedad.</span></p>
              <p className="priest-voice">Señor, ten piedad. <span className="assembly-response font-bold">R. Señor, ten piedad.</span></p>
            </div>
          </div>

          {/* Gloria */}
          {includeGloria && (
            <div className="bg-[#F5F2EB] p-6 rounded-sm border border-[#D9D1C3] space-y-2">
              <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-2">
                <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-[0.2em]">
                  Himno de Gloria
                </span>
                <span className="rubric text-xs font-sans">Se canta o se recita</span>
              </div>
              <p className="text-[#2D2926] text-base leading-relaxed whitespace-pre-line font-serif">
                {`Gloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor. Por tu inmensa gloria te alabamos, te bendecimos, te adoramos, te glorificamos, te damos gracias, Señor Dios, Rey celestial, Dios Padre todopoderoso. Señor, Hijo único, Jesucristo; Señor Dios, Cordero de Dios, Hijo del Padre; tú que quitas el pecado del mundo, ten piedad de nosotros; tú que quitas el pecado del mundo, atiende nuestra súplica; tú que estás sentado a la derecha del Padre, ten piedad de nosotros; porque sólo tú eres Santo, sólo tú Señor, sólo tú Altísimo, Jesucristo, con el Espíritu Santo en la gloria de Dios Padre. Amén.`}
              </p>
            </div>
          )}

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
                <p className="text-[13px] leading-relaxed mb-3 text-[#555] italic font-serif">
                  {p.primera_lectura.cita}
                </p>
              </div>

              <div className="capitular-letter text-[#2D2926] whitespace-pre-line text-[17px] leading-[1.8]">
                {p.primera_lectura.texto}
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
              <div>
                <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                  Salmo Responsorial
                </span>
                <p className="text-[12px] text-[#555] italic font-serif">{p.salmo_responsorial.cita}</p>
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
                <p className="text-[13px] leading-relaxed mb-3 text-[#555] italic font-serif">
                  {p.segunda_lectura.cita}
                </p>
              </div>

              <div className="capitular-letter text-[#2D2926] whitespace-pre-line text-[17px] leading-[1.8]">
                {p.segunda_lectura.texto}
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
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em]">
                Aclamación antes del Evangelio
              </span>
              <span className="rubric text-xs font-sans">De pie</span>
            </div>
            <p className="text-[#800020] font-serif font-bold text-[17px] italic">
              {p.aclamacion_evangelio?.texto || 'R. Aleluya, aleluya.'}
            </p>
          </div>

          {/* Santo Evangelio - Editorial Highlight Card */}
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
                <p className="text-[13px] leading-relaxed text-[#555] italic font-serif">
                  {p.evangelio.cita}
                </p>
              </div>

              <div className="space-y-1 text-base">
                <p className="priest-voice">El Señor esté con ustedes.</p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Y con tu espíritu.</p>
                <p className="priest-voice">
                  <strong className="text-[#800020]">✠</strong> Proclamación del santo Evangelio según...
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Gloria a ti, Señor.</p>
              </div>

              <div className="capitular-letter text-[#2D2926] whitespace-pre-line text-[18px] font-medium leading-[1.8]">
                {p.evangelio.texto}
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

          {/* Credo */}
          {includeCredo && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-[0.2em]">
                  Profesión de Fe (Credo)
                </span>
                <span className="rubric text-xs font-sans">De pie</span>
              </div>
              <p className="text-[#2D2926] text-base leading-relaxed bg-[#F5F2EB] p-5 rounded-sm border border-[#D9D1C3]">
                {`Creo en un solo Dios, Padre todopoderoso, Creador del cielo y de la tierra, de todo lo visible y lo invisible. Creo en un solo Señor, Jesucristo, Hijo único de Dios, nacido del Padre antes de todos los siglos: Dios de Dios, Luz de Luz, Dios verdadero de Dios verdadero, engendrado, no creado, de la misma naturaleza del Padre, por quien todo fue hecho; que por nosotros, los hombres, y por nuestra salvación bajó del cielo, y por obra del Espíritu Santo se encarnó de María, la Virgen, y se hizo hombre; y por nuestra causa fue crucificado en tiempos de Poncio Pilato; padeció y fue sepultado, y resucitó al tercer día, según las Escrituras, y subió al cielo, y está sentado a la derecha del Padre; y de nuevo vendrá con gloria para juzgar a vivos y muertos, y su reino no tendrá fin. Creo en el Espíritu Santo, Señor y dador de vida, que procede del Padre y del Hijo, que con el Padre y el Hijo recibe una misma adoración y gloria, y que habló por los profetas. Creo en la Iglesia, que es una, santa, católica y apostólica. Confieso que hay un solo bautismo para el perdón de los pecados. Espero la resurrección de los muertos y la vida del mundo futuro. Amén.`}
              </p>
            </div>
          )}

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

          {/* Preparación de los Dones */}
          <div className="space-y-3">
            <span className="font-sans text-[11px] font-bold text-[#2D2926] uppercase tracking-[0.2em] block">
              Preparación de los Dones
            </span>
            <div className="rubric">El sacerdote toma la patena con el pan y el cáliz con el vino diciendo:</div>
            <p className="priest-voice text-base">
              Bendito seas, Señor, Dios del universo, por este pan, fruto de la tierra y del trabajo del hombre...
            </p>
            <p className="priest-voice text-base">
              Bendito seas, Señor, Dios del universo, por este vino, fruto de la vid y del trabajo del hombre...
            </p>
            
            <p className="priest-voice pt-2">
              Oren, hermanos, para que este sacrificio mío y de ustedes sea agradable a Dios, Padre todopoderoso.
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
            <div className="bg-[#F0EDE6] p-4 rounded-sm border border-[#D9D1C3] text-[#2D2926] text-base leading-relaxed">
              <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block mb-1">Santo</span>
              Santo, Santo, Santo es el Señor, Dios del Universo. Llenos están el cielo y la tierra de tu gloria. Hosanna en el cielo. Bendito el que viene en el nombre del Señor. Hosanna en el cielo.
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
          <div className="bg-[#F0EDE6] p-4 rounded-sm border border-[#D9D1C3] text-[#2D2926] text-base leading-relaxed">
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
        </section>

      </div>
    </div>
  );
};
