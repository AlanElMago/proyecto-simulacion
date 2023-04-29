/* imports */
import { Rolls } from './rolls.js';
/* elements */
let rolls_container = document.querySelector('#rolls-container');
let btn_rolls = document.querySelector('#btn-rolls');
let dices = document.querySelectorAll('.die-holder');
let btnMenuPlay = document.querySelector('#btn-menu-play');
let btnCloseMenuPlay = document.querySelector('#btn-close-menu-play');
let menuPlay = document.querySelector('#menu-play');

/* variables */
let rolls = 3;

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

Rolls(rolls, btn_rolls, rolls_container, dices);