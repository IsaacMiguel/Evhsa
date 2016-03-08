var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn("select * from codigosie", cb);
}

function getById(id, cb){
	conn("select * from codigosie where id = "+id, cb);
}

function insert(nombre, tipo, cb){
	conn("insert into codigosie(nombre, tipo, activo) values('"+nombre+"', '"+tipo+"', 1)", cb);
}

function update(id, nombre, tipo, activo, cb){
	conn("update codigosie set nombre = '"+nombre+"', tipo = '"+tipo+"', activo="+activo+" where codigosie.id = "+id, cb);
}

function del(id, cb){
	conn("delete from codigosie where id = "+id, cb);
}