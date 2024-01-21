let palos = ["picas","treboles","diamantes","corazones"];

class Carta{
	constructor(n,palo){
		this.n = n;
		this.palo = palo;
		this.name = `${n} de ${palo}`;
	}
}