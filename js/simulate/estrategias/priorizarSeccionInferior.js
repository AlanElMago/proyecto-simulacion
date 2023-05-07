export let dadosSujetadosSeccionInferior = 0;

export function seccionInferior(dices, rolls, casillas, turnos) {
  let clase = '';
  let falso = false;
  let valores = [];
  let points = [];

  dices.forEach(dice => {
    let values = dice.classList[1].split('');
    points.push(parseInt(values[4]));
  });    

  casillas.forEach(casilla => {
    valores.push({
      casilla: casilla.id,
      valor: parseInt(casilla.children[1].textContent),
      selected: casilla.children[1].classList.contains('block-selected'),
      button: casilla.children[1]
    });
  });
  
  valores.sort((a, b) => {
    if (a.casilla === 'yathzee' || b.casilla === 'yathzee' || a.casilla === 'bonus' || b.casilla === 'bonus') {
      return 0;
    } else if (a.valor < b.valor) {
      return -1;
    } else if (a.valor > b.valor) {
      return 1;
    } else {
      return 0;
    }
  });

  if(turnos < 7){
    if(CalculateLowerSection(points, 6)){
      for(let i = 0; i < valores.length; i++){
        if (valores[i].casilla === 'yathzee' &&
          !valores[i].selected        
        ){
          valores[i].button.click();
        }
      } 
    } else if(CalculateLowerSection(points, 5)){
      for(let i = 0; i < valores.length; i++){
        if (valores[i].casilla === 'corrida-larga' &&
          !valores[i].selected        
        ){
          valores[i].button.click();
        }
      }
    } else if(CalculateLowerSection(points, 4)){
      for(let i = 0; i < valores.length; i++){
        if (valores[i].casilla === 'corrida-corta' &&
          !valores[i].selected        
        ){
          valores[i].button.click();
        }
      }
    } else if(CalculateLowerSection(points, 3)){
      for(let i = 0; i < valores.length; i++){
        if (valores[i].casilla === 'fullhouse' &&
          !valores[i].selected        
        ){
          valores[i].button.click();
        }
      }
    } else if(CalculateLowerSection(points, 2)){
      for(let i = 0; i < valores.length; i++){
        if (valores[i].casilla === 'cuatro-iguales' &&
          !valores[i].selected        
        ){
          valores[i].button.click();
        }
      }
    } else if(CalculateLowerSection(points, 1)){
      for(let i = 0; i < valores.length; i++){
        if (valores[i].casilla === 'tres-iguales' &&
          !valores[i].selected        
        ){
          valores[i].button.click();
        }
      }
    } else {
      valores.sort((a, b) => {
        if(a.casilla === 'yathzee' || b.casilla === 'yathzee' || a.casilla === 'bonus' || b.casilla === 'bonus') {
          return 0;
        } else if(a.valor < b.valor) {
          return 1;
        } else if(a.valor > b.valor) {
          return -1;
        } else {
          return 0;
        }
      });

      click(valores, rolls);
    }
  } else {
      for (let i = 0; i < dices.length; i++) {
        for (let j = i + 1; j < dices.length && !falso; j++) {
          if (dices[i].classList[1] === dices[j].classList[1] && !dices[j].classList.contains('die-stroke')) {
            dices[i].click();
            dices[j].click();
            dadosSujetadosSeccionInferior += 2;
            clase = dices[i].classList[1];
            falso = true;
            break;
          }
        }
        if (dices[i].classList.contains(clase) && !dices[i].classList.contains('die-stroke')) {
          dices[i].click();
          dadosSujetadosSeccionInferior++;
        }
      }  
      
      click(valores, rolls);
  }
}

function click(valores, rolls){
  for(let i = 0; i < valores.length; i++){
    if(!valores[i].selected && rolls === 1){
      if(valores[i].casilla === 'yathzee' && valores[i].valor === 50) {        
        valores[i].button.click();
        return;
      }
    }
  }

  for(let i = 0; i < valores.length; i++){
    if (!valores[i].selected && rolls === 1) {
      if (valores[i].casilla === 'unos' || 
        valores[i].casilla === 'doses' || 
        valores[i].casilla === 'treses' || 
        valores[i].casilla === 'cuatros' || 
        valores[i].casilla === 'cincos' || 
        valores[i].casilla === 'seises'
      ) {
        valores[i].button.click();
        return;
      } else {
        // Si no hay casillas de la sección superior ni Yathzee disponibles, selecciona la casilla con el valor más alto
        valores[i].button.click();
        return;
      }
    }
  }
}

function CalculateLowerSection(points, option){
  let sum = 0;
  let resultado;
  let claves;
  let par;
  let trio;
  let poker;
  let falso = false;
  points.sort()

  switch (option) {
    case 1:            
      resultado = points.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
      claves = Object.keys(resultado);      

      for(let i = 0; i < claves.length; i++){
        let clave = claves[i];

        if(resultado[clave] >= 3){
          falso = true;
        }
      }
      break;
    case 2:             
      resultado = points.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
      claves = Object.keys(resultado);      

      for(let i = 0; i < claves.length; i++){
        let clave = claves[i];

        if(resultado[clave] >= 4){
          falso = true;
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

      if(trio && par) falso = true;
      break;
    case 4:
      if(Secuencia(points, 3)) falso = true;
      break;
    case 5:
      if(Secuencia(points, 4)) falso = true;
      break;
    case 6:
      if(points.every(e => points[0] === e)){
        sum = 50;
        falso = true;
      }
      break;
    case 7: 
      for (let i = 0; i < points.length; i++) {                
        sum = sum + points[i];        
        falso = true;
      }  
      break;
  }     

  return falso;
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