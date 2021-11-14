import axios from 'axios';
import { URL_API } from '../config';
import { getActualDate } from '../helpers/dates';
import { queryError, querySuccess } from '../helpers/alerts';

/**
 * Update the requested items
 * @param {object} item - Information of the item requested
 * @returns {boolean} True if query success
 */
export async function UpdateRequestItem(item) {
    try {

        const { data } = await axios.post(`${URL_API}inventario/solicitar`, item);

        if (data.status === 200) return true;

        return false;

    } catch (error) {
        return false;
    }
}

export async function GetManageStatics() {
    try {

        const { data } = await axios.get(`${URL_API}ticket/gestion/estatus`);

        if (data.status === 200) return data.statics;

        return null;

    } catch (error) {

        return null;

    }
}

export async function GetAvailableInventory() {
    try {

        const { data } = await axios.get(`${URL_API}inventario/disponible`);

        if (data.status === 200) return data.inventory;

        return [];

    } catch (error) {
        return [];
    }
}

export async function UpdateTicket(dataForm) {
    try {

        const { data } = await axios.put(`${URL_API}ticket`, dataForm);

        if (data.status === 200) {

            return true;
        }

        return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function GetTickets(page = 1, order = 'DESC', columnOrdering = 'na', aditionalQuery) {

    const errorQuery = {
        pages: 0,
        actualPage: 0,
        tickets: []
    }

    try {

        const { data } = await axios.get(`${URL_API}ticket/tickets?pagina=${page}${aditionalQuery}`);

        if (data.status === 200) {
            return data.data;
        }

        return errorQuery

    } catch (error) {

        console.log(error);
        return errorQuery;
    }
}

/**
 * Create a new ticket on DB
 * 
 * @param {object} ticketInfo - Ticket info
 * @returns {boolean} True if ticket was created
 */
export async function AddTicket(ticketInfo) {
    try {

        const { data } = await axios.post(`${URL_API}ticket/crear`, ticketInfo);

        if (data.status === 200) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function GetPayMethods() {
    try {

        const { data } = await axios.get(`${URL_API}ticket/metodos-pago`);

        if (data.status === 200) {
            return data.payMethods
        } else {
            return [];
        }

    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function GetRepairStatus() {
    try {

        const { data } = await axios.get(`${URL_API}ticket/reparacion/estatus`);

        if (data.status === 200) {
            return data.repairStatus
        } else {
            return [];
        }

    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function GetServices() {
    try {

        const { data } = await axios.get(`${URL_API}servicios`);

        if (data.status === 200) {
            return data.services;
        } else {
            return [];
        }

    } catch (error) {
        console.log(error);

        return [];
    }
}

// MANAGE
export async function fetchManage(day, month, year) {
    try {
        const { data } = await axios.get(`${URL_API}movimientos/${day}/${month}/${year}`);

        console.log(data);

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

        document.getElementById('optionsInventory').classList.add('d-none');

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
        const { data } = await axios.post(`${URL_API}inventario/agregar/producto`, {
            description,
            category,
            stock,
            price,
            sell
        });

        if (data.status == 200) {
            querySuccess(data.message);
            return true;
        }

        return false;

    } catch (error) {
        console.log(error);
    }
}

export async function addCategory() {
    try {

        const category = document.getElementById('addCategory').value;

        const { data } = await axios.post(`${URL_API}inventario/agregar/categoria`, {
            category
        });

        if (data.status === 200) {
            return true;
        }

        return false;
    } catch (error) {
        console.log(error);
    }
}

// LOGIN
export async function login(e) {

    e.preventDefault();

    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    try {
        const { data } = await axios.post(`${URL_API}usuarios/login`, {
            userName,
            password
        });

        if (data.status === 200) {

            let redirect = ``;

            if (data.user.rol === 1 || data.user.rol === 3) {
                redirect = '/gestion';
            } else {
                redirect = '/despacho';
            }

            localStorage.setItem('userInfo', JSON.stringify(data.user));

            return [true, redirect];
        }

        queryError(`Usuario o credenciales incorrectas`);

        return [false, ''];

    } catch (error) {
        console.log(error);
    }
}

// REFACTIONS
export async function addRefaction() {
    try {

        const quantity = document.getElementById('quantity').value;
        const refaction = document.getElementById('refaction').value;
        const fabricant = document.getElementById('fabricant').value;
        const model = document.getElementById('model').value;

        const today = getActualDate();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        const { data } = await axios.post(`${URL_API}refacciones/agregar`, {
            quantity,
            refaction,
            fabricant,
            model,
            day: today.numberDate.day,
            month: today.numberDate.month + 1,
            year: today.numberDate.year,
            rol: userInfo.rol,
            sucursal: userInfo.sucursal
        }

        );

        console.log(data);

        if (data.status === 200) {
            querySuccess(data.message);
            document.getElementById('closeAddProduct').click();
            document.getElementById('addProductForm').reset();
            return true;
        }

        queryError(data.message);

    } catch (error) {
        console.log(error);
    }
}

export async function getRefactions() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const today = getActualDate();

    try {
        // refacciones/sucursal/dia/mes/año
        const { data } = await axios.get(`${URL_API}refacciones/${userInfo.sucursal}/${today.numberDate.day}/${today.numberDate.month + 1}/${today.numberDate.year}`);

        if (data.status === 200) {
            console.log('Refactions obtained');
            return data.refactions;
        }

        queryError(data.error);

    } catch (error) {
        console.log(error);
    }
}

export async function executeDeleteRefaction(id) {
    try {

        document.getElementById('optionsRefactions').classList.add('d-none');


        const { data } = await axios.post(`${URL_API}refacciones/borrar`, {
            id
        });

        if (data.status === 200) {
            querySuccess(data.message);
            document.getElementById(id).innerHTML = ``;
            return;
        }

        queryError(data.error);
    } catch (error) {
        console.log(error);
    }
}

export async function editRefaction(id) {
    try {
        const quantity = document.getElementById('editQuantity').value;
        const refaction = document.getElementById('editRefaction').value;
        const fabricant = document.getElementById('editFabricant').value;
        const model = document.getElementById('editModel').value;


        document.getElementById('closeAddProduct').click();
        document.getElementById('optionsRefactions').classList.add('d-none');

        const { data } = await axios.post(`${URL_API}refacciones/editar`, {
            quantity,
            refaction,
            fabricant,
            model,
            id
        });

        if (data.status === 200) {
            querySuccess(data.message);
            return true;
        }

        return false;

    } catch (error) {
        console.log(error);
    }
}

export async function refactionsOffice(office) {

    const today = getActualDate();

    try {
        // refacciones/sucursal/dia/mes/año
        const { data } = await axios.get(`${URL_API}refacciones/${office}/${today.numberDate.day}/${today.numberDate.month + 1}/${today.numberDate.year}`);

        if (data.status === 200) {
            console.log('Refactions obtained');
            return data.refactions;
        }

        queryError(data.error);

    } catch (error) {
        console.log(error);
    }
}

export async function confirmDispatchRefaction(id) {
    try {
        // refacciones/despachar
        const { data } = await axios.post(`${URL_API}refacciones/despachar`, {
            id
        });

        if (data.status === 200) {
            querySuccess(data.message);
            return true;
        }

        queryError(data.error);

    } catch (error) {
        console.log(error);
    }
}

export async function getMovesMonth() {
    try {

        const today = getActualDate();

        const { data } = await axios.get(`${URL_API}movimientos/mensual/${(today.numberDate.month) + 1}/${today.numberDate.year}`);

        if (data.status !== 200) {
            return;
        }
        return data.moves;

    } catch (error) {
        console.log(error);
    }
}

/**
 * Get all the technicias of ST Soluciones
 * 
 * @returns {object[]} List of users
 */
export async function GetUsers() {
    try {
        const { data } = await axios.get(`${URL_API}usuarios/`);

        if (data.status === 200) {
            return data.users
        } else {
            return [];
        }

    } catch (error) {
        console.log(error);

        return [];
    }
}

/**
 * Get the info of a ticket
 * @param {number|string} idTicket - Id of the ticket
 * @returns {object} Information of the ticket
 */
export async function GetTicket(idTicket) {
    try {

        const { data } = await axios.get(`${URL_API}ticket/${idTicket}`);

        if (data.status === 200) {
            return data.ticket;
        }

        return null;

    } catch (error) {

        console.log(error);

        return null;
    }
}