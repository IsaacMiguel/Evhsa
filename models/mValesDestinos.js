var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll
}

function getAll(cb){
	conn("SELECT * FROM destinos_vales", cb);
}