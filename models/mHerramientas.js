var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll
}

function getAll (cb) {
	conn("select * from herramientras", cb);
}

function getLista (date1, date2, toolName) {
	conn("SELECT * FROM herramientas " +
	"inner join ubicaciones_herramientas " +
	"on herramientas.id_ubicacionherramientas_fk = ubicaciones_herramientas.id", cb);
}