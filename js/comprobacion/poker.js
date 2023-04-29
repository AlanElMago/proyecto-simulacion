// const datos = [
//   0.06141,
//   0.81792,
//   0.52953,
//   0.04127, 
//   0.27813,
//   0.72484,
//   0.48999,
//   0.50502,
//   0.67347,
//   0.62182,
//   0.94107,
//   0.18590,
//   0.30444,
//   0.28103,
//   0.82578,
//   0.56766,
//   0.06060,
//   0.70688,
//   0.99367,
//   0.85923,
//   0.14411,
//   0.11223,
//   0.25357,
//   0.44598,
//   0.51483,
//   0.87648,
//   0.64794,
//   0.31555,
//   0.73997,
//   0.09099
// ]
let confianza = document.querySelector('#confianza-poker');
let btn = document.querySelector('#btn-poker');
let tabla = document.querySelector('#tabla-poker');
let datosJson = localStorage.getItem('datos')
let datos = JSON.parse(datosJson);
let td = 0, 
    par = 0, 
    pares = 0, 
    terciaPar = 0, 
    tercia = 0, 
    poker = 0, 
    quintinilla = 0;

btn.addEventListener('click', (e) => {
  e.preventDefault();

  td = 0, 
  par = 0, 
  pares = 0, 
  terciaPar = 0, 
  tercia = 0, 
  poker = 0, 
  quintinilla = 0;

  PruebaPoker(datos);

  let x = ((0.3024 * datos.length) - td)**2 / (0.3024 * datos.length) +
    ((0.5040 * datos.length) - par)**2 / (0.5040 * datos.length) +
    ((0.1080 * datos.length) - pares)**2 / (0.1080 * datos.length) +
    ((0.0090 * datos.length) - terciaPar)**2 / (0.0090 * datos.length) +
    ((0.0720 * datos.length) - tercia)**2 / (0.0720 * datos.length) +
    ((0.0045 * datos.length) - poker)**2 / (0.0045 * datos.length) +
    ((0.0001 * datos.length) - quintinilla)**2 / (0.0001 * datos.length);

  let valorCritico = jStat.chisquare.inv((parseFloat(confianza.value) / 100), 6);    

  let html;

  if(valorCritico > x){
    html = /* html */ `
      <p>${valorCritico} > ${x} Por lo tanto no se rechaza que los números son independientes</p>
    `;
  } else {
    html = /* html */ `
      <p>${x} > ${valorCritico} Por lo tanto se rechaza que los números son independientes</p>
    `;
  }

  html += /* html */ `
  <table>
    <thead>
      <tr class="table-head">
        <th class="column1">Categorías</th>
        <th class="column1">Oi</th>
        <th class="column1">Ei</th>
        <th class="column1">(Ei-Oi)^2 / Ei</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="column1">Todas diferentes (TD)</td>
        <td class="column1">${td}</td>
        <td class="column1">${(0.3024 * datos.length)}</td>
        <td class="column1">${((0.3024 * datos.length) - td)**2 / (0.3024 * datos.length)}</td>
      </tr>
      <tr>
        <td class="column1">Exactamente 1 par (1P)</td>
        <td class="column1">${par}</td>
        <td class="column1">${(0.5040 * datos.length)}</td>
        <td class="column1">${((0.5040 * datos.length) - par)**2 / (0.5040 * datos.length)}</td>
      </tr>
      <tr>
        <td class="column1">2 pares (2P)</td>
        <td class="column1">${pares}</td>
        <td class="column1">${(0.1080 * datos.length)}</td>
        <td class="column1">${((0.1080 * datos.length) - pares)**2 / (0.1080 * datos.length)}</td>
      </tr>
      <tr>
        <td class="column1">1 tercia y 1 par (TP)</td>
        <td class="column1">${terciaPar}</td>
        <td class="column1">${(0.0090 * datos.length)}</td>
        <td class="column1">${((0.0090 * datos.length) - terciaPar)**2 / (0.0090 * datos.length)}</td>
      </tr>
      <tr>
        <td class="column1">Tercia (T)</td>
        <td class="column1">${tercia}</td>
        <td class="column1">${(0.0720 * datos.length)}</td>
        <td class="column1">${((0.0720 * datos.length) - tercia)**2 / (0.0720 * datos.length)}</td>
      </tr>
      <tr>
        <td class="column1">Póker (P)</td>
        <td class="column1">${poker}</td>
        <td class="column1">${(0.0045 * datos.length)}</td>
        <td class="column1">${((0.0045 * datos.length) - poker)**2 / (0.0045 * datos.length)}</td>
      </tr>
      <tr>
        <td class="column1">Quintilla (Q)</td>
        <td class="column1">${quintinilla}</td>
        <td class="column1">${(0.0001 * datos.length)}</td>
        <td class="column1">${((0.0001 * datos.length) - quintinilla)**2 / (0.0001 * datos.length)}</td>
      </tr>
    </tbody>
  </table>
  `  
    
  tabla.innerHTML = html;
    
  // console.log(x)
  // console.log('Todos diferentes ' + td);
  // console.log('Exactamente 1 par ' + par);
  // console.log('2 pares ' + pares);
  // console.log('1 tercia y 1 par ' + terciaPar);
  // console.log('Tercia ' + tercia);
  // console.log('Poker ' + poker);
  // console.log('Quintilla ' + quintinilla);
})

export function PruebaPoker(valores) {
  for(let i = 0; i < valores.length; i++) {
    verificarNumero(valores[i]);
    NumerosDesiguales(valores[i]);
  }
}

function NumerosDesiguales(numero){
  const numeroString = numero.toFixed(5).toString(); 
  const puntoIndex = numeroString.indexOf("."); 
  const decimalesString = numeroString.substring(puntoIndex + 1); 
  let desiguales = true;

  for (let i = 0; i < decimalesString.length; i++) {
    for (let j = i + 1; j < decimalesString.length; j++) {
      if (decimalesString[i] === decimalesString[j]) {
        desiguales = false;
        break;
      }
    }
    if (!desiguales) {
      break;
    };
  }

  if(desiguales) {
    td++
  }
}

function verificarNumero(num) {
  num = num.toFixed(5);
  const partes = num.toString().split('.');
  if (partes.length === 2 && partes[1].length === 5) {
    const [a, b, c, d, e] = partes[1].split('').sort();
    // console.log(a,b,c,d,e)
    if (a === b && b === c && c === d && d === e) {
      // console.log(num + ' Q')
      quintinilla++;      
    } else if ((a === b && b === c && c === d) || (b === c && c === d && d === e)) {
      // console.log(num + ' P')
      poker++;      
    } else if ((a === b && b === c && d !== e) || (b === c && c === d && a !== e) || (c === d && d === e && a !== b)) {
      // console.log(num + ' T')
      tercia++;      
    } else if ((a === b && c === d && d === e) || (a === b && b === c && d !== e) || (b === c && c === d && a !== e) || (c === d && d === e && a !== b)) {
      // console.log(num + ' TP 1')
      terciaPar++;      
    } else if (a === b && b === c && c !== d && d === e){
      // console.log(num + ' TP 3')
      terciaPar++;      
    } else if ((a === b && c !== d && d === e) || (a !== b && b === c && d === e) || (a == b && b !== d && c === d && a !== e && c !== e)) {
      // console.log(num + ' 2P')
      pares++;      
    } else if (a === b || b === c || c === d || d === e) {
      // console.log(num + ' 1P')
      par++;      
    }
  } else {
    console.log(num + ' no tiene 5 decimales')
  }
}
