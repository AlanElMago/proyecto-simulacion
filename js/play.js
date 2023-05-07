/* imports */
import { Rolls } from './rolls.js';
import { modalCampos } from './simulate/modalCampos.js';
/* elements */
let rolls_container = document.querySelector('#rolls-container');
let btn_rolls = document.querySelector('#btn-rolls');
let dices = document.querySelectorAll('.die-holder');
let btnMenuPlay = document.querySelector('#btn-menu-play');
let btnSubmit = document.querySelector('#btn-menu-play-submit');
let btnCloseMenuPlay = document.querySelector('#btn-close-menu-play');
let menuPlay = document.querySelector('#menu-play');
let menuForm = document.querySelector('#menu-form');
let semilla = document.querySelector('#semilla');

/* variables */
let rolls = 3;

menuForm.showModal()

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

btnMenuPlay.addEventListener('click', () => {
  menuPlay.showModal();
})

btnCloseMenuPlay.addEventListener('click', () => {
  menuPlay.close();
})

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  
  if(semilla.value.length < 4) {
    modalCampos(2);
  } else {
    Rolls(rolls, btn_rolls, rolls_container, dices, semilla);
    menuForm.close();
  }
})

menuForm.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
  }
});