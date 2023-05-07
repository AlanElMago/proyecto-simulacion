let confianza = document.querySelector('#confianza-ks');
let btn = document.querySelector('#btn-ks');
let tabla = document.querySelector('#tabla-ks');
let datosJson = localStorage.getItem('datos');
let datos = JSON.parse(datosJson);
// let datos = [0.7803, 0.8868, 0.6414, 0.1393, 0.9404, 0.4352, 0.9399, 0.3412, 0.6417, 0.1778,
//   0.1612, 0.5985, 0.8202, 0.2728, 0.4419, 0.5275, 0.8256, 0.1615, 0.6082, 0.9907,
//   0.1486, 0.2081, 0.3305, 0.9230, 0.1929, 0.7210, 0.9841, 0.8452, 0.4363, 0.0357
// ];
let array = [];
let DPositiva = [];
let DNegativa = [];
let d;

btn.addEventListener('click', (e) => {
  e.preventDefault();

  const ks = calcularValorCriticoKS(datos.length, (1 - (parseFloat(confianza.value)) / 100));
  
  datos.sort();

  for(let i = 0; i < datos.length; i++){
    array.push({
      primeraColumna: i + 1,
      segundaColumna: (i + 1) / datos.length,
      terceraColumna: datos[i],
      cuartaColumna: i / datos.length,
      quintaColumna: ((i + 1) / datos.length) - datos[i],
      sextaColumna: datos[i] - (i / datos.length)
    })
  
    DPositiva.push(((i + 1) / datos.length) - datos[i]);
    DNegativa.push(datos[i] - (i / datos.length));
  }

  DPositiva.sort();
  DNegativa.sort();

  if(DPositiva[DPositiva.length - 1] > DNegativa[DNegativa.length - 1]){
    d = DPositiva[DPositiva.length - 1];
  } else {
    d = DNegativa[DNegativa.length - 1];
  }

  KS(array, ks, d)
})

export function KS(datos, ks, d){
  let html;
  if(ks > d){
    html = /* html */ `
      <p>${ks} > ${d} Por lo tanto los números del conjunto se distribuyen uniformemente</p>
    `;
  } else {
    html = /* html */ `
      <p>${d} > ${ks} Por lo tanto los números del conjunto no se distribuyen uniformemente</p>
    `;
  }

  html += /* html */ `  
  <table>
  <thead>
      <tr class="table-head">
          <th class="column1">i</th>
          <th class="column2">i/n</th>
          <th class="column3">ri</th>
          <th class="column3">i - 1/n</th>
          <th class="column3">i/n - ri</th>
          <th class="column3">ri - i-1/n</th>
      </tr>
  </thead>
  <tbody>
  `;

  for (let i = 0; i < datos.length; i++) {
    html += /* html */ `
      <tr>
        <td class="column1">${datos[i].primeraColumna}</td>
        <td class="column1">${datos[i].segundaColumna}</td>
        <td class="column1">${datos[i].terceraColumna}</td>
        <td class="column1">${datos[i].cuartaColumna}</td>
        <td class="column1">${datos[i].quintaColumna}</td>
        <td class="column1">${datos[i].sextaColumna}</td>
      </tr>
    `;
  }

  html += /* html */ `
      </tbody>
    </table>
  `;

  tabla.innerHTML = html;   
}

function calcularValorCriticoKS(n, alpha) {
  const valorCritico = Math.sqrt(-Math.log(alpha/2)/2) / Math.sqrt(n);
  return valorCritico;
}
