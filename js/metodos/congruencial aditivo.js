let entrada = document.querySelector('#secuencia-numeros');
let modulo = document.querySelector('#modulo-congruencial-aditivo');
let total = document.querySelector('#total-congruencial-aditivo');
let btn = document.querySelector('#btn-congruencial-aditivo');
let tabla = document.querySelector('#tabla-congruencial-aditivo');

btn.addEventListener('click', function (e) {
  e.preventDefault();
  let semillas = entrada.value.split(',').map(function (numero) {
    return parseInt(numero);
  });

  llenar_tabla(semillas, parseInt(modulo.value), parseInt(total.value));
});

function llenar_tabla(entrada, m, total) {
  let datos = congruencial_aditivo(entrada, m, total);

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

  tabla.innerHTML = html;
}

export function congruencial_aditivo(entrada, m, total_numeros = 0) {
  let cadena = entrada;
  let semillas = [];
  let r = [];

  for (let i = 0; i < total_numeros; i++) {
    let resultado = (cadena[i] + cadena[cadena.length - 1]) % m;
    let numAleatorio = resultado / (m - 1);

    cadena.push(resultado);
    semillas.push(resultado);
    r.push(numAleatorio);
  }

  return {
    primeraColumna: semillas,
    segundaColumna: r,
  };
}

// console.log(generarNumeroAleatorio([66, 90, 99, 04, 70], 100, 30));
