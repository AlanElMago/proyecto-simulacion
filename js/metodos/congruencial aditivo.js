let semillas = [66, 90, 99, 04, 70];
const m = 100;

function generarNumeroAleatorio(total_numeros = 0) {
  for (let i = 0; i < total_numeros; i++) {
    let resultado = (semillas[i] + semillas[semillas.length - 1]) % m;

    semillas.push(resultado);

    let numAleatorio = resultado / (m - 1);
    console.log(numAleatorio);
  }
}

generarNumeroAleatorio(30);
