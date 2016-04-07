var conn = require('../config/db').conn;

module.exports = {
	getAll : getAll,
	insert : insert
}

function getAll(cb) {
	conn("select id, numero, denominacion, numero_coche_fk, DATE_FORMAT(fecha_colocacion, '%d/%m/%Y') as f_colocacion, total, responsable, tipo, DATE_FORMAT(fecha_sacado, '%d/%m/%Y') as f_sacado, km, resultado from equipos",cb);
}

function insert(d, cb) {
	conn(
		"insert into equipos" +
		"(numero,denominacion,numero_coche_fk,fecha_colocacion,total,unica_operador_fk,responsable," +
		"observaciones,tipo,fecha_sacado,km,resultado) " + 
		"values("+d.numero+",'"+d.denominacion+"',"+d.numero_coche_fk+",'"+
		d.fecha_colocacion+"',"+d.total+","+d.unica_operador_fk+",'"+d.responsable+"','"+
		d.observaciones+"','"+d.tipo+"','"+d.fecha_sacado+"',"+d.km+",'"+d.resultado+"')", cb);
}