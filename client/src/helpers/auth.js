import {URL_CLIENT} from '../config'

export function validateRol(){
    const info = JSON.parse(localStorage.getItem('userInfo'));
    const actualPage = window.location.href;
    
    if(info.rol===1 && actualPage === `${URL_CLIENT}despacho`){
        window.location = `${URL_CLIENT}bloqueo`;
        return;
    }

    if(info.rol===2 && actualPage!== `${URL_CLIENT}despacho`){
        window.location = `${URL_CLIENT}bloqueo`;
        return;
    }
}