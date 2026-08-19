/**
 * Utility to generate authentic Catholic Lectionary (Leccionario Romano / Misal)
 * introductory proclamation formulas from scripture citations.
 */

export function getLectionaryIntroduction(cita: string = '', tipo: 'primera' | 'segunda' | 'evangelio' = 'primera'): string {
  const c = (cita || '').trim();
  const lower = c.toLowerCase();

  // Gospel formulas
  if (tipo === 'evangelio' || lower.includes('mateo') || lower.includes('marcos') || lower.includes('lucas') || lower.includes('juan') || lower.startsWith('mt') || lower.startsWith('mc') || lower.startsWith('lc') || lower.startsWith('jn')) {
    if (lower.includes('mateo') || lower.startsWith('mt')) return 'Lectura del santo Evangelio según san Mateo';
    if (lower.includes('marcos') || lower.startsWith('mc')) return 'Lectura del santo Evangelio según san Marcos';
    if (lower.includes('lucas') || lower.startsWith('lc')) return 'Lectura del santo Evangelio según san Lucas';
    if (lower.includes('juan') || lower.startsWith('jn')) return 'Lectura del santo Evangelio según san Juan';
    return 'Lectura del santo Evangelio';
  }

  // Letters of St. Paul
  if (lower.includes('romanos') || lower.startsWith('rm') || lower.startsWith('rom')) return 'Lectura de la carta del apóstol san Pablo a los Romanos';
  if (lower.includes('1 corintios') || lower.includes('1cor') || lower.includes('1 cor') || lower.startsWith('1 co')) return 'Lectura de la primera carta del apóstol san Pablo a los Corintios';
  if (lower.includes('2 corintios') || lower.includes('2cor') || lower.includes('2 cor') || lower.startsWith('2 co')) return 'Lectura de la segunda carta del apóstol san Pablo a los Corintios';
  if (lower.includes('gálatas') || lower.includes('galatas') || lower.startsWith('ga') || lower.startsWith('gál')) return 'Lectura de la carta del apóstol san Pablo a los Gálatas';
  if (lower.includes('efesios') || lower.startsWith('ef')) return 'Lectura de la carta del apóstol san Pablo a los Efesios';
  if (lower.includes('filipenses') || lower.startsWith('flp') || lower.startsWith('fil')) return 'Lectura de la carta del apóstol san Pablo a los Filipenses';
  if (lower.includes('colosenses') || lower.startsWith('col')) return 'Lectura de la carta del apóstol san Pablo a los Colosenses';
  if (lower.includes('1 tesalonicenses') || lower.includes('1tes') || lower.startsWith('1 ts')) return 'Lectura de la primera carta del apóstol san Pablo a los Tesalonicenses';
  if (lower.includes('2 tesalonicenses') || lower.includes('2tes') || lower.startsWith('2 ts')) return 'Lectura de la segunda carta del apóstol san Pablo a los Tesalonicenses';
  if (lower.includes('1 timoteo') || lower.includes('1tim') || lower.startsWith('1 tm')) return 'Lectura de la primera carta del apóstol san Pablo a Timoteo';
  if (lower.includes('2 timoteo') || lower.includes('2tim') || lower.startsWith('2 tm')) return 'Lectura de la segunda carta del apóstol san Pablo a Timoteo';
  if (lower.includes('tito') || lower.startsWith('tit')) return 'Lectura de la carta del apóstol san Pablo a Tito';
  if (lower.includes('filemón') || lower.includes('filemon') || lower.startsWith('flm')) return 'Lectura de la carta del apóstol san Pablo a Filemón';
  if (lower.includes('hebreos') || lower.startsWith('hb') || lower.startsWith('heb')) return 'Lectura de la carta a los Hebreos';

  // Catholic Epistles
  if (lower.includes('santiago') || lower.startsWith('stgo') || lower.startsWith('st')) return 'Lectura de la carta del apóstol Santiago';
  if (lower.includes('1 pedro') || lower.includes('1pedro') || lower.includes('1 p') || lower.startsWith('1p')) return 'Lectura de la primera carta del apóstol san Pedro';
  if (lower.includes('2 pedro') || lower.includes('2pedro') || lower.includes('2 p') || lower.startsWith('2p')) return 'Lectura de la segunda carta del apóstol san Pedro';
  if (lower.includes('1 juan') || lower.includes('1juan') || lower.includes('1 jn') || lower.startsWith('1jn')) return 'Lectura de la primera carta del apóstol san Juan';
  if (lower.includes('2 juan') || lower.includes('2juan') || lower.includes('2 jn') || lower.startsWith('2jn')) return 'Lectura de la segunda carta del apóstol san Juan';
  if (lower.includes('3 juan') || lower.includes('3juan') || lower.includes('3 jn') || lower.startsWith('3jn')) return 'Lectura de la tercera carta del apóstol san Juan';
  if (lower.includes('judas') || lower.startsWith('jds')) return 'Lectura de la carta del apóstol san Judas';

  // New Testament Historical & Prophetic
  if (lower.includes('hechos') || lower.startsWith('hch') || lower.startsWith('act')) return 'Lectura del libro de los Hechos de los Apóstoles';
  if (lower.includes('apocalipsis') || lower.startsWith('ap') || lower.startsWith('apoc')) return 'Lectura del libro del Apocalipsis del apóstol san Juan';

  // Old Testament Prophets
  if (lower.includes('ezequiel') || lower.startsWith('ez')) return 'Lectura del libro del profeta Ezequiel';
  if (lower.includes('isaías') || lower.includes('isaias') || lower.startsWith('is')) return 'Lectura del libro del profeta Isaías';
  if (lower.includes('jeremías') || lower.includes('jeremias') || lower.startsWith('jr')) return 'Lectura del libro del profeta Jeremías';
  if (lower.includes('daniel') || lower.startsWith('dn')) return 'Lectura del libro del profeta Daniel';
  if (lower.includes('oseas') || lower.startsWith('os')) return 'Lectura del libro del profeta Oseas';
  if (lower.includes('joel') || lower.startsWith('jl')) return 'Lectura del libro del profeta Joel';
  if (lower.includes('amós') || lower.includes('amos') || lower.startsWith('am')) return 'Lectura del libro del profeta Amós';
  if (lower.includes('abdías') || lower.includes('abdias') || lower.startsWith('abd')) return 'Lectura del libro del profeta Abdías';
  if (lower.includes('jonás') || lower.includes('jonas') || lower.startsWith('jon')) return 'Lectura del libro del profeta Jonás';
  if (lower.includes('miqueas') || lower.startsWith('miq')) return 'Lectura del libro del profeta Miqueas';
  if (lower.includes('nahúm') || lower.includes('nahum') || lower.startsWith('nah')) return 'Lectura del libro del profeta Nahúm';
  if (lower.includes('habacuc') || lower.startsWith('hab')) return 'Lectura del libro del profeta Habacuc';
  if (lower.includes('sofonías') || lower.includes('sofonias') || lower.startsWith('sof')) return 'Lectura del libro del profeta Sofonías';
  if (lower.includes('ageo') || lower.startsWith('ag')) return 'Lectura del libro del profeta Ageo';
  if (lower.includes('zacarías') || lower.includes('zacarias') || lower.startsWith('zac')) return 'Lectura del libro del profeta Zacarías';
  if (lower.includes('malaquías') || lower.includes('malaquias') || lower.startsWith('mal')) return 'Lectura del libro del profeta Malaquías';
  if (lower.includes('baruc') || lower.startsWith('ba')) return 'Lectura del libro del profeta Baruc';
  if (lower.includes('lamentaciones') || lower.startsWith('lam')) return 'Lectura del libro de las Lamentaciones';

  // Pentateuch / Torah
  if (lower.includes('génesis') || lower.includes('genesis') || lower.startsWith('gn') || lower.startsWith('gen')) return 'Lectura del libro del Génesis';
  if (lower.includes('éxodo') || lower.includes('exodo') || lower.startsWith('ex')) return 'Lectura del libro del Éxodo';
  if (lower.includes('levítico') || lower.includes('levitico') || lower.startsWith('lv') || lower.startsWith('lev')) return 'Lectura del libro del Levítico';
  if (lower.includes('números') || lower.includes('numeros') || lower.startsWith('nm') || lower.startsWith('num')) return 'Lectura del libro de los Números';
  if (lower.includes('deuteronomio') || lower.startsWith('dt')) return 'Lectura del libro del Deuteronomio';

  // Historical Books
  if (lower.includes('josué') || lower.includes('josue') || lower.startsWith('jos')) return 'Lectura del libro de Josué';
  if (lower.includes('jueces') || lower.startsWith('jue')) return 'Lectura del libro de los Jueces';
  if (lower.includes('rut') || lower.startsWith('rt')) return 'Lectura del libro de Rut';
  if (lower.includes('1 samuel') || lower.includes('1sam') || lower.includes('1 sam') || lower.startsWith('1 s')) return 'Lectura del primer libro de Samuel';
  if (lower.includes('2 samuel') || lower.includes('2sam') || lower.includes('2 sam') || lower.startsWith('2 s')) return 'Lectura del segundo libro de Samuel';
  if (lower.includes('1 reyes') || lower.includes('1reyes') || lower.includes('1 r') || lower.startsWith('1 re')) return 'Lectura del primer libro de los Reyes';
  if (lower.includes('2 reyes') || lower.includes('2reyes') || lower.includes('2 r') || lower.startsWith('2 re')) return 'Lectura del segundo libro de los Reyes';
  if (lower.includes('1 crónicas') || lower.includes('1 cronicas') || lower.includes('1 cro') || lower.startsWith('1 cr')) return 'Lectura del primer libro de las Crónicas';
  if (lower.includes('2 crónicas') || lower.includes('2 cronicas') || lower.includes('2 cro') || lower.startsWith('2 cr')) return 'Lectura del segundo libro de las Crónicas';
  if (lower.includes('esdras') || lower.startsWith('esd')) return 'Lectura del libro de Esdras';
  if (lower.includes('nehemías') || lower.includes('nehemias') || lower.startsWith('neh')) return 'Lectura del libro de Nehemías';
  if (lower.includes('tobías') || lower.includes('tobias') || lower.startsWith('tb')) return 'Lectura del libro de Tobías';
  if (lower.includes('judit') || lower.startsWith('jdt')) return 'Lectura del libro de Judit';
  if (lower.includes('ester') || lower.startsWith('est')) return 'Lectura del libro de Ester';
  if (lower.includes('1 macabeos') || lower.includes('1mac') || lower.startsWith('1 m')) return 'Lectura del primer libro de los Macabeos';
  if (lower.includes('2 macabeos') || lower.includes('2mac') || lower.startsWith('2 m')) return 'Lectura del segundo libro de los Macabeos';

  // Wisdom & Poetry
  if (lower.includes('job')) return 'Lectura del libro de Job';
  if (lower.includes('proverbios') || lower.startsWith('pr') || lower.startsWith('prov')) return 'Lectura del libro de los Proverbios';
  if (lower.includes('eclesiastés') || lower.includes('eclesiastes') || lower.includes('qohélet') || lower.includes('qohelet') || lower.startsWith('ecl') || lower.startsWith('qoh')) return 'Lectura del libro del Eclesiastés (Qohélet)';
  if (lower.includes('cantar') || lower.startsWith('ct')) return 'Lectura del Cantar de los Cantares';
  if (lower.includes('sabiduría') || lower.includes('sabiduria') || lower.startsWith('sb') || lower.startsWith('sab')) return 'Lectura del libro de la Sabiduría';
  if (lower.includes('eclesiástico') || lower.includes('eclesiastico') || lower.includes('sirácide') || lower.includes('siracide') || lower.startsWith('si') || lower.startsWith('eclo')) return 'Lectura del libro del Eclesiástico (Sirácide)';

  // Fallback
  return tipo === 'segunda' ? 'Lectura de la Sagrada Escritura' : 'Lectura de la Palabra de Dios';
}

/**
 * Returns the exact proclamation evangelist name for the liturgical dialogue:
 * e.g. "san Mateo", "san Marcos", "san Lucas", "san Juan"
 */
export function getGospelEvangelistName(cita: string = ''): string {
  const lower = cita.toLowerCase();
  if (lower.includes('mateo') || lower.startsWith('mt')) return 'san Mateo';
  if (lower.includes('marcos') || lower.startsWith('mc')) return 'san Marcos';
  if (lower.includes('lucas') || lower.startsWith('lc')) return 'san Lucas';
  if (lower.includes('juan') || lower.startsWith('jn')) return 'san Juan';
  return 'san Mateo';
}

/**
 * Removes duplicate trailing "Palabra de Dios." or "Palabra del Señor."
 * so the liturgical response box formats uniformly.
 */
export function cleanReadingText(text: string = ''): string {
  return text
    .replace(/\s*Palabra de Dios\.?\s*$/i, '')
    .replace(/\s*Palabra del Señor\.?\s*$/i, '')
    .trim();
}
