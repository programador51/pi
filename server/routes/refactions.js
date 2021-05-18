const express = require('express');
const router = express.Router();

const ModelRefaction = require('../model/refactions');

router.post('/agregar',
    ModelRefaction.add
);

router.get('/:office/:day/:month/:year',
    ModelRefaction.refactionsOffice
);

router.post('/borrar',
    ModelRefaction.delete
);

router.post('/editar',
    ModelRefaction.update
);

router.post('/despachar',
    ModelRefaction.dispatch
);

module.exports = router;