import React, { useState } from 'react';
import { PrimeraComunionParams } from '../../types/liturgia';
import { Printer, Wine, Sun, Heart } from 'lucide-react';

interface PrimeraComunionRitualViewProps {
  data: PrimeraComunionParams;
}

export const PrimeraComunionRitualView: React.FC<PrimeraComunionRitualViewProps> = ({ data }) => {
  const [langMode, setLangMode] = useState<'bilingue' | 'espanol' | 'ingles'>(data.idiomaModo || 'bilingue');

  const handlePrint = () => {
    window.print();
  };

  const parroquia = data.nombreParroquia || 'St. Joseph Catholic Church';
  const direccion = data.parroquiaDireccion || '620 W. Benson St.';
  const ciudad = data.ciudadLugar || 'La Pryor, TX';
  const telefono = data.parroquiaTelefono || '(830) 365-4107';
  const pastor = data.nombreCelebrante || 'Rev. Alan Sanchez';
  const diaconos = data.nombreDiaconos || 'Rev. Mr. Gene Corrigan, Rev. Mr. Juan Gallegos';
  const cre = data.nombreCRE || 'Yolanda Garcia (CRE)';
  const catequistas = data.nombreCatequistas || 'Carmen Lopez (RE), Richard Arredondo (RE), Martha De La Rosa (RE), Jenifer Vera (RE), Jacinto Quijano (RE), Maria Louisa Del Toro (RE)';
  const coro = data.nombreCoro || 'CCD Students / Estudiantes del Catecismo';
  const lectores = data.nombreLectores || 'CCD Students / Estudiantes del Catecismo';
  const monaguillos = data.nombreMonaguillos || 'CCD Students / Estudiantes del Catecismo';
  const hospitalidad = data.nombreHospitalidad || 'Knights of Columbus / Caballeros de Colón';
  const generacion = data.generacion || '2023-2025';
  const fecha = data.fecha || '2025';

  const showES = langMode === 'bilingue' || langMode === 'espanol';
  const showEN = langMode === 'bilingue' || langMode === 'ingles';

  return (
    <div className="space-y-12 font-serif text-[#2D2926]">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F0EDE6] p-4 rounded-md border border-[#D9D1C3] no-print">
        <div className="flex items-center gap-3">
          <Wine className="text-[#800020]" size={22} />
          <div>
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#800020] block">
              Misa de Primera Comunión • First Holy Communion Mass (52 Páginas Integrales)
            </span>
            <span className="text-xs text-[#666] font-sans">
              Texto Canónico Íntegro Palabra por Palabra (Inglés y Español) sin omisiones
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-white border border-[#D9D1C3] rounded-sm p-0.5 text-xs font-sans">
            <button
              onClick={() => setLangMode('bilingue')}
              className={`px-3 py-1.5 rounded-xs transition cursor-pointer font-semibold ${
                langMode === 'bilingue' ? 'bg-[#800020] text-white' : 'text-[#444] hover:bg-gray-100'
              }`}
            >
              Bilingüe (2 Col)
            </button>
            <button
              onClick={() => setLangMode('espanol')}
              className={`px-3 py-1.5 rounded-xs transition cursor-pointer font-semibold ${
                langMode === 'espanol' ? 'bg-[#800020] text-white' : 'text-[#444] hover:bg-gray-100'
              }`}
            >
              Español
            </button>
            <button
              onClick={() => setLangMode('ingles')}
              className={`px-3 py-1.5 rounded-xs transition cursor-pointer font-semibold ${
                langMode === 'ingles' ? 'bg-[#800020] text-white' : 'text-[#444] hover:bg-gray-100'
              }`}
            >
              English
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#800020] text-white px-4 py-2 rounded-sm text-xs font-sans font-semibold tracking-wider uppercase hover:bg-[#600018] transition shadow-xs cursor-pointer"
          >
            <Printer size={15} />
            <span>Imprimir Guion 1ª Comunión (PDF)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 1: PORTADA                                                         */}
      {/* ========================================================================= */}
      <div className="border border-[#D9D1C3] bg-[#FDFBF7] p-8 sm:p-14 text-center rounded-sm shadow-xs space-y-6">
        <div className="space-y-2">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[#2D2926] uppercase">
            {parroquia}
          </h2>
          <p className="font-sans text-xs uppercase tracking-widest text-[#666]">
            {direccion} • {ciudad} • {telefono}
          </p>
          <div className="py-4">
            <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#800020] tracking-wider uppercase">
              FIRST HOLY COMMUNION MASS
            </h1>
            <p className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020] tracking-wider uppercase mt-1">
              MISA DE PRIMERA COMUNIÓN
            </p>
            <p className="font-sans text-sm tracking-widest text-[#444] font-bold mt-2">
              GENERACIÓN / CLASS {generacion} • {fecha}
            </p>
          </div>
        </div>

        {/* Emblema Custodia */}
        <div className="flex justify-center py-4">
          <div className="p-4 rounded-full bg-[#FAF7F0] border-2 border-[#D4AF37] shadow-inner">
            <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="40" r="32" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="50" cy="40" r="22" stroke="#800020" strokeWidth="2" fill="#FAF7F0" />
              <circle cx="50" cy="40" r="14" fill="#FDFBF7" stroke="#D4AF37" strokeWidth="1.5" />
              <path d="M50 33 L50 47 M43 40 L57 40" stroke="#800020" strokeWidth="1.5" />
              <path d="M50 4 L50 14 M45 8 L55 8" stroke="#D4AF37" strokeWidth="2" />
              <rect x="47" y="62" width="6" height="35" fill="#D4AF37" />
              <path d="M30 105 Q50 95 70 105 L65 110 L35 110 Z" fill="#D4AF37" stroke="#800020" strokeWidth="1" />
            </svg>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 border-t border-b border-[#D9D1C3] space-y-1">
          <p className="font-serif font-bold text-base text-[#800020] uppercase tracking-wider">
            BUILD A STRONGER PERSONAL RELATIONSHIP WITH JESUS CHRIST.
          </p>
          <p className="font-serif italic text-sm text-[#555]">
            «Construir una relación personal más fuerte con Jesucristo.»
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINAS 2–3: DIRECTORIO PARROQUIAL (EN / ES)                              */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-8">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020] uppercase tracking-wider">
            Directorio Parroquial y Catequético • Parish Leadership
          </h2>
          <p className="font-sans text-xs text-[#666] tracking-widest uppercase mt-1">
            {parroquia} • {direccion} • {ciudad} • {telefono}
          </p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-8 text-center text-sm leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-4">
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-[#800020] border-b border-[#D9D1C3] pb-2">
                FIRST HOLY COMMUNION MASS {fecha} (English)
              </h3>
              <div className="space-y-3 font-serif">
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Pastor</span>
                  <p className="font-bold text-[#2D2926] text-base">{pastor}</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Deacons</span>
                  <p className="text-[#444]">{diaconos}</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Religious Education for Children</span>
                  <p className="font-bold text-xs text-[#800020]">{cre}</p>
                  <p className="text-xs text-[#555] mt-1">{catequistas}</p>
                </div>
                <div className="pt-2 border-t border-[#E5DFD5] space-y-1 text-xs text-[#555]">
                  <p><strong>Choir:</strong> {coro}</p>
                  <p><strong>Lectors:</strong> {lectores}</p>
                  <p><strong>Altar Servers:</strong> {monaguillos}</p>
                  <p><strong>Hospitality:</strong> {hospitalidad}</p>
                  <p><strong>Class:</strong> {generacion}</p>
                </div>
              </div>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-4">
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-[#800020] border-b border-[#D9D1C3] pb-2">
                MISA DE PRIMERA COMUNIÓN {fecha} (Español)
              </h3>
              <div className="space-y-3 font-serif">
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Párroco</span>
                  <p className="font-bold text-[#2D2926] text-base">{pastor}</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Diáconos</span>
                  <p className="text-[#444]">{diaconos}</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Educación Religiosa para Niños</span>
                  <p className="font-bold text-xs text-[#800020]">{cre}</p>
                  <p className="text-xs text-[#555] mt-1">{catequistas}</p>
                </div>
                <div className="pt-2 border-t border-[#E5DFD5] space-y-1 text-xs text-[#555]">
                  <p><strong>Coro:</strong> {coro}</p>
                  <p><strong>Lectores:</strong> {lectores}</p>
                  <p><strong>Monaguillos:</strong> {monaguillos}</p>
                  <p><strong>Hospitalidad:</strong> {hospitalidad}</p>
                  <p><strong>Generación:</strong> {generacion}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 4–5: EL ORDEN DE LA PROCESIÓN                                     */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020] uppercase tracking-wider">
            El Orden de la Procesión • The Order of the Procession
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <h3 className="font-sans font-bold text-xs uppercase text-[#800020] tracking-wider mb-2">THE ORDER OF THE PROCESSION (English)</h3>
              <ol className="list-decimal pl-6 space-y-1.5 text-sm">
                <li><strong>First:</strong> THURIBLE’S ALTAR SERVER</li>
                <li><strong>Second:</strong> PROCESSIONAL CROSS’ ALTAR SERVER</li>
                <li><strong>Third:</strong> PROCESSIONAL TORCHES’ ALTAR SERVER</li>
                <li><strong>Fourth:</strong> THE BOOK OF THE GOSPELS BY A DEACON</li>
                <li><strong>Fifth:</strong> CHILDREN BY PAIRS OF TWO</li>
                <li><strong>Sixth:</strong> DEACON</li>
                <li><strong>Seventh:</strong> MASTER CEREMONIES</li>
                <li><strong>Eighth:</strong> PRIEST ({pastor})</li>
              </ol>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <h3 className="font-sans font-bold text-xs uppercase text-[#800020] tracking-wider mb-2">EL ORDEN DE LA PROCESIÓN (Español)</h3>
              <ol className="list-decimal pl-6 space-y-1.5 text-sm">
                <li><strong>Primero:</strong> MONAGUILLO DEL TURIFERARIO</li>
                <li><strong>Segundo:</strong> MONAGUILLO DE LA CRUZ PROCESIONAL</li>
                <li><strong>Tercero:</strong> MONAGUILLOS DE LOS CIRIALES</li>
                <li><strong>Cuarto:</strong> DIÁCONO CON EL LIBRO DE LOS EVANGELIOS</li>
                <li><strong>Quinto:</strong> LOS NIÑOS POR PAREJAS DE DOS</li>
                <li><strong>Sexto:</strong> DIÁCONO</li>
                <li><strong>Séptimo:</strong> CEREMONIERO</li>
                <li><strong>Octavo:</strong> SACERDOTE ({pastor})</li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 6–7: PALABRAS DE BIENVENIDA (MONITOR)                             */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D9D1C3] pb-3">
          <span className="h-[1px] w-8 bg-[#800020]"></span>
          <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
            The Order for the Conferral of the First Eucharist within Mass • Palabras de Bienvenida
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#800020] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">Monitor: WORDS OF WELCOME (English)</span>
              <p>
                We have received a tradition that goes back to the Apostles, two thousand years ago, according to which the Lord Jesus, before giving his life for us, gathered with them to celebrate the Passover, took bread, gave thanks to God, his Father and our Father, blessed it and gave it to them, saying: "Take and eat of it, all of you, because this is my body." When supper was over, he took the cup full of wine, again giving thanks to God, blessed it and gave it to his disciples, saying, "Take and drink of it, all of you, this is the cup of my blood, which will be shed for you and for all for the forgiveness of sins." And then he said to them, "Do this in remembrance of me."
              </p>
              <p>
                On this day, following the Lord's invitation, we will fulfill His command. We are going to celebrate the Eucharist in which the boys and girls of our community, for the first time, will receive Christ in the sacrament of his Body and Blood.
              </p>
              <p>
                To foster an atmosphere of prayer and listening, and out of respect for the place and time in which we find ourselves, from now on, all cell phones must be turned off.
              </p>
              <p>
                I invite you to stand up. We will receive the priest and his ministers, singing the entrance hymn.
              </p>
              <p className="font-sans text-xs font-bold text-[#800020] uppercase pt-2">
                CHOIR SINGS: THE ENTRANCE SONG
              </p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#800020] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">Monitor: PALABRAS DE BIENVENIDA (Español)</span>
              <p>
                Nosotros hemos recibido una tradición que viene desde los Apóstoles, hace dos mil años, según la cual el Señor Jesús, antes de dar su vida por nosotros, reunido con ellos para celebrar la Pascua, tomó pan, dio gracias a Dios, Padre suyo y Padre nuestro, lo bendijo y se lo dio diciendo: «Tomen y coman todos de Él, porque esto es mi cuerpo». Acabada la cena, tomó el cáliz lleno de vino, dando de nuevo gracias a Dios, lo bendijo y lo dio a sus discípulos diciendo: «Tomen y beban todos de él, éste es el cáliz de mi sangre, que será derramada por ustedes y por todos para el perdón de los pecados». Y les dijo después: «Hagan esto en memoria mía».
              </p>
              <p>
                Este día, siguiendo la invitación del Señor, vamos a cumplir su mandato. Vamos a celebrar la Eucaristía en la que los niños y niñas de nuestra Comunidad, por primera vez, recibirán a Cristo en el sacramento de su Cuerpo y de su Sangre.
              </p>
              <p>
                Para favorecer el clima de oración y de escucha y por respeto al lugar y al momento en el que nos encontramos, a partir de ahora, todos los teléfonos celulares deberán estar apagados.
              </p>
              <p>
                Los invito a ponernos de pie. Vamos recibir al sacerdote y a sus ministros, entonando el canto de entrada.
              </p>
              <p className="font-sans text-xs font-bold text-[#800020] uppercase pt-2">
                CORO CANTA: EL CANTO DE ENTRADA
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 8–9: RITOS INICIALES                                              */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020] uppercase tracking-wider">
            Ritos Iniciales • The Introductory Rites
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="space-y-3 font-serif">
              <p className="text-xs text-[#666] italic">
                When the people are gathered, the Priest approaches the altar with the ministers while the Entrance Chant is sung. When he has arrived at the altar, after making a profound bow with the ministers, the Priest venerates the altar with a kiss and, if appropriate, incenses the cross and the altar. Then, with the ministers, he goes to the chair.
              </p>
              <p className="text-xs text-[#666] italic">
                When the Entrance Chant is concluded, the Priest and the faithful, standing, sign themselves with the Sign of the Cross, while the Priest, facing the people, says:
              </p>
              <p className="priest-voice"><strong className="text-[#800020]">Priest:</strong> In the name of the Father, and of the Son, and of the Holy Spirit.</p>
              <p className="assembly-response pl-4">The people reply: <strong>Amen.</strong></p>
              <p className="text-xs text-[#666] italic">Then the Priest, extending his hands, greets the people, saying:</p>
              <p className="priest-voice"><strong className="text-[#800020]">Priest:</strong> The grace of our Lord Jesus Christ, and the love of God, and the communion of the Holy Spirit be with you all.</p>
              <p className="assembly-response pl-4">The people reply: <strong>And with your spirit.</strong></p>
              <p className="text-xs text-[#666] italic">
                (In this first greeting a Bishop, instead of The Lord be with you, says: <em>Peace be with you.</em>)
              </p>
            </div>
          )}

          {showES && (
            <div className="space-y-3 font-serif">
              <p className="text-xs text-[#666] italic">
                Reunido el pueblo, el sacerdote con los ministros va al altar mientras se entona el canto de entrada. Cuando llega al altar, el sacerdote con los ministros hace la debida reverencia, besa el altar y, si se juzga oportuno, lo inciensa. Después se dirige con los ministros a la sede.
              </p>
              <p className="text-xs text-[#666] italic">
                Terminado el canto de entrada, el sacerdote y los fieles, de pie, se santiguan mientras el sacerdote, de cara al pueblo, dice:
              </p>
              <p className="priest-voice"><strong className="text-[#800020]">Sacerdote:</strong> En el nombre del Padre, y del Hijo, y del Espíritu Santo.</p>
              <p className="assembly-response pl-4">El pueblo responde: <strong>Amén.</strong></p>
              <p className="text-xs text-[#666] italic">El sacerdote, extendiendo las manos, saluda al pueblo con una de las fórmulas siguientes:</p>
              <p className="priest-voice"><strong className="text-[#800020]">Sacerdote:</strong> El Señor esté con ustedes.</p>
              <p className="text-xs text-[#555] italic">O bien:</p>
              <p className="priest-voice"><strong className="text-[#800020]">Sacerdote:</strong> La gracia de nuestro Señor Jesucristo, el amor del Padre y la comunión del Espíritu Santo esté con todos ustedes.</p>
              <p className="text-xs text-[#555] italic">O bien:</p>
              <p className="priest-voice"><strong className="text-[#800020]">Sacerdote:</strong> La gracia y la paz de Dios, nuestro Padre, y de Jesucristo, el Señor, esté con todos ustedes.</p>
              <p className="assembly-response pl-4">El pueblo responde: <strong>Y con tu espíritu.</strong></p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 10–11: ACTO PENITENCIAL                                           */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020] uppercase tracking-wider">
            Acto Penitencial • Penitential Act
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">PENITENTIAL ACT (English)</span>
              <p className="text-xs text-[#666] italic">Then follows the Penitential Act, to which the Priest invites the faithful, saying:</p>
              <p className="priest-voice italic">
                “Let us now ask forgiveness of God the Father for our sins and for the sins of the whole world. There are many things in our lives that are not as they should be. We often care only about ourselves and don't live with the love Jesus taught us. Now we recognize him before him, so that he may give us his strength and grace.”
              </p>
              <p className="text-xs text-[#555] italic">Or:</p>
              <p className="priest-voice">
                “Brethren (brothers and sisters), let us acknowledge our sins, and so prepare ourselves to celebrate the sacred mysteries.”
              </p>
              <p className="text-xs text-[#666] italic">A brief pause for silence follows. Then all recite together the formula of general confession:</p>
              <div className="bg-white p-4 rounded-sm border border-[#E5DFD5] space-y-2 text-sm">
                <p>
                  <strong>I confess to almighty God and to you, my brothers and sisters, that I have greatly sinned, in my thoughts and in my words, in what I have done and in what I have failed to do,</strong>
                </p>
                <p className="text-xs italic text-[#800020]">
                  And, striking their breast, they say:
                </p>
                <p>
                  <strong>through my fault, through my fault, through my most grievous fault;</strong>
                </p>
                <p className="text-xs italic text-[#800020]">
                  Then they continue:
                </p>
                <p>
                  <strong>therefore I ask blessed Mary ever-Virgin, all the Angels and Saints, and you, my brothers and sisters, to pray for me to the Lord our God.</strong>
                </p>
              </div>
              <p className="text-xs text-[#666] italic">The absolution by the Priest follows:</p>
              <p className="priest-voice"><strong className="text-[#800020]">Priest:</strong> May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life. <strong>R. Amen.</strong></p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">ACTO PENITENCIAL (Español)</span>
              <p className="text-xs text-[#666] italic">A continuación, se hace el acto penitencial, y el sacerdote invita a los fieles al arrepentimiento diciendo:</p>
              <p className="priest-voice italic">
                “Pidamos ahora perdón a Dios Padre por nuestros pecados y por los pecados del mundo entero. En nuestra vida hay muchas cosas que no son como deberían ser. A menudo nos preocupamos sólo de nosotros mismos y no vivimos con el amor que Jesús nos enseñó. Ahora lo reconocemos delante de Él, para que nos dé su fuerza y su gracia.”
              </p>
              <p className="text-xs text-[#555] italic">O bien:</p>
              <p className="priest-voice">
                “Hermanos: para celebrar dignamente estos sagrados misterios reconozcamos nuestros pecados.”
              </p>
              <p className="text-xs text-[#666] italic">Se hace una breve pausa en silencio. Después, hacen todos en común la confesión de sus pecados:</p>
              <div className="bg-white p-4 rounded-sm border border-[#E5DFD5] space-y-2 text-sm">
                <p>
                  <strong>Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho de pensamiento, palabra, obra y omisión:</strong>
                </p>
                <p className="text-xs italic text-[#800020]">
                  Golpeándose el pecho, dicen:
                </p>
                <p>
                  <strong>por mi culpa, por mi culpa, por mi gran culpa.</strong>
                </p>
                <p className="text-xs italic text-[#800020]">
                  Luego prosiguen:
                </p>
                <p>
                  <strong>Por eso ruego a santa María, siempre Virgen, a los ángeles, a los santos y a ustedes, hermanos, que intercedan por mí ante Dios, nuestro Señor.</strong>
                </p>
              </div>
              <p className="text-xs text-[#666] italic">El sacerdote concluye con la siguiente plegaria:</p>
              <p className="priest-voice"><strong className="text-[#800020]">Sacerdote:</strong> Dios todopoderoso tenga misericordia de nosotros, perdone nuestros pecados y nos lleve a la vida eterna. <strong>El pueblo responde: Amén.</strong></p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 12–13: KYRIE Y GLORIA COMPLETO                                    */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020] uppercase tracking-wider">
            Señor, Ten Piedad y Gloria • Lord, Have Mercy & Glory
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="space-y-3 font-serif bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3]">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">CHOIR SINGS: LORD, HAVE MERCY AND GLORY</span>
              <div className="text-xs space-y-1 border-b border-[#D9D1C3] pb-2">
                <p>V. Lord, have mercy. <strong className="text-[#800020]">R. Lord, have mercy.</strong></p>
                <p>V. Christ, have mercy. <strong className="text-[#800020]">R. Christ, have mercy.</strong></p>
                <p>V. Lord, have mercy. <strong className="text-[#800020]">R. Lord, have mercy.</strong></p>
              </div>
              <div className="text-xs space-y-1.5 pt-1">
                <p className="font-bold text-[#800020]">Glory to God in the highest, and on earth peace to people of good will.</p>
                <p>We praise you, we bless you, we adore you, we glorify you, we give you thanks for your great glory, Lord God, heavenly King, O God, almighty Father.</p>
                <p>Lord Jesus Christ, Only Begotten Son, Lord God, Lamb of God, Son of the Father, you take away the sins of the world, have mercy on us; you take away the sins of the world, receive our prayer; you are seated at the right hand of the Father, have mercy on us.</p>
                <p>For you alone are the Holy One, you alone are the Lord, you alone are the Most High, Jesus Christ, with the Holy Spirit, in the glory of God the Father. <strong>Amen.</strong></p>
              </div>
            </div>
          )}

          {showES && (
            <div className="space-y-3 font-serif bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3]">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">CORO CANTA: EL SEÑOR, TEN PIEDAD Y GLORIA</span>
              <div className="text-xs space-y-1 border-b border-[#D9D1C3] pb-2">
                <p>V/. Señor, ten piedad. <strong className="text-[#800020]">R/. Señor, ten piedad.</strong></p>
                <p>V/. Cristo, ten piedad. <strong className="text-[#800020]">R/. Cristo, ten piedad.</strong></p>
                <p>V/. Señor, ten piedad. <strong className="text-[#800020]">R/. Señor, ten piedad.</strong></p>
              </div>
              <div className="text-xs space-y-1.5 pt-1">
                <p className="font-bold text-[#800020]">Gloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor.</p>
                <p>Por tu inmensa gloria te alabamos, te bendecimos, te adoramos, te glorificamos, te damos gracias, Señor Dios, Rey celestial, Dios Padre todopoderoso. Señor, Hijo único, Jesucristo. Señor Dios, Cordero de Dios, Hijo del Padre; tú que quitas el pecado del mundo, ten piedad de nosotros; tú que quitas el pecado del mundo, atiende nuestra súplica; tú que estás sentado a la derecha del Padre, ten piedad de nosotros;</p>
                <p>porque sólo tú eres Santo, sólo tú Señor, sólo tú Altísimo, Jesucristo, con el Espíritu Santo, en la Gloria de Dios Padre. <strong>Amén.</strong></p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 14–15: ORACIÓN COLECTA                                            */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020] uppercase tracking-wider">
            Oración Colecta • Collect
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">COLLECT (English)</span>
              <p className="text-xs text-[#666] italic">Altar Servers: Present the Roman Missal to the Priest. When this hymn is concluded, the celebrant, with hands joined, says:</p>
              <p className="priest-voice"><strong className="text-[#800020]">Priest:</strong> Let us pray.</p>
              <p className="text-xs text-[#666] italic">And all pray in silence for a while. Then the Priest, with hands extended, says:</p>
              <p className="priest-voice">
                “Almighty and eternal God brings the Paschal Sacrament to its fullness in us, so that those whom you deigned to renew by Holy Baptism may make it possible, with the help of your protection, to abound in good fruits and to attain the joys of eternal life. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God forever and ever.”
              </p>
              <p className="assembly-response pl-4">The people acclaim: <strong>Amen.</strong></p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">ORACIÓN COLECTA (Español)</span>
              <p className="text-xs text-[#666] italic">Monaguillos: Presenta el Misal Romano al sacerdote. El rito de entrada concluye con la oración colecta.</p>
              <p className="priest-voice"><strong className="text-[#800020]">Sacerdote:</strong> Oremos.</p>
              <p className="text-xs text-[#666] italic">Y todos oran en silencio durante unos momentos. Después, con las manos extendidas, dice:</p>
              <p className="priest-voice">
                “Dios todopoderoso y eterno, lleva a su plenitud en nosotros el sacramento pascual, para que, a quienes te dignaste renovar por el santo Bautismo, les hagas posible, con el auxilio de tu protección, abundar en frutos buenos, y alcanzar los gozos de la vida eterna. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos.”
              </p>
              <p className="assembly-response pl-4">El pueblo responde: <strong>Amén.</strong></p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 16–25: LITURGIA DE LA PALABRA                                     */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-8">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020] uppercase tracking-wider">
            Liturgia de la Palabra • The Liturgy of the Word
          </h2>
          <p className="text-xs text-[#666] italic mt-1">Lectors: Approach to the ambo to proclaim the Word of God / Lectores: Acérquense al ambón para proclamar la Palabra de Dios</p>
        </div>

        {/* 1ª Lectura */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-base text-[#800020]">
            FIRST READING: Acts 2: 42-47 (English) • PRIMERA LECTURA: Deuteronomio 8: 2-3, 14-16 (Español)
          </h3>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif">
                <span className="font-sans font-bold text-xs text-[#800020] uppercase block">A reading from the Acts of the Apostles (Acts 2: 42-47):</span>
                <p>
                  The brothers and sisters devoted themselves to the teaching of the Apostles and to the communal life, to the breaking of the bread and to the prayers. Awe came upon everyone, and many wonders and signs were done through the Apostles. All who believed were together and had all things in common; they would sell their property and possessions and divide them among all according to each one’s need. Every day they devoted themselves to meeting together in the temple area and to breaking bread in their homes. They ate their meals with exultation and sincerity of heart, praising God and enjoying favor with all the people. And every day the Lord added to their number those who were being saved.
                </p>
                <p className="font-bold text-xs text-[#800020] pt-2">The Word of God. <span className="text-black">R. Thanks be to God.</span></p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif">
                <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Lectura del libro del Deuteronomio (Deuteronomio 8: 2-3, 14-16):</span>
                <p>
                  En aquel tiempo, habló Moisés al pueblo y le dijo: "Recuerda el camino que el Señor, tu Dios, te ha hecho recorrer estos cuarenta años por el desierto, para afligirte, para ponerte a prueba y conocer si ibas a guardar sus mandamientos o no. Él te afligió, haciéndote pasar hambre y después te alimentó con el maná, que ni tú ni tus padres conocían, para enseñarte que no solo de pan vive el hombre, sino también de toda palabra que sale de la boca de Dios. No sea que te olvides del Señor, tu Dios que te sacó de Egipto y de la esclavitud; que te hizo recorrer aquel desierto inmenso y terrible, lleno de serpientes y alacranes; que en una tierra árida hizo brotar para ti agua de la roca más dura y que te alimentó en el desierto con un maná que no conocían tus padres."
                </p>
                <p className="font-bold text-xs text-[#800020] pt-2">PALABRA DE DIOS. <span className="text-black">R. Te alabamos, Señor.</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Salmo Responsorial */}
        <div className="space-y-3 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-serif font-bold text-base text-[#800020]">
            RESPONSORIAL PSALM: Ps 78 (77) (English) • SALMO RESPONSORIAL: Salmo 115 (Español)
          </h3>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif text-sm">
                <p className="font-sans text-xs font-bold text-[#800020]">CHOIR SINGS THE RESPONSORIAL PSALM (Ps 78)</p>
                <p className="font-bold text-[#800020]">R. The Lord gave them bread from heaven.</p>
                <p>What we have heard and know,<br />and what our fathers have declared to us,<br />We will not hide from their sons;<br />that they should put their hope in God,<br />And not forget the deeds of God.</p>
                <p className="font-bold text-[#800020]">R. The Lord gave them bread from heaven.</p>
                <p>Yet he commanded the skies above;<br />the doors of heaven he opened.<br />He rained manna upon them for food;<br />and gave them heavenly bread.</p>
                <p className="font-bold text-[#800020]">R. The Lord gave them bread from heaven.</p>
                <p>Man ate the bread of angels,<br />food he sent them in abundance.<br />And he brought them to his holy land,<br />to the mountains his right hand had won.</p>
                <p className="font-bold text-[#800020]">R. The Lord gave them bread from heaven.</p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif text-sm">
                <p className="font-sans text-xs font-bold text-[#800020]">CORO CANTA EL SALMO RESPONSORIAL (Salmo 115)</p>
                <p className="font-bold text-[#800020]">R. Levantaré Señor, el cáliz de la salvación.</p>
                <p>¿Cómo le pagaré al Señor<br />todo el bien que me ha hecho?<br />Levantaré el cáliz de la salvación<br />e invocaré el nombre del Señor.</p>
                <p className="font-bold text-[#800020]">R. Levantaré Señor, el cáliz de la salvación.</p>
                <p>A los ojos del Señor es muy penoso<br />que mueran sus amigos.<br />De la muerte, Señor, me has librado,<br />a mí, tu esclavo e hijo de tu esclava.</p>
                <p className="font-bold text-[#800020]">R. Levantaré Señor, el cáliz de la salvación.</p>
                <p>Te ofreceré con gratitud un sacrificio<br />e invocaré tu nombre.<br />Cumpliré mis promesas<br />al Señor ante todo su pueblo.</p>
                <p className="font-bold text-[#800020]">R. Levantaré Señor, el cáliz de la salvación.</p>
              </div>
            )}
          </div>
        </div>

        {/* 2ª Lectura */}
        <div className="space-y-3 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-serif font-bold text-base text-[#800020]">
            SECOND READING: Hebrews 9: 11-15 (English & Español)
          </h3>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif">
                <p className="text-xs text-[#666] italic">Altar Servers: Thurible: Prepare the incense and be ready for the alleluia. Processional torches: light the candles.</p>
                <span className="font-sans font-bold text-xs text-[#800020] uppercase block">A reading from the Letter to the Hebrews (Hebrews 9:11-15):</span>
                <p>
                  Brothers and sisters: When Christ came as high priest of the good things that have come to be, passing through the greater and more perfect tabernacle not made by hands, that is, not belonging to this creation, he entered once for all into the sanctuary, not with the blood of goats and calves, but with his own blood, thus obtaining eternal redemption. For if the blood of goats and bulls and the sprinkling of a heifer's ashes can sanctify those who are defiled so that their flesh is cleansed, how much more will the blood of Christ, who through the eternal Spirit offered himself unblemished to God, cleanse our conscience from dead works to worship the living God. For this reason, he is mediator of a new covenant: since a death has taken place for deliverance from transgressions under the first covenant, those who are called may receive the promised eternal inheritance.
                </p>
                <p className="font-bold text-xs text-[#800020] pt-2">The Word of God. <span className="text-black">R. Thanks be to God.</span></p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif">
                <p className="text-xs text-[#666] italic">Monaguillos: Turiferario: Prepare el incienso y alístese para el aleluya. Ciriales: encienda las velas.</p>
                <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Lectura de la carta a los hebreos (Hebreos 9:11-15):</span>
                <p>
                  Hermanos: Cuando Cristo se presentó como Sumo Sacerdote que nos obtiene los bienes definitivos, penetró una sola vez y para siempre en el "lugar Santísimo", a través de una tienda, que no estaba hecha por mano de hombres, ni pertenecía a esta creación. No llevó consigo sangre de animales, sino su propia sangre, con la cual nos obtuvo una redención eterna. Porque si la sangre de los machos cabríos y de los becerros y las cenizas de una ternera, cuando se esparcían sobre los impuros, eran capaces de conferir a los israelitas una pureza legal, meramente exterior, ¡Cuánto más la sangre de Cristo purificará nuestra conciencia de todo pecado, a fin de que demos culto al Dios vivo, ya que a impulsos del Espíritu Santo, se ofreció a sí mismo como sacrificio inmaculado a Dios, y así podrá purificar nuestra conciencia de las obras que conducen a la muerte, para servir al Dios vivo! Por eso, Cristo es el mediador de una alianza nueva. Con su muerte hizo que fueran perdonados los delitos cometidos durante la antigua alianza, para que los llamados por Dios pudieran recibir la herencia eterna que él les había prometido.
                </p>
                <p className="font-bold text-xs text-[#800020] pt-2">Palabra de Dios. <span className="text-black">R. Te alabamos, Señor.</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Aclamación antes del Evangelio */}
        <div className="space-y-3 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-serif font-bold text-base text-[#800020]">
            GOSPEL ACCLAMATION • ACLAMACIÓN DEL EVANGELIO
          </h3>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif text-center">
                <p className="font-sans text-xs font-bold text-[#800020]">CHOIR SINGS THE GOSPEL ACCLAMATION</p>
                <p className="font-bold text-[#800020] text-lg">Alleluia, Alleluia, Alleluia</p>
                <p className="italic">"I am the living bread who has come down from heaven; Whoever eats of this bread he will live forever."</p>
                <p className="font-bold text-[#800020] text-lg">Alleluia, Alleluia, Alleluia</p>
                <p className="text-xs text-[#666] italic pt-2">Altar Servers: Thurible: Brings the boat and thurible to the priest. Processional torches: go before and facing the altar.</p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif text-center">
                <p className="font-sans text-xs font-bold text-[#800020]">CORO CANTA LA ACLAMACIÓN DEL EVANGELIO</p>
                <p className="font-bold text-[#800020] text-lg">Aleluya, Aleluya, Aleluya</p>
                <p className="italic">“Yo soy el pan vivo que ha bajado del cielo; el que coma de este pan vivirá para siempre."</p>
                <p className="font-bold text-[#800020] text-lg">Aleluya, Aleluya, Aleluya</p>
                <p className="text-xs text-[#666] italic pt-2">Monaguillos: Turiferario: Trae la naveta y el turiferario al sacerdote. Ciriales: se dirigen hacia el centro y mirando de frente hacia el altar.</p>
              </div>
            )}
          </div>
        </div>

        {/* Santo Evangelio */}
        <div className="space-y-3 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-serif font-bold text-lg text-[#800020]">
            † HOLY GOSPEL: John 6: 51-58 • SANTO EVANGELIO: Juan 6: 51-58
          </h3>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif">
                <span className="font-sans font-bold text-xs text-[#800020] uppercase block">A reading from the Holy Gospel according to John (John 6:51-58):</span>
                <p>
                  Jesus said to the Jewish crowds: "I am the living bread that came down from heaven; whoever eats this bread will live forever; and the bread that I will give is my flesh for the life of the world."
                </p>
                <p>
                  The Jews quarreled among themselves, saying, "How can this man give us his flesh to eat?"
                </p>
                <p>
                  Jesus said to them, "Amen, amen, I say to you, unless you eat the flesh of the Son of Man and drinks his blood, you do not have life within you. Whoever eats my flesh and drinks my blood has eternal life, and I will raise him on the last day. For my flesh is true food, and my blood is true drink. Whoever eats my flesh and drinks my blood remains in me and I in him. Just as the living Father sent me and I have life because of the Father, so also the one who feeds on me will have life because of me. This is the bread that came down from heaven. Unlike your ancestors who ate and still died, whoever eats this bread will live forever."
                </p>
                <p className="font-bold text-xs text-[#800020] pt-2">The Gospel of the Lord. <span className="text-black">R. Praise to you, Lord Jesus Christ.</span></p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif">
                <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Evangelio de nuestro Señor Jesucristo según san Juan (Juan 6:51-58):</span>
                <p>
                  En aquel tiempo, Jesús dijo a los judíos: "Yo soy el pan vivo que ha bajado del cielo; el que coma de este pan vivirá para siempre. Y el pan que yo les voy a dar es mi carne para que el mundo tenga vida".
                </p>
                <p>
                  Entonces los judíos se pusieron a discutir entre sí: "¿Cómo puede éste darnos a comer su carne?"
                </p>
                <p>
                  Jesús les dijo: "Yo les aseguro, si no comen la carne del Hijo del hombre y no beben su sangre, no podrán tener vida en ustedes. El que come mi carne y bebe mi sangre, tiene vida eterna y yo lo resucitaré el último día. Mi carne es verdadera comida y mi sangre es verdadera bebida. El que come mi carne y bebe mi sangre, permanece en mí y yo en él. Así también el que me come vivirá por mí. Este es el pan que ha bajado del cielo; no es como el maná que comieron sus padres, pues murieron. El que come de este pan vivirá para siempre."
                </p>
                <p className="font-bold text-xs text-[#800020] pt-2">Palabra del Señor. <span className="text-black">R. Gloria a ti, Señor Jesús.</span></p>
              </div>
            )}
          </div>
          <div className="rubric bg-[#F5F2EB] p-3 text-center rounded-sm font-sans text-xs">
            HOMILY / HOMILÍA: {pastor}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 26–27: MONICIÓN ANTES DE ENCENDER LA VELA                         */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#D4AF37] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <div className="flex items-center justify-center gap-2 text-[#800020] mb-1">
            <Sun size={20} />
            <span className="text-xs font-sans uppercase tracking-[0.25em] font-bold">
              Rito de la Luz • Children: They Stand Up / Los Niños: Se Ponen de Pie
            </span>
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Monición Antes de Encender la Vela • Monition Before Lighting the Candle
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#D4AF37] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">{pastor} (English):</span>
              <p>
                “Dear boys and girls, this Paschal Candle that you are lighting today in front of the Altar represents the Risen Jesus. On the day of their baptism, Jesus began to enlighten their hearts. That is why the priest gave his parents and godparents a candle that signifies the light of Christ. Over the years, you have come to know what it means to be Christians and friends of Jesus. Now you yourselves are going to receive that Light, to tell everyone that Christ is the Light that illuminates our lives and shows us the way to get to heaven.”
              </p>
              <div className="text-xs text-[#555] italic pt-2 border-t border-[#E5DFD5]">
                <p><strong>Monitor:</strong> At this time, some catechists will go to light the candles from the Paschal Candle and pass the light to all the children.</p>
                <p className="font-bold text-[#800020] uppercase pt-1">CHOIR SINGS</p>
              </div>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#D4AF37] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">{pastor} (Español):</span>
              <p>
                “Queridos niños y niñas, este Cirio Pascual que hoy encuentra encendido delante del Altar, representa a Jesús resucitado. En el día de su bautismo, Jesús empezó a iluminar sus corazones. Por eso el sacerdote entregó a sus papás y padrinos una vela que significa la luz de Cristo. A lo largo de estos años ustedes han ido conociendo en qué consiste ser cristianos y amigos de Jesús. Ahora ustedes mismos van a recibir esa Luz, para decirles a todos que Cristo es la Luz que ilumina nuestra vida y nos enseña el camino para llegar al cielo.”
              </p>
              <div className="text-xs text-[#555] italic pt-2 border-t border-[#E5DFD5]">
                <p><strong>Monitor:</strong> En este momento algunos catequistas van a pasar a encender las velas del Cirio Pascual y pasarán la luz a todos los niños y niñas.</p>
                <p className="font-bold text-[#800020] uppercase pt-1">EL CORO CANTA</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 28–31: RENOVACIÓN DE LAS PROMESAS BAUTISMALES                     */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020]">
            The Profession of Faith • La Profesión de la Fe
          </h2>
          <p className="rubric text-xs mt-1">Children: with the candles light / Los niños: con la vela encendida</p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="space-y-3 font-serif bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3]">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">RENEWAL OF BAPTISMAL PROMISES (English)</span>
              <p className="text-xs text-[#666] italic">
                After the Homily, the Priest questions those to be received for Holy Communion, who stand in their place in the church, as he says:
              </p>
              <p className="priest-voice"><strong className="text-[#800020]">The Priest:</strong> Do you renounce Satan, and all his works and empty promises?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Together, all those to be received for Holy Communion reply: I DO.</p>

              <p className="priest-voice pt-2"><strong className="text-[#800020]">The Priest:</strong> Do you believe in God, the Father almighty, Creator of heaven and earth?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Those to be received for Holy Communion: I DO.</p>

              <p className="priest-voice pt-2"><strong className="text-[#800020]">The Priest:</strong> Do you believe in Jesus Christ, his only Son, our Lord, who was born of the Virgin Mary, suffered death and was buried, rose again from the dead and is seated at the right hand of the Father?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Those to be received for Holy Communion: I DO.</p>

              <p className="priest-voice pt-2"><strong className="text-[#800020]">The Priest:</strong> Do you believe in the Holy Spirit, the holy Catholic church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Those to be received for Holy Communion: I DO.</p>

              <div className="pt-3 border-t border-[#D9D1C3] space-y-2">
                <p className="text-xs text-[#666] italic">The priest concludes:</p>
                <p className="priest-voice font-bold text-[#800020]">
                  “And may almighty God, the Father of our Lord Jesus Christ, who has given us new birth by water and the Holy Spirit and bestowed on us forgiveness of our sins, keep us by his grace, in Christ Jesus our Lord, for eternal life.”
                </p>
                <p className="assembly-response font-bold pl-4">The gathering of the faithful gives its assent by replying: <strong>AMEN.</strong></p>
                <p className="text-xs text-[#666] italic pt-1">
                  All are sprinkled with holy water. DEACONS SPRINKLED WITH HOLY WATER. CHOIR SINGS A SOFT SONG.
                </p>
              </div>
            </div>
          )}

          {showES && (
            <div className="space-y-3 font-serif bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3]">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">RENOVACIÓN DE LAS PROMESAS BAUTISMALES (Español)</span>
              <p className="text-xs text-[#666] italic">
                Después de la homilía, el Celebrante pregunta simultáneamente a todos los que van a ser recibidos para la Sagrada Comunión, que se han puesto de pie en su lugar en la iglesia:
              </p>
              <p className="priest-voice"><strong className="text-[#800020]">El Celebrante:</strong> ¿Renuncian ustedes a Satanás y a todas sus obras y seducciones?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Todos los que van a ser recibidos para la Sagrada Comunión, conjuntamente, responden: SÍ, RENUNCIO.</p>

              <p className="priest-voice pt-2"><strong className="text-[#800020]">El Celebrante:</strong> ¿Creen ustedes en Dios, Padre todopoderoso, creador del cielo y de la tierra?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Todos los que van a ser recibidos para la Sagrada Comunión: SÍ, CREO.</p>

              <p className="priest-voice pt-2"><strong className="text-[#800020]">El Celebrante:</strong> ¿Creen en Jesucristo, su Hijo único y Señor nuestro, que nació de la Virgen María, padeció y murió por nosotros, resucitó y está sentado a la derecha del Padre?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Todos los que van a ser recibidos para la Sagrada Comunión: SÍ, CREO.</p>

              <p className="priest-voice pt-2"><strong className="text-[#800020]">El Celebrante:</strong> ¿Creen en el Espíritu Santo, en la santa Iglesia católica, en la comunión de los santos, en el perdón de los pecados, en la resurrección de los muertos y en la vida eterna?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Todos los que van a ser recibidos para la Sagrada Comunión: SÍ, CREO.</p>

              <div className="pt-3 border-t border-[#D9D1C3] space-y-2">
                <p className="text-xs text-[#666] italic">El Celebrante:</p>
                <p className="priest-voice font-bold text-[#800020]">
                  “Que Dios todopoderoso, Padre de nuestro señor Jesucristo, Que nos liberó del pecado Y nos ha hecho renacer por el agua y el espíritu santo, Nos conserve en su gracia Unidos a Jesucristo nuestro señor, hasta la vida eterna.”
                </p>
                <p className="assembly-response font-bold pl-4">Todos: <strong>AMÉN.</strong></p>
                <p className="text-xs text-[#666] italic pt-1">
                  Todos son rociados con agua bendita. DIÁCONOS ROCÍAN CON AGUA BENDITA A LA ASAMBLEA. EL CORO CANTA SUAVEMENTE.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 32–35: ORACIÓN UNIVERSAL DE LOS FIELES                             */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020]">
            The Universal Prayer • Oración de los Fieles
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">THE UNIVERSAL PRAYER (English)</span>
              <p className="priest-voice">
                <strong className="text-[#800020]">Priest:</strong> “Let us pray, brothers and sisters, to the Father, For these boys and girls who today For the first time, they are fully partaken of the Lord's Feast, and for all God's people.”
              </p>
              <div className="space-y-2 pt-2 border-t border-[#D9D1C3]">
                <p className="font-sans font-bold text-xs text-[#800020]">Deacon or minister:</p>
                <p>1. For the Church may be an open house, where everyone can experience the love of the Father.<br /><strong>R. Let us pray to the Lord.</strong></p>
                <p>2. For all nations who live in the blindness of war, of hatred and resentment, Find the peace and joy of forgiveness.<br /><strong>R. Let us pray to the Lord.</strong></p>
                <p>3. So that in the heart of all the men and women of the world grow feelings of love and generosity.<br /><strong>R. Let us pray to the Lord.</strong></p>
                <p>4. For abandoned children and those who don't have the necessities to live with dignity; may find love and help.<br /><strong>R. Let us pray to the Lord.</strong></p>
                <p>5. So that children who will receive their First Communion today, Always Value this first encounter with Jesus in the Eucharist.<br /><strong>R. Let us pray to the Lord.</strong></p>
              </div>
              <div className="pt-2 border-t border-[#D9D1C3]">
                <p className="priest-voice">
                  <strong className="text-[#800020]">Priest:</strong> “Father listens to our prayers and pour out your love on us and on all the men and women of the world. We ask this through Jesus Christ our Lord. <strong>R. Amen.</strong>”
                </p>
                <p className="text-xs text-[#666] italic pt-1">USHERS PICK UP THE COLLECTION. CHOIR SINGS A BACKGROUND MUSIC.</p>
              </div>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">ORACIÓN DE LOS FIELES (Español)</span>
              <p className="priest-voice">
                <strong className="text-[#800020]">El Celebrante:</strong> “Oremos hermanos, al Padre, por estos niños y niñas que hoy por primera vez participan plenamente del Banquete del Señor, y por todo el pueblo de Dios.”
              </p>
              <div className="space-y-2 pt-2 border-t border-[#D9D1C3]">
                <p className="font-sans font-bold text-xs text-[#800020]">El diácono o ministro:</p>
                <p>1. Para que la Iglesia sea una casa de puertas abiertas, donde todos puedan experimentar el amor del Padre.<br /><strong>R. Roguemos al Señor.</strong></p>
                <p>2. Para que los pueblos que viven la ceguera de la guerra, del odio y del rencor encuentren la paz y la alegría del perdón.<br /><strong>R. Roguemos al Señor.</strong></p>
                <p>3. Para que en el corazón de todos los hombres y mujeres del mundo crezcan sentimientos de amor y de generosidad.<br /><strong>R. Roguemos al Señor.</strong></p>
                <p>4. Para que los niños abandonados y los que no tienen lo necesario para vivir dignamente encuentren amor y ayuda.<br /><strong>R. Roguemos al Señor.</strong></p>
                <p>5. Para que los niños y niñas que hoy recibirán la Primera Comunión, valoren siempre este primer encuentro con Jesús Eucaristía.<br /><strong>R. Roguemos al Señor.</strong></p>
              </div>
              <div className="pt-2 border-t border-[#D9D1C3]">
                <p className="priest-voice">
                  <strong className="text-[#800020]">El Celebrante:</strong> “Escucha, Padre, nuestras plegarias y derrama tu amor sobre nosotros y sobre todos los hombres y mujeres del mundo. Te lo pedimos por Jesucristo nuestro Señor. <strong>R. Amén.</strong>”
                </p>
                <p className="text-xs text-[#666] italic pt-1">LOS UJIERES RECOGEN LA COLECTA. EL CORO TOCA MÚSICA DE FONDO.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 36–37: PROCESIÓN DEL OFERTORIO (6 OFRENDAS)                       */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Offertory Procession • Procesión del Ofertorio
          </h2>
          <p className="rubric text-xs mt-1">The procession will take place once the collection has been picked up / La procesión se realizará una vez recogida la colecta</p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">OFFERTORY PROCESSION (English)</span>
              <p><strong>Monitor:</strong> Father, with these offerings we offer you our lives, our hard work and longing, grounded in the hope of the eternal life that you have promised us in Bread and Wine.</p>
              <div className="space-y-2 pt-2 border-t border-[#D9D1C3]">
                <p><strong>LIGHTED CANDLES:</strong> Father, this light represents your life in the midst of our life. Guide our path so that our lives reflect your love and may that light shin in our homes. We promise to keep your flame always on in our hearts.</p>
                <p><strong>BIBLE AND THE CATECHISM:</strong> We offer you the Bible, our spiritual food in which we rely to live in hope. With this Bible, we offer you the Catechism, as we strive daily to understand and fulfill your will.</p>
                <p><strong>BOUQUET OF FLOWERS:</strong> We offer you these flowers, Father, a symbol of life, unity, joy and our desire to love you.</p>
                <p><strong>CIBORIUM WITH BREAD:</strong> Father, we offer you bread, a sign of dedication and fraternal communion. May this be for us, and for all the youth of the world, Bread of life and salvation.</p>
                <p><strong>WATER AND WINE:</strong> Father, we offer you water and wine. The wine, which labor and are has reached its peak to be consumed. We must become like wine, with your company and Friendship, become true Christians.</p>
                <p><strong>COLLECTION:</strong> The collection shows your work, which created love to mankind, this not only nourishes us, but also brings us pleasure. Today it symbolizes the efforts of all of these young adults.</p>
              </div>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">PROCESIÓN DEL OFERTORIO (Español)</span>
              <p><strong>Monitor:</strong> Padre, con estas ofrendas te ofrecemos nuestra vida, nuestro arduo trabajo y anhelo, cimentados en la esperanza de la vida eterna que nos has prometido en el Pan y el Vino.</p>
              <div className="space-y-2 pt-2 border-t border-[#D9D1C3]">
                <p><strong>VELAS ENCENDIDAS:</strong> Padre, esta luz representa tu vida en medio de nuestra vida. Guía nuestro camino para que nuestras vidas reflejen tu amor y que esa luz brille en nuestros hogares. Prometemos mantener tu llama siempre encendida en nuestros corazones.</p>
                <p><strong>LA BIBLIA Y EL CATECISMO:</strong> Les ofrecemos la Biblia, nuestro alimento espiritual en el que nos apoyamos para vivir en esperanza. Con esta Biblia te ofrecemos el Catecismo, mientras nos esforzamos diariamente por comprender y cumplir tu voluntad.</p>
                <p><strong>RAMO DE FLORES:</strong> Te ofrecemos estas flores, Padre, símbolo de vida, de unidad, de alegría y de nuestro deseo de amarte.</p>
                <p><strong>COPÓN CON PAN:</strong> Padre, te ofrecemos el pan, signo de entrega y comunión fraterna. Que esto sea para nosotros, y para todos los jóvenes del mundo, Pan de vida y de salvación.</p>
                <p><strong>AGUA Y VINO:</strong> Padre te ofrecemos agua y vino. El vino, que trabaja y está, ha llegado a su punto máximo para ser consumido. Debemos llegar a ser como el vino, con vuestra compañía y Amistad, convertirnos en verdaderos cristianos.</p>
                <p><strong>COLECTA:</strong> La colecta muestra su trabajo, que creó amor a la humanidad, esto no solo nos nutre, sino que también nos brinda placer. Hoy simboliza los esfuerzos de todos estos jóvenes.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 38–43: LITURGIA DE LA EUCARISTÍA, PREFACIO E INSERTOS             */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020]">
            Liturgy of the Eucharist • Liturgia de la Eucaristía
          </h2>
          <p className="text-xs text-[#666] italic mt-1">CHOIR SINGS THE OFFERTORY / EL CORO CANTA EL OFERTORIO</p>
        </div>

        {/* Oración sobre las Ofrendas */}
        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">PRAYER OVER THE OFFERINGS (English)</span>
              <p className="text-xs text-[#666] italic">
                After the Universal Prayer the Liturgy of the Eucharist is celebrated according to the Order of Mass, with these changes: the Creed is omitted, since the Profession of Faith has already taken place.
              </p>
              <p className="priest-voice">
                <strong className="text-[#800020]">Priest:</strong> “Grant us, O merciful God, may our offering be acceptable to you and may be opened to us the source of all blessing. Through Christ our Lord. <strong>R. Amen.</strong>”
              </p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">ORACIÓN SOBRE LAS OFRENDAS (Español)</span>
              <p className="text-xs text-[#666] italic">
                Acabada la oración de los fieles, sigue la Liturgia de la Eucaristía, en la que todo se realiza como de ordinario, excepto lo siguiente: Se omite el Credo, pues ya se hizo la Profesión de fe.
              </p>
              <p className="priest-voice">
                <strong className="text-[#800020]">Sacerdote:</strong> “Concédenos, Dios misericordioso, que nuestra ofrenda resulte aceptable ante ti y que por ella quede abierta para nosotros la fuente de toda bendición. Por Jesucristo, nuestro Señor. <strong>R. Amén.</strong>”
              </p>
            </div>
          )}
        </div>

        {/* Prefacio I de la Eucaristía */}
        <div className="space-y-3 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-serif font-bold text-base text-[#800020]">
            PREFACE I OF THE MOST HOLY EUCHARIST: THE SACRIFICE AND THE SACRAMENT OF CHRIST • PREFACIO I DE LA EUCARISTÍA
          </h3>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif text-sm">
                <p>V. The Lord be with you. <strong className="text-[#800020]">R. And with your spirit.</strong></p>
                <p>V. Lift up your hearts. <strong className="text-[#800020]">R. We lift them up to the Lord.</strong></p>
                <p>V. Let us give thanks to the Lord our God. <strong className="text-[#800020]">R. It is right and just.</strong></p>
                <p className="pt-2">
                  “It is truly right and just, our duty and our salvation, always and everywhere to give you thanks, Lord, holy Father, almighty and eternal God, through Christ our Lord. For he is the true and eternal Priest, who instituted the pattern of an everlasting sacrifice and was the first to offer himself as the saving Victim, commanding us to make this offering as his memorial. As we eat his flesh that was sacrificed for us, we are made strong, and, as we drink his Blood that was poured out for us, we are washed clean. And so, with Angels and Archangels, with Thrones and Dominions, and with all the hosts and Powers of heaven, we sing the hymn of your glory, as without end we acclaim: <strong>Holy, Holy, Holy Lord God of hosts...</strong>”
                </p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-2 font-serif text-sm">
                <p>V. El Señor esté con ustedes. <strong className="text-[#800020]">R. Y con tu espíritu.</strong></p>
                <p>V. Levantemos el corazón. <strong className="text-[#800020]">R. Lo tenemos levantado hacia el Señor.</strong></p>
                <p>V. Demos gracias al Señor, nuestro Dios. <strong className="text-[#800020]">R. Es justo y necesario.</strong></p>
                <p className="pt-2">
                  “En verdad es justo y necesario, es nuestro deber y salvación darte gracias siempre y en todo lugar, Señor, Padre santo, Dios todopoderoso y eterno, por Cristo, Señor nuestro. El cual, verdadero y eterno Sacerdote, al instituir el sacrificio de la eterna alianza, se ofreció primero a ti como víctima salvadora, y nos mandó que lo ofreciéramos como memorial suyo. Cuando comemos su carne, inmolada por nosotros, quedamos fortalecidos; y cuando bebemos su Sangre, derramada por nosotros, quedamos limpios de nuestros pecados. Por eso, con los ángeles y los arcángeles, con los tronos y dominaciones y con todos los coros celestiales, cantamos sin cesar el himno de tu gloria: <strong>Santo, Santo, Santo ...</strong>”
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Insertos Plegarias Eucarísticas I, II y III */}
        <div className="space-y-3 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-serif font-bold text-base text-[#800020]">
            EUCHARISTIC PRAYER INSERTS (Hanc Igitur, EP II & EP III) • INSERTOS LITÚRGICOS PROPIOS
          </h3>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-xs">
                <div>
                  <strong>Roman Canon (Hanc Igitur):</strong><br />
                  “Accept, O Lord, in your goodness, this offering of your servants and of all your holy family, that we offer you today especially for N. and N. (or: those) that for the first time you invite on this day to partake of the bread of life and the cup of salvation, at your family's table; Grant them to always grow in your friendship and in communion with your Church. (Through Christ our Lord. Amen.)”
                </div>
                <div>
                  <strong>Eucharistic Prayer II:</strong><br />
                  “Remember your children (N. and N.) that for the first time you invite on this day to partake of the bread of life and the cup of salvation, at your family's table; Grant them to always grow in your friendship and in communion with your Church.”
                </div>
                <div>
                  <strong>Eucharistic Prayer III:</strong><br />
                  “† Help your children (N. and N.) that for the first time you invite on this day to partake of the bread of life and the cup of salvation, at your family's table; Grant them to always grow in your friendship and in communion with your Church.”
                </div>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-xs">
                <div>
                  <strong>Canon Romano (Acepta, Señor):</strong><br />
                  “Acepta, Señor, en tu bondad, esta ofrenda de tus siervos y de toda tu familia santa, que hoy te ofrecemos especialmente por N. y N. (o bien: aquellos) que por vez primera invitas en este día a participar del pan de vida y del cáliz de salvación, en la mesa de tu familia; concédeles crecer siempre en tu amistad y en la comunión con tu Iglesia. (Por Cristo, nuestro Señor. Amén.)”
                </div>
                <div>
                  <strong>Plegaria Eucarística II:</strong><br />
                  “Acuérdate de tus hijos (N. y N.) que por vez primera invitas en este día a participar del pan de vida y del cáliz de salvación, en la mesa de tu familia; concédeles crecer siempre en tu amistad y en la comunión con tu Iglesia.”
                </div>
                <div>
                  <strong>Plegaria Eucarística III:</strong><br />
                  “† Ayuda a tus hijos (N. y N.) que por vez primera invitas en este día a participar del pan de vida y del cáliz de salvación, en la mesa de tu familia; concédeles crecer siempre en tu amistad y en la comunión con tu Iglesia.”
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 44–45: ANTÍFONA Y ORACIÓN DESPUÉS DE LA COMUNIÓN                  */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020]">
            Comunión y Oración Después de la Comunión • Communion
          </h2>
          <p className="text-xs text-[#666] italic mt-1">CHOIR SINGS THE COMMUNION HYMN / EL CORO CANTA EL HIMNO DE LA COMUNIÓN</p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Communion Antiphon Cf. Lc 24, 35</span>
              <p className="italic">“The disciples recognized the Lord Jesus When he broke the bread. (E.T. alleluia).”</p>
              <div className="pt-2 border-t border-[#D9D1C3] space-y-2">
                <span className="font-sans font-bold text-xs text-[#800020] uppercase block">PRAYER AFTER COMMUNION</span>
                <p className="priest-voice">
                  <strong className="text-[#800020]">Priest:</strong> “Accompany us, O Lord, with your abiding help, whom you renew with the heavenly gift, and whom you don't stop protecting, allow them to be more and more worthy of eternal redemption. Through Christ our Lord. <strong>R. Amen.</strong>”
                </p>
              </div>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Antífona de Comunión Lc. 24, 35</span>
              <p className="italic">“Los discípulos reconocieron al Señor Jesús cuando partió el pan. (T.P. Aleluya.)”</p>
              <div className="pt-2 border-t border-[#D9D1C3] space-y-2">
                <span className="font-sans font-bold text-xs text-[#800020] uppercase block">ORACIÓN DESPUÉS DE LA COMUNIÓN</span>
                <p className="priest-voice">
                  <strong className="text-[#800020]">Sacerdote:</strong> “Acompaña, Señor, con tu permanente auxilio, a quienes renuevas con el don celestial, y a quienes no dejas de proteger, concédeles ser cada vez más dignos de la eterna redención. Por Jesucristo, nuestro Señor. <strong>R. Amén.</strong>”
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 46–47: BENDICIÓN DE LOS PADRES                                    */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <div className="flex items-center justify-center gap-2 text-[#800020] mb-1">
            <Heart size={20} />
            <span className="text-xs font-sans uppercase tracking-[0.25em] font-bold">
              Parent's Blessing • Bendición de los Padres
            </span>
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            (Children Face Parents / Padres Miren a sus Hijos)
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FDFBF7] p-6 rounded-sm border-l-4 border-[#800020] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">PARENT'S BLESSING (English):</span>
              <p>“My dear child, I love you. Today is a very important day which is why we are celebrating it in such a special way.”</p>
              <p>“I am very thankful to God for choosing me to be your mother/ father. He has been so good to me. Watching you grow makes me so proud. I am especially proud of you today, on this your First Holy Communion Day.”</p>
              <p>“Today, you have received the body and blood of Jesus Christ. You, along with our church family, now participate in this sacrament of love and unity. From now on you can receive Jesus; nothing could make me happier.”</p>
              <p>“I promise to continue to share my faith with you and give you every opportunity to build your own relationship with God our Father. So, I ask God to bless you today and always. May he fill you with his perfect love. <strong>AMEN</strong>”</p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FDFBF7] p-6 rounded-sm border-l-4 border-[#800020] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">BENDICIÓN DE LOS PADRES (Español):</span>
              <p>“Mi querido hijo, Te amo. Hoy es un día muy importante y por eso lo celebramos de una manera tan especial.”</p>
              <p>“Estoy muy agradecida con Dios por elegirme para ser tu madre/padre. Él ha sido tan bueno conmigo. Verte crecer me enorgullece mucho. Estoy especialmente orgullosa de ti hoy, en este día de tu Primera Comunión.”</p>
              <p>“Hoy has recibido el cuerpo y la sangre de Jesucristo. Tú, junto a nuestra familia parroquial, ahora participas en este sacramento de amor y unidad. A partir de ahora puedes recibir a Jesús; nada podría hacerme más feliz. Prometo continuar compartiendo mi fe contigo y darte todas las oportunidades para que tú construyas tu propia relación con Dios nuestro Padre.”</p>
              <p>“Por eso le pido a Dios que te bendiga hoy y siempre, y que te llene de su amor perfecto. <strong>AMÉN</strong>”</p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 48–49: BENDICIÓN SOLEMNE AL FINAL DE LA MISA                      */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020]">
            Solemn Blessing at the End of Mass • Bendición Solemne al Final de la Misa
          </h2>
          <p className="rubric text-xs mt-1">
            The priest, with hands extended over the newly received for Holy Communion, says / El Celebrante, con las manos extendidas sobre los recién recibidos a la Primera Comunión, dice:
          </p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">SOLEMN BLESSING (English)</span>
              <p className="priest-voice">
                “May God the Father almighty bless you, whom he has made his adopted sons and daughters reborn from water and the Holy Spirit, and may he keep you worthy of his fatherly love. <strong>R. Amen.</strong>”
              </p>
              <p className="priest-voice">
                “May his Only Begotten Son, who promised that the Spirit of truth would abide in his Church, bless you and confirm you by his power in the confession of the true faith. <strong>R. Amen.</strong>”
              </p>
              <p className="priest-voice">
                “May the Holy Spirit, who kindles the fire of charity in the hearts of disciples, bless you and lead you blameless and gathered as one into the joy of the Kingdom of God. <strong>R. Amen.</strong>”
              </p>
              <p className="text-xs text-[#666] italic pt-1">And he blesses all the people, adding:</p>
              <p className="priest-voice">
                “And may almighty God bless all of you, who are gathered here, the Father, and the Son, and the Holy Spirit. <strong>R. Amen.</strong>”
              </p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">BENDICIÓN SOLEMNE (Español)</span>
              <p className="priest-voice">
                “Que Dios Padre todopoderoso, que los ha adoptado como hijos, haciéndolos renacer del agua y del Espíritu Santo, los bendiga y los haga siempre dignos de su amor paternal. <strong>R. Amén.</strong>”
              </p>
              <p className="priest-voice">
                “Que el Unigénito de Dios, que prometió a su Iglesia la presencia continua del Espíritu de la verdad, los bendiga y los confirme en la confesión de la fe verdadera. <strong>R. Amén.</strong>”
              </p>
              <p className="priest-voice">
                “Que el Espíritu Santo, que encendió en el corazón de los discípulos el fuego del amor, los bendiga y, congregándolos en la unidad, los conduzca, a través de las pruebas de la vida, a los gozos del Reino eterno. <strong>R. Amén.</strong>”
              </p>
              <p className="text-xs text-[#666] italic pt-1">Y bendice a todo el pueblo, añadiendo:</p>
              <p className="priest-voice">
                “Y a todos ustedes, los aquí presentes, los bendiga Dios todopoderoso, Padre, Hijo, y Espíritu Santo. <strong>R. Amén.</strong>”
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 50–51: PALABRAS DE AGRADECIMIENTO                                 */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020]">
            Words of Appreciation • Palabras de Agradecimiento
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">WORDS OF APPRECIATION (English)</span>
              <p className="font-bold">Dear Catechist,</p>
              <p>
                On this day of celebration of First Communion, we want to express our sincere gratitude for your dedication, love and sacrifice in accompanying our children on their journey of faith. His commitment and teachings have been instrumental in their preparation for this very important sacrament. May God bless you abundantly for your work and for sowing the seed of faith in the hearts of our children.
              </p>
              <p className="pt-2">
                With gratitude and prayers,<br />
                <strong>[Your Name / Padres de Familia]</strong> and the community of {parroquia} in {ciudad}.
              </p>
              <p className="font-sans font-bold text-xs text-[#800020] uppercase pt-2">
                CHOIR SINGS THE RECESSIONAL HYMN
              </p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-sm">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">PALABRAS DE AGRADECIMIENTO (Español)</span>
              <p className="font-bold">Querido Catequista,</p>
              <p>
                En este día de celebración de la Primera Comunión, queremos expresar nuestro más sincero agradecimiento por su dedicación, amor y sacrificio al acompañar a nuestros niños en su camino de fe. Su compromiso y enseñanzas han sido fundamentales en su preparación para este sacramento tan importante. Que Dios lo/a bendiga abundantemente por su labor y por sembrar la semilla de la fe en los corazones de nuestros niños.
              </p>
              <p className="pt-2">
                Con gratitud y oraciones,<br />
                <strong>[Tu Nombre / Padres de Familia]</strong> y la comunidad de {parroquia} de {ciudad}.
              </p>
              <p className="font-sans font-bold text-xs text-[#800020] uppercase pt-2">
                EL CORO CANTA EL HIMNO RECESIONAL
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINA 52: ITINERARIO DE LA MISA DE PRIMERA COMUNIÓN                      */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020] uppercase tracking-wider">
            Itinerary for First Holy Communion Mass • Itinerario de la Misa
          </h2>
          <p className="text-xs text-[#666] uppercase tracking-widest">{parroquia} • {ciudad}</p>
        </div>

        <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-4 font-serif text-sm">
          <div className="space-y-3">
            <p><strong>I. PRESENTATION AND WELCOME:</strong> Children's entrance</p>
            <p><strong>II. ENTRY SONG:</strong> Procession of ministers with priest</p>
            <p>
              <strong>III. LITURGY OF THE WORD:</strong><br />
              • First reading – English: _________________________________<br />
              • Psalm – Spanish: _________________________________<br />
              • Second reading – Spanish: _________________________________
            </p>
            <p>
              <strong>IV. RENEWAL OF BAPTISMAL PROMISES:</strong><br />
              After the Gospel and homily - the candles of the Paschal Candle are lit (catechists)
            </p>
            <p><strong>V. PRAYER OF THE FAITHFUL:</strong> Deacon</p>
            <div>
              <strong>VI. OFFERTORY PROCESSION (A Deacon will read):</strong>
              <ol className="list-decimal pl-6 space-y-1 mt-1">
                <li>Two students with candles: _________________________________</li>
                <li>Two Bibles & Catechism of Catholic Church: _________________________________</li>
                <li>Two Bouquets of Roses: _________________________________</li>
                <li>One Ciborium: _________________________________</li>
                <li>Two Water & Wine: _________________________________</li>
                <li>Collection Basket: _________________________________</li>
              </ol>
            </div>
            <p><strong>VII. FINAL PRAYER</strong></p>
            <p><strong>VIII. PARENT'S BLESSING:</strong> 1. _________________________________</p>
            <p><strong>IX. THANKS TO THE CATECHISTS:</strong> {pastor}</p>
            <p><strong>X. FINAL BLESSING</strong></p>
          </div>
        </div>
      </section>
    </div>
  );
};
