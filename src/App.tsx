import React, { useState, useMemo, useEffect } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Sidebar, ActiveView } from './components/Sidebar';
import { MisaView } from './components/views/MisaView';
import { OrdinarioView } from './components/views/OrdinarioView';
import { SemanaSantaView } from './components/views/SemanaSantaView';
import { SacramentosView } from './components/views/SacramentosView';
import { CancioneroView } from './components/views/CancioneroView';
import { BoletinView } from './components/views/BoletinView';
import { ImpresorView } from './components/views/ImpresorView';
import { AtrilModal } from './components/views/AtrilModal';
import { PadreProDrawer } from './components/views/PadreProDrawer';
import { BibliotecarioModal } from './components/views/BibliotecarioModal';
import { CeremonieroDrawer } from './components/views/CeremonieroDrawer';
import { getLiturgicalDay } from './data/liturgyData';
import { LiturgicalDay, SacramentoType } from './types/liturgia';
import { getCachedLiturgicalDay, saveLiturgicalDayToCache, isDayGeneric } from './utils/liturgicalCache';
import { autoCorrectLiturgicalDay } from './utils/ceremonieroEngine';

export function App() {
  // Current active date in ISO YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });

  // Current liturgical day data with user modifications cache
  const [customDays, setCustomDays] = useState<Record<string, LiturgicalDay>>({});
  const [region, setRegion] = useState<string>('mx');
  
  // Clean legacy cache on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('liturgia_pro_cached_days_v1');
        window.localStorage.removeItem('liturgia_pro_cached_days_v2');
      }
    } catch (_) {}
  }, []);

  // Look up in persistent storage whenever selectedDate changes
  useEffect(() => {
    let isMounted = true;
    getCachedLiturgicalDay(selectedDate).then(cached => {
      if (isMounted && cached && !isDayGeneric(cached)) {
        setCustomDays(prev => ({
          ...prev,
          [selectedDate]: cached
        }));
      }
    });
    return () => { isMounted = false; };
  }, [selectedDate]);

  // 🤵 Autonomous Master of Ceremonies Engine (100% Automatic Real-Time Auto-Correction)
  const { currentDay, ceremonieroAudit } = useMemo(() => {
    const rawDay = customDays[selectedDate] || getLiturgicalDay(selectedDate);
    const { day: perfectedDay, audit } = autoCorrectLiturgicalDay(rawDay, { region });
    return { currentDay: perfectedDay, ceremonieroAudit: audit };
  }, [selectedDate, customDays, region]);

  const handleUpdateDay = (updated: LiturgicalDay) => {
    setCustomDays(prev => ({
      ...prev,
      [updated.fecha]: updated
    }));
    saveLiturgicalDayToCache(updated);
  };

  // View state
  const [activeView, setActiveView] = useState<ActiveView>('misa');
  
  // Modals & Drawers
  const [isAtrilOpen, setIsAtrilOpen] = useState(false);
  const [isPadreProOpen, setIsPadreProOpen] = useState(false);
  const [isBibliotecarioOpen, setIsBibliotecarioOpen] = useState(false);
  const [isCeremonieroOpen, setIsCeremonieroOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2D2926] flex flex-col font-sans selection:bg-[#800020]/20 selection:text-[#800020]">
      
      {/* Top Navbar */}
      <Navbar
        currentDay={currentDay}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onOpenAtril={() => setIsAtrilOpen(true)}
        onOpenImpresor={() => setActiveView('impresor')}
        onOpenBibliotecario={() => setIsBibliotecarioOpen(true)}
        onTogglePadrePro={() => setIsPadreProOpen(!isPadreProOpen)}
        isPadreProOpen={isPadreProOpen}
        region={region}
        onRegionChange={setRegion}
      />

      {/* Main Body Layout with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Navigation Sidebar */}
        <Sidebar
          activeView={activeView}
          onSelectView={setActiveView}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Workspace Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-5xl">
          
          {/* Mobile Menu Opener & Date Quick Pill */}
          <div className="lg:hidden flex items-center justify-between mb-4 bg-[#F0EDE6] p-3 rounded-md border border-[#D9D1C3] shadow-xs no-print">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#2D2926] hover:text-[#800020]"
            >
              <Menu size={16} />
              <span>Menú Litúrgico</span>
            </button>
            <span className="text-[11px] font-serif italic text-[#800020] bg-[#F9F7F2] px-2 py-0.5 rounded border border-[#D9D1C3]">
              {currentDay.tiempo_liturgico}
            </span>
          </div>

          {/* Render Active View */}
          {activeView === 'misa' && (
            <MisaView
              day={currentDay}
              onUpdateDay={handleUpdateDay}
              onOpenAtril={() => setIsAtrilOpen(true)}
              onOpenImpresor={() => setActiveView('impresor')}
              onOpenCeremoniero={() => setIsCeremonieroOpen(true)}
              ceremonieroAudit={ceremonieroAudit}
              region={region}
            />
          )}

          {activeView === 'ordinario' && (
            <OrdinarioView onOpenImpresor={() => setActiveView('impresor')} />
          )}

          {activeView === 'semana-santa' && (
            <SemanaSantaView />
          )}

          {(['bautismo', 'primeracomunion', 'confirmacion', 'matrimonio', 'reconciliacion', 'uncion', 'orden', 'xvanos', 'exequias'] as SacramentoType[]).includes(activeView as SacramentoType) && (
            <SacramentosView
              initialType={activeView as SacramentoType}
              onOpenImpresor={() => setActiveView('impresor')}
            />
          )}

          {activeView === 'cancionero' && (
            <CancioneroView onOpenImpresor={() => setActiveView('impresor')} />
          )}

          {activeView === 'boletin' && (
            <BoletinView
              day={currentDay}
              onOpenImpresor={() => setActiveView('impresor')}
            />
          )}

          {activeView === 'impresor' && (
            <ImpresorView
              day={currentDay}
              region={region}
            />
          )}

        </main>
      </div>

      {/* Fullscreen Digital Ambo / Tablet Modal */}
      <AtrilModal
        day={currentDay}
        isOpen={isAtrilOpen}
        onClose={() => setIsAtrilOpen(false)}
      />

      {/* Floating AI Catholic Liturgist Drawer */}
      <PadreProDrawer
        isOpen={isPadreProOpen}
        onClose={() => setIsPadreProOpen(false)}
        currentDay={currentDay}
      />

      {/* Liturgical Librarian Agent Modal */}
      <BibliotecarioModal
        isOpen={isBibliotecarioOpen}
        onClose={() => setIsBibliotecarioOpen(false)}
        currentDay={currentDay}
        onApplyDay={handleUpdateDay}
        region={region}
      />

      {/* Autonomous Master of Ceremonies Drawer */}
      <CeremonieroDrawer
        isOpen={isCeremonieroOpen}
        onClose={() => setIsCeremonieroOpen(false)}
        day={currentDay}
        auditReport={ceremonieroAudit}
      />

    </div>
  );
}

export default App;

