function getIdOfProducts(arr) {
    let id_array = [];
    arr.forEach(element => {
        const id = element.id_producto;
        id_array.push(id)
    })
    return id_array;
}

module.exports = { getIdOfProducts };