/**
 * Parse the string json that returns mysql
 * 
 * @param {string} string - JSON as string format
 * @param {boolean = false} isBuffer - True if string come as buffer
 * @returns {object} String parsed as object type
 */
function parseJson(string, isBuffer = false){
    if(isBuffer){
        const bufferToString = Buffer.from(string,'utf-8').toString();

        const json = JSON.parse(bufferToString);

        return json;
    }else{
        return ''
    }
}

module.exports = {
    parseJson
}