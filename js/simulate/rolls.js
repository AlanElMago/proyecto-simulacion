import { dado } from "../modelo/modelo.js";
import { primeraTirada } from "./estrategias/primeraTirada.js";
import { seccionInferior } from "./estrategias/priorizarSeccionInferior.js";
import { seccionSuperior } from "./estrategias/priorizarSeccionSuperior.js";
import { PointsTable, casillas } from "./points-table.js";
import { endgame } from "./simulate.js";
let diceHolder = document.querySelector('.dice-holder');
let turnos = 0;
let incremento = 0;
export let dadosTirados = 0;

export function Rolls(rolls, btn_rolls, rolls_container, dices, opcion, semilla) {  
  btn_rolls.addEventListener('click', () => {    
    if (rolls === 0) {
      // console.log(casillas[turnos].children[1])
      // casillas[turnos].children[1].click()
      if(turnos === 13) turnos = 0;
      turnos++;

      rolls = 3;
      rolls_container.removeChild(btn_rolls);
      rolls_container.innerHTML = `
        <Button class="btn btn-tirar" id="btn-no-rolls">
          <div class="text-btn">
            <img src="./Images/tirar-x.png" class="img-btn">
            <p>Tirar</p>
          </div>
        </Button>`;

      let btn_no_rolls = document.querySelector('#btn-no-rolls');
      
      btn_no_rolls.addEventListener('click', () => {
        rolls = 3;
        rolls_container.removeChild(btn_no_rolls);
        rolls_container.innerHTML = `
          <Button class="btn" id="btn-rolls">
            <div class="text-btn">
              <img src="./Images/${rolls}.png" class="img-btn">
                <p>Tirar</p>
            </div>
          </Button>
        `;

        diceHolder.innerHTML = /* html */ `
          <div class="die-holder" id="die-1"></div>
          <div class="die-holder" id="die-2"></div>
          <div class="die-holder" id="die-3"></div>
          <div class="die-holder" id="die-4"></div>
          <div class="die-holder" id="die-5"></div>
        `

        dices = document.querySelectorAll('.die-holder');
        btn_rolls = document.querySelector('#btn-rolls');
        
        Rolls(rolls, btn_rolls, rolls_container, dices, opcion, semilla);
        dices.forEach((dice) => {
          for (let i = 0; i < 6; i++) {
            if (!dice.classList.contains(`die_${i + 1}`)) {
              dice.classList.remove(`die_${i + 1}`);
            }
          }        
        });

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
      });
      
      btn_no_rolls.click()
    } else {      
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
      dices.forEach((dice) => {
        for (let i = 0; i < 6; i++) {
          if (!dice.classList.contains('die-stroke')) {
            dice.classList.remove(`die_${i + 1}`);            
          }
        }        
      });
      let caras = dado(parseInt(semilla.value) + incremento);
      incremento++;
      for (let i = 0; i < 5; i++) {
        if (!dices[i].classList.contains('die-stroke')) {
          dadosTirados++;
          dices[i].classList.add(`die_${caras[i]}`);
        }
      }      

      
      PointsTable(dices, turnos)
      switch(opcion) {
        case 1:
          seccionSuperior(dices, rolls, casillas);          
          break;
        case 2:
          seccionInferior(dices, rolls, casillas, turnos);          
          break;
        case 3:
          primeraTirada(dices, rolls, casillas);            
          break;
        default:
          break;
      }
      
      rolls--;
      Rolls(rolls, btn_rolls, rolls_container, dices, opcion, semilla); 
    }
  });  
}