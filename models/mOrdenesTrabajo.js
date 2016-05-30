const conn = require('../config/db').conn;

module.exports = {
	getMaxByIdVehiculo : getMaxByIdVehiculo,
	getById : getById,
	insert : insert
}

function getMaxByIdVehiculo (nro_coche, fecha_hoy, cb) {
	conn("SELECT MAX(id) as id FROM ordenes_trabajo WHERE " +
	"ordenes_trabajo.nro_coche = " + nro_coche + " AND " +
	"ordenes_trabajo.fecha <= '" + fecha_hoy + "'", cb);
}

function getById (id, cb) {
	conn("SELECT * FROM ordenes_trabajo WHERE " +
	"id = " + id, cb);
}

function insert (nro_coche, fecha, fecha_anterior, nro_ant, km_hastahoy, cb) {
	conn("INSERT INTO ordenes_trabajo( nro_coche, fecha, fecha_ant, nro_ant, km_hastahoy ) VALUES(" +
	nro_coche + ", '" + 
	fecha + "', '" +
	fecha_anterior + "', " +
	nro_ant + ", " +
	km_hastahoy + ")", cb);
}