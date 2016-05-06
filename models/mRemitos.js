var conn = require('../config/db').conn;

module.exports = {
	getAll : getAll,
	getRemitosEntrefechas : getRemitosEntrefechas,
	getRemitosXProveedores : getRemitosXProveedores,
	getRemitosXEstado : getRemitosXEstado,
	getVerRemito : getVerRemito
}

function getAll (cb) {
	conn("SELECT * FROM remitos", cb);
}

function getRemitosEntrefechas (desde, hasta, cb) {
	conn("SELECT *, remitos1.id as id_remitos1, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_retiro, '%d/%m/%Y') as fecha_retiro_f " +
	"FROM remitos1 " +
	"LEFT JOIN proveedores ON remitos1.id_proveedor_fk = proveedores.id " +
	"WHERE fecha_movimiento >= '" + desde + "' " +
	"AND fecha_retiro <= '" + hasta + "' " +
	"ORDER BY fecha_movimiento DESC", cb);
}

function getRemitosXProveedores (buscar, desde, hasta, cb) {
	conn("SELECT *, remitos1.id as id_remitos1, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_retiro, '%d/%m/%Y') as fecha_retiro_f " +
	"FROM remitos1 " +
	"LEFT JOIN proveedores ON remitos1.id_proveedor_fk = proveedores.id " +
	"WHERE proveedores.id = " + buscar + " " +
	"AND fecha_movimiento >= '" + desde + "' " +
	"AND fecha_retiro <= '" + hasta + "' " +
	"ORDER BY fecha_movimiento DESC", cb);
}

function getRemitosXEstado (buscar, cb) {
	conn("SELECT *, remitos1.id as id_remitos1, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_retiro, '%d/%m/%Y') as fecha_retiro_f " +
	"FROM remitos1 " +
	"LEFT JOIN proveedores ON remitos1.id_proveedor_fk = proveedores.id " +
	"WHERE estado = '" + buscar + "' " +
	"ORDER BY fecha_movimiento DESC", cb);
}

function getVerRemito (id_remitos1, cb) {
	conn("SELECT * " +
	"FROM remitos2 " +
	"WHERE remitos2.id_remitos1_fk = " + id_remitos1, cb);	
}