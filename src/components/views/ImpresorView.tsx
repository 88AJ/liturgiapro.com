import React, { useState } from 'react';
import { 
  Printer, 
  Settings, 
  Layout, 
  FileText, 
  Type, 
  Eye, 
  Sparkles, 
  Download, 
  Check,
  RotateCcw
} from 'lucide-react';
import { LiturgicalDay } from '../../types/liturgia';
import { getColorHex } from '../../utils/calendar';
import { getLectionaryIntroduction, getGospelEvangelistName, cleanReadingText } from '../../utils/lectionaryFormatter';

interface ImpresorViewProps {
  day: LiturgicalDay;
  region: string;
}

export const ImpresorView: React.FC<ImpresorViewProps> = ({ day, region }) => {
  const [paperFormat, setPaperFormat] = useState<'letter' | 'a4' | 'booklet'>('letter');
  const [columns, setColumns] = useState<1 | 2>(2);
  const [rubricColor, setRubricColor] = useState<'red' | 'hidden' | 'gray'>('red');
  const [fontSizePt, setFontSizePt] = useState<number>(14);
  const [showCapitular, setShowCapitular] = useState<boolean>(true);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const p = day.liturgia_palabra;

  return (
    <div className="space-y-8 font-serif">
      {/* Top Banner & Print Trigger - Editorial Aesthetic */}
      <div className="bg-[#F0EDE6] p-6 sm:p-10 rounded-md border border-[#D9D1C3] shadow-xs flex flex-col sm:flex-row sm:items-end justify-between gap-6 no-print">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[1px] w-6 bg-[#800020]"></span>
            <span className="uppercase font-sans text-[11px] tracking-[0.3em] text-[#800020] font-bold">
              Officina Typographica Sacra
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light font-serif leading-tight italic text-[#2D2926]">
            Maestro Impresor & Exportación PDF
          </h1>
          <p className="text-xs text-[#555] font-sans mt-1">
            Configuración tipográfica de alta fidelidad para atril, ambón o folleto de asamblea.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 rounded-sm text-xs font-bold bg-[#800020] hover:bg-[#660019] text-[#F9F7F2] transition shadow-xs"
          >
            <Printer size={15} />
            <span>Imprimir Hoja (Ctrl + P)</span>
          </button>
        </div>
      </div>

      {/* Grid: Controls and Live Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Print Formatting Studio (No-print) */}
        <div className="lg:col-span-4 space-y-4 no-print font-sans text-xs">
          <div className="bg-[#F0EDE6] p-5 rounded-md border border-[#D9D1C3] shadow-xs space-y-4">
            <h3 className="font-bold text-[#800020] uppercase tracking-[0.2em] text-[10px] border-b border-[#D9D1C3] pb-2 flex items-center gap-1.5">
              <Settings size={13} className="text-[#800020]" />
              <span>Opciones Tipográficas</span>
            </h3>

            {/* Paper Format */}
            <div>
              <label className="font-semibold text-[#444] block mb-1.5">Formato de Papel:</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'letter', label: 'Carta' },
                  { id: 'a4', label: 'A4' },
                  { id: 'booklet', label: 'Folleto' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setPaperFormat(f.id as any)}
                    className={`py-1.5 px-2 rounded-sm font-medium border text-center transition ${
                      paperFormat === f.id
                        ? 'bg-[#2D2926] text-[#F9F7F2] border-[#2D2926]'
                        : 'bg-[#F9F7F2] text-[#444] border-[#D9D1C3] hover:bg-[#EAE5DC]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column Layout */}
            <div>
              <label className="font-semibold text-[#444] block mb-1.5">Columnas en la Hoja:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setColumns(1)}
                  className={`py-2 px-3 rounded-sm font-medium border text-center transition ${
                    columns === 1
                      ? 'bg-[#2D2926] text-[#F9F7F2] border-[#2D2926]'
                      : 'bg-[#F9F7F2] text-[#444] border-[#D9D1C3]'
                  }`}
                >
                  1 Columna (Altar)
                </button>
                <button
                  onClick={() => setColumns(2)}
                  className={`py-2 px-3 rounded-sm font-medium border text-center transition ${
                    columns === 2
                      ? 'bg-[#2D2926] text-[#F9F7F2] border-[#2D2926]'
                      : 'bg-[#F9F7F2] text-[#444] border-[#D9D1C3]'
                  }`}
                >
                  2 Columnas (Atril)
                </button>
              </div>
            </div>

            {/* Rubrics Color */}
            <div>
              <label className="font-semibold text-[#444] block mb-1.5">Tratamiento de Rúbricas:</label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setRubricColor('red')}
                  className={`py-1.5 px-2 rounded-sm font-medium border text-center transition ${
                    rubricColor === 'red' ? 'bg-[#800020] text-[#F9F7F2] border-[#800020]' : 'bg-[#F9F7F2] text-[#444] border-[#D9D1C3]'
                  }`}
                >
                  Rojo Canónico
                </button>
                <button
                  onClick={() => setRubricColor('gray')}
                  className={`py-1.5 px-2 rounded-sm font-medium border text-center transition ${
                    rubricColor === 'gray' ? 'bg-[#2D2926] text-[#F9F7F2] border-[#2D2926]' : 'bg-[#F9F7F2] text-[#444] border-[#D9D1C3]'
                  }`}
                >
                  Gris
                </button>
                <button
                  onClick={() => setRubricColor('hidden')}
                  className={`py-1.5 px-2 rounded-sm font-medium border text-center transition ${
                    rubricColor === 'hidden' ? 'bg-[#666] text-[#F9F7F2] border-[#666]' : 'bg-[#F9F7F2] text-[#444] border-[#D9D1C3]'
                  }`}
                >
                  Ocultar
                </button>
              </div>
            </div>

            {/* Font Size Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-[#444]">Tamaño Tipográfico:</label>
                <span className="font-mono text-xs font-bold text-[#800020]">{fontSizePt} pt</span>
              </div>
              <input
                type="range"
                min="11"
                max="20"
                step="1"
                value={fontSizePt}
                onChange={(e) => setFontSizePt(Number(e.target.value))}
                className="w-full accent-[#800020]"
              />
            </div>

            {/* Drop Caps Switch */}
            <div className="flex items-center justify-between pt-2 border-t border-[#D9D1C3]">
              <span className="font-semibold text-[#444]">Letras Capitulares:</span>
              <input
                type="checkbox"
                checked={showCapitular}
                onChange={(e) => setShowCapitular(e.target.checked)}
                className="rounded accent-[#800020]"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm text-xs font-bold bg-[#800020] hover:bg-[#660019] text-[#F9F7F2] transition shadow-xs"
              >
                <Printer size={14} />
                <span>Imprimir Ahora</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Printable Sheet Container */}
        <div className="lg:col-span-8">
          <div 
            id="print-sheet-content"
            className={`bg-[#FDFBF7] p-8 sm:p-14 rounded-md border border-[#D9D1C3] shadow-xs font-serif text-[#2D2926] space-y-8 ${
              showCapitular ? '' : '[&_.capitular-letter::first-letter]:float-none'
            }`}
            style={{ fontSize: `${fontSizePt}px`, lineHeight: 1.7 }}
          >
            
            {/* Header */}
            <div className="border-b-2 border-[#2D2926] pb-4 text-center">
              <div className="text-[10px] font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
                {day.tiempo_liturgico} • Color: {day.color} • Ciclo {day.ciclo || 'A'}
              </div>
              <h1 className="text-3xl sm:text-4xl font-light font-serif italic text-[#2D2926]">
                {day.titulo_celebracion || day.celebracion}
              </h1>
              <p className="text-xs text-[#666] font-sans mt-1">
                {day.dia_semana}, {day.fecha}
              </p>
            </div>

            {/* Body: Multi-column or 1 Column */}
            <div className={`${columns === 2 ? 'sm:columns-2 sm:gap-8' : 'columns-1'} space-y-6 text-justify`}>
              
              {/* Antífona Entrada */}
              {day.antifona_entrada && (
                <div className="break-inside-avoid space-y-1">
                  <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                    Antífona de Entrada
                  </span>
                  <p className="italic text-[#333]">{day.antifona_entrada}</p>
                </div>
              )}

              {/* Oración Colecta */}
              {day.oracion_colecta && (
                <div className="break-inside-avoid space-y-1">
                  <span className={`font-sans text-[10px] font-bold uppercase tracking-[0.2em] block ${rubricColor === 'red' ? 'text-[#800020]' : 'text-[#2D2926]'}`}>
                    Oración Colecta
                  </span>
                  {rubricColor !== 'hidden' && (
                    <div className={rubricColor === 'red' ? 'rubric text-xs' : 'text-[#666] text-xs italic'}>
                      El sacerdote dice con las manos extendidas:
                    </div>
                  )}
                  <p className="text-[#2D2926]">{day.oracion_colecta}</p>
                </div>
              )}

              {/* 1ra Lectura */}
              {p.primera_lectura && (
                <div className="break-inside-avoid space-y-1 pt-2">
                  <span className="font-sans text-[10px] font-bold text-[#2D2926] uppercase tracking-[0.2em] block">
                    Primera Lectura ({p.primera_lectura.cita})
                  </span>
                  <p className="font-serif font-bold text-[#800020] text-xs mb-1">
                    {getLectionaryIntroduction(p.primera_lectura.cita, 'primera')}
                  </p>
                  <p className="capitular-letter text-[#2D2926] whitespace-pre-line">
                    {cleanReadingText(p.primera_lectura.texto)}
                  </p>
                  <p className="text-xs font-bold pt-1">
                    Palabra de Dios. <span className="font-normal italic">R. Te alabamos, Señor.</span>
                  </p>
                </div>
              )}

              {/* Salmo */}
              {p.salmo_responsorial && (
                <div className="break-inside-avoid space-y-1 pt-2">
                  <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                    Salmo Responsorial ({p.salmo_responsorial.cita})
                  </span>
                  <p className="font-bold text-[#2D2926]">
                    <span className="text-[#800020] mr-1">R.</span> {p.salmo_responsorial.respuesta}
                  </p>
                  <p className="text-[#444] whitespace-pre-line text-sm pl-2">
                    {p.salmo_responsorial.texto}
                  </p>
                </div>
              )}

              {/* 2da Lectura */}
              {p.segunda_lectura && (
                <div className="break-inside-avoid space-y-1 pt-2">
                  <span className="font-sans text-[10px] font-bold text-[#2D2926] uppercase tracking-[0.2em] block">
                    Segunda Lectura ({p.segunda_lectura.cita})
                  </span>
                  <p className="font-serif font-bold text-[#800020] text-xs mb-1">
                    {getLectionaryIntroduction(p.segunda_lectura.cita, 'segunda')}
                  </p>
                  <p className="capitular-letter text-[#2D2926] whitespace-pre-line">
                    {cleanReadingText(p.segunda_lectura.texto)}
                  </p>
                  <p className="text-xs font-bold pt-1">
                    Palabra de Dios. <span className="font-normal italic">R. Te alabamos, Señor.</span>
                  </p>
                </div>
              )}

              {/* Evangelio */}
              {p.evangelio && (
                <div className="break-inside-avoid space-y-1 pt-2">
                  <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                    Santo Evangelio ({p.evangelio.cita})
                  </span>
                  <p className="font-serif font-bold text-[#800020] text-xs mb-1">
                    {getLectionaryIntroduction(p.evangelio.cita, 'evangelio')}
                  </p>
                  <div className="text-xs italic text-[#666] mb-1">
                    ✠ Proclamación del santo Evangelio según {getGospelEvangelistName(p.evangelio.cita)}.
                  </div>
                  <p className="capitular-letter text-[#2D2926] font-medium whitespace-pre-line">
                    {cleanReadingText(p.evangelio.texto)}
                  </p>
                  <p className="text-xs font-bold pt-1">
                    Palabra del Señor. <span className="font-normal italic">R. Gloria a ti, Señor Jesús.</span>
                  </p>
                </div>
              )}

              {/* Oración de los Fieles */}
              {day.oracion_fieles && (
                <div className="break-inside-avoid space-y-1 pt-2">
                  <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                    Oración Universal
                  </span>
                  <ul className="space-y-1 text-xs list-disc pl-3">
                    {day.oracion_fieles.map((it, i) => (
                      <li key={i}>{it} <span className="italic font-semibold text-[#800020]">R. Te rogamos, óyenos.</span></li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
