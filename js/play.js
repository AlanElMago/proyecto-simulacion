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
let is_stroke = false;

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

function Rolls() {
  btn_rolls.addEventListener('click', () => {
    if (rolls === 1) {
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

        btn_rolls = document.querySelector('#btn-rolls');
        Rolls();
      });
    } else {
      rolls--;
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

      Rolls();
    }
  });
}

Rolls();
