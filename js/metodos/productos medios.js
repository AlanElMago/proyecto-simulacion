let semilla_1 = document.querySelector('#semilla1-productos');
let semilla_2 = document.querySelector('#semilla2-productos');
let total = document.querySelector('#total-productos');
let btn_productos = document.querySelector('#btn-productos');
let tabla_cuadrados_medios = document.querySelector('#tabla-productos-medios');
let valores = [];

btn_productos.addEventListener('click', function (e) {
  e.preventDefault();

  valores.push(parseInt(semilla_1.value));
  valores.push(parseInt(semilla_2.value));

  llenar_tabla_productos_medios(valores, parseInt(total.value));
  console.log(valores);
});

function llenar_tabla_productos_medios(semillas, total) {
  let datos = productos_medios(semillas, total);

  console.log(datos);

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

export function productos_medios(semillas, total_numeros = 0) {
  let y = [];
  let r = [];

  for (let i = 0; i < total_numeros; i++) {
    let cuadrado = semillas[i] * semillas[i + 1];

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
  semillas.shift();

  return {
    primeraColumna: y,
    segundaColumna: semillas,
    terceraColumna: r,
  };
}

// console.log(productos_medios([5015, 5734], 5));
