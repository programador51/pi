const express = require('express');
const router = express.Router();

const ModelTickets = require('../model/tickets');

const ControllerTickets = require('../controller/tickets');
const { getPagination, calculatePages } = require('../middlewares/pagination');

router.post('/agregar',
    ControllerTickets.parseRecolectionDate,
    ControllerTickets.parseDeliveryDate,
    ModelTickets.add,
    ModelTickets.saveStatesTicket
);

router.post('/crear',
   ModelTickets.create 
);

router.get('/tickets',
    getPagination,
    ModelTickets.GetNoTickets,
    calculatePages,
    ModelTickets.GetTickets
);

router.post('/editar',
    ControllerTickets.parseRecolectionDate,
    ControllerTickets.parseDeliveryDate,
    ModelTickets.update
);

router.get('/',
    ModelTickets.get,
    ControllerTickets.joinDates,
    ControllerTickets.joinPayMethod
);

router.post('/borrar',
    ModelTickets.delete
);

router.get('/buscar/:idTicket',
    ModelTickets.find,
    ModelTickets.findState
);

router.get('/reparacion/estatus',
    ModelTickets.repairStatus
);

router.get('/metodos-pago',
    ModelTickets.payMethods
);

router.put('/',
    ModelTickets.UpdateTicket
)

router.get('/:idTicket',
    ModelTickets.GetTicket
);

module.exports = router;