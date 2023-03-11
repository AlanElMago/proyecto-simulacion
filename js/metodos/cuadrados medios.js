let semilla = document.querySelector('#semilla-cuadrados');
let total = document.querySelector('#total-cuadrados');
let btn_cuadrados = document.querySelector('#btn-cuadrados');
let tabla_cuadrados_medios = document.querySelector('#tabla-cuadrados-medios');

btn_cuadrados.addEventListener('click', function (e) {
  e.preventDefault();

  llenar_tabla_cuadrados_medios(parseInt(semilla.value), parseInt(total.value));
});

function llenar_tabla_cuadrados_medios(semilla, total) {
  let datos = cuadrados_medios(total, semilla);

  let html = /* html */ `
  <table>
  <thead>
      <tr class="table-head">
          <th class="column1">Y</th>
          <th class="column2">X</th>
          <th class="column3">r</th>
      </tr>
  </thead>
  <tbody>
  `;

  for (let i = 0; i < total; i++) {
    html += /* html */ `
      <tr>
        <td class="column1">${datos.primeraColumna[i]}</td>
        <td class="column1">${datos.segundaColumna[i]}</td>
        <td class="column1">${datos.terceraColumna[i]}</td>
      </tr>
    `;
  }

  html += /* html */ `
      </tbody>
    </table>
  `;

  tabla_cuadrados_medios.innerHTML = html;
}

export function cuadrados_medios(total_numeros = 0, semilla) {
  let semillas = [semilla];
  let y = [];
  let r = [];

  for (let i = 0; i < total_numeros; i++) {
    let cuadrado = semillas[i] * semillas[i];

    let cuadradoStr = cuadrado.toString();

    while (cuadradoStr.length !== 8) {
      cuadradoStr = '0' + cuadradoStr;
    }

    let mitad = cuadradoStr.length / 2;
    let mitadStr = cuadradoStr.substring(mitad / 2, mitad / 2 + mitad);
    let semilla = parseInt(mitadStr);

    let numAleatorio = semilla / 10000;

    semillas.push(semilla);
    r.push(numAleatorio);
    y.push(cuadrado);
  }

  semillas.shift();

  return {
    primeraColumna: y,
    segundaColumna: semillas,
    terceraColumna: r,
  };
}
