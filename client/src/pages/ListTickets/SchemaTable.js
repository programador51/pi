import { GetTickets } from "../../helpers/apis";

const headerConfig = [
    { 
        text:'Ticket',
        columnNameDB:'idTicket',
        idHeader:'id',
        attributeToPrint:'id',
        sortable:false,
        sortThis:true
    },

    { 
        text: 'Fecha recepcion', 
        columnNameDB: 'na', 
        idHeader: 'recolection', 
        attributeToPrint: 'recolection', 
        sortable: false 
    },

    { 
        text: 'Modelo equipo', 
        columnNameDB: 'modelo', 
        idHeader: 'model', 
        attributeToPrint: 'model', 
        sortable: false 
    },

    { 
        text: 'Estado del equipo', 
        columnNameDB: 'estadoequipo', 
        idHeader: 'status', 
        attributeToPrint: 'status', 
        sortable: false 
    }
];

const sort = {
    sqlSort:true,
    sortASC:true
}

const attributesResponse = {
    pages:'pages',
    actualPage:'actualPage',
    data:'tickets'
};

export const configTicketsTable = {
    idTable:'tickets',
    idPagination:'pagination-tickets',
    pages:0,
    rows:[],
    actualPage:0,
    headerConfig,
    styleTable:'default',
    cbSelection:()=>{},
    idRows:'id',
    sort,
    attributesResponse
};