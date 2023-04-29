let entrada = document.querySelector('#secuencia-numeros');
let modulo = document.querySelector('#modulo-congruencial-aditivo');
let total = document.querySelector('#total-congruencial-aditivo');
let btn = document.querySelector('#btn-congruencial-aditivo');
let tabla = document.querySelector('#tabla-congruencial-aditivo');
let datos;
let btnValidacion;

btn.addEventListener('click', function (e) {
  e.preventDefault();
  let semillas = entrada.value.split(',').map(function (numero) {
    return parseInt(numero);
  });

  if(entrada.value === '' || modulo.value === '' || total.value === ''){
    alert('Debes Llenar Todos Los Campos');
  } else if(semillas.includes(NaN)) {
    alert('La Entrada De Números Es Incorrecta')
  } else {        
    llenar_tabla(semillas, parseInt(modulo.value), parseInt(total.value));
  }
});

function llenar_tabla(entrada, m, total) {
  datos = congruencial_aditivo(entrada, m, total);
  localStorage.setItem('datos', JSON.stringify(datos.segundaColumna));

  let html = /* html */ `
  <button id="btn-validar-congruencial-multiplicativo" class="btn">Validar Resultados</button>
  <br />
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
        <td class=${datos.clases[i] ? "label-red" : "column1"}>${datos.primeraColumna[i]}</td>
        <td class=${datos.clases[i] ? "label-red" : "column1"}>${datos.segundaColumna[i]}</td>
      </tr>
    `;
  }

  html += /* html */ `
      </tbody>
    </table>
  `;

  tabla.innerHTML = html;

  btnValidacion = document.querySelector('#btn-validar-congruencial-multiplicativo');

  btnValidacion.addEventListener('click', () => {
    window.location.href = '/algoritmos-comprobacion.html'
  })
}

export function congruencial_aditivo(entrada, m, total_numeros = 0) {
  let cadena = entrada;
  let semillas = [];
  let r = [];
  let clases = [];
  let degradacion = false;

  for (let i = 0; i < total_numeros; i++) {
    let resultado = (cadena[i] + cadena[cadena.length - 1]) % m;
    let numAleatorio = resultado / (m - 1);

    if(r.includes(numAleatorio) && !degradacion){
      alert(`A Partir De La Iteracion ${i} La Semilla Se Degradó`);
      degradacion = true;
    }

    if(r.includes(numAleatorio)) {
      clases.push(true);
    } else {
      clases.push(false);
    }

    cadena.push(resultado);
    semillas.push(resultado);
    r.push(numAleatorio);
  }

  if(degradacion) alert('Los Números Repetidos Están Marcados De Color Rojo');

  return {
    primeraColumna: semillas,
    segundaColumna: r,
    clases: clases,
    total: total_numeros
  };
}
