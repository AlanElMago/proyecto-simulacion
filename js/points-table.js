let unos = document.querySelector('#unos');
let doses = document.querySelector('#doses');
let treses = document.querySelector('#treses');
let cuatros = document.querySelector('#cuatros');
let cincos = document.querySelector('#cincos');
let seises = document.querySelector('#seises');
let tresIguales = document.querySelector('#tres-iguales');
let cuatroIguales = document.querySelector('#cuatro-iguales');
let fullhouse = document.querySelector('#fullhouse');
let corridaCorta = document.querySelector('#corrida-corta');
let corridaLarga = document.querySelector('#corrida-larga');
let yahtzee = document.querySelector('#yathzee');
let chance = document.querySelector('#chance');
let bono = document.querySelector('#bono');
let bonoYathzee = document.querySelector('#bono-yathzee');
let total = document.querySelector('#total');
let yathzees = -1;

export function PointsTable(dices){
  let points = []
  let pointsTotal = []
  let blocksSelected = document.querySelectorAll('.block-selected');
  
  dices.forEach(dice => {
    let values = dice.classList[1].split('');
    points.push(parseInt(values[4]));
  });    

  blocksSelected.forEach(element => {    
    pointsTotal.push(parseInt(element.textContent));
  })  

  pointsTotal.push(parseInt(bono.children[1].textContent));
  pointsTotal.push(parseInt(bonoYathzee.children[1].textContent));

  CalculateUpperSection(unos, points, 1);
  CalculateUpperSection(doses, points, 2);
  CalculateUpperSection(treses, points, 3);
  CalculateUpperSection(cuatros, points, 4);
  CalculateUpperSection(cincos, points, 5);
  CalculateUpperSection(seises, points, 6);
  CalculateLowerSection(tresIguales, points, 1);
  CalculateLowerSection(cuatroIguales, points, 2);
  CalculateLowerSection(fullhouse, points, 3);
  CalculateLowerSection(corridaCorta, points, 4);
  CalculateLowerSection(corridaLarga, points, 5);
  CalculateLowerSection(yahtzee, points, 6);
  CalculateLowerSection(chance, points, 7);
  CalculateBono(bono);
  CalculateBonoYathzee(bonoYathzee, yathzees);
  CalculateTotal(total, pointsTotal);
}

function CalculateUpperSection(div, points, value){
  let sum = 0;
  let clases = div.children[1].classList;

  for (let i = 0; i < points.length; i++) {        
    if(points[i] === value) {
      sum = sum + value;
    }
  }  

  if(!clases.contains('block-selected')){
    div.removeChild(div.children[1]);  
    div.innerHTML += `<div class="score-block">${sum}</div>`;  
  }
    
  div.children[1].addEventListener('click', () => {
    let clases = div.lastChild.classList;
      
    if (!clases.contains('block-selected')) {
      div.lastChild.classList.add('block-selected');
    } else {
      div.lastChild.classList.remove('block-selected');
    }
  })    
}

function CalculateLowerSection(div, points, option){
  let sum = 0;
  let clases = div.children[1].classList;  
  let contador = 0;
  let resultado;
  let claves;
  let par;
  let trio;
  let poker;
  points.sort()

  switch (option) {
    case 1:            
      resultado = points.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
      claves = Object.keys(resultado);      

      for(let i = 0; i < claves.length; i++){
        let clave = claves[i];

        if(resultado[clave] >= 3){
          trio = true;
        }
      }

      if(trio){
        for (let i = 0; i < points.length; i++) {                
          sum = sum + points[i];        
        }  
      }
      break;
    case 2:             
      resultado = points.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
      claves = Object.keys(resultado);      

      for(let i = 0; i < claves.length; i++){
        let clave = claves[i];

        if(resultado[clave] >= 4){
          poker = true;
        }
      }

      if(poker){
        for (let i = 0; i < points.length; i++) {                
          sum = sum + points[i];        
        }  
      }
      break;
    case 3:      
      resultado = points.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
      claves = Object.keys(resultado);      

      for(let i = 0; i < claves.length; i++){
        let clave = claves[i];

        if(resultado[clave] === 3){
          trio = true;
        } else if(resultado[clave] === 2){
          par = true;
        }
      }

      if(trio && par) sum = 25
      break;
    case 4:
      if(Secuencia(points, 3)) sum = 30
      break;
    case 5:
      if(Secuencia(points, 4)) sum = 40
      break;
    case 6:
      if(points.every(e => points[0] === e)){
        sum = 50;
        yathzees++;
      }
      break;
    case 7: 
      for (let i = 0; i < points.length; i++) {                
        sum = sum + points[i];        
      }  
      break;
  }

  if(!clases.contains('block-selected')){
    div.removeChild(div.children[1]);  
    div.innerHTML += `<div class="score-block">${sum}</div>`;  
  }
  
  div.children[1].addEventListener('click', () => {
    let clases = div.lastChild.classList;
      
    if (!clases.contains('block-selected')) {
      div.lastChild.classList.add('block-selected');
    } else {
      div.lastChild.classList.remove('block-selected');
    }
  })      
}

function CalculateTotal(div, points){
  let sum = 0;

  for(let i = 0; i < points.length; i++){
    sum = sum + points[i];
  }

  div.removeChild(div.children[1]);  
  div.innerHTML += `<div class="score-block">${sum}</div>`;  
}

function CalculateBono(div){
  let pointsUpperSection = [];
  let sum = 0;

  if(unos.children[1].classList.contains('block-selected')) pointsUpperSection.push(parseInt(unos.children[1].textContent));
  if(doses.children[1].classList.contains('block-selected')) pointsUpperSection.push(parseInt(doses.children[1].textContent));
  if(treses.children[1].classList.contains('block-selected')) pointsUpperSection.push(parseInt(treses.children[1].textContent));
  if(cuatros.children[1].classList.contains('block-selected')) pointsUpperSection.push(parseInt(cuatros.children[1].textContent));
  if(cincos.children[1].classList.contains('block-selected')) pointsUpperSection.push(parseInt(cincos.children[1].textContent));
  if(seises.children[1].classList.contains('block-selected')) pointsUpperSection.push(parseInt(seises.children[1].textContent));

  for(let i = 0; i < pointsUpperSection.length; i++){
    sum = sum + pointsUpperSection[i];
  }

  if(sum >= 63) {
    div.removeChild(div.children[1]);  
    div.innerHTML += `<div class="score-block">+35</div>`;  
  }
}

function CalculateBonoYathzee(div, yathzees){
  let sum = 100 * yathzees;

  if(sum > 0){
    div.removeChild(div.children[1]);  
    div.innerHTML += `<div class="score-block">${sum}</div>`;  
  }
}

function Secuencia(points, duracionCorrida){
  let arr = [...new Set(points)];  
  let contador = 1;
  let isSequence = false;
  
  if(arr.length > 3){

    for(let i = 0; i < arr.length - 1; i++){      
      if((arr[i] + 1) === arr[i + 1]){
        if(isSequence) contador++;

        if(contador >= duracionCorrida) {
          return true
        }

        isSequence = true;
      } else {
        isSequence = false;
        contador = 1
      }          
    }
  }

  return false;
}