var conn = require('../config/db').conn;

module.exports = {
	getAll : getAll,
	getRemitosEntrefechas : getRemitosEntrefechas,
	getRemitosXProveedores : getRemitosXProveedores,
	getRemitosXEstado : getRemitosXEstado
}

function getAll (cb) {
	conn("SELECT * FROM remitos", cb);
}

function getRemitosEntrefechas (desde, hasta, cb) {
	conn("SELECT * FROM remitos " +
	"WHERE fecha_movimiento >= '" + desde + "' " +
	"AND fecha_retiro <= '" + hasta + "' " +
	"ORDER BY fecha_movimiento DESC", cb);
}

function getRemitosXProveedores (buscar, desde, hasta, cb) {
	conn("SELECT * FROM remitos " +
	"WHERE id = " + buscar + " " +
	"AND fecha_movimiento >= '" + desde + "' " +
	"AND fecha_retiro <= '" + hasta + "' " +
	"ORDER BY fecha_movimiento DESC", cb);
}

function getRemitosXEstado (buscar, cb) {
	conn("SELECT * FROM remitos WHERE estado = '" + buscar + "'", cb);
}