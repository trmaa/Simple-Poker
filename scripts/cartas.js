let cartas = [];

for(let raza = 0;raza < 4;raza++){
	for(let n = 0;n < 13;n++){
		cartas[n*palos.length+raza] = new Carta(n+1,palos[raza]);
	}
}