export function orderWeightFn(toOrder) {
  let order = toOrder
    .sort((a, b) => {
      //aqui ordeno solo los 1ros valores--> 23-xx vs 44-xx
      let pesoA = a.database ? a.weight : a.weight.metric;

      let pesoB = b.database ? b.weight : b.weight.metric;

      //valido si algun valor de pesoA es NaN
      if (isNaN(Number(pesoA.split("-")[0]))) {
        //no hago ningun cambio puesto que no se puede comparar
        return -1;
      } else if (isNaN(Number(pesoB.split("-")[0]))) {
        return 1;
      } else if (Number(pesoA.split("-")[0] === pesoB.split("-")[0])) {
        //si los values son iguales, que compare el segundo parametro

        //valido que tengan segundo parametro
        if (pesoA.length > 3 && pesoB.length > 3) {
          return Number(pesoA.split("-")[1]) - Number(pesoB.split("-")[1]);
        }

        //si no hay segundo parametro, que devuelva 0
        return 0;
      } else {
        //resto solo de los valores minimos de ambos dogs
        let subtraction =
          Number(pesoA.split("-")[0]) - Number(pesoB.split("-")[0]);
        return subtraction;
      }
    })
    .map((e) => e);
  return order;
}

export function orderNameFn(toOrder) {
  let orderName = toOrder.sort((a, b) =>
    a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
  );
  return orderName;
}
