/* imports */
import { Rolls } from './rolls.js';
/* elements */
let die_1 = document.querySelector('#die-1');
let die_2 = document.querySelector('#die-2');
let die_3 = document.querySelector('#die-3');
let die_4 = document.querySelector('#die-4');
let die_5 = document.querySelector('#die-5');
let rolls_container = document.querySelector('#rolls-container');
let btn_rolls = document.querySelector('#btn-rolls');
let dices = document.querySelectorAll('.die-holder');

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

Rolls(rolls, btn_rolls, rolls_container, dices);