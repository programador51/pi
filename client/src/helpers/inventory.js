export function setInputs(data){
    document.getElementById('editProductDescription').value = data.descripcion;
    document.getElementById('editProductStock').value = data.stock;
    document.getElementById('editProductPrice').value = data.precioCompra;
    document.getElementById('editProductSell').value = data.precioVenta;
    document.getElementById('editCategory').value = data.categoria;
    document.getElementById('editProductCode').value = data.codigo;
}