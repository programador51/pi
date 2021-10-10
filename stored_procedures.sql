DELIMITER $$
CREATE PROCEDURE `sp_CreateTicket`(IN `apiDiaRecoleccion` INT, IN `apiMesRecoleccion` INT, IN `apiRecolectionYear` INT, IN `apiDiaEntrega` INT, IN `apiMesEntrega` INT, IN `apiEntregaYear` INT, IN `apiModelo` VARCHAR(30) CHARSET utf8, IN `apiMarca` VARCHAR(30) CHARSET utf8, IN `apiDescripcion` VARCHAR(50) CHARSET utf8, IN `apiServicio` VARCHAR(50) CHARSET utf8, IN `apiCotizacion` FLOAT, IN `apiMedioPagoId` INT, IN `apiTotalPago` FLOAT, IN `apiTecnico` INT, IN `apiEstadoReparacion` INT, IN `apiNombreCliente` VARCHAR(50) CHARSET utf8, IN `apiNumeroCliente` BIGINT)
BEGIN

INSERT INTO ticket

	(
        diaRecoleccion , 
        mesRecoleccion, 
        recolectionYear,
        
    	diaEntrega,
        mesEntrega,
        entregaYear,
        
    	modelo,
        marca,
        descripcion,
        
    	servicio,
        cotizacion,
        medioPagoId,
        
    	totalPago,
        tecnico,
        estadoReparacion,
        
    	nombreCliente,
        numeroCliente
    )

VALUES
        
        (   apiDiaRecoleccion,
         	apiMesRecoleccion,
	        apiRecolectionYear,
         
         	apiDiaEntrega,
         	apiMesEntrega,
          	apiEntregaYear,
         
         	apiModelo,
         	apiMarca,           
         	apiDescripcion,
         
         	apiServicio,
         	apiCotizacion,
	        apiMedioPagoId,
         
         	apiTotalPago,
            apiTecnico,
         	apiEstadoReparacion,
         
         	apiNombreCliente,
         	apiNumeroCliente
        );

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_AddRequestMovement`(IN `apiTecnico` INT, IN `apiCantidad` INT, IN `apiPrecioCompra` INT, IN `apiTotal` INT, IN `apiIdItem` INT)
BEGIN
	
    SET @totalStock = (SELECT stock FROM inventario WHERE codigo = apiIdItem);
    
	SET @today = CURDATE();
    
    UPDATE inventario SET stock = (@totalStock - apiCantidad) WHERE codigo = apiIdItem;

	INSERT INTO rotation
         
         (
             tecnico,
             cantidad,
             precioCompra,
             total,
             fecha
         )
         
         VALUES 
         (
             apiTecnico,
          	 apiCantidad,
             apiPrecioCompra,
             apiTotal,
             @today
         );
         
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetAnualInventory`()
BEGIN

SET
    @lastDay =(
    SELECT
        DATE_FORMAT(NOW(), '%Y-12-31'));
    SET
        @firstDay =(
        SELECT
            DATE_FORMAT(NOW(), '%Y-01-01'));
        SET
            @totalInventory =(
            SELECT
                SUM(total)
            FROM
                rotation
            WHERE
                fecha BETWEEN @firstDay AND @lastDay
        );
        
        SELECT 
        	@totalInventory AS totalInventory,
            CONCAT('$',FORMAT(@totalInventory,2)) AS formated;
            
            END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetAverageTicket`()
BEGIN

	SET @actualDay = DATE_FORMAT(CURDATE(),'%e');
        
        SET @sumatory = (SELECT 
            SUM(ticket.totalPago) AS sumatory
        FROM ticket

        WHERE
            ticket.diaRecoleccion = @actualDay
                       AND ticket.estadoReparacion = 2);
            
         SET @noTickets = (SELECT 
            COUNT(*) AS noTickets
        FROM ticket

        WHERE
            ticket.diaRecoleccion = @actualDay);

SET @average = @sumatory/@noTickets;

SELECT
	@average AS average,
    CONCAT('$',FORMAT(@average,2)) AS formated;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetInventoryAvailable`()
BEGIN

SELECT 
	
    codigo AS id,
    descripcion AS description,
    stock AS stock,
    precioCompra as buyPrice,
    CONCAT(codigo,' - ',descripcion , ' (',stock,')') AS idDesc
    
FROM inventario WHERE stock > 0 ORDER BY codigo;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetDayInventory`()
BEGIN

    SET
        @today =(
    SELECT
        DATE(NOW()));
    SELECT
        SUM(total) AS daySolds
    FROM
        rotation
    WHERE
        fecha = @today;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetInventoryRotation`()
BEGIN

	SELECT 499 AS 'pruebaRotacion';

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetInventoryValue`()
    NO SQL
BEGIN

	SELECT 
    SUM(inventario.stock*inventario.precioCompra) AS inventoryValue
    
    FROM inventario WHERE inventario.stock > 0;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetManageStatics`()
BEGIN
	
    /*
    Respect the order of the stored procedures
    
    1. CALL sp_GetAverageTicket();                  
    2. CALL sp_GetAnualInventory();
    3. CALL sp_GetInventoryValue();
    4. CALL sp_GetWeekInventory();
    5. CALL sp_GetDayInventory();
    
    */
    
	CALL sp_GetAverageTicket();                  
	CALL sp_GetAnualInventory();
    CALL sp_GetInventoryValue();
    CALL sp_GetWeekInventory();
    CALL sp_GetDayInventory();
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetNoTickets`(IN `apiTecnico` INT)
BEGIN

SELECT COUNT(tecnico) AS noTickets FROM ticket WHERE tecnico = apiTecnico;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetPayMethods`()
BEGIN

SELECT 
                formaspago.id AS id,
                formaspago.nombre AS description

            FROM formaspago ORDER BY nombre ASC;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetRepairStatus`()
BEGIN

SELECT
                reparacion_estatus.id AS id,
                reparacion_estatus.descripcion AS description

            FROM reparacion_estatus ORDER BY description ASC;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetTicket`(IN `apiIdTicket` INT)
BEGIN

SELECT
	ticket.idTicket AS id,
    JSON_OBJECT(
        'fullName',ticket.nombreCliente,
        'phone',ticket.numeroCliente
    ) AS customer,
    
    ticket.tecnico AS idTechnician,
    ticket.estadoReparacion AS idRepairStatus,
    CONCAT(ticket.entregaYear,'-',ticket.mesEntrega,'-',ticket.diaEntrega) AS deliverDate,
    CONCAT(ticket.recolectionYear,'-',ticket.mesRecoleccion,'-',ticket.diaRecoleccion) AS recolectionDate,
    ticket.modelo AS model,
    ticket.marca AS fabricant,
    ticket.servicio AS idService,
    ticket.descripcion AS observations,
    ticket.medioPagoId AS idPayMethod,
    ticket.cotizacion AS quotation,
    ticket.totalPago AS amount
    
FROM ticket WHERE ticket.idTicket = apiIdTicket;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetTickets`(IN `apiIdTecnico` INT, IN `apiInicio` INT, IN `apiLimite` INT)
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

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetUsers`()
BEGIN

	SELECT
            usuario.id AS id,
            usuario.username AS userName,
            JSON_OBJECT(
                'id',usuario.rol
            ) AS rol,
            JSON_OBJECT(
                'first',usuario.nombre,
                'middle',usuario.nombre2,
                'pattern',usuario.paterno,
                'mother',usuario.materno,
                'fullName',CONCAT_WS(' ',usuario.nombre,usuario.nombre2,usuario.paterno,usuario.materno)
            ) AS name
        FROM usuario ORDER BY usuario.nombre ASC;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_GetWeekInventory`()
BEGIN

/* https://dba.stackexchange.com/questions/15742/sql-query-to-get-last-day-of-every-week */
SET
    @lastDayWeek =(
    SELECT
        DATE(
            NOW() + INTERVAL(6 - WEEKDAY(NOW())) DAY));
            /* https://www.webstudying.net/notes/get-the-first-and-last-day-of-the-current-week-in-mysql/ */
        SET
            @firstDayWeek =(
            SELECT
                DATE_SUB(
                    CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 0 DAY));
                SELECT
                    SUM(rotation.total) AS weekInventory
                    
                FROM
                    rotation
                WHERE
                    fecha BETWEEN @firstDayWeek AND @lastDayWeek;
                    
END$$
DELIMITER ;
