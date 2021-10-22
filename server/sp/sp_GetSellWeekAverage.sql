BEGIN
/* https://dba.stackexchange.com/questions/15742/sql-query-to-get-last-day-of-every-week */
SET
    @lastDayWeek =(
        SELECT
            DATE(
                NOW() + INTERVAL(6 - WEEKDAY(NOW())) DAY
            )
    );
    /* https://www.webstudying.net/notes/get-the-first-and-last-day-of-the-current-week-in-mysql/ */
SET
    @firstDayWeek =(
        SELECT
            DATE_SUB(
                CURDATE(),
                INTERVAL WEEKDAY(CURDATE()) + 0 DAY
            )
    );
    /* RANGE FOR THE START DATE */
SET
    @actualDayStart = (
        SELECT
            DAYOFMONTH(@firstDayWeek)
    );
SET
    @actualMonthStart = (
        SELECT
            MONTH(@firstDayWeek)
    );
SET
    @actualYearStart = (
        SELECT
            YEAR(@firstDayWeek)
    );
    /* RANGE FOR THE END DATE */
SET
    @actualDayEnd = (
        SELECT
            DAYOFMONTH(@lastDayWeek)
    );
SET
    @actualMonthEnd = (
        SELECT
            MONTH(@lastDayWeek)
    );
SET
    @actualYearEnd = (
        SELECT
            YEAR(@lastDayWeek)
    );
SELECT
    @actualDayStart,
    @actualMonthStart,
    @actualYearStart,
    @actualDayEnd,
    @actualMonthEnd,
    @actualYearEnd;
SET
    @averageSellsWeek = (
        SELECT
            SUM(precio)
        FROM
            movimientos
        WHERE
            diaMovimiento = (
                @actualDay
                AND mesMovimiento = @actualMonth
                AND yearMovimiento = @actualYear
                AND nombre LIKE '%accesorios%'
            );END