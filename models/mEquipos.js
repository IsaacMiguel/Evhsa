var conn = require('../config/db').conn;

module.exports = {
	getAll : getAll,
	insert : insert,
	getById : getById,
	update : update,
	del : del,
	getQueryEqual : getQueryEqual,
	getQueryDate : getQueryDate
}

function getAll (cb) {
	conn("select *, "+
		"DATE_FORMAT(fecha_colocacion, '%d/%m/%Y') as fecha_colocacion_f, "+
		"DATE_FORMAT(fecha_sacado, '%d/%m/%Y') as fecha_sacado_f from equipos ORDER BY fecha_colocacion DESC ",cb);
}

function insert (d, cb) {
	conn(
		"insert into equipos" +
		"(numero,denominacion,numero_coche_fk,fecha_colocacion,total,unica_operador_fk,responsable," +
		"observaciones,tipo,fecha_sacado,km,resultado) " + 
		"values("+d.numero+",'"+d.denominacion+"',"+d.numero_coche_fk+",'"+
		d.fecha_colocacion+"',"+d.total+","+d.unica_operador_fk+",'"+d.responsable+"','"+
		d.observaciones+"','"+d.tipo+"','"+d.fecha_sacado+"',"+d.km+",'"+d.resultado+"')", cb);
}

function getById (id, cb) {
	conn("select *, " +
	"DATE_FORMAT(fecha_colocacion, '%d/%m/%Y') as fecha_colocacion_f, " +
	"DATE_FORMAT(fecha_sacado, '%d/%m/%Y') as fecha_sacado_f from equipos where id=" + id, cb);
}

function update (d, cb) {
	conn("update equipos set" +
		" numero=" + d.numero +
		", denominacion='" + d.denominacion + "'" +
		", numero_coche_fk=" + d.numero_coche_fk +
		", fecha_colocacion='" + d.fecha_colocacion + "'" +
		", total=" + d.total +
		", unica_operador_fk=" + d.unica_operador_fk +
		", responsable='" + d.responsable + "'" +
		", observaciones='" + d.observaciones + "'" +
		", tipo='" + d.tipo + "'" +
		", fecha_sacado='" + d.fecha_sacado + "'" +
		", km=" + d.km +
		", resultado='" + d.resultado + "'" +
	" where id=" + d.id, cb);
}

function del (id, cb) {
	conn("delete from equipos where id=" + id, cb);
}

function getQueryEqual (campo, buscar, cb){
	conn("select *, " +
	"DATE_FORMAT(fecha_colocacion, '%d/%m/%Y') as fecha_colocacion_f, " +
	"DATE_FORMAT(fecha_sacado, '%d/%m/%Y') as fecha_sacado_f " +
	"from equipos where " + campo + "='" + buscar + "' ORDER BY fecha_colocacion DESC ", cb);
}

function getQueryDate (campo, buscar, cb) {
	conn("select *, " +
	"DATE_FORMAT(fecha_colocacion, '%d/%m/%Y') as fecha_colocacion_f, " +
	"DATE_FORMAT(fecha_sacado, '%d/%m/%Y') as fecha_sacado_f " +
	"from equipos where " + campo + ">='" + buscar + "' ORDER BY fecha_colocacion DESC ", cb);
}