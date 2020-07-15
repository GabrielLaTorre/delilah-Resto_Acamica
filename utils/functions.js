function getIdOfProducts(arr) {
    let id_array = [];
    arr.forEach(element => {
        const id = element.id_plato;
        id_array.push(id)
    })
    return id_array;
}

function getProductsPrices(arrP, arrC) {
    const newArr = [];
    for (let i = 0; i < arrP.length; i++) {
        const product = arrP[i];
        const price = product.precio_plato;
        const cantidad = arrC.find(element => element.id_plato == product.id_plato).cantidad;
        const newPrice = price * cantidad;
        newArr.push(newPrice);
    }
    return newArr;
}

function getTotalPrice(arr) {
    let total = 0;
    arr.forEach(price => {
        total += price
    })
    return total;
}

module.exports = { getIdOfProducts, getProductsPrices, getTotalPrice };