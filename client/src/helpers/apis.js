import axios from 'axios';
import { URL_API } from '../config';
import { getActualDate } from '../helpers/dates';
import { queryError, querySuccess } from '../helpers/alerts';

// MANAGE
export async function fetchManage(day, month, year) {
    try {
        const { data } = await axios.get(`${URL_API}movimientos/${day}/${month}/${year}`);

        if (data.status === 200) {
            return [data.moves, data.cashRegisterDay[0].montoInicial];

        }
    } catch (error) {
        console.log(error);
    }
}

export async function fetchAllMoves() {
    try {
        const { data } = await axios.get(`${URL_API}movimientos`);

        if (data.status === 200) {
            return data.moves;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function addMove() {
    try {
        console.log(`Adding move...`);
        const total = document.getElementById('quantity').value;
        const concept = document.getElementById('concept').value;
        const typeMove = document.getElementById('typeMove').value;

        const today = getActualDate();

        const { data } = await axios.post(`${URL_API}movimientos`, {
            total,
            typeMove,
            date: `${today.numberDate.year}-${today.numberDate.month + 1}-${today.numberDate.day}`,
            concept
        });

        if (data.status === 200) {
            querySuccess(data.message);
            document.getElementById('addMoveForm').reset();
            return true;
        }

        queryError(data.error);
        return false;

    } catch (error) {
        console.log(error);
    }
}

// INVENTORY
export async function fetchInventory() {
    try {
        const { data } = await axios.get(`${URL_API}inventario`);

        if (data.status === 200) {
            return data.inventory;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function executeDeleteProduct(idProduct) {
    try {
        const { data } = await axios.post(`${URL_API}inventario/borrar/producto`, {
            idProduct
        });

        if (data.status === 200) {
            querySuccess(data.message);
            document.getElementById(idProduct).innerHTML = ``;
            return true;
        }

        return false;

    } catch (error) {
        console.log(error);
    }
}

export async function getCategorys() {
    try {
        const { data } = await axios.get(`${URL_API}inventario/categorias`);

        if (data.status === 200) {
            console.log(data.categorys);
            return data.categorys;
        }

    } catch (error) {
        console.log(error);
    }
}

export async function updateProduct() {
    const description = document.getElementById('editProductDescription').value;
    const category = document.getElementById('editCategory').value;
    const stock = document.getElementById('editProductStock').value;
    const price = document.getElementById('editProductPrice').value;
    const sell = document.getElementById('editProductSell').value;
    const idProduct = document.getElementById('editProductCode').value;

    try {
        const { data } = await axios.post(`${URL_API}inventario/editar/producto`, {
            description,
            category,
            stock,
            price,
            sell,
            idProduct
        });

        if (data.status === 200) {
            return true;
        }

        return false;
    } catch (error) {
        console.log(error);
    }
}

export async function addProduct() {
    const description = document.getElementById('addProductName').value;
    const category = document.getElementById('categorys').value;
    const stock = document.getElementById('addProductStock').value;
    const price = document.getElementById('addProductPrice').value;
    const sell = document.getElementById('addProductSell').value;

    try {
        const { data } = await axios.post(`${URL_API}inventario/agregar/producto`,{
            description,
            category,
            stock,
            price,
            sell
        });

        if(data.status==200){
            return true;
        }
        
        return false;

    } catch (error) {
        console.log(error);
    }
}

export async function addCategory(){
    try {

        const category = document.getElementById('addCategory').value;

        const { data } = await axios.post(`${URL_API}inventario/agregar/categoria`,{
            category
        });

        if(data.status===200){
            return true;
        }

        return false;
    } catch (error) {
        console.log(error);
    }
}

// LOGIN
export async function login(e){

    e.preventDefault();

    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    try {
        const { data } = await axios.post(`${URL_API}usuarios/login`,{
            userName,
            password
        });
    
        if(data.status===200){

            let redirect = ``;

            if(data.user.rol === 1 || data.user.rol === 3){
                redirect = '/gestion';
            }else{
                redirect = '/despacho';
            }

            localStorage.setItem('userInfo',JSON.stringify(data.user));
            
            return [true,redirect];
        }
    
        queryError(`Usuario o credenciales incorrectas`);

        return [false,''];

    } catch (error) {
        console.log(error);
    }
}

// REFACTIONS
/* export async function getRefactionsDay(){
    try {
        const { data } = axios.get()
    } catch (error) {
        console.log(error);
    }
} */