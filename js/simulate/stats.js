import { dadosSujetadosPrimeraTirada } from "./estrategias/primeraTirada.js";
import { dadosSujetadosSeccionInferior } from "./estrategias/priorizarSeccionInferior.js";
import { dadosSujetadosSeccionSuperior } from "./estrategias/priorizarSeccionSuperior.js";
import { puntajeTodosLosTurnos, totalCorridasCortas, totalCorridasLargas, totalFullhouse, totalPokers, totalTrios, totalYathzees } from "./points-table.js";
import { dadosTirados } from "./rolls.js";
let resultadoContainer = document.querySelector('#resultado');
let btnStats = document.querySelector('#btn-stats');
let titulo = '';
let dados = 0;


export function stats(juegos, opcion){
  switch(opcion) {
    case 1:
      titulo = 'Estrategia Sección Superior';
      dados = dadosSujetadosSeccionSuperior;
      break;
    case 2:
      titulo = 'Estrategia Sección Inferior';
      dados = dadosSujetadosSeccionInferior;
      break;
    case 3:
      titulo = 'Estrategia Primera Tirada';
      dados = dadosSujetadosPrimeraTirada;       
      break;
  }

  puntajeTodosLosTurnos.sort(compararNumeros);
  let promedio = calcularPromedio(puntajeTodosLosTurnos);
  let mediana = calcularMediana(puntajeTodosLosTurnos);
  let moda = calcularModa(puntajeTodosLosTurnos);   

    let html = /* html */ `
    <dialog class="modal modal-simulate" id='stats-modal'>
        <div class="title-container">
            <div>
                <h1>Estadísticas - ${titulo}</h1>
            </div>
            <button id="btn-close-stats-simulate"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <p>Juegos jugados: ${juegos}</p>
        <br />
        <p>Puntaje Promedio: ${promedio}</p>
        <p>Puntaje Mediana: ${mediana}</p>
        <p>Puntaje Moda: ${moda}</p>
        <p>Puntaje Más Alto: ${puntajeTodosLosTurnos[puntajeTodosLosTurnos.length - 1]}</p>
        <p>Puntaje Más Bajo: ${puntajeTodosLosTurnos[0]}</p>

        <br />
        <p>Número Total de Tiradas: ${parseInt(juegos) * 3 * 13}</p>
        <p>Número Total de Dados Tirados ${dadosTirados}</p>
        <p>Número Total de Dados Sujetados ${dados}</p>
        <p>Prom. Total de Tiradas Por Juego ${dadosTirados / (parseInt(juegos) * 3 * 13)}</p>
        
        <br />
        <p>Número Total de 3 iguales: ${totalTrios}</p>
        <p>Número Total de 4 iguales: ${totalPokers}</p>
        <p>Número Total de Full House: ${totalFullhouse}</p>
        <p>Número Total de Escalera L.: ${totalCorridasLargas}</p>
        <p>Número Total de Escalera C.: ${totalCorridasCortas}</p>
        <p>Número Total de Yathzees: ${totalYathzees}</p>
    </dialog>
    `
  
    resultadoContainer.innerHTML = html;
    
    let modalResultado = document.querySelector('#stats-modal');
    let btnCloseModal = document.querySelector('#btn-close-stats-simulate');

    btnCloseModal.addEventListener('click', () => { modalResultado.close(); })

    btnStats.addEventListener('click', () => { modalResultado.showModal(); })

    btnStats.classList.remove('btn-stats');
    
    modalResultado.showModal();    
}

function compararNumeros(a, b) {
  return b - a;
}

function calcularPromedio(numeros) {
  var suma = 0;
  for (var i = 0; i < numeros.length; i++) {
    suma += numeros[i];
  }
  var promedio = suma / numeros.length;
  return promedio;
}

function calcularModa(numeros) {
  var moda = null;
  var modaFrecuencia = 0;
  var numerosFrecuencia = {};

  for (var i = 0; i < numeros.length; i++) {
    var numero = numeros[i];
    numerosFrecuencia[numero] = (numerosFrecuencia[numero] || 0) + 1;

    if (numerosFrecuencia[numero] > modaFrecuencia) {
      moda = numero;
      modaFrecuencia = numerosFrecuencia[numero];
    }
  }

  return moda;
}

function calcularMediana(numeros) {
  numeros.sort(function(a, b) {
    return a - b;
  });

  var mediana = null;
  var longitud = numeros.length;

  if (longitud % 2 === 0) {
    var mitad = longitud / 2;
    mediana = (numeros[mitad - 1] + numeros[mitad]) / 2;
  } else {
    var mitad = Math.floor(longitud / 2);
    mediana = numeros[mitad];
  }

  return mediana;
}
