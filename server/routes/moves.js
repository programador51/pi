const express = require('express');
const router = express.Router();

const ModelMoves = require('../model/moves');
const ControllerMoves = require('../controller/move');

router.post('/',
    ModelMoves.add
);

router.get('/',
    ModelMoves.get,
    ControllerMoves.parseMoves
);

router.get('/mensual/:month/:year',
    ModelMoves.movesMonth
)

router.get('/:day/:month/:year',
    ModelMoves.getCashRegister,
    ModelMoves.getLastCashRegister,
    ModelMoves.getMovesCashRegister,
    ControllerMoves.calculateUpdatedCashRegister,
    ModelMoves.updateNewCashRegister,
    ModelMoves.getMovesDay
);

module.exports = router;