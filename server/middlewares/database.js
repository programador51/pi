/**
 * Parse the string json that returns mysql
 * 
 * @param {string} string - JSON as string format
 * @param {boolean} isBuffer - True if string come as buffer
 * @returns {object} String parsed as object type
 */
function parseJson(string, isBuffer = false) {
    if (isBuffer) {
        const bufferToString = Buffer.from(string, 'utf-8').toString();

        const json = JSON.parse(bufferToString);

        return json;
    } else {
        return ''
    }
}

/**
 * Parse all the elements as JSON object
 * @param {object[]} rows - Array of results given by mysql query
 * @param {string} root - Name of the "root" that has the element 
 * @returns {object[]} Same array, but with all deep levels parsed as JSON
 * @example
 * 
 * // Having the following result on the query
 * const query = [
    RowDataPacket {
    ticket: '{"id": 105, "recolection": "22/10/2021", "deliver": "27/10/2021", "model": "Mia2lite", "reparation": {"id": 2, "description": "Reparado"}}'}
  ]

  parseRowsJson(query,'ticket');
 */
function parseRowsJson(rows = null,root = 'root') {

    if (rows === null) {
        return [];
    }

    const parsedRows = rows.map(row=>JSON.parse(row[root]));

    return parsedRows;
    
}

module.exports = {
    parseJson,
    parseRowsJson
}