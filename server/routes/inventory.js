const express = require('express');
const { getPagination, calculatePages } = require('../middlewares/pagination');
const router = express.Router();
const ModelInvetory = require('../model/inventory');

router.post('/agregar/categoria',
    ModelInvetory.addCategory
);

router.get('/',
    ModelInvetory.getInventory
);

router.get('/disponible',
    ModelInvetory.AvailableInventory
);

router.get('/reporte/:typeReport', ModelInvetory.GetPdfReport);

router.get('/categorias',
    ModelInvetory.getCategorys
);

router.post('/agregar/producto',
    ModelInvetory.addProduct
);

router.post('/borrar/producto',
    ModelInvetory.deleteProduct
);

router.post('/editar/producto',
    ModelInvetory.editProduct
);

router.post('/solicitar',
    ModelInvetory.RequestInventory
);

router.get('/log-mercancia',
    getPagination,
    ModelInvetory.GetNoLogCommodity,
    calculatePages,
    ModelInvetory.GetLogs
);

module.exports = router;