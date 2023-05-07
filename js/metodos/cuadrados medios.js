let semilla = document.querySelector('#semilla-cuadrados');
let total = document.querySelector('#total-cuadrados');
let btn_cuadrados = document.querySelector('#btn-cuadrados');
let tabla_cuadrados_medios = document.querySelector('#tabla-cuadrados-medios');
let btnValidacion;
let datos;

btn_cuadrados.addEventListener('click', function (e) {
  e.preventDefault();

  if(semilla.value == '' || total.value == ''){
    alert('Debes Llenar Todos Los Campos');
  } else if (semilla.value.length < 4){
    alert('La Semilla Debe Ser De 4 Dígitos o Más');
  } else {
    llenar_tabla_cuadrados_medios(parseInt(semilla.value), parseInt(total.value));
  }
});

function llenar_tabla_cuadrados_medios(semilla, total) {
  datos = cuadrados_medios(total, semilla);
  localStorage.setItem('datos', JSON.stringify(datos.terceraColumna));

  let html = /* html */ `
  <button id="btn-validar-cuadrados-medios" class="btn">Validar Resultados</button>
  <br />
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

  tabla_cuadrados_medios.innerHTML = html;
  
  btnValidacion = document.querySelector('#btn-validar-cuadrados-medios');  

  btnValidacion.addEventListener('click', () => {
    window.location.href = '/algoritmos-comprobacion.html';         
  })
}

export function cuadrados_medios(total_numeros = 0, semilla) {
  let semillas = [semilla];
  let y = [];
  let r = [];
  let clases = [];
  let degradacion = false;

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