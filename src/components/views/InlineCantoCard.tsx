import React, { useState } from 'react';
import { Music, ChevronDown, ChevronUp, RefreshCw, Volume2 } from 'lucide-react';
import { Cantico, SchemaCantosMisa } from '../../types/liturgia';
import { CANTICOS_LIST } from '../../data/liturgyData';

interface InlineCantoCardProps {
  momentoLabel: string;
  cantoTitle?: string;
  momentoKey: keyof SchemaCantosMisa;
  onOpenModal: (canto: Cantico) => void;
  onChangeCanto: (momento: keyof SchemaCantosMisa) => void;
  defaultExpanded?: boolean;
}

export const InlineCantoCard: React.FC<InlineCantoCardProps> = ({
  momentoLabel,
  cantoTitle,
  momentoKey,
  onOpenModal,
  onChangeCanto,
  defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!cantoTitle) return null;

  // Resolve matching song from catalog
  const cleanTitle = cantoTitle.toLowerCase().split('(')[0].trim();
  const matchedCanto: Cantico = CANTICOS_LIST.find(c => 
    c.titulo.toLowerCase().includes(cleanTitle) || 
    cleanTitle.includes(c.titulo.toLowerCase())
  ) || {
    id: `canto-${momentoKey}`,
    titulo: cantoTitle,
    momento: momentoLabel,
    tiempo: 'Tiempo Litúrgico',
    tonalidad: 'Tono tradicional',
    letra: `Canto litúrgico sugerido para el momento de ${momentoLabel}.\n\nPresione "Escuchar en YouTube" para acceder a la interpretación coral y acordes para guitarra/órgano.`
  };

  const handleOpenYoutube = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = matchedCanto.youtubeQuery || `${matchedCanto.titulo} canto catolico misa`;
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="bg-[#FAF8F5] border-2 border-[#800020]/20 rounded-md my-3 shadow-2xs overflow-hidden transition-all">
      {/* Canto Header Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3 sm:px-4 bg-[#F0EDE6] hover:bg-[#EAE5DC] cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D9D1C3]/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#800020] text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
            <Music size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#800020] bg-[#800020]/10 px-2 py-0.5 rounded">
                {momentoLabel}
              </span>
              {matchedCanto.tonalidad && (
                <span className="text-[10px] font-sans font-medium text-[#666] bg-white px-1.5 py-0.5 rounded border border-[#D9D1C3]">
                  {matchedCanto.tonalidad}
                </span>
              )}
            </div>
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D2926] mt-0.5">
              {matchedCanto.titulo}
            </h4>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-center">
          <button
            onClick={handleOpenYoutube}
            title="Escuchar canto en YouTube"
            className="p-1.5 hover:bg-white text-[#800020] rounded border border-transparent hover:border-[#D9D1C3] transition-colors text-xs flex items-center gap-1 font-sans font-medium"
          >
            <Volume2 size={13} />
            <span className="hidden md:inline text-[11px]">Escuchar</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onChangeCanto(momentoKey);
            }}
            title="Cambiar este canto por otro del repertorio"
            className="p-1.5 hover:bg-white text-[#555] hover:text-[#800020] rounded border border-transparent hover:border-[#D9D1C3] transition-colors text-xs flex items-center gap-1 font-sans font-medium"
          >
            <RefreshCw size={13} />
            <span className="hidden md:inline text-[11px]">Cambiar</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(matchedCanto);
            }}
            title="Ver acordes y transportar tono"
            className="px-2.5 py-1 bg-white hover:bg-[#800020] text-[#800020] hover:text-white border border-[#800020]/30 rounded text-[11px] font-sans font-bold transition-colors shadow-2xs"
          >
            Acordes
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-[#800020] hover:bg-white rounded transition-colors"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Expanded Inline Lyrics and Chords */}
      {isExpanded && (
        <div className="p-4 sm:p-5 bg-[#FAF8F5] animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-sans text-[#777] mb-3 pb-2 border-b border-[#EAE5DC]">
            <span className="italic">Letra y acordes para la asamblea y el coro</span>
            {matchedCanto.autor && (
              <span className="font-medium text-[#800020]">Autor: {matchedCanto.autor}</span>
            )}
          </div>

          <pre className="font-sans text-xs sm:text-sm text-[#2D2926] leading-relaxed whitespace-pre-wrap select-text bg-white/80 p-4 rounded border border-[#EAE5DC] shadow-inner">
            {matchedCanto.letra}
          </pre>

          {matchedCanto.acordes && (
            <div className="mt-3 flex items-center gap-2 text-xs font-sans bg-[#F0EDE6] p-2.5 rounded border border-[#D9D1C3]">
              <span className="font-bold text-[#800020]">Secuencia armónica básica:</span>
              <span className="font-mono text-xs text-[#2D2926] font-semibold">{matchedCanto.acordes}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
