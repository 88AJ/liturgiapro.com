import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  X, 
  Download, 
  Layers, 
  ShieldCheck,
  ChevronRight,
  Music,
  Calendar,
  FileText
} from 'lucide-react';
import { LiturgicalDay } from '../../types/liturgia';
import { fetchOfficialLiturgicalDay, searchLibrarianCelebration } from '../../utils/liturgicalAiClient';
import { isDayGeneric, saveLiturgicalDayToCache } from '../../utils/liturgicalCache';

interface BibliotecarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay: LiturgicalDay;
  onApplyDay: (updatedDay: LiturgicalDay) => void;
  region: string;
}

export const BibliotecarioModal: React.FC<BibliotecarioModalProps> = ({
  isOpen,
  onClose,
  currentDay,
  onApplyDay,
  region
}) => {
  const [activeTab, setActiveTab] = useState<'sync-day' | 'search' | 'bulk'>('sync-day');
  
  // Tab 1: Sync Day State
  const [loadingSync, setLoadingSync] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  // Tab 2: Universal Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<LiturgicalDay[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number | null>(null);

  // Tab 3: Bulk Month Sync State
  const [loadingBulk, setLoadingBulk] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{ current: number; total: number; currentDayName: string } | null>(null);

  if (!isOpen) return null;

  const isGeneric = isDayGeneric(currentDay);

  // 1. Handle Sync Current Day
  const handleSyncCurrentDay = async () => {
    setLoadingSync(true);
    setSyncStatusMsg(null);

    const res = await fetchOfficialLiturgicalDay({
      fecha: currentDay.fecha,
      celebracion: currentDay.titulo_celebracion || currentDay.celebracion,
      tiempo: currentDay.tiempo_liturgico,
      ciclo: currentDay.ciclo,
      ano_ferial: currentDay.ano_ferial,
      region: region,
      tipo: 'ordinaria'
    });

    setLoadingSync(false);

    if (res.success && res.data) {
      onApplyDay(res.data);
      setSyncStatusMsg('¡Textos oficiales del Leccionario y Misal Romano sincronizados y guardados en tu dispositivo!');
    } else {
      setSyncStatusMsg(res.message || 'No se pudo sincronizar con la fuente oficial en este momento.');
    }
  };

  // 2. Handle Search
  const handlePerformSearch = async (term?: string) => {
    const q = term !== undefined ? term : searchQuery;
    if (!q.trim()) return;
    setLoadingSearch(true);
    setSearchResults([]);
    setSelectedResultIndex(null);

    const res = await searchLibrarianCelebration(q, region);
    setLoadingSearch(false);
    if (res.success && res.data.length > 0) {
      setSearchResults(res.data);
      setSelectedResultIndex(0);
    }
  };

  // 3. Handle Apply Search Result to Current Day
  const handleApplySearchResult = (result: LiturgicalDay) => {
    const fused: LiturgicalDay = {
      ...result,
      fecha: currentDay.fecha, // keep current active date
      dia_semana: currentDay.dia_semana,
      fuente_oficial: result.fuente_oficial || 'Leccionario & Misal Romano Oficial (CEM)'
    };
    saveLiturgicalDayToCache(fused);
    onApplyDay(fused);
    onClose();
  };

  const quickSearches = [
    'Misa de Exequias y Difuntos',
    'San Judas Tadeo, apóstol',
    'Misa de Matrimonio / Boda',
    'Virgen de Guadalupe',
    'San Juan Diego Cuauhtlatoatzin',
    'Bautismo de Niños',
    'Sagrado Corazón de Jesús',
    'Común de la Santísima Virgen María',
    'Común de Santos Mártires',
    'Común de Pastores'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#F9F7F2] border border-[#D9D1C3] shadow-2xl rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-[#2D2926]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#D9D1C3] bg-[#F0EDE6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#800020] text-white flex items-center justify-center shadow-xs">
              <BookOpen size={20} className="text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#800020]">
                  El Bibliotecario Litúrgico
                </h2>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-[#800020]/10 text-[#800020] px-2 py-0.5 rounded border border-[#800020]/20">
                  Leccionario CEM & Misal
                </span>
              </div>
              <p className="text-xs text-[#5A5550]">
                Archivero inteligente y sincronizador de textos litúrgicos oficiales y formularios sacramentales
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5A5550] hover:text-[#2D2926] hover:bg-[#E5DFD5] rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#D9D1C3] bg-[#EFECE6] px-4 pt-2 gap-2 text-xs font-sans font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('sync-day')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'sync-day'
                ? 'border-[#800020] text-[#800020]'
                : 'border-transparent text-[#5A5550] hover:text-[#2D2926]'
            }`}
          >
            <RefreshCw size={14} className={loadingSync ? 'animate-spin' : ''} />
            <span>Sincronizar Día Actual</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'search'
                ? 'border-[#800020] text-[#800020]'
                : 'border-transparent text-[#5A5550] hover:text-[#2D2926]'
            }`}
          >
            <Search size={14} />
            <span>Buscador de Fiestas y Ritos</span>
          </button>

          <button
            onClick={() => setActiveTab('bulk')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'bulk'
                ? 'border-[#800020] text-[#800020]'
                : 'border-transparent text-[#5A5550] hover:text-[#2D2926]'
            }`}
          >
            <Download size={14} />
            <span>Paquete Offline</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: SYNC CURRENT DAY */}
          {activeTab === 'sync-day' && (
            <div className="space-y-5">
              {/* Day Overview Card */}
              <div className="p-4 bg-[#F0EDE6] rounded-lg border border-[#D9D1C3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#800020] bg-white px-2 py-0.5 rounded border border-[#D9D1C3]">
                      {currentDay.fecha}
                    </span>
                    <span className="text-xs font-sans text-[#5A5550]">
                      {currentDay.dia_semana} • {currentDay.tiempo_liturgico}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#2D2926]">
                    {currentDay.titulo_celebracion || currentDay.celebracion || 'Misa del Día'}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    {isGeneric ? (
                      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">
                        <AlertCircle size={13} />
                        Texto del archivo base (sugerido sincronizar)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium">
                        <ShieldCheck size={13} />
                        {currentDay.fuente_oficial || 'Verificado: Leccionario CEM & Misal Romano'}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSyncCurrentDay}
                  disabled={loadingSync}
                  className="px-4 py-2.5 bg-[#800020] text-white hover:bg-[#600018] rounded-md font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs shrink-0 disabled:opacity-50"
                >
                  <RefreshCw size={14} className={loadingSync ? 'animate-spin' : ''} />
                  <span>{loadingSync ? 'Consultando Leccionario...' : 'Sincronizar Oficial (CEM)'}</span>
                </button>
              </div>

              {syncStatusMsg && (
                <div className="p-3 bg-white border border-[#D9D1C3] rounded-md text-xs text-[#2D2926] flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#800020]" />
                  <span>{syncStatusMsg}</span>
                </div>
              )}

              {/* Current Readings Preview */}
              <div className="space-y-3">
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#800020] flex items-center gap-1.5">
                  <FileText size={14} />
                  <span>Textos Proclamados para esta Celebración</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Primera Lectura */}
                  <div className="p-3.5 bg-white rounded-md border border-[#D9D1C3] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-sans font-bold uppercase text-[#800020]">1ª Lectura</span>
                      <span className="text-xs font-serif font-bold text-[#2D2926]">
                        {currentDay.liturgia_palabra?.primera_lectura?.cita || 'Sin cita'}
                      </span>
                    </div>
                    <p className="text-xs text-[#5A5550] line-clamp-3 italic">
                      "{currentDay.liturgia_palabra?.primera_lectura?.texto?.substring(0, 180)}..."
                    </p>
                  </div>

                  {/* Salmo */}
                  <div className="p-3.5 bg-white rounded-md border border-[#D9D1C3] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-sans font-bold uppercase text-[#800020]">Salmo Responsorial</span>
                      <span className="text-xs font-serif font-bold text-[#2D2926]">
                        {currentDay.liturgia_palabra?.salmo_responsorial?.cita || 'Salmo'}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#800020] line-clamp-1">
                      R. {currentDay.liturgia_palabra?.salmo_responsorial?.respuesta}
                    </p>
                    <p className="text-xs text-[#5A5550] line-clamp-2 italic">
                      {currentDay.liturgia_palabra?.salmo_responsorial?.texto?.substring(0, 140)}...
                    </p>
                  </div>

                  {/* Segunda Lectura si existe */}
                  {currentDay.liturgia_palabra?.segunda_lectura && (
                    <div className="p-3.5 bg-white rounded-md border border-[#D9D1C3] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-sans font-bold uppercase text-[#800020]">2ª Lectura</span>
                        <span className="text-xs font-serif font-bold text-[#2D2926]">
                          {currentDay.liturgia_palabra?.segunda_lectura?.cita}
                        </span>
                      </div>
                      <p className="text-xs text-[#5A5550] line-clamp-3 italic">
                        "{currentDay.liturgia_palabra?.segunda_lectura?.texto?.substring(0, 180)}..."
                      </p>
                    </div>
                  )}

                  {/* Evangelio */}
                  <div className="p-3.5 bg-white rounded-md border border-[#D9D1C3] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-sans font-bold uppercase text-[#800020]">Santo Evangelio</span>
                      <span className="text-xs font-serif font-bold text-[#2D2926]">
                        {currentDay.liturgia_palabra?.evangelio?.cita || 'Evangelio'}
                      </span>
                    </div>
                    <p className="text-xs text-[#5A5550] line-clamp-3 italic">
                      "{currentDay.liturgia_palabra?.evangelio?.texto?.substring(0, 180)}..."
                    </p>
                  </div>
                </div>

                {/* Colecta & Prefacio */}
                <div className="p-3.5 bg-white rounded-md border border-[#D9D1C3] space-y-2">
                  <span className="text-[11px] font-sans font-bold uppercase text-[#800020]">Oración Colecta (Misal Romano)</span>
                  <p className="text-xs font-serif text-[#2D2926] leading-relaxed italic">
                    «{currentDay.oracion_colecta || 'No especificada'}»
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UNIVERSAL SEARCH */}
          {activeTab === 'search' && (
            <div className="space-y-5">
              {/* Search Bar */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5550]" size={16} />
                    <input
                      type="text"
                      placeholder="Escribe un Santo, Misa Ritual (Exequias, Bodas), Común de la Virgen o cita bíblica..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handlePerformSearch()}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#D9D1C3] rounded-md text-xs font-sans text-[#2D2926] focus:outline-hidden focus:border-[#800020]"
                    />
                  </div>
                  <button
                    onClick={() => handlePerformSearch()}
                    disabled={loadingSearch}
                    className="px-4 py-2 bg-[#800020] text-white hover:bg-[#600018] rounded-md font-sans text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Search size={14} />
                    <span>{loadingSearch ? 'Buscando...' : 'Buscar'}</span>
                  </button>
                </div>

                {/* Quick Suggestion Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickSearches.map((qs) => (
                    <button
                      key={qs}
                      onClick={() => {
                        setSearchQuery(qs);
                        handlePerformSearch(qs);
                      }}
                      className="text-[11px] bg-[#F0EDE6] hover:bg-[#E5DFD5] text-[#2D2926] px-2.5 py-1 rounded-full border border-[#D9D1C3] transition-colors"
                    >
                      {qs}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-4 pt-2 border-t border-[#D9D1C3]">
                  <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#800020]">
                    Formularios Litúrgicos Encontrados ({searchResults.length})
                  </h4>

                  <div className="space-y-3">
                    {searchResults.map((res, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border transition-all ${
                          selectedResultIndex === idx
                            ? 'bg-white border-[#800020] shadow-md ring-1 ring-[#800020]'
                            : 'bg-white border-[#D9D1C3] hover:border-[#800020]/50'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D9D1C3]/60 pb-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded bg-[#800020]/10 text-[#800020] border border-[#800020]/20">
                                {res.grado || 'Formulario Litúrgico'}
                              </span>
                              <span className="text-xs text-[#5A5550]">{res.color} • {res.tiempo_liturgico}</span>
                            </div>
                            <h5 className="font-serif text-base font-bold text-[#2D2926] mt-1">
                              {res.titulo_celebracion || res.celebracion}
                            </h5>
                          </div>

                          <button
                            onClick={() => handleApplySearchResult(res)}
                            className="px-3 py-1.5 bg-[#800020] text-white hover:bg-[#600018] rounded text-xs font-sans font-bold uppercase tracking-wider transition-colors flex items-center gap-1 self-start sm:self-auto shrink-0 shadow-xs"
                          >
                            <CheckCircle2 size={13} />
                            <span>Cargar en el Misal</span>
                          </button>
                        </div>

                        {/* Readings summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-3">
                          <div className="p-2 bg-[#F9F7F2] rounded border border-[#D9D1C3]">
                            <span className="font-bold text-[#800020] block">1ª Lectura:</span>
                            <span className="font-serif">{res.liturgia_palabra?.primera_lectura?.cita || 'N/A'}</span>
                          </div>
                          <div className="p-2 bg-[#F9F7F2] rounded border border-[#D9D1C3]">
                            <span className="font-bold text-[#800020] block">Salmo:</span>
                            <span className="font-serif truncate">{res.liturgia_palabra?.salmo_responsorial?.cita || 'N/A'}</span>
                          </div>
                          <div className="p-2 bg-[#F9F7F2] rounded border border-[#D9D1C3]">
                            <span className="font-bold text-[#800020] block">Evangelio:</span>
                            <span className="font-serif">{res.liturgia_palabra?.evangelio?.cita || 'N/A'}</span>
                          </div>
                        </div>

                        {/* Colecta preview */}
                        {res.oracion_colecta && (
                          <div className="text-xs text-[#5A5550] italic bg-[#F0EDE6] p-2.5 rounded border border-[#D9D1C3]">
                            <strong className="text-[#800020] font-sans not-italic">Colecta: </strong>
                            «{res.oracion_colecta}»
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BULK MONTH OFFLINE PACK */}
          {activeTab === 'bulk' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#F0EDE6] rounded-lg border border-[#D9D1C3] space-y-3">
                <div className="flex items-center gap-2 text-[#800020]">
                  <Download size={18} />
                  <h4 className="font-serif text-sm font-bold">
                    Descargar Paquete Litúrgico Offline (Modo Sacristía)
                  </h4>
                </div>
                <p className="text-xs text-[#5A5550] leading-relaxed">
                  Permite pre-descargar y archivar todos los formularios litúrgicos del mes en el almacenamiento local (<code className="bg-white px-1 py-0.5 rounded border border-[#D9D1C3]">IndexedDB</code>) de tu tablet o computadora. Una vez sincronizado, la aplicación funcionará al 100% en el altar o ambón sin necesidad de conexión a internet.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      handleSyncCurrentDay();
                      setActiveTab('sync-day');
                    }}
                    className="px-4 py-2 bg-[#800020] text-white hover:bg-[#600018] rounded-md font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    Guardar día actual en caché local
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F0EDE6] border-t border-[#D9D1C3] flex items-center justify-between text-xs text-[#5A5550]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#800020]" />
            <span>Fidelidad Canónica & Magisterial al Rito Romano</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-[#D9D1C3] text-[#2D2926] hover:bg-[#E5DFD5] rounded text-xs font-sans font-bold uppercase tracking-wider transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
