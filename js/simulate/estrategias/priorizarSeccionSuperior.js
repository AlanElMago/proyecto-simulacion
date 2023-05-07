export let dadosSujetadosSeccionSuperior = 0;

export function seccionSuperior(dices, rolls, casillas){
  let falso = false;
  let clase = '';
  let valores = [];

  for (let i = 0; i < dices.length; i++) {        
    for (let j = i + 1; j < dices.length && !falso; j++) {
      if (dices[i].classList[1] === dices[j].classList[1] && 
        !dices[j].classList.contains('die-stroke')) {      
        dices[i].click();
        dices[j].click();
        dadosSujetadosSeccionSuperior += 2;
        clase = dices[i].classList[1];
        falso = true;
        break;
      }
    }    

    if(dices[i].classList.contains(clase) && 
    !dices[i].classList.contains('die-stroke')){
      dices[i].click();

      dadosSujetadosSeccionSuperior++;
    }
  }

  casillas.forEach(casilla => {
    valores.push({
      casilla: casilla.id,
      valor: parseInt(casilla.children[1].textContent),
      selected: casilla.children[1].classList.contains('block-selected'),
      button: casilla.children[1]
    })

  });

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
