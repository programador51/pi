import { GetLogManage } from "../../../helpers/apis";

const headerConfig = [
    {
        text: 'No. articulo',
        columnNameDB: 'idInventory',
        idHeader: 'idInventory',
        attributeToPrint: 'idInventory',
        sortable: false
    },

    {
        text: 'Tecnico',
        columnNameDB: 'fullName',
        idHeader: 'nameTechnician',
        attributeToPrint: 'fullName',
        sortable: false
    },

    {
        text: 'Fecha solicitado',
        columnNameDB: 'modelo',
        idHeader: 'model',
        attributeToPrint: 'date',
        sortable: false
    },

    {
        text: 'Mercancia',
        columnNameDB: 'na',
        idHeader: 'commodityName',
        attributeToPrint: 'descripcion',
        sortable: false
    },

    {
        text: 'Cantidad',
        columnNameDB: 'quantity',
        idHeader: 'quantity',
        attributeToPrint: 'quantity',
        sortable: false
    }
];

const sort = {
    sqlSort: true,
    sortASC: true
}

const attributesResponse = {
    pages: 'pages',
    actualPage: 'actualPage',
    data: 'commodity'
};

export const configLogTable = {
    idTable: 'log-commodity',
    idPagination: 'pagination-commodity',
    pages: 0,
    rows: [],
    actualPage: 0,
    headerConfig,
    styleTable: 'default',
    cbSelection: () => { },
    paginationFn: GetLogManage,
    idRows: 'id',
    sort,
    attributesResponse
};