import React, { useState } from 'react';
import { 
  Scroll, 
  Printer, 
  Columns, 
  FileText, 
  Globe2, 
  Check 
} from 'lucide-react';
import { ORDINARIO_DB } from '../../data/liturgyData';

interface OrdinarioViewProps {
  onOpenImpresor: () => void;
}

export const OrdinarioView: React.FC<OrdinarioViewProps> = ({ onOpenImpresor }) => {
  const [displayLanguage, setDisplayLanguage] = useState<'es' | 'la' | 'both'>('both');
  const [selectedCanon, setSelectedCanon] = useState<'canon1' | 'canon2' | 'canon3' | 'canon4'>('canon2');

  const canonNames = {
    canon1: 'Canon Romano (Plegaria I)',
    canon2: 'Plegaria Eucarística II',
    canon3: 'Plegaria Eucarística III',
    canon4: 'Plegaria Eucarística IV',
  };

  return (
    <div className="space-y-8 font-serif">
      {/* Top Banner - Editorial Aesthetic */}
      <div className="bg-[#F0EDE6] p-6 sm:p-10 rounded-md border border-[#D9D1C3] shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[1px] w-6 bg-[#800020]"></span>
            <span className="uppercase font-sans text-[11px] tracking-[0.3em] text-[#800020] font-bold">
              Missale Romanum Editio Typica Tertia
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light font-serif leading-tight italic text-[#2D2926]">
            Ordinario de la Santa Misa
          </h1>
          <p className="text-xs text-[#555] font-sans mt-1">
            Texto canónico oficial del Misal Romano en Español y Latín con rúbricas completas.
          </p>
        </div>

        {/* Controls: Language and Print */}
        <div className="flex flex-wrap items-center gap-2 font-sans">
          {/* Language Toggle */}
          <div className="flex items-center bg-[#F9F7F2] p-1 rounded-sm border border-[#D9D1C3] text-xs">
            <button
              onClick={() => setDisplayLanguage('es')}
              className={`px-2.5 py-1 rounded-sm font-medium transition ${
                displayLanguage === 'es' ? 'bg-[#800020] text-[#F9F7F2] font-bold' : 'text-[#444] hover:text-[#2D2926]'
              }`}
            >
              Español
            </button>
            <button
              onClick={() => setDisplayLanguage('both')}
              className={`px-2.5 py-1 rounded-sm font-medium transition ${
                displayLanguage === 'both' ? 'bg-[#800020] text-[#F9F7F2] font-bold' : 'text-[#444] hover:text-[#2D2926]'
              }`}
            >
              Bilingüe (Paralelo)
            </button>
            <button
              onClick={() => setDisplayLanguage('la')}
              className={`px-2.5 py-1 rounded-sm font-medium transition ${
                displayLanguage === 'la' ? 'bg-[#800020] text-[#F9F7F2] font-bold' : 'text-[#444] hover:text-[#2D2926]'
              }`}
            >
              Latina
            </button>
          </div>

          <button
            onClick={onOpenImpresor}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-bold bg-[#800020] hover:bg-[#660019] text-[#F9F7F2] transition shadow-xs"
          >
            <Printer size={13} />
            <span>Imprimir Ordinario</span>
          </button>
        </div>
      </div>

      {/* Canon Eucharistic Quick Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 font-sans">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#800020] mr-1 hidden sm:inline">
          Plegaria Eucarística:
        </span>
        {(['canon1', 'canon2', 'canon3', 'canon4'] as const).map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCanon(c)}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium border whitespace-nowrap transition ${
              selectedCanon === c
                ? 'bg-[#2D2926] text-[#F9F7F2] border-[#2D2926] font-bold'
                : 'bg-[#F0EDE6] text-[#444] border-[#D9D1C3] hover:bg-[#EAE5DC]'
            }`}
          >
            {canonNames[c]}
          </button>
        ))}
      </div>

      {/* Missal Canvas Sheet */}
      <div className="bg-[#FDFBF7] rounded-md p-6 sm:p-12 border border-[#D9D1C3] shadow-xs space-y-12 max-w-4xl mx-auto text-[#2D2926] text-lg leading-relaxed">
        
        {/* I. RITUS INITIALES */}
        <section className="space-y-6">
          <div className="border-b border-[#D9D1C3] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#800020]"></span>
              <h2 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                I. Ritus Initiales / Ritos Iniciales
              </h2>
            </div>
            <span className="rubric text-xs font-sans uppercase tracking-widest font-semibold">Stantes / De pie</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(displayLanguage === 'es' || displayLanguage === 'both') && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-4 bg-[#D9D1C3]"></span>
                  <span className="font-sans text-[10px] font-bold text-[#2D2926] uppercase tracking-[0.2em]">
                    Texto en Español
                  </span>
                </div>
                <div className="rubric text-sm">El sacerdote dice:</div>
                <p className="priest-voice">
                  <strong className="text-[#800020]">✠</strong> En el nombre del Padre, y del Hijo, y del Espíritu Santo.
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Amén.</p>
                
                <p className="priest-voice pt-2">
                  La gracia de nuestro Señor Jesucristo, el amor del Padre y la comunión del Espíritu Santo estén con todos ustedes.
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Y con tu espíritu.</p>
              </div>
            )}

            {(displayLanguage === 'la' || displayLanguage === 'both') && (
              <div className={`space-y-4 ${displayLanguage === 'both' ? 'border-t md:border-t-0 md:border-l border-[#D9D1C3] md:pl-8' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-4 bg-[#800020]"></span>
                  <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em]">
                    Textus Latinus
                  </span>
                </div>
                <div className="rubric text-sm">Sacerdos dicit:</div>
                <p className="priest-voice italic">
                  <strong className="text-[#800020]">✠</strong> In nómine Patris, et Fílii, et Spíritus Sancti.
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Amen.</p>
                
                <p className="priest-voice italic pt-2">
                  Grátia Dómini nostri Iesu Christi, et cáritas Dei, et communicátio Sancti Spíritus sit cum ómnibus vobis.
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Et cum spíritu tuo.</p>
              </div>
            )}
          </div>
        </section>

        {/* II. PREX EUCHARISTICA */}
        <section className="space-y-6 pt-6 border-t border-[#D9D1C3]">
          <div className="border-b border-[#D9D1C3] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#800020]"></span>
              <h2 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                II. {canonNames[selectedCanon]}
              </h2>
            </div>
            <span className="rubric text-xs font-sans uppercase tracking-widest font-semibold">Consagración</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(displayLanguage === 'es' || displayLanguage === 'both') && (
              <div className="space-y-4">
                <div className="bg-[#F5F2EB] p-6 rounded-sm border border-[#D9D1C3] space-y-3">
                  <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                    Consagración del Pan
                  </span>
                  <p className="text-lg font-cinzel font-bold text-[#800020] leading-snug">
                    TOMEN Y COMAN TODOS DE ÉL, PORQUE ESTO ES MI CUERPO, QUE SERÁ ENTREGADO POR USTEDES.
                  </p>
                </div>

                <div className="bg-[#F5F2EB] p-6 rounded-sm border border-[#D9D1C3] space-y-3">
                  <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                    Consagración del Cáliz
                  </span>
                  <p className="text-lg font-cinzel font-bold text-[#800020] leading-snug">
                    TOMEN Y BEBAN TODOS DE ÉL, PORQUE ÉSTE ES EL CÁLIZ DE MI SANGRE, SANGRE DE LA ALIANZA NUEVA Y ETERNA, QUE SERÁ DERRAMADA POR USTEDES Y POR MUCHOS PARA EL PERDÓN DE LOS PECADOS. HAGAN ESTO EN CONMEMORACIÓN MÍA.
                  </p>
                </div>
              </div>
            )}

            {(displayLanguage === 'la' || displayLanguage === 'both') && (
              <div className={`space-y-4 ${displayLanguage === 'both' ? 'border-t md:border-t-0 md:border-l border-[#D9D1C3] md:pl-8' : ''}`}>
                <div className="bg-[#F5F2EB] p-6 rounded-sm border border-[#800020]/40 space-y-3">
                  <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                    Consecratio Panis
                  </span>
                  <p className="text-lg font-cinzel font-bold text-[#800020] leading-snug italic">
                    ACCÍPITE ET MANDUCÁTE EX HOC OMNES: HOC EST ENIM CORPUS MEUM, QUOD PRO VOBIS TRADÉTUR.
                  </p>
                </div>

                <div className="bg-[#F5F2EB] p-6 rounded-sm border border-[#800020]/40 space-y-3">
                  <span className="font-sans text-[10px] font-bold text-[#800020] uppercase tracking-[0.2em] block">
                    Consecratio Calicis
                  </span>
                  <p className="text-lg font-cinzel font-bold text-[#800020] leading-snug italic">
                    ACCÍPITE ET BÍBITE EX EO OMNES: HIC EST ENIM CALIX SÁNGUINIS MEI NOVI ET AETÉRNI TESTAMÉNTI, QUI PRO VOBIS ET PRO MULTIS EFFUNDÉTUR IN REMISSIÓNEM PECCATÓRUM. HOC FÁCITE IN MEAM COMMEMORATIÓNEM.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};
