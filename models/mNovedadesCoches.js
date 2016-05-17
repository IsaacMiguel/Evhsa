const conn = require('../config/db').conn;

module.exports = {
	getByDateRange : getByDateRange,
	getByDateRange_IdCoche : getByDateRange_IdCoche,
	getByDateRange_NroCoche_SinReparar : getByDateRange_NroCoche_SinReparar,
	getByDateRange_SinReparar : getByDateRange_SinReparar,
	getById : getById,
	insert : insert,
	del : del,
	updateOrden : updateOrden,
	updateNoOrden : updateNoOrden,
	getNovedadById : getNovedadById,
	updateNovedadCoche : updateNovedadCoche
}

function getByDateRange (desde, hasta, cb) {
	conn("SELECT *, novedades_coche.id as id_novedades, " +
	"DATE_FORMAT(novedades_coche.fecha, '%d/%m/%Y') as novedades_coche_fecha_f " +
	"FROM novedades_coche " +
	"LEFT JOIN vehiculos ON novedades_coche.nro_coche_fk = vehiculos.numero " +
	"WHERE novedades_coche.fecha >= '" + desde + "' " + 
	"AND novedades_coche.fecha <= '" + hasta + "' ORDER BY novedades_coche.fecha DESC", cb);
}

function getByDateRange_IdCoche (desde, hasta, numero_coche, cb) {
	conn("SELECT *, novedades_coche.id as id_novedades, " +
	"DATE_FORMAT(novedades_coche.fecha, '%d/%m/%Y') as novedades_coche_fecha_f " +
	"FROM novedades_coche " +
	"LEFT JOIN vehiculos ON novedades_coche.nro_coche_fk = vehiculos.numero " +
	"WHERE novedades_coche.fecha >= '" + desde + "' " + 
	"AND novedades_coche.fecha <= '" + hasta + "' " +
	"AND novedades_coche.nro_coche_fk = " + numero_coche + " " +
	"ORDER BY novedades_coche.fecha DESC", cb);
}

function getByDateRange_NroCoche_SinReparar (desde, hasta, numero_coche, cb) {
	conn("SELECT *, novedades_coche.id as id_novedades, " +
	"DATE_FORMAT(novedades_coche.fecha, '%d/%m/%Y') as novedades_coche_fecha_f " +
	"FROM novedades_coche " +
	"LEFT JOIN vehiculos ON novedades_coche.nro_coche_fk = vehiculos.numero " +
	"WHERE novedades_coche.fecha >= '" + desde + "' " + 
	"AND novedades_coche.fecha <= '" + hasta + "' " +
	"AND novedades_coche.nro_coche_fk = " + numero_coche + " " +
	"AND novedades_coche.id_orden_trabajo = 0 " +
	"ORDER BY novedades_coche.fecha DESC", cb);
}

function getByDateRange_SinReparar (desde, hasta, cb) {
	conn("SELECT *, novedades_coche.id as id_novedades, " +
	"DATE_FORMAT(novedades_coche.fecha, '%d/%m/%Y') as novedades_coche_fecha_f " +
	"FROM novedades_coche " +
	"LEFT JOIN vehiculos ON novedades_coche.nro_coche_fk = vehiculos.numero " +
	"WHERE novedades_coche.fecha >= '" + desde + "' " + 
	"AND novedades_coche.fecha <= '" + hasta + "' " +
	"AND novedades_coche.id_orden_trabajo = 0 " +
	"ORDER BY novedades_coche.fecha DESC", cb);
}

function getById (id_novedad, cb) {
	conn("SELECT *, novedades_coche.id as id_novedades, " +
	"DATE_FORMAT(novedades_coche.fecha, '%d/%m/%Y') as novedades_coche_fecha_f " +
	"FROM novedades_coche " +
	"LEFT JOIN vehiculos ON novedades_coche.nro_coche_fk = vehiculos.numero " +
	"WHERE novedades_coche.id = " + id_novedad , cb);
}

function insert (fecha, numero_coche, detalle, cb) {
	conn("INSERT INTO novedades_coche(fecha, nro_coche_fk, detalle, id_orden_trabajo) VALUES(" +
	"'" + fecha + "', " + numero_coche + ", '" + detalle + "', 0)", cb);
}

function del (id_novedad, cb) {
	conn("DELETE FROM novedades_coche WHERE id = " + id_novedad, cb);
}

function updateOrden (id_novedad, nro_orden, cb) {
	conn("UPDATE novedades_coche SET id_orden_trabajo=" + nro_orden + " WHERE id=" + id_novedad, cb);
}

function updateNoOrden (id_novedad, cb) {
	conn("UPDATE novedades_coche SET id_orden_trabajo=0 WHERE id=" + id_novedad, cb);
}

function getNovedadById (id_novedad, cb) {
	conn("SELECT *, " +
	"DATE_FORMAT(novedades_coche.fecha, '%d/%m/%Y') as novedades_coche_fecha_f " +
	"FROM novedades_coche WHERE id=" + id_novedad, cb);
}

function updateNovedadCoche (id_novedad, fecha, numero_vehiculo, detalle, cb) {
	conn("UPDATE novedades_coche SET fecha='" + fecha + "', " +
	"nro_coche_fk=" + numero_vehiculo + ", " +
	"detalle='" + detalle + "' " +
	"WHERE id=" + id_novedad, cb);
}