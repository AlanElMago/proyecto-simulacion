export function dado(x){
  let valoresDado = [];
  let numeros = [];
  let semilla = x;
  let semillas = [semilla];

  for (let i = 0; i < 6; i++) {
    let cuadrado = semillas[i] * 7895;
    let cuadradoStr = cuadrado.toString();

    while (cuadradoStr.length !== 8) {
      cuadradoStr = '0' + cuadradoStr;
    }

    let mitad = cuadradoStr.length / 2;
    let mitadStr = cuadradoStr.substring(mitad / 2, mitad / 2 + mitad);
    semilla = parseInt(mitadStr);    
    semillas.push(semilla);
    numeros.push(semilla / 10000);
  }

  for(let i = 0; i < numeros.length; i++) {
    if(numeros[i] > 0 && numeros[i] < 0.1666){
      valoresDado.push(1);
    } else if(numeros[i] > 0.1666 && numeros[i] < 0.3332){
      valoresDado.push(2);
    } else if(numeros[i] > 0.3332 && numeros[i] < 0.4998){
      valoresDado.push(3);
    } else if(numeros[i] > 0.4998 && numeros[i] < 0.6664){
      valoresDado.push(4);
    } else if(numeros[i] > 0.6664 && numeros[i] < 0.833){
      valoresDado.push(5);
    } else if(numeros[i] > 0.833 && numeros[i] < 1){
      valoresDado.push(6);
    }
  }

  return valoresDado;
}
