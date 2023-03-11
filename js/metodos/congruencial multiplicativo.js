let semillas = [19];
const k = 3;
const g = 6;
const m = Math.pow(2, g);
const a = 5 + 8 * k;
const N = m / 4;

function generarNumeroAleatorio() {
  for (let i = 0; i < N + 1; i++) {
    let resultado = (a * semillas[i]) % m;

    semillas.push(resultado);

    let numAleatorio = resultado / (m - 1);
    console.log(numAleatorio);
  }
}

generarNumeroAleatorio();
