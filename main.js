
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = timer;
let tiempoRegresivoId = null;

let aciertoAudio = new Audio('./sounds/acierto.wav');
let clickAudio = new Audio('./sounds/click.wav');
let errorAudio = new Audio('./sounds/error.wav');
let ganasteAudio = new Audio('./sounds/ganaste.wav');
let perdisteAudio = new Audio('./sounds/perdiste.wav');

let mostrarMovimientos = document.getElementById('movimientos')
let mostarAciertos = document.getElementById('aciertos')
let mostrarTiempo =document.getElementById('t-restante')

let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(() => {return Math.random()-0.5});
console.log(numbers);

function contarTiempo(){
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `tiempo: ${timer} segundos`;
    if(timer == 0){
      clearInterval(tiempoRegresivoId);
      bloquearTarjeta();
      perdisteAudio.play();
    }
  },1000);
}

function bloquearTarjeta(){
  for (let i = 0; i <= 15; i++){
    let tarjetaBloqueada =document.getElementById(i)
    tarjetaBloqueada.innerHTML = `<img src="./images/${numbers[i]}.png" alt="">`;
    tarjetaBloqueada.disabled = true;
    
  }
}

function turn(id) {

  if(temporizador == false){
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if(tarjetasDestapadas == 1){
    tarjeta1 = document.getElementById(id);
    primerResultado = numbers[id]
    tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;
    clickAudio.play();
    tarjeta1.disabled = true;

  }else if(tarjetasDestapadas ==2){
    tarjeta2 = document.getElementById(id);
    segundoResultado = numbers[id];
    tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;
    tarjeta2.disabled = true;

    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if(primerResultado == segundoResultado){
      tarjetasDestapadas = 0;

      aciertos++;
      mostarAciertos.innerHTML = `aciertos: ${aciertos}`;
      aciertoAudio.play();

      if(aciertos == 8){
        ganasteAudio.play();
        clearInterval(tiempoRegresivoId);
        mostarAciertos.innerHTML = `aciertos: ${aciertos} buena`;
        mostrarTiempo.innerHTML = `Solo te demoraste ${timerInicial- timer} segundos`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;  
      }
    }else{
      errorAudio.play();
      setTimeout(() => {
        tarjeta1.innerHTML = '';
        tarjeta2.innerHTML = '';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      },800);
    }
  }

}