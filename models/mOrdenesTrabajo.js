const conn = require('../config/db').conn;

module.exports = {
	getMaxByIdVehiculo : getMaxByIdVehiculo,
	getById : getById,
	insert : insert,
	getMax : getMax,
	getByNumero : getByNumero,
	getAllDesdeHasta : getAllDesdeHasta,
	update : update,
	del : del
}

function getMaxByIdVehiculo(nro_coche, fecha_hoy, cb){
	conn("SELECT o.* FROM ordenes_trabajo o JOIN ( " +
	"SELECT MAX( fecha ) AS fecha " +
	"FROM ordenes_trabajo " +
	"WHERE ordenes_trabajo.nro_coche = " + nro_coche + " " +
	"AND ordenes_trabajo.fecha <=  '" + fecha_hoy + "' " +
	") max ON o.fecha = max.fecha" , cb);
}

function getById(id, cb){
	conn("SELECT *, DATE_FORMAT(fecha, '%d/%m/%Y') as fecha_f, "+
	"DATE_FORMAT(fecha_ant, '%d/%m/%Y') as fecha_ant_f FROM ordenes_trabajo WHERE " +
	"id = " + id, cb);
}

function insert(numero, nro_coche, fecha, fecha_ant, nro_ant, km_hastahoy, cb){
	conn("INSERT INTO ordenes_trabajo(numero, nro_coche, fecha, fecha_ant, nro_ant, km_hastahoy ) VALUES(" +
	numero+", "+nro_coche+", '"+fecha+"', '"+fecha_ant+"', "+nro_ant+", "+km_hastahoy+")", cb);
}

function getMax(cb){
	conn("SELECT MAX(numero) as ultimo from ordenes_trabajo", cb);
}

function getByNumero(numero, cb){
	conn("SELECT * FROM ordenes_trabajo WHERE numero = " + numero, cb);
}

function getAllDesdeHasta(desde, hasta, cb){
	conn("SELECT *, ordenes_trabajo.id as id_orden, ordenes_trabajo.numero as numero_orden, DATE_FORMAT(fecha, '%d/%m/%Y') as fecha_f, " +
	"DATE_FORMAT(ordenes_trabajo.fecha_ant, '%d/%m/%Y') as fecha_ant_f " + 
	"FROM ordenes_trabajo " +
	"LEFT JOIN vehiculos ON vehiculos.numero = ordenes_trabajo.nro_coche " +
	"WHERE fecha >= '" + desde + "' " +
	"AND fecha <= '" + hasta + "' ORDER BY fecha DESC, ordenes_trabajo.id asc", cb);
}

function update(id, fecha, cb){
	conn("UPDATE ordenes_trabajo SET " +
	"fecha='" + fecha + "' " +
	"WHERE id=" + id, cb);
}

function del (id, cb){
	conn("DELETE FROM ordenes_trabajo WHERE id=" + id, cb);
}