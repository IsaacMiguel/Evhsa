var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getBuscar_x_CodigoySerie: getBuscar_x_CodigoySerie,
	getBuscar_ConjuntoFicha_x_CodigoySerie: getBuscar_ConjuntoFicha_x_CodigoySerie,
	getBuscar_ConjuntoDefinicion_xCodigo: getBuscar_ConjuntoDefinicion_xCodigo
}

function getAll(cb){
	conn('select * from conjunto_definicion', cb);
}

function getById(id, cb){
	conn("select * from conjunto_definicion where id = "+id, cb);
}

function insert(codigo, serie, fecha_compra, proveedor, valor, ubicacion, experimental, chasis, cb){
	conn("insert into conjunto_definicion(codigo, serie, fecha_compra, proveedor, valor, identificacion, experimental, chasis) "+
		"values('"+codigo+"', '"+serie+"', '"+fecha_compra+"', '"+proveedor+"', "+valor+", '"+ubicacion+"', '"+experimental+"', '"+chasis+"')", cb);
}

function update(id, codigo, nombre, id_grupo, cb){
	conn("update conjunto_definicion set codigo = '"+codigo+"', nombre = '"+nombre+"', id_grupo_fk="+id_grupo+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from conjunto_definicion where id = "+id, cb);
}

function getBuscar_x_CodigoySerie(codigo, serie, cb){
	conn("select conjunto_definicion.*, repuestos.nombre as denominacion, "+
		"DATE_FORMAT(conjunto_definicion.fecha_compra, '%d/%m/%Y') as fecha_compra_f "+
		"FROM conjunto_definicion "+
		"left join repuestos on repuestos.codigo = conjunto_definicion.codigo "+
		"where conjunto_definicion.codigo = '"+codigo+"' AND conjunto_definicion.serie = '"+serie+"'", cb);
}

function getBuscar_ConjuntoFicha_x_CodigoySerie(codigo, serie, cb){
	conn("select conjunto_ficha.*, ubicaciones.descripcion as ubicacion_actual, "+
		"DATE_FORMAT(conjunto_ficha.fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, "+
		"ubicaciones_neumaticos.descripcion as ubicacionneumaticotxt, "+
		"tipo_cubierta.descripcion as tipocubiertatxt "+
		"FROM conjunto_ficha "+
		"LEFT JOIN ubicaciones on ubicaciones.codigo = conjunto_ficha.codigo_ubicacion_actual_fk "+
		"LEFT JOIN ubicaciones_neumaticos ON ubicaciones_neumaticos.codigo = conjunto_ficha.codigo_ubicacion_neumatico_fk "+
		"LEFT JOIN tipo_cubierta ON tipo_cubierta.codigo = conjunto_ficha.codigo_tipo_cubierta_fk "+
		"where conjunto_ficha.codigo = '"+codigo+"' AND conjunto_ficha.serie = '"+serie+"'", cb);
}

function getBuscar_ConjuntoDefinicion_xCodigo(codigo, cb){
	conn("select conjunto_definicion.*, repuestos.nombre as denominacion, "+
		"DATE_FORMAT(conjunto_definicion.fecha_compra, '%d/%m/%Y') as fecha_compra_f "+
		"from conjunto_definicion "+
		"left join repuestos on repuestos.codigo = conjunto_definicion.codigo "+
		"where conjunto_definicion.codigo = '"+codigo+"'", cb);
}