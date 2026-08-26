import React from 'react';
import { XVAñosParams } from '../../types/liturgia';
import { Sparkles, Printer, Music, Heart, BookOpen, Crown } from 'lucide-react';

interface XVAñosRitualViewProps {
  data: XVAñosParams;
}

export const XVAñosRitualView: React.FC<XVAñosRitualViewProps> = ({ data }) => {
  const handlePrint = () => {
    window.print();
  };

  const quinceanera = data.nombreQuinceanera || 'Mariana Guadalupe Ramírez';
  const padres = data.nombrePadres || 'Héctor Ramírez y Guadalupe Hernández';
  const padrinosBibliaRosario = data.nombrePadrinosBibliaRosario || data.nombrePadrinos || 'Padrinos de Biblia y Rosario';
  const padrinosFlores = data.nombrePadrinosFlores || 'Padrinos de Flores para la Virgen';
  const celebrante = data.nombreCelebrante || 'Fr. Alan Sanchez';
  const parroquia = data.nombreParroquia || 'Our Lady of Guadalupe';
  const ciudad = data.ciudadLugar || 'Laredo, Tx.';
  const musicos = data.nombreMusicos || 'Coro Parroquial';
  const fecha = data.fecha || new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-12 font-serif text-[#2D2926]">
      {/* Action Bar */}
      <div className="flex items-center justify-between bg-[#F0EDE6] p-4 rounded-md border border-[#D9D1C3] no-print">
        <div className="flex items-center gap-2">
          <Sparkles className="text-[#800020]" size={20} />
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#800020]">
            Esquema Oficial de Misa de Acción de Gracias • XV Años (11 Páginas)
          </span>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#800020] text-white px-4 py-2 rounded-sm text-xs font-sans font-semibold tracking-wider uppercase hover:bg-[#600018] transition shadow-xs cursor-pointer"
        >
          <Printer size={15} />
          <span>Imprimir Guion XV Años (PDF)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 1: PORTADA LITÚRGICA                                               */}
      {/* ========================================================================= */}
      <div className="border border-[#D9D1C3] bg-[#FDFBF7] p-8 sm:p-14 text-center rounded-sm shadow-xs space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.3em] font-bold">
            Acción de Gracias
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#2D2926] tracking-tight">
            Misa De XV Años
          </h1>
          <p className="font-serif italic text-xl text-[#800020]">
            {quinceanera}
          </p>
          <p className="font-serif text-base text-[#666] pt-1">
            {parroquia}{ciudad ? `, ${ciudad}` : ''} • {fecha}
          </p>
        </div>

        <div className="py-4 space-y-1 text-sm font-serif text-[#444] border-t border-b border-[#D9D1C3] max-w-xs mx-auto">
          <p><strong>Presider:</strong> {celebrante}</p>
          <p><strong>Musicians:</strong> {musicos}</p>
        </div>

        {/* Emblema Sacro Floral / Cruz Mariana */}
        <div className="flex justify-center py-4">
          <svg width="100" height="130" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="47" y="10" width="6" height="110" stroke="#2D2926" strokeWidth="2" fill="#F0EDE6" />
            <rect x="20" y="35" width="60" height="6" stroke="#2D2926" strokeWidth="2" fill="#F0EDE6" />
            <circle cx="50" cy="38" r="14" stroke="#800020" strokeWidth="2" fill="none" />
            <path d="M45 75 Q50 68 55 75 Q50 82 45 75" fill="#D4AF37" stroke="#800020" />
            <path d="M42 90 Q50 83 58 90 Q50 97 42 90" fill="#D4AF37" stroke="#800020" />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 2: PROCESIÓN DE ENTRADA                                            */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020] tracking-wide">
            Liturgia de Bendición al Cumplir Quince Años
          </h2>
          <p className="font-serif italic text-base text-[#555] mt-1">Procesión de Entrada</p>
        </div>

        <p className="rubric text-center">
          El siguiente esquema será utilizado para la procesión de entrada:
        </p>

        <div className="max-w-xl mx-auto bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-base">
          <div className="flex items-center gap-3 text-[#800020] font-bold">
            <span>+</span>
            <span>Sacerdote Celebrante: {celebrante}</span>
          </div>
          <ol className="list-decimal pl-6 space-y-2 text-[#2D2926]">
            <li>
              <strong>Padrinos de Biblia y Rosario:</strong> {padrinosBibliaRosario}
            </li>
            <li>
              <strong>Padrinos de Flores para la Virgen:</strong> {padrinosFlores}
            </li>
            <li>
              <strong>Quinceañera (Con sus Padres):</strong> {quinceanera} (con {padres})
            </li>
          </ol>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 3: RITOS INICIALES                                                 */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D9D1C3] pb-3">
          <span className="h-[1px] w-8 bg-[#800020]"></span>
          <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
            Ritos Iniciales
          </h2>
        </div>

        <div className="space-y-4 text-[17px] leading-relaxed">
          <p className="priest-voice">
            <span className="text-[#800020] font-bold">Sacerdote:</span> Nos hemos reunido aquí para celebrar el cumpleaños de <strong>{quinceanera}</strong>. Nos sentimos solidarios de su alegría y con ella queremos dar gracias a Dios.
          </p>
          <p className="priest-voice pl-4">
            En momento de silencio reconozcamos que somos pecadores.
          </p>

          <div className="rubric bg-[#F5F2EB] p-3 text-center rounded-sm">
            Momento de silencio para el examen de conciencia.
          </div>

          <div className="bg-[#F0EDE6] p-4 rounded-sm border-l-3 border-[#800020] text-sm font-sans flex items-center justify-between">
            <div>
              <span className="font-bold text-[#800020] uppercase tracking-wider block text-xs">Cantos Penitencial y Alabanza:</span>
              <p className="text-[#2D2926] italic font-serif text-base">Coro: Se puede cantar “Señor Ten Piedad” y “Gloria a Dios en el Cielo”</p>
            </div>
            <Music className="text-[#800020]" size={20} />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 4: ORACIÓN COLECTA                                                 */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D9D1C3] pb-3">
          <span className="h-[1px] w-8 bg-[#800020]"></span>
          <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
            Oración Colecta
          </h2>
        </div>

        <div className="space-y-4 text-[17px] leading-relaxed">
          <p className="priest-voice">
            <span className="text-[#800020] font-bold">Oremos.</span>
          </p>
          <div className="bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3] font-serif text-[18px] leading-relaxed">
            <p>
              <span className="text-[#800020] font-bold">Celebrante:</span><br />
              Dios y Padre generoso, de quien procede todo cuanto somos y tenemos,<br />
              enséñanos a reconocer los beneficios de tu paterno amor,<br />
              para que te amemos con todo el corazón y todas nuestras fuerzas.<br />
              Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos.
            </p>
          </div>
          <p className="assembly-response pl-4 font-bold text-lg">
            <span className="rubric font-sans">Respuesta:</span> Amén.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 5-7: LITURGIA DE LA PALABRA                                        */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-8">
        <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-3">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#800020]"></span>
            <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
              Liturgia de la Palabra
            </h2>
          </div>
          <span className="rubric text-xs font-sans uppercase tracking-widest font-semibold">Sentados</span>
        </div>

        {/* 1ra Lectura: Jeremías 1, 4-10 */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif font-bold text-lg text-[#2D2926]">
              Lectura del libro del profeta Jeremías
            </h3>
            <span className="text-[#800020] font-sans font-bold text-sm">Jr 1, 4-10</span>
          </div>

          <div className="capitular-letter text-[#2D2926] text-[17px] leading-[1.8] whitespace-pre-line">
            {`En tiempo de Josías, el Señor me dirigió estas palabras:
"Desde antes de formarte en el seno materno, te conozco;
desde antes de que nacieras, te consagré profeta para las naciones".
Yo le contesté:
"Pero, Señor mío, yo no sé expresarme,
porque apenas soy un muchacho".
El Señor me dijo:
"No digas que eres un muchacho, pues irás
adonde yo te envíe y dirás lo que yo te mandé.
No tengas miedo, porque yo estoy contigo para
protegerte", palabra del Señor.
El Señor extendió entonces su brazo, con su mano me tocó la boca y me dijo:
"Desde hoy pongo mis palabras en tu boca
y te doy autoridad sobre pueblos y reyes, para que
arranques y derribes, para que destruyas y
deshagas, para que edifiques y plantes."`}
          </div>

          <div className="pt-2">
            <p className="priest-voice text-base">Palabra de Dios.</p>
            <p className="assembly-response pl-4 text-base">
              <span className="rubric font-sans">R.</span> Te alabamos, Señor.
            </p>
          </div>
        </div>

        {/* Salmo Responsorial: Salmo 138 */}
        <div className="bg-[#F0EDE6] p-6 rounded-sm border border-[#D9D1C3] space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="font-sans text-xs font-bold text-[#800020] uppercase tracking-widest">
              Coro: Salmo Responsorial
            </span>
            <span className="text-[#555] font-sans text-xs font-semibold">Salmo 138, 1-3. 13-14ab. 14c-15</span>
          </div>

          <div className="p-3 bg-[#FDFBF7] border border-[#D9D1C3] rounded-sm text-[#800020] font-serif font-bold text-lg">
            R. Te doy gracias, Señor, porque me has formado maravillosamente.
          </div>

          <div className="space-y-3 text-[16px] text-[#2D2926] italic leading-relaxed">
            <p>
              Tú me conoces, Señor, profundamente:<br />
              tú conoces cuándo me siento y me levanto.<br />
              desde lejos sabes mis pensamientos,<br />
              tú observas mi camino y mi descanso,<br />
              todas mis sendas te son familiares. <strong className="text-[#800020] not-italic">R.</strong>
            </p>
            <p>
              Tú formaste mis entrañas,<br />
              me tejiste en el seno materno.<br />
              Te doy gracias por tan grandes maravillas;<br />
              soy un prodigio y tus obras son prodigiosas. <strong className="text-[#800020] not-italic">R.</strong>
            </p>
            <p>
              Conocías plenamente mi alma;<br />
              no se te escondía mi organismo,<br />
              cuando en lo oculto me iba formando,<br />
              y entretejiendo en lo profundo de la tierra. <strong className="text-[#800020] not-italic">R.</strong>
            </p>
          </div>
        </div>

        {/* Aclamación antes del Evangelio */}
        <div className="bg-[#F0EDE6] p-4 rounded-sm border-l-3 border-[#800020] space-y-2">
          <span className="font-sans text-xs font-bold text-[#800020] uppercase tracking-widest block">
            Proclamación del Evangelio • Aclamación
          </span>
          <div className="text-center font-serif text-[#800020] font-bold text-base space-y-1">
            <p className="text-lg">Coro: ¡Aleluya!</p>
            <p className="text-[#2D2926] italic font-normal text-base">
              ¡Feliz la que ha creído que se cumplirían las cosas que le fueron dichas de parte del Señor!
            </p>
            <p className="text-sm">¡Aleluya! <span className="text-[#555] font-normal">(Lc 1, 45)</span></p>
          </div>
        </div>

        {/* Santo Evangelio: Lucas 1, 39-56 (Magníficat) */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif font-bold text-xl text-[#800020]">
              † Lectura del Santo Evangelio según san Lucas
            </h3>
            <span className="text-[#800020] font-sans font-bold text-sm">Lucas 1, 39-56</span>
          </div>

          <div className="text-[#2D2926] text-[17px] leading-[1.8] whitespace-pre-line">
            {`En aquellos días, se levantó María y se fue con prontitud a la región montañosa, a una ciudad de Judá; entró en casa de Zacarías y saludó a Isabel. Y sucedió que, en cuanto oyó Isabel el saludo de María, saltó de gozo el niño en su seno, e Isabel quedó llena de Espíritu Santo; y exclamando con gran voz, dijo:

«Bendita tú entre las mujeres y bendito el fruto de tu seno; y ¿de dónde a mí que la madre de mi Señor venga a mí? Porque, apenas llegó a mis oídos la voz de tu saludo, saltó de gozo el niño en mi seno. ¡Feliz la que ha creído que se cumplirían las cosas que le fueron dichas de parte del Señor!»

Y dijo María:

«Engrandece mi alma al Señor y mi espíritu se alegra en Dios mi salvador porque ha puesto los ojos en la humildad de su esclava, por eso desde ahora todas las generaciones me llamarán bienaventurada, porque ha hecho en mi favor maravillas el Poderoso, Santo es su nombre y su misericordia alcanza de generación en generación a los que le temen.

Desplegó la fuerza de su brazo, dispersó a los que son soberbios en su propio corazón. Derribó a los potentados de sus tronos y exaltó a los humildes. A los hambrientos colmó de bienes y a los ricos sin nada. Acogió a Israel, su siervo, acordándose de la misericordia como había anunciado a nuestros padres en favor de Abraham y de su linaje por los siglos.»

María permaneció con ella unos tres meses, y se volvió a su casa.`}
          </div>

          <div className="pt-2">
            <p className="priest-voice text-base font-bold text-[#800020]">Palabra del Señor.</p>
            <p className="assembly-response pl-4 text-base font-bold">
              <span className="rubric font-sans">R.</span> Gloria a ti, Señor Jesús.
            </p>
          </div>

          <div className="rubric bg-[#F5F2EB] p-3 text-center rounded-sm">
            Sigue la Homilía.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 8: RENOVACIÓN DE LAS PROMESAS DEL BAUTISMO                          */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
            Rito de Acción de Gracias
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Renovación de las Promesas del Bautismo
          </h2>
        </div>

        <p className="rubric text-center">
          El sacerdote se dirige a la comunidad con estas palabras u otras parecidas:
        </p>

        <div className="space-y-4 text-[17px] leading-relaxed">
          <div className="bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3] space-y-3">
            <p className="priest-voice">
              <span className="text-[#800020] font-bold">Sacerdote:</span> Cuando tus papás y tus padrinos te trajeron a las aguas bautismales ellos en tu nombre hicieron unas promesas en las cuales renuncias a satanás y a todas sus obras y prometiste servir fielmente a Dios en la santa iglesia católica.
            </p>
            <p className="priest-voice">
              El día de hoy que celebras tus quince años la Iglesia pide que renueves esas mismas promesas, por eso hoy delante de esta comunidad cristiana que representa la Iglesia yo te pregunto:
            </p>
          </div>

          {/* Renuncias */}
          <div className="space-y-3 pl-4 border-l-3 border-[#800020]">
            <div>
              <p className="priest-voice">
                <span className="text-[#800020] font-bold">Sacerdote:</span> ¿Renuncias al pecado, para que puedas vivir en la libertad de los hijos de Dios?
              </p>
              <p className="assembly-response font-bold text-[#800020] pl-6">
                Todos: Sí, renuncio.
              </p>
            </div>

            <div>
              <p className="priest-voice">
                <span className="text-[#800020] font-bold">Sacerdote:</span> ¿Renuncias a todas las seducciones del mal para que el pecado no te esclavice?
              </p>
              <p className="assembly-response font-bold text-[#800020] pl-6">
                Todos: Sí, renuncio.
              </p>
            </div>

            <div>
              <p className="priest-voice">
                <span className="text-[#800020] font-bold">Sacerdote:</span> ¿Renuncias a Satanás, padre y autor de todo pecado?
              </p>
              <p className="assembly-response font-bold text-[#800020] pl-6">
                Todos: Sí, renuncio.
              </p>
            </div>
          </div>

          <div className="rubric pt-2">Prosigue el sacerdote:</div>

          {/* Profesión de Fe */}
          <div className="space-y-3 pl-4 border-l-3 border-[#D4AF37]">
            <div>
              <p className="priest-voice">
                <span className="text-[#800020] font-bold">Sacerdote:</span> ¿Crees en Dios, Padre todopoderoso, creador del cielo y de la tierra?
              </p>
              <p className="assembly-response font-bold text-[#800020] pl-6">
                Todos: Sí, creo.
              </p>
            </div>

            <div>
              <p className="priest-voice">
                <span className="text-[#800020] font-bold">Sacerdote:</span> ¿Crees en Jesucristo, su Hijo único y Señor nuestro, que nació de la Virgen María, padeció y murió por nosotros, resucitó y está sentado a la derecha del Padre?
              </p>
              <p className="assembly-response font-bold text-[#800020] pl-6">
                Todos: Sí, creo.
              </p>
            </div>

            <div>
              <p className="priest-voice">
                <span className="text-[#800020] font-bold">Sacerdote:</span> ¿Crees en el Espíritu Santo, en la santa Iglesia católica, en la comunión de los santos, en el perdón de los pecados, en la resurrección de los muertos y en la vida eterna?
              </p>
              <p className="assembly-response font-bold text-[#800020] pl-6">
                Todos: Sí, creo.
              </p>
            </div>
          </div>

          {/* Conclusión Sacerdotal */}
          <div className="bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3]">
            <p className="rubric mb-2">Y el sacerdote concluye:</p>
            <p className="priest-voice text-[18px]">
              Que Dios todopoderoso, Padre de nuestro Señor Jesucristo, que nos liberó del pecado y nos ha hecho renacer por el agua y el Espíritu Santo, nos conserve con su gracia unidos a Jesucristo nuestro Señor, hasta la vida eterna.
            </p>
            <p className="assembly-response pl-4 pt-2 font-bold text-lg text-[#800020]">
              Todos: Amén.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 9: ORACIÓN UNIVERSAL                                               */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D9D1C3] pb-3">
          <span className="h-[1px] w-8 bg-[#800020]"></span>
          <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
            Oración Universal
          </h2>
        </div>

        <div className="space-y-4 text-[17px] leading-relaxed">
          <p className="priest-voice">
            <span className="text-[#800020] font-bold">Sacerdote:</span> Elevemos, hermanos, nuestras oraciones a Dios, nuestro Padre, por el bien de la Iglesia y la salvación de todos diciendo: <strong>Te rogamos, Señor</strong>.
          </p>

          <div className="space-y-3 pl-4 border-l-2 border-[#D9D1C3]">
            <div>
              <p>
                1. Por la Iglesia en el mundo, para que sea portadora de la paz de Dios y predique al mundo entero la buena noticia del evangelio, roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, Señor.</p>
            </div>

            <div>
              <p>
                2. Para que los jóvenes crezcan siendo fieles a Dios y permanezcan firmes en la esperanza, roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, Señor.</p>
            </div>

            <div>
              <p>
                3. Para que <strong>{quinceanera}</strong> pueda desarrollar todos sus dones, sepa valorar el esfuerzo de sus padres y educadores y corresponda con un gran espíritu de lealtad y sinceridad, roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, Señor.</p>
            </div>

            <div>
              <p>
                4. Para que el Espíritu Santo le conceda inteligencia, entusiasmo y la sabiduría de Dios para hacer decisiones serenas y maduras, roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, Señor.</p>
            </div>

            <div>
              <p>
                5. Por los enfermos y desahuciados, por los aquí presentes para que la sanidad de Jesucristo descienda en cada uno de ellos, roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, Señor.</p>
            </div>
          </div>

          <div className="bg-[#F9F7F2] p-5 rounded-sm border border-[#D9D1C3]">
            <p className="priest-voice text-[17px]">
              <span className="text-[#800020] font-bold">Sacerdote:</span><br />
              Que nuestra oración, Dios de bondad, suba a tu presencia y que nuestras peticiones obtengan fruto abundante. Te lo pedimos por Jesucristo, nuestro Señor.
            </p>
            <p className="assembly-response pl-4 pt-2 font-bold">
              <span className="rubric font-sans">R.</span> Amén.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 10: ACTO DE CONSAGRACIÓN Y FLORES PARA LA VIRGEN                   */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
            Consagración Mariana
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Acto de Consagración y Flores para la Virgen
          </h2>
        </div>

        <div className="space-y-4 text-[17px] leading-relaxed">
          <div className="rubric text-center">
            La Quinceañera se acerca al altar de la Santísima Virgen María y proclama con devoción:
          </div>

          <div className="bg-[#FDFBF7] p-8 rounded-sm border-l-4 border-[#800020] text-[18px] leading-[1.8] space-y-3 font-serif">
            <p>
              Señor, Dios mío,<br />
              te doy gracias por darme la vida<br />
              al crearme a tu imagen y semejanza<br />
              y por llamarme a ser tu hija en el Bautismo.<br />
              Gracias por enviar a tu Hijo Jesucristo a salvarme<br />
              y a tu Espíritu Santo para santificarme.<br />
              Quiero responder que “sí”<br />
              a todo lo que tú deseas de mí en tu bondad y amor.
            </p>
            <p className="pt-2">
              Con tu gracia me comprometo a servir<br />
              a mis hermanas y hermanos a lo largo de mi vida.
            </p>
            <p className="pt-2 font-bold text-[#800020]">
              Me consagro a ti, María, Madre de Jesús y Madre nuestra,<br />
              tú estás muy cerca de él y eres mi modelo de fe,<br />
              concédeme que continuamente aprenda de ti<br />
              lo que necesito para ser una mujer cristiana.
            </p>
            <p className="pt-2">
              Ayúdame a escuchar la Palabra de Dios como tú lo hiciste,<br />
              guardándola en mi corazón y amando a los demás para que,<br />
              al caminar con Jesús en esta vida,<br />
              merezca alabarle junto a ti para siempre en el cielo.<br />
              Amén.
            </p>
          </div>

          <div className="bg-[#F9F7F2] p-5 rounded-sm border border-[#D9D1C3] space-y-2">
            <p className="rubric">El sacerdote responde:</p>
            <p className="priest-voice text-[18px] font-bold text-[#800020]">
              <strong>{quinceanera}</strong>, que este compromiso que hoy has hecho, Dios lo lleve a su feliz término.
            </p>
            <p className="assembly-response pl-4">
              <span className="rubric font-sans">R.</span> Amén.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 11: BENDICIÓN FINAL SOLEMNE                                        */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Bendición Final
          </h2>
        </div>

        <div className="space-y-4 text-[17px] leading-relaxed">
          <p className="priest-voice">
            <span className="text-[#800020] font-bold">Sacerdote:</span> El Señor esté con ustedes.
          </p>
          <p className="assembly-response pl-4">
            <span className="rubric font-sans">R/.</span> Y con tu Espíritu.
          </p>

          <div className="bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3] space-y-4 text-[18px]">
            <div>
              <p className="priest-voice">
                <span className="text-[#800020] font-bold">Sacerdote:</span><br />
                Dios amoroso,<br />
                tú creaste a todos los pueblos de la tierra<br />
                y nos conoces a cada uno por nombre.<br />
                Te damos gracias por <strong>{quinceanera}</strong>,<br />
                que celebra hoy sus quince años.<br />
                Bendícela con tu amor y amistad<br />
                para que pueda crecer en sabiduría, conocimiento y gracia,<br />
                amando siempre a su familia y siendo fiel a sus amigos.<br />
                Por Jesucristo nuestro Señor.
              </p>
              <p className="assembly-response pl-4 font-bold text-[#800020] pt-2">
                R/. Amén.
              </p>
            </div>

            <div className="pt-3 border-t border-[#D9D1C3]">
              <p className="priest-voice font-bold">
                Y la Bendición de Dios Padre Todopoderoso + Hijo y Espíritu Santo esté con ustedes y los acompañe siempre.
              </p>
              <p className="assembly-response pl-4 font-bold text-[#800020] text-xl">
                R/. Amén.
              </p>
            </div>
          </div>

          <div className="rubric text-center pt-2">
            Pueden ir en paz. / Demos gracias a Dios. Sigue la felicitación y fotografías con los padres y padrinos.
          </div>
        </div>
      </section>
    </div>
  );
};
