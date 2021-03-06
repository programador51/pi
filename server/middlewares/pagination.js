/**
 *  * Middleware to create the pagination of the data
 * @module Middlewares
 * @param {Express.Request} request - Express request
 * @param {Express.Response} response - Express response
 * @param {Express.next} next - Next middleware execution
 */
function getPagination(request, response, next) {

    const limitRegisters = 10;

    const page = parseInt(request.query.pagina);

    const startIndex = (page - 1) * limitRegisters;

    request.params.actualPage = page;
    request.params.rangeBegin = startIndex;
    request.params.noRegisters = limitRegisters;

    next();
}

function calculatePages(request, response, next) {
    const numberPages = Math.ceil(request.params.pages / request.params.noRegisters);
    request.params.pages = numberPages;
    // console.log(request.params.rangeBegin, request.params.noRegisters);
    next();
}

module.exports = {
    getPagination,
    calculatePages
}