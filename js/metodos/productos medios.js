let semilla_1 = document.querySelector('#semilla1-productos');
let semilla_2 = document.querySelector('#semilla2-productos');
let total = document.querySelector('#total-productos');
let btn_productos = document.querySelector('#btn-productos');
let tabla_cuadrados_medios = document.querySelector('#tabla-productos-medios');
let btnValidacion;
let valores = [];
let datos;

btn_productos.addEventListener('click', function (e) {
  e.preventDefault();

  valores.push(parseInt(semilla_1.value));
  valores.push(parseInt(semilla_2.value));

  if(semilla_1.value === '' || semilla_2.value.length === '' || total.value === ''){
    alert('Debes Llenar Todos Los Campos');
  } else if (semilla_1.value.length < 4 || semilla_2.value.length < 4){
    alert('Las Semillas Deben Ser De 4 Dígitos O Más');
  } else {
    llenar_tabla_productos_medios(valores, parseInt(total.value)); 

    valores = []
  }
});

function llenar_tabla_productos_medios(semillas, total) {
  datos = productos_medios(semillas, total);
  localStorage.setItem('datos', JSON.stringify(datos.terceraColumna));

  let html = /* html */ `
  <button id="btn-validar-productos-medios" class="btn">Validar Resultados</button>
  <br>
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

  btnValidacion = document.querySelector('#btn-validar-productos-medios');

  btnValidacion.addEventListener('click', () => {
    window.location.href = '/algoritmos-comprobacion.html'
  })
}

export function productos_medios(semillas, total_numeros = 0) {
  let y = [];
  let r = [];
  let clases = [];
  let degradacion = false;

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
    valores.push(semilla);
    r.push(numAleatorio);
    y.push(cuadrado);
  }

  if(degradacion) alert('Los Números Repetidos Están Marcados De Color Rojo');

  semillas.shift();
  semillas.shift();

  return {
    primeraColumna: y,
    segundaColumna: semillas,
    terceraColumna: r,
    clases: clases,
    total: total_numeros
  };
}

// console.log(productos_medios([5015, 5734], 5));
