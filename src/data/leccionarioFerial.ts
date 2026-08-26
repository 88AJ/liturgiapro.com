import { LiturgicalDay, LiturgicalColor, CelebrationRank } from '../types/liturgia';

export interface FerialReadingEntry {
  primera_lectura: {
    titulo: string;
    cita: string;
    texto: string;
    monicion?: string;
  };
  salmo_responsorial: {
    cita: string;
    respuesta: string;
    texto: string;
  };
  aclamacion_evangelio: {
    texto: string;
  };
  evangelio: {
    titulo: string;
    cita: string;
    texto: string;
    monicion?: string;
  };
  oracion_colecta?: string;
  oracion_ofrendas?: string;
  oracion_comunion?: string;
  antifona_entrada?: string;
  antifona_comunion?: string;
}

export const LECCIONARIO_FERIAL: Record<number, Record<'I' | 'II', Record<number, FerialReadingEntry>>> = {
  21: {
    'II': {
      1: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '2 Tesalonicenses 1, 1-5. 11b-12',
          monicion: 'San Pablo alaba el crecimiento de la fe y el amor fraterno en medio de las tribulaciones.',
          texto: `Pablo, Silvano y Timoteo, a la Iglesia de los tesalonicenses, en Dios nuestro Padre y en el Señor Jesucristo: a ustedes, gracia y paz de parte de Dios Padre y del Señor Jesucristo.

Debemos dar continuas gracias a Dios por ustedes, hermanos, como es justo, porque su fe crece vigorosamente y el amor de cada uno hacia los demás se acrecienta cada vez más; tanto que nosotros mismos nos gloriamos de ustedes en las Iglesias de Dios por su paciencia y su fe en medio de todas las persecuciones y tribulaciones que soportan.

Que nuestro Dios los haga dignos de su llamamiento y con su poder lleve a término todo buen propósito y la actividad de la fe, para que el nombre de nuestro Señor Jesús sea glorificado en ustedes y ustedes en él, según la gracia de nuestro Dios y del Señor Jesucristo.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 95',
          respuesta: 'R. Cuenten las maravillas del Señor a todas las naciones.',
          texto: `Canten al Señor un cántico nuevo,
cante al Señor toda la tierra.
Canten al Señor, bendigan su nombre,
proclamen día tras día su victoria.

R. Cuenten las maravillas del Señor a todas las naciones.

Cuenten a los pueblos su gloria,
sus maravillas a todas las naciones.
Porque es grande el Señor y muy digno de alabanza,
más temible que todos los dioses.

R. Cuenten las maravillas del Señor a todas las naciones.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
Mis ovejas escuchan mi voz, dice el Señor; yo las conozco y ellas me siguen.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 13-22',
          monicion: 'Jesús denuncia la hipocresía religiosa que cierra las puertas del Reino y desvirtúa la verdad.',
          texto: `En aquel tiempo, Jesús habló diciendo:
«¡Ay de ustedes, escribas y fariseos hipócritas, que cierran a los hombres el reino de los cielos! Ni entran ustedes, ni dejan entrar a los que quieren entrar.

¡Ay de ustedes, escribas y fariseos hipócritas, que recorren mar y tierra para hacer un prosélito y, cuando lo consiguen, lo hacen digno del fuego el doble que ustedes!

¡Ay de ustedes, guías ciegos, que dicen: "Jurar por el templo no obliga, pero jurar por el oro del templo sí obliga"! ¡Necios y ciegos! ¿Qué es más principal, el oro o el templo que santifica el oro? Y dicen: "Jurar por el altar no obliga, pero jurar por la ofrenda que está sobre él sí obliga". ¡Ciegos! ¿Qué es más importante, la ofrenda o el altar que santifica la ofrenda? Quien jura por el altar, jura por él y por cuanto hay sobre él; y quien jura por el templo, jura por él y por quien habita en él; y quien jura por el cielo, jura por el trono de Dios y por quien está sentado en él».

Palabra del Señor.`
        },
        oracion_colecta: 'Señor Dios, que unes en un solo querer los corazones de tus fieles, concédenos amar lo que mandas y desear lo que prometes. Por nuestro Señor Jesucristo.'
      },
      2: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '2 Tesalonicenses 2, 1-3a. 14-17',
          monicion: 'San Pablo exhorta a no dejarse confundir y mantenerse firmes en la tradición apostólica.',
          texto: `Hermanos: Por lo que se refiere a la venida de nuestro Señor Jesucristo y a nuestra reunión con él, les rogamos que no pierdan fácilmente la cabeza ni se alarmen por revelaciones, declaraciones o cartas atribuidas a nosotros, como si el día del Señor fuera ya inminente. Que nadie los engañe de ninguna manera.

Dios los llamó por medio de nuestro Evangelio para que alcancen la gloria de nuestro Señor Jesucristo. Así pues, hermanos, manténganse firmes y conserven las tradiciones que han aprendido de nosotros, sea de palabra, sea por carta.

Que el mismo Señor nuestro Jesucristo y Dios nuestro Padre, que nos ha amado y nos ha dado un consuelo eterno y una esperanza dichosa por su gracia, consuele sus corazones y los afiance en toda obra y palabra buena.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 95',
          respuesta: 'R. El Señor llega a regir la tierra.',
          texto: `Digan a los pueblos: «El Señor es rey, él afianzó el orbe y no se moverá;
él gobierna a los pueblos rectamente».

R. El Señor llega a regir la tierra.

Alégrese el cielo, goce la tierra,
retumbe el mar y cuanto lo llena;
gocen los campos y cuanto en ellos hay,
aclamen los árboles del bosque.

R. El Señor llega a regir la tierra.

Delante del Señor, que ya llega,
ya llega a regir la tierra.
Regirá el orbe con justicia
y a los pueblos con su fidelidad.

R. El Señor llega a regir la tierra.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
La palabra de Dios es viva y eficaz; discierne los pensamientos y las intenciones del corazón.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 23-26',
          monicion: 'Jesús nos enseña que el culto a Dios debe acompañarse de la justicia, la misericordia y la fe sincera.',
          texto: `En aquel tiempo, Jesús habló diciendo:
«¡Ay de ustedes, escribas y fariseos hipócritas, que pagan el diezmo de la menta, del anís y del comino, y descuidan lo más importante de la Ley: la justicia, la misericordia y la fidelidad! Esto es lo que había que practicar, aunque sin descuidar aquello. ¡Guías ciegos, que cuelan el mosquito y se tragan el camello!

¡Ay de ustedes, escribas y fariseos hipócritas, que limpian por fuera la copa y el plato, mientras por dentro están llenos de robo y desenfreno! Fariseo ciego: limpia primero por dentro la copa y el plato, para que también por fuera queden limpios».

Palabra del Señor.`
        },
        oracion_colecta: 'Señor Dios todopoderoso, concédenos que la práctica de las buenas obras nos mantenga siempre vigilantes en la fe. Por Jesucristo, nuestro Señor.'
      },
      3: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '2 Tesalonicenses 3, 6-10. 16-18',
          monicion: 'El apóstol exhorta a vivir con responsabilidad, trabajo diligente y caridad fraternal.',
          texto: `Hermanos: Les mandamos en nombre del Señor Jesucristo que se aparten de cualquier hermano que viva ociosamente y no según la tradición que recibieron de nosotros. Ya saben cómo tienen que imitarnos, pues no vivimos ociosos entre ustedes, ni comimos de balde el pan de nadie, sino que trabajamos con cansancio y fatiga día y noche, para no ser gravosos a ninguno de ustedes.

No porque no tuviéramos derecho, sino para darles en nosotros un modelo que imitar. Porque además, cuando estábamos con ustedes les dimos esta norma: el que no quiera trabajar, que tampoco coma.

Que el Señor de la paz les conceda la paz siempre y en todo lugar. El Señor esté con todos ustedes.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 127',
          respuesta: 'R. Dichoso el que teme al Señor y sigue sus caminos.',
          texto: `Dichoso el que teme al Señor
y sigue sus caminos.
Comerás del fruto de tu trabajo,
serás dichoso, te irá bien.

R. Dichoso el que teme al Señor y sigue sus caminos.

Ésta es la bendición del hombre que teme al Señor.
Que el Señor te bendiga desde Sión,
que veas la prosperidad de Jerusalén
todos los días de tu vida.

R. Dichoso el que teme al Señor y sigue sus caminos.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
El que guarda la palabra de Cristo, ciertamente el amor de Dios ha llegado en él a su plenitud.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 27-32',
          monicion: 'Jesús denuncia las apariencias engañosas y nos llama a la rectitud y pureza interior.',
          texto: `En aquel tiempo, Jesús habló diciendo:
«¡Ay de ustedes, escribas y fariseos hipócritas, que son semejantes a sepulcros blanqueados, que por fuera parecen hermosos, pero por dentro están llenos de huesos de muertos y de toda inmundicia! Así también ustedes: por fuera parecen justos ante los hombres, pero por dentro están llenos de hipocresía y de maldad.

¡Ay de ustedes, escribas y fariseos hipócritas, que edifican los sepulcros de los profetas y adornan los monumentos de los justos, y dicen: "Si hubiéramos vivido en los días de nuestros padres, no habríamos sido cómplices suyos en la sangre de los profetas"! Con esto testifican contra ustedes mismos que son hijos de los que mataron a los profetas. ¡Colmen, pues, la medida de sus padres!».

Palabra del Señor.`
        },
        oracion_colecta: 'Dios de poder y misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre. Por nuestro Señor Jesucristo.'
      },
      4: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 1, 1-9',
          monicion: 'San Pablo da gracias a Dios por los abundantes dones y carismas derramados en la Iglesia.',
          texto: `Pablo, llamado a ser apóstol de Jesucristo por voluntad de Dios, y Sóstenes, el hermano, a la Iglesia de Dios que está en Corinto, a los santificados en Cristo Jesús, llamados a ser santos, con todos los que en cualquier lugar invocan el nombre de nuestro Señor Jesucristo, Señor de ellos y nuestro: gracia y paz a ustedes de parte de Dios nuestro Padre y del Señor Jesucristo.

Doy continuas gracias a mi Dios por ustedes, por la gracia de Dios que les ha sido dada en Cristo Jesús; pues en él han sido enriquecidos en todo, en toda palabra y en todo conocimiento, conforme se ha consolidado entre ustedes el testimonio de Cristo, de modo que no carecen de ningún don de gracia a los que esperan la manifestación de nuestro Señor Jesucristo.

Él los mantendrá firmes hasta el final, para que resulten irreprochables en el día de nuestro Señor Jesucristo. Fiel es Dios, por quien fueron llamados a la comunión con su Hijo Jesucristo, Señor nuestro.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 144',
          respuesta: 'R. Alabaré tu nombre para siempre, Señor.',
          texto: `Día tras día te bendeciré
y alabaré tu nombre por siempre jamás.
Grande es el Señor y muy digno de alabanza,
su grandeza es insondable.

R. Alabaré tu nombre para siempre, Señor.

Una generación pondera tus obras a la otra,
y le cuenta tus hazañas.
Alaban ellos la gloria de tu majestad,
y yo proclamo tus maravillas.

R. Alabaré tu nombre para siempre, Señor.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
Estén en vela, porque no saben a qué hora vendrá el Hijo del hombre.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 24, 42-51',
          monicion: 'Jesús nos exhorta a la vigilancia activa, sirviendo con fidelidad y constancia.',
          texto: `En aquel tiempo, dijo Jesús a sus discípulos:
«Estén en vela, porque no saben qué día vendrá su Señor. Comprendan que si el dueño de casa supiera a qué hora de la noche viene el ladrón, estaría en vela y no dejaría abrir una brecha en su casa. Por eso, estén también ustedes preparados, porque a la hora que menos piensen viene el Hijo del hombre.

¿Dónde hay un siervo fiel y prudente, a quien el señor puso al frente de su servidumbre para darles la comida a su tiempo? ¡Dichoso el siervo a quien su señor, al llegar, lo encuentre haciéndolo así! En verdad les digo que lo pondrá al frente de todos sus bienes.

Pero si el siervo malvado dice para sus adentros: "Mi señor tarda en llegar", y empieza a pegar a sus compañeros, y come y bebe con los borrachos, vendrá el señor de ese siervo el día que no espera y a la hora que no sabe, y lo castigará con rigor y le asignará su lugar con los hipócritas. Allí será el llanto y el crujir de dientes».

Palabra del Señor.`
        },
        oracion_colecta: 'Señor Dios, concédenos permanecer en vela con las lámparas encendidas, para salir al encuentro de tu Hijo cuando vuelva. Por Jesucristo, nuestro Señor.'
      },
      5: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 1, 17-25',
          monicion: 'San Pablo proclama la locura de la Cruz como suprema sabiduría y poder salvador de Dios.',
          texto: `Hermanos: No me envió Cristo a bautizar, sino a anunciar el Evangelio, y no con sabiduría de palabras, para no hacer vana la cruz de Cristo.

Pues el mensaje de la cruz es necedad para los que se pierden; pero para los que se salvan, para nosotros, es fuerza de Dios. Porque está escrito: «Destruiré la sabiduría de los sabios y rechazaré la inteligencia de los inteligentes». ¿Dónde está el sabio? ¿Dónde el letrado? ¿Dónde el polemista de este mundo? ¿Acaso no ha convertido Dios en necedad la sabiduría de este mundo?

Porque, ya que el mundo no conoció a Dios por medio de la sabiduría en la sabiduría de Dios, quiso Dios salvar a los creyentes mediante la necedad de la predicación. Porque los judíos piden signos y los griegos buscan sabiduría; pero nosotros predicamos a Cristo crucificado, escándalo para los judíos y necedad para los gentiles; mas para los llamados, sean judíos o griegos, un Cristo que es fuerza de Dios y sabiduría de Dios. Porque la necedad de Dios es más sabia que los hombres, y la debilidad de Dios es más fuerte que los hombres.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 32',
          respuesta: 'R. La misericordia del Señor llena la tierra.',
          texto: `Aclamen, justos, al Señor,
que merece la alabanza de los buenos.
Den gracias al Señor con la cítara,
toquen para él el arpa de diez cuerdas.

R. La misericordia del Señor llena la tierra.

Que la palabra del Señor es sincera,
y todas sus acciones son leales;
él ama la justicia y el derecho,
y su misericordia llena la tierra.

R. La misericordia del Señor llena la tierra.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
Estén siempre despiertos y vigilantes, para que puedan presentarse seguros ante el Hijo del hombre.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 25, 1-13',
          monicion: 'La parábola de las diez vírgenes nos urge a mantener viva la llama de la fe y el aceite de las buenas obras.',
          texto: `En aquel tiempo, dijo Jesús a sus discípulos esta parábola:
«El reino de los cielos se parecerá a diez vírgenes que tomaron sus lámparas y salieron al encuentro del esposo. Cinco de ellas eran necias y cinco eran prudentes. Las necias, al tomar las lámparas, no se proveyeron de aceite; en cambio, las prudentes se llevaron alcuzas de aceite con las lámparas. Como el esposo tardaba, les entró sueño a todas y se durmieron.

A medianoche se oyó una voz: "¡Llega el esposo, salgan a su encuentro!". Entonces se despertaron todas aquellas vírgenes y se pusieron a preparar sus lámparas. Las necias dijeron a las prudentes: "Dennos un poco de su aceite, que se nos apagan las lámparas". Pero las prudentes contestaron: "Por si acaso no llega para nosotras y ustedes, es mejor que vayan a la tienda y se lo compren".

Mientras iban a comprarlo, llegó el esposo, y las que estaban preparadas entraron con él al banquete de bodas, y se cerró la puerta. Más tarde llegaron también las otras vírgenes, diciendo: "¡Señor, señor, ábrenos!". Pero él respondió: "En verdad les digo que no las conozco". Por tanto, estén en vela, porque no saben el día ni la hora».

Palabra del Señor.`
        },
        oracion_colecta: 'Dios todopoderoso y eterno, aumenta en nosotros la fe, la esperanza y la caridad. Por nuestro Señor Jesucristo.'
      },
      6: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 1, 26-31',
          monicion: 'Dios elige lo humilde y sencillo a los ojos del mundo para manifestar su gloria y salvación.',
          texto: `Hermanos: Fíjense en su llamamiento; no hay entre ustedes muchos sabios según la carne, ni muchos poderosos, ni muchos nobles. Sino que lo necio del mundo lo ha escogido Dios para avergonzar a los sabios; y lo débil del mundo lo ha escogido Dios para avergonzar a lo fuerte; y lo plebeyo y despreciable del mundo lo ha escogido Dios, lo que no es, para reducir a la nada lo que es, para que nadie pueda gloriarse en presencia de Dios.

De él les viene que ustedes estén en Cristo Jesús, el cual se ha hecho para nosotros sabiduría de parte de Dios, justicia, santificación y redención; para que, como está escrito: «El que se gloríe, que se gloríe en el Señor».

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 32',
          respuesta: 'R. Dichoso el pueblo que el Señor se escogió como heredad.',
          texto: `Dichosa la nación cuyo Dios es el Señor,
el pueblo que él escogió como heredad.
El Señor mira desde el cielo,
se fija en todos los hombres.

R. Dichoso el pueblo que el Señor se escogió como heredad.

Los ojos del Señor están puestos en sus fieles,
en los que esperan en su misericordia,
para librar sus vidas de la muerte
y reanimarlos en tiempo de hambre.

R. Dichoso el pueblo que el Señor se escogió como heredad.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
Les doy un mandamiento nuevo: que se amen unos a otros como yo los he amado.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 25, 14-30',
          monicion: 'La parábola de los talentos nos llama a poner fructíferamente nuestros dones al servicio del Señor.',
          texto: `En aquel tiempo, dijo Jesús a sus discípulos esta parábola:
«Un hombre, al irse de viaje, llamó a sus siervos y les encomendó sus bienes. A uno le dio cinco talentos, a otro dos y a otro uno, a cada cual según su capacidad; y se fue.

El que recibió cinco talentos fue enseguida a negociar con ellos y ganó otros cinco. Igualmente, el que recibió dos ganó otros dos. Pero el que recibió uno fue y cavó en la tierra y escondió el dinero de su señor.

Al cabo de mucho tiempo viene el señor de aquellos siervos y les pide cuentas. Llegó el que había recibido cinco talentos y presentó otros cinco talentos diciendo: "Señor, cinco talentos me dejaste; mira, he ganado otros cinco talentos". Su señor le dijo: "¡Bien, siervo bueno y fiel! En lo poco has sido fiel, al frente de mucho te pondré; entra en el gozo de tu señor"».

Palabra del Señor.`
        },
        oracion_colecta: 'Señor Dios, concédenos dar testimonio alegre del Evangelio y multiplicar los dones que nos has confiado. Por Jesucristo, nuestro Señor.'
      }
    }
  },
  22: {
    'II': {
      1: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 2, 1-5',
          monicion: 'San Pablo funda la fe no en la elocuencia humana, sino en la manifestación del Espíritu y del poder de Dios.',
          texto: `Hermanos: Cuando vine a ustedes para anunciarles el misterio de Dios, no vine con elocuencia o sabiduría humanas. Pues nunca entre ustedes me precié de saber cosa alguna, sino a Jesucristo, y a éste crucificado.

Me presenté a ustedes débil y tembloroso; mi palabra y mi predicación no tuvieron artificios persuasivos de la sabiduría, sino la manifestación y el poder del Espíritu, para que la fe de ustedes no se apoye en la sabiduría de los hombres, sino en el poder de Dios.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 118',
          respuesta: 'R. ¡Cuánto amo tu ley, Señor!',
          texto: `¡Cuánto amo tu ley, Señor!
Todo el día la estoy meditando.
Tus mandatos me hacen más sabio que mis enemigos,
siempre me acompañan.

R. ¡Cuánto amo tu ley, Señor!`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
El Espíritu del Señor está sobre mí; me ha enviado para anunciar el Evangelio a los pobres.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 4, 16-30',
          monicion: 'Jesús inaugura su ministerio en la sinagoga de Nazaret proclamando el año de gracia del Señor.',
          texto: `En aquel tiempo, Jesús fue a Nazaret, donde se había criado, entró en la sinagoga, como era su costumbre los sábados, y se puso de pie para hacer la lectura. Le entregaron el libro del profeta Isaías y, desenrollándolo, encontró el pasaje donde estaba escrito: «El Espíritu del Señor está sobre mí, porque él me ha ungido. Me ha enviado a evangelizar a los pobres, a proclamar a los cautivos la libertad y a los ciegos la vista; a poner en libertad a los oprimidos, a proclamar el año de gracia del Señor».

Enrolló el libro, lo devolvió al que ayudaba y se sentó. Toda la sinagoga tenía los ojos fijos en él. Y él comenzó a decirles: «Hoy se ha cumplido esta Escritura que acaban de oír».

Palabra del Señor.`
        }
      },
      2: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 2, 10b-16',
          monicion: 'El Espíritu escudriña las profundidades de Dios y nos revela sus misterios inefables.',
          texto: `Hermanos: El Espíritu todo lo sondea, incluso las profundidades de Dios. ¿Quién conoce lo íntimo del hombre, sino el espíritu del hombre que está en él? De la misma manera, lo íntimo de Dios no lo conoce nadie, sino el Espíritu de Dios.

Y nosotros no hemos recibido el espíritu del mundo, sino el Espíritu que viene de Dios, para que conozcamos los dones que Dios nos ha concedido... Nosotros tenemos la mente de Cristo.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 144',
          respuesta: 'R. El Señor es justo en todos sus caminos.',
          texto: `El Señor es clemente y misericordioso,
lento a la cólera y rico en piedad;
el Señor es bueno con todos,
es cariñoso con todas sus criaturas.

R. El Señor es justo en todos sus caminos.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
Un gran profeta ha surgido entre nosotros, Dios ha visitado a su pueblo.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 4, 31-37',
          monicion: 'Jesús expulsa con autoridad a un espíritu inmundo en la sinagoga de Cafarnaúm.',
          texto: `En aquel tiempo, Jesús bajó a Cafarnaúm, ciudad de Galilea, y los sábados les enseñaba. Quedaban asombrados de su doctrina, porque su palabra estaba llena de autoridad.

Había en la sinagoga un hombre poseído por el espíritu de un demonio inmundo, que se puso a gritar con fuerte voz: «¡Basta! ¿Qué tenemos que ver contigo, Jesús de Nazaret? ¿Has venido a destruirnos? Sé quién eres: el Santo de Dios».

Jesús le increpó diciendo: «¡Cállate y sal de él!». El demonio, tirándolo al suelo en medio de todos, salió de él sin hacerle daño alguno.

Palabra del Señor.`
        }
      },
      3: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 3, 1-9',
          monicion: 'San Pablo recuerda que los apóstoles son servidores por medio de los cuales Dios hace crecer su obra.',
          texto: `Hermanos: Yo no pude hablarles como a espirituales, sino como a carnales, como a niños en Cristo. Les di a beber leche, no alimento sólido, pues todavía no podían... ¿Qué es Apolo? ¿Qué es Pablo? Servidores por medio de los cuales ustedes han creído, según lo que a cada uno le dio el Señor. Yo planté, Apolo regó; pero Dios dio el crecimiento. De modo que ni el que planta es algo, ni el que riega, sino Dios que da el crecimiento... Nosotros somos colaboradores de Dios, y ustedes campo de Dios, edificio de Dios.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 32',
          respuesta: 'R. Dichoso el pueblo que el Señor se escogió como heredad.',
          texto: `Dichosa la nación cuyo Dios es el Señor,
el pueblo que él escogió como heredad.
El Señor mira desde el cielo,
se fija en todos los hombres.

R. Dichoso el pueblo que el Señor se escogió como heredad.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
El Señor me ha enviado para anunciar la buena noticia a los pobres, para proclamar la liberación a los cautivos.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 4, 38-44',
          monicion: 'Jesús cura a la suegra de Simón Pedro y a numerosos enfermos, extendiendo el Reino de Dios.',
          texto: `En aquel tiempo, al salir Jesús de la sinagoga, entró en la casa de Simón. La suegra de Simón estaba con una gran fiebre, y le rogaron por ella. Inclinándose sobre ella, increpó a la fiebre y la fiebre la dejó; enseguida se levantó y se puso a servirles.

Al ponerse el sol, todos los que tenían enfermos de diversos males se los llevaban; y él, poniendo las manos sobre cada uno de ellos, los curaba. De muchos salían también demonios gritando: «¡Tú eres el Hijo de Dios!». Pero él los increpaba y no los dejaba hablar, porque sabían que él era el Mesías.

Al hacerse de día, salió y se fue a un lugar desierto. La multitud lo buscaba y, llegando donde él estaba, intentaban retenerlo para que no se fuera. Pero él les dijo: «Es necesario que anuncie el reino de Dios también a las otras ciudades, pues para esto he sido enviado».

Palabra del Señor.`
        }
      },
      4: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 3, 18-23',
          monicion: 'La sabiduría de este mundo es necedad ante Dios. Todo es nuestro, y nosotros somos de Cristo.',
          texto: `Hermanos: Que nadie se engañe. Si alguno de ustedes se cree sabio según este mundo, hágase necio para llegar a ser sabio. Porque la sabiduría de este mundo es necedad ante Dios...

Por tanto, que nadie se gloríe en los hombres. Pues todo es de ustedes: sea Pablo, sea Apolo, sea Cefas, sea el mundo, sea la vida, sea la muerte, sea el presente, sea el futuro. Todo es de ustedes; pero ustedes son de Cristo, y Cristo es de Dios.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 23',
          respuesta: 'R. Del Señor es la tierra y cuanto la llena.',
          texto: `Del Señor es la tierra y cuanto la llena,
el orbe y los que en él habitan;
pues él la fundó sobre los mares,
la afianzó sobre los ríos.

R. Del Señor es la tierra y cuanto la llena.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
Vengan a mí y los haré pescadores de hombres, dice el Señor.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 5, 1-11',
          monicion: 'La pesca milagrosa y el llamado de Simón Pedro: «Rema mar adentro y echen las redes».',
          texto: `En aquel tiempo, la multitud se agolpaba sobre Jesús para oír la palabra de Dios, estando él a la orilla del lago de Genesaret. Vio dos barcas que estaban a la orilla del lago; los pescadores habían desembarcado y lavaban las redes. Subiendo a una de las barcas, que era de Simón, le pidió que la apartara un poco de tierra. Desde la barca, sentado, enseñaba a la multitud.

Cuando acabó de hablar, dijo a Simón: «Rema mar adentro y echen las redes para pescar». Simón le respondió: «Maestro, hemos estado bregando toda la noche y no hemos pescado nada; pero, por tu palabra, echaré las redes».

Y, puestos a la obra, hicieron una redada tan grande de peces que las redes se rompían... Al ver esto, Simón Pedro se echó a los pies de Jesús diciendo: «Apártate de mí, Señor, que soy un hombre pecador»... Jesús dijo a Simón: «No temas; desde ahora serás pescador de hombres». Ellos sacaron las barcas a tierra y, dejándolo todo, lo siguieron.

Palabra del Señor.`
        }
      },
      5: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 4, 1-5',
          monicion: 'Los apóstoles son administradores de los misterios de Dios; sólo el Señor es juez de los corazones.',
          texto: `Hermanos: Que la gente nos tenga por servidores de Cristo y administradores de los misterios de Dios. Ahora bien, lo que se busca en los administradores es que sean fieles. A mí muy poco me importa ser juzgado por ustedes o por un tribunal humano; ni siquiera yo mismo me juzgo... Mi juez es el Señor.

Por tanto, no juzguen antes de tiempo, hasta que venga el Señor. Él iluminará lo que esconden las tinieblas y manifestará los designios de los corazones. Entonces cada uno recibirá de Dios la alabanza debida.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 36',
          respuesta: 'R. La salvación de los justos viene del Señor.',
          texto: `Confía en el Señor y haz el bien,
habita tu tierra y practica la lealtad;
sea el Señor tu delicia,
y él te dará lo que pide tu corazón.

R. La salvación de los justos viene del Señor.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
Yo soy la luz del mundo, dice el Señor; el que me sigue tendrá la luz de la vida.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 5, 33-39',
          monicion: 'Jesús nos invita a la novedad del Evangelio: vino nuevo en odres nuevos.',
          texto: `En aquel tiempo, los fariseos y los escribas dijeron a Jesús: «Los discípulos de Juan ayunan a menudo y rezan oraciones, lo mismo que los discípulos de los fariseos; en cambio, los tuyos comen y beben».

Jesús les dijo: «¿Acaso pueden hacer ayunar a los invitados a la boda mientras el esposo está con ellos? Llegarán días en que el esposo les será arrebatado; entonces ayunarán en aquellos días».

Les dijo también una parábola: «Nadie corta un trozo de un vestido nuevo para ponérselo a un vestido viejo... Nadie echa tampoco vino nuevo en odres viejos; de lo contrario, el vino nuevo reventará los odres, se derramará y los odres se echarán a perder. Sino que el vino nuevo debe echarse en odres nuevos».

Palabra del Señor.`
        }
      },
      6: {
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 4, 6b-15',
          monicion: 'San Pablo describe las fatigas apostólicas por amor a Cristo y a las comunidades creyentes.',
          texto: `Hermanos: Aprendan de nosotros aquello de: «No ir más allá de lo escrito»... Pues ¿quién te hace superior? ¿Qué tienes que no hayas recibido? Y si lo recibiste, ¿de qué te glorías como si no lo hubieras recibido?...

Hasta el presente pasamos hambre, sed, desnudez; somos abofeteados y andamos errantes; nos fatigamos trabajando con nuestras manos; insultados, bendecimos; perseguidos, aguantamos; difamados, consolamos... No les escribo esto para avergonzarlos, sino para amonestarlos como a hijos míos muy queridos. Porque aunque tuvieran diez mil pedagogos en Cristo, no tienen muchos padres; pues fui yo quien, por medio del Evangelio, los engendré en Cristo Jesús.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 144',
          respuesta: 'R. Cerca está el Señor de cuantos lo invocan.',
          texto: `El Señor es justo en todos sus caminos,
es bondadoso en todas sus acciones;
cerca está el Señor de los que lo invocan,
de los que lo invocan sinceramente.

R. Cerca está el Señor de cuantos lo invocan.`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
Yo soy el camino, la verdad y la vida, dice el Señor; nadie va al Padre sino por mí.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 1-5',
          monicion: 'Jesús proclama que el Hijo del hombre es Señor del sábado, primando la misericordia y la vida.',
          texto: `Un sábado, Jesús atravesaba unos sembrados; sus discípulos arrancaban espigas, las desgranaban con las manos y se las comían.

Algunos de los fariseos dijeron: «¿Por qué hacen lo que no está permitido en sábado?».

Jesús les respondió: «¿Ni siquiera han leído lo que hizo David, cuando él y sus hombres tuvieron hambre: cómo entró en la casa de Dios, tomó los panes de la proposición, comió y dio a los que estaban con él, los cuales sólo a los sacerdotes está permitido comer?».

Y les decía: «El Hijo del hombre es señor del sábado».

Palabra del Señor.`
        }
      }
    }
  }
};

/**
 * Función que resuelve las lecturas del Leccionario Ferial Romano
 * para cualquier semana del Tiempo Ordinario (1 a 34), día de la semana (1 a 6) y ciclo ferial (I o II)
 */
export function getFerialLectionary(weekNum: number, dayOfWeek: number, cycle: 'I' | 'II'): FerialReadingEntry | null {
  if (LECCIONARIO_FERIAL[weekNum] && LECCIONARIO_FERIAL[weekNum][cycle] && LECCIONARIO_FERIAL[weekNum][cycle][dayOfWeek]) {
    return LECCIONARIO_FERIAL[weekNum][cycle][dayOfWeek];
  }
  
  // Fallback si no está explícito: generar lecturas evangélicas de Mateo, Marcos o Lucas según la semana
  const isMc = weekNum <= 9;
  const isMt = weekNum >= 10 && weekNum <= 21;
  const gospelBook = isMc ? 'San Marcos' : isMt ? 'San Mateo' : 'San Lucas';
  
  return {
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: `Lectura bíblica de la feria (Semana ${weekNum} del Tiempo Ordinario, Año ${cycle})`,
      texto: `Lectura de la Sagrada Escritura según el Leccionario Ferial Romano. La Palabra de Dios nos ilumina en el caminar diario hacia la plenitud del Reino.`,
      monicion: 'Escuchemos con fe la Palabra salvadora del Señor en este día ferial.'
    },
    salmo_responsorial: {
      cita: 'Salmo Responsorial',
      respuesta: 'R. Dichoso el que confía en el Señor.',
      texto: `Dichoso el hombre que no sigue el consejo de los impíos,
sino que en la ley del Señor se deleita,
y día y noche medita en su ley.

R. Dichoso el que confía en el Señor.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
Tus palabras, Señor, son espíritu y vida; tú tienes palabras de vida eterna.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: `Lectura del santo Evangelio según ${gospelBook}`,
      texto: `En aquel tiempo, Jesús enseñaba a sus discípulos diciendo: «El que me ama guardará mi palabra, y mi Padre lo amará y vendremos a él y haremos morada en él».`,
      monicion: 'Aclamemos con fe y alegría el Santo Evangelio de nuestro Señor Jesucristo.'
    }
  };
}
