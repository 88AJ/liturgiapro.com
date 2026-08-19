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

        {/* RITUAL DE XV AÑOS (ACCIÓN DE GRACIAS) */}
        {activeSacramento === 'xvanos' && (
          <div className="space-y-8">
            <div className="border-b border-[#D9D1C3] pb-4 text-center">
              <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
                Bendición Solemne en el Decimoquinto Cumpleaños
              </div>
              <h2 className="text-3xl sm:text-4xl font-light font-serif italic text-[#2D2926]">
                Misa de Acción de Gracias de {xvAnosData.nombreQuinceanera}
              </h2>
              <p className="text-xs font-sans text-[#666] mt-1">
                {xvAnosData.nombreParroquia} • Celebrante: {xvAnosData.nombreCelebrante}
              </p>
            </div>

            {/* I. Oración de los Padres */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  I. Oración y Bendición de los Padres
                </h3>
              </div>
              <div className="rubric">Los padres se acercan a su hija y dicen con devoción:</div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border-l-3 border-[#800020] space-y-2">
                <p className="font-serif text-[17px] leading-relaxed text-[#2D2926]">
                  «Señor Dios, Creador y Padre nuestro: Te damos gracias por el don de la vida de nuestra hija <strong>{xvAnosData.nombreQuinceanera}</strong>, a quien hoy presentamos ante tu altar al cumplir quince años. Guía sus pasos con tu luz divina, conserva su corazón puro y líbrala de todo peligro. Que tu gracia la acompañe siempre.»
                </p>
              </div>
            </section>

            {/* II. Oración de Acción de Gracias de la Quinceañera */}
            <section className="space-y-4 pt-4 border-t border-[#D9D1C3]">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  II. Oración de la Quinceañera ante el Altar
                </h3>
              </div>
              <div className="rubric">La joven se arrodilla o permanece de pie ante el presbiterio y proclama:</div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border-l-3 border-[#800020] space-y-2">
                <p className="font-serif text-[17px] leading-relaxed text-[#2D2926]">
                  «Señor Jesús: Te doy gracias de todo corazón por haberme llamado a la vida, por el bautismo y por la fe que recibí en el seno de mi familia. En este día en que cumplo quince años, pongo en tus manos mi juventud, mis ilusiones y mi futuro. Concédeme la gracia de amar a mis padres, respetar a mi prójimo y ser testigo de tu amor en el mundo. Santa María, Madre de Dios, sé siempre mi guía y protectora. Amén.»
                </p>
              </div>
            </section>

            {/* III. Bendición de los Objetos Religiosos */}
            <section className="space-y-4 pt-4 border-t border-[#D9D1C3]">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  III. Bendición de la Biblia, Rosario y Medalla
                </h3>
              </div>
              <p className="priest-voice">
                El sacerdote extiende las manos y bendice los objetos sagrados:
              </p>
              <p className="italic text-[#2D2926] pl-4 leading-relaxed">
                «El Señor bendiga esta Santa Biblia, para que sea lámpara para tus pasos; este Rosario, para que medites los misterios de Cristo junto a María; y esta Medalla, como signo visible de tu fe cristiana. En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.»
              </p>
            </section>
          </div>
        )}

        {/* RITUAL DE CONFIRMACIÓN */}
        {activeSacramento === 'confirmacion' && (
          <div className="space-y-8">
            <div className="border-b border-[#D9D1C3] pb-4 text-center">
              <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
                Pontificale Romanum • Sacramento de la Confirmación
              </div>
              <h2 className="text-3xl sm:text-4xl font-light font-serif italic text-[#2D2926]">
                Rito de la Confirmación y Unción Crismal
              </h2>
              <p className="text-xs font-sans text-[#666] mt-1">
                Renovación Bautismal, Imposición de Manos y Don del Espíritu Santo
              </p>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  I. Imposición de las Manos
                </h3>
              </div>
              <div className="rubric">El Obispo o Celebrante, de pie con las manos juntas, dice a la asamblea:</div>
              <p className="priest-voice">
                «Oremos, hermanos, a Dios Padre todopoderoso, y pidámosle que derrame el Espíritu Santo sobre estos hijos suyos, que ya renacieron a la vida eterna en el Bautismo, para que los confirme con la plenitud de sus dones y los haga semejantes a Cristo.»
              </p>
              <div className="rubric">Y todos oran en silencio unos instantes. Luego el celebrante extiende las manos sobre todos los confirmandos:</div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border-l-3 border-[#800020] space-y-2">
                <p className="font-serif text-[17px] leading-relaxed text-[#2D2926]">
                  «Dios todopoderoso, Padre de nuestro Señor Jesucristo, que hiciste renacer a estos hijos tuyos por el agua y el Espíritu Santo: envía sobre ellos el Espíritu Santo Paráclito; concédeles el <strong>espíritu de sabiduría y de inteligencia</strong>, el <strong>espíritu de consejo y de fortaleza</strong>, el <strong>espíritu de ciencia y de piedad</strong>; y cólmalos del <strong>espíritu de tu santo temor</strong>. Por Jesucristo, nuestro Señor.»
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Amén.</p>
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-[#D9D1C3]">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  II. Unción con el Santo Crisma
                </h3>
              </div>
              <div className="rubric">El padrino coloca su mano derecha sobre el hombro del confirmando. El celebrante moja el pulgar en el Santo Crisma y traza la señal de la cruz en la frente:</div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border border-[#D9D1C3] space-y-3">
                <p className="priest-voice font-bold text-[#800020]">
                  «[Nombre], RECIBE POR ESTA SEÑAL EL DON DEL ESPÍRITU SANTO.»
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">El Confirmado responde:</span> <strong>Amén.</strong></p>
                <p className="priest-voice pt-2">«La paz sea contigo.»</p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">El Confirmado:</span> <strong>Y con tu espíritu.</strong></p>
              </div>
            </section>
          </div>
        )}

        {/* RITUAL DE UNCIÓN DE LOS ENFERMOS */}
        {activeSacramento === 'uncion' && (
          <div className="space-y-8">
            <div className="border-b border-[#D9D1C3] pb-4 text-center">
              <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
                Ritual de la Sagrada Unción de los Enfermos y Viático
              </div>
              <h2 className="text-3xl sm:text-4xl font-light font-serif italic text-[#2D2926]">
                Santa Unción y Encomendación de la Salud
              </h2>
              <p className="text-xs font-sans text-[#666] mt-1">
                Consuelo de Cristo para el alma y el cuerpo
              </p>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  I. Imposición de Manos en Silencio
                </h3>
              </div>
              <div className="rubric">El sacerdote impone en silencio sus manos sobre la cabeza del enfermo, invocando la presencia consoladora del Señor.</div>
            </section>

            <section className="space-y-4 pt-4 border-t border-[#D9D1C3]">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  II. Sagrada Unción en Frente y Manos
                </h3>
              </div>
              <div className="rubric">El sacerdote unge con el Óleo de los Enfermos la frente diciendo:</div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border-l-3 border-[#800020] space-y-2">
                <p className="font-serif text-[18px] leading-relaxed text-[#800020] font-bold">
                  «POR ESTA SANTA UNCIÓN Y POR SU BONDADOSA MISERICORDIA, TE AYUDE EL SEÑOR CON LA GRACIA DEL ESPÍRITU SANTO.»
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Amén.</p>
              </div>

              <div className="rubric pt-2">Luego unge las palmas de las manos diciendo:</div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border-l-3 border-[#800020] space-y-2">
                <p className="font-serif text-[18px] leading-relaxed text-[#800020] font-bold">
                  «PARA QUE, LIBRE DE TUS PECADOS, TE CONCEDA LA SALVACIÓN Y TE RECONFORTA EN TU ENFERMEDAD.»
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">R.</span> Amén.</p>
              </div>
            </section>
          </div>
        )}

        {/* RITUAL DE RECONCILIACIÓN (CONFESIÓN) */}
        {activeSacramento === 'reconciliacion' && (
          <div className="space-y-8">
            <div className="border-b border-[#D9D1C3] pb-4 text-center">
              <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
                Ordo Paenitentiae • Sacramento de la Reconciliación
              </div>
              <h2 className="text-3xl sm:text-4xl font-light font-serif italic text-[#2D2926]">
                Fórmula Canónica de la Absolución Sacramental
              </h2>
              <p className="text-xs font-sans text-[#666] mt-1">
                Fórmula canónica oficial del Rito Romano
              </p>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  Fórmula Solemne de Absolución
                </h3>
              </div>
              <div className="rubric">El confesor extiende las manos hacia el penitente y dice:</div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border-l-3 border-[#800020] space-y-3">
                <p className="font-serif text-[17px] leading-relaxed text-[#2D2926]">
                  «Dios, Padre misericordioso, que reconcilió consigo al mundo por la muerte y la resurrección de su Hijo y derramó el Espíritu Santo para la remisión de los pecados, te conceda, por el ministerio de la Iglesia, el perdón y la paz.»
                </p>
                <p className="font-serif text-[19px] leading-relaxed text-[#800020] font-bold pt-2">
                  «Y YO TE ABSUELVO DE TUS PECADOS EN EL NOMBRE DEL PADRE, Y DEL HIJO, ✠ Y DEL ESPÍRITU SANTO.»
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">El penitente responde:</span> <strong>Amén.</strong></p>
              </div>

              <div className="rubric pt-2">Alabanza y despedida en la paz de Cristo:</div>
              <p className="priest-voice">
                «Den gracias al Señor porque es bueno.»
              </p>
              <p className="assembly-response pl-4">
                <span className="rubric font-sans">R.</span> Porque es eterna su misericordia.
              </p>
              <p className="priest-voice pt-1">
                «El Señor ha perdonado tus pecados. Vete en paz.»
              </p>
            </section>
          </div>
        )}

        {/* RITUAL DE ORDEN SAGRADO / MINISTERIOS */}
        {activeSacramento === 'orden' && (
          <div className="space-y-8">
            <div className="border-b border-[#D9D1C3] pb-4 text-center">
              <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
                Pontificale Romanum • Ordenación y Ministerios Eclesiales
              </div>
              <h2 className="text-3xl sm:text-4xl font-light font-serif italic text-[#2D2926]">
                Liturgia de la Ordenación y Promesa Sacerdotal
              </h2>
              <p className="text-xs font-sans text-[#666] mt-1">
                Diaconado, Presbiterado y Ministerios Laicales
              </p>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-6 bg-[#800020]"></span>
                <h3 className="uppercase font-sans text-[11px] tracking-[0.2em] font-bold text-[#800020]">
                  Promesa de Obediencia y Plegaria de Consagración
                </h3>
              </div>
              <div className="rubric">El ordenando pone sus manos entre las manos del Obispo:</div>
              <div className="bg-[#F5F2EB] p-6 rounded-sm border-l-3 border-[#800020] space-y-3">
                <p className="priest-voice font-bold">
                  «¿Prometes respeto y obediencia a mí y a mis sucesores?»
                </p>
                <p className="assembly-response pl-4"><span className="rubric font-sans">El Elegido:</span> <strong>Prometo.</strong></p>
                <p className="priest-voice pt-2">
                  «Dios, que comenzó en ti la obra buena, Él mismo la lleve a término.»
                </p>
              </div>

              <div className="rubric pt-3">Entrega de las Ofrendas y del Cáliz:</div>
              <p className="priest-voice">
                «Recibe la ofrenda del pueblo santo para presentarla a Dios. Considera lo que realizas, imita lo que conmemoras y conforma tu vida con el misterio de la cruz del Señor.»
              </p>
            </section>
          </div>
        )}

      </div>
    </div>
  );
};
