let semilla = document.querySelector('#semilla-multiplicador');
let constante = document.querySelector('#constante-multiplicador');
let total = document.querySelector('#total-multiplicador');
let btn_multiplicador = document.querySelector('#btn-multiplicador');
let tabla_multiplicador = document.querySelector('#tabla-multiplicador');

btn_multiplicador.addEventListener('click', function (e) {
  e.preventDefault();

  if(semilla.value === '' || constante.value === '' || total.value === ''){
    alert('Debes Llenar Todos Los Campos')
  } else if (semilla.value.length < 4 || constante.value.length < 4) {
    alert('La Semilla Y La Constante Deben Ser De 4 Dígitos O Más')
  } else {
    llenar_tabla_multiplicador(
      parseInt(semilla.value),
      parseInt(constante.value),
      parseInt(total.value)
    );
  }
});

function llenar_tabla_multiplicador(semilla, constante, total) {
  let datos = multiplicador_constante(semilla, constante, total);

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

  for (let i = 0; i < datos.total; i++) {
    html += /* html */ `
      <tr>
        <td class=${datos.clases[i] ? "label-red" : "column1"}>${datos.primeraColumna[i]}</td>
        <td class=${datos.clases[i] ? "label-red" : "column1"}>${datos.segundaColumna[i]}</td>
        <td class=${datos.clases[i] ? "label-red" : "column1"}>${datos.terceraColumna[i]}</td>
      </tr>
    `;
  }

  html += /* html */ `
      </tbody>
    </table>
  `;

  tabla_multiplicador.innerHTML = html;
}

export function multiplicador_constante(
  semilla,
  multiplicador,
  total_numeros = 0
) {
  let semillas = [semilla];
  let y = [];
  let r = [];
  let clases = [];
  let degradacion = false;

  for (let i = 0; i < total_numeros; i++) {
    let cuadrado = semillas[i] * multiplicador;

    let cuadradoStr = cuadrado.toString();

    while (cuadradoStr.length !== 8) {
      cuadradoStr = '0' + cuadradoStr;
    }

    let mitad = cuadradoStr.length / 2;
    let mitadStr = cuadradoStr.substring(mitad / 2, mitad / 2 + mitad);
    semilla = parseInt(mitadStr);
    let numAleatorio = semilla / 10000;

    if(r.includes(numAleatorio) && !degradacion){
      alert(`A Partir De La Iteracion ${i} La Semilla Se Degradó`);
      degradacion = true;
    }

    if(r.includes(numAleatorio)) {
      clases.push(true);
    } else {
      clases.push(false);
    }

    semillas.push(semilla);
    r.push(numAleatorio);
    y.push(cuadrado);
  }

  if(degradacion) alert('Los Números Repetidos Están Marcados De Color Rojo');

  semillas.shift();

  return {
    primeraColumna: y,
    segundaColumna: semillas,
    terceraColumna: r,
    clases: clases,
    total: total_numeros
  };
}

// console.log(generarNumeroAleatorio(9803, 6965, 5));
