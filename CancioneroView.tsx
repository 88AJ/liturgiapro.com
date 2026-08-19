import React, { useState, useMemo } from 'react';
import { 
  Music, 
  Search, 
  Plus, 
  Play, 
  Printer, 
  Volume2, 
  FileText, 
  SlidersHorizontal,
  BookmarkPlus,
  Trash2
} from 'lucide-react';
import { CANTICOS_LIST } from '../../data/liturgyData';
import { Cantico, MomentoMisa, SchemaCantosMisa } from '../../types/liturgia';

interface CancioneroViewProps {
  onOpenImpresor: () => void;
}

export const CancioneroView: React.FC<CancioneroViewProps> = ({ onOpenImpresor }) => {
  const [cantos, setCantos] = useState<Cantico[]>(CANTICOS_LIST);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMomento, setSelectedMomento] = useState<string>('todos');
  const [selectedCanto, setSelectedCanto] = useState<Cantico | null>(CANTICOS_LIST[0] || null);
  const [transposeSemi, setTransposeSemi] = useState<number>(0);
  
  // Weekly Choir Liturgical Plan
  const [esquemaMisa, setEsquemaMisa] = useState<SchemaCantosMisa>({
    entrada: 'Vienen con Alegría',
    gloria: 'Gloria a Dios (Mejía)',
    salmo: 'Salmo 22 - El Señor es mi Pastor',
    ofertorio: 'Saber que Vendrás',
    santo: 'Santo Solemne (Haugen)',
    paz: 'Paz en la Tierra',
    comunion: 'Pescador de Hombres',
    salida: 'Madre del Redentor'
  });

  const momentosList: { id: string; label: string }[] = [
    { id: 'todos', label: 'Todos los Cantos' },
    { id: 'Entrada', label: 'Entrada' },
    { id: 'Kyrie', label: 'Kyrie / Piedad' },
    { id: 'Gloria', label: 'Gloria' },
    { id: 'Salmo', label: 'Salmo' },
    { id: 'Aleluya', label: 'Aleluya' },
    { id: 'Ofertorio', label: 'Ofertorio' },
    { id: 'Santo', label: 'Santo' },
    { id: 'Paz', label: 'Paz' },
    { id: 'Cordero', label: 'Cordero' },
    { id: 'Comunión', label: 'Comunión' },
    { id: 'Salida', label: 'Salida' },
    { id: 'Mariano', label: 'Mariano' },
  ];

  const filteredCantos = useMemo(() => {
    return cantos.filter((c) => {
      const matchSearch = c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.letra.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.autor && c.autor.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchMomento = selectedMomento === 'todos' || c.momento === selectedMomento;
      return matchSearch && matchMomento;
    });
  }, [cantos, searchTerm, selectedMomento]);

  const handleAssignToEsquema = (momentoKey: keyof SchemaCantosMisa, titulo: string) => {
    setEsquemaMisa(prev => ({
      ...prev,
      [momentoKey]: titulo
    }));
  };

  return (
    <div className="space-y-8 font-serif">
      {/* Top Banner - Editorial Aesthetic */}
      <div className="bg-[#F0EDE6] p-6 sm:p-10 rounded-md border border-[#D9D1C3] shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[1px] w-6 bg-[#800020]"></span>
            <span className="uppercase font-sans text-[11px] tracking-[0.3em] text-[#800020] font-bold">
              Cantorale Romanum
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light font-serif leading-tight italic text-[#2D2926]">
            Cantoral Litúrgico & Coro PRO
          </h1>
          <p className="text-xs font-sans text-[#555] mt-1">
            Himnario litúrgico clasificado con acordes, transporte tonal y diseñador de guión para coro.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans">
          <button
            onClick={onOpenImpresor}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-bold bg-[#800020] hover:bg-[#660019] text-[#F9F7F2] transition shadow-xs"
          >
            <Printer size={13} />
            <span>Imprimir Esquema</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Hymnal Explorer & Right Canto Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Explorer: Search, Categories & List */}
        <div className="lg:col-span-5 space-y-4 font-sans text-xs">
          
          {/* Search bar */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-[#777]" />
            <input
              type="text"
              placeholder="Buscar canto por título, letra o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F0EDE6] border border-[#D9D1C3] rounded-sm pl-9 pr-3 py-2 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020] shadow-2xs"
            />
          </div>

          {/* Momentos Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {momentosList.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMomento(m.id)}
                className={`px-2.5 py-1 rounded-sm text-[11px] whitespace-nowrap transition border ${
                  selectedMomento === m.id
                    ? 'bg-[#800020] text-[#F9F7F2] border-[#800020] font-bold'
                    : 'bg-[#F0EDE6] text-[#444] border-[#D9D1C3] hover:bg-[#EAE5DC]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Hymns List */}
          <div className="bg-[#FDFBF7] rounded-md border border-[#D9D1C3] shadow-xs divide-y divide-[#D9D1C3] max-h-[460px] overflow-y-auto">
            {filteredCantos.length === 0 ? (
              <div className="p-8 text-center text-[#777] font-serif italic text-sm">
                No se encontraron cantos para este filtro.
              </div>
            ) : (
              filteredCantos.map((c) => {
                const isSelected = selectedCanto?.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCanto(c)}
                    className={`w-full text-left p-3.5 flex items-start justify-between gap-3 transition ${
                      isSelected 
                        ? 'bg-[#F0EDE6] border-l-3 border-[#800020]' 
                        : 'hover:bg-[#F9F7F2]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#2D2926]">{c.titulo}</span>
                        {c.tonalidad && (
                          <span className="px-1.5 py-0.2 rounded-sm bg-[#EAE5DC] text-[#2D2926] font-mono text-[10px] font-bold">
                            {c.tonalidad}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#666] font-sans mt-0.5">
                        {c.momento} {c.autor ? `• ${c.autor}` : ''}
                      </p>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#800020] pt-0.5">
                      Ver ➔
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Quick Weekly Choir Schedule */}
          <div className="bg-[#F0EDE6] p-5 rounded-md border border-[#D9D1C3] shadow-xs space-y-3 font-sans">
            <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-2">
              <h3 className="font-bold text-[#800020] uppercase tracking-[0.2em] text-[10px]">
                Esquema para la Misa Dominical
              </h3>
            </div>
            
            <div className="space-y-1.5 text-xs text-[#333]">
              {Object.entries(esquemaMisa).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-0.5">
                  <span className="capitalize text-[#666] font-medium">{key}:</span>
                  <span className="font-serif font-bold text-[#2D2926] text-[13px]">{val || '—'}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Selected Canto Viewer Sheet */}
        <div className="lg:col-span-7">
          {selectedCanto ? (
            <div className="bg-[#FDFBF7] p-6 sm:p-10 rounded-md border border-[#D9D1C3] shadow-xs space-y-6">
              
              {/* Canto Header */}
              <div className="border-b border-[#D9D1C3] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#800020]">
                      {selectedCanto.momento}
                    </span>
                    {selectedCanto.tiempo && (
                      <span className="text-[10px] font-serif italic text-[#666]">
                        • {selectedCanto.tiempo}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light font-serif italic text-[#2D2926]">
                    {selectedCanto.titulo}
                  </h2>
                  {selectedCanto.autor && (
                    <p className="text-xs font-sans text-[#666] mt-0.5">Autor: {selectedCanto.autor}</p>
                  )}
                </div>

                {/* Tone Controls & Assign */}
                <div className="flex items-center gap-2 font-sans text-xs">
                  {selectedCanto.tonalidad && (
                    <div className="bg-[#F0EDE6] px-3 py-1 rounded-sm border border-[#D9D1C3] text-center">
                      <span className="block text-[9px] text-[#666] uppercase tracking-wider">Tono</span>
                      <span className="font-mono font-bold text-[#800020] text-sm">{selectedCanto.tonalidad}</span>
                    </div>
                  )}

                  {selectedCanto.youtubeQuery && (
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedCanto.youtubeQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#F0EDE6] hover:bg-[#EAE5DC] text-[#2D2926] border border-[#D9D1C3] font-medium transition"
                    >
                      <Play size={12} className="text-[#800020]" />
                      <span>Audio</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Chords & Lyrics Sheet */}
              <div className="space-y-4 font-serif text-[17px] leading-[1.8] text-[#2D2926]">
                <div className="bg-[#F5F2EB] p-6 rounded-sm border border-[#D9D1C3] font-mono text-xs whitespace-pre-wrap text-[#2D2926] leading-relaxed">
                  {selectedCanto.acordes || selectedCanto.letra}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-[#FDFBF7] p-12 rounded-md border border-[#D9D1C3] text-center text-[#777] font-serif italic">
              Selecciona un canto para ver su letra, acordes y enlaces de ensayo.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
