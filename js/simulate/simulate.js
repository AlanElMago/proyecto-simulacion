let btnMenuSimulate = document.querySelector('#btn-menu-simulate');
let btnMenuSimulateSubmit = document.querySelector('#btn-menu-simulate-submit');
let btnCloseMenuSimulate = document.querySelector('#btn-close-menu-simulate');
let menuSimulate = document.querySelector('#menu-simulate');
let numeroJuegos = document.querySelector('#numero-juegos');
let juegosLabel = document.querySelector('.juegos-label');
const botones = document.querySelectorAll('.btn-estrategia');

btnMenuSimulate.addEventListener('click', () => {
  menuSimulate.showModal();
})

btnMenuSimulateSubmit.addEventListener('click', (e) => {
  e.preventDefault();

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
})

btnCloseMenuSimulate.addEventListener('click', (e) => {
  e.preventDefault();

  menuSimulate.close();  
})

botones.forEach(boton => {
  boton.addEventListener('click', (e) => {
    e.preventDefault();

    const botonActivo = document.querySelector('.btn-activo');

    if(botonActivo) {
      botonActivo.classList.remove('btn-activo');
    }

    boton.classList.add('btn-activo');
  })
});