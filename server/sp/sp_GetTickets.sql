/*

BEGIN

SET @tickets = (
    SELECT

	ticket.idTicket AS id,
    CONCAT(ticket.diaRecoleccion,'/',ticket.mesRecoleccion,'/',ticket.recolectionYear) AS recolection,
    CONCAT(ticket.diaEntrega,'/',ticket.mesEntrega,'/',ticket.entregaYear) AS deliver,
    ticket.modelo AS model,
    reparacion_estatus.descripcion AS status,
    JSON_OBJECT(
        'id',121212121,
        'descripcion',1212112
    ) AS reparacion

FROM ticket 

INNER JOIN reparacion_estatus ON ticket.estadoReparacion  = reparacion_estatus.id 

WHERE tecnico = apiIdTecnico ORDER BY ticket.idTicket DESC LIMIT apiInicio,apiLimite);

SELECT @tickets;

END

*/

BEGIN

SET @tickets = (
    SELECT

	ticket.idTicket AS id,
    CONCAT(ticket.diaRecoleccion,'/',ticket.mesRecoleccion,'/',ticket.recolectionYear) AS recolection,
    CONCAT(ticket.diaEntrega,'/',ticket.mesEntrega,'/',ticket.entregaYear) AS deliver,
    ticket.modelo AS model,
    reparacion_estatus.descripcion AS status

FROM ticket 

INNER JOIN reparacion_estatus ON ticket.estadoReparacion  = reparacion_estatus.id 

WHERE tecnico = apiIdTecnico ORDER BY ticket.idTicket DESC LIMIT apiInicio,apiLimite);

SELECT @tickets;

END

/*

BEGIN

SELECT 
	
	ticket.idTicket AS id,
    CONCAT(ticket.diaRecoleccion,'/',ticket.mesRecoleccion,'/',ticket.recolectionYear) AS recolection,
    CONCAT(ticket.diaEntrega,'/',ticket.mesEntrega,'/',ticket.entregaYear) AS deliver,
    ticket.modelo AS model,
    reparacion_estatus.descripcion AS status

FROM ticket 

INNER JOIN reparacion_estatus ON ticket.estadoReparacion  = reparacion_estatus.id 

WHERE tecnico = apiIdTecnico ORDER BY ticket.idTicket DESC LIMIT apiInicio,apiLimite;

END

*/