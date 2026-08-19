import React, { useState } from 'react';
import { 
  X, 
  Sun, 
  Moon, 
  Coffee, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Minimize,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { LiturgicalDay } from '../../types/liturgia';
import { getLectionaryIntroduction, getGospelEvangelistName, cleanReadingText } from '../../utils/lectionaryFormatter';

interface AtrilModalProps {
  day: LiturgicalDay;
  isOpen: boolean;
  onClose: () => void;
}

export const AtrilModal: React.FC<AtrilModalProps> = ({ day, isOpen, onClose }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('sepia');
  const [fontSize, setFontSize] = useState<number>(24);
  const [activeSection, setActiveSection] = useState<string>('lectura1');

  if (!isOpen) return null;

  const p = day.liturgia_palabra;

  const themeClasses = {
    light: 'bg-[#FDFBF7] text-[#2D2926] border-[#D9D1C3]',
    dark: 'bg-[#1A1715] text-[#F9F7F2] border-[#333]',
    sepia: 'bg-[#F9F7F2] text-[#2D2926] border-[#D9D1C3]',
  }[theme];

  const rubricClasses = {
    light: 'text-[#800020]',
    dark: 'text-[#E07A8B]',
    sepia: 'text-[#800020]',
  }[theme];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`atril-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#2D2926]/95 backdrop-blur-md">
      {/* Top Floating Control Bar - Editorial Dark */}
      <div className="h-14 bg-[#2D2926] border-b border-[#444] px-4 flex items-center justify-between gap-2 text-[#F9F7F2]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-sm bg-[#800020] text-[#F9F7F2] flex items-center justify-center font-serif text-sm font-bold">
            ☩
          </div>
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-[#F9F7F2]">
            MODO ATRIL SACRO
          </span>
          <span className="text-xs font-serif italic text-[#BBB] hidden sm:inline">
            • {day.titulo_celebracion || day.celebracion}
          </span>
        </div>

        {/* Controls: Theme, Font Size, Close */}
        <div className="flex items-center gap-2 font-sans text-xs">
          {/* Themes */}
          <div className="flex items-center bg-[#1A1715] p-1 rounded-sm border border-[#444]">
            <button
              onClick={() => setTheme('light')}
              title="Modo Blanco"
              className={`p-1.5 rounded-sm ${theme === 'light' ? 'bg-[#800020] text-white' : 'text-[#888] hover:text-white'}`}
            >
              <Sun size={14} />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              title="Modo Pergamino Editorial"
              className={`p-1.5 rounded-sm ${theme === 'sepia' ? 'bg-[#800020] text-white' : 'text-[#888] hover:text-white'}`}
            >
              <Coffee size={14} />
            </button>
            <button
              onClick={() => setTheme('dark')}
              title="Modo Oscuro (Noche)"
              className={`p-1.5 rounded-sm ${theme === 'dark' ? 'bg-[#800020] text-white' : 'text-[#888] hover:text-white'}`}
            >
              <Moon size={14} />
            </button>
          </div>

          {/* Font Resizing */}
          <div className="flex items-center bg-[#1A1715] p-1 rounded-sm border border-[#444] gap-1">
            <button
              onClick={() => setFontSize(Math.max(16, fontSize - 2))}
              className="p-1.5 text-[#AAA] hover:text-white"
              title="Reducir letra"
            >
              <ZoomOut size={14} />
            </button>
            <span className="font-mono text-[11px] px-1 text-amber-300">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(36, fontSize + 2))}
              className="p-1.5 text-[#AAA] hover:text-white"
              title="Aumentar letra"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-sm bg-[#1A1715] hover:bg-[#333] text-[#CCC] hover:text-white transition"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Quick Jump Ribbon */}
      <div className="h-10 bg-[#24201E] border-b border-[#3A3532] px-4 flex items-center gap-2 overflow-x-auto text-[11px] font-sans uppercase tracking-wider whitespace-nowrap">
        {[
          { id: 'colecta', label: 'Colecta' },
          { id: 'lectura1', label: '1ra Lectura' },
          { id: 'salmo', label: 'Salmo' },
          ...(p.segunda_lectura ? [{ id: 'lectura2', label: '2da Lectura' }] : []),
          { id: 'evangelio', label: 'Evangelio' },
          { id: 'fieles', label: 'Oración Universal' },
          { id: 'eucaristia', label: 'Consagración' },
          { id: 'postcomunion', label: 'Postcomunión' },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className={`px-3 py-1 rounded-sm transition ${
              activeSection === sec.id
                ? 'bg-[#800020] text-[#F9F7F2] font-bold'
                : 'text-[#888] hover:text-[#DDD] hover:bg-[#333]'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Main Reading Canvas */}
      <div className={`flex-1 overflow-y-auto p-6 sm:p-12 transition-colors ${themeClasses}`}>
        <div 
          className="max-w-3xl mx-auto font-serif space-y-12 pb-28"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
        >
          {/* Header */}
          <div className="text-center border-b border-current/20 pb-6">
            <h1 className="text-3xl sm:text-5xl font-light italic leading-tight">
              {day.titulo_celebracion || day.celebracion}
            </h1>
            <p className="text-xs font-sans uppercase tracking-[0.2em] opacity-70 mt-2">
              {day.dia_semana}, {day.fecha} • {day.tiempo_liturgico} (Color: {day.color})
            </p>
          </div>

          {/* Colecta */}
          {day.oracion_colecta && (
            <section id="atril-colecta" className="space-y-3">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#800020]">
                Oración Colecta
              </h2>
              <p className={`${rubricClasses} text-sm font-sans italic`}>Oremos:</p>
              <p className="whitespace-pre-line leading-relaxed">{day.oracion_colecta}</p>
            </section>
          )}

          {/* 1ra Lectura */}
          {p.primera_lectura && (
            <section id="atril-lectura1" className="space-y-4 pt-6 border-t border-current/20">
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] block">
                  Primera Lectura
                </span>
                <span className={`${rubricClasses} text-sm font-sans italic block mb-1`}>{p.primera_lectura.cita}</span>
                <p className="font-serif font-bold text-[#800020] text-lg">
                  {getLectionaryIntroduction(p.primera_lectura.cita, 'primera')}
                </p>
              </div>
              <p className="capitular-letter whitespace-pre-line font-medium leading-relaxed">
                {cleanReadingText(p.primera_lectura.texto)}
              </p>
              <div className="pt-2 text-base">
                <p className="font-bold">Palabra de Dios.</p>
                <p className={`${rubricClasses} pl-4`}>R. Te alabamos, Señor.</p>
              </div>
            </section>
          )}

          {/* Salmo */}
          {p.salmo_responsorial && (
            <section id="atril-salmo" className="space-y-4 pt-6 border-t border-current/20">
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] block">
                  Salmo Responsorial
                </span>
                <span className={`${rubricClasses} text-sm font-sans italic`}>{p.salmo_responsorial.cita}</span>
              </div>
              <div className="p-4 rounded-sm bg-[#800020]/10 border border-[#800020]/30 font-bold">
                <span className={`${rubricClasses} mr-2`}>R.</span>
                {p.salmo_responsorial.respuesta}
              </div>
              <p className="whitespace-pre-line pl-2 leading-relaxed">
                {p.salmo_responsorial.texto}
              </p>
            </section>
          )}

          {/* 2da Lectura */}
          {p.segunda_lectura && (
            <section id="atril-lectura2" className="space-y-4 pt-6 border-t border-current/20">
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] block">
                  Segunda Lectura
                </span>
                <span className={`${rubricClasses} text-sm font-sans italic block mb-1`}>{p.segunda_lectura.cita}</span>
                <p className="font-serif font-bold text-[#800020] text-lg">
                  {getLectionaryIntroduction(p.segunda_lectura.cita, 'segunda')}
                </p>
              </div>
              <p className="capitular-letter whitespace-pre-line font-medium leading-relaxed">
                {cleanReadingText(p.segunda_lectura.texto)}
              </p>
              <div className="pt-2 text-base">
                <p className="font-bold">Palabra de Dios.</p>
                <p className={`${rubricClasses} pl-4`}>R. Te alabamos, Señor.</p>
              </div>
            </section>
          )}

          {/* Evangelio */}
          {p.evangelio && (
            <section id="atril-evangelio" className="space-y-4 pt-6 border-t border-current/20">
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-[#800020] block">
                  Santo Evangelio
                </span>
                <span className={`${rubricClasses} text-sm font-sans italic block mb-1`}>{p.evangelio.cita}</span>
                <p className="font-serif font-bold text-[#800020] text-xl">
                  {getLectionaryIntroduction(p.evangelio.cita, 'evangelio')}
                </p>
              </div>
              
              <div className="space-y-1.5 text-base font-sans p-4 rounded-sm bg-black/5 border border-current/10">
                <p>El Señor esté con ustedes. <span className={rubricClasses}>R. Y con tu espíritu.</span></p>
                <p>✠ Proclamación del santo Evangelio según {getGospelEvangelistName(p.evangelio.cita)}. <span className={rubricClasses}>R. Gloria a ti, Señor.</span></p>
              </div>

              <p className="capitular-letter whitespace-pre-line font-semibold leading-relaxed pt-2">
                {cleanReadingText(p.evangelio.texto)}
              </p>

              <div className="pt-2 text-base font-sans">
                <p className="font-bold">Palabra del Señor.</p>
                <p className={`${rubricClasses} pl-4`}>R. Gloria a ti, Señor Jesús.</p>
              </div>
            </section>
          )}

          {/* Consagración */}
          <section id="atril-eucaristia" className="space-y-6 pt-6 border-t border-current/20 text-center">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-[#800020]">
              Palabras de la Consagración
            </h2>
            <div className="p-8 rounded-sm border-2 border-[#800020] space-y-4">
              <p className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide text-[#800020]">
                TOMEN Y COMAN TODOS DE ÉL, PORQUE ESTO ES MI CUERPO, QUE SERÁ ENTREGADO POR USTEDES.
              </p>
              <div className="my-4 border-t border-[#800020]/30" />
              <p className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide text-[#800020]">
                TOMEN Y BEBAN TODOS DE ÉL, PORQUE ÉSTE ES EL CÁLIZ DE MI SANGRE, SANGRE DE LA ALIANZA NUEVA Y ETERNA, QUE SERÁ DERRAMADA POR USTEDES Y POR MUCHOS PARA EL PERDÓN DE LOS PECADOS. HAGAN ESTO EN CONMEMORACIÓN MÍA.
              </p>
            </div>
          </section>

          {/* Postcomunión */}
          {day.oracion_comunion && (
            <section id="atril-postcomunion" className="space-y-3 pt-6 border-t border-current/20">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#800020]">
                Oración después de la Comunión
              </h2>
              <p className={`${rubricClasses} text-sm font-sans italic`}>Oremos:</p>
              <p className="whitespace-pre-line leading-relaxed">{day.oracion_comunion}</p>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};
