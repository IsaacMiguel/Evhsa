var conn = require('../config/db').conn;

module.exports = {
	getAll : getAll,
	getReporteUbicacion : getReporteUbicacion,
	getReporteUbicacionById : getReporteUbicacionById
}

function getAll (cb) {
 conn("select * from ubicaciones_herramientas", cb);
}

function getReporteUbicacion (desde, hasta, cb) {
	conn("SELECT *, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') AS fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') AS fecha_cambio_f, " +
	"herramientas.valor as herramientavalor " +
	"FROM herramientas " +
	"LEFT JOIN repuestos ON herramientas.codigo = repuestos.codigo " +
	"LEFT JOIN ubicaciones_herramientas " +
	"ON herramientas.id_ubicacionherramientas_fk = ubicaciones_herramientas.id " +
	"WHERE fecha_movimiento >=  '" + desde + "' " +
	"AND fecha_cambio <=  '" + hasta + "' " +
	"ORDER BY fecha_movimiento", cb);
}

function getReporteUbicacionById (desde, hasta, id, cb) {
	conn("SELECT *, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') AS fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') AS fecha_cambio_f, " +
	"herramientas.valor as herramientavalor " +
	"FROM herramientas " +
	"LEFT JOIN repuestos ON herramientas.codigo = repuestos.codigo " +
	"LEFT JOIN ubicaciones_herramientas " +
	"ON herramientas.id_ubicacionherramientas_fk = ubicaciones_herramientas.id " +
	"WHERE fecha_movimiento >=  '" + desde + "' " +
	"AND fecha_cambio <=  '" + hasta + "' " +
	"AND herramientas.id_ubicacionherramientas_fk = " + id + " " +
	"ORDER BY fecha_movimiento", cb);
}