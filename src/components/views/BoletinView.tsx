import React, { useState } from 'react';
import { 
  Newspaper, 
  Printer, 
  Sparkles, 
  Settings, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  Heart, 
  DollarSign, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  QrCode, 
  Check, 
  Layers, 
  BookOpen, 
  Edit3, 
  Eye, 
  ArrowRight
} from 'lucide-react';
import { LiturgicalDay, ParishBulletinData } from '../../types/liturgia';
import { requestBoletin } from '../../utils/liturgicalAiClient';

interface BoletinViewProps {
  day: LiturgicalDay;
  onOpenImpresor: () => void;
}

export const BoletinView: React.FC<BoletinViewProps> = ({ day, onOpenImpresor }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview');
  const [selectedPage, setSelectedPage] = useState<number | 'all'>('all');
  const [loadingAi, setLoadingAi] = useState(false);

  // Comprehensive bulletin state pre-filled with authentic data mirroring the reference bulletin
  const [bulletin, setBulletin] = useState<ParishBulletinData>({
    nombreBoletin: 'The Guardian',
    lemaHeader: 'BUILD A STRONGER PERSONAL RELATIONSHIP WITH JESUS CHRIST.',
    parroquia: 'ST. JOSEPH PARISH',
    parroquiaDireccion: '618 N. Burton Ave, P. O. Box 436, La Pryor, TX. 78872',
    parroquiaTelefono: '(830) 365-4107',
    parroquiaEmail: 'sec@stjosephlapryor.org',
    mision: 'ST. PATRICK MISSION',
    misionDireccion: '470 Old Loma Vista Rd, Batesville, TX. 78829',
    misionTelefono: '(830) 599-1010',
    misionEmail: 'sec@stjosephlapryor.org',
    diocesis: 'Diócesis de San Juan / Laredo',
    fecha: day.fecha || '18 de Mayo de 2025',
    edicionNumero: '24',
    lemaSemanal: day.titulo_celebracion || 'V Domingo de Pascua',
    portadaArteUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tintoretto_-_Christ_Washing_the_Feet_of_the_Disciples_-_Prado.jpg/1280px-Tintoretto_-_Christ_Washing_the_Feet_of_the_Disciples_-_Prado.jpg',
    portadaArteTitulo: 'Cristo lava los pies a sus discípulos — Tintoretto (1548)',
    
    clerigos: [
      { titulo: 'REV.', nombre: 'ALAN SÁNCHEZ', rol: 'ADMINISTRADOR PARROQUIAL' },
      { titulo: 'REV. MR.', nombre: 'GENE CORRIGAN', rol: 'DIÁCONO' },
      { titulo: 'REV. MR.', nombre: 'JUAN GALLEGOS', rol: 'DIÁCONO' },
    ],
    qrDonacionUrl: 'https://stjosephlapryor.org/donate',

    // Page 2: Mass Intentions & Directory
    intencionesMisasDetalladas: [
      { dia: 'Sábado 17 Mayo', hora: '5:00 PM', lugar: 'La Pryor', intencion: 'Confesiones', idioma: 'Español' },
      { dia: 'Sábado 17 Mayo', hora: '6:00 PM', lugar: 'La Pryor', intencion: 'Vigilia Dominical (+Todos los Feligreses)', idioma: 'Español' },
      { dia: 'Sábado 17 Mayo', hora: '7:30 PM', lugar: 'La Pryor', intencion: 'Sunday Vigil Mass', idioma: 'English' },
      { dia: 'Domingo 18 Mayo', hora: '7:30 AM', lugar: 'Batesville', intencion: 'Confesiones y Santo Rosario', idioma: 'Bilingüe' },
      { dia: 'Domingo 18 Mayo', hora: '8:00 AM', lugar: 'Batesville', intencion: 'Misa Dominical de Pascua', idioma: 'Español' },
      { dia: 'Domingo 18 Mayo', hora: '9:30 AM', lugar: 'La Pryor', intencion: 'Confesiones', idioma: 'Bilingüe' },
      { dia: 'Domingo 18 Mayo', hora: '10:00 AM', lugar: 'La Pryor', intencion: '+Javier G. Pérez por Gloria Pérez y familia', idioma: 'Español' },
      { dia: 'Domingo 18 Mayo', hora: '12:00 PM', lugar: 'La Pryor', intencion: 'Misa por la Comunidad Parroquial', idioma: 'English' },
      { dia: 'Martes 20 Mayo', hora: '5:00 PM', lugar: 'La Pryor / Batesville', intencion: 'Misa Ferial de Pascua', idioma: 'Bilingüe' },
      { dia: 'Miércoles 21 Mayo', hora: '5:00 PM', lugar: 'La Pryor', intencion: 'Misa de Santa María', idioma: 'Español' },
      { dia: 'Jueves 22 Mayo', hora: '5:00 PM', lugar: 'Batesville / La Pryor', intencion: 'Misa y Hora Santa Vocacional', idioma: 'Español' },
      { dia: 'Viernes 23 Mayo', hora: '5:00 PM', lugar: 'La Pryor', intencion: 'Por los enfermos de la parroquia', idioma: 'English' }
    ],
    horaSantaInfo: {
      lugar: 'St. Joseph (La Pryor) / St. Patrick (Batesville)',
      horario: 'Miércoles y Jueves 5:30 PM a 6:30 PM',
      confesiones: 'Confesiones disponibles durante la Hora Santa con el P. Alan Sánchez'
    },
    horarioOficina: 'Lunes a Viernes: 9:00 AM – 12:00 PM & 1:00 PM – 5:00 PM',
    directorioMinisterios: [
      { cargo: 'ADMINISTRADOR PARROQUIAL', nombre: 'P. ALAN SÁNCHEZ', email: 'fr.alansanchez@dioceseoflaredo.org', telefono: '(956) 740-1370' },
      { cargo: 'SECRETARIA PARROQUIAL', nombre: 'OFICINA PARROQUIAL', email: 'sec@stjosephlapryor.org' },
      { cargo: 'DIRECTORA DE EDUCACIÓN RELIGIOSA (DRE)', nombre: 'YOLANDA GARCÍA', email: 'cre2@stjosephlapryor.org' },
      { cargo: 'COORDINADOR OCIA / CATECUMENADO', nombre: 'MINISTERIO DE ADULTOS', email: 'cre@stjosephlapryor.org' },
      { cargo: 'DIRECTORA DE JÓVENES CYO', nombre: 'JESSICA ROSAS', email: 'jessica.rosas@cplc.org' },
      { cargo: 'DIRECTORA DE MONAGUILLOS', nombre: 'HEATHER SMITH', email: 'aggietothecorps@hotmail.com' },
      { cargo: 'PRESIDENTA GUADALUPANAS (LA PRYOR)', nombre: 'MARÍA LOUISA DEL TORO' },
      { cargo: 'PRESIDENTA GUADALUPANAS (BATESVILLE)', nombre: 'CAROL GARZA', email: 'carolralph@hotmail.com' },
      { cargo: 'CABALLEROS DE COLÓN', nombre: 'ARNOLD HERNÁNDEZ', email: 'arnoldhdz34@yahoo.com' },
      { cargo: 'CAMINO NEOCATECUMENAL (RESPONSABLE)', nombre: 'MARTHA DE LA ROSA', email: 'm22delarosa@gmail.com' }
    ],

    // Page 3: Sick, Agenda & Stewardship
    enfermosList: [
      'Alma V. Garza', 'Lupita Rodríguez', 'Rosendo Torres', 'Alicia Velasquez', 
      'Dolores Vasquez', 'Ramón Cazarez', 'John Rosales', 'Cheryl Rabe', 
      'Angelica Gonzales', 'Riley Ray Lara', 'Carmelita Ríos', 'Rachel Montes', 
      'Charles Koch', 'Carmine Tayeh', 'Joey Gonzales', 'Guadalupe D. Rodríguez', 
      'Ernesto García', 'Gabel Fournier', 'Mando Ramos', 'María De La Luz Del Toro', 
      'Concepción Conchita Nájera', 'Zachery Guy', 'Noah Quijano', 'Rolando G. Victorino'
    ],
    oracionEnfermosTexto: 'Señor Jesús, médico de los cuerpos y de las almas, mira con misericordia a nuestros hermanos enfermos. Fortalécelos en su debilidad, alivia sus dolores y dales la paz y la salud.',
    agendaSemanal: [
      { fecha: '17 Mayo', evento: 'Misa Neocatecumenal', lugar: 'St. Joseph Church', hora: '7:30 PM' },
      { fecha: '19 Mayo', evento: 'Coronilla de la Divina Misericordia', lugar: 'St. Joseph Church', hora: '5:00 PM' },
      { fecha: '21 Mayo', evento: 'Club del Santo Rosario & Convivio', lugar: 'St. Joseph Parish Hall', hora: '10:00 AM' },
      { fecha: '21 Mayo', evento: 'Hora Santa & Confesiones', lugar: 'St. Joseph Church', hora: '5:30 PM – 6:30 PM' },
      { fecha: '21 Mayo', evento: 'Catequesis de Adultos', lugar: 'Parish Center', hora: '7:00 PM' },
      { fecha: '22 Mayo', evento: 'Adoración al Santísimo Sacramento', lugar: 'St. Patrick Mission', hora: '5:30 PM – 6:30 PM' },
      { fecha: '22 Mayo', evento: 'Ensayo de Primera Comunión y Confirmación', lugar: 'St. Joseph Church', hora: '5:30 PM – 7:30 PM' },
      { fecha: '23 Mayo', evento: 'Gran Bingo Pro-Jóvenes (CYO Kitchen)', lugar: 'St. Joseph Bingo Hall', hora: '7:00 PM' }
    ],
    diezmosYOfrendas: [
      {
        comunidad: 'San José (La Pryor, TX)',
        necesarioSemanal: '$3,088.38',
        necesarioMensual: '$12,353.54',
        colectaMes: '$8,896.73',
        donacionSemana: '$1,482.20'
      },
      {
        comunidad: 'San Patricio (Batesville, TX)',
        necesarioSemanal: '$1,388.19',
        necesarioMensual: '$5,552.70',
        colectaMes: '$3,274.21',
        donacionSemana: '$767.50'
      }
    ],
    velasSagrario: [
      { parroquia: 'ST. JOSEPH', intencion: 'Arde esta semana en memoria de: +Alejandro Chapa Sr. & Harry McHazlett' },
      { parroquia: 'ST. PATRICK', intencion: 'Arde esta semana en memoria de: +Todas las Almas del Purgatorio' }
    ],

    // Page 4: Liturgical Guide & Weekly Saints
    reflexionDomingo: {
      titulo: 'Como Tú nos amas',
      cita: 'Apocalipsis 21:1-5a • Juan 13:31-35',
      texto: '«Les doy un mandamiento nuevo: que se amen unos a otros como yo los he amado». En la Última Cena, Jesús se arrodilla a lavar los pies y nos deja la señal distintiva del cristiano. El amor evangélico no es un sentimiento pasajero, sino una entrega generosa, humilde y concreta a favor del hermano más necesitado.',
      oracion: 'Dios de todo bien, que haces nuevas todas las cosas, concédenos la sabiduría y el valor para amarnos unos a otros como Cristo nos amó. Por Jesucristo nuestro Señor. Amén.'
    },
    semanaEnCasa: [
      { dia: 'Lunes 19 Mayo', santo: 'Gloria a Dios en la Creación', resumen: 'Pablo y Bernabé anuncian la Buena Nueva con valentía. Agradezcamos las bendiciones diarias.', lecturas: 'Hch 14:5-18; Sal 115; Jn 14:21-26' },
      { dia: 'Martes 20 Mayo', santo: 'San Bernardino de Siena', resumen: 'Predicador franciscano y celoso apóstol del Santo Nombre de Jesús (IHS).', lecturas: 'Hch 14:19-28; Sal 145; Jn 14:27-31a' },
      { dia: 'Miércoles 21 Mayo', santo: 'San Cristóbal Magallanes y Compañeros Mártires', resumen: 'Mártires de la fe en México que dieron su vida perdonando a sus perseguidores por amor a Cristo Rey.', lecturas: 'Hch 15:1-6; Sal 122; Jn 15:1-8' },
      { dia: 'Jueves 22 Mayo', santo: 'Santa Rita de Casia', resumen: 'Abogada de los casos imposibles y modelo de reconciliación en la familia y el matrimonio.', lecturas: 'Hch 15:7-21; Sal 96; Jn 15:9-11' },
      { dia: 'Viernes 23 Mayo', santo: 'Ámense unos a otros', resumen: 'Jesús nos pide permanecer en su amor. La caridad fraterna es el fruto de la Pascua.', lecturas: 'Hch 15:22-31; Sal 57; Jn 15:12-17' },
      { dia: 'Sábado 24 Mayo', santo: 'Elegidos para dar fruto', resumen: 'El Señor nos eligió para caminar en la verdad sin temor a las dificultades del mundo.', lecturas: 'Hch 16:1-10; Sal 100; Jn 15:18-21' }
    ],

    // Page 5: From The Pastor & Parishioners
    parroco: 'Rev. Alan Sánchez',
    mensajePastor: `Queridos amigos en Cristo:

Las clases están por terminarse, los días se alargan y nuestros niños ya saborean las vacaciones de verano. ¡Bendición que viene con reto! Cuando cerramos los libros y cambiamos la rutina, lo que aprendimos de la fe puede volarse como polvo en el camino.

Por eso las lecturas de este Quinto Domingo de Pascua llegan a la hora justa y nos dicen que el amor verdadero nunca se detiene:
• Pablo y Bernabé (Hch 14) caminan kilómetros bajo el sol y regresan para animar a las nuevas comunidades: la fe necesita seguimiento.
• El salmo 145 proclama que Dios es "bueno con todos" y fiel "por todas las generaciones". Su escuela nunca cierra.
• Jesús (Jn 13) entrega una regla que no toma vacaciones: "Ámense unos a otros como yo los he amado".

¿Qué significa esto para nuestras familias?
1. Papás — mantengan viva la enseñanza: Una oración antes de comer, una historia bíblica antes de dormir y la Santa Misa dominical en familia, sin pretextos.
2. Niños — sigan preguntando: Pregunten por qué nos persignamos y por qué Jesús amó tanto. Exploren su Biblia infantil.
3. Parroquia — apoyemos a nuestros estudiantes: Próximamente celebraremos las Primeras Comuniones y Confirmaciones. Asistamos, aplaudamos y abracemos fuerte a nuestros jóvenes.

Dos prácticas sencillas para el verano:
• "Evangelio en un minuto": Lean el evangelio del domingo en la cena familiar; cada quien comparte algo que le llamó la atención.
• "Línea de amor": Al despertar, di: "Señor, ¿a quién puedo amar hoy?" y haz un gesto concreto: llama al abuelo, sujeta la puerta o ayuda en casa.

¡Nos vemos en la Santa Misa y en las celebraciones comunitarias!

Pax et Bonum,`,
    articuloFeligres: {
      titulo: 'Testimonio de Gratitud: Día de las Madres',
      autor: 'Por una feligresa de la comunidad',
      versiculoBiblico: 'Jeremías 29:11 — «Porque yo sé los planes que tengo para ustedes —declara el Señor—, planes de bienestar y no de calamidad, para darles un futuro y una esperanza».',
      texto: 'En medio de las dificultades y pérdidas de la vida, cuando parece que las fuerzas se agotan para sacar adelante a los hijos, Dios se manifiesta como el mejor de los padres. En cada paso de mi vida como madre y maestra, he visto su mano providente abriendo puertas donde parecía haber solo muros. Agradezco a Dios por mi comunidad parroquial que siempre nos ha acogido con amor.'
    },

    // Page 6: Announcements, Festival Report & Sponsors
    reporteFestival: {
      titulo: 'Reporte Financiero del Festival Anual Parroquial',
      fecha: '4 de Mayo de 2025',
      ingresos: '$20,603.00',
      gastos: '$4,103.09',
      ganancia: '$16,499.91',
      booths: [
        { nombre: 'Brisket / Tacos de Tripa', patrocinador: 'Familia Trevino', monto: '$1,319.00' },
        { nombre: 'Hamburguesas & Snacks', patrocinador: 'Samantha Cerna', monto: '$963.00' },
        { nombre: 'Menudo Tradicional', patrocinador: 'Joe & Alicia Almaraz', monto: '$551.00' },
        { nombre: 'Elotes Asados en Vaso', patrocinador: 'Familias Prado & Vasquez', monto: '$420.00' },
        { nombre: 'Prize Bingo', patrocinador: 'Batesville Guadalupanas', monto: '$1,178.00' },
        { nombre: 'Bebidas y Refrescos', patrocinador: 'St. Joseph Church', monto: '$513.00' }
      ]
    },
    anunciosGraficos: [
      {
        titulo: 'ESCUELA BÍBLICA DE VERANO (VBS)',
        subtitulo: 'Julio 2025 • Pre-inscripciones Abiertas',
        fecha: 'Julio 2025',
        descripcion: 'Una semana llena de fe, juegos, música y aprendizaje bíblico para niños de 4 a 12 años en el salón parroquial.',
        categoria: 'verano'
      },
      {
        titulo: 'TALLAS EN MADERA DE OLIVO DE TIERRA SANTA',
        subtitulo: 'Visita de la Comunidad de Belén',
        fecha: '24 y 25 de Mayo',
        descripcion: 'Artesanías sagradas hechas a mano por familias cristianas en Tierra Santa para apoyar su presencia en los Santos Lugares.',
        categoria: 'caridad'
      },
      {
        titulo: 'SUPER BINGO PARROQUIAL CYO',
        subtitulo: 'Más de $2,500 en Premios',
        fecha: 'Todos los Viernes 7:00 PM',
        descripcion: 'Puertas abren 5:00 PM. Cocina completa con hamburguesas, nachos y gorditas. Salón de Actividades.',
        categoria: 'bingo'
      },
      {
        titulo: 'GRAN FESTIVAL SAN JOSÉ 2025',
        subtitulo: 'Música en vivo • Comida típica • Fiesta familiar',
        fecha: '13 de Septiembre de 2025',
        descripcion: 'En el Parque Bermea de La Pryor. ¡Separa la fecha para nuestra máxima fiesta patronal!',
        categoria: 'evento'
      }
    ],
    patrocinadores: [
      { negocio: 'ARREDONDO CONSTRUCTION', rubro: 'Construcción y Remodelación', contacto: 'Richard Arredondo', telefono: '(830) 275-3242', direccion: 'P.O. Box 393, La Pryor, TX' },
      { negocio: 'TED RODRIGUEZ JR. LAW FIRM', rubro: 'Abogado & Consejero Legal', contacto: 'Lic. Ted Rodriguez', telefono: '(830) 365-7725', direccion: 'Uvalde & Carrizo Springs, TX' },
      { negocio: 'HAUS OF HAIR BY KENYA', rubro: 'Salón de Belleza y Estilo', contacto: 'Kenya Gonzalez', telefono: '(830) 279-8392', direccion: 'Facebook: Hausofhairbykenya' },
      { negocio: 'THE MAGNOLIA GROUP', rubro: 'Seguros de Salud y Vida', contacto: 'Emelita Espiritu', telefono: '(830) 968-7318', direccion: 'La Pryor, TX' }
    ],
    codigoVestimenta: {
      ninas: 'Vestido blanco largo o a la rodilla con mangas. Zapatos formales blancos. Velo o corona opcional.',
      ninos: 'Camisa blanca de manga larga, pantalón de vestir negro o pantalón vaquero negro formal, corbata negra, botas o zapatos de vestir.',
      prohibido: 'Sin tirantes (strapless), minifaldas, chancletas (crocs/flip-flops), tenis deportivos o camisetas sin cuello.'
    }
  });

  const handleGenerateAiMessage = async () => {
    setLoadingAi(true);
    try {
      const data = await requestBoletin({
        parroquia: bulletin.parroquia,
        parroco: bulletin.parroco,
        fecha: bulletin.fecha,
        celebracion: day.titulo_celebracion || day.celebracion,
        lema: bulletin.lemaSemanal
      });

      setBulletin(prev => ({
        ...prev,
        lemaSemanal: data.lemaSugerido || prev.lemaSemanal,
        mensajePastor: data.editorial || prev.mensajePastor,
        reflexionDomingo: data.reflexionSemanal ? {
          ...prev.reflexionDomingo,
          texto: data.reflexionSemanal
        } : prev.reflexionDomingo
      }));
    } catch (err) {
      console.error('Error generating bulletin content:', err);
    } finally {
      setLoadingAi(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-serif">
      {/* Top Banner & Control Bar (No Print) */}
      <div className="bg-[#F0EDE6] p-6 sm:p-8 rounded-md border border-[#D9D1C3] shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-6 no-print">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[1px] w-6 bg-[#800020]"></span>
            <span className="uppercase font-sans text-[11px] tracking-[0.3em] text-[#800020] font-bold">
              Officina Typographica & Boletín Parroquial
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light font-serif leading-tight italic text-[#2D2926]">
            Diseñador de Boletín Parroquial & Folleto de Misa
          </h1>
          <p className="text-xs text-[#555] font-sans mt-1">
            Maquetación editorial completa basada en publicaciones católicas oficiales: Portada con arte sacro, intenciones, directorio, agenda, finanzas, carta pastoral y patrocinadores.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 font-sans">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#F9F7F2] p-1 rounded-sm border border-[#D9D1C3] text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-medium transition ${
                activeTab === 'preview' ? 'bg-[#800020] text-[#F9F7F2] font-bold shadow-2xs' : 'text-[#444] hover:text-[#2D2926]'
              }`}
            >
              <Eye size={13} />
              <span>Previsualizar Cuadernillo</span>
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-medium transition ${
                activeTab === 'editor' ? 'bg-[#800020] text-[#F9F7F2] font-bold shadow-2xs' : 'text-[#444] hover:text-[#2D2926]'
              }`}
            >
              <Edit3 size={13} />
              <span>Editor de Datos</span>
            </button>
          </div>

          {/* AI Generation */}
          <button
            onClick={handleGenerateAiMessage}
            disabled={loadingAi}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-semibold bg-[#2D2926] text-[#F9F7F2] hover:bg-[#1A1715] transition disabled:opacity-50"
            title="Redactar carta pastoral con asistencia del teólogo IA"
          >
            <Sparkles size={13} className="text-amber-400" />
            <span>{loadingAi ? 'Redactando...' : 'Carta Pastoral (IA)'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-sm text-xs font-bold bg-[#800020] hover:bg-[#660019] text-[#F9F7F2] transition shadow-xs"
          >
            <Printer size={13} />
            <span>Imprimir Boletín (Ctrl + P)</span>
          </button>
        </div>
      </div>

      {/* Page Selection Bar in Preview Mode (No Print) */}
      {activeTab === 'preview' && (
        <div className="bg-[#F0EDE6] px-4 py-2.5 rounded-md border border-[#D9D1C3] flex items-center justify-between gap-4 overflow-x-auto text-xs font-sans no-print">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#800020] uppercase tracking-wider text-[11px] mr-1 hidden sm:inline">
              Páginas del Boletín:
            </span>
            {[
              { id: 'all', label: 'Todo el Cuadernillo (Imprimible)' },
              { id: 1, label: 'Pág 1: Portada' },
              { id: 2, label: 'Pág 2: Intenciones & Directorio' },
              { id: 3, label: 'Pág 3: Enfermos & Finanzas' },
              { id: 4, label: 'Pág 4: Guía Litúrgica & Santos' },
              { id: 5, label: 'Pág 5: Carta del Párroco' },
              { id: 6, label: 'Pág 6: Anuncios & Patrocinadores' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPage(p.id as any)}
                className={`px-2.5 py-1 rounded-sm transition whitespace-nowrap border ${
                  selectedPage === p.id
                    ? 'bg-[#2D2926] text-[#F9F7F2] border-[#2D2926] font-bold shadow-2xs'
                    : 'bg-[#F9F7F2] text-[#444] border-[#D9D1C3] hover:bg-[#EAE5DC]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="text-[11px] text-[#666] italic hidden md:block">
            Formato Carta / Booklet 8.5" x 11"
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT: PREVIEW VS EDITOR */}
      {activeTab === 'preview' ? (
        <div className="space-y-12 max-w-4xl mx-auto text-[#2D2926]">
          
          {/* ================= PAGE 1: COVER (PORTADA) ================= */}
          {(selectedPage === 'all' || selectedPage === 1) && (
            <div className="bg-[#FDFBF7] p-8 sm:p-12 rounded-md border border-[#D9D1C3] shadow-md space-y-6 print:p-0 print:border-0 print:shadow-none print:break-after-page min-h-[950px] flex flex-col justify-between">
              
              {/* Header Top Motto */}
              <div>
                <div className="text-center pb-2 border-b border-[#2D2926]/40">
                  <p className="font-sans font-bold text-[11px] uppercase tracking-[0.25em] text-[#006699]">
                    {bulletin.lemaHeader}
                  </p>
                </div>

                {/* Parishes Header Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 pb-3 border-b border-[#2D2926] items-center text-[10px] font-sans leading-tight">
                  {/* Left: Main Parish */}
                  <div className="text-left space-y-0.5">
                    <span className="font-bold text-[#2D2926] uppercase text-[11px] block">{bulletin.parroquia}</span>
                    <p className="text-[#555]">{bulletin.parroquiaDireccion}</p>
                    <p className="text-[#555]">{bulletin.parroquiaTelefono}</p>
                    <p className="text-[#800020] font-mono text-[9px]">{bulletin.parroquiaEmail}</p>
                  </div>

                  {/* Center: Crest / Shield / Logo */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-16 border-2 border-[#800020] rounded-t-sm rounded-b-xl flex flex-col items-center justify-center p-1 bg-[#F5F2EB] shadow-2xs">
                      <span className="text-[#800020] text-lg font-serif font-bold">✠</span>
                      <span className="text-[7px] font-sans font-bold uppercase tracking-wider text-[#2D2926]">UNIDOS</span>
                      <span className="text-[6px] text-[#666] uppercase">ADELANTE</span>
                    </div>
                  </div>

                  {/* Right: Mission Church */}
                  <div className="text-right space-y-0.5">
                    <span className="font-bold text-[#2D2926] uppercase text-[11px] block">{bulletin.mision}</span>
                    <p className="text-[#555]">{bulletin.misionDireccion}</p>
                    <p className="text-[#555]">{bulletin.misionTelefono}</p>
                    <p className="text-[#800020] font-mono text-[9px]">{bulletin.misionEmail}</p>
                  </div>
                </div>

                {/* Liturgical Date & Title Masthead */}
                <div className="text-center pt-3 pb-2">
                  <div className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#800020] mb-1">
                    {bulletin.lemaSemanal} • {bulletin.fecha}
                  </div>
                  <h1 className="font-cinzel text-5xl sm:text-6xl font-black tracking-tight text-[#1A1715] uppercase">
                    {bulletin.nombreBoletin}
                  </h1>
                  <p className="font-sans text-[11px] font-bold tracking-[0.3em] text-[#006699] uppercase mt-1">
                    {bulletin.parroquia} & {bulletin.mision} WEEKLY BULLETIN
                  </p>
                </div>
              </div>

              {/* Sacred Art Feature Image */}
              <div className="my-2 border border-[#D9D1C3] p-2 bg-[#F5F2EB] rounded-xs shadow-xs space-y-1.5">
                <div className="overflow-hidden max-h-[460px] flex items-center justify-center bg-[#2D2926]/5 rounded-xs">
                  <img
                    src={bulletin.portadaArteUrl}
                    alt={bulletin.portadaArteTitulo}
                    className="w-full object-cover max-h-[440px] rounded-xs shadow-2xs"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback elegant liturgical banner
                      (e.target as any).src = 'https://images.unsplash.com/photo-1548625361-195fe57871b6?q=80&w=1200';
                    }}
                  />
                </div>
                {bulletin.portadaArteTitulo && (
                  <p className="text-center text-[11px] font-serif italic text-[#666]">
                    {bulletin.portadaArteTitulo}
                  </p>
                )}
              </div>

              {/* Cover Bottom: Clergy Directory & Donate QR */}
              <div className="pt-3 border-t-2 border-[#2D2926] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center font-sans text-xs">
                
                {/* Clergy Listing */}
                <div className="sm:col-span-8 space-y-1">
                  <span className="font-serif italic text-lg font-bold text-[#1A1715] block">
                    Clergy & Pastoral Leaders
                  </span>
                  <div className="space-y-0.5 text-[11px] text-[#333]">
                    {bulletin.clerigos.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="font-bold text-[#800020]">{c.titulo} {c.nombre}</span>
                        <span className="text-[#666]">— {c.rol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QR Code & Donate Button */}
                <div className="sm:col-span-4 flex items-center justify-end gap-3 bg-[#F0EDE6] p-2.5 rounded-sm border border-[#D9D1C3]">
                  <div className="w-12 h-12 bg-white p-1 border border-[#CCC] rounded-xs flex items-center justify-center shadow-2xs">
                    <QrCode size={38} className="text-[#2D2926]" />
                  </div>
                  <div className="text-left space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#666] block">Ofrenda Online</span>
                    <a
                      href={bulletin.qrDonacionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-[#D9381E] text-white font-bold text-[10px] rounded-xs uppercase tracking-wider block text-center shadow-xs"
                    >
                      DONATE
                    </a>
                  </div>
                </div>

              </div>

              {/* Page Number */}
              <div className="text-left text-[10px] font-sans font-bold text-[#888] pt-1">
                Pág. 1
              </div>

            </div>
          )}

          {/* ================= PAGE 2: MASS INTENTIONS & DIRECTORY ================= */}
          {(selectedPage === 'all' || selectedPage === 2) && (
            <div className="bg-[#FDFBF7] p-8 sm:p-12 rounded-md border border-[#D9D1C3] shadow-md space-y-6 print:p-0 print:border-0 print:shadow-none print:break-after-page min-h-[950px] flex flex-col justify-between">
              
              <div>
                {/* Header Title */}
                <div className="border-b-2 border-[#2D2926] pb-2 flex items-center justify-between">
                  <h2 className="font-cinzel text-3xl font-bold tracking-tight text-[#2D2926]">
                    Mass Intentions & Parish Directory
                  </h2>
                  <span className="text-xs font-sans text-[#800020] font-bold uppercase tracking-widest">
                    {bulletin.nombreBoletin}
                  </span>
                </div>

                {/* 2 Column Layout: Left Intentions, Right Cards & Directory */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
                  
                  {/* Left Column: Detailed Mass Schedule & Intentions (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="space-y-3 font-sans text-xs">
                      {bulletin.intencionesMisasDetalladas.map((int, i) => (
                        <div key={i} className="pb-2 border-b border-[#D9D1C3]/60 last:border-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-bold text-[#800020] text-[12px]">{int.dia}</span>
                            {int.idioma && (
                              <span className="text-[10px] font-semibold text-[#006699] uppercase bg-[#EBF5FB] px-1.5 py-0.2 rounded-xs">
                                {int.idioma}
                              </span>
                            )}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono font-bold text-[#2D2926] text-[11px] whitespace-nowrap">{int.hora}</span>
                            <span className="text-[#555] font-serif italic text-sm">{int.intencion}</span>
                          </div>
                          <span className="text-[10px] text-[#777] block mt-0.5">{int.lugar}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#F0EDE6] p-3 rounded-xs border border-[#D9D1C3] text-[10px] font-sans italic text-[#555]">
                      * Para solicitar intenciones de Misa con anticipación, comuníquese con la oficina parroquial al menos una semana antes de la fecha deseada.
                    </div>
                  </div>

                  {/* Right Column: Holy Hour Card, Office Hours & Ministry Directory (5 cols) */}
                  <div className="md:col-span-5 space-y-4 font-sans text-xs">
                    
                    {/* Holy Hour Special Graphic Card */}
                    <div className="bg-[#1A1715] text-[#F9F7F2] p-4 rounded-xs border border-[#333] space-y-2 shadow-xs">
                      <div className="flex items-center justify-between border-b border-[#444] pb-1">
                        <span className="font-serif italic text-base text-amber-300 font-bold">Holy Hour</span>
                        <span className="text-[9px] uppercase tracking-wider text-[#AAA]">Adoración Eucarística</span>
                      </div>
                      <p className="text-[11px] font-bold text-amber-200">{bulletin.horaSantaInfo?.lugar}</p>
                      <p className="text-[11px] text-[#DDD]">{bulletin.horaSantaInfo?.horario}</p>
                      <p className="text-[10px] text-[#AAA] italic border-t border-[#333] pt-1">
                        {bulletin.horaSantaInfo?.confesiones}
                      </p>
                    </div>

                    {/* Office Hours */}
                    <div className="bg-[#EBF5FB] p-3 rounded-xs border border-[#AED6F1] space-y-1 text-[#1B4F72]">
                      <span className="font-bold uppercase tracking-wider text-[10px] block">Horario de Oficina:</span>
                      <p className="text-[11px] font-medium">{bulletin.horarioOficina}</p>
                    </div>

                    {/* Ministry Directory */}
                    <div className="bg-[#F0EDE6] p-3.5 rounded-xs border border-[#D9D1C3] space-y-2">
                      <span className="font-bold uppercase tracking-[0.2em] text-[#800020] text-[10px] block border-b border-[#D9D1C3] pb-1">
                        Directorio de Ministerios
                      </span>
                      <div className="space-y-1.5 text-[10px] leading-tight">
                        {bulletin.directorioMinisterios.map((dir, i) => (
                          <div key={i} className="pb-1 border-b border-[#D9D1C3]/40 last:border-0">
                            <span className="font-bold text-[#2D2926] block uppercase text-[9px]">{dir.cargo}</span>
                            <span className="text-[#444]">{dir.nombre}</span>
                            {dir.email && <span className="text-[#800020] block font-mono text-[9px]">{dir.email}</span>}
                            {dir.telefono && <span className="text-[#555] block text-[9px]">{dir.telefono}</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Page Number */}
              <div className="flex items-center justify-between text-[10px] font-sans font-bold text-[#888] pt-2 border-t border-[#D9D1C3]">
                <span>2</span>
                <span className="italic">{bulletin.nombreBoletin} • {bulletin.fecha}</span>
              </div>

            </div>
          )}

          {/* ================= PAGE 3: PRAYER FOR SICK, AGENDA & STEWARDSHIP ================= */}
          {(selectedPage === 'all' || selectedPage === 3) && (
            <div className="bg-[#FDFBF7] p-8 sm:p-12 rounded-md border border-[#D9D1C3] shadow-md space-y-6 print:p-0 print:border-0 print:shadow-none print:break-after-page min-h-[950px] flex flex-col justify-between">
              
              <div>
                {/* Header Title */}
                <div className="border-b-2 border-[#2D2926] pb-2 flex items-center justify-between">
                  <h2 className="font-cinzel text-3xl font-bold tracking-tight text-[#2D2926]">
                    Prayer for the Sick & Stewardship
                  </h2>
                  <span className="text-xs font-sans text-[#800020] font-bold uppercase tracking-widest">
                    {bulletin.nombreBoletin}
                  </span>
                </div>

                {/* Top Half: Prayer for Sick (Left) & Parochial Agenda (Right) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
                  
                  {/* Left: Prayer for the Sick with Full Names Grid */}
                  <div className="md:col-span-6 bg-[#F5F2EB] p-4 rounded-xs border border-[#D9D1C3] space-y-3 font-sans text-xs">
                    <div className="flex items-center gap-2 border-b border-[#D9D1C3] pb-1.5">
                      <Heart size={14} className="text-[#800020]" />
                      <h3 className="font-serif italic font-bold text-base text-[#800020]">
                        Prayer for the Sick / Oración por los Enfermos
                      </h3>
                    </div>
                    <p className="font-serif italic text-xs text-[#444] leading-relaxed">
                      {bulletin.oracionEnfermosTexto}
                    </p>
                    
                    {/* Names Grid */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-[#333] pt-1 border-t border-[#D9D1C3]">
                      {bulletin.enfermosList.map((name, i) => (
                        <div key={i} className="truncate">• {name}</div>
                      ))}
                    </div>

                    <div className="bg-[#F0EDE6] p-2 rounded-xs border border-[#D9D1C3] text-[9px] text-[#666] italic">
                      Para unción de enfermos de urgencia en La Pryor o Batesville, llame a la oficina parroquial o al Pbro. Alan Sánchez al (956) 740-1370.
                    </div>
                  </div>

                  {/* Right: Parochial Agenda */}
                  <div className="md:col-span-6 space-y-3 font-sans text-xs">
                    <div className="flex items-center gap-2 border-b border-[#D9D1C3] pb-1.5">
                      <Calendar size={14} className="text-[#006699]" />
                      <h3 className="font-serif italic font-bold text-base text-[#006699]">
                        Parochial Agenda / Actividades de la Semana
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {bulletin.agendaSemanal.map((ag, i) => (
                        <div key={i} className="p-2 bg-[#F0EDE6] rounded-xs border-l-2 border-[#006699] flex items-start justify-between gap-2 text-[11px]">
                          <div>
                            <span className="font-bold text-[#2D2926] block">{ag.evento}</span>
                            <span className="text-[#666] text-[10px]">{ag.lugar}</span>
                          </div>
                          <div className="text-right whitespace-nowrap">
                            <span className="font-bold text-[#006699] block text-[10px]">{ag.fecha}</span>
                            <span className="font-mono text-[9px] text-[#555]">{ag.hora}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Half: Stewardship / Diezmos y Ofrendas & Sanctuary Candle */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-[#D9D1C3] mt-6">
                  
                  {/* Stewardship / Diezmos */}
                  <div className="md:col-span-7 bg-[#F0EDE6] p-4 rounded-xs border border-[#D9D1C3] space-y-3 font-sans text-xs">
                    <div className="flex items-center gap-2 border-b border-[#D9D1C3] pb-1">
                      <DollarSign size={14} className="text-[#800020]" />
                      <h3 className="font-serif italic font-bold text-base text-[#800020]">
                        Diezmos y Ofrendas / Weekly Stewardship
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {bulletin.diezmosYOfrendas.map((st, i) => (
                        <div key={i} className="bg-[#FDFBF7] p-3 rounded-xs border border-[#D9D1C3] space-y-1 text-[10px]">
                          <span className="font-bold text-[#2D2926] text-[11px] block border-b border-[#D9D1C3] pb-0.5">{st.comunidad}</span>
                          <div className="flex justify-between">
                            <span className="text-[#666]">Meta semanal:</span>
                            <span className="font-mono font-bold text-[#333]">{st.necesarioSemanal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#666]">Colecta del mes:</span>
                            <span className="font-mono font-bold text-[#333]">{st.colectaMes}</span>
                          </div>
                          <div className="flex justify-between border-t border-[#D9D1C3]/60 pt-1 text-[#800020]">
                            <span className="font-bold">Donación semana:</span>
                            <span className="font-mono font-bold text-xs">{st.donacionSemana}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-[9px] text-[#666] italic text-center">
                      «Tu donación es un sacrificio que se une al de Cristo para edificar su Iglesia. ¡Dios bendiga a los bienhechores!»
                    </p>
                  </div>

                  {/* Sanctuary Candle Dedication */}
                  <div className="md:col-span-5 bg-[#F5F2EB] p-4 rounded-xs border border-[#D9D1C3] space-y-3 font-sans text-xs flex flex-col justify-between">
                    <div>
                      <span className="font-serif italic font-bold text-base text-[#800020] block border-b border-[#D9D1C3] pb-1">
                        Sanctuary Candle / Velas del Sagrario
                      </span>
                      <div className="space-y-2 text-[10px] text-[#444] pt-2">
                        {bulletin.velasSagrario.map((vc, i) => (
                          <div key={i} className="p-2 bg-[#FDFBF7] rounded-xs border border-[#D9D1C3]">
                            <span className="font-bold text-[#800020] block">{vc.parroquia}</span>
                            <p className="italic mt-0.5">{vc.intencion}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-[9px] text-[#777] italic text-center pt-2">
                      Comuníquese con la oficina si desea encender la vela del Sagrario en memoria de un ser querido.
                    </p>
                  </div>

                </div>
              </div>

              {/* Page Number */}
              <div className="flex items-center justify-between text-[10px] font-sans font-bold text-[#888] pt-2 border-t border-[#D9D1C3]">
                <span>3</span>
                <span className="italic">{bulletin.nombreBoletin} • {bulletin.fecha}</span>
              </div>

            </div>
          )}

          {/* ================= PAGE 4: LITURGICAL GUIDE & WEEKLY SAINTS ================= */}
          {(selectedPage === 'all' || selectedPage === 4) && (
            <div className="bg-[#FDFBF7] p-8 sm:p-12 rounded-md border border-[#D9D1C3] shadow-md space-y-6 print:p-0 print:border-0 print:shadow-none print:break-after-page min-h-[950px] flex flex-col justify-between">
              
              <div>
                {/* Header Title */}
                <div className="border-b-2 border-[#2D2926] pb-2 flex items-center justify-between">
                  <h2 className="font-cinzel text-3xl font-bold tracking-tight text-[#2D2926]">
                    Liturgia & Esta Semana en Casa
                  </h2>
                  <span className="text-xs font-sans text-[#800020] font-bold uppercase tracking-widest">
                    {bulletin.nombreBoletin}
                  </span>
                </div>

                {/* Top Section: Sunday Reflection */}
                <div className="pt-4 space-y-3">
                  <div className="bg-[#F5F2EB] p-5 rounded-xs border border-[#D9D1C3] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-1">
                      <h3 className="font-serif italic font-bold text-xl text-[#800020]">
                        {bulletin.reflexionDomingo?.titulo}
                      </h3>
                      <span className="text-xs font-sans font-bold text-[#006699]">
                        {bulletin.reflexionDomingo?.cita}
                      </span>
                    </div>
                    <p className="font-serif text-[15px] leading-relaxed text-[#2D2926] text-justify">
                      {bulletin.reflexionDomingo?.texto}
                    </p>
                    <div className="bg-[#FDFBF7] p-3 rounded-xs border border-[#D9D1C3] text-xs font-serif italic text-[#555]">
                      <strong className="text-[#800020] font-sans not-italic">Oración: </strong>
                      {bulletin.reflexionDomingo?.oracion}
                    </div>
                  </div>
                </div>

                {/* Bottom Section: "Esta Semana en Casa" (Santos de la Semana Lunes a Sábado) */}
                <div className="pt-6 space-y-3">
                  <div className="flex items-center gap-2 border-b border-[#D9D1C3] pb-1">
                    <BookOpen size={15} className="text-[#800020]" />
                    <h3 className="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#800020]">
                      Esta Semana en Casa / Daily Saints & Scriptures
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-sans text-xs">
                    {bulletin.semanaEnCasa?.map((s, i) => (
                      <div key={i} className="bg-[#F0EDE6] p-3 rounded-xs border border-[#D9D1C3] space-y-1.5 flex flex-col justify-between">
                        <div>
                          <span className="font-bold text-[#006699] text-[11px] block">{s.dia}</span>
                          <span className="font-serif italic font-bold text-sm text-[#2D2926] block">{s.santo}</span>
                          <p className="text-[10px] text-[#555] font-serif line-clamp-3 mt-1 leading-snug">{s.resumen}</p>
                        </div>
                        <div className="pt-1.5 border-t border-[#D9D1C3] text-[9px] text-[#800020] font-mono font-semibold">
                          {s.lecturas}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Page Number */}
              <div className="flex items-center justify-between text-[10px] font-sans font-bold text-[#888] pt-2 border-t border-[#D9D1C3]">
                <span>4</span>
                <span className="italic">{bulletin.nombreBoletin} • {bulletin.fecha}</span>
              </div>

            </div>
          )}

          {/* ================= PAGE 5: FROM THE PASTOR & PARISHIONERS ================= */}
          {(selectedPage === 'all' || selectedPage === 5) && (
            <div className="bg-[#FDFBF7] p-8 sm:p-12 rounded-md border border-[#D9D1C3] shadow-md space-y-6 print:p-0 print:border-0 print:shadow-none print:break-after-page min-h-[950px] flex flex-col justify-between">
              
              <div>
                {/* Header Title */}
                <div className="border-b-2 border-[#2D2926] pb-2 flex items-center justify-between">
                  <h2 className="font-cinzel text-3xl font-bold tracking-tight text-[#2D2926]">
                    From The Pastor & Parishioners
                  </h2>
                  <span className="text-xs font-sans text-[#800020] font-bold uppercase tracking-widest">
                    {bulletin.nombreBoletin}
                  </span>
                </div>

                <div className="pt-4 space-y-6">
                  
                  {/* From the Pastor Letter */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="h-[1px] w-6 bg-[#800020]"></span>
                      <h3 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#800020]">
                        Carta Pastoral del Párroco / From The Pastor
                      </h3>
                    </div>

                    <div className="bg-[#F5F2EB] p-6 rounded-xs border border-[#D9D1C3] font-serif text-[15px] leading-relaxed text-[#2D2926] space-y-3">
                      <p className="whitespace-pre-line text-justify">
                        {bulletin.mensajePastor}
                      </p>
                      
                      <div className="pt-3 border-t border-[#D9D1C3] flex items-center justify-between">
                        <span className="font-serif italic text-xs text-[#666]">Pax et Bonum,</span>
                        <div className="text-right">
                          <span className="font-serif italic font-bold text-base text-[#800020] block">
                            {bulletin.parroco}
                          </span>
                          <span className="text-[10px] font-sans uppercase tracking-wider text-[#666]">
                            Administrador Parroquial
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* From the Parishioners / Testimony Section */}
                  {bulletin.articuloFeligres && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3">
                        <span className="h-[1px] w-6 bg-[#006699]"></span>
                        <h3 className="uppercase font-sans text-xs tracking-[0.2em] font-bold text-[#006699]">
                          From The Parishioners / Voz de la Comunidad
                        </h3>
                      </div>

                      <div className="bg-[#F0EDE6] p-5 rounded-xs border border-[#D9D1C3] space-y-2 font-serif">
                        <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-1">
                          <h4 className="font-bold text-sm text-[#2D2926]">{bulletin.articuloFeligres.titulo}</h4>
                          <span className="text-xs italic text-[#666]">{bulletin.articuloFeligres.autor}</span>
                        </div>
                        <p className="text-xs italic text-[#800020] font-sans">
                          {bulletin.articuloFeligres.versiculoBiblico}
                        </p>
                        <p className="text-[13px] leading-relaxed text-[#333] text-justify">
                          {bulletin.articuloFeligres.texto}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Page Number */}
              <div className="flex items-center justify-between text-[10px] font-sans font-bold text-[#888] pt-2 border-t border-[#D9D1C3]">
                <span>5</span>
                <span className="italic">{bulletin.nombreBoletin} • {bulletin.fecha}</span>
              </div>

            </div>
          )}

          {/* ================= PAGE 6: ANNOUNCEMENTS, REPORT & SPONSORS ================= */}
          {(selectedPage === 'all' || selectedPage === 6) && (
            <div className="bg-[#FDFBF7] p-8 sm:p-12 rounded-md border border-[#D9D1C3] shadow-md space-y-6 print:p-0 print:border-0 print:shadow-none print:break-after-page min-h-[950px] flex flex-col justify-between">
              
              <div>
                {/* Header Title */}
                <div className="border-b-2 border-[#2D2926] pb-2 flex items-center justify-between">
                  <h2 className="font-cinzel text-3xl font-bold tracking-tight text-[#2D2926]">
                    Announcements & Sponsors
                  </h2>
                  <span className="text-xs font-sans text-[#800020] font-bold uppercase tracking-widest">
                    {bulletin.nombreBoletin}
                  </span>
                </div>

                <div className="pt-4 space-y-6">
                  
                  {/* Visual Announcements Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bulletin.anunciosGraficos.map((an, i) => (
                      <div key={i} className="p-4 rounded-xs border border-[#D9D1C3] bg-[#F0EDE6] space-y-1.5 font-sans">
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-xs ${
                            an.categoria === 'bingo' ? 'bg-purple-100 text-purple-800' :
                            an.categoria === 'verano' ? 'bg-teal-100 text-teal-800' :
                            an.categoria === 'evento' ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-800'
                          }`}>
                            {an.fecha}
                          </span>
                        </div>
                        <h4 className="font-bold text-[#2D2926] text-xs uppercase">{an.titulo}</h4>
                        <p className="text-[11px] font-serif italic text-[#800020]">{an.subtitulo}</p>
                        <p className="text-[10px] text-[#555] leading-snug">{an.descripcion}</p>
                      </div>
                    ))}
                  </div>

                  {/* Financial Report Table (Festival / Raffle Report) */}
                  {bulletin.reporteFestival && (
                    <div className="bg-[#F5F2EB] p-4 rounded-xs border border-[#D9D1C3] space-y-2 font-sans text-xs">
                      <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-1">
                        <span className="font-bold text-[#800020] uppercase text-[11px]">{bulletin.reporteFestival.titulo}</span>
                        <span className="text-[10px] text-[#666]">{bulletin.reporteFestival.fecha}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px]">
                        {bulletin.reporteFestival.booths.map((b, i) => (
                          <div key={i} className="p-1.5 bg-[#FDFBF7] rounded-xs border border-[#D9D1C3]">
                            <span className="font-semibold text-[#2D2926] block truncate">{b.nombre}</span>
                            <span className="text-[9px] text-[#666] block">{b.patrocinador}</span>
                            <span className="font-mono font-bold text-[#006699]">{b.monto}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#D9D1C3] text-[11px] font-bold">
                        <span>Ingresos: <strong className="font-mono">{bulletin.reporteFestival.ingresos}</strong></span>
                        <span>Gastos: <strong className="font-mono text-red-700">{bulletin.reporteFestival.gastos}</strong></span>
                        <span className="text-[#800020]">Ganancia Parroquia: <strong className="font-mono text-sm">{bulletin.reporteFestival.ganancia}</strong></span>
                      </div>
                    </div>
                  )}

                  {/* Sponsors / Advertisers Grid */}
                  <div className="space-y-2 font-sans">
                    <div className="flex items-center justify-between border-b border-[#D9D1C3] pb-1">
                      <span className="font-bold text-xs uppercase tracking-[0.2em] text-[#800020]">
                        Patrocinadores Parroquiales / Advertise Here
                      </span>
                      <span className="text-[10px] text-[#777] italic">Apoye a los negocios de nuestra comunidad</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                      {bulletin.patrocinadores.map((sp, i) => (
                        <div key={i} className="p-3 bg-[#F0EDE6] rounded-xs border border-[#D9D1C3] space-y-1 flex flex-col justify-between">
                          <div>
                            <span className="font-bold text-[#2D2926] text-[11px] block">{sp.negocio}</span>
                            <span className="text-[9px] text-[#555] block">{sp.rubro}</span>
                            <span className="text-[9px] text-[#800020] font-medium block">{sp.contacto}</span>
                          </div>
                          <div className="pt-1 border-t border-[#D9D1C3] font-mono text-[10px] font-bold text-[#2D2926]">
                            {sp.telefono}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sacrament Dress Code Guidelines */}
                  {bulletin.codigoVestimenta && (
                    <div className="bg-[#EBF5FB] p-3 rounded-xs border border-[#AED6F1] font-sans text-[10px] space-y-1 text-[#1B4F72]">
                      <span className="font-bold uppercase tracking-wider block">Código de Vestimenta para Sacramentos:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div><strong>Niñas (Comunión/Confirmación):</strong> {bulletin.codigoVestimenta.ninas}</div>
                        <div><strong>Niños (Comunión/Confirmación):</strong> {bulletin.codigoVestimenta.ninos}</div>
                        <div className="text-red-700"><strong>No permitido:</strong> {bulletin.codigoVestimenta.prohibido}</div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Page Number */}
              <div className="flex items-center justify-between text-[10px] font-sans font-bold text-[#888] pt-2 border-t border-[#D9D1C3]">
                <span>6</span>
                <span className="italic">{bulletin.nombreBoletin} • {bulletin.fecha}</span>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* ================= DATA EDITOR FORM ================= */
        <div className="bg-[#FDFBF7] p-6 sm:p-10 rounded-md border border-[#D9D1C3] shadow-xs space-y-8 font-sans text-xs max-w-4xl mx-auto">
          <div className="border-b border-[#D9D1C3] pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-serif italic font-bold text-xl text-[#2D2926]">
                Editor de Contenido del Boletín
              </h3>
              <p className="text-xs text-[#666]">Modifica los datos en tiempo real para verlos reflejados en el diseño editorial impreso.</p>
            </div>
            <button
              onClick={() => setActiveTab('preview')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#800020] text-white rounded-sm font-bold shadow-xs hover:bg-[#660019]"
            >
              <Eye size={13} />
              <span>Ver Resultado</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#444] block mb-1">Nombre del Boletín:</label>
              <input
                type="text"
                value={bulletin.nombreBoletin}
                onChange={(e) => setBulletin({ ...bulletin, nombreBoletin: e.target.value })}
                className="w-full bg-[#F0EDE6] border border-[#D9D1C3] rounded-sm p-2 text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-[#444] block mb-1">Lema Superior:</label>
              <input
                type="text"
                value={bulletin.lemaHeader}
                onChange={(e) => setBulletin({ ...bulletin, lemaHeader: e.target.value })}
                className="w-full bg-[#F0EDE6] border border-[#D9D1C3] rounded-sm p-2 text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-[#444] block mb-1">Parroquia Principal:</label>
              <input
                type="text"
                value={bulletin.parroquia}
                onChange={(e) => setBulletin({ ...bulletin, parroquia: e.target.value })}
                className="w-full bg-[#F0EDE6] border border-[#D9D1C3] rounded-sm p-2 text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-[#444] block mb-1">Misión o Capilla:</label>
              <input
                type="text"
                value={bulletin.mision}
                onChange={(e) => setBulletin({ ...bulletin, mision: e.target.value })}
                className="w-full bg-[#F0EDE6] border border-[#D9D1C3] rounded-sm p-2 text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-[#444] block mb-1">Párroco / Administrador:</label>
              <input
                type="text"
                value={bulletin.parroco}
                onChange={(e) => setBulletin({ ...bulletin, parroco: e.target.value })}
                className="w-full bg-[#F0EDE6] border border-[#D9D1C3] rounded-sm p-2 text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-[#444] block mb-1">URL de Arte Sacro (Portada):</label>
              <input
                type="text"
                value={bulletin.portadaArteUrl}
                onChange={(e) => setBulletin({ ...bulletin, portadaArteUrl: e.target.value })}
                className="w-full bg-[#F0EDE6] border border-[#D9D1C3] rounded-sm p-2 text-xs font-mono"
              />
            </div>
          </div>

          {/* Pastor Letter textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#444]">Mensaje del Párroco (From The Pastor):</label>
              <button
                onClick={handleGenerateAiMessage}
                disabled={loadingAi}
                className="text-[11px] text-[#800020] font-bold hover:underline flex items-center gap-1"
              >
                <Sparkles size={11} />
                {loadingAi ? 'Generando...' : 'Re-generar con IA'}
              </button>
            </div>
            <textarea
              rows={8}
              value={bulletin.mensajePastor}
              onChange={(e) => setBulletin({ ...bulletin, mensajePastor: e.target.value })}
              className="w-full bg-[#F0EDE6] border border-[#D9D1C3] rounded-sm p-3 font-serif text-sm leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setActiveTab('preview')}
              className="px-6 py-2 bg-[#800020] text-white rounded-sm font-bold shadow-xs hover:bg-[#660019]"
            >
              Guardar y Previsualizar Cuadernillo
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
