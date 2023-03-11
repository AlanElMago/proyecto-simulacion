let semillas = [37];
const a = 19;
const c = 33;
const m = 100;

function generarNumeroAleatorio(total_numeros = 0) {
  for (let i = 0; i < total_numeros; i++) {
    let resultado = (a * semillas[i] + 33) % m;

    semillas.push(resultado);

    let numAleatorio = resultado / (m - 1);
    console.log(numAleatorio);
  }
}

generarNumeroAleatorio(5);
