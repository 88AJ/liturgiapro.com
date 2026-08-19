import React, { useState } from 'react';
import { 
  Baby, 
  Flame, 
  Heart, 
  ShieldCheck, 
  Cross, 
  Award, 
  Sparkles, 
  Users, 
  Printer, 
  Sliders, 
  Check, 
  Download,
  BookOpen
} from 'lucide-react';
import { 
  SacramentoType, 
  BautismoParams, 
  MatrimonioParams, 
  ExequiasParams, 
  XVAñosParams, 
  ConfirmacionParams 
} from '../../types/liturgia';

interface SacramentosViewProps {
  initialType?: SacramentoType;
  onOpenImpresor: () => void;
}

export const SacramentosView: React.FC<SacramentosViewProps> = ({
  initialType = 'bautismo',
  onOpenImpresor
}) => {
  const [activeSacramento, setActiveSacramento] = useState<SacramentoType>(initialType);
  const [showForm, setShowForm] = useState<boolean>(true);

  // Form State
  const [bautismoData, setBautismoData] = useState<BautismoParams>({
    nombreBebe: 'Mateo Alejandro',
    nombrePadres: 'Carlos Daniel Sánchez y María Elena Rivera',
    nombrePadrinos: 'Roberto Mendoza y Patricia Gómez',
    nombreCelebrante: 'Pbro. Francisco Javier Morales',
    nombreParroquia: 'Parroquia San Juan Bautista',
    fecha: new Date().toISOString().split('T')[0],
    enMisa: false
  });

  const [matrimonioData, setMatrimonioData] = useState<MatrimonioParams>({
    nombreEsposo: 'Alejandro Morales',
    nombreEsposa: 'Valeria Castillo',
    nombrePadrinosVelacion: 'Manuel Sánchez y Sofía Navarro',
    nombrePadrinosAnillos: 'Eduardo Castillo y Laura Peña',
    nombrePadrinosArras: 'Jorge Morales y Carmen Ruiz',
    nombrePadrinosLazo: 'Luis Fernando Ruiz y Ana María Gómez',
    nombreCelebrante: 'Pbro. Francisco Javier Morales',
    nombreParroquia: 'Parroquia Sagrado Corazón de Jesús',
    fecha: new Date().toISOString().split('T')[0]
  });

  const [exequiasData, setExequiasData] = useState<ExequiasParams>({
    nombreDifunto: 'Don Fernando Alberto Martínez',
    esAdulto: true,
    nombreFamiliares: 'Familia Martínez López',
    nombreCelebrante: 'Pbro. Francisco Javier Morales',
    nombreParroquia: 'Parroquia Nuestra Señora de Guadalupe',
    fecha: new Date().toISOString().split('T')[0],
    incluyeSepulcro: true
  });

  const [xvAnosData, setXvAnosData] = useState<XVAñosParams>({
    nombreQuinceanera: 'Mariana Guadalupe Ramírez',
    nombrePadres: 'Héctor Ramírez y Guadalupe Hernández',
    nombrePadrinos: 'Ernesto Torres y Mónica Del Valle',
    nombreCelebrante: 'Pbro. Francisco Javier Morales',
    nombreParroquia: 'Parroquia La Asunción de María',
    fecha: new Date().toISOString().split('T')[0]
  });

  const sacramentosList = [
    { id: 'bautismo' as SacramentoType, label: 'Bautismo', icon: Baby },
    { id: 'confirmacion' as SacramentoType, label: 'Confirmación', icon: Flame },
    { id: 'matrimonio' as SacramentoType, label: 'Matrimonio', icon: Heart },
    { id: 'reconciliacion' as SacramentoType, label: 'Reconciliación', icon: ShieldCheck },
    { id: 'uncion' as SacramentoType, label: 'Unción Enfermos', icon: Cross },
    { id: 'orden' as SacramentoType, label: 'Orden Sagrado', icon: Award },
    { id: 'xvanos' as SacramentoType, label: 'XV Años', icon: Sparkles },
    { id: 'exequias' as SacramentoType, label: 'Exequias', icon: Users },
  ];

  return (
    <div className="space-y-8 font-serif">
      {/* Header Banner - Editorial Aesthetic */}
      <div className="bg-[#F0EDE6] p-6 sm:p-10 rounded-md border border-[#D9D1C3] shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[1px] w-6 bg-[#800020]"></span>
            <span className="uppercase font-sans text-[11px] tracking-[0.3em] text-[#800020] font-bold">
              Rituale Romanum
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light font-serif leading-tight italic text-[#2D2926]">
            Rituales y Sacramentos
          </h1>
          <p className="text-xs font-sans text-[#555] mt-1">
            Formularios y guiones pastorales personalizados para la administración sacramental.
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium bg-[#F9F7F2] hover:bg-[#EAE5DC] text-[#2D2926] border border-[#D9D1C3] transition"
          >
            <Sliders size={13} />
            <span>{showForm ? 'Ocultar Datos' : 'Personalizar Nombres'}</span>
          </button>
          <button
            onClick={onOpenImpresor}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-bold bg-[#800020] hover:bg-[#660019] text-[#F9F7F2] transition shadow-xs"
          >
            <Printer size={13} />
            <span>Imprimir Ritual</span>
          </button>
        </div>
      </div>

      {/* Sacrament Selector Tabs - Editorial Style */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-sans">
        {sacramentosList.map((s) => {
          const Icon = s.icon;
          const isActive = activeSacramento === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSacramento(s.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs whitespace-nowrap transition border ${
                isActive
                  ? 'bg-[#800020] text-[#F9F7F2] border-[#800020] font-bold shadow-xs'
                  : 'bg-[#F0EDE6] text-[#444] border-[#D9D1C3] hover:bg-[#EAE5DC] hover:text-[#2D2926]'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#F9F7F2]' : 'text-[#777]'} />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Data Customizer Form */}
      {showForm && (
        <div className="bg-[#F0EDE6] p-6 rounded-md border border-[#D9D1C3] shadow-xs space-y-4 font-sans text-xs animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-2">
            <h3 className="font-bold text-[#800020] uppercase tracking-[0.2em] text-[10px]">
              Datos Parroquiales para el Guión
            </h3>
            <span className="text-[#666] text-[11px]">Se insertan automáticamente en las oraciones y rúbricas</span>
          </div>

          {activeSacramento === 'bautismo' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-[#444] block mb-1">Nombre del Bautizando:</label>
                <input
                  type="text"
                  value={bautismoData.nombreBebe}
                  onChange={(e) => setBautismoData({ ...bautismoData, nombreBebe: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Padres:</label>
                <input
                  type="text"
                  value={bautismoData.nombrePadres}
                  onChange={(e) => setBautismoData({ ...bautismoData, nombrePadres: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Padrinos:</label>
                <input
                  type="text"
                  value={bautismoData.nombrePadrinos}
                  onChange={(e) => setBautismoData({ ...bautismoData, nombrePadrinos: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Celebrante:</label>
                <input
                  type="text"
                  value={bautismoData.nombreCelebrante}
                  onChange={(e) => setBautismoData({ ...bautismoData, nombreCelebrante: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Parroquia:</label>
                <input
                  type="text"
                  value={bautismoData.nombreParroquia}
                  onChange={(e) => setBautismoData({ ...bautismoData, nombreParroquia: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
            </div>
          )}

          {activeSacramento === 'matrimonio' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-[#444] block mb-1">Novio / Esposo:</label>
                <input
                  type="text"
                  value={matrimonioData.nombreEsposo}
                  onChange={(e) => setMatrimonioData({ ...matrimonioData, nombreEsposo: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Novia / Esposa:</label>
                <input
                  type="text"
                  value={matrimonioData.nombreEsposa}
                  onChange={(e) => setMatrimonioData({ ...matrimonioData, nombreEsposa: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Padrinos de Velación:</label>
                <input
                  type="text"
                  value={matrimonioData.nombrePadrinosVelacion}
                  onChange={(e) => setMatrimonioData({ ...matrimonioData, nombrePadrinosVelacion: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Padrinos de Anillos:</label>
                <input
                  type="text"
                  value={matrimonioData.nombrePadrinosAnillos}
                  onChange={(e) => setMatrimonioData({ ...matrimonioData, nombrePadrinosAnillos: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Padrinos de Arras:</label>
                <input
                  type="text"
                  value={matrimonioData.nombrePadrinosArras}
                  onChange={(e) => setMatrimonioData({ ...matrimonioData, nombrePadrinosArras: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Padrinos de Lazo:</label>
                <input
                  type="text"
                  value={matrimonioData.nombrePadrinosLazo}
                  onChange={(e) => setMatrimonioData({ ...matrimonioData, nombrePadrinosLazo: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
            </div>
          )}

          {activeSacramento === 'exequias' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-[#444] block mb-1">Nombre del Difunto(a):</label>
                <input
                  type="text"
                  value={exequiasData.nombreDifunto}
                  onChange={(e) => setExequiasData({ ...exequiasData, nombreDifunto: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Familiares:</label>
                <input
                  type="text"
                  value={exequiasData.nombreFamiliares}
                  onChange={(e) => setExequiasData({ ...exequiasData, nombreFamiliares: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Parroquia:</label>
                <input
                  type="text"
                  value={exequiasData.nombreParroquia}
                  onChange={(e) => setExequiasData({ ...exequiasData, nombreParroquia: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
            </div>
          )}

          {activeSacramento === 'xvanos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-[#444] block mb-1">Nombre de la Quinceañera:</label>
                <input
                  type="text"
                  value={xvAnosData.nombreQuinceanera}
                  onChange={(e) => setXvAnosData({ ...xvAnosData, nombreQuinceanera: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Padres:</label>
                <input
                  type="text"
                  value={xvAnosData.nombrePadres}
                  onChange={(e) => setXvAnosData({ ...xvAnosData, nombrePadres: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#444] block mb-1">Padrinos:</label>
                <input
                  type="text"
                  value={xvAnosData.nombrePadrinos}
                  onChange={(e) => setXvAnosData({ ...xvAnosData, nombrePadrinos: e.target.value })}
                  className="w-full bg-[#F9F7F2] border border-[#D9D1C3] rounded-sm px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#800020]"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Liturgical Ritual Content Canvas */}
      <div className="bg-[#FDFBF7] rounded-md p-6 sm:p-12 border border-[#D9D1C3] shadow-xs space-y-12 max-w-4xl mx-auto text-[#2D2926] text-lg leading-relaxed">
        
        {/* RITUAL DE BAUTISMO */}
        {activeSacramento === 'bautismo' && (
          <div className="space-y-8">
            <div className="border-b border-[#D9D1C3] pb-4 text-center">
              <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
                Ritual de Bautismo de Niños
              </div>
              <h2 className="text-3xl sm:text-4xl font-light font-serif italic text-[#2D2926]">
                Recepción y Bautismo de {bautismoData.nombreBebe}
              </h2>
              <p className="text-xs font-sans text-[#666] mt-1">
                {bautismoData.nombreParroquia} • Celebrante: {bautismoData.nombreCelebrante}
              </p>
            </div>

            {/* I. Recepción */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  I. Rito de Acogida
                </h3>
              </div>
              <div className="rubric">El sacerdote se dirige a los padres:</div>
              <p className="priest-voice">
                ¿Qué nombre han elegido para este niño(a)?
              </p>
              <p className="assembly-response pl-4">
                Padres: <span className="font-bold text-[#800020]">{bautismoData.nombreBebe}</span>.
              </p>
              <p className="priest-voice pt-2">
                ¿Qué piden a la Iglesia de Dios para {bautismoData.nombreBebe}?
              </p>
              <p className="assembly-response pl-4">
                Padres: El Bautismo / La fe / La gracia de Cristo.
              </p>

              <div className="rubric pt-2">El celebrante hace la señal de la cruz en la frente del niño:</div>
              <p className="priest-voice">
                {bautismoData.nombreBebe}, la comunidad cristiana te recibe con gran alegría. En su nombre yo te signo con la señal de la cruz, y después de mí tus padres y padrinos harán lo mismo.
              </p>
            </section>

            {/* II. Unción Prebautismal */}
            <section className="space-y-4 pt-4 border-t border-[#D9D1C3]">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  II. Oración de Exorcismo y Óleo de los Catecúmenos
                </h3>
              </div>
              <p className="priest-voice">
                Dios todopoderoso y eterno, que has enviado a tu Hijo al mundo para librarnos del poder del demonio... Te pedimos por {bautismoData.nombreBebe}: líbrale del pecado original, haz de él templo de tu gloria y envía sobre él tu Santo Espíritu.
              </p>
              <div className="rubric">El sacerdote unge en el pecho al niño con el óleo de los catecúmenos:</div>
              <p className="priest-voice">
                Te ungimos con el óleo de salvación en el nombre de Cristo, Salvador nuestro; que él te fortalezca con su poder, él que vive y reina por los siglos de los siglos.
              </p>
              <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Amén.</p>
            </section>

            {/* III. Bautismo */}
            <section className="space-y-4 pt-4 border-t border-[#D9D1C3]">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  III. Bendición del Agua e Invocación Trinitaria
                </h3>
              </div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border-2 border-[#800020] text-center space-y-3">
                <div className="rubric text-xs font-sans">El sacerdote derrama el agua tres veces diciendo:</div>
                <p className="text-2xl sm:text-3xl font-cinzel font-bold text-[#800020] tracking-wide">
                  {bautismoData.nombreBebe.toUpperCase()}, YO TE BAUTIZO EN EL NOMBRE DEL PADRE, Y DEL HIJO, Y DEL ESPÍRITU SANTO.
                </p>
                <p className="assembly-response font-bold text-lg pt-1">
                  <span className="rubric font-sans text-sm">R.</span> ¡AMÉN!
                </p>
              </div>
            </section>

            {/* IV. Crisma, Vestidura y Luz */}
            <section className="space-y-4 pt-4 border-t border-[#D9D1C3]">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  IV. Ritos Explicativos (Santo Crisma, Vestidura Blanca y Cirio Pascual)
                </h3>
              </div>
              <div className="rubric">Unción con el Santo Crisma en la coronilla:</div>
              <p className="priest-voice">
                Dios todopoderoso, Padre de nuestro Señor Jesucristo, que te ha librado del pecado y te ha dado nueva vida por el agua y el Espíritu Santo, te unge con el Crisma de salvación para que entres a formar parte de su pueblo y seas para siempre miembro de Cristo, sacerdote, profeta y rey.
              </p>
              <div className="rubric pt-2">Entrega de la vestidura blanca e iluminación con el Cirio:</div>
              <p className="priest-voice">
                Reciban la luz de Cristo. A ustedes, padres y padrinos ({bautismoData.nombrePadres} y {bautismoData.nombrePadrinos}), se les confía el cuidado de esta luz para que este niño(a), iluminado por Cristo, camine siempre como hijo de la luz.
              </p>
            </section>
          </div>
        )}

        {/* RITUAL DE MATRIMONIO */}
        {activeSacramento === 'matrimonio' && (
          <div className="space-y-8">
            <div className="border-b border-[#D9D1C3] pb-4 text-center">
              <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
                Ordo Celebrandi Matrimonium
              </div>
              <h2 className="text-3xl sm:text-4xl font-light font-serif italic text-[#2D2926]">
                Matrimonio de {matrimonioData.nombreEsposo} y {matrimonioData.nombreEsposa}
              </h2>
              <p className="text-xs font-sans text-[#666] mt-1">
                {matrimonioData.nombreParroquia} • Celebrante: {matrimonioData.nombreCelebrante}
              </p>
            </div>

            {/* Escrutinio */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  I. Escrutinio y Preguntas de Libertad
                </h3>
              </div>
              <p className="priest-voice">
                {matrimonioData.nombreEsposo} y {matrimonioData.nombreEsposa}, ¿vienen a contraer Matrimonio libre y voluntariamente, sin que nada ni nadie los presione?
              </p>
              <p className="assembly-response pl-4">Esposos: Sí, venimos libremente.</p>
              <p className="priest-voice pt-2">
                ¿Están dispuestos a amarse y honrarse mutuamente en el matrimonio durante toda la vida?
              </p>
              <p className="assembly-response pl-4">Esposos: Sí, estamos dispuestos.</p>
            </section>

            {/* Consentimiento */}
            <section className="space-y-4 pt-4 border-t border-[#D9D1C3]">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  II. Consentimiento Matrimonial
                </h3>
              </div>
              <div className="rubric">El novio toma la mano derecha de la novia y dice:</div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border-l-3 border-[#800020] space-y-2">
                <p className="font-serif text-[18px] leading-relaxed text-[#2D2926]">
                  «Yo, <strong>{matrimonioData.nombreEsposo}</strong>, te acepto a ti, <strong>{matrimonioData.nombreEsposa}</strong>, como mi esposa, y prometo serte fiel en la prosperidad y en la adversidad, en la salud y en la enfermedad, y amarte y respetarte todos los días de mi vida.»
                </p>
              </div>

              <div className="rubric pt-2">La novia toma la mano derecha del novio y dice:</div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border-l-3 border-[#800020] space-y-2">
                <p className="font-serif text-[18px] leading-relaxed text-[#2D2926]">
                  «Yo, <strong>{matrimonioData.nombreEsposa}</strong>, te acepto a ti, <strong>{matrimonioData.nombreEsposo}</strong>, como mi esposo, y prometo serte fiel en la prosperidad y en la adversidad, en la salud y en la enfermedad, y amarte y respetarte todos los días de mi vida.»
                </p>
              </div>

              <div className="rubric pt-3">Confirmación del consentimiento por el sacerdote:</div>
              <p className="priest-voice font-bold text-[#800020]">
                El Dios de Abraham, el Dios de Isaac, el Dios de Jacob, el Dios que unió a Adán y Eva en el paraíso, confirme este consentimiento mutuo que acaban de manifestar ante la Iglesia. LO QUE DIOS HA UNIDO, QUE NO LO SEPARE EL HOMBRE.
              </p>
              <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Amén.</p>
            </section>

            {/* Anillos y Arras */}
            <section className="space-y-4 pt-4 border-t border-[#D9D1C3]">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  III. Bendición y Entrega de Anillos y Arras
                </h3>
              </div>
              <p className="priest-voice">
                El esposo coloca el anillo en el anular de la esposa:
              </p>
              <p className="italic text-[#2D2926] pl-4">
                «{matrimonioData.nombreEsposa}, recibe este anillo en señal de mi amor y fidelidad a ti. En el nombre del Padre, y del Hijo, y del Espíritu Santo.»
              </p>
              <p className="priest-voice pt-2">
                La esposa coloca el anillo en el anular del esposo:
              </p>
              <p className="italic text-[#2D2926] pl-4">
                «{matrimonioData.nombreEsposo}, recibe este anillo en señal de mi amor y fidelidad a ti. En el nombre del Padre, y del Hijo, y del Espíritu Santo.»
              </p>
            </section>
          </div>
        )}

        {/* RITUAL DE EXEQUIAS */}
        {activeSacramento === 'exequias' && (
          <div className="space-y-8">
            <div className="border-b border-[#D9D1C3] pb-4 text-center">
              <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
                Ordo Exsequiarum
              </div>
              <h2 className="text-3xl sm:text-4xl font-light font-serif italic text-[#2D2926]">
                Misa Exequial por el eterno descanso de {exequiasData.nombreDifunto}
              </h2>
              <p className="text-xs font-sans text-[#666] mt-1">
                {exequiasData.nombreParroquia} • Intención por: {exequiasData.nombreFamiliares}
              </p>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  Último Adiós y Encomendación del Alma
                </h3>
              </div>
              <p className="priest-voice">
                Al despedir a nuestro hermano(a) {exequiasData.nombreDifunto}, cumplimos con el piadoso deber de orar por él(ella). Encomendémoslo(a) con fe a Dios nuestro Padre, para que lo(a) acoja en su paz.
              </p>
              
              <div className="bg-[#F5F2EB] p-6 rounded-sm border border-[#D9D1C3] space-y-3">
                <p className="priest-voice font-bold">
                  Santos de Dios, salgan a su encuentro; vengan a su encuentro, ángeles del Señor.
                </p>
                <p className="assembly-response pl-4">
                  <span className="rubric font-sans">R.</span> Reciban su alma y preséntenla ante el Altísimo.
                </p>
                <p className="priest-voice">
                  Cristo que te llamó, te reciba en su reino, y los ángeles te lleven a descansar en el seno de Abraham.
                </p>
                <p className="assembly-response pl-4">
                  <span className="rubric font-sans">R.</span> Reciban su alma y preséntenla ante el Altísimo.
                </p>
              </div>

              <div className="rubric">Aspersión del féretro con agua bendita e incensación:</div>
              <p className="priest-voice">
                Dale, Señor, el descanso eterno. <span className="assembly-response font-bold">R. Y brille para él (ella) la luz perpetua.</span>
              </p>
              <p className="priest-voice">
                Descanse en paz. <span className="assembly-response font-bold">R. Amén.</span>
              </p>
            </section>
          </div>
        )}

        {/* OTROS SACRAMENTOS (XV AÑOS, CONFIRMACIÓN, RECONCILIACIÓN, UNCIÓN, ORDEN) */}
        {!['bautismo', 'matrimonio', 'exequias'].includes(activeSacramento) && (
          <div className="space-y-6 text-center py-8">
            <div className="w-12 h-12 rounded-sm bg-[#800020]/10 text-[#800020] mx-auto flex items-center justify-center font-serif text-2xl font-bold">
              ☩
            </div>
            <h2 className="text-2xl sm:text-3xl font-light font-serif italic text-[#2D2926]">
              {sacramentosList.find(s => s.id === activeSacramento)?.label}
            </h2>
            <p className="text-sm text-[#555] max-w-lg mx-auto font-sans leading-relaxed">
              El esquema canónico y rúbricas correspondientes al Misal Romano y el Pontifical Romano están integrados para atril y exportación directa en PDF.
            </p>
            <div className="pt-4">
              <button
                onClick={onOpenImpresor}
                className="px-6 py-2 rounded-sm bg-[#800020] text-[#F9F7F2] text-xs font-sans font-bold hover:bg-[#660019] transition shadow-xs"
              >
                Abrir en Maestro Impresor
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
