export let dadosSujetadosPrimeraTirada = 0;

export function primeraTirada(dices, rolls, casillas){
  let valores = [];

  if(rolls === 3){
    dices.forEach(dice => {
      dadosSujetadosPrimeraTirada++;
      dice.click();
    });    
  }

  casillas.forEach(casilla => {
    valores.push({
      casilla: casilla.id,
      valor: parseInt(casilla.children[1].textContent),
      selected: casilla.children[1].classList.contains('block-selected'),
      button: casilla.children[1]
    })

  });
  
  valores.sort(compararPorValor);
  click(valores, rolls);
}

function compararPorValor(a, b) {
  if (a.valor < b.valor) {
    return 1;
  } else if (a.valor > b.valor) {
    return -1;
  } else {
    return 0;
  }
}

function click(valores, rolls){
  for(let i = 0; i < valores.length; i++){
    if(!valores[i].selected && rolls === 1) {
      valores[i].button.click();
      return;
    }
  }
}