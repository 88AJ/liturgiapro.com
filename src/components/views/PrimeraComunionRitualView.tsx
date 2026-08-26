import React, { useState } from 'react';
import { PrimeraComunionParams } from '../../types/liturgia';
import { Sparkles, Printer, Flame, Heart, BookOpen, Wine, Sun } from 'lucide-react';

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
  const catequistas = data.nombreCatequistas || 'Carmen Lopez, Richard Arredondo, Martha De La Rosa, Jenifer Vera, Jacinto Quijano, Maria Louisa Del Toro';
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
              Misa de Primera Comunión • First Holy Communion Mass (52 Páginas)
            </span>
            <span className="text-xs text-[#666] font-sans">
              Esquema Canónico Bilingüe (Inglés / Español) con Rito de Velas, Ofertorio y Bendición de Padres
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
      {/* PÁGINA 1: PORTADA LITÚRGICA                                               */}
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
              FIRST HOLY COMMUNION MASS • MISA DE PRIMERA COMUNIÓN
            </h1>
            <p className="font-sans text-sm tracking-widest text-[#444] font-bold mt-1">
              GENERACIÓN / CLASS {generacion} • {fecha}
            </p>
          </div>
        </div>

        {/* Emblema Sacro: Custodia Eucarística Dorada */}
        <div className="flex justify-center py-4">
          <div className="p-4 rounded-full bg-[#FAF7F0] border-2 border-[#D4AF37] shadow-inner">
            <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Rayos de la Custodia */}
              <circle cx="50" cy="40" r="32" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="50" cy="40" r="22" stroke="#800020" strokeWidth="2" fill="#FAF7F0" />
              {/* Sagrada Hostia */}
              <circle cx="50" cy="40" r="14" fill="#FDFBF7" stroke="#D4AF37" strokeWidth="1.5" />
              <path d="M50 33 L50 47 M43 40 L57 40" stroke="#800020" strokeWidth="1.5" />
              {/* Cruz Superior */}
              <path d="M50 4 L50 14 M45 8 L55 8" stroke="#D4AF37" strokeWidth="2" />
              {/* Tallo y Base */}
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
            «Construir una relación personal más profunda con Jesucristo en la Eucaristía.»
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINAS 2–3: DIRECTORIO PARROQUIAL Y CATEQUÉTICO                          */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-8">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020] uppercase tracking-wider">
            Directorio Pastoral y Catequético • Parish Leadership
          </h2>
          <p className="font-sans text-xs text-[#666] tracking-widest uppercase mt-1">
            {parroquia} • {ciudad}
          </p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-8 text-center text-sm leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-4">
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-[#800020] border-b border-[#D9D1C3] pb-2">
                Parish Directory (English)
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
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Religious Education for Children (CRE / RE)</span>
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
                Directorio Parroquial (Español)
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
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Educación Religiosa para Niños (CRE / RE)</span>
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
      {/* PÁGINAS 4–5: ORDEN DE LA PROCESIÓN                                        */}
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
              <h3 className="font-sans font-bold text-xs uppercase text-[#800020] tracking-wider mb-2">Procession Order (English)</h3>
              <ol className="list-decimal pl-6 space-y-1.5 text-sm">
                <li><strong>First:</strong> Thurible’s Altar Server</li>
                <li><strong>Second:</strong> Processional Cross’ Altar Server</li>
                <li><strong>Third:</strong> Processional Torches’ Altar Servers</li>
                <li><strong>Fourth:</strong> The Book of the Gospels by a Deacon</li>
                <li><strong>Fifth:</strong> Children by Pairs of Two (First Communicants)</li>
                <li><strong>Sixth:</strong> Deacon</li>
                <li><strong>Seventh:</strong> Master of Ceremonies</li>
                <li><strong>Eighth:</strong> Priest Celebrant ({pastor})</li>
              </ol>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <h3 className="font-sans font-bold text-xs uppercase text-[#800020] tracking-wider mb-2">Orden de la Procesión (Español)</h3>
              <ol className="list-decimal pl-6 space-y-1.5 text-sm">
                <li><strong>Primero:</strong> Monaguillo del Turiferario</li>
                <li><strong>Segundo:</strong> Monaguillo de la Cruz Procesional</li>
                <li><strong>Tercero:</strong> Monaguillos de los Ciriales</li>
                <li><strong>Cuarto:</strong> Diácono con el Libro de los Evangelios</li>
                <li><strong>Quinto:</strong> Los Niños por Parejas de Dos (Comulgantes)</li>
                <li><strong>Sexto:</strong> Diácono</li>
                <li><strong>Séptimo:</strong> Ceremoniero</li>
                <li><strong>Octavo:</strong> Sacerdote Celebrante ({pastor})</li>
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
            Monición de Bienvenida • Words of Welcome
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#800020] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">Monitor (English):</span>
              <p>
                We have received a tradition that goes back to the Apostles, two thousand years ago, according to which the Lord Jesus, before giving his life for us, gathered with them to celebrate the Passover, took bread, gave thanks to God, his Father and our Father, blessed it and gave it to them, saying: <em>“Take and eat of it, all of you, because this is my body.”</em> When supper was over, he took the cup full of wine...
              </p>
              <p>
                On this day, following the Lord's invitation, we are going to celebrate the Eucharist in which the boys and girls of our community, for the first time, will receive Christ in the sacrament of his Body and Blood.
              </p>
              <p className="text-xs italic text-[#666]">
                I invite you to stand up. We will receive the priest and his ministers, singing the entrance hymn.
              </p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#800020] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">Monitor (Español):</span>
              <p>
                Nosotros hemos recibido una tradición que viene desde los Apóstoles, hace dos mil años, según la cual el Señor Jesús, antes de dar su vida por nosotros, reunido con ellos para celebrar la Pascua, tomó pan, dio gracias a Dios, Padre suyo y Padre nuestro, lo bendijo y se lo dio diciendo: <em>«Tomen y coman todos de Él, porque esto es mi cuerpo»</em>. Acabada la cena, tomó el cáliz lleno de vino...
              </p>
              <p>
                Este día, siguiendo la invitación del Señor, vamos a cumplir su mandato: los niños y niñas de nuestra Comunidad, por primera vez, recibirán a Cristo en el sacramento de su Cuerpo y de su Sangre.
              </p>
              <p className="text-xs italic text-[#666]">
                Los invito a ponernos de pie. Vamos recibir al sacerdote y a sus ministros, entonando el canto de entrada.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 8–15: RITOS INICIALES, ACTO PENITENCIAL, GLORIA Y COLECTA         */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-8">
        <div className="flex items-center gap-3 border-b border-[#D9D1C3] pb-3">
          <span className="h-[1px] w-8 bg-[#800020]"></span>
          <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
            Ritos Iniciales • Introductory Rites
          </h2>
        </div>

        {/* Saludo Inicial */}
        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[16px]`}>
          {showEN && (
            <div className="space-y-2 font-serif">
              <p className="priest-voice"><strong className="text-[#800020]">Priest:</strong> In the name of the Father, and of the Son, and of the Holy Spirit. R. Amen.</p>
              <p className="priest-voice"><strong className="text-[#800020]">Priest:</strong> The grace of our Lord Jesus Christ, and the love of God, and the communion of the Holy Spirit be with you all.</p>
              <p className="assembly-response pl-4">R. And with your spirit.</p>
            </div>
          )}

          {showES && (
            <div className="space-y-2 font-serif">
              <p className="priest-voice"><strong className="text-[#800020]">Sacerdote:</strong> En el nombre del Padre, y del Hijo, y del Espíritu Santo. R. Amén.</p>
              <p className="priest-voice"><strong className="text-[#800020]">Sacerdote:</strong> La gracia de nuestro Señor Jesucristo, el amor del Padre y la comunión del Espíritu Santo esté con todos ustedes.</p>
              <p className="assembly-response pl-4">R. Y con tu espíritu.</p>
            </div>
          )}
        </div>

        {/* Acto Penitencial */}
        <div className="pt-4 border-t border-[#D9D1C3] space-y-3">
          <span className="font-sans font-bold text-xs uppercase text-[#800020] block tracking-wider">Acto Penitencial • Penitential Act</span>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px]`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm space-y-2 font-serif">
                <p className="italic text-sm text-[#444]">
                  Let us now ask forgiveness of God the Father for our sins and for the sins of the whole world...
                </p>
                <div className="text-xs pl-2 border-l-2 border-[#800020]">
                  I confess to almighty God and to you, my brothers and sisters, that I have greatly sinned...
                </div>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm space-y-2 font-serif">
                <p className="italic text-sm text-[#444]">
                  Pidamos ahora perdón a Dios Padre por nuestros pecados y por los pecados del mundo entero...
                </p>
                <div className="text-xs pl-2 border-l-2 border-[#800020]">
                  Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Oración Colecta */}
        <div className="pt-4 border-t border-[#D9D1C3] space-y-3">
          <span className="font-sans font-bold text-xs uppercase text-[#800020] block tracking-wider">Oración Colecta • Collect</span>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px]`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm border border-[#D9D1C3] space-y-2 font-serif">
                <p className="priest-voice">
                  <strong className="text-[#800020]">Priest:</strong> Let us pray.<br />
                  Almighty and eternal God, brings the Paschal Sacrament to its fullness in us, so that those whom you deigned to renew by Holy Baptism may make it possible, with the help of your protection, to abound in good fruits and to attain the joys of eternal life. Through our Lord Jesus Christ, your Son...
                </p>
                <p className="assembly-response pl-4 font-bold">R. Amen.</p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm border border-[#D9D1C3] space-y-2 font-serif">
                <p className="priest-voice">
                  <strong className="text-[#800020]">Sacerdote:</strong> Oremos.<br />
                  Dios todopoderoso y eterno, lleva a su plenitud en nosotros el sacramento pascual, para que, a quienes te dignaste renovar por el santo Bautismo, les hagas posible, con el auxilio de tu protección, abundar en frutos buenos, y alcanzar los gozos de la vida eterna. Por nuestro Señor Jesucristo, tu Hijo...
                </p>
                <p className="assembly-response pl-4 font-bold">R. Amén.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 16–25: LITURGIA DE LA PALABRA BILINGÜE                            */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-8">
        <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-3">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#800020]"></span>
            <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
              Liturgia de la Palabra • Liturgy of the Word
            </h2>
          </div>
          <span className="rubric text-xs font-sans uppercase tracking-widest font-semibold">Sentados</span>
        </div>

        {/* 1ª Lectura */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-lg text-[#2D2926]">
            Primera Lectura / First Reading: Hechos (Acts) 2:42-47 / Dt 8:2-3.14-16
          </h3>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm font-serif space-y-2">
                <p className="font-sans font-bold text-xs text-[#800020] uppercase">A reading from the Acts of the Apostles (Acts 2:42-47):</p>
                <p className="italic">
                  The brothers and sisters devoted themselves to the teaching of the Apostles and to the communal life, to the breaking of the bread and to the prayers... Every day they devoted themselves to meeting together in the temple area and to breaking bread in their homes.
                </p>
                <p className="text-xs font-bold pt-2">The Word of the Lord. <span className="text-[#800020]">R. Thanks be to God.</span></p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm font-serif space-y-2">
                <p className="font-sans font-bold text-xs text-[#800020] uppercase">Lectura del libro del Deuteronomio (Dt 8:2-3.14-16):</p>
                <p className="italic">
                  En aquel tiempo, habló Moisés al pueblo y le dijo: "Recuerda el camino que el Señor, tu Dios, te ha hecho recorrer... Él te alimentó con el maná, que ni tú ni tus padres conocían, para enseñarte que no solo de pan vive el hombre, sino de toda palabra que sale de la boca de Dios."
                </p>
                <p className="text-xs font-bold pt-2">Palabra de Dios. <span className="text-[#800020]">R. Te alabamos, Señor.</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Salmo Responsorial */}
        <div className="bg-[#F0EDE6] p-6 rounded-sm border border-[#D9D1C3] space-y-3">
          <span className="font-sans text-xs font-bold text-[#800020] uppercase tracking-widest block">
            Salmo Responsorial • Responsorial Psalm: Salmo 78 (77) / Salmo 115
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-[#FDFBF7] border border-[#D9D1C3] rounded-sm text-[#800020] font-serif font-bold text-sm">
              R. The Lord gave them bread from heaven.
            </div>
            <div className="p-3 bg-[#FDFBF7] border border-[#D9D1C3] rounded-sm text-[#800020] font-serif font-bold text-sm">
              R. Levantaré, Señor, el cáliz de la salvación.
            </div>
          </div>
        </div>

        {/* 2ª Lectura */}
        <div className="space-y-3 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-serif font-bold text-lg text-[#2D2926]">
            Segunda Lectura / Second Reading: Hebreos (Hebrews) 9:11-15
          </h3>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm font-serif space-y-2">
                <p className="font-sans font-bold text-xs text-[#800020] uppercase">A reading from the Letter to the Hebrews:</p>
                <p className="italic">
                  When Christ came as high priest of the good things that have come to be... he entered once for all into the sanctuary, not with the blood of goats and calves, but with his own blood, thus obtaining eternal redemption.
                </p>
                <p className="text-xs font-bold pt-2">The Word of the Lord. <span className="text-[#800020]">R. Thanks be to God.</span></p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm font-serif space-y-2">
                <p className="font-sans font-bold text-xs text-[#800020] uppercase">Lectura de la carta a los hebreos:</p>
                <p className="italic">
                  Hermanos: Cuando Cristo se presentó como Sumo Sacerdote que nos obtiene los bienes definitivos, penetró una sola vez y para siempre en el "lugar Santísimo"... No llevó consigo sangre de animales, sino su propia sangre, con la cual nos obtuvo una redención eterna.
                </p>
                <p className="text-xs font-bold pt-2">Palabra de Dios. <span className="text-[#800020]">R. Te alabamos, Señor.</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Santo Evangelio: Juan 6, 51-58 */}
        <div className="space-y-3 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-serif font-bold text-xl text-[#800020]">
            † Santo Evangelio / Holy Gospel: San Juan (John) 6:51-58 (Pan de Vida)
          </h3>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm font-serif space-y-2">
                <p className="italic">
                  Jesus said to the Jewish crowds: "I am the living bread that came down from heaven; whoever eats this bread will live forever; and the bread that I will give is my flesh for the life of the world... Whoever eats my flesh and drinks my blood has eternal life, and I will raise him on the last day."
                </p>
                <p className="text-xs font-bold pt-2 text-[#800020]">The Gospel of the Lord. <span className="text-black">R. Praise to you, Lord Jesus Christ.</span></p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm font-serif space-y-2">
                <p className="italic">
                  En aquel tiempo, Jesús dijo a los judíos: "Yo soy el pan vivo que ha bajado del cielo; el que coma de este pan vivirá para siempre. Y el pan que yo les voy a dar es mi carne para que el mundo tenga vida... Mi carne es verdadera comida y mi sangre es verdadera bebida."
                </p>
                <p className="text-xs font-bold pt-2 text-[#800020]">Palabra del Señor. <span className="text-black">R. Gloria a ti, Señor Jesús.</span></p>
              </div>
            )}
          </div>
          <div className="rubric bg-[#F5F2EB] p-3 text-center rounded-sm">
            Homilía de {pastor}.
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
              Rito de la Luz • Lighting of the Candles
            </span>
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Monición antes de Encender la Vela del Cirio Pascual
          </h2>
          <p className="rubric text-xs mt-1">Los niños se ponen de pie</p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#D4AF37] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">{pastor} (English):</span>
              <p>
                “Dear boys and girls, this Paschal Candle that you are lighting today in front of the Altar represents the Risen Jesus. On the day of your baptism, Jesus began to enlighten your hearts. That is why the priest gave your parents and godparents a candle that signifies the light of Christ. Now you yourselves are going to receive that Light, to tell everyone that Christ is the Light that illuminates our lives!”
              </p>
              <p className="text-xs italic text-[#555]">
                Monitor: Catechists will now light the candles from the Paschal Candle and pass the light to all the children. (Choir Sings)
              </p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#D4AF37] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">{pastor} (Español):</span>
              <p>
                “Queridos niños y niñas, este Cirio Pascual que hoy se encuentra encendido delante del Altar, representa a Jesús resucitado. En el día de su bautismo, Jesús empezó a iluminar sus corazones. Por eso el sacerdote entregó a sus papás y padrinos una vela que significa la luz de Cristo. Ahora ustedes mismos van a recibir esa Luz, para decirles a todos que Cristo es la Luz que ilumina nuestra vida!”
              </p>
              <p className="text-xs italic text-[#555]">
                Monitor: En este momento los catequistas pasan a encender las velas del Cirio Pascual a todos los niños. (El Coro Canta)
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 28–31: RENOVACIÓN DE LAS PROMESAS Y ASPERSIÓN                     */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020]">
            Renovación de las Promesas Bautismales • Profession of Faith
          </h2>
          <p className="rubric text-xs mt-1">Los niños con sus velas encendidas</p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="space-y-3 font-serif bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3]">
              <p className="priest-voice font-bold text-[#800020]">The Priest:</p>
              <p>Do you renounce Satan, and all his works and empty promises?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Children: I DO.</p>

              <p className="pt-2">Do you believe in God, the Father almighty, Creator of heaven and earth?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Children: I DO.</p>

              <p className="pt-2">Do you believe in Jesus Christ, his only Son, our Lord...?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Children: I DO.</p>

              <p className="pt-2">Do you believe in the Holy Spirit, the holy Catholic Church...?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Children: I DO.</p>

              <div className="pt-3 border-t border-[#D9D1C3]">
                <p className="text-xs font-bold text-[#800020]">
                  And may almighty God keep us by his grace in Christ Jesus our Lord, for eternal life. All: AMEN.
                </p>
                <p className="text-xs italic text-[#555] pt-1">
                  (Deacons sprinkle holy water while choir sings a soft hymn)
                </p>
              </div>
            </div>
          )}

          {showES && (
            <div className="space-y-3 font-serif bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3]">
              <p className="priest-voice font-bold text-[#800020]">El Sacerdote:</p>
              <p>¿Renuncian ustedes a Satanás y a todas sus obras y seducciones?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Niños: SÍ, RENUNCIO.</p>

              <p className="pt-2">¿Creen ustedes en Dios, Padre todopoderoso, Creador del cielo y de la tierra?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Niños: SÍ, CREO.</p>

              <p className="pt-2">¿Creen en Jesucristo, su Hijo único y Señor nuestro...?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Niños: SÍ, CREO.</p>

              <p className="pt-2">¿Creen en el Espíritu Santo, en la santa Iglesia católica...?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Niños: SÍ, CREO.</p>

              <div className="pt-3 border-t border-[#D9D1C3]">
                <p className="text-xs font-bold text-[#800020]">
                  Que Dios todopoderoso nos conserve en su gracia unidos a Jesucristo hasta la vida eterna. Todos: AMÉN.
                </p>
                <p className="text-xs italic text-[#555] pt-1">
                  (Los diáconos rocían agua bendita a los niños y asamblea mientras el coro canta suavemente)
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 36–37: PROCESIÓN DEL OFERTORIO (6 OFRENDAS EXPLICADAS)            */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Procesión del Ofertorio • Offertory Procession
          </h2>
          <p className="rubric text-xs mt-1">Presentación Solemne de las 6 Ofrendas</p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-4 font-serif text-xs">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Offertory Symbols (English):</span>
              <div>
                <strong>1. Lighted Candles:</strong> Father, this light represents your life in our homes. We promise to keep your flame always in our hearts.
              </div>
              <div>
                <strong>2. Bible and Catechism:</strong> Our spiritual food and guide to understand and fulfill your holy will daily.
              </div>
              <div>
                <strong>3. Bouquet of Flowers:</strong> A symbol of life, unity, joy and our desire to love you.
              </div>
              <div>
                <strong>4. Ciborium with Bread:</strong> Bread of life and salvation for us and all youth of the world.
              </div>
              <div>
                <strong>5. Water and Wine:</strong> Human labor transformed into the true blood of Christ.
              </div>
              <div>
                <strong>6. Collection:</strong> The love and generosity of our community.
              </div>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-4 font-serif text-xs">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Símbolos del Ofertorio (Español):</span>
              <div>
                <strong>1. Velas Encendidas:</strong> Padre, esta luz representa tu vida en nuestro hogar. Prometemos mantener tu llama encendida en nuestros corazones.
              </div>
              <div>
                <strong>2. La Biblia y el Catecismo:</strong> Nuestro alimento espiritual para esforzarnos diariamente por cumplir tu voluntad.
              </div>
              <div>
                <strong>3. Ramo de Flores:</strong> Símbolo de vida, unidad, alegría y deseo de amarte.
              </div>
              <div>
                <strong>4. Copón con Pan:</strong> Signo de entrega y comunión fraterna, Pan de vida y salvación.
              </div>
              <div>
                <strong>5. Agua y Vino:</strong> Fruto de la tierra y del trabajo del hombre que se convertirá en la Sangre redentora de Cristo.
              </div>
              <div>
                <strong>6. Colecta:</strong> Esfuerzo, caridad y amor para el sostenimiento de la Iglesia y los necesitados.
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
              Momento Familiar Eucarístico
            </span>
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Bendición de los Padres • Parent's Blessing
          </h2>
          <p className="rubric text-xs mt-1">Los niños se giran y miran con amor a sus padres</p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[16px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FDFBF7] p-6 rounded-sm border-l-4 border-[#800020] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Parents' Prayer over their Children:</span>
              <p className="italic text-[15px]">
                “My dear child, I love you. Today is a very important day which is why we are celebrating it in such a special way. I am very thankful to God for choosing me to be your mother/father. Watching you grow makes me so proud, especially today on your First Holy Communion Day.”
              </p>
              <p className="italic text-[15px] pt-1">
                “Today you have received the Body and Blood of Jesus Christ. From now on you can receive Jesus; nothing could make me happier. I ask God to bless you today and always. May he fill you with his perfect love. <strong>AMEN.</strong>”
              </p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FDFBF7] p-6 rounded-sm border-l-4 border-[#800020] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Oración de los Padres sobre sus Hijos:</span>
              <p className="italic text-[15px]">
                “Mi querido hijo(a), te amo. Hoy es un día muy importante y por eso lo celebramos de una manera tan especial. Estoy muy agradecido(a) con Dios por elegirme para ser tu padre/madre. Verte crecer me enorgullece mucho, especialmente hoy en este día de tu Primera Comunión.”
              </p>
              <p className="italic text-[15px] pt-1">
                “Hoy has recibido el Cuerpo y la Sangre de Jesucristo. A partir de ahora puedes recibir a Jesús; nada podría hacerme más feliz. Prometo continuar compartiendo mi fe contigo. Le pido a Dios que te bendiga hoy y siempre y te llene de su amor perfecto. <strong>AMÉN.</strong>”
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 48–52: BENDICIÓN FINAL Y AGRADECIMIENTO A CATEQUISTAS             */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-lg font-bold text-[#800020] uppercase tracking-wider">
            Agradecimiento a los Catequistas y Bendición Final
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px]`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm space-y-3 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Words of Appreciation to Catechists:</span>
              <p className="italic text-xs">
                “Dear Catechists, we express our sincere gratitude for your dedication, love and sacrifice in accompanying our children on their journey of faith. May God bless you abundantly for sowing the seed of faith in their hearts.”
              </p>
              <div className="pt-2 border-t border-[#D9D1C3] text-xs font-bold text-[#800020]">
                Final Blessing: May almighty God bless all of you: Father, Son, and Holy Spirit. R. Amen.
              </div>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm space-y-3 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Palabras de Agradecimiento a Catequistas:</span>
              <p className="italic text-xs">
                “Queridos Catequistas, les expresamos nuestro más sincero agradecimiento por su dedicación, amor y sacrificio al acompañar a nuestros niños en su camino de fe. Que Dios los bendiga abundantemente por sembrar la semilla de la fe en sus corazones.”
              </p>
              <div className="pt-2 border-t border-[#D9D1C3] text-xs font-bold text-[#800020]">
                Bendición Final: Los bendiga Dios todopoderoso: Padre, Hijo, y Espíritu Santo. R. Amén.
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
