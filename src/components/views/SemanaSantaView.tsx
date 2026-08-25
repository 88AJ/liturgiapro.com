import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  BookOpen, 
  Printer, 
  CheckSquare, 
  Square, 
  Music, 
  Users, 
  Sparkles, 
  Cross, 
  Scroll, 
  Sun, 
  Moon, 
  Info,
  ChevronRight,
  Download,
  Share2
} from 'lucide-react';
import { SEMANA_SANTA_DATA, HolyWeekDay } from '../../data/semanaSantaData';

type TabType = 'misal' | 'sacristia' | 'cantoral' | 'ministerios' | 'subsidios';

export const SemanaSantaView: React.FC = () => {
  const [selectedDayId, setSelectedDayId] = useState<string>('jueves');
  const [activeTab, setActiveTab] = useState<TabType>('misal');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('liturgia_pro_holy_week_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentDay: HolyWeekDay = SEMANA_SANTA_DATA[selectedDayId] || SEMANA_SANTA_DATA['jueves'];

  useEffect(() => {
    try {
      localStorage.setItem('liturgia_pro_holy_week_checklist', JSON.stringify(checkedItems));
    } catch (e) {
      console.error(e);
    }
  }, [checkedItems]);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-lg';
    if (fontSize === 'xlarge') return 'text-xl';
    return 'text-base';
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 font-sans">
      
      {/* Editorial Header Banner */}
      <header className="bg-gradient-to-br from-[#2D2926] via-[#1E1B18] to-[#12100E] text-[#F9F7F2] rounded-xl p-6 sm:p-8 shadow-md border border-[#800020]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#800020]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-cinzel font-bold tracking-widest uppercase bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 shadow-xs">
                <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
                TRIDUO PASCUAL & SEMANA SANTA
              </span>
              <span className="text-xs text-[#D9D1C3]/70 font-mono">Pascua 2026</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-cinzel font-bold text-[#F9F7F2] tracking-wide">
              {currentDay.titulo}
            </h1>
            <p className="text-sm sm:text-base text-[#D9D1C3]/90 italic font-serif max-w-2xl">
              {currentDay.subtitulo}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
            {/* Font Size Selector */}
            <div className="bg-[#2D2926]/80 backdrop-blur-xs border border-[#D9D1C3]/30 rounded-md p-1 flex items-center gap-1 text-xs">
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'normal' ? 'bg-[#800020] text-white' : 'text-[#D9D1C3] hover:text-white'}`}
                title="Texto normal"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded font-semibold transition-colors ${fontSize === 'large' ? 'bg-[#800020] text-white' : 'text-[#D9D1C3] hover:text-white'}`}
                title="Texto grande"
              >
                A+
              </button>
              <button 
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded font-bold transition-colors ${fontSize === 'xlarge' ? 'bg-[#800020] text-white' : 'text-[#D9D1C3] hover:text-white'}`}
                title="Texto muy grande"
              >
                A++
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-md bg-[#800020] hover:bg-[#990026] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Guion</span>
            </button>
          </div>
        </div>

        {/* Lema litúrgico */}
        <div className="mt-6 pt-4 border-t border-[#D9D1C3]/20 flex items-center gap-2 text-xs sm:text-sm text-[#D4AF37] font-serif italic">
          <Sparkles className="w-4 h-4 shrink-0 text-[#D4AF37]" />
          <span>{currentDay.lema}</span>
        </div>
      </header>

      {/* Day Selector Navigation Pills */}
      <nav className="bg-[#F0EDE6] p-1.5 rounded-xl border border-[#D9D1C3] shadow-xs flex items-center gap-2 overflow-x-auto no-print scrollbar-thin">
        {[
          { id: 'ramos', label: 'D. Ramos', full: 'Domingo de Ramos', badge: 'Rojo', colorClass: 'bg-red-800 text-white' },
          { id: 'jueves', label: 'Jueves Santo', full: 'Jueves Santo (Cena del Señor)', badge: 'Blanco', colorClass: 'bg-amber-100 text-amber-900 border-amber-300' },
          { id: 'viernes', label: 'Viernes Santo', full: 'Viernes Santo (Pasión)', badge: 'Rojo', colorClass: 'bg-red-800 text-white' },
          { id: 'vigilia', label: 'Vigilia Pascual', full: 'Solemne Vigilia Pascual', badge: 'Blanco/Oro', colorClass: 'bg-amber-100 text-amber-900 border-amber-300' },
          { id: 'domingo_pascua', label: 'D. Resurrección', full: 'Domingo de Pascua', badge: 'Blanco', colorClass: 'bg-amber-100 text-amber-900 border-amber-300' }
        ].map(day => (
          <button
            key={day.id}
            onClick={() => setSelectedDayId(day.id)}
            className={`
              flex-1 min-w-[130px] px-3.5 py-2.5 rounded-lg text-xs font-cinzel font-bold transition-all text-center flex flex-col items-center justify-center gap-1
              ${selectedDayId === day.id 
                ? 'bg-[#2D2926] text-[#F9F7F2] shadow-sm scale-[1.02]' 
                : 'text-[#5C554E] hover:bg-[#E5E0D5] hover:text-[#2D2926]'}
            `}
          >
            <span className="tracking-wider">{day.label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${day.colorClass}`}>
              {day.badge}
            </span>
          </button>
        ))}
      </nav>

      {/* Module / Ministry Tab Switcher */}
      <div className="flex border-b border-[#D9D1C3] gap-2 sm:gap-6 overflow-x-auto no-print">
        {[
          { id: 'misal' as TabType, label: 'Guion y Misal', icon: BookOpen },
          { id: 'sacristia' as TabType, label: 'Sacristía & Altar', icon: CheckSquare },
          { id: 'cantoral' as TabType, label: 'Cantoral & Coro', icon: Music },
          { id: 'ministerios' as TabType, label: 'Monaguillos & Roles', icon: Users },
          { id: 'subsidios' as TabType, label: 'Devociones & Retiros', icon: Scroll },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 pb-3 px-2 border-b-2 font-cinzel text-xs sm:text-sm font-semibold tracking-wider whitespace-nowrap transition-colors
                ${isActive 
                  ? 'border-[#800020] text-[#800020]' 
                  : 'border-transparent text-[#736B63] hover:text-[#2D2926]'}
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#800020]' : 'text-[#736B63]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="bg-[#FCFAF7] rounded-xl p-5 sm:p-8 border border-[#E8E2D5] shadow-xs">
        
        {/* ========================================================================= */}
        {/* TAB 1: GUION Y MISAL */}
        {/* ========================================================================= */}
        {activeTab === 'misal' && (
          <div className="space-y-8">
            <div className="bg-[#F0EDE6] p-4 rounded-lg border border-[#D9D1C3] flex items-center justify-between text-xs text-[#5C554E]">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#800020]" />
                <span>Textos oficiales del <strong>Misal Romano</strong> y <strong>Leccionario de la Misa</strong>.</span>
              </div>
              <span className="font-mono text-[#800020] font-semibold">Rúbricas en Rojo</span>
            </div>

            {currentDay.partesMisal.map(parte => (
              <section key={parte.id} className="space-y-5 border-b border-[#E8E2D5] pb-8 last:border-b-0">
                <h2 className="text-xl font-cinzel font-bold text-[#800020] border-l-4 border-[#800020] pl-3">
                  {parte.nombre}
                </h2>

                <div className="space-y-4">
                  {parte.secciones.map((sec, idx) => (
                    <div key={idx} className="space-y-1.5">
                      {sec.tipo === 'rubrica' && (
                        <div className="p-3 bg-[#FFF5F5] border-l-2 border-[#D9534F] rounded-r-md text-xs sm:text-sm text-[#800020] font-serif italic leading-relaxed">
                          {sec.texto}
                        </div>
                      )}

                      {sec.tipo === 'monicion' && (
                        <div className="p-4 bg-[#F5F2EB] border border-[#D9D1C3] rounded-lg">
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#800020] font-cinzel block mb-1">
                            {sec.titulo || 'Monición'}
                          </span>
                          <p className={`text-[#2D2926] font-serif leading-relaxed ${getFontSizeClass()}`}>
                            {sec.texto}
                          </p>
                        </div>
                      )}

                      {sec.tipo === 'sacerdote' && (
                        <div className="p-4 bg-white border border-[#E8E2D5] rounded-lg shadow-2xs space-y-2">
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#800020] font-cinzel block">
                            {sec.titulo || 'Sacerdote'}
                          </span>
                          <p className={`text-[#2D2926] font-serif leading-relaxed whitespace-pre-line ${getFontSizeClass()}`}>
                            {sec.texto}
                          </p>
                        </div>
                      )}

                      {sec.tipo === 'dialogo' && (
                        <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C3] rounded-lg font-serif">
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#800020] font-cinzel block mb-2">
                            {sec.titulo}
                          </span>
                          <p className={`text-[#2D2926] whitespace-pre-line leading-relaxed ${getFontSizeClass()}`}>
                            {sec.texto}
                          </p>
                        </div>
                      )}

                      {sec.tipo === 'lectura' && (
                        <div className="p-5 bg-white border border-[#D9D1C3] rounded-xl shadow-2xs space-y-3">
                          <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-2">
                            <span className="font-cinzel font-bold text-sm text-[#800020]">
                              {sec.titulo}
                            </span>
                            {sec.cita && (
                              <span className="text-xs font-mono text-[#736B63] bg-[#F5F2EB] px-2.5 py-1 rounded">
                                {sec.cita}
                              </span>
                            )}
                          </div>
                          <p className={`text-[#2D2926] font-serif leading-relaxed whitespace-pre-line ${getFontSizeClass()}`}>
                            {sec.texto}
                          </p>
                        </div>
                      )}

                      {sec.tipo === 'canto' && (
                        <div className="p-4 bg-[#F9F6F0] border border-[#D4AF37]/40 rounded-lg">
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#996515] font-cinzel flex items-center gap-1.5 mb-1">
                            <Music className="w-3.5 h-3.5" />
                            {sec.titulo || 'Canto'}
                          </span>
                          <p className={`text-[#2D2926] font-serif italic whitespace-pre-line leading-relaxed ${getFontSizeClass()}`}>
                            {sec.texto}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SACRISTÍA & CREDENCIA */}
        {/* ========================================================================= */}
        {activeTab === 'sacristia' && (
          <div className="space-y-8">
            {/* Reglas de oro */}
            <div className="bg-[#FFF9E6] border border-[#FFE082] p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-cinzel font-bold text-[#8D6E63] flex items-center gap-2 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Reglas de Oro del Sacristán para este día
              </h3>
              <ul className="space-y-2">
                {currentDay.sacristia.reglasOro.map((regla, i) => (
                  <li key={i} className="text-xs sm:text-sm text-[#4E342E] flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">•</span>
                    <span>{regla}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cuadrícula de Preparación */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-[#E8E2D5] space-y-2">
                <h4 className="font-cinzel font-bold text-xs text-[#800020] uppercase tracking-wider">
                  Vestiduras Sagradas
                </h4>
                <ul className="text-xs text-[#5C554E] space-y-1.5">
                  {currentDay.sacristia.vestiduras.map((v, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#800020]">•</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white rounded-lg border border-[#E8E2D5] space-y-2">
                <h4 className="font-cinzel font-bold text-xs text-[#800020] uppercase tracking-wider">
                  Altar y Credencia
                </h4>
                <ul className="text-xs text-[#5C554E] space-y-1.5">
                  {currentDay.sacristia.altarYCredencia.map((a, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#800020]">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white rounded-lg border border-[#E8E2D5] space-y-2">
                <h4 className="font-cinzel font-bold text-xs text-[#800020] uppercase tracking-wider">
                  Elementos Especiales
                </h4>
                <ul className="text-xs text-[#5C554E] space-y-1.5">
                  {currentDay.sacristia.elementosEspeciales.map((e, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#800020]">•</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Checklists */}
            <div className="space-y-6">
              <h3 className="text-lg font-cinzel font-bold text-[#2D2926]">
                Checklist Interactivo de Sacristía
              </h3>

              {currentDay.sacristia.checklists.map((group, gIdx) => (
                <div key={gIdx} className="bg-white rounded-xl p-5 border border-[#D9D1C3] shadow-2xs space-y-3">
                  <h4 className="text-xs font-cinzel font-bold text-[#800020] uppercase tracking-wider border-b border-[#E8E2D5] pb-2">
                    {group.momento}
                  </h4>
                  <div className="space-y-2.5">
                    {group.items.map(item => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div 
                          key={item.id}
                          onClick={() => toggleCheck(item.id)}
                          className={`
                            flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors
                            ${isChecked ? 'bg-emerald-50 text-emerald-900 line-through' : 'hover:bg-[#F5F2EB] text-[#2D2926]'}
                          `}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                          ) : (
                            <Square className="w-5 h-5 text-[#8C827A] shrink-0" />
                          )}
                          <span className="text-xs sm:text-sm font-sans">{item.texto}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CANTORAL & CORO */}
        {/* ========================================================================= */}
        {activeTab === 'cantoral' && (
          <div className="space-y-6">
            <div className="bg-[#F0EDE6] p-4 rounded-lg border border-[#D9D1C3] flex items-center justify-between text-xs text-[#5C554E]">
              <span>Repertorio propio para <strong>{currentDay.titulo}</strong> con acordes para coro parroquial.</span>
              <span className="font-mono text-[#800020]">{currentDay.cantoral.length} Cantos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentDay.cantoral.map((canto, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-[#D9D1C3] shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#800020] bg-[#FFF0F0] px-2 py-0.5 rounded border border-[#FFD0D0]">
                        {canto.momento}
                      </span>
                      {canto.tonalidad && (
                        <span className="text-xs font-mono text-[#D4AF37] font-bold bg-[#2D2926] px-2 py-0.5 rounded">
                          Tono: {canto.tonalidad}
                        </span>
                      )}
                    </div>
                    <h3 className="font-cinzel font-bold text-base text-[#2D2926]">
                      {canto.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm font-serif text-[#4A453F] whitespace-pre-line leading-relaxed italic bg-[#FCFAF7] p-3 rounded border border-[#E8E2D5]">
                      {canto.letra}
                    </p>
                  </div>

                  {canto.acordes && (
                    <div className="pt-2 border-t border-[#E8E2D5]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#736B63] block mb-1">
                        Armonía & Acordes sugeridos:
                      </span>
                      <code className="text-xs font-mono bg-[#F5F2EB] text-[#800020] px-2.5 py-1 rounded block">
                        {canto.acordes}
                      </code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MINISTERIOS (MONAGUILLOS, MEC, UJIERES, LECTORES) */}
        {/* ========================================================================= */}
        {activeTab === 'ministerios' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Monaguillos */}
              <div className="bg-white p-5 rounded-xl border border-[#D9D1C3] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-[#E8E2D5] pb-2 text-[#800020]">
                  <Flame className="w-4 h-4 text-[#800020]" />
                  <h3 className="font-cinzel font-bold text-sm tracking-wide">Monaguillos y Acólitos</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#4A453F]">
                  {currentDay.ministerios.monaguillos.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#800020] font-bold">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MEC */}
              <div className="bg-white p-5 rounded-xl border border-[#D9D1C3] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-[#E8E2D5] pb-2 text-[#800020]">
                  <Users className="w-4 h-4 text-[#800020]" />
                  <h3 className="font-cinzel font-bold text-sm tracking-wide">MEC (Ministros de la Comunión)</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#4A453F]">
                  {currentDay.ministerios.mec.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#800020] font-bold">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lectores */}
              <div className="bg-white p-5 rounded-xl border border-[#D9D1C3] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-[#E8E2D5] pb-2 text-[#800020]">
                  <BookOpen className="w-4 h-4 text-[#800020]" />
                  <h3 className="font-cinzel font-bold text-sm tracking-wide">Lectores y Proclamadores</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#4A453F]">
                  {currentDay.ministerios.lectores.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#800020] font-bold">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ujieres y Hospitalidad */}
              <div className="bg-white p-5 rounded-xl border border-[#D9D1C3] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 border-b border-[#E8E2D5] pb-2 text-[#800020]">
                  <Users className="w-4 h-4 text-[#800020]" />
                  <h3 className="font-cinzel font-bold text-sm tracking-wide">Ujieres y Hospitalidad</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#4A453F]">
                  {currentDay.ministerios.ujieres.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#800020] font-bold">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: DEVOCIONES & SUBSIDIOS */}
        {/* ========================================================================= */}
        {activeTab === 'subsidios' && (
          <div className="space-y-6">
            {currentDay.subsidios && currentDay.subsidios.length > 0 ? (
              currentDay.subsidios.map((sub, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-[#D9D1C3] shadow-2xs space-y-4">
                  <h3 className="font-cinzel font-bold text-base text-[#800020] border-b border-[#E8E2D5] pb-2 flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#D4AF37]" />
                    {sub.titulo}
                  </h3>
                  <div className={`text-[#2D2926] font-serif leading-relaxed whitespace-pre-line ${getFontSizeClass()} bg-[#FCFAF7] p-5 rounded-lg border border-[#E8E2D5]`}>
                    {sub.contenido}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-[#736B63] space-y-2">
                <Scroll className="w-8 h-8 mx-auto text-[#D9D1C3]" />
                <p className="font-serif">No hay subsidios devocionales adicionales para esta jornada.</p>
                <p className="text-xs">Consulta la pestaña de <strong>Guion y Misal</strong> para el rito oficial.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
