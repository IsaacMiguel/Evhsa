var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll
}

function getAll(cb){
	conn('select * from ubicaciones_neumaticos order by id', cb);
}