export function showOptions(containerId){

    const container = document.getElementById(containerId);

    container.classList.remove('d-none');
    container.classList.add('d-flex');
    container.classList.add('justify-content-end');
}