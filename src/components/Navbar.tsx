import React from 'react';
import { 
  Calendar as CalendarIcon, 
  BookOpen, 
  Printer, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Globe
} from 'lucide-react';
import { LiturgicalDay } from '../types/liturgia';
import { getColorHex } from '../utils/calendar';

interface NavbarProps {
  currentDay: LiturgicalDay;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onOpenAtril: () => void;
  onOpenImpresor: () => void;
  onTogglePadrePro: () => void;
  isPadreProOpen: boolean;
  region: string;
  onRegionChange: (reg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDay,
  selectedDate,
  onDateChange,
  onOpenAtril,
  onOpenImpresor,
  onTogglePadrePro,
  isPadreProOpen,
  region,
  onRegionChange
}) => {
  const colorStyle = getColorHex(currentDay.color);

  const handlePrevDay = () => {
    const d = new Date(selectedDate + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() - 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() + 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    const today = new Date().toISOString().split('T')[0];
    onDateChange(today);
  };

  return (
    <header className="bg-[#F0EDE6] text-[#2D2926] border-b border-[#D9D1C3] sticky top-0 z-30 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Logo and Brand - Editorial Style */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-[#2D2926] text-[#F9F7F2] flex items-center justify-center font-serif font-bold text-lg tracking-tighter shadow-xs">
            LP.
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-widest text-[#2D2926]">LITURGIA</span>
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#800020] border-b border-[#800020] pb-0.5">PRO</span>
            </div>
            <p className="text-[10px] text-[#555] font-sans tracking-wide -mt-0.5 hidden sm:block">Plataforma & Asistencia Litúrgica</p>
          </div>
        </div>

        {/* Date Selector and Liturgical Info - Editorial Aesthetic */}
        <div className="flex items-center bg-[#F9F7F2] border border-[#D9D1C3] rounded-md px-2 py-1 gap-1 sm:gap-2 shadow-xs">
          <button 
            onClick={handlePrevDay} 
            title="Día anterior"
            className="p-1 rounded text-[#555] hover:text-[#2D2926] hover:bg-[#EAE5DC] transition"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex items-center gap-2 px-1">
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => e.target.value && onDateChange(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-sans font-medium text-[#2D2926] focus:outline-none cursor-pointer"
            />
            <button 
              onClick={handleToday}
              className="text-[10px] font-sans uppercase tracking-widest font-bold text-[#800020] hover:underline px-1 py-0.5 hidden md:inline"
            >
              Hoy
            </button>
          </div>

          <button 
            onClick={handleNextDay} 
            title="Día siguiente"
            className="p-1 rounded text-[#555] hover:text-[#2D2926] hover:bg-[#EAE5DC] transition"
          >
            <ChevronRight size={16} />
          </button>

          {/* Liturgical Season and Color Pill */}
          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#D9D1C3]">
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs ring-1 ring-black/10"
              style={{ backgroundColor: colorStyle.accent }}
              title={`Color Litúrgico: ${currentDay.color}`}
            />
            <span className="text-xs font-serif italic text-[#444] whitespace-nowrap">
              {currentDay.tiempo_liturgico}
            </span>
          </div>
        </div>

        {/* Region & Tools Actions */}
        <div className="flex items-center gap-2">
          {/* Region Selector */}
          <div className="hidden sm:flex items-center bg-[#F9F7F2] border border-[#D9D1C3] rounded-md px-2 py-1 text-xs">
            <Globe size={13} className="text-[#666] mr-1.5" />
            <select 
              value={region}
              onChange={(e) => onRegionChange(e.target.value)}
              className="bg-transparent text-[#2D2926] text-xs font-sans focus:outline-none cursor-pointer"
            >
              <option value="mx">🇲🇽 México (CEM)</option>
              <option value="us_es">🇺🇸 USA (Español)</option>
              <option value="es">🇪🇸 España (CEE)</option>
              <option value="latam">🌎 Latinoamérica</option>
            </select>
          </div>

          {/* Atril Button */}
          <button
            onClick={onOpenAtril}
            title="Modo Atril de Altar / Tablet"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F9F7F2] hover:bg-[#EAE5DC] text-[#2D2926] border border-[#D9D1C3] text-xs font-sans font-medium transition shadow-xs"
          >
            <Maximize2 size={13} className="text-[#800020]" />
            <span className="hidden md:inline">Atril</span>
          </button>

          {/* Impresor Button */}
          <button
            onClick={onOpenImpresor}
            title="Panel de Impresión y Folletos"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F9F7F2] hover:bg-[#EAE5DC] text-[#2D2926] border border-[#D9D1C3] text-xs font-sans font-medium transition shadow-xs"
          >
            <Printer size={13} className="text-[#2D2926]" />
            <span className="hidden md:inline">Imprimir</span>
          </button>

          {/* Padre PRO AI Assistant Button */}
          <button
            onClick={onTogglePadrePro}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-sans font-bold tracking-wide transition shadow-xs ${
              isPadreProOpen 
                ? 'bg-[#800020] text-[#F9F7F2] ring-2 ring-[#800020]/30' 
                : 'bg-[#2D2926] text-[#F9F7F2] hover:bg-[#1A1715]'
            }`}
          >
            <Sparkles size={13} className={isPadreProOpen ? 'text-amber-300' : 'text-amber-400'} />
            <span>Padre PRO <span className="text-[9px] uppercase tracking-widest font-sans opacity-70 ml-0.5">IA</span></span>
          </button>
        </div>

      </div>
    </header>
  );
};
