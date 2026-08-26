import fs from 'fs';

// Ferial Lectionary structure for Ordinary Time (Weeks 1 to 34)
// Days: 1=Lunes, 2=Martes, 3=Miercoles, 4=Jueves, 5=Viernes, 6=Sabado
const FERIAL_WEEKS = {
  21: {
    II: {
      1: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '2 Tesalonicenses 1, 1-5. 11b-12',
          monicion: 'San Pablo alaba el crecimiento de la fe y el amor fraterno en medio de las tribulaciones.',
          texto: `Pablo, Silvano y Timoteo, a la Iglesia de los tesalonicenses, en Dios nuestro Padre y en el Señor Jesucristo: a ustedes, gracia y paz de parte de Dios Padre y del Señor Jesucristo.\n\nDebemos dar continuas gracias a Dios por ustedes, hermanos, como es justo, porque su fe crece vigorosamente y el amor de cada uno hacia los demás se acrecienta cada vez más; tanto que nosotros mismos nos gloriamos de ustedes en las Iglesias de Dios por su paciencia y su fe en medio de todas las persecuciones y tribulaciones que soportan...\n\nQue nuestro Dios los haga dignos de su llamamiento y con su poder lleve a término todo buen propósito y la actividad de la fe, para que el nombre de nuestro Señor Jesús sea glorificado en ustedes y ustedes en él, según la gracia de nuestro Dios y del Señor Jesucristo.\n\nPalabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 95',
          respuesta: 'R. Cuenten las maravillas del Señor a todas las naciones.',
          texto: `Canten al Señor un cántico nuevo,\ncante al Señor toda la tierra.\nCanten al Señor, bendigan su nombre,\nproclamen día tras día su victoria.\n\nR. Cuenten las maravillas del Señor a todas las naciones.\n\nCuenten a los pueblos su gloria,\nsus maravillas a todas las naciones.\nPorque es grande el Señor y muy digno de alabanza,\nmás temible que todos los dioses.\n\nR. Cuenten las maravillas del Señor a todas las naciones.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.\nMis ovejas escuchan mi voz, dice el Señor; yo las conozco y ellas me siguen.\nR. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 13-22',
          monicion: 'Jesús denuncia la hipocresía religiosa que cierra las puertas del Reino y desvirtúa la verdad.',
          texto: `En aquel tiempo, Jesús habló diciendo:\n«¡Ay de ustedes, escribas y fariseos hipócritas, que cierran a los hombres el reino de los cielos! Ni entran ustedes, ni dejan entrar a los que quieren entrar.\n\n¡Ay de ustedes, escribas y fariseos hipócritas, que recorren mar y tierra para hacer un prosélito y, cuando lo consiguen, lo hacen digno del fuego el doble que ustedes!\n\n¡Ay de ustedes, guías ciegos, que dicen: "Jurar por el templo no obliga, pero jurar por el oro del templo sí obliga"! ¡Necios y ciegos! ¿Qué es más principal, el oro o el templo que santifica el oro? Y dicen: "Jurar por el altar no obliga, pero jurar por la ofrenda que está sobre él sí obliga". ¡Ciegos! ¿Qué es más importante, la ofrenda o el altar que santifica la ofrenda? Quien jura por el altar, jura por él y por cuanto hay sobre él; y quien jura por el templo, jura por él y por quien habita en él; y quien jura por el cielo, jura por el trono de Dios y por quien está sentado en él».\n\nPalabra del Señor.`
        }
      },
      2: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '2 Tesalonicenses 2, 1-3a. 14-17',
          monicion: 'San Pablo exhorta a no dejarse confundir y mantenerse firmes en la tradición apostólica.',
          texto: `Hermanos: Por lo que se refiere a la venida de nuestro Señor Jesucristo y a nuestra reunión con él, les rogamos que no pierdan fácilmente la cabeza ni se alarmen por revelaciones, declaraciones o cartas atribuidas a nosotros, como si el día del Señor fuera ya inminente. Que nadie los engañe de ninguna manera...\n\nDios los llamó por medio de nuestro Evangelio para que alcancen la gloria de nuestro Señor Jesucristo. Así pues, hermanos, manténganse firmes y conserven las tradiciones que han aprendido de nosotros, sea de palabra, sea por carta.\n\nQue el mismo Señor nuestro Jesucristo y Dios nuestro Padre, que nos ha amado y nos ha dado un consuelo eterno y una esperanza dichosa por su gracia, consuele sus corazones y los afiance en toda obra y palabra buena.\n\nPalabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 95',
          respuesta: 'R. El Señor llega a regir la tierra.',
          texto: `Digan a los pueblos: «El Señor es rey, él afianzó el orbe y no se moverá;\nél gobierna a los pueblos rectamente».\n\nR. El Señor llega a regir la tierra.\n\nAlégrese el cielo, goce la tierra,\nretumbe el mar y cuanto lo llena;\ngocen los campos y cuanto en ellos hay,\naclamen los árboles del bosque.\n\nR. El Señor llega a regir la tierra.\n\nDelante del Señor, que ya llega,\nya llega a regir la tierra.\nRegirá el orbe con justicia\ny a los pueblos con su fidelidad.\n\nR. El Señor llega a regir la tierra.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.\nLa palabra de Dios es viva y eficaz; discierne los pensamientos y las intenciones del corazón.\nR. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 23-26',
          monicion: 'Jesús nos enseña que el culto a Dios debe acompañarse de la justicia, la misericordia y la fe sincera.',
          texto: `En aquel tiempo, Jesús habló diciendo:\n«¡Ay de ustedes, escribas y fariseos hipócritas, que pagan el diezmo de la menta, del anís y del comino, y descuidan lo más importante de la Ley: la justicia, la misericordia y la fidelidad! Esto es lo que había que practicar, aunque sin descuidar aquello. ¡Guías ciegos, que cuelan el mosquito y se tragan el camello!\n\n¡Ay de ustedes, escribas y fariseos hipócritas, que limpian por fuera la copa y el plato, mientras por dentro están llenos de robo y desenfreno! Fariseo ciego: limpia primero por dentro la copa y el plato, para que también por fuera queden limpios».\n\nPalabra del Señor.`
        }
      },
      3: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '2 Tesalonicenses 3, 6-10. 16-18',
          monicion: 'El apóstol exhorta a vivir con responsabilidad, trabajo diligente y paz en el Señor.',
          texto: `Hermanos: Les mandamos en nombre del Señor Jesucristo que se aparten de cualquier hermano que viva ociosamente y no según la tradición que recibieron de nosotros. Ya saben cómo tienen que imitarnos, pues no vivimos ociosos entre ustedes, ni comimos de balde el pan de nadie, sino que trabajamos con cansancio y fatiga día y noche, para no ser gravosos a ninguno de ustedes...\n\nPorque además, cuando estábamos con ustedes les dimos esta norma: el que no quiera trabajar, que tampoco coma.\n\nQue el Señor de la paz les conceda la paz siempre y en todo lugar. El Señor esté con todos ustedes.\n\nPalabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 127',
          respuesta: 'R. Dichoso el que teme al Señor y sigue sus caminos.',
          texto: `Dichoso el que teme al Señor\ny sigue sus caminos.\nComerás del fruto de tu trabajo,\nserás dichoso, te irá bien.\n\nR. Dichoso el que teme al Señor y sigue sus caminos.\n\nÉsta es la bendición del hombre que teme al Señor.\nQue el Señor te bendiga desde Sión,\nque veas la prosperidad de Jerusalén\ntodos los días de tu vida.\n\nR. Dichoso el que teme al Señor y sigue sus caminos.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.\nEl que guarda la palabra de Cristo, ciertamente el amor de Dios ha llegado en él a su plenitud.\nR. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 27-32',
          monicion: 'Jesús denuncia las apariencias engañosas y nos llama a una conversión auténtica del corazón.',
          texto: `En aquel tiempo, Jesús habló diciendo:\n«¡Ay de ustedes, escribas y fariseos hipócritas, que son semejantes a sepulcros blanqueados, que por fuera parecen hermosos, pero por dentro están llenos de huesos de muertos y de toda inmundicia! Así también ustedes: por fuera parecen justos ante los hombres, pero por dentro están llenos de hipocresía y de maldad.\n\n¡Ay de ustedes, escribas y fariseos hipócritas, que edifican los sepulcros de los profetas y adornan los monumentos de los justos, y dicen: "Si hubiéramos vivido en los días de nuestros padres, no habríamos sido cómplices suyos en la sangre de los profetas"! Con esto testifican contra ustedes mismos que son hijos de los que mataron a los profetas. ¡Colmen, pues, la medida de sus padres!».\n\nPalabra del Señor.`
        }
      },
      4: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 1, 1-9',
          monicion: 'San Pablo da gracias a Dios por la gracia y los dones manifestados en la comunidad cristiana.',
          texto: `Pablo, llamado a ser apóstol de Jesucristo por voluntad de Dios, y Sóstenes, el hermano, a la Iglesia de Dios que está en Corinto, a los santificados en Cristo Jesús, llamados a ser santos, con todos los que en cualquier lugar invocan el nombre de nuestro Señor Jesucristo, Señor de ellos y nuestro: gracia y paz a ustedes de parte de Dios nuestro Padre y del Señor Jesucristo.\n\nDoy continuas gracias a mi Dios por ustedes, por la gracia de Dios que les ha sido dada en Cristo Jesús; pues en él han sido enriquecidos en todo, en toda palabra y en todo conocimiento, conforme se ha consolidado entre ustedes el testimonio de Cristo, de modo que no carecen de ningún don de gracia a los que esperan la manifestación de nuestro Señor Jesucristo. Él los mantendrá firmes hasta el final, para que resulten irreprochables en el día de nuestro Señor Jesucristo. Fiel es Dios, por quien fueron llamados a la comunión con su Hijo Jesucristo, Señor nuestro.\n\nPalabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 144',
          respuesta: 'R. Alabaré tu nombre para siempre, Señor.',
          texto: `Día tras día te bendeciré\ny alabaré tu nombre por siempre jamás.\nGrande es el Señor y muy digno de alabanza,\nsu grandeza es insondable.\n\nR. Alabaré tu nombre para siempre, Señor.\n\nUna generación pondera tus obras a la otra,\ny le cuenta tus hazañas.\nAlaban ellos la gloria de tu majestad,\ny yo proclamo tus maravillas.\n\nR. Alabaré tu nombre para siempre, Señor.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.\nEstén en vela, porque no saben a qué hora vendrá el Hijo del hombre.\nR. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 24, 42-51',
          monicion: 'Jesús nos exhorta a la vigilancia activa, viviendo fieles a los deberes que el Señor nos confió.',
          texto: `En aquel tiempo, dijo Jesús a sus discípulos:\n«Estén en vela, porque no saben qué día vendrá su Señor. Comprendan que si el dueño de casa supiera a qué hora de la noche viene el ladrón, estaría en vela y no dejaría abrir una brecha en su casa. Por eso, estén también ustedes preparados, porque a la hora que menos piensen viene el Hijo del hombre.\n\n¿Dónde hay un siervo fiel y prudente, a quien el señor puso al frente de su servidumbre para darles la comida a su tiempo? ¡Dichoso el siervo a quien su señor, al llegar, lo encuentre haciéndolo así! En verdad les digo que lo pondrá al frente de todos sus bienes...\n\nPero si el siervo malvado dice para sus adentros: "Mi señor tarda en llegar", y empieza a pegar a sus compañeros, y come y bebe con los borrachos, vendrá el señor de ese siervo el día que no espera y a la hora que no sabe, y lo castigará con rigor y le asignará su lugar con los hipócritas. Allí será el llanto y el crujir de dientes».\n\nPalabra del Señor.`
        }
      },
      5: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 1, 17-25',
          monicion: 'San Pablo enseña que la locura de la Cruz encierra la suprema sabiduría y poder salvador de Dios.',
          texto: `Hermanos: No me envió Cristo a bautizar, sino a anunciar el Evangelio, y no con sabiduría de palabras, para no hacer vana la cruz de Cristo.\n\nPues el mensaje de la cruz es necedad para los que se pierden; pero para los que se salvan, para nosotros, es fuerza de Dios. Porque está escrito: «Destruiré la sabiduría de los sabios y rechazaré la inteligencia de los inteligentes». ¿Dónde está el sabio? ¿Dónde el letrado? ¿Dónde el polemista de este mundo? ¿Acaso no ha convertido Dios en necedad la sabiduría de este mundo?\n\nPorque, ya que el mundo no conoció a Dios por medio de la sabiduría en la sabiduría de Dios, quiso Dios salvar a los creyentes mediante la necedad de la predicación. Porque los judíos piden signos y los griegos buscan sabiduría; pero nosotros predicamos a Cristo crucificado, escándalo para los judíos y necedad para los gentiles; mas para los llamados, sean judíos o griegos, un Cristo que es fuerza de Dios y sabiduría de Dios. Porque la necedad de Dios es más sabia que los hombres, y la debilidad de Dios es más fuerte que los hombres.\n\nPalabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 32',
          respuesta: 'R. La misericordia del Señor llena la tierra.',
          texto: `Aclamen, justos, al Señor,\nque merece la alabanza de los buenos.\nDen gracias al Señor con la cítara,\ntoquen para él el arpa de diez cuerdas.\n\nR. La misericordia del Señor llena la tierra.\n\nQue la palabra del Señor es sincera,\ny todas sus acciones son leales;\nél ama la justicia y el derecho,\ny su misericordia llena la tierra.\n\nR. La misericordia del Señor llena la tierra.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.\nEstén siempre despiertos y vigilantes, para que puedan presentarse seguros ante el Hijo del hombre.\nR. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 25, 1-13',
          monicion: 'La parábola de las diez vírgenes nos urge a mantener encendida la lámpara de la fe y las obras de amor.',
          texto: `En aquel tiempo, dijo Jesús a sus discípulos esta parábola:\n«El reino de los cielos se parecerá a diez vírgenes que tomaron sus lámparas y salieron al encuentro del esposo. Cinco de ellas eran necias y cinco eran prudentes. Las necias, al tomar las lámparas, no se proveyeron de aceite; en cambio, las prudentes se llevaron alcuzas de aceite con las lámparas. Como el esposo tardaba, les entró sueño a todas y se durmieron.\n\nA medianoche se oyó una voz: "¡Llega el esposo, salgan a su encuentro!". Entonces se despertaron todas aquellas vírgenes y se pusieron a preparar sus lámparas. Las necias dijeron a las prudentes: "Dennos un poco de su aceite, que se nos apagan las lámparas". Pero las prudentes contestaron: "Por si acaso no llega para nosotras y ustedes, es mejor que vayan a la tienda y se lo compren".\n\nMientras iban a comprarlo, llegó el esposo, y las que estaban preparadas entraron con él al banquete de bodas, y se cerró la puerta. Más tarde llegaron también las otras vírgenes, diciendo: "¡Señor, señor, ábrenos!". Pero él respondió: "En verdad les digo que no las conozco". Por tanto, estén en vela, porque no saben el día ni la hora».\n\nPalabra del Señor.`
        }
      },
      6: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 1, 26-31',
          monicion: 'Dios elige a los humildes y sencillos para confundir el orgullo de los poderosos.',
          texto: `Hermanos: Fíjense en su llamamiento; no hay entre ustedes muchos sabios según la carne, ni muchos poderosos, ni muchos nobles. Sino que lo necio del mundo lo ha escogido Dios para avergonzar a los sabios; y lo débil del mundo lo ha escogido Dios para avergonzar a lo fuerte; y lo plebeyo y despreciable del mundo lo ha escogido Dios, lo que no es, para reducir a la nada lo que es, para que nadie pueda gloriarse en presencia de Dios.\n\nDe él les viene que ustedes estén en Cristo Jesús, el cual se ha hecho para nosotros sabiduría de parte de Dios, justicia, santificación y redención; para que, como está escrito: «El que se gloríe, que se gloríe en el Señor».\n\nPalabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 32',
          respuesta: 'R. Dichoso el pueblo que el Señor se escogió como heredad.',
          texto: `Dichosa la nación cuyo Dios es el Señor,\nel pueblo que él escogió como heredad.\nEl Señor mira desde el cielo,\nse fija en todos los hombres.\n\nR. Dichoso el pueblo que el Señor se escogió como heredad.\n\nLos ojos del Señor están puestos en sus fieles,\nen los que esperan en su misericordia,\npara librar sus vidas de la muerte\ny reanimarlos en tiempo de hambre.\n\nR. Dichoso el pueblo que el Señor se escogió como heredad.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.\nLes doy un mandamiento nuevo: que se amen unos a otros como yo los he amado.\nR. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 25, 14-30',
          monicion: 'La parábola de los talentos nos invita a multiplicar generosamente los dones recibidos para el Reino de Dios.',
          texto: `En aquel tiempo, dijo Jesús a sus discípulos esta parábola:\n«Un hombre, al irse de viaje, llamó a sus siervos y les encomendó sus bienes. A uno le dio cinco talentos, a otro dos y a otro uno, a cada cual según su capacidad; y se fue.\n\nEl que recibió cinco talentos fue enseguida a negociar con ellos y ganó otros cinco. Igualmente, el que recibió dos ganó otros dos. Pero el que recibió uno fue y cavó en la tierra y escondió el dinero de su señor.\n\nAl cabo de mucho tiempo viene el señor de aquellos siervos y les pide cuentas. Llegó el que había recibido cinco talentos y presentó otros cinco talentos diciendo: "Señor, cinco talentos me dejaste; mira, he ganado otros cinco talentos". Su señor le dijo: "¡Bien, siervo bueno y fiel! En lo poco has sido fiel, al frente de mucho te pondré; entra en el gozo de tu señor"...\n\nLlegó también el que había recibido un talento y dijo: "Señor, sabía que eres hombre duro, que siegas donde no sembraste y recoges donde no esparciste; tuve miedo y fui a esconder tu talento en la tierra; aquí tienes lo tuyo". El señor le respondió: "¡Siervo malvado y perezoso!... Quítenle el talento y dénselo al que tiene diez... y al siervo inútil échenlo a las tinieblas de afuera. Allí será el llanto y el rechinar de dientes"».\n\nPalabra del Señor.`
        }
      }
    }
  }
};

console.log("Generating full leccionarioFerial.ts...");
