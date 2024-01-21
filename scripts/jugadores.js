let jugadores = [];

for(let jugador = 0;jugador < 5;jugador++){
	jugadores[jugador] = new Jugador();

	jugadores[jugador].cartas[0] = mazo[jugador*2];
	jugadores[jugador].cartas[1] = mazo[jugador*2+1];

	jugadores[jugador].mano = [
		jugadores[jugador].cartas[0],jugadores[jugador].cartas[1],
		mano[0],mano[1],mano[2],mano[3],mano[4]
	];
}