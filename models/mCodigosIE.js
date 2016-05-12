var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn("select * from codigosie order by cuenta", cb);
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