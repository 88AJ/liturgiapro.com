import React from 'react';
import { MatrimonioParams } from '../../types/liturgia';
import { Heart, Printer, Sparkles, Music, Users, ShieldCheck } from 'lucide-react';

interface MatrimonioRitualViewProps {
  data: MatrimonioParams;
}

export const MatrimonioRitualView: React.FC<MatrimonioRitualViewProps> = ({ data }) => {
  const handlePrint = () => {
    window.print();
  };

  const esposo = data.nombreEsposo || 'Eduardo De La Miyar Jr.';
  const esposa = data.nombreEsposa || 'Samantha Sinaí Sanchez';
  const celebrante = data.nombreCelebrante || 'Fr. Alan Sanchez';
  const parroquia = data.nombreParroquia || 'Our Lady of Guadalupe';
  const ciudad = data.ciudadLugar || 'Laredo, Tx.';
  const fecha = data.fecha || 'Octubre 5, 2024';
  const musicos = data.nombreMusicos || 'Coro Parroquial';

  return (
    <div className="space-y-12 font-serif text-[#2D2926]">
      {/* Action Bar */}
      <div className="flex items-center justify-between bg-[#F0EDE6] p-4 rounded-md border border-[#D9D1C3] no-print">
        <div className="flex items-center gap-2">
          <Heart className="text-[#800020]" size={20} />
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#800020]">
            Esquema Canónico Completo de Boda Católica (23 Páginas)
          </span>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#800020] text-white px-4 py-2 rounded-sm text-xs font-sans font-semibold tracking-wider uppercase hover:bg-[#600018] transition shadow-xs cursor-pointer"
        >
          <Printer size={15} />
          <span>Imprimir Guion Nupcial (PDF)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 1: PORTADA LITÚRGICA                                               */}
      {/* ========================================================================= */}
      <div className="border border-[#D9D1C3] bg-[#FDFBF7] p-8 sm:p-14 text-center rounded-sm shadow-xs space-y-6">
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2926] tracking-tight">
            Boda de {esposo} y {esposa}
          </h1>
          <p className="font-serif text-lg text-[#555]">
            {parroquia}, {ciudad}
          </p>
          <p className="font-serif text-base text-[#777]">
            {fecha}
          </p>
        </div>

        <div className="py-4 space-y-1 text-sm font-serif text-[#444]">
          <p><strong>Presider:</strong> {celebrante}</p>
          <p><strong>Musicians:</strong> {musicos}</p>
        </div>

        {/* Emblema Sacro Nupcial: Cruz con Alianzas Entrelazadas */}
        <div className="flex justify-center py-6">
          <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cruz Vertical */}
            <rect x="56" y="10" width="8" height="160" stroke="#2D2926" strokeWidth="2" fill="#F0EDE6" />
            {/* Cruz Horizontal */}
            <rect x="15" y="45" width="90" height="8" stroke="#2D2926" strokeWidth="2" fill="#F0EDE6" />
            {/* Anillo Izquierdo */}
            <circle cx="50" cy="49" r="18" stroke="#800020" strokeWidth="3" fill="none" />
            {/* Anillo Derecho */}
            <circle cx="70" cy="49" r="18" stroke="#D4AF37" strokeWidth="3" fill="none" />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 2: PROCESIÓN DE ENTRADA                                            */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020] tracking-wide">
            Liturgia Matrimonial
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
              <strong>Amigos del Novio (Groomsmen):</strong> {data.nombreAmigosNovio || 'Cortejo de Amigos del Novio'}
            </li>
            <li>
              <strong>Novio con Padres:</strong> {esposo} {data.nombrePadresNovio ? `con ${data.nombrePadresNovio}` : 'con Padres'}
            </li>
            <li>
              <strong>Padrinos de Anillos:</strong> {data.nombrePadrinosAnillos || 'Padrinos de Anillos'}
            </li>
            <li>
              <strong>Padrinos de Arras:</strong> {data.nombrePadrinosArras || 'Padrinos de Arras'}
            </li>
            <li>
              <strong>Padrinos de Lazo:</strong> {data.nombrePadrinosLazo || 'Padrinos de Lazo'}
            </li>
            <li>
              <strong>Padrinos de Flores para la Virgen:</strong> {data.nombrePadrinosFlores || 'Padrinos de Flores para la Virgen'}
            </li>
            <li>
              <strong>Amigas de la Novia (Bridesmaids):</strong> {data.nombreAmigasNovia || 'Cortejo de Damas de Honor'}
            </li>
            <li>
              <strong>Novia con Padres:</strong> {esposa} {data.nombrePadresNovia ? `con ${data.nombrePadresNovia}` : 'con Padres'}
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
            <span className="text-[#800020] font-bold">Sacerdote:</span> Hermanos y hermanas, con gozo nos hemos reunido en la casa del Señor para celebrar la unión matrimonial de <strong>{esposo}</strong> y <strong>{esposa}</strong>, en el día en que ellos van a establecer su propio hogar.
          </p>
          <p className="priest-voice pl-4">
            Para ellos este momento es de singular importancia. Por eso, vamos a acompañarlos con nuestro cariño, amistad y oración fraterna.
          </p>
          <p className="priest-voice pl-4">
            Escuchemos atentamente con ellos la Palabra que Dios nos va a dirigir hoy.
          </p>
          <p className="priest-voice pl-4">
            Después, con la santa Iglesia, invocaremos a Dios Padre, por Jesucristo, nuestro Señor, para que acoja complacido a estos hijos suyos que van a contraer Matrimonio, los bendiga y les conceda vivir en unidad permanente.
          </p>

          <div className="bg-[#F0EDE6] p-4 rounded-sm border-l-3 border-[#800020] text-sm font-sans flex items-center justify-between">
            <div>
              <span className="font-bold text-[#800020] uppercase tracking-wider block text-xs">Canto del Gloria:</span>
              <p className="text-[#2D2926] italic font-serif text-base">Coro: Cantar “Gloria a Dios en el Cielo”</p>
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
              Desde el principio, oh Dios,<br />
              has bendecido la creación con una vida rica y abundante;<br />
              escucha nuestras súplicas y derrama tu bendición sobre tus hijos<br />
              <strong>{esposo}</strong> y <strong>{esposa}</strong>, para que, unidos en Matrimonio, con un mismo corazón y un mismo sentir, se apoyen mutuamente y vivan juntos en la santidad.
            </p>
            <p className="pt-3">
              Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo, y es Dios, por los siglos de los siglos.
            </p>
          </div>
          <p className="assembly-response pl-4">
            <span className="rubric font-sans">R.</span> Amén.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 5-8: LITURGIA DE LA PALABRA                                        */}
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

        {/* 1ra Lectura */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif font-bold text-lg text-[#2D2926]">
              Lectura del libro del Génesis
            </h3>
            <span className="text-[#800020] font-sans font-bold text-sm">Gn 2, 18-24</span>
          </div>

          <div className="capitular-letter text-[#2D2926] text-[17px] leading-[1.8] whitespace-pre-line">
            {`En aquel día, dijo el Señor Dios: "No es bueno que el hombre esté solo. Voy a hacerle a alguien como él, para que lo ayude". Entonces el Señor Dios formó de la tierra todas las bestias del campo y todos los pájaros del cielo y los llevó ante Adán para qué les pusiera nombre y así todo ser viviente tuviera el nombre puesto por Adán.

Así, pues, Adán les puso nombre a todos los animales domésticos, a los pájaros del cielo y a las bestias del campo; pero no hubo ningún ser semejante a Adán para ayudarlo.

Entonces el señor Dios hizo caer al hombre en un profundo sueño, y mientras dormía, le sacó una costilla y cerró la carne sobre el lugar vacío. Y de la costilla que le había sacado al hombre, Dios formó una mujer. Se la llevó al hombre y éste exclamo:

"Ésta sí es hueso de mis huesos
y carne de mi carne.
Ésta será llamada mujer,
porque ha sido formada del hombre".

Por eso el hombre abandonará a su padre y a su madre, y se unirá a su mujer y serán los dos una sola carne.`}
          </div>

          <div className="pt-2">
            <p className="priest-voice text-base">Palabra de Dios.</p>
            <p className="assembly-response pl-4 text-base">
              <span className="rubric font-sans">R.</span> Te alabamos, Señor.
            </p>
          </div>
        </div>

        {/* Salmo Responsorial */}
        <div className="bg-[#F0EDE6] p-6 rounded-sm border border-[#D9D1C3] space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="font-sans text-xs font-bold text-[#800020] uppercase tracking-widest">
              Coro: Salmo Responsorial
            </span>
            <span className="text-[#555] font-sans text-xs font-semibold">Salmo 127, 1-2. 3. 5-6</span>
          </div>

          <div className="p-3 bg-[#FDFBF7] border border-[#D9D1C3] rounded-sm text-[#800020] font-serif font-bold text-lg">
            R. (cf. 5) Dichoso el que teme al Señor.
          </div>

          <div className="space-y-3 text-[16px] text-[#2D2926] italic leading-relaxed">
            <p>
              Dichoso el que teme al Señor<br />
              y sigue sus caminos:<br />
              comerá del fruto de su trabajo,<br />
              será dichoso, le irá bien. <strong className="text-[#800020] not-italic">R.</strong>
            </p>
            <p>
              Su mujer, como vid fecunda,<br />
              en medio de su casa;<br />
              sus hijos, como renuevos de olivo,<br />
              alrededor de tu mesa. <strong className="text-[#800020] not-italic">R.</strong>
            </p>
            <p>
              Esta es la bendición del hombre que teme al Señor:<br />
              “Que el Señor te bendiga desde Sión,<br />
              que veas la prosperidad de Jerusalén<br />
              todos los días de tu vida”. <strong className="text-[#800020] not-italic">R.</strong>
            </p>
            <p>
              Que veas a los hijos de tus hijos.<br />
              ¡Paz a Israel! <strong className="text-[#800020] not-italic">R.</strong>
            </p>
          </div>
        </div>

        {/* Segunda Lectura */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif font-bold text-lg text-[#2D2926]">
              Lectura de la Carta a los Hebreos
            </h3>
            <span className="text-[#800020] font-sans font-bold text-sm">Hebreos 2, 8-11</span>
          </div>

          <div className="text-[#2D2926] text-[17px] leading-[1.8] whitespace-pre-line">
            {`Hermanos: Es verdad que ahora todavía no vemos el universo entero sometido al hombre; pero sí vemos ya al que por un momento Dios hizo inferior a los ángeles, a Jesús, que por haber sufrido la muerte, está coronado de gloria y honor. Así, por la gracia de Dios, la muerte que él sufrió redunda en bien de todos.

En efecto, el creador y Señor de todas las cosas quiere que todos sus hijos tengan parte en su gloria. Por eso convenía que Dios consumara en la perfección, mediante el sufrimiento, a Jesucristo, autor y guía de nuestra salvación.

El santificador y los santificados tienen la misma condición humana. Por eso no se avergüenza de llamar hermanos a los hombres.`}
          </div>

          <div className="pt-2">
            <p className="priest-voice text-base">Palabra de Dios.</p>
            <p className="assembly-response pl-4 text-base">
              <span className="rubric font-sans">R.</span> Te alabamos, Señor.
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
              Si nos amamos los unos a los otros,<br />
              Dios permanece en nosotros<br />
              y su amor ha llegado en nosotros a su plenitud.
            </p>
            <p className="text-sm">¡Aleluya! <span className="text-[#555] font-normal">(1 Juan 4, 12)</span></p>
          </div>
        </div>

        {/* Santo Evangelio */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif font-bold text-xl text-[#800020]">
              † Lectura del santo Evangelio según San Marcos
            </h3>
            <span className="text-[#800020] font-sans font-bold text-sm">Marcos 10, 2-16</span>
          </div>

          <div className="text-[#2D2926] text-[17px] leading-[1.8] whitespace-pre-line">
            {`En aquel tiempo, se acercaron a Jesús unos fariseos y le preguntaron, para ponerlo a prueba: “¿Le es lícito a un hombre divorciarse de su esposa?”

Él les respondió: “¿Qué les prescribió Moisés?” Ellos contestaron: “Moisés nos permitió el divorcio mediante la entrega de un acta de divorcio a la esposa”. Jesús les dijo: “Moisés prescribió esto, debido a la dureza del corazón de ustedes. Pero desde el principio, al crearlos, Dios los hizo hombre y mujer. Por eso dejará el hombre a su padre y a su madre y se unirá a su esposa y serán los dos una sola cosa. De modo que ya no son dos, sino una sola cosa. Por eso, lo que Dios unió, que no lo separe el hombre”.

Ya en casa, los discípulos le volvieron a preguntar sobre el asunto. Jesús les dijo: “Si uno se divorcia de su esposa y se casa con otra, comete adulterio contra la primera. Y si ella se divorcia de su marido y se casa con otro, comete adulterio”.

Después de esto, la gente le llevó a Jesús unos niños para que los tocara, pero los discípulos trataban de impedirlo.

Al ver aquello, Jesús se disgustó y les dijo: “Dejen que los niños se acerquen a mí y no se lo impidan, porque el Reino de Dios es de los que son como ellos. Les aseguro que el que no reciba el Reino de Dios como un niño, no entrará en él”.

Después tomó en brazos a los niños y los bendijo imponiéndoles las manos.`}
          </div>

          <div className="pt-2">
            <p className="priest-voice text-base font-bold text-[#800020]">Palabra del Señor.</p>
            <p className="assembly-response pl-4 text-base font-bold">
              <span className="rubric font-sans">R.</span> Gloria a ti, Señor Jesús.
            </p>
          </div>

          <div className="rubric bg-[#F5F2EB] p-3 text-center rounded-sm">
            Sigue la Homilía Nupcial.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 9-15: CELEBRACIÓN DEL MATRIMONIO (RITO SACRAMENTAL)                */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-8">
        <div className="border-b border-[#D9D1C3] pb-4 text-center">
          <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
            Ordo Celebrandi Matrimonium
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2D2926]">
            Celebración Del Matrimonio
          </h2>
        </div>

        {/* 1. Introducción */}
        <div className="space-y-4">
          <h3 className="font-cinzel text-lg font-bold text-[#800020]">
            Introducción
          </h3>
          <div className="priest-voice text-[17px] leading-relaxed space-y-3 bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3]">
            <p>
              Queridos <strong>{esposo}</strong> y <strong>{esposa}</strong>:
            </p>
            <p>
              Ustedes han venido aquí, a la casa de Dios, para que él selle con su gracia la voluntad que tienen de contraer Matrimonio ante el ministro de la Iglesia y la comunidad cristiana aquí reunida.
            </p>
            <p>
              Cristo bendice abundantemente su amor conyugal, y él, que los consagró un día con el santo Bautismo, los enriquece hoy y les da la fuerza con un sacramento especial para que se guarden mutua y perpetua fidelidad y puedan cumplir las demás obligaciones del Matrimonio.
            </p>
            <p>
              Por tanto, ante esta asamblea, les pregunto sobre su intención.
            </p>
          </div>
        </div>

        {/* 2. Escrutinio */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-cinzel text-lg font-bold text-[#800020]">
            Escrutinio
          </h3>

          <div className="space-y-4 text-[17px]">
            <div>
              <p className="priest-voice">
                <span className="text-[#800020] font-bold">Sacerdote:</span> <strong>{esposo}</strong> y <strong>{esposa}</strong>, ¿vienen libre y voluntariamente a contraer Matrimonio, sin ser presionados?
              </p>
              <p className="assembly-response pl-6 font-bold text-[#2D2926]">
                <span className="text-[#800020]">R/.</span> Sí.
              </p>
            </div>

            <div>
              <p className="priest-voice">
                <span className="text-[#800020] font-bold">Sacerdote:</span> ¿Están decididos a amarse y respetarse mutuamente, siguiendo el modo de vida propio del Matrimonio durante toda la vida?
              </p>
              <p className="assembly-response pl-6 font-bold text-[#2D2926]">
                <span className="text-[#800020]">R/.</span> Sí.
              </p>
            </div>

            <div>
              <p className="priest-voice">
                <span className="text-[#800020] font-bold">Sacerdote:</span> ¿Están dispuestos a recibir de Dios responsable y amorosamente los hijos, y a educarlos según la ley de Cristo y de su Iglesia?
              </p>
              <p className="assembly-response pl-6 font-bold text-[#2D2926]">
                <span className="text-[#800020]">R/.</span> Sí.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Consentimiento */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-cinzel text-lg font-bold text-[#800020]">
            Consentimiento
          </h3>
          <p className="priest-voice">
            <span className="text-[#800020] font-bold">Sacerdote:</span> Así, pues, ya que desean contraer santo Matrimonio, unan sus manos, y manifiesten su consentimiento ante Dios y su Iglesia.
          </p>

          <div className="rubric">El sacerdote interroga al novio:</div>
          <div className="bg-[#F9F7F2] p-6 rounded-sm border-l-4 border-[#800020] space-y-3">
            <p className="priest-voice text-base">
              <strong>{esposo}</strong>, ¿quieres recibir a <strong>{esposa}</strong>, como esposa, y prometes serle fiel en las alegrías y en las penas en la salud y en la enfermedad, y, así, amarla y respetarla todos los días de tu vida?
            </p>
            <p className="assembly-response pl-4 text-lg font-bold text-[#800020]">
              El novio responde: «Sí, quiero.»
            </p>
          </div>

          <div className="rubric pt-2">El sacerdote interroga a la novia:</div>
          <div className="bg-[#F9F7F2] p-6 rounded-sm border-l-4 border-[#D4AF37] space-y-3">
            <p className="priest-voice text-base">
              <strong>{esposa}</strong>, ¿quieres recibir a <strong>{esposo}</strong>, como esposo, y prometes serle fiel en las alegrías y en las penas, en la salud y en la enfermedad, y, así, amarlo y respetarlo todos los días de tu vida?
            </p>
            <p className="assembly-response pl-4 text-lg font-bold text-[#800020]">
              La novia responde: «Sí, quiero.»
            </p>
          </div>
        </div>

        {/* 4. Confirmación del Consentimiento */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-cinzel text-lg font-bold text-[#800020]">
            Confirmación del Consentimiento
          </h3>
          <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#D9D1C3] space-y-3">
            <p className="priest-voice text-[18px] leading-relaxed">
              <span className="text-[#800020] font-bold">Sacerdote:</span><br />
              El Señor confirme con su bondad este consentimiento que han manifestado ante la Iglesia y les otorgue su copiosa bendición.<br />
              <strong className="text-[#800020] uppercase tracking-wide">Lo que Dios ha unido, que no lo separe el hombre.</strong>
            </p>
            <p className="priest-voice pt-2">
              <span className="text-[#800020] font-bold">Sacerdote:</span> Bendigamos al Señor.
            </p>
            <p className="assembly-response pl-4 text-lg font-bold text-[#2D2926]">
              Todos responden: «Demos gracias a Dios.»
            </p>
          </div>
        </div>

        {/* 5. Bendición y Entrega de Anillos */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-cinzel text-lg font-bold text-[#800020]">
            Bendición y Entrega de Anillos
          </h3>
          <div className="bg-[#F9F7F2] p-5 rounded-sm border border-[#D9D1C3]">
            <p className="priest-voice text-[17px]">
              <span className="text-[#800020] font-bold">Sacerdote:</span><br />
              Bendice, + Señor, estos anillos que bendecimos en tu nombre, para que quienes los lleven cumplan siempre tu voluntad se guarden íntegra fidelidad el uno al otro, y vivan en paz amándose siempre. Por Jesucristo, nuestro Señor. Amén.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="rubric">El esposo coloca el anillo en el anular de la esposa diciendo:</div>
            <p className="font-serif text-[18px] text-[#2D2926] bg-[#FDFBF7] p-4 border-l-3 border-[#800020] rounded-sm">
              «<strong>{esposa}</strong>, recibe este anillo, en señal de mi amor y fidelidad a ti. En el nombre del Padre, y del Hijo, y del Espíritu Santo.»
            </p>

            <div className="rubric pt-2">La esposa coloca el anillo en el anular del esposo diciendo:</div>
            <p className="font-serif text-[18px] text-[#2D2926] bg-[#FDFBF7] p-4 border-l-3 border-[#800020] rounded-sm">
              «<strong>{esposo}</strong>, recibe este anillo, en señal de mi amor y fidelidad a ti. En el nombre del Padre, y del Hijo, y del Espíritu Santo.»
            </p>
          </div>
        </div>

        {/* 6. Bendición y Entrega de las Arras */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-cinzel text-lg font-bold text-[#800020]">
            Bendición y Entrega de las Arras
          </h3>
          <div className="bg-[#F9F7F2] p-5 rounded-sm border border-[#D9D1C3]">
            <p className="priest-voice text-[17px]">
              <span className="text-[#800020] font-bold">Sacerdote:</span><br />
              Bendice, + Señor, estas arras que <strong>{esposo}</strong> y <strong>{esposa}</strong> se entregan, y derrama sobre ellos la abundancia de tus bienes. Por Jesucristo Nuestro Señor. Amén.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="rubric">El esposo entrega las arras a la esposa diciendo:</div>
            <p className="font-serif text-[18px] text-[#2D2926] bg-[#FDFBF7] p-4 border-l-3 border-[#D4AF37] rounded-sm">
              «<strong>{esposa}</strong>, recibe estas arras como prenda de la bendición de Dios y signo de los bienes que vamos a compartir.»
            </p>

            <div className="rubric pt-2">La esposa entrega las arras al esposo diciendo:</div>
            <p className="font-serif text-[18px] text-[#2D2926] bg-[#FDFBF7] p-4 border-l-3 border-[#D4AF37] rounded-sm">
              «<strong>{esposo}</strong>, recibe estas arras como prenda de la bendición de Dios y signo de los bienes que vamos a compartir.»
            </p>
          </div>
        </div>

        {/* 7. Bendición e Imposición del Lazo */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-cinzel text-lg font-bold text-[#800020]">
            Bendición e Imposición del Lazo
          </h3>
          <div className="rubric">Los padrinos colocan el lazo sobre los hombros de los esposos mientras el sacerdote dice:</div>
          <div className="bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3]">
            <p className="priest-voice text-[18px] leading-relaxed">
              <span className="text-[#800020] font-bold">Sacerdote:</span><br />
              Bendice, + Señor, este lazo, símbolo de la unión indisoluble que <strong>{esposo}</strong> y <strong>{esposa}</strong> han establecido desde ahora ante ti y con tu ayuda. Por Jesucristo Nuestro Señor.
            </p>
            <p className="assembly-response pl-4 pt-2">
              <span className="rubric font-sans">R.</span> Amén.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 16: ORACIÓN UNIVERSAL (ORACIÓN DE LOS FIELES)                      */}
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
            <span className="text-[#800020] font-bold">Sacerdote:</span> Queridos hermanos y hermanas, recordemos los dones especiales de gracia y amor con que Dios corona el amor mutuo de esta pareja, haciéndolo un signo del mismo amor divino. Confiémoslos al Señor.
          </p>

          <div className="space-y-3 pl-4 border-l-2 border-[#D9D1C3]">
            <div>
              <p>
                1. Por los esposos <strong>{esposa}</strong> y <strong>{esposo}</strong>, para que en ni un solo día de su matrimonio les falte el amor y la felicidad que hoy se van a prometer y para que nunca se borren de su memoria todos los detalles de este día que tanto significado tiene para los dos. Roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, óyenos.</p>
            </div>

            <div>
              <p>
                2. Por los esposos <strong>{esposa}</strong> y <strong>{esposo}</strong>, para que Dios les conceda salud y paz, trabajo y alegría. Roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, óyenos.</p>
            </div>

            <div>
              <p>
                3. Por los padres de los esposos, para que conserven la ilusión y paciencia con que han educado a sus hijos y encuentren al contemplar este nuevo matrimonio, el coronamiento de sus esfuerzos. Roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, óyenos.</p>
            </div>

            <div>
              <p>
                4. Por aquellos que ya no pueden acompañarnos, para que sean la luz que alumbre el nuevo camino que emprende hoy esta pareja, y que ahí donde están sientan la alegría y orgullo que sentimos nosotros al ser testigos de esta unión. Roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, óyenos.</p>
            </div>

            <div>
              <p>
                5. Para que Dios les haga padres responsables y sepan ser los primeros educadores de la fe en sus hijos. Roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, óyenos.</p>
            </div>

            <div>
              <p>
                6. Por todos los que nos hemos reunido aquí; que el Señor proteja nuestros hogares, aumente el amor entre nosotros y nos dé más esperanza y alegría. Roguemos al Señor.
              </p>
              <p className="assembly-response font-bold text-[#800020]">R. Te rogamos, óyenos.</p>
            </div>
          </div>

          <div className="bg-[#F9F7F2] p-5 rounded-sm border border-[#D9D1C3]">
            <p className="priest-voice text-[17px]">
              <span className="text-[#800020] font-bold">Sacerdote:</span><br />
              Señor, envía el Espíritu de tu amor sobre esta pareja, para que sean uno en mente y corazón. Concede a los que has bendecido y unido, que ninguna tristeza destruya su felicidad y que nadie los separe. Te lo pedimos por Jesucristo, nuestro Señor.
            </p>
            <p className="assembly-response pl-4 pt-2 font-bold">
              <span className="rubric font-sans">R.</span> Amén.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 17: LITURGIA EUCARÍSTICA — ORACIÓN SOBRE LAS OFRENDAS             */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D9D1C3] pb-3">
          <span className="h-[1px] w-8 bg-[#800020]"></span>
          <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
            Oración Sobre las Ofrendas
          </h2>
        </div>

        <div className="space-y-4 text-[17px] leading-relaxed">
          <div className="bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3] font-serif text-[18px]">
            <p>
              Recibe, Señor, el sacrificio que te ofrecemos<br />
              por esta unión sagrada;<br />
              y ya que eres su autor,<br />
              sé también su protector y su guía.<br />
              Por Jesucristo, nuestro Señor.
            </p>
          </div>
          <p className="assembly-response pl-4 font-bold">
            <span className="rubric font-sans">R.</span> Amén.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 18: PREFACIO DEL MATRIMONIO III                                    */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#800020]">
            Prefacio del Matrimonio III
          </h2>
          <p className="font-serif italic text-base text-[#555]">
            El Matrimonio, signo del amor divino
          </p>
        </div>

        <div className="space-y-4 text-[17px] leading-relaxed">
          <div className="space-y-2 font-serif text-base bg-[#FDFBF7] p-4 rounded-sm border border-[#D9D1C3]">
            <p><span className="text-[#800020] font-bold">V.</span> El Señor esté con ustedes.</p>
            <p className="pl-4"><span className="text-[#800020] font-bold">R.</span> Y con tu espíritu.</p>
            <p><span className="text-[#800020] font-bold">V.</span> Levantemos el corazón.</p>
            <p className="pl-4"><span className="text-[#800020] font-bold">R.</span> Lo tenemos levantado hacia el Señor.</p>
            <p><span className="text-[#800020] font-bold">V.</span> Demos gracias al Señor, nuestro Dios.</p>
            <p className="pl-4"><span className="text-[#800020] font-bold">R.</span> Es justo y necesario.</p>
          </div>

          <div className="bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3] text-[18px] leading-[1.8]">
            <p>
              En verdad es justo y necesario,<br />
              es nuestro deber y salvación<br />
              darte gracias siempre y en todo lugar,<br />
              Señor, Padre santo,<br />
              Dios todopoderoso y eterno.
            </p>
            <p className="pt-3">
              Porque al hombre, creado por tu bondad,<br />
              lo dignificaste tanto,<br />
              que has dejado la imagen de tu propio amor<br />
              en la unión del varón y de la mujer.<br />
              Y al que creaste por amor<br />
              y al amor llamas,<br />
              le concedes participar en tu amor eterno.
            </p>
            <p className="pt-3">
              Y así, el misterio del santo Matrimonio,<br />
              signo de tu caridad,<br />
              consagra el amor humano,<br />
              por Jesucristo, nuestro Señor.
            </p>
            <p className="pt-3">
              Por eso, con los ángeles y los santos,<br />
              cantamos sin cesar el himno de tu gloria:
            </p>
          </div>

          <div className="rubric bg-[#F5F2EB] p-3 text-center rounded-sm">
            Coro y Asamblea cantan el <strong>Santo</strong>.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 19-20: SOLEMNE BENDICIÓN NUPCIAL                                  */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Bendición Nupcial
          </h2>
        </div>

        <div className="space-y-4 text-[17px] leading-relaxed">
          <p className="priest-voice text-base">
            <span className="text-[#800020] font-bold">Introducción:</span><br />
            Pidamos a Dios que estos esposos que han venido al altar para unirse en Matrimonio, (por la participación del Cuerpo y la Sangre de Cristo) vivan siempre unidos por el amor.
          </p>

          <div className="rubric">El sacerdote extiende las manos sobre los esposos y proclama la Bendición:</div>

          <div className="bg-[#F9F7F2] p-8 rounded-sm border border-[#D9D1C3] text-[18px] leading-[1.8] space-y-4">
            <p>
              Padre santo, que hiciste al hombre a imagen tuya<br />
              y lo creaste varón y mujer para que,<br />
              unidos en la carne y en el espíritu,<br />
              fueran colaboradores de tu creación.
            </p>
            <p>
              Señor, tú que para revelarnos el designio de tu amor,<br />
              quisiste dejarnos en el amor de los esposos<br />
              una imagen de la alianza que hiciste con tu pueblo,<br />
              a fin de que, completado con el sacramento,<br />
              en la unión conyugal de tus fieles,<br />
              quedará patente el misterio nupcial de Cristo y de la Iglesia.
            </p>
            <p className="font-bold text-[#800020]">
              Extiende sobre estos hijos tuyos,<br />
              {esposo} y {esposa},<br />
              tu mano amorosa e infunde en sus corazones la fuerza del Espíritu Santo.
            </p>
            <p>
              Concédeles, Señor,<br />
              que, en la comunidad sacramental que hoy inician,<br />
              se comuniquen los dones de tu amor y,<br />
              siendo el uno para el otro signo de tu presencia,<br />
              sean un solo corazón y un solo espíritu.
            </p>
            <p>
              Concédeles también que sepan<br />
              conservar y proteger su nuevo hogar<br />
              [y formen a sus hijos según el Evangelio,<br />
              para que, así, puedan éstos algún día<br />
              incorporarse para siempre a tu familia celestial].
            </p>
            <p className="pt-2 border-t border-[#D9D1C3]">
              Colma de bendiciones a tu hija <strong>{esposa}</strong>,<br />
              para que pueda cumplir sus deberes<br />
              de esposa y [madre,]<br />
              dé calor a su hogar con un amor puro<br />
              y con su afabilidad lo adorne.
            </p>
            <p>
              Bendice también a tu hijo <strong>{esposo}</strong>,<br />
              para que cumpla dignamente su misión<br />
              de esposo fiel [y padre providente].
            </p>
            <p className="pt-2 border-t border-[#D9D1C3]">
              Concede, Padre santo, a estos hijos tuyos<br />
              que han unido sus vidas ante ti,<br />
              [y quieren ahora, por primera vez como esposos, acercarse a tu mesa]<br />
              participar algún día, alegremente,<br />
              del banquete celestial.
            </p>
            <p className="font-bold text-[#800020]">
              Por Jesucristo, nuestro Señor.
            </p>
          </div>

          <p className="assembly-response pl-4 text-lg font-bold">
            <span className="rubric font-sans">R.</span> Amén.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 21: ORACIÓN DESPUÉS DE LA COMUNIÓN                                 */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D9D1C3] pb-3">
          <span className="h-[1px] w-8 bg-[#800020]"></span>
          <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
            Oración después de la Comunión
          </h2>
        </div>

        <div className="space-y-4 text-[17px] leading-relaxed">
          <div className="bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3] text-[18px]">
            <p>
              Por este sacrificio de salvación,<br />
              protege, Dios nuestro, con tu providencia,<br />
              a la nueva familia que has instituido<br />
              y unifica en un mismo corazón<br />
              a los que uniste en una santa alianza<br />
              [y has alimentado con un mismo pan y un mismo cáliz].<br />
              Por Jesucristo, nuestro Señor.
            </p>
          </div>
          <p className="assembly-response pl-4 font-bold">
            <span className="rubric font-sans">R.</span> Amén.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 22: FLORES A LA VIRGEN MARÍA                                       */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-[#D9D1C3] pb-3">
          <span className="h-[1px] w-8 bg-[#800020]"></span>
          <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
            Flores a la Virgen
          </h2>
        </div>

        <div className="bg-[#FDFBF7] p-6 rounded-sm border-l-4 border-[#800020] space-y-3">
          <p className="rubric text-base">
            Los nuevos esposos se dirigen ante la imagen de la Santísima Virgen María para ofrecer su ramo de flores y consagrar su hogar.
          </p>
          <div className="flex items-center justify-between text-sm font-sans text-[#800020]">
            <span className="font-bold uppercase tracking-wider">Coro: Puede cantar un canto apropiado</span>
            <Music size={18} />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 23: BENDICIÓN FINAL SOLEMNE                                        */}
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

          <p className="rubric pt-2">
            Inclinen la cabeza para recibir la bendición:
          </p>

          <div className="bg-[#F9F7F2] p-6 rounded-sm border border-[#D9D1C3] space-y-4 text-[18px]">
            <div>
              <p className="priest-voice">
                Dios, Padre eterno, los conserve unidos en el amor, para que la paz de Cristo habite en ustedes y permanezca en su hogar.
              </p>
              <p className="assembly-response pl-4 font-bold text-[#800020]">R. Amén.</p>
            </div>

            <div>
              <p className="priest-voice">
                Que encuentren en los hijos una bendición, en los amigos un consuelo y en el trato con todos, una paz verdadera.
              </p>
              <p className="assembly-response pl-4 font-bold text-[#800020]">R. Amén.</p>
            </div>

            <div>
              <p className="priest-voice">
                Que sean testigos del amor de Dios en el mundo, para que los pobres y afligidos, habiendo encontrado en ustedes ayuda y consuelo, los reciban con gratitud algún día en la casa eterna del Padre.
              </p>
              <p className="assembly-response pl-4 font-bold text-[#800020]">R. Amén.</p>
            </div>

            <div className="pt-3 border-t border-[#D9D1C3]">
              <p className="priest-voice font-bold">
                Y a todos ustedes, que están presentes, los bendiga Dios todopoderoso, Padre, Hijo +, y Espíritu Santo.
              </p>
              <p className="assembly-response pl-4 font-bold text-[#800020] text-xl">
                R. Amén.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
