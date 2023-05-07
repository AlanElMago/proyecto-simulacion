let total = document.querySelector('#total');
let resultadoContainer = document.querySelector('#resultado');
let pointsContainer = document.querySelectorAll('.points-container');

export function finalizarTurno(){
  pointsContainer[0].innerHTML = `
    <div class = "block" id="unos">
        <label>Unos</label>
        <div class="score-block"></div>
    </div>
    <div class = "block" id="doses">
        <label>Doses</label>
        <div class="score-block"></div>
    </div>
    <div class = "block" id="treses">
        <label>Treses</label>
        <div class="score-block"></div>
    </div>
    <div class = "block" id="cuatros">
        <label>Cuatros</label>
        <div class="score-block"></div>
    </div>
    <div class = "block" id="cincos">
        <label>Cincos</label>
        <div class="score-block"></div>
    </div>
    <div class = "block" id="seises">
        <label>Seises</label>
        <div class="score-block"></div>
    </div>
  `
  
  pointsContainer[1].innerHTML = `
    <div class = "block" id="tres-iguales">
      <label>3 Iguales</label>
      <div class="score-block"></div>
    </div>
    <div class = "block" id="cuatro-iguales">
        <label>4 Iguales</label>
        <div class="score-block"></div>        
    </div>
    <div class = "block" id="fullhouse">
        <label>Full House</label>
        <div class="score-block"></div>
    </div>
    <div class = "block" id="corrida-corta">
        <label>Escalera C.</label>
        <div class="score-block"></div>                        
    </div>
    <div class = "block" id="corrida-larga">
        <label>Escalera L.</label>
        <div class="score-block"></div>                        
    </div>
    <div class = "block" id="yathzee">
        <label>Yahtzee</label>
        <div class="score-block"></div>                        
    </div>
    <div class = "block" id="chance">
        <label>Chance</label>
        <div class="score-block"></div>                        
    </div>
  `  

//   let html = /* html */ `
//     <dialog class="modal" id='resultado-modal'>
//         <h1>¡Hiciste ${total.children[1].textContent} puntos!</h1>
//         <div class="modal-btns">
//             <Button class="btn">
//                 <div class="text-btn">
//                     <a href="./simulacion-desktop-1.html">
//                         <i class="fa-solid fa-rotate-right"></i>
//                         Reiniciar
//                     </a>
//                 </div>
//             </Button>
  
//             <Button class="btn btn-red">
//                 <div class="text-btn">
//                     <a href="./index.html">
//                         <i class="fa-solid fa-right-from-bracket"></i>
//                         Salir
//                     </a>
//                 </div>
//             </Button>
//         </div>
//     </dialog>
//     `
  
//     resultadoContainer.innerHTML = html;
    
//     let modalResultado = document.querySelector('#resultado-modal');
    
//     modalResultado.showModal();    
}