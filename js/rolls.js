import { PointsTable } from "./points-table.js";
let diceHolder = document.querySelector('.dice-holder');

export function Rolls(rolls, btn_rolls, rolls_container, dices) {  
  btn_rolls.addEventListener('click', () => {
    if (rolls === 0) {
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
        
        Rolls(rolls, btn_rolls, rolls_container, dices);
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
      for (let i = 0; i < 5; i++) {
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        if (!dices[i].classList.contains('die-stroke')) {
          dices[i].classList.add(`die_${randomNumber}`);
        }
      }      

      PointsTable(dices)
      rolls--;
      Rolls(rolls, btn_rolls, rolls_container, dices); 
    }
  });
}
