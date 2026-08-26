import React from 'react';
import { 
  BookOpen, 
  Scroll, 
  Heart, 
  Baby, 
  Flame, 
  ShieldCheck, 
  Cross, 
  Sparkles, 
  Music, 
  Newspaper, 
  Printer, 
  CalendarDays,
  Award,
  Users,
  Wine
} from 'lucide-react';

export type ActiveView = 
  | 'misa'
  | 'ordinario'
  | 'semana-santa'
  | 'bautismo'
  | 'primeracomunion'
  | 'confirmacion'
  | 'matrimonio'
  | 'reconciliacion'
  | 'uncion'
  | 'orden'
  | 'xvanos'
  | 'exequias'
  | 'cancionero'
  | 'boletin'
  | 'impresor';

interface SidebarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  isOpenMobile,
  onCloseMobile
}) => {
  const handleNav = (view: ActiveView) => {
    onSelectView(view);
    onCloseMobile();
  };

  const navItems = [
    {
      category: 'MISA Y LECCIONARIO',
      items: [
        { id: 'misa' as ActiveView, label: 'Misa Diaria', icon: BookOpen, badge: 'Hoy' },
        { id: 'ordinario' as ActiveView, label: 'Ordinario de la Misa', icon: Scroll },
      ]
    },
    {
      category: 'SEMANA SANTA Y PASCUA',
      items: [
        { id: 'semana-santa' as ActiveView, label: 'Semana Santa & Pascua', icon: Flame, badge: 'TRIDUO' },
      ]
    },
    {
      category: 'SACRAMENTOS Y RITOS',
      items: [
        { id: 'bautismo' as ActiveView, label: 'Bautismo de Niños', icon: Baby },
        { id: 'primeracomunion' as ActiveView, label: 'Primera Comunión (Bilingüe)', icon: Wine },
        { id: 'confirmacion' as ActiveView, label: 'Confirmación', icon: Flame },
        { id: 'matrimonio' as ActiveView, label: 'Matrimonio Católico', icon: Heart },
        { id: 'reconciliacion' as ActiveView, label: 'Reconciliación (Confesión)', icon: ShieldCheck },
        { id: 'uncion' as ActiveView, label: 'Unción de los Enfermos', icon: Cross },
        { id: 'orden' as ActiveView, label: 'Orden Sacerdotal', icon: Award },
        { id: 'xvanos' as ActiveView, label: 'XV Años (Acción de Gracias)', icon: Sparkles },
        { id: 'exequias' as ActiveView, label: 'Exequias / Difuntos', icon: Users },
      ]
    },
    {
      category: 'PASTORAL Y CORO',
      items: [
        { id: 'cancionero' as ActiveView, label: 'Cantoral PRO (Acordes)', icon: Music },
        { id: 'boletin' as ActiveView, label: 'Boletín Parroquial', icon: Newspaper },
      ]
    },
    {
      category: 'PRODUCCIÓN SACRA',
      items: [
        { id: 'impresor' as ActiveView, label: 'Maestro Impresor & PDF', icon: Printer, badge: 'PRO' },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-[#2D2926]/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#F0EDE6] text-[#2D2926] border-r border-[#D9D1C3]
        overflow-y-auto z-40 transition-transform duration-200 ease-in-out flex flex-col justify-between
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        no-print font-sans
      `}>
        <div className="p-4 space-y-6">
          {navItems.map((section, sIdx) => (
            <div key={sIdx}>
              <div className="flex items-center gap-2 mb-2 px-2">
                <span className="h-[1px] w-4 bg-[#800020]"></span>
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#800020]">
                  {section.category}
                </span>
              </div>
              
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNav(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition group ${
                          isActive 
                            ? 'bg-[#F9F7F2] text-[#800020] font-bold border-l-2 border-[#800020] shadow-2xs' 
                            : 'text-[#444] hover:text-[#2D2926] hover:bg-[#EAE5DC]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={15} className={isActive ? 'text-[#800020]' : 'text-[#777] group-hover:text-[#2D2926]'} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[9px] font-sans font-bold px-1.5 py-0.2 uppercase tracking-wider rounded ${
                            isActive 
                              ? 'bg-[#800020] text-[#F9F7F2]' 
                              : 'bg-[#D9D1C3]/60 text-[#555]'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer info - Editorial Card */}
        <div className="p-4 border-t border-[#D9D1C3] text-[11px] text-[#666] bg-[#EAE5DC]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-serif italic text-[#2D2926] font-semibold">Rito Romano</span>
            <span className="text-[#800020] text-[10px] font-sans font-bold uppercase tracking-widest">v2.5 PRO</span>
          </div>
          <p className="text-[10px] font-serif text-[#555] leading-relaxed">
            Misal Romano 3ra Edición y Leccionario según el Magisterio de la Iglesia.
          </p>
        </div>
      </aside>
    </>
  );
};
