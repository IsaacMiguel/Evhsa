var conn = require('../config/db').conn;

module.exports = {
	insertSerenos : insertSerenos
}

function insertSerenos (d, cb) {
 conn("INSERT into serenos(fecha_movimiento, unica_operador_fk, id_repuesto_fk, cantidad) " +
 "VALUES('" + d.fecha_movimiento + "', " + d.unica_operador_fk + ", " + d.id_repuesto_fk + ", " + d.cantidad + ")", cb);
}