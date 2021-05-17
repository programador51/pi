import sa2 from 'sweetalert2';
import {executeDeleteProduct} from './apis';

export function deleteSuccess(message, idRow) {
    sa2.fire({
        title: message,
        icon: 'success'
    }).then(result => {
        if (result.isConfirmed) {
            document.getElementById(idRow).remove();
        }
    })
}

export function querySuccess(message){
    sa2.fire({
        title:message,
        icon:'success'
    }).then(result=>{
        return true;
    });
}

export function querySuccesRedirect(message,url){
    sa2.fire({
        title:message,
        icon:'success'
    }).then(result=>{
        return true;
    });
}

export function queryError(message){
    sa2.fire({
        title:message,
        icon:'error'
    });
}

export function deleteProduct(message,id){
    sa2.fire({
        title:message,
        icon:'warning',
        showCancelButton:true,
        cancelButtonText:'No',
        confirmButtonText:'Si'
    })
    .then(result=>{
        if(result.isConfirmed){
            executeDeleteProduct(id);
        }
    });
}