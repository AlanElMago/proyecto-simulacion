let confianza = document.querySelector('#confianza-chi');
let btn = document.querySelector('#btn-chi');
let tabla = document.querySelector('#tabla-chi-cuadrada');
let datosJson = localStorage.getItem('datos');
let datos = JSON.parse(datosJson);
let array = [];
let estadistico = 0;
const E = datos.length / Math.sqrt(datos.length);

btn.addEventListener('click', (e) => {
  e.preventDefault();
  array = [];
  estadistico = 0;

  array.push(ContarNumeros(0.00, 0.10, datos));
  array.push(ContarNumeros(0.10, 0.20, datos));
  array.push(ContarNumeros(0.20, 0.30, datos));
  array.push(ContarNumeros(0.30, 0.40, datos));
  array.push(ContarNumeros(0.40, 0.50, datos));
  array.push(ContarNumeros(0.50, 0.60, datos));
  array.push(ContarNumeros(0.60, 0.70, datos));
  array.push(ContarNumeros(0.70, 0.80, datos));
  array.push(ContarNumeros(0.80, 0.90, datos));
  array.push(ContarNumeros(0.90, 1.00, datos));
  
  let valorCritico = jStat.chisquare.inv((parseFloat(confianza.value) / 100), 9);
  console.log(array);
  
  for(let i = 0; i < array.length; i++){
    estadistico = estadistico + array[i].terceraColumna;
  }
  console.log(estadistico);

  chi_cuadrada(array, valorCritico, estadistico);
})

export function chi_cuadrada(datos, chi, estadistico){
  let html;
  if(chi > estadistico){
    html = /* html */ `
      <p>${chi} > ${estadistico} Por lo tanto no se puede rechazar que los números del conjunto siguen una distribución uniforme</p>
    `;
  } else {
    html = /* html */ `
      <p>${estadistico} > ${chi} Por lo tanto se puede rechazar que los números del conjunto siguen una distribución uniforme</p>
    `;
  }

  html += /* html */ `  
  <table>
    <thead>
        <tr class="table-head">
            <th class="column1">Intervalo</th>
            <th class="column2">Oi</th>
            <th class="column3">Ei</th>
            <th class="column3">(Ei-Oi)^2 / Ei</th>
        </tr>
    </thead>
    <tbody>
      <tr>
        <td class="column1">[0.00 - 0.10)</td>
        <td class="column1">${datos[0].primeraColumna}</td>
        <td class="column1">${datos[0].segundaColumna}</td>
        <td class="column1">${datos[0].terceraColumna}</td>
      </tr>
      <tr>
        <td class="column1">[0.10 - 0.20)</td>
        <td class="column1">${datos[1].primeraColumna}</td>
        <td class="column1">${datos[1].segundaColumna}</td>
        <td class="column1">${datos[1].terceraColumna}</td>
      </tr>
      <tr>
        <td class="column1">[0.20 - 0.30)</td>
        <td class="column1">${datos[2].primeraColumna}</td>
        <td class="column1">${datos[2].segundaColumna}</td>
        <td class="column1">${datos[2].terceraColumna}</td>
      </tr>
      <tr>
        <td class="column1">[0.30 - 0.40)</td>
        <td class="column1">${datos[3].primeraColumna}</td>
        <td class="column1">${datos[3].segundaColumna}</td>
        <td class="column1">${datos[3].terceraColumna}</td>
      </tr>
      <tr>
        <td class="column1">[0.40 - 0.50)</td>
        <td class="column1">${datos[4].primeraColumna}</td>
        <td class="column1">${datos[4].segundaColumna}</td>
        <td class="column1">${datos[4].terceraColumna}</td>
      </tr>
      <tr>
        <td class="column1">[0.50 - 0.60)</td>
        <td class="column1">${datos[5].primeraColumna}</td>
        <td class="column1">${datos[5].segundaColumna}</td>
        <td class="column1">${datos[5].terceraColumna}</td>
      </tr>
      <tr>
        <td class="column1">[0.60 - 0.70)</td>
        <td class="column1">${datos[6].primeraColumna}</td>
        <td class="column1">${datos[6].segundaColumna}</td>
        <td class="column1">${datos[6].terceraColumna}</td>
      </tr>
      <tr>
        <td class="column1">[0.70 - 0.80)</td>
        <td class="column1">${datos[7].primeraColumna}</td>
        <td class="column1">${datos[7].segundaColumna}</td>
        <td class="column1">${datos[7].terceraColumna}</td>
      </tr>
      <tr>
        <td class="column1">[0.80 - 0.90)</td>
        <td class="column1">${datos[8].primeraColumna}</td>
        <td class="column1">${datos[8].segundaColumna}</td>
        <td class="column1">${datos[8].terceraColumna}</td>
      </tr>
      <tr>
        <td class="column1">[0.90 - 1.00)</td>
        <td class="column1">${datos[9].primeraColumna}</td>
        <td class="column1">${datos[9].segundaColumna}</td>
        <td class="column1">${datos[9].terceraColumna}</td>
      </tr>
    </tbody>
  </table>
  `;

  tabla.innerHTML = html;
}

function ContarNumeros(inicio, fin, valores){
  let cantidad = [];

  for(let i = 0; i < valores.length; i++){ 
    if(valores[i] >= inicio && valores[i] <= fin){
      cantidad.push(valores[i]);
    }
  }

  return {
    primeraColumna: cantidad.length,
    segundaColumna: E,
    terceraColumna: ((E - cantidad.length)**2 / E),
  };
}