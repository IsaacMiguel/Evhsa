var conn = require('../config/db').conn;

module.exports = {
	getAll : getAll
}

function getAll(cb) {
	conn("select id, numero, denominacion, numero_coche_fk, DATE_FORMAT(fecha_colocacion, '%d/%m/%Y') as f_colocacion, total, id_operador_fk, responsable, tipo, DATE_FORMAT(fecha_sacado, '%d/%m/%Y') as f_sacado, km, resultado from equipos",cb);
}