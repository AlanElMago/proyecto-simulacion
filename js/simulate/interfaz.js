export let btnMenuPlay = document.querySelector('#btn-menu-play');
export let btnCloseMenuPlay = document.querySelector('#btn-close-menu-play');
let menuPlay = document.querySelector('#menu-play');
export const botones = document.querySelectorAll('.btn-estrategia');
let btnSeccionSuperior = document.querySelector('#btn-seccion-superior');
let btnSeccionInferior = document.querySelector('#btn-seccion-inferior');
let btnPrimeraTirada = document.querySelector('#btn-primera-tirada');
let descripcion = document.querySelector('.descripcion');
export let opcion = 0;

btnMenuPlay.addEventListener('click', () => {
  menuPlay.showModal();
})

btnCloseMenuPlay.addEventListener('click', () => {
  menuPlay.close();
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

btnSeccionSuperior.addEventListener('click', () => {
  opcion = 1;

  let html = /* html */ `
    <p>En el juego de Yahtzee, la estrategia de priorizar la sección superior consiste en 
    intentar obtener la mayor puntuación posible en las categorías de 1 a 6 (unidades, doses, 
      treses, cuatros, cincos y seises) antes de pasar a la sección inferior del juego. Esto 
      se debe a que cada categoría de la sección superior corresponde al número de dados que 
      muestran ese número y, por lo tanto, es más fácil obtener una puntuación alta en estas 
      categorías.</p>
    <p>Además, si se consigue un total de al menos 63 puntos en la sección superior, se obtiene 
    un bono adicional de 35 puntos. Después de completar la sección superior, se puede pasar a 
    la sección inferior, donde las categorías tienen una puntuación más alta pero también son 
    más difíciles de obtener, como por ejemplo la categoría de escalera larga o el Yahtzee.</p>
  `;

  descripcion.innerHTML = html;
})

btnSeccionInferior.addEventListener('click', () => {
  opcion = 2;

  let html = /* html */ `
    <p>En el juego de Yahtzee, la estrategia de priorizar la sección inferior consiste en intentar 
    obtener la mayor puntuación posible en las categorías de la sección inferior antes de completar 
    la sección superior. Esto se debe a que las categorías de la sección inferior tienen una puntuación 
    más alta, y si se consigue una puntuación alta en una o varias de estas categorías, se puede obtener 
    una puntuación total muy alta. Además, algunas de las categorías de la sección inferior, como el 
    Yahtzee o la escalera larga, otorgan bonificaciones adicionales si se consiguen varias veces durante 
    el juego. Sin embargo, esta estrategia es más arriesgada, ya que las categorías de la sección inferior 
    son más difíciles de obtener y puede haber turnos en los que no se obtiene una puntuación alta. Por lo 
    tanto, es importante evaluar cuidadosamente la situación de cada turno y decidir si es mejor priorizar 
    la sección superior o la sección inferior en función de las posibilidades de obtener una puntuación
    alta en cada categoría.</p>
  `;

  descripcion.innerHTML = html;
})

btnPrimeraTirada.addEventListener('click', () => {
  opcion = 3;

  let html = /* html */`
    <p>La estrategia de seleccionar los dados que salieron en la primera tirada en Yahtzee 
    implica conservar todos los dados que aparecieron en la primera tirada y no volver a lanzar ninguno. 
    Esta estrategia es una opción más conservadora y se utiliza para asegurar una puntuación mínima en 
    la categoría correspondiente, ya que la puntuación mínima posible para cada categoría es 1.</p>
    <p>Esta estrategia puede ser útil en situaciones en las que se necesita obtener una puntuación 
    mínima en una categoría para no perder puntos. Por ejemplo, si se ha obtenido una mala puntuación 
    en la categoría "unos" en los turnos anteriores, puede ser útil utilizar esta estrategia para asegurarse 
    de obtener una puntuación de al menos 1 punto en esa categoría.</p>
    <p>Sin embargo, en general, esta estrategia no suele ser la más efectiva para obtener puntuaciones 
    altas en Yahtzee, ya que no se está aprovechando la oportunidad de lanzar los dados adicionales para
    formar combinaciones más altas. En la mayoría de los casos, se recomienda utilizar una estrategia más 
    agresiva y conservar solo los dados que tienen más probabilidades de formar una combinación alta en 
    las siguientes tiradas.</p>  
  `;
  descripcion.innerHTML = html;
})