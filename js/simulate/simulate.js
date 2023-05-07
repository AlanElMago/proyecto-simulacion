import { Rolls } from "./rolls.js";
import { 
  btnMenuPlay,
  btnCloseMenuPlay,
  botones, 
  opcion
} from "./interfaz.js";
import { stats } from "./stats.js";
import { modalCampos } from "./modalCampos.js";
let rolls_container = document.querySelector('#rolls-container');
let btn_rolls = document.querySelector('#btn-rolls');
let dices = document.querySelectorAll('.die-holder');
let btnMenuSimulate = document.querySelector('#btn-menu-simulate');
let btnMenuSimulateSubmit = document.querySelector('#btn-menu-simulate-submit');
let btnCloseMenuSimulate = document.querySelector('#btn-close-menu-simulate');
let menuSimulate = document.querySelector('#menu-simulate');
let numeroJuegos = document.querySelector('#numero-juegos');
let juegosLabel = document.querySelector('.juegos-label');
let semilla = document.querySelector('#semilla');
export let endgame = false;

let rolls = 3;

function showForm(){
  menuSimulate.showModal();
}

dices.forEach((dice) => {
  dice.addEventListener('click', () => {
    let clases = dice.classList;
    if (!clases.contains('die-stroke')) {
      dice.classList.add('die-stroke');
    } else {
      dice.classList.remove('die-stroke');
    }
  });
});

btnMenuSimulate.addEventListener('click', showForm)

btnCloseMenuSimulate.addEventListener('click', (e) => {
  e.preventDefault();

  menuSimulate.close();  
})

btnMenuSimulateSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  if(numeroJuegos.value === '' || opcion === 0 || semilla.value === ''){
    modalCampos(1);
  } else if (semilla.value.length < 4) {
    modalCampos(2);
  } else {
    menuSimulate.close();
    
    let html = /* html */ `
      <div>    
      <p>Simulando...</p>
      </div>
      <div>
      <p>Juego 0 de ${numeroJuegos.value}</p>
      </div>
    `

    juegosLabel.innerHTML = html;
    
    rolls_container.removeChild(btn_rolls);
    rolls_container.innerHTML = `
      <Button class="btn" id="btn-rolls">
        <div class="text-btn">
          <img src="./Images/${rolls}.png" class="img-btn">
            <p>Tirar</p>
        </div>
      </Button>
    `;

    btn_rolls = document.querySelector('#btn-rolls');

    Rolls(rolls, btn_rolls, rolls_container, dices, opcion, semilla);
    
    timeoutId = setInterval(myFunction, 50);    
  }
})


let counter = 0;
let timeoutId;
let juegos = 0;

function myFunction() {
  let x = parseInt(numeroJuegos.value) * 52;
  endgame = false;

  if(counter % 52 === 0){    
    juegos++        
  } else {
    let html = /* html */ `
      <div>    
        <p>Simulando...</p>
      </div>
      <div>
        <p>Juego ${juegos} de ${numeroJuegos.value}</p>
      </div>
    `

    juegosLabel.innerHTML = html;
  }
  counter++;  

  btn_rolls.click();

  if (counter === x + 1) {
    clearTimeout(timeoutId);

    let html = /* html */ `
      <div>    
        <p>¡Terminado!</p>
      </div>
    `

    stats(numeroJuegos.value, opcion);
    juegosLabel.innerHTML = html;
    endgame = true;
    btn_rolls = document.querySelector('#btn-rolls');
    juegos = 0;
    counter = 0;    

    btnMenuSimulate.removeEventListener('click', showForm)

    btnMenuSimulate.innerHTML = /* html */ `
      <div class="text-btn text-btn-reload">
        <i class="fa-solid fa-rotate-right"></i>
        Reiniciar
      </div>
    `;
    btnMenuSimulate.addEventListener('click', () => { location.reload(); })
  }
}
