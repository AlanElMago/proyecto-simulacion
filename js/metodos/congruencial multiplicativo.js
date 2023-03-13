let semilla = document.querySelector('#semilla-congruencial-multiplicativo');
let k = document.querySelector('#factor-de-multiplicacion');
let g = document.querySelector('#num-entero');
let option = document.querySelector('#combobox');
let btn = document.querySelector('#btn-congruencial-multiplicativo');
let tabla = document.querySelector('#tabla-congruencial-multiplicativo');
let a = 0;

btn.addEventListener('click', function (e) {
  e.preventDefault();

  option.value === 'opc1' ? (a = 3) : (a = 5);

  llenar_tabla(
    parseInt(semilla.value),
    parseInt(k.value),
    parseInt(g.value),
    parseInt(a)
  );

  console.log(
    parseInt(semilla.value),
    parseInt(k.value),
    parseInt(g.value),
    parseInt(a)
  );
});

function llenar_tabla(semilla, k, g, a) {
  let datos = congruencial_multiplicativo(semilla, k, g, a);

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

  for (let i = 0; i < datos.total; i++) {
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

export function congruencial_multiplicativo(semilla, k, g, a) {
  let semillas = [semilla];
  let r = [];
  let m = Math.pow(2, g);
  a = a + 8 * k;
  const N = m / 4;

  alert(`Solo se van a generar ${N} números aleatorios`);

  for (let i = 0; i < N + 1; i++) {
    let resultado = (a * semillas[i]) % m;
    let numAleatorio = resultado / (m - 1);

    semillas.push(resultado);
    r.push(numAleatorio);
  }

  semillas.shift();

  return {
    primeraColumna: semillas,
    segundaColumna: r,
    total: N,
  };
}

// console.log(congruencial_multiplicativo(17, 2, 5, 5));
