import React, { useState } from 'react';
import { ConfirmacionParams } from '../../types/liturgia';
import { Sparkles, Printer, Globe, BookOpen, Flame, Users, CheckCircle, Cross } from 'lucide-react';

interface ConfirmacionRitualViewProps {
  data: ConfirmacionParams;
}

export const ConfirmacionRitualView: React.FC<ConfirmacionRitualViewProps> = ({ data }) => {
  const [langMode, setLangMode] = useState<'bilingue' | 'espanol' | 'ingles'>(data.idiomaModo || 'bilingue');

  const handlePrint = () => {
    window.print();
  };

  const obispo = data.nombreObispo || 'Most. Rev. James A. Tamayo, D. D.';
  const pastor = data.nombrePastor || 'Rev. Leszek Waclawik';
  const vicario = data.nombreVicario || 'Rev. Alan Sanchez';
  const diaconos = data.nombreDiaconos || 'Rev. Mr. Juan Zamarripa, Rev. Mr. Ignacio Valdez';
  const cre = data.nombreCRE || 'Amanda Cantú (CRE)';
  const catequistas = data.nombreCatequistas || 'Jaime & Monica Andrade, Jose Luis & Mandy Ramos, Gracie Solis, Patricia Garza, Patsy Sosa, Lupita Oliveros | RICA: Lizette Torres, Raul & Yolanda Gil';
  const coro = data.nombreCoro || 'Daniel Castillo';
  const lectores = data.nombreLectores || 'Patsy Sosa, Amanda Cantú';
  const monaguillos = data.nombreMonaguillos || 'Uriel Ancona, Augusto Aguilar, Robert Martínez, Caleb Bernal, Isabella Mendoza, Regina Saldívar, Karime Saldívar';
  const parroquia = data.nombreParroquia || 'Our Lady of Guadalupe Catholic Church';
  const direccion = data.parroquiaDireccion || '1718 San Jorge Ave.';
  const ciudad = data.ciudadLugar || 'Laredo, Texas';
  const telefono = data.parroquiaTelefono || '(956) 723-6954';
  const fecha = data.fecha || '2024';

  const showES = langMode === 'bilingue' || langMode === 'espanol';
  const showEN = langMode === 'bilingue' || langMode === 'ingles';

  return (
    <div className="space-y-12 font-serif text-[#2D2926]">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F0EDE6] p-4 rounded-md border border-[#D9D1C3] no-print">
        <div className="flex items-center gap-3">
          <Flame className="text-[#800020]" size={22} />
          <div>
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#800020] block">
              Pontifical Romanum • Rito de la Confirmación (56 Páginas)
            </span>
            <span className="text-xs text-[#666] font-sans">
              Esquema Canónico Bilingüe (Inglés / Español) para Misa Pontifical
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
            <span>Imprimir Guion Pontifical (PDF)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 1: PORTADA SACRA PONTIFICAL                                        */}
      {/* ========================================================================= */}
      <div className="border border-[#D9D1C3] bg-[#FDFBF7] p-8 sm:p-14 text-center rounded-sm shadow-xs space-y-6">
        <div className="space-y-2">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[#2D2926] uppercase">
            {parroquia}
          </h2>
          <p className="font-sans text-xs uppercase tracking-widest text-[#666]">
            {direccion} • {ciudad} • {telefono}
          </p>
          <div className="py-3">
            <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#800020] tracking-wider uppercase">
              CONFIRMATION MASS • MISA DE CONFIRMACIÓN
            </h1>
            <p className="font-sans text-sm tracking-widest text-[#444] font-bold mt-1">
              AÑO LITÚRGICO {fecha}
            </p>
          </div>
        </div>

        {/* Emblema del Espíritu Santo y Pentecostés */}
        <div className="flex justify-center py-4">
          <div className="p-4 rounded-full bg-[#FAF7F0] border-2 border-[#800020] shadow-inner">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="54" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 2" />
              <path d="M60 20 L65 45 L90 50 L70 65 L75 90 L60 75 L45 90 L50 65 L30 50 L55 45 Z" fill="#800020" opacity="0.15" />
              {/* Paloma de la Paz / Espíritu Santo */}
              <path d="M60 35 C52 42 40 45 32 40 C42 50 50 55 56 62 C50 72 45 82 48 88 C55 82 58 75 60 70 C62 75 65 82 72 88 C75 82 70 72 64 62 C70 55 78 50 88 40 C80 45 68 42 60 35 Z" fill="#800020" />
              {/* 7 Llamas de Fuego */}
              <circle cx="60" cy="18" r="4" fill="#D4AF37" />
              <circle cx="85" cy="28" r="4" fill="#D4AF37" />
              <circle cx="100" cy="55" r="4" fill="#D4AF37" />
              <circle cx="92" cy="85" r="4" fill="#D4AF37" />
              <circle cx="28" cy="85" r="4" fill="#D4AF37" />
              <circle cx="20" cy="55" r="4" fill="#D4AF37" />
              <circle cx="35" cy="28" r="4" fill="#D4AF37" />
            </svg>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 border-t border-b border-[#D9D1C3] space-y-1">
          <p className="font-serif italic text-base text-[#800020]">
            «No se entristezca tu corazón... ¿Acaso no estoy yo aquí, que soy tu Madre?»
          </p>
          <p className="font-sans text-[11px] uppercase tracking-widest text-[#666]">
            VENIDA DEL ESPÍRITU SANTO • NUESTRA SEÑORA DE GUADALUPE
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINAS 2–3: DIRECTORIO PONTIFICAL Y PASTORAL                             */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-8">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020] uppercase tracking-wider">
            Directorio Ministerial y Catequético • Pastoral Leadership
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
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Excellency</span>
                  <p className="font-bold text-[#2D2926] text-base">{obispo}</p>
                  <p className="text-xs text-[#666]">First Bishop of Laredo</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Pastor</span>
                  <p className="font-bold text-[#2D2926]">{pastor}</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Parochial Vicar</span>
                  <p className="font-bold text-[#2D2926]">{vicario}</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Deacons</span>
                  <p className="text-[#444]">{diaconos}</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Religious Education (CRE / RE)</span>
                  <p className="text-xs text-[#555]">{cre}</p>
                  <p className="text-xs text-[#555] mt-1">{catequistas}</p>
                </div>
                <div className="pt-2 border-t border-[#E5DFD5]">
                  <p><strong>Choir:</strong> {coro}</p>
                  <p><strong>Lectors:</strong> {lectores}</p>
                  <p><strong>Altar Servers:</strong> {monaguillos}</p>
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
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Excelentísimo</span>
                  <p className="font-bold text-[#2D2926] text-base">{obispo}</p>
                  <p className="text-xs text-[#666]">Primer Obispo de Laredo</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Párroco</span>
                  <p className="font-bold text-[#2D2926]">{pastor}</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Vicario Parroquial</span>
                  <p className="font-bold text-[#2D2926]">{vicario}</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Diáconos</span>
                  <p className="text-[#444]">{diaconos}</p>
                </div>
                <div>
                  <span className="font-sans text-[11px] font-bold text-[#800020] uppercase tracking-wider block">Educación Religiosa y Catequesis</span>
                  <p className="text-xs text-[#555]">{cre}</p>
                  <p className="text-xs text-[#555] mt-1">{catequistas}</p>
                </div>
                <div className="pt-2 border-t border-[#E5DFD5]">
                  <p><strong>Coro:</strong> {coro}</p>
                  <p><strong>Lectores:</strong> {lectores}</p>
                  <p><strong>Monaguillos:</strong> {monaguillos}</p>
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
                <li><strong>First:</strong> Thurible's Altar Server</li>
                <li><strong>Second:</strong> Processional Cross' Altar Server</li>
                <li><strong>Third:</strong> Processional Torches' Altar Servers</li>
                <li><strong>Fourth:</strong> The Book of the Gospels by a Deacon</li>
                <li><strong>Fifth:</strong> Confirmandi by Pairs of Two</li>
                <li><strong>Sixth:</strong> Deacon</li>
                <li><strong>Seventh:</strong> Priests</li>
                <li><strong>Eighth:</strong> Bishop</li>
                <li><strong>Ninth:</strong> Miter's Altar Server and Crosier's Altar Server</li>
                <li><strong>Tenth:</strong> Master of Ceremonies</li>
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
                <li><strong>Quinto:</strong> Los Confirmandos por Parejas de Dos</li>
                <li><strong>Sexto:</strong> Diácono</li>
                <li><strong>Séptimo:</strong> Los Sacerdotes</li>
                <li><strong>Octavo:</strong> El Obispo</li>
                <li><strong>Noveno:</strong> Monaguillo de Mitra y Monaguillo de Báculo</li>
                <li><strong>Décimo:</strong> Ceremoniero</li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 6–7: PREPARATIVOS LITÚRGICOS                                      */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-lg font-bold text-[#800020] uppercase tracking-wider">
            Cosas que hay que preparar • Things to be Prepared
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-sm`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-5 rounded-sm border border-[#D9D1C3] space-y-2">
              <p className="font-sans font-bold text-xs text-[#800020] uppercase">The following should be prepared:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[#333] leading-relaxed">
                <li>a) Sacred vestments for Bishop and concelebrating Priests (alb, stole, cope/chasuble).</li>
                <li>b) Chairs for the Bishop and the Priests assisting him.</li>
                <li>c) Vessel (or vessels) with sacred Chrism.</li>
                <li>d) The Roman Pontifical or Roman Ritual.</li>
                <li>e) Requisites for Mass and Holy Communion under both kinds.</li>
                <li>f) Requisites for washing of hands and sanitizing after anointing.</li>
              </ul>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-5 rounded-sm border border-[#D9D1C3] space-y-2">
              <p className="font-sans font-bold text-xs text-[#800020] uppercase">Para la administración de la Confirmación prepárense:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[#333] leading-relaxed">
                <li>a) Las vestiduras sagradas requeridas para la Misa tanto para el obispo como para los presbíteros.</li>
                <li>b) Sedes para el obispo y para los presbíteros que le ayudan.</li>
                <li>c) Una vasija (o vasijas) con el sagrado Crisma.</li>
                <li>d) El Pontifical Romano o el Ritual.</li>
                <li>e) Todo lo necesario para la celebración de la Misa y Comunión bajo las dos especies.</li>
                <li>f) Lo necesario para lavarse las manos después de la unción de los confirmandos.</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 10–11: PALABRAS DE BIENVENIDA (MONITOR)                           */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[#D9D1C3] pb-3">
          <span className="h-[1px] w-8 bg-[#800020]"></span>
          <h2 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
            Monición de Entrada • Words of Welcome
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[16px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#800020] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">Monitor (English):</span>
              <p>
                On behalf of the faith community in the parish of <strong>{parroquia}</strong>, I welcome you all here today as we rejoice in the gifts of the Spirit that are given to us to help build up God’s Kingdom. I warmly welcome <strong>{obispo}</strong>, the young people who will receive the Sacrament of Confirmation along with their families, friends and visitors.
              </p>
              <p className="text-sm italic text-[#555]">
                I now invite you to turn off your cellphones and stand for the procession and to join in our Gathering Hymn.
              </p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#800020] space-y-3 font-serif">
              <span className="font-sans font-bold text-xs uppercase text-[#800020] block">Monitor (Español):</span>
              <p>
                En nombre de la comunidad de fe en la Parroquia de <strong>{parroquia}</strong>, les doy la bienvenida a todos aquí hoy mientras nos regocijamos en los dones del Espíritu que nos han sido dados para ayudar a construir el Reino de Dios. Doy una calurosa bienvenida a <strong>{obispo}</strong>, a los jóvenes que recibirán el Sacramento de la Confirmación junto con sus familiares y amigos.
              </p>
              <p className="text-sm italic text-[#555]">
                Ahora los invito a apagar sus celulares y a ponerse de pie en la procesión y a unirse a nuestro Himno de Entrada.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 12–19: RITOS INICIALES, ACTO PENITENCIAL Y COLECTA                */}
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
            <div className="space-y-3 font-serif">
              <p className="priest-voice">
                <strong className="text-[#800020]">Bishop:</strong> In the name of the Father, and of the Son, and of the Holy Spirit.
              </p>
              <p className="assembly-response pl-4">R. Amen.</p>
              <p className="priest-voice">
                <strong className="text-[#800020]">Bishop:</strong> Peace be with you.
              </p>
              <p className="assembly-response pl-4">R. And with your spirit.</p>
            </div>
          )}

          {showES && (
            <div className="space-y-3 font-serif">
              <p className="priest-voice">
                <strong className="text-[#800020]">Obispo:</strong> En el nombre del Padre, y del Hijo, y del Espíritu Santo.
              </p>
              <p className="assembly-response pl-4">R. Amén.</p>
              <p className="priest-voice">
                <strong className="text-[#800020]">Obispo:</strong> La paz esté con ustedes.
              </p>
              <p className="assembly-response pl-4">R. Y con tu espíritu.</p>
            </div>
          )}
        </div>

        {/* Acto Penitencial */}
        <div className="pt-4 border-t border-[#D9D1C3] space-y-4">
          <span className="font-sans font-bold text-xs uppercase text-[#800020] block tracking-wider">
            Acto Penitencial • Penitential Act
          </span>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px]`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm space-y-2 font-serif">
                <p className="priest-voice text-sm">
                  <strong>Bishop:</strong> Brethren, let us acknowledge our sins, and so prepare ourselves to celebrate the sacred mysteries.
                </p>
                <div className="text-xs italic text-[#444] pl-2 border-l-2 border-[#800020]">
                  I confess to almighty God and to you, my brothers and sisters, that I have greatly sinned, in my thoughts and in my words, in what I have done and in what I have failed to do...
                </div>
                <p className="text-xs font-bold text-[#800020] pt-1">
                  May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life. R. Amen.
                </p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm space-y-2 font-serif">
                <p className="priest-voice text-sm">
                  <strong>Obispo:</strong> Hermanos, para celebrar dignamente estos sagrados misterios, reconozcamos nuestros pecados.
                </p>
                <div className="text-xs italic text-[#444] pl-2 border-l-2 border-[#800020]">
                  Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho de pensamiento, palabra, obra y omisión: por mi culpa, por mi culpa, por mi gran culpa...
                </div>
                <p className="text-xs font-bold text-[#800020] pt-1">
                  Dios todopoderoso tenga misericordia de nosotros, perdone nuestros pecados y nos lleve a la vida eterna. R. Amén.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Oración Colecta */}
        <div className="pt-4 border-t border-[#D9D1C3] space-y-4">
          <span className="font-sans font-bold text-xs uppercase text-[#800020] block tracking-wider">
            Oración Colecta • Collect
          </span>
          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[16px]`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm border border-[#D9D1C3] space-y-2 font-serif">
                <p className="priest-voice">
                  <strong className="text-[#800020]">Bishop:</strong> Let us pray.<br />
                  Grant, we pray, almighty and merciful God, that the Holy Spirit, coming near and dwelling graciously within us, may make of us a perfect temple of his glory. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God, for ever and ever.
                </p>
                <p className="assembly-response pl-4 font-bold">R. Amen.</p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm border border-[#D9D1C3] space-y-2 font-serif">
                <p className="priest-voice">
                  <strong className="text-[#800020]">Obispo:</strong> Oremos.<br />
                  Te pedimos, Dios omnipotente y misericordioso, que venga a nosotros el Espíritu Santo, que se digne habitar en nuestros corazones y nos perfeccione como templos de su gloria. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos.
                </p>
                <p className="assembly-response pl-4 font-bold">R. Amén.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 20–29: LITURGIA DE LA PALABRA BILINGÜE                            */}
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

        {/* 1ª Lectura: Isaías 61, 1-3a. 6a. 8b-9 */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif font-bold text-lg text-[#2D2926]">
              Primera Lectura / First Reading: Isaías (Isaiah) 61:1-3a. 6a. 8b-9
            </h3>
          </div>

          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm space-y-2 font-serif">
                <p className="font-sans font-bold text-xs text-[#800020] uppercase">A reading from the Book of the Prophet Isaiah:</p>
                <p className="italic">
                  The Spirit of the Lord GOD is upon me, because the LORD has anointed me; He has sent me to bring glad tidings to the lowly, to heal the brokenhearted, to proclaim liberty to the captives and release to the prisoners, to announce a year of favor from the LORD...
                </p>
                <p className="text-xs font-bold pt-2">The Word of the Lord. <span className="text-[#800020]">R. Thanks be to God.</span></p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm space-y-2 font-serif">
                <p className="font-sans font-bold text-xs text-[#800020] uppercase">Lectura del libro del profeta Isaías:</p>
                <p className="italic">
                  El espíritu del Señor está sobre mí, porque me ha ungido y me ha enviado para anunciar la buena nueva a los pobres, a curar a los de corazón quebrantado, a proclamar el perdón a los cautivos, la libertad a los prisioneros, y a pregonar el año de gracia del Señor...
                </p>
                <p className="text-xs font-bold pt-2">Palabra de Dios. <span className="text-[#800020]">R. Te alabamos, Señor.</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Salmo Responsorial: Salmo 103 (104) */}
        <div className="bg-[#F0EDE6] p-6 rounded-sm border border-[#D9D1C3] space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="font-sans text-xs font-bold text-[#800020] uppercase tracking-widest">
              Salmo Responsorial • Responsorial Psalm: Salmo 103 (104)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-[#FDFBF7] border border-[#D9D1C3] rounded-sm text-[#800020] font-serif font-bold text-sm">
              R. (30) Lord, send out your Spirit, and renew the face of the earth.
            </div>
            <div className="p-3 bg-[#FDFBF7] border border-[#D9D1C3] rounded-sm text-[#800020] font-serif font-bold text-sm">
              R. (30) Envía, Señor, tu Espíritu, a renovar la tierra.
            </div>
          </div>
        </div>

        {/* 2ª Lectura: Hechos 19, 1b-6a */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-serif font-bold text-lg text-[#2D2926]">
            Segunda Lectura / Second Reading: Hechos (Acts) 19:1b-6a
          </h3>

          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm space-y-2 font-serif">
                <p className="font-sans font-bold text-xs text-[#800020] uppercase">A reading from the Acts of the Apostles:</p>
                <p className="italic">
                  Paul came to Ephesus where he found some disciples. He said to them: “Did you receive the Holy Spirit when you became believers?” They answered him: “We have never even heard that there is a Holy Spirit.” ... And when Paul laid his hands on them, the Holy Spirit came upon them.
                </p>
                <p className="text-xs font-bold pt-2">The Word of the Lord. <span className="text-[#800020]">R. Thanks be to God.</span></p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm space-y-2 font-serif">
                <p className="font-sans font-bold text-xs text-[#800020] uppercase">Lectura del libro de los Hechos de los Apóstoles:</p>
                <p className="italic">
                  Pablo, atravesando la región interior, llegó a Éfeso. Allí encontró a algunos discípulos y les preguntó: «Cuando ustedes abrazaron la fe, ¿recibieron el Espíritu Santo?» Ellos le dijeron: «Ni siquiera hemos oído decir que hay un Espíritu Santo.» ... Pablo les impuso las manos, y descendió sobre ellos el Espíritu Santo.
                </p>
                <p className="text-xs font-bold pt-2">Palabra de Dios. <span className="text-[#800020]">R. Te alabamos, Señor.</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Santo Evangelio: Juan 14, 15-17 */}
        <div className="space-y-4 pt-4 border-t border-[#D9D1C3]">
          <h3 className="font-serif font-bold text-xl text-[#800020]">
            † Santo Evangelio / Holy Gospel: San Juan (John) 14:15-17
          </h3>

          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[16px] leading-relaxed`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm space-y-2 font-serif">
                <p className="italic">
                  Jesus said to his disciples: “If you love me you will keep my commandments. I shall ask the Father, and he will give you another Advocate to be with you for ever, that Spirit of truth whom the world can never receive since it neither sees nor knows him; but you know him, because he is with you, he is in you.”
                </p>
                <p className="text-xs font-bold pt-2 text-[#800020]">The Gospel of the Lord. <span className="text-black">R. Praise to you, Lord Jesus Christ.</span></p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-5 rounded-sm space-y-2 font-serif">
                <p className="italic">
                  Jesús dijo a sus discípulos: «Si ustedes me aman, cumplirán mis mandamientos. Y yo rogaré al Padre, y él les dará otro Paráclito para que esté siempre con ustedes: el Espíritu de la Verdad, a quien el mundo no puede recibir, porque no lo ve ni lo conoce. Ustedes, en cambio, lo conocen, porque él permanece con ustedes y estará en ustedes.»
                </p>
                <p className="text-xs font-bold pt-2 text-[#800020]">Palabra del Señor. <span className="text-black">R. Gloria a ti, Señor Jesús.</span></p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 30–31: PRESENTACIÓN DE LOS CONFIRMANDOS                           */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <div className="text-xs font-sans text-[#800020] uppercase tracking-[0.25em] font-bold mb-1">
            Rito Sacramental de la Confirmación
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Presentación de los Confirmandos • Presentation of Candidates
          </h2>
        </div>

        <div className="space-y-4 text-[16px] leading-relaxed">
          <p className="rubric text-center">
            Después del Evangelio, el Párroco presenta los candidatos al Obispo:
          </p>

          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
            {showEN && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#800020] space-y-2 font-serif">
                <span className="font-sans font-bold text-xs text-[#800020] uppercase block">{pastor} (English):</span>
                <p className="italic text-[15px]">
                  “Bishop Tamayo, <strong>{parroquia}</strong> wishes to present to you their young men and women who have been prepared and are ready to receive the fullness of Christian Initiation in the Sacrament of Confirmation. Each candidate has been well instructed and is accompanied by a sponsor.”
                </p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FAF7F0] p-6 rounded-sm border-l-3 border-[#800020] space-y-2 font-serif">
                <span className="font-sans font-bold text-xs text-[#800020] uppercase block">{pastor} (Español):</span>
                <p className="italic text-[15px]">
                  “Reverendísimo Padre: Estos jóvenes fueron bautizados un día, con la promesa de que serían educados en la fe, y de que un día recibirían por la Confirmación la plenitud del Espíritu Santo. Como responsable de la acción catequética, tengo la satisfacción de manifestar ante la comunidad reunida que han recibido la catequesis adecuada a su edad.”
                </p>
              </div>
            )}
          </div>

          <div className="rubric bg-[#F5F2EB] p-3 text-center rounded-sm">
            Sigue la Homilía del Obispo James Tamayo.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 32–35: RENOVACIÓN DE LAS PROMESAS BAUTISMALES                     */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl font-bold text-[#800020]">
            Renovación de las Promesas Bautismales • Profession of Faith
          </h2>
          <p className="rubric text-xs mt-1">Los confirmandos se ponen de pie en sus lugares</p>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="space-y-3 font-serif bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3]">
              <p className="priest-voice font-bold text-[#800020]">The Bishop:</p>
              <p>Do you renounce Satan, and all his works and empty promises?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Confirmandi: I DO.</p>

              <p className="pt-2">Do you believe in God, the Father almighty, Creator of heaven and earth?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Confirmandi: I DO.</p>

              <p className="pt-2">Do you believe in Jesus Christ, his only Son, our Lord...?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Confirmandi: I DO.</p>

              <p className="pt-2">Do you believe in the Holy Spirit, the Lord, the giver of life, who today through the Sacrament of Confirmation is given to you in a special way just as he was given to the Apostles on the day of Pentecost?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Confirmandi: I DO.</p>

              <div className="pt-3 border-t border-[#D9D1C3]">
                <p className="priest-voice font-bold">The Bishop proclaims the faith of the Church:</p>
                <p className="italic">“THIS IS OUR FAITH. THIS IS THE FAITH OF THE CHURCH. WE ARE PROUD TO PROFESS IT IN CHRIST JESUS OUR LORD.”</p>
                <p className="assembly-response font-bold pl-4 text-[#800020]">All: AMEN.</p>
              </div>
            </div>
          )}

          {showES && (
            <div className="space-y-3 font-serif bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3]">
              <p className="priest-voice font-bold text-[#800020]">El Obispo:</p>
              <p>¿Renuncian ustedes a Satanás y a todas sus obras y seducciones?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Confirmandos: SÍ, RENUNCIO.</p>

              <p className="pt-2">¿Creen ustedes en Dios, Padre todopoderoso, Creador del cielo y de la tierra?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Confirmandos: SÍ, CREO.</p>

              <p className="pt-2">¿Creen en Jesucristo, su Hijo único y Señor nuestro...?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Confirmandos: SÍ, CREO.</p>

              <p className="pt-2">¿Creen en el Espíritu Santo, Señor y dador de vida, que hoy les va a ser comunicado de un modo singular por el Sacramento de la Confirmación, cómo fue dado a los Apóstoles el día de Pentecostés?</p>
              <p className="assembly-response font-bold pl-4 text-[#800020]">Confirmandos: SÍ, CREO.</p>

              <div className="pt-3 border-t border-[#D9D1C3]">
                <p className="priest-voice font-bold">El Obispo proclama la fe de la Iglesia:</p>
                <p className="italic">“ÉSTA ES NUESTRA FE. ÉSTA ES LA FE DE LA IGLESIA, QUE NOS GLORIAMOS DE PROFESAR, EN JESUCRISTO, NUESTRO SEÑOR.”</p>
                <p className="assembly-response font-bold pl-4 text-[#800020]">Todos: AMÉN.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 36–37: IMPOSICIÓN DE LAS MANOS                                    */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Imposición de las Manos • Laying on of Hands
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[16px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <p className="priest-voice text-sm italic">
                The Bishop extends hands over all candidates and says:
              </p>
              <p className="text-[15px]">
                “Almighty God, Father of our Lord Jesus Christ, who brought these your servants to new birth by water and the Holy Spirit, freeing them from sin: send upon them, O Lord, the Holy Spirit, the Paraclete; give them the <strong>spirit of wisdom and understanding</strong>, the <strong>spirit of counsel and fortitude</strong>, the <strong>spirit of knowledge and piety</strong>; fill them with the <strong>spirit of the fear of the Lord</strong>. Through Christ our Lord.”
              </p>
              <p className="assembly-response font-bold text-[#800020] pl-4">R. Amen.</p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <p className="priest-voice text-sm italic">
                El Obispo extiende las manos sobre todos los confirmandos y dice:
              </p>
              <p className="text-[15px]">
                “Dios todopoderoso, Padre de nuestro Señor Jesucristo, que has hecho nacer de nuevo a estos hijos tuyos por medio del agua y del Espíritu Santo, librándolos del pecado, escucha nuestra oración y envía sobre ellos al Espíritu Santo Consolador: <strong>espíritu de sabiduría y de inteligencia</strong>, <strong>espíritu de consejo y de fortaleza</strong>, <strong>espíritu de ciencia, de piedad</strong> y de tu <strong>santo temor</strong>. Por Jesucristo, nuestro Señor.”
              </p>
              <p className="assembly-response font-bold text-[#800020] pl-4">R. Amén.</p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 38–39: UNCIÓN CON EL SANTO CRISMA                                 */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Unción con el Santo Crisma • Anointing with Chrism
          </h2>
          <p className="font-sans text-xs text-[#800020] font-bold tracking-widest uppercase mt-1">
            El Coro canta: “Veni Creator Spiritus”
          </p>
        </div>

        <div className="space-y-4">
          <p className="rubric text-center">
            El padrino coloca su mano derecha en el hombro del confirmando. El Obispo unge la frente con el Santo Crisma:
          </p>

          <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[16px]`}>
            {showEN && (
              <div className="bg-[#FDFBF7] p-6 rounded-sm border-2 border-[#800020] space-y-3 font-serif">
                <p className="priest-voice font-bold text-lg text-[#800020]">
                  «N., BE SEALED WITH THE GIFT OF THE HOLY SPIRIT.»
                </p>
                <p className="assembly-response pl-4 font-bold text-base">
                  The newly confirmed: <strong>AMEN.</strong>
                </p>
                <p className="priest-voice pt-2">
                  «PEACE BE WITH YOU.»
                </p>
                <p className="assembly-response pl-4 font-bold text-base">
                  The newly confirmed: <strong>AND WITH YOUR SPIRIT.</strong>
                </p>
              </div>
            )}

            {showES && (
              <div className="bg-[#FDFBF7] p-6 rounded-sm border-2 border-[#800020] space-y-3 font-serif">
                <p className="priest-voice font-bold text-lg text-[#800020]">
                  «N., RECIBE POR ESTA SEÑAL EL DON DEL ESPÍRITU SANTO.»
                </p>
                <p className="assembly-response pl-4 font-bold text-base">
                  El confirmado responde: <strong>AMÉN.</strong>
                </p>
                <p className="priest-voice pt-2">
                  «LA PAZ ESTÉ CONTIGO.»
                </p>
                <p className="assembly-response pl-4 font-bold text-base">
                  El confirmado: <strong>Y CON TU ESPÍRITU.</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 40–43: ORACIÓN UNIVERSAL                                          */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-lg font-bold text-[#800020] uppercase tracking-wider">
            Oración Universal de los Fieles • The Universal Prayer
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <p className="priest-voice font-bold text-[#800020]">Bishop: My dear brothers and sisters...</p>
              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li>For these his servants, whom the gift of the Holy Spirit has confirmed... let us pray to the Lord. <strong>R. Lord, hear our prayer.</strong></li>
                <li>For their parents and sponsors: that by word and example they may continue to encourage them... let us pray to the Lord. <strong>R. Lord, hear our prayer.</strong></li>
                <li>For the holy Church of God, together with Francis our Pope, James Tamayo our Bishop... let us pray to the Lord. <strong>R. Lord, hear our prayer.</strong></li>
                <li>For the whole world, that all people may seek the Kingdom of God... let us pray to the Lord. <strong>R. Lord, hear our prayer.</strong></li>
              </ol>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif">
              <p className="priest-voice font-bold text-[#800020]">Obispo: Queridos hermanos...</p>
              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li>Por estos hijos de Dios, que han sido confirmados por el Espíritu Santo... roguemos al Señor. <strong>R. Te rogamos, Señor.</strong></li>
                <li>Por sus padres y padrinos, responsables de su fe... roguemos al Señor. <strong>R. Te rogamos, Señor.</strong></li>
                <li>Por la santa Iglesia de Dios, en comunión con el Papa Francisco y nuestro Obispo James Tamayo... roguemos al Señor. <strong>R. Te rogamos, Señor.</strong></li>
                <li>Por los hombres del mundo entero, para que se reconozcan como hermanos... roguemos al Señor. <strong>R. Te rogamos, Señor.</strong></li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 52–53: BENDICIÓN FINAL PONTIFICAL                                 */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border-2 border-[#800020] shadow-sm space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#800020]">
            Bendición Solemne Final • Solemn Blessing at the End of Mass
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[16px] leading-relaxed`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-[15px]">
              <p className="priest-voice font-bold text-[#800020]">The Bishop extends hands over the newly confirmed:</p>
              <p>May God the Father almighty bless you, whom he has made his adopted sons and daughters reborn from water and the Holy Spirit, and may he keep you worthy of his fatherly love. <strong>R. Amen.</strong></p>
              <p>May his Only Begotten Son... bless you and confirm you. <strong>R. Amen.</strong></p>
              <p>May the Holy Spirit... lead you blameless into the Kingdom of God. <strong>R. Amen.</strong></p>
              <div className="pt-2 border-t border-[#D9D1C3] font-bold text-[#800020]">
                And may almighty God bless all of you: the Father, + and the Son, + and the Holy + Spirit. R. Amen.
              </div>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm border border-[#D9D1C3] space-y-3 font-serif text-[15px]">
              <p className="priest-voice font-bold text-[#800020]">El Obispo extiende las manos sobre los recién confirmados:</p>
              <p>Que Dios Padre todopoderoso, que los ha adoptado como hijos haciéndolos renacer del agua y del Espíritu Santo, los bendiga y los haga siempre dignos de su amor paternal. <strong>R. Amén.</strong></p>
              <p>Que el Unigénito de Dios... los bendiga y los confirme. <strong>R. Amén.</strong></p>
              <p>Que el Espíritu Santo... los conduzca a los gozos del Reino eterno. <strong>R. Amén.</strong></p>
              <div className="pt-2 border-t border-[#D9D1C3] font-bold text-[#800020]">
                Y a todos ustedes, los bendiga Dios todopoderoso: Padre, + Hijo, + y Espíritu + Santo. R. Amén.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PÁGINAS 54–56: PALABRAS DE AGRADECIMIENTO E ITINERARIO                    */}
      {/* ========================================================================= */}
      <section className="bg-white p-8 rounded-sm border border-[#D9D1C3] shadow-xs space-y-6">
        <div className="border-b border-[#D9D1C3] pb-3 text-center">
          <h2 className="font-cinzel text-lg font-bold text-[#800020] uppercase tracking-wider">
            Palabras de Agradecimiento e Itinerario • Words of Appreciation
          </h2>
        </div>

        <div className={`grid ${langMode === 'bilingue' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 text-[15px]`}>
          {showEN && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm space-y-2 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Dear Bishop Tamayo (English):</span>
              <p className="italic text-xs leading-relaxed">
                “On this special occasion of our Confirmation Mass, we, the community of <strong>{parroquia}</strong>, wish to express our deep gratitude for your guidance, wisdom, and presence among us. Your leadership inspires us to grow in faith and service. As a token of our appreciation, we present you with this gift. May God continue to bless you abundantly in your ministry.”
              </p>
              <p className="text-xs font-bold pt-2 text-[#800020]">Choir sings the Recessional Hymn.</p>
            </div>
          )}

          {showES && (
            <div className="bg-[#FAF7F0] p-6 rounded-sm space-y-2 font-serif">
              <span className="font-sans font-bold text-xs text-[#800020] uppercase block">Estimado Obispo Tamayo (Español):</span>
              <p className="italic text-xs leading-relaxed">
                “En esta ocasión especial de nuestra Misa de Confirmación, nosotros, la comunidad de <strong>{parroquia}</strong>, deseamos expresar nuestro profundo agradecimiento por su guía, sabiduría y presencia entre nosotros. Su liderazgo nos inspira a crecer en fe y servicio. Como muestra de nuestro aprecio, le presentamos este regalo. Que Dios continúe bendiciéndolo abundantemente en su ministerio.”
              </p>
              <p className="text-xs font-bold pt-2 text-[#800020]">El Coro canta el Himno Recesional.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
