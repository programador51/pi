SET
    lc_time_names = 'es_ES';
SELECT
    loginventory.fullName,
    CONCAT(
        DAYOFMONTH(loginventory.date),
        '-',
        MONTHNAME(loginventory.date),
        '-',
        YEAR(loginventory.date)
    ) AS date,
    loginventory.quantity,
    loginventory.idInventory,
    inventario.descripcion
FROM
    loginventory
    INNER JOIN inventario ON inventario.codigo = loginventory.idInventory
LIMIT
    0, 20;