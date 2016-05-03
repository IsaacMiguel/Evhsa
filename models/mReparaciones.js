var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getBetweenFecha: getBetweenFecha,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getByCodigo: getByCodigo
}

function getAll(cb){
	conn('select * from reparaciones_emergencia', cb);
}

function getBetweenFecha(desde, hasta, cb){
	conn("SELECT * FROM reparaciones_emergencia WHERE fecha_reparacion >= '"+desde+"' AND fecha_reparacion <= '"+hasta+"'", cb);
}

function getById(id, cb){
	conn("select * from reparaciones_emergencia where id = "+id, cb);
}

function insert(codigo, sector, id_grupo, cb){
	conn("insert into reparaciones_emergencia(codigo, nombre, id_grupo_fk) values('"+codigo+"', '"+nombre+"', "+id_grupo+")", cb);
}

function update(id, codigo, nombre, id_grupo, cb){
	conn("update reparaciones_emergencia set codigo = '"+codigo+"', nombre = '"+nombre+"', id_grupo_fk="+id_grupo+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from reparaciones_emergencia where id = "+id, cb);
}

function getByCodigo(codigo, cb){
	conn("select * from reparaciones_emergencia where codigo='"+codigo+"'", cb);
}
