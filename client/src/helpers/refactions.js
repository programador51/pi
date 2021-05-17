export function showOptions(id){
    const container = document.getElementById(id);

    container.classList.remove('d-none');
    container.classList.add('d-flex');
    container.classList.add('justify-content-end');
}

export function setInfoModal(data){
    document.getElementById('editQuantity').value = data.cantidad;
    
    document.getElementById('editRefaction').value = data.refaccion;
    
    document.getElementById('editFabricant').value = data.marca;
    
    document.getElementById('editModel').value = data.modelo;
}