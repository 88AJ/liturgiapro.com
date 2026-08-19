import { Cantico, SchemaCantosMisa } from '../types/liturgia';
import { CANTICOS_LIST } from '../data/liturgyData';

/**
 * Intelligently suggests liturgical songs based on the liturgical season,
 * celebration, color, and feast characteristics.
 */
export function getSuggestedChantsForDay(
  tiempoLiturgico: string,
  color: string,
  tituloCelebracion: string
): SchemaCantosMisa {
  const t = (tiempoLiturgico || '').toLowerCase();
  const c = (color || '').toLowerCase();
  const cel = (tituloCelebracion || '').toLowerCase();

  // 1. Marian Feasts (Guadalupe, Asunción, Carmen, etc.)
  if (cel.includes('maría') || cel.includes('virgen') || cel.includes('guadalupe') || cel.includes('asunción') || cel.includes('rosario')) {
    return {
      entrada: 'Junto a Ti, María',
      kyrie: 'Señor, Ten Piedad (Mejía)',
      gloria: 'Gloria a Dios en el Cielo (Palazón)',
      salmo: 'Salmo 44 - De pie a tu derecha está la reina',
      aleluya: 'Aleluya Tradicional Gregoriano',
      ofertorio: 'Te Ofrecemos, Padre Nuestro',
      santo: 'Santo (Gen Rosso / Mejía)',
      paz: 'Paz en la Tierra',
      cordero: 'Cordero de Dios (Rito de la Paz)',
      comunion: 'Yo soy el Pan de Vida',
      salida: 'La Guadalupana (Desde el cielo una hermosa mañana)',
      mariano: 'Santa María del Camino'
    };
  }

  // 2. Lent / Cuaresma / Holy Week
  if (t.includes('cuaresma') || t.includes('semana santa')) {
    return {
      entrada: 'Hacia ti, morada santa',
      kyrie: 'Señor, Ten Piedad (Kyrie Cuaresmal)',
      gloria: '', // No Gloria in Lent
      salmo: 'Salmo 50 - Misericordia, Señor, hemos pecado',
      aleluya: 'Honor y gloria a ti, Señor Jesús',
      ofertorio: 'Entre tus manos pongo mi existir',
      santo: 'Santo (Gen Rosso / Mejía)',
      paz: 'Cordero de Dios (Rito de la Paz)',
      cordero: 'Cordero de Dios (Rito de la Paz)',
      comunion: 'No podemos caminar con hambre bajo el sol',
      salida: 'Perdona a tu pueblo, Señor',
      mariano: 'Dolorosa de pie junto a la Cruz'
    };
  }

  // 3. Easter / Pascua
  if (t.includes('pascua') || t.includes('octava')) {
    return {
      entrada: 'Cantando la alegría de vivir',
      kyrie: 'Señor, Ten Piedad (Pascual)',
      gloria: 'Gloria a Dios en el Cielo (Palazón)',
      salmo: 'Salmo 117 - Éste es el día en que actuó el Señor',
      aleluya: 'Aleluya Pascual (El Señor resucitó)',
      ofertorio: 'Saber que vendrás',
      santo: 'Santo Solemne (Haugen)',
      paz: 'La paz esté con nosotros',
      cordero: 'Cordero de Dios (Rito de la Paz)',
      comunion: 'Yo soy el Pan de Vida',
      salida: 'Resucitó, Resucitó, Resucitó, ¡Aleluya!',
      mariano: 'Reina del Cielo, alégrate (Regina Coeli)'
    };
  }

  // 4. Advent / Adviento
  if (t.includes('adviento')) {
    return {
      entrada: 'Ven, Señor, no tardes más',
      kyrie: 'Señor, Ten Piedad (Mejía)',
      gloria: '', // No Gloria in Advent
      salmo: 'Salmo 24 - A ti, Señor, levanto mi alma',
      aleluya: 'Aleluya - Preparen el camino del Señor',
      ofertorio: 'Te ofrecemos, Señor, este pan y este vino',
      santo: 'Santo (Gen Rosso / Mejía)',
      paz: 'Paz en la Tierra',
      cordero: 'Cordero de Dios (Rito de la Paz)',
      comunion: 'Oh Ven, Emmanuel',
      salida: 'La Virgen sueña caminos',
      mariano: 'Santa María de la Esperanza'
    };
  }

  // 5. Christmas / Navidad
  if (t.includes('navidad') || t.includes('epifanía')) {
    return {
      entrada: 'Vamos, pastores, vamos',
      kyrie: 'Señor, Ten Piedad (Mejía)',
      gloria: 'Gloria in Excelsis Deo (Villancico)',
      salmo: 'Salmo 97 - Los confines de la tierra han visto la salvación',
      aleluya: 'Aleluya - Les anuncio una gran alegría',
      ofertorio: 'Los pastores a Belén',
      santo: 'Santo (Gen Rosso / Mejía)',
      paz: 'Noche de Paz',
      cordero: 'Cordero de Dios (Rito de la Paz)',
      comunion: 'Campana sobre campana',
      salida: 'El Niño del Tambor',
      mariano: 'Madre del Redentor'
    };
  }

  // 6. Ordinary Time / Tiempo Ordinario (Default)
  return {
    entrada: 'Vienen con alegría, Señor',
    kyrie: 'Señor, Ten Piedad (Mejía)',
    gloria: c === 'blanco' ? 'Gloria a Dios en el Cielo (Palazón)' : '',
    salmo: 'Salmo 22 - El Señor es mi pastor, nada me falta',
    aleluya: 'Aleluya Tradicional Gregoriano',
    ofertorio: 'Te Ofrecemos, Padre Nuestro',
    santo: 'Santo (Gen Rosso / Mejía)',
    paz: 'Paz en la Tierra',
    cordero: 'Cordero de Dios (Rito de la Paz)',
    comunion: 'Pescador de Hombres (Tú has venido a la orilla)',
    salida: 'Demos gracias al Señor, demos gracias',
    mariano: 'Junto a Ti, María'
  };
}
