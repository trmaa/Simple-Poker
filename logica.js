//------------------------------------------------------------------CARTAS

let palos = ["picas","treboles","diamantes","corazones"];

class Carta{
	constructor(n,palo){
		this.n = n;
		this.palo = palo;
		this.name = `${n} de ${palo}`;
	}
}

let cartas = [];

for(let raza = 0;raza < 4;raza++){
	for(let n = 0;n < 13;n++){
		cartas[n*palos.length+raza] = new Carta(n+1,palos[raza]);
	}
}

		//mazo

let mazo = [];

for(let carta = 0;carta < cartas.length;carta++){
	let id = Math.floor(Math.random()*cartas.length);

	while(mazo.includes(id)){
		id = Math.floor(Math.random()*cartas.length);
	}

	mazo[carta] = id;
}
	
		//mesa

let mano = [];

for(let i = 0;i < 5;i++){
	mano[i] = mazo[i+5*2-1];
}

//------------------------------------------------------------------JUGADORES

class Jugador{
	constructor(){
		this.puntos = 0;
		this.cartas = [];
		this.mano = [];
		this.dinero = 10000;
	}
}

let jugadores = [];

for(let jugador = 0;jugador < 5;jugador++){
	jugadores[jugador] = new Jugador();

	jugadores[jugador].cartas[0] = mazo[jugador*2];
	jugadores[jugador].cartas[1] = jugadores[jugador].cartas[0]+1;

	jugadores[jugador].mano = [
		jugadores[jugador].cartas[0],jugadores[jugador].cartas[1],
		mano[0],mano[1],mano[2],mano[3],mano[4]
	];
}

//------------------------------------------------------------------PUNTOS

for (let jugador = 0; jugador < jugadores.length; jugador++) {
    const parejasContadas = new Set();
    const triosContados = new Set();
    const gruposDeCuatroContados = new Set();
    let escaleraEncontrada = false;
    let tieneTrioYPareja = false; // Variable para rastrear si el jugador tiene un trio y una pareja
    let cartasMismoPalo = {}; // Objeto para contar cuántas cartas tiene el jugador de cada palo
    let paloEscalera = null; // Variable para almacenar el palo de la escalera

    const manoOrdenada = jugadores[jugador].mano
        .map((cartaIndex) => cartas[cartaIndex])
        .sort((a, b) => a.v - b.v);

    for (let i = 0; i < manoOrdenada.length; i++) {
        const cartaActual = manoOrdenada[i];
        const siguienteCarta = manoOrdenada[i + 1];

        if (!gruposDeCuatroContados.has(cartaActual.n)) {
            const cartasConMismoNombre = manoOrdenada.filter(
                (carta) => carta.n === cartaActual.n
            );

            if (cartasConMismoNombre.length === 4) {
                jugadores[jugador].puntos += 7;
                gruposDeCuatroContados.add(cartaActual.n);
            } else if (cartasConMismoNombre.length === 3 && !triosContados.has(cartaActual.n)) {
                jugadores[jugador].puntos += 3;
                triosContados.add(cartaActual.n);

                // Verificar si hay una pareja también
                if (parejasContadas.size > 0 && !tieneTrioYPareja) {
                    jugadores[jugador].puntos += 2; // Sumar 2 puntos adicionales por el trío y la pareja
                    tieneTrioYPareja = true;
                }
            } else if (cartasConMismoNombre.length === 2 && !parejasContadas.has(cartaActual.n)) {
                jugadores[jugador].puntos += 1;
                parejasContadas.add(cartaActual.n);

                // Verificar si hay un trío también
                if (triosContados.size > 0 && !tieneTrioYPareja) {
                    jugadores[jugador].puntos += 2; // Sumar 2 puntos adicionales por el trío y la pareja
                    tieneTrioYPareja = true;
                }
            }

            if (siguienteCarta && siguienteCarta.v === cartaActual.v + 1 && siguienteCarta.v !== 14) {
                if (cartasConMismoNombre.length === 1) {
                    jugadores[jugador].puntos += 4;
                    escaleraEncontrada = true;
                    paloEscalera = cartaActual.palo;
                }
            } else {
                escaleraEncontrada = false;
            }
        }

        // Contar las cartas del mismo palo
        if (cartasMismoPalo[cartaActual.palo]) {
            cartasMismoPalo[cartaActual.palo]++;
        } else {
            cartasMismoPalo[cartaActual.palo] = 1;
        }
    }

    // Verificar si el jugador tiene 5 cartas del mismo palo
    const palos = Object.values(cartasMismoPalo);
    if (palos.includes(5)) {
        jugadores[jugador].puntos += 5;
    }

    // Verificar si la escalera es específicamente de 10, 11, 12, 13, 1 y todas las cartas son del mismo palo
    if (escaleraEncontrada && paloEscalera && cartasMismoPalo[paloEscalera] === 5) {
        jugadores[jugador].puntos += 30;
    }
}

for (let i = 0; i < jugadores[0].mano.length; i++) {
	console.log(cartas[jugadores[0].mano[i]].name);
}