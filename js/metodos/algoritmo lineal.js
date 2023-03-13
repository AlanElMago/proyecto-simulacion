let semilla = document.querySelector('#semilla-algoritmo-lineal');
let constante_multiplicador = document.querySelector(
  '#constante-multiplicador-algoritmo-lineal'
);
let constante_aditivo = document.querySelector('#constante-aditivo');
let modulo = document.querySelector('#modulo-algoritmo-lineal');
let total = document.querySelector('#total-algoritmo-lineal');
let btn = document.querySelector('#btn-algoritmo-lineal');
let tabla_algoritmo_lineal = document.querySelector('#tabla-algoritmo-lineal');

btn.addEventListener('click', function (e) {
  e.preventDefault();

  llenar_tabla_algoritmo_lineal(
    parseInt(semilla.value),
    parseInt(constante_multiplicador.value),
    parseInt(constante_aditivo.value),
    parseInt(modulo.value),
    parseInt(total.value)
  );
});

function llenar_tabla_algoritmo_lineal(semilla, a, c, m, total) {
  let datos = algoritmo_lineal(semilla, a, c, m, total);

  console.log(datos);

  let html = /* html */ `
  <table>
  <thead>
      <tr class="table-head">
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
      </tr>
    `;
  }

  html += /* html */ `
      </tbody>
    </table>
  `;

  tabla_algoritmo_lineal.innerHTML = html;
}

export function algoritmo_lineal(semilla, a, c, m, total_numeros = 0) {
  let semillas = [semilla];
  let r = [];

  for (let i = 0; i < total_numeros; i++) {
    let resultado = (a * semillas[i] + c) % m;

    let numAleatorio = resultado / (m - 1);

    semillas.push(resultado);
    r.push(numAleatorio);
  }

  semillas.shift();

  return {
    primeraColumna: semillas,
    segundaColumna: r,
  };
}
