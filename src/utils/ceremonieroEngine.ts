import { LiturgicalDay, LiturgicalColor, CelebrationRank } from '../types/liturgia';

export interface CeremonieroAutoCorrection {
  campo: string;
  motivo: string;
  reglaIGMR: string;
  valorAnterior: any;
  valorNuevo: any;
  tipo: 'critico' | 'rubrica' | 'perfeccionamiento';
}

export interface SacristiaItem {
  nombre: string;
  cantidad?: number | string;
  ubicacion: 'altar' | 'credencia' | 'sede' | 'ambon' | 'sacristia';
  notas?: string;
}

export interface CeremonieroAuditReport {
  timestamp: string;
  puntuacionFidelidad: number; // 0 - 100
  estadoCanónico: 'NIHIL_OBSTAT' | 'CORREGIDO_AUTOMATICAMENTE' | 'ADVERTENCIA';
  correccionesRealizadas: CeremonieroAutoCorrection[];
  prefacioSugerido: {
    titulo: string;
    texto: string;
  };
  plegariaEucaristicaRecomendada: {
    numero: string;
    nombre: string;
    justificacion: string;
  };
  checklistSacristia: SacristiaItem[];
  consejosCelebrante: string[];
}

/**
 * MOTOR DEL CEREMONIEROCorrección y Proof-Reading Canónico Autónomo en Tiempo Real
 * Aplica con rigor la Instrucción General del Misal Romano (IGMR 3ra Edición)
 * y el Ceremonial de los Obispos (Caeremoniale Episcoporum).
 */
export function autoCorrectLiturgicalDay(
  day: LiturgicalDay,
  options: { region?: string } = {}
): { day: LiturgicalDay; audit: CeremonieroAuditReport } {
  if (!day) return { day, audit: createEmptyAudit() };

  const corrections: CeremonieroAutoCorrection[] = [];
  const corrected: LiturgicalDay = JSON.parse(JSON.stringify(day));

  const season = (corrected.tiempo_liturgico || '').toLowerCase();
  const title = (corrected.titulo_celebracion || corrected.celebracion || '').toLowerCase();
  const rank = (corrected.grado || 'Feria') as CelebrationRank;
  const isSunday = (corrected.dia_semana || '').toLowerCase().includes('domingo') || rank === 'Domingo';
  const isSolemnity = rank === 'Solemnidad' || title.includes('solemnidad');
  const isFeast = rank === 'Fiesta' || title.includes('fiesta');
  const isLent = season.includes('cuaresma') || season.includes('semana santa') || season.includes('triduo');
  const isAdvent = season.includes('adviento');
  const isEaster = season.includes('pascua');

  // -------------------------------------------------------------
  // REGLA 1: Supresión canónica absoluta de "Aleluya" en Cuaresma (IGMR 62)
  // -------------------------------------------------------------
  if (isLent) {
    // 1.1 Aclamación antes del Evangelio
    if (corrected.liturgia_palabra?.aclamacion_evangelio?.texto) {
      const txt = corrected.liturgia_palabra.aclamacion_evangelio.texto;
      if (txt.toLowerCase().includes('aleluya')) {
        const cleaned = txt.replace(/aleluya/gi, '').trim();
        const cuaresmaAcclam = `R. Honor y gloria a ti, Señor Jesús.\n${cleaned || 'El hombre no vive solamente de pan, sino de toda palabra que sale de la boca de Dios.'}\nR. Honor y gloria a ti, Señor Jesús.`;
        corrections.push({
          campo: 'Aclamación del Evangelio',
          motivo: 'En Cuaresma se suprime absolutamente el canto del Aleluya',
          reglaIGMR: 'IGMR n. 62b: "En tiempo de Cuaresma, en lugar del Aleluya, se canta el versículo antes del Evangelio"',
          valorAnterior: txt,
          valorNuevo: cuaresmaAcclam,
          tipo: 'critico'
        });
        corrected.liturgia_palabra.aclamacion_evangelio.texto = cuaresmaAcclam;
      }
    }

    // 1.2 Salmo responsorial
    if (corrected.liturgia_palabra?.salmo_responsorial?.respuesta) {
      const resp = corrected.liturgia_palabra.salmo_responsorial.respuesta;
      if (resp.toLowerCase().includes('aleluya')) {
        const fixedResp = resp.replace(/aleluya/gi, '').replace(/\s+/g, ' ').trim();
        corrections.push({
          campo: 'Respuesta del Salmo',
          motivo: 'Purga de Aleluya en la antífona del Salmo en tiempo de penitencia cuaresmal',
          reglaIGMR: 'Normas Universales sobre el Año Litúrgico n. 28',
          valorAnterior: resp,
          valorNuevo: fixedResp,
          tipo: 'critico'
        });
        corrected.liturgia_palabra.salmo_responsorial.respuesta = fixedResp;
      }
    }
  }

  // -------------------------------------------------------------
  // REGLA 2: Regulación del Canto del Gloria (IGMR 53)
  // -------------------------------------------------------------
  // El Gloria se canta en Domingos fuera de Adviento y Cuaresma, en Solemnidades y Fiestas.
  let shouldHaveGloria = false;
  if (isSolemnity || isFeast) {
    shouldHaveGloria = true;
  } else if (isSunday && !isLent && !isAdvent) {
    shouldHaveGloria = true;
  }

  if (Boolean(corrected.gloria) !== shouldHaveGloria) {
    corrections.push({
      campo: 'Himno de Gloria',
      motivo: shouldHaveGloria 
        ? `Se debe cantar el Gloria por ser ${rank || 'Domingo fuera de tiempos penitenciales'}`
        : `Se omite el Gloria por ser ${isLent ? 'Cuaresma' : isAdvent ? 'Adviento' : 'Misa ferial'}`,
      reglaIGMR: 'IGMR n. 53: "El Gloria se canta o se dice los domingos fuera del Adviento y de la Cuaresma, en las solemnidades y en las fiestas..."',
      valorAnterior: corrected.gloria,
      valorNuevo: shouldHaveGloria,
      tipo: 'rubrica'
    });
    corrected.gloria = shouldHaveGloria;
  }

  // -------------------------------------------------------------
  // REGLA 3: Regulación de la Profesión de Fe / Credo (IGMR 68)
  // -------------------------------------------------------------
  // El Credo se dice los domingos y en las solemnidades.
  let shouldHaveCredo = isSunday || isSolemnity;

  if (Boolean(corrected.credo) !== shouldHaveCredo) {
    corrections.push({
      campo: 'Profesión de Fe (Credo)',
      motivo: shouldHaveCredo
        ? `El Credo es preceptivo en todos los domingos y solemnidades`
        : `El Credo no se dice en misas feriales ni en fiestas o memorias`,
      reglaIGMR: 'IGMR n. 68: "El Símbolo o profesión de fe se ha de cantar o recitar por el sacerdote juntamente con el pueblo los domingos y en las solemnidades"',
      valorAnterior: corrected.credo,
      valorNuevo: shouldHaveCredo,
      tipo: 'rubrica'
    });
    corrected.credo = shouldHaveCredo;
  }

  // -------------------------------------------------------------
  // REGLA 4: Control Canónico del Color Litúrgico (IGMR 346)
  // -------------------------------------------------------------
  let canonicalColor: LiturgicalColor = corrected.color || 'Verde';

  if (title.includes('mártir') || title.includes('martirio') || title.includes('san pedro y san pablo') || title.includes('pentecostés') || title.includes('viernes santo') || title.includes('domingo de ramos')) {
    canonicalColor = 'Rojo';
  } else if (title.includes('difuntos') || title.includes('exequias') || isLent || isAdvent) {
    canonicalColor = isSunday && (title.includes('gaudete') || title.includes('laetare')) ? 'Rosa' : 'Morado';
  } else if (isEaster || season.includes('navidad') || isSolemnity || title.includes('virgen') || title.includes('maría') || title.includes('santo') || title.includes('santa') || title.includes('confesor') || title.includes('doctor')) {
    if (canonicalColor !== 'Rojo') {
      canonicalColor = 'Blanco';
    }
  } else if (season.includes('ordinario')) {
    canonicalColor = 'Verde';
  }

  if (corrected.color !== canonicalColor && canonicalColor) {
    corrections.push({
      campo: 'Color de Ornamentos',
      motivo: `Alineación del color canónico de las vestiduras sagradas para ${corrected.titulo_celebracion || rank}`,
      reglaIGMR: 'IGMR n. 346 (Uso de los colores litúrgicos)',
      valorAnterior: corrected.color,
      valorNuevo: canonicalColor,
      tipo: 'rubrica'
    });
    corrected.color = canonicalColor;
  }

  // -------------------------------------------------------------
  // REGLA 5: Auto-Asignación del Prefacio Propio
  // -------------------------------------------------------------
  let assignedPrefacio = corrected.prefacio;
  if (!assignedPrefacio || !assignedPrefacio.titulo) {
    assignedPrefacio = resolveDefaultPreface(corrected, season, title, rank);
    corrections.push({
      campo: 'Prefacio Eucarístico',
      motivo: 'Asignación automática del Prefacio idóneo según el Misterio Pascual del día',
      reglaIGMR: 'IGMR n. 365 y Rúbricas del Misal Romano',
      valorAnterior: 'Sin prefacio específico',
      valorNuevo: assignedPrefacio.titulo,
      tipo: 'perfeccionamiento'
    });
    corrected.prefacio = assignedPrefacio;
  }

  // -------------------------------------------------------------
  // REGLA 6: Plegaria Eucarística Recomendada
  // -------------------------------------------------------------
  let plegariaRec = {
    numero: 'III',
    nombre: 'Plegaria Eucarística III',
    justificacion: 'Recomendada para domingos y fiestas de santos, con recuerdo explícito del santo patrono o titular.'
  };

  if (isSolemnity && (isSunday || isEaster)) {
    plegariaRec = {
      numero: 'I',
      nombre: 'Plegaria Eucarística I (Canon Romano)',
      justificacion: 'Tradición venerada de la Iglesia para las grandes Solemnidades con conmemoración de los Apóstoles y Mártires.'
    };
  } else if (!isSunday && !isSolemnity && !isFeast) {
    plegariaRec = {
      numero: 'II',
      nombre: 'Plegaria Eucarística II',
      justificacion: 'Idónea para los días feriales por su sobriedad, concisión y profunda teología eucarística.'
    };
  } else if (isLent || title.includes('penitencia') || title.includes('reconciliación') || title.includes('paz')) {
    plegariaRec = {
      numero: 'R-I',
      nombre: 'Plegaria Eucarística de la Reconciliación I',
      justificacion: 'Enfocada en la conversión, el perdón divino y la paz interior del pueblo cristiano.'
    };
  }

  // -------------------------------------------------------------
  // REGLA 7: Generación del Checklist de Sacristía y Credencia
  // -------------------------------------------------------------
  const checklistSacristia = generateSacristyChecklist(corrected, isSolemnity, canonicalColor);

  // Consejos prácticos para el celebrante
  const consejos: string[] = [
    `Color de casulla y estola: ${corrected.color}.`,
    isSolemnity ? 'Uso facultativo de incienso en procesión de entrada, proclamación del Evangelio y ofrendas.' : 'Celebración en forma simple.',
    shouldHaveGloria ? 'El canto del Gloria debe entonarse íntegro tras el Acto Penitencial.' : 'Se pasa directamente del Acto Penitencial (Kyrie) a la Oración Colecta.',
    shouldHaveCredo ? 'Se proclama el Credo (Niceno-constantinopolitano o Apostólico) tras la Homilía.' : 'Se prosigue inmediatamente con la Oración de los Fieles o la Presentación de Dones.'
  ];

  // Sello canónico y puntuación
  const auditReport: CeremonieroAuditReport = {
    timestamp: new Date().toISOString(),
    puntuacionFidelidad: 100,
    estadoCanónico: corrections.length > 0 ? 'CORREGIDO_AUTOMATICAMENTE' : 'NIHIL_OBSTAT',
    correccionesRealizadas: corrections,
    prefacioSugerido: assignedPrefacio,
    plegariaEucaristicaRecomendada: plegariaRec,
    checklistSacristia,
    consejosCelebrante: consejos
  };

  return {
    day: corrected,
    audit: auditReport
  };
}

function resolveDefaultPreface(day: LiturgicalDay, season: string, title: string, rank: CelebrationRank): { titulo: string; texto: string } {
  if (title.includes('virgen') || title.includes('maría') || title.includes('guadalupe')) {
    return {
      titulo: 'Prefacio de la Santísima Virgen María (I: En la Maternidad)',
      texto: 'En verdad es justo y necesario, es nuestro deber y salvación darte gracias siempre y en todo lugar, Señor, Padre santo, Dios todopoderoso y eterno. Y alabar, bendecir y proclamar tu gloria en la memoria de Santa María, siempre virgen. Porque ella concibió a tu Hijo único por obra del Espíritu Santo, y sin perder la gloria de su virginidad, derramó sobre el mundo la Luz eterna, Jesucristo, Señor nuestro.'
    };
  }

  if (title.includes('mártir') || day.color === 'Rojo') {
    return {
      titulo: 'Prefacio de los Santos Mártires',
      texto: 'En verdad es justo y necesario, es nuestro deber y salvación darte gracias siempre y en todo lugar, Señor, Padre santo, Dios todopoderoso y eterno. Porque la sangre de tus santos mártires, derramada como la de Cristo para proclamar su fidelidad a ti, manifiesta las maravillas de tu poder, por el cual perfeccionas la debilidad y fortaleces al débil para que sea testigo de tu amor.'
    };
  }

  if (season.includes('pascua')) {
    return {
      titulo: 'Prefacio Pascual I (El Misterio Pascual)',
      texto: 'En verdad es justo y necesario, es nuestro deber y salvación proclamar tu gloria, Señor, en todo tiempo, pero más que nunca en este tiempo en que Cristo, nuestra Pascua, fue inmolado. Porque él es el verdadero Cordero que quitó el pecado del mundo: muriendo destruyó nuestra muerte y resucitando restauró la vida.'
    };
  }

  if (season.includes('cuaresma')) {
    return {
      titulo: 'Prefacio de Cuaresma I (La Significación Espiritual de la Cuaresma)',
      texto: 'En verdad es justo y necesario, es nuestro deber y salvación darte gracias siempre y en todo lugar, Señor, Padre santo, Dios todopoderoso y eterno. Porque concedes a tus hijos esperar con gozo, año tras año, las fiestas pascuales con el corazón purificado, para que, dedicados con mayor entrega a la oración y a la caridad fraterna, alcancemos la plenitud de la filiación divina.'
    };
  }

  return {
    titulo: 'Prefacio Dominical del Tiempo Ordinario (El Misterio de la Salvación)',
    texto: 'En verdad es justo y necesario, es nuestro deber y salvación darte gracias siempre y en todo lugar, Señor, Padre santo, Dios todopoderoso y eterno. Por quien creaste todas las cosas y nos redimiste por el misterio de la Pascua de tu Hijo amado. Por eso, con los ángeles y arcángeles proclamamos tu gloria cantando sin cesar...'
  };
}

function generateSacristyChecklist(day: LiturgicalDay, isSolemnity: boolean, color: LiturgicalColor): SacristiaItem[] {
  const items: SacristiaItem[] = [
    { nombre: `Casulla y estola (${color})`, ubicacion: 'sacristia', notas: 'Para el sacerdote celebrante' },
    { nombre: 'Alba, cíngulo y amito', ubicacion: 'sacristia' },
    { nombre: 'Cáliz principal con purificador, patena, palia y corporal', ubicacion: 'credencia', notas: 'Hostia grande en la patena' },
    { nombre: 'Copón con formas para consagrar', ubicacion: 'credencia', notas: 'Calcular según aforo de fieles' },
    { nombre: 'Vinajeras con vino y agua', ubicacion: 'credencia' },
    { nombre: 'Lavabo y manutergio', ubicacion: 'credencia' },
    { nombre: 'Campanilla litúrgica', ubicacion: 'credencia' },
    { nombre: 'Leccionario abierto en las lecturas del día', ubicacion: 'ambon', notas: day.liturgia_palabra?.primera_lectura?.cita || '' },
    { nombre: 'Misal Romano con separadores en el Ordinario y formulario del día', ubicacion: 'sede' }
  ];

  if (isSolemnity) {
    items.push(
      { nombre: 'Incensario encendido y naveta con incienso', ubicacion: 'sacristia', notas: 'Para el turiferario' },
      { nombre: 'Cruz procesional y ciriales', ubicacion: 'sacristia' }
    );
  }

  return items;
}

function createEmptyAudit(): CeremonieroAuditReport {
  return {
    timestamp: new Date().toISOString(),
    puntuacionFidelidad: 100,
    estadoCanónico: 'NIHIL_OBSTAT',
    correccionesRealizadas: [],
    prefacioSugerido: { titulo: '', texto: '' },
    plegariaEucaristicaRecomendada: { numero: 'II', nombre: 'Plegaria II', justificacion: '' },
    checklistSacristia: [],
    consejosCelebrante: []
  };
}
