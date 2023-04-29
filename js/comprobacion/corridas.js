// let { jStat } = require('jstat');
// // const datos = [
// //   0.6129,
// //   0.7097,
// //   0.9355,
// //   0.7742,
// //   0.7419,
// //   0.3226,
// //   0.0323,
// //   0.3871,
// //   0.8710,
// //   0.9677,
// //   0.1613,
// //   0,
// //   1,
// //   0.5806,
// //   0.2903 
// // ]

// const datos = [
//   0.89, 
//   0.25,
//   0.03, 
//   0.10, 
//   0.03, 
//   0.12, 
//   0.37, 
//   0.43, 
//   0.68, 
//   0.19, 
//   0.44, 
//   0.78, 
//   0.19, 
//   0.48, 
//   0.87, 
//   0.50,
//   0.96, 
//   0.16, 
//   0.56, 
//   0.36, 
//   0.26, 
//   0.53, 
//   0.42, 
//   0.60, 
//   0.76, 
//   0.82, 
//   0.37, 
//   0.78, 
//   0.67, 
//   0.69
// ]

let confianza = document.querySelector('#confianza-corridas');
let btn = document.querySelector('#btn-corridas');
let tabla = document.querySelector('#tabla-corridas');
let datosJson = localStorage.getItem('datos');
let datos = JSON.parse(datosJson);
let alfa;
let s;
// const confianza = 0.95;

let bits = [];
let i, corridas, dato, media, varianza, z;

btn.addEventListener('click', (e) => {
  alfa  = 1 - (parseFloat(confianza.value) / 100);
  e.preventDefault();

  calcularCorridas();
})

export function calcularCorridas(){
  s = '';
  let html;

  for(let i = 1; i < datos.length; i++){
    if(datos[i] <= datos[i - 1]){
      bits.push(0);
    } else {
      bits.push(1);
    }
  }
  
  corridas = 1;
  
  dato = bits[0];
  
  for(let i = 1; i < bits.length; i++){
    if(bits[i] != dato){
      corridas++;
      dato = bits[i];
    }
  }  
  
  media = (2 * datos.length - 1) / 3;
  varianza = (16 * datos.length - 29) / 90;
  z = Math.abs((corridas - media) / Math.sqrt(varianza));
  let zn = jStat.normal.inv(1 - alfa / 2, 0, 1); // valor crítico

  if(z < zn){
    html = /* html */ `
      <p>${zn} > ${z} Por lo tanto no se rechaza que son independientes</p>
    `;
  } else {
    html = /* html */ `
      <p>${z} > ${zn} No pasa la prueba de corridas</p>
    `;
  }
  
  html += /* html */ `
    <p>s = { ${bits.join(',')} }</p>
    <p>Corridas ${corridas}</p>
    <p>Media ${media}</p>
    <p>Varianza ${varianza}</p>
    <p>Z: ${z}</p>
  `

  tabla.innerHTML = html;
}
