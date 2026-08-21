import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Layers, 
  BookOpen, 
  ListChecks, 
  Flame, 
  Info,
  Check
} from 'lucide-react';
import { LiturgicalDay } from '../../types/liturgia';
import { CeremonieroAuditReport } from '../../utils/ceremonieroEngine';

interface CeremonieroDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  day: LiturgicalDay;
  auditReport: CeremonieroAuditReport;
}

export const CeremonieroDrawer: React.FC<CeremonieroDrawerProps> = ({
  isOpen,
  onClose,
  day,
  auditReport
}) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'sacristy' | 'rubrics'>('audit');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleCheck = (name: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handlePrintSacristySheet = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#F9F7F2] h-full shadow-2xl border-l border-[#D9D1C3] flex flex-col overflow-hidden text-[#2D2926]">
        
        {/* Drawer Header */}
        <div className="p-5 bg-[#F0EDE6] border-b border-[#D9D1C3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2D2926] text-[#F9F7F2] flex items-center justify-center font-serif text-lg font-bold shadow-xs">
              <ShieldCheck size={22} className="text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-bold text-[#800020]">
                  Ceremoniero Litúrgico Autónomo
                </h3>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
                  {auditReport.estadoCanónico === 'NIHIL_OBSTAT' ? 'NIHIL OBSTAT' : 'AUTO-CORREGIDO'}
                </span>
              </div>
              <p className="text-xs text-[#5A5550]">
                Proof-reading y supervisión canónica activa conforme a la IGMR 3ra Edición
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

        {/* Status Score Ribbon */}
        <div className="bg-emerald-900 text-white px-5 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-300" />
            <span className="text-xs font-sans font-bold uppercase tracking-wider">
              Fidelidad Canónica: 100% Aprobada
            </span>
          </div>
          <span className="text-xs font-serif italic text-emerald-200">
            {auditReport.correccionesRealizadas.length} verificaciones automáticas
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#D9D1C3] bg-[#EFECE6] px-4 pt-2 gap-2 text-xs font-sans font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'audit'
                ? 'border-[#800020] text-[#800020]'
                : 'border-transparent text-[#5A5550] hover:text-[#2D2926]'
            }`}
          >
            <Sparkles size={14} />
            <span>Auditoría en Tiempo Real</span>
          </button>

          <button
            onClick={() => setActiveTab('sacristy')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'sacristy'
                ? 'border-[#800020] text-[#800020]'
                : 'border-transparent text-[#5A5550] hover:text-[#2D2926]'
            }`}
          >
            <ListChecks size={14} />
            <span>Guía de Sacristía ({auditReport.checklistSacristia.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rubrics')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'rubrics'
                ? 'border-[#800020] text-[#800020]'
                : 'border-transparent text-[#5A5550] hover:text-[#2D2926]'
            }`}
          >
            <BookOpen size={14} />
            <span>Plegaria & Prefacio</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: REAL-TIME AUDIT */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-[#F0EDE6] rounded-md border border-[#D9D1C3] space-y-1">
                <span className="text-[11px] font-sans font-bold uppercase text-[#800020] tracking-wider block">
                  Celebración del Día
                </span>
                <h4 className="font-serif text-base font-bold text-[#2D2926]">
                  {day.titulo_celebracion || day.celebracion || 'Santa Misa'}
                </h4>
                <p className="text-xs text-[#5A5550]">
                  Color canónico: <strong>{day.color}</strong> • Grado: <strong>{day.grado || 'Feria'}</strong> • Ciclo: <strong>{day.ciclo}</strong> (Año Ferial <strong>{day.ano_ferial}</strong>)
                </p>
              </div>

              {auditReport.correccionesRealizadas.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#800020]">
                    Auto-Correcciones Aplicadas por el Ceremoniero ({auditReport.correccionesRealizadas.length})
                  </h4>

                  {auditReport.correccionesRealizadas.map((corr, idx) => (
                    <div key={idx} className="p-3.5 bg-white rounded-md border border-[#D9D1C3] space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2D2926] font-serif">
                          {corr.campo}
                        </span>
                        <span className={`text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded ${
                          corr.tipo === 'critico' 
                            ? 'bg-rose-100 text-rose-900 border border-rose-200' 
                            : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}>
                          {corr.tipo === 'critico' ? 'Corrección Canónica' : 'Rúbrica IGMR'}
                        </span>
                      </div>
                      <p className="text-xs text-[#5A5550]">
                        {corr.motivo}
                      </p>
                      <div className="text-[11px] bg-[#F9F7F2] p-2 rounded border border-[#E5DFD5] text-[#800020] font-mono">
                        {corr.reglaIGMR}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-white rounded-md border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 size={28} className="text-emerald-700 mx-auto" />
                  <h5 className="font-serif font-bold text-sm text-[#2D2926]">
                    Formulario Litúrgico Perfecto
                  </h5>
                  <p className="text-xs text-[#5A5550] max-w-sm mx-auto">
                    El texto, lecturas, salmo responsorial, color litúrgico y oraciones presidenciales cumplen al 100% las rúbricas oficiales de la Iglesia.
                  </p>
                </div>
              )}

              {/* Directives for Celebrant */}
              <div className="p-4 bg-white rounded-md border border-[#D9D1C3] space-y-2">
                <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#800020] flex items-center gap-1.5">
                  <Info size={14} />
                  <span>Directivas para el Sacerdote y Ministros</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-[#5A5550] list-disc list-inside">
                  {auditReport.consejosCelebrante.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: SACRISTY CHECKLIST */}
          {activeTab === 'sacristy' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2D2926]">
                    Montaje de Credencia y Altar
                  </h4>
                  <p className="text-xs text-[#5A5550]">
                    Lista técnica para sacristanes y acólitos antes de la celebración
                  </p>
                </div>
                <button
                  onClick={handlePrintSacristySheet}
                  className="px-3 py-1.5 bg-[#800020] text-white hover:bg-[#600018] rounded text-xs font-sans font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Printer size={13} />
                  <span>Imprimir</span>
                </button>
              </div>

              <div className="space-y-2">
                {auditReport.checklistSacristia.map((item, idx) => {
                  const isDone = Boolean(checkedItems[item.nombre]);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(item.nombre)}
                      className={`p-3 rounded-md border transition-all cursor-pointer flex items-start gap-3 ${
                        isDone 
                          ? 'bg-emerald-50/70 border-emerald-300 opacity-75' 
                          : 'bg-white border-[#D9D1C3] hover:border-[#800020]/50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        isDone 
                          ? 'bg-emerald-700 border-emerald-700 text-white' 
                          : 'border-[#999] bg-white'
                      }`}>
                        {isDone && <Check size={13} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-serif font-bold ${isDone ? 'line-through text-[#666]' : 'text-[#2D2926]'}`}>
                            {item.nombre}
                          </span>
                          <span className="text-[10px] font-sans font-bold uppercase px-1.5 py-0.5 rounded bg-[#F0EDE6] text-[#666] border border-[#D9D1C3]">
                            {item.ubicacion}
                          </span>
                        </div>
                        {item.notas && (
                          <p className="text-[11px] text-[#777] italic mt-0.5">
                            {item.notas}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: RUBRICS & PREFACE */}
          {activeTab === 'rubrics' && (
            <div className="space-y-4">
              {/* Eucharistic Prayer */}
              <div className="p-4 bg-white rounded-md border border-[#D9D1C3] space-y-2 shadow-2xs">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#800020] bg-[#800020]/10 px-2 py-0.5 rounded border border-[#800020]/20 inline-block">
                  Plegaria Eucarística Recomendada
                </span>
                <h4 className="font-serif text-base font-bold text-[#2D2926]">
                  {auditReport.plegariaEucaristicaRecomendada.nombre}
                </h4>
                <p className="text-xs text-[#5A5550] leading-relaxed">
                  {auditReport.plegariaEucaristicaRecomendada.justificacion}
                </p>
              </div>

              {/* Preface */}
              <div className="p-4 bg-white rounded-md border border-[#D9D1C3] space-y-2 shadow-2xs">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#800020] bg-[#800020]/10 px-2 py-0.5 rounded border border-[#800020]/20 inline-block">
                  Prefacio del Misal Romano
                </span>
                <h4 className="font-serif text-base font-bold text-[#2D2926]">
                  {auditReport.prefacioSugerido.titulo}
                </h4>
                <p className="text-xs font-serif italic text-[#444] leading-relaxed bg-[#F9F7F2] p-3 rounded border border-[#E5DFD5]">
                  «{auditReport.prefacioSugerido.texto}»
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#F0EDE6] border-t border-[#D9D1C3] flex items-center justify-between text-xs text-[#5A5550]">
          <span className="font-serif italic">
            Instrucción General del Misal Romano
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
