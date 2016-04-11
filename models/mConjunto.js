var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insertDefinicion: insertDefinicion,
	updateDefinicion: updateDefinicion,
	del: del,
	getBuscar_x_CodigoySerie: getBuscar_x_CodigoySerie,
	getBuscar_ConjuntoFicha_x_CodigoySerie: getBuscar_ConjuntoFicha_x_CodigoySerie,
	getBuscar_ConjuntoDefinicion_xCodigo: getBuscar_ConjuntoDefinicion_xCodigo,
	insertMovimiento: insertMovimiento,
	getAllActivas: getAllActivas,
	getAllBajas: getAllBajas,
	getAll_xCodigo: getAll_xCodigo,
	getAllActivas_xCodigo: getAllActivas_xCodigo,
	getAllBajas_xCodigo: getAllBajas_xCodigo

}

function getAll(cb){
	conn("select conjunto_definicion.*, repuestos.nombre as denominacion, "+
		"DATE_FORMAT(conjunto_definicion.fecha_compra, '%d/%m/%Y') as fecha_compra_f "+
		"FROM conjunto_definicion "+
		"left join repuestos on repuestos.codigo = conjunto_definicion.codigo ", cb);
}

function getById(id, cb){
	conn("select conjunto_definicion.*, repuestos.nombre as denominacion, "+
		"DATE_FORMAT(conjunto_definicion.fecha_compra, '%d/%m/%Y') as fecha_compra_f "+
		"FROM conjunto_definicion "+
		"left join repuestos on repuestos.codigo = conjunto_definicion.codigo where conjunto_definicion.id = "+id, cb);
}

function insertDefinicion(codigo, serie, fecha_compra, proveedor, valor, ubicacion, experimental, chasis, es_neumatico, cb){
	conn("insert into conjunto_definicion(codigo, serie, fecha_compra, proveedor, valor, identificacion, experimental, chasis, es_neumatico) "+
		"values('"+codigo+"', '"+serie+"', '"+fecha_compra+"', '"+proveedor+"', "+valor+", '"+ubicacion+"', '"+experimental+"', '"
			+chasis+"', "+es_neumatico+")", cb);
}

function updateDefinicion(id, fecha_compra, proveedor, valor, ubicacion, experimental, chasis, es_neumatico, cb){
	conn("UPDATE `evhsa`.`conjunto_definicion` SET	fecha_compra = "+fecha_compra+", proveedor = , "+proveedor+", valor = "+valor+", "+
		"identificacion = "+ubicacion+", experimental = "+experimental+", es_neumatico = "+es_neumatico+", chasis = "+chasis+
		" WHERE id = "+id, cb);
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

function insertMovimiento(codigo, serie, fecha_movimiento, coche_sacado, coche_colocado, ubicacion_actual, destino, detalle, costo, imputado, ubicacion_neumatico, responsable_reparacion, responsable_rotura, tipo_cubiertas, mm, suma_estadistica, cb){
	conn("INSERT INTO conjunto_ficha(codigo, serie, fecha_movimiento, numero_coche_sacado_fk, destino, numero_coche_colocado_fk, "+
		"codigo_ubicacion_actual_fk, valor, memo, codigo_ubicacion_neumatico_fk, imputa, responsable_reparacion, responsable_rotura, "+
		"codigo_tipo_cubierta_fk, est, mm, km) VALUES ('"+codigo+"', '"+serie+"', '"+fecha_movimiento+"', "+coche_sacado+", '"+destino+"', "+
		coche_colocado+", '"+ubicacion_actual+"', "+costo+", '"+detalle+"', '"+ubicacion_neumatico+"', "+imputado+", '"+
		responsable_reparacion+"', '"+responsable_rotura+"', '"+tipo_cubiertas+"', '"+suma_estadistica+"', "+mm+", 0); ", cb);
}

function getAllActivas(cb){
	conn("select conjunto_definicion.*, repuestos.nombre as denominacion, "+
		"DATE_FORMAT(conjunto_definicion.fecha_compra, '%d/%m/%Y') as fecha_compra_f "+
		"FROM conjunto_definicion "+
		"left join repuestos on repuestos.codigo = conjunto_definicion.codigo "+
		"WHERE fecha_baja = ''", cb);
}

function getAllBajas(cb){
	conn("select conjunto_definicion.*, repuestos.nombre as denominacion, "+
		"DATE_FORMAT(conjunto_definicion.fecha_compra, '%d/%m/%Y') as fecha_compra_f "+
		"FROM conjunto_definicion "+
		"left join repuestos on repuestos.codigo = conjunto_definicion.codigo "+
		"WHERE fecha_baja != ''", cb);
}

function getAll_xCodigo(codigo, cb){
	conn("select conjunto_definicion.*, repuestos.nombre as denominacion, "+
		"DATE_FORMAT(conjunto_definicion.fecha_compra, '%d/%m/%Y') as fecha_compra_f "+
		"FROM conjunto_definicion "+
		"left join repuestos on repuestos.codigo = conjunto_definicion.codigo "+
		"WHERE conjunto_definicion.codigo like '%"+codigo+"%'", cb);
}

function getAllActivas_xCodigo(codigo, cb){
	conn("select conjunto_definicion.*, repuestos.nombre as denominacion, "+
		"DATE_FORMAT(conjunto_definicion.fecha_compra, '%d/%m/%Y') as fecha_compra_f "+
		"FROM conjunto_definicion "+
		"left join repuestos on repuestos.codigo = conjunto_definicion.codigo "+
		"WHERE fecha_baja = '' AND conjunto_definicion.codigo like '%"+codigo+"%'", cb);
}

function getAllBajas_xCodigo(codigo, cb){
	conn("select conjunto_definicion.*, repuestos.nombre as denominacion, "+
		"DATE_FORMAT(conjunto_definicion.fecha_compra, '%d/%m/%Y') as fecha_compra_f "+
		"FROM conjunto_definicion "+
		"left join repuestos on repuestos.codigo = conjunto_definicion.codigo "+
		"WHERE fecha_baja != '' AND conjunto_definicion.codigo like '%"+codigo+"%'", cb);
}