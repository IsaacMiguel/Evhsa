var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getIngresos: getIngresos,
	getEgresos: getEgresos
}

function getAll(cb){
	conn("select * from codigosie order by tipo desc, nombre", cb);
}

function getById(id, cb){
	conn("select * from codigosie where id = "+id, cb);
}

function insert(nombre, tipo, cuenta, cb){
	conn("insert into codigosie(nombre, tipo, activo, cuenta) values('"+nombre+"', '"+tipo+"', 1, '"+cuenta+"')", cb);
}

function update(id, nombre, tipo, activo, cuenta, cb){
	conn("update codigosie set nombre = '"+nombre+"', tipo = '"+tipo+"', activo="+activo+", cuenta='"+cuenta+"' where codigosie.id = "+id, cb);
}

function del(id, cb){
	conn("delete from codigosie where id = "+id, cb);
}

function getIngresos(cb){
	conn("SELECT * FROM codigosie WHERE tipo = 'I' ORDER BY nombre", cb);
}

function getEgresos(cb){
	conn("SELECT * FROM codigosie WHERE tipo = 'E' ORDER BY nombre", cb);
}