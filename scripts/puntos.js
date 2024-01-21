function puntuar(){
    for (let jugador = 0; jugador < jugadores.length; jugador++){
        jugadores[jugador].puntos = 0;
    }
    for (let jugador = 0; jugador < jugadores.length; jugador++) {
        const parejasContadas = new Set();
        const triosContados = new Set();
        const gruposDeCuatroContados = new Set();
        let escaleraEncontrada = true;
        let vidas = 2;
        let escalados = 0;
        let tieneTrioYPareja = false; // Variable para rastrear si el jugador tiene un trio y una pareja
        let cartasMismoPalo = {}; // Objeto para contar cuántas cartas tiene el jugador de cada palo
        let paloEscalera = null; // Variable para almacenar el palo de la escalera

        const manoOrdenada = jugadores[jugador].mano
            .map((cartaIndex) => cartas[cartaIndex].n)
            .sort((a, b) => a - b);

        for (let i = 0; i < manoOrdenada.length; i++) {
            const cartaActual = manoOrdenada[i];
            const siguienteCarta = manoOrdenada[i + 1];

            if (!gruposDeCuatroContados.has(cartaActual)) {
                const cartasConMismoNombre = manoOrdenada.filter(
                    (carta) => carta === cartaActual
                );

                if (cartasConMismoNombre.length === 4) {
                    jugadores[jugador].puntos += 7;
                    gruposDeCuatroContados.add(cartaActual);
                } else if (cartasConMismoNombre.length === 3 && !triosContados.has(cartaActual)) {
                    jugadores[jugador].puntos += 3;
                    triosContados.add(cartaActual);

                    // Verificar si hay una pareja también
                    if (parejasContadas.size > 0 && !tieneTrioYPareja) {
                        jugadores[jugador].puntos += 2; // Sumar 2 puntos adicionales por el trío y la pareja
                        tieneTrioYPareja = true;
                    }
                } else if (cartasConMismoNombre.length === 2 && !parejasContadas.has(cartaActual)) {
                    jugadores[jugador].puntos += 1;
                    parejasContadas.add(cartaActual);

                    // Verificar si hay un trío también
                    if (triosContados.size > 0 && !tieneTrioYPareja) {
                        jugadores[jugador].puntos += 2; // Sumar 2 puntos adicionales por el trío y la pareja
                        tieneTrioYPareja = true;
                    }
                }

                if(siguienteCarta){
                    if((siguienteCarta-1 == cartaActual || siguienteCarta+12 == cartaActual) && vidas >= 0){
                        escalados++;
                    } else if(siguienteCarta-1 != cartaActual && siguienteCarta+12 != cartaActual){
                        vidas--;
                    }
                } else if(escalados > 4){
                    jugadores[jugador].puntos += 4;
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

        // Verificar si hay una escalera de cualquier número consecutivo y todas las cartas son del mismo palo
        if (escaleraEncontrada && palos.includes(5) && palos.length === 1) {
            jugadores[jugador].puntos += 8;
        }
    }
}