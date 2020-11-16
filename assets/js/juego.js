/***
 * 2C = 2 DE TREBOL
 * 2D = 2 DE DIAMANTES
 * 2H = 2 DE CORAZONES
 * 2S = 2 DE ESPADAS
 * 
 */

 //sintaxis del patron modulo
 //fuincion anonima autoinvocada
(() => {
    'use strict' //modo estricto
    
    let deck = [];
    let tipos = ['C', 'D', 'H', 'S'];
    let especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0;
    let puntosComputadora = 0;

    // referecia del html
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');
    const puntoSHTML = document.querySelectorAll('small');



    //console.log(btnPedir);

    //  Esta funcion incializa el juego
    const inicializarJuego = () => {
        crearDeck();
    }
    // esta funcion crea una nueva barajaa
    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }  
        }

        for (let tipo of tipos) {
            for (let especial of especiales){
                deck.push(especial + tipo)
            }    
        }
        // console.log({deck});
        deck = _.shuffle( deck);
        //console.log(deck);

        return deck;
    }

    // esta funcion me permite tomar una carta
    const pedirCarta = () =>{
        
        if(deck.length === 0){
            throw 'No hay cartas en la baraja'
        }
        const carta = deck.pop();
        //console.log(deck);
        //console.log(carta);
        return carta;
    }
    // pedirCarta();
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        

        //regresa tru si no es un numero
        /*
        if(isNaN(valor)){

            //operador ternario
            puntos = (valor === 'A') ? 11 : 10; 

        }else{
            
            //al multiplicar x1 se vuelve en numero
            puntos = valor*1;
        }
        */

        return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : (valor * 1);
        
    }

    const acumularPuntos = () => {

        

    }
    // TURNO DE LA COMPUTADORA
    const turnoComputadora = (puntosMinimos) =>{
        do {
            const carta = pedirCarta();
        
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntoSHTML[1].innerText = puntosComputadora;
        
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }
            
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        
        //10 milesimas de segundo
        setTimeout(() =>{
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            }else if (puntosMinimos > 21) {
                alert('Computadora gana');
            }else if(puntosComputadora > 21){
                alert('Jugador gana');
            }else{
                alert('Computadora gana');
            }
        }, 10);

        

    }

    // const valor = valorCarta(pedirCarta());
    
    //console.log({valor});
    

    // si es plomo en la terminal es un string

    // EVENTOS
    // un callbakc es una funcion que se esta mandando como argumento
    // cuando se haga cliuck en el boton se va a disparar la accion 
    btnPedir.addEventListener('click',() => {
        
        const carta = pedirCarta();
        
        puntosJugador = puntosJugador + valorCarta(carta);
        puntoSHTML[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Perdiste pe man');
            //bloquear el boton
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if( puntosJugador === 21){
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
        }

    });



    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        
    });

    btnNuevo.addEventListener('click', () =>{

        console.clear();
        inicializarJuego();
        //deck = [];
        //deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntoSHTML[0].innerText = 0;
        puntoSHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });
    

})();

/*
(function () {
    
})()
*/


//TODO: BORRAR
