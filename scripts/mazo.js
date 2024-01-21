let mazo = [];

for(let carta = 0;carta < cartas.length;carta++){
	let id = Math.floor(Math.random()*cartas.length);

	while(mazo.includes(id)){
		id = Math.floor(Math.random()*cartas.length);
	}

	mazo[carta] = id;
}