var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByFecha : getByFecha,
	getByFecha_Nombre : getByFecha_Nombre,
	getByCodigo : getByCodigo,
	insertHerramienta : insertHerramienta,
	getById : getById,
	updateHerramienta : updateHerramienta,
	deleteHerramienta : deleteHerramienta,
	updateHeramientasUbicacion : updateHeramientasUbicacion,
	updateHerramientasFechaCambio : updateHerramientasFechaCambio
}

function getAll (cb) {
	conn("select * from herramientras", cb);
}

function getByFecha (d, cb) {
	conn("SELECT *, ubicaciones_herramientas.descripcion as ubicacion_herramientastxt, " +
	"herramientas.id as id_herramientas, " +
	"herramientas.marca as marca_herramientas, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') as fecha_cambio_f " +
	"FROM herramientas " +
	"LEFT JOIN repuestos ON repuestos.codigo = herramientas.codigo " +
	"LEFT JOIN ubicaciones_herramientas " +
	"ON herramientas.id_ubicacionherramientas_fk = ubicaciones_herramientas.id " +
	"WHERE fecha_movimiento >= '" + d.date1 + "' " +
	"AND fecha_cambio <= '" + d.date2 + "'", cb);

}

function getByFecha_Nombre (d, cb) {
	conn("SELECT *, ubicaciones_herramientas.descripcion as ubicacion_herramientastxt, " +
	"herramientas.id as id_herramientas, " +
	"herramientas.marca as marca_herramientas, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') as fecha_cambio_f " +
	"FROM herramientas " +
	"LEFT JOIN repuestos ON repuestos.codigo = herramientas.codigo " +
	"LEFT JOIN ubicaciones_herramientas " +
	"ON herramientas.id_ubicacionherramientas_fk = ubicaciones_herramientas.id " +
	"WHERE fecha_movimiento >= '" + d.date1 + "' " +
	"AND fecha_cambio <= '" + d.date2 + "' " +
	"AND descripcion like '%" + d.denominacion + "%' ", cb);
}

function getByCodigo (codigo, cb) {
	conn("select *, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"from herramientas where codigo = '" + codigo + "'", cb);
}

function insertHerramienta (d, cb) {	
	conn("insert into herramientas(codigo, unica_usuariodestino_fk, id_ubicacionherramientas_fk, " +
	"fecha_movimiento, nro_recibo, unica_operador_fk, marca, lugar_compra, valor, cantidad, fecha_cambio) " +
	"values(" +
		"'" + d.codigo + "', " +
		d.unica_usuariodestino_fk + ", " +
		d.id_ubicacionherramientas_fk + ", " +
		"'" + d.fecha_movimiento + "', " +
		d.nro_recibo + ", " +
		d.unica_operador_fk + ", " +
		"'" + d.marca + "', " +
		"'" + d.lugar_compra + "', " +
		d.valor + ", " +
		d.cantidad + ", " +
		"'" + d.fecha_cambio + "')", cb);
}

function getById (id_herramienta, cb) {
	conn("select *, herramientas.id as id_herramienta, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') as fecha_cambio_f " +
	"from herramientas " +
	"LEFT JOIN repuestos ON repuestos.codigo = herramientas.codigo " +
	"where herramientas.id = " + id_herramienta, cb);
}

function updateHerramienta (d, cb) {
	conn("update herramientas " +
	"SET unica_usuariodestino_fk=" + d.unica_usuariodestino_fk + ", " +
	"id_ubicacionherramientas_fk=" + d.id_ubicacionherramientas_fk + ", " +
	"fecha_movimiento='" + d.fecha_movimiento + "', " +
	"nro_recibo=" + d.nro_recibo + ", " +
	"unica_operador_fk=" + d.unica_operador_fk + ", " +
	"marca='" + d.marca + "', " +
	"lugar_compra='" +d.lugar_compra + "', " +
	"valor=" + d.valor + ", " +
	"cantidad=" + d.cantidad + ", " +
	"fecha_cambio='" + d.fecha_cambio + "' " +
	"WHERE id=" + d.id_herramienta, cb);
}

function deleteHerramienta (id_herramienta, cb) {
	conn("delete from herramientas where id=" + id_herramienta, cb);
}

function updateHeramientasUbicacion (id_herramienta, id_ubicacion, cb) {
	conn("UPDATE herramientas SET id_ubicacionherramientas_fk=" + id_ubicacion + 
	" WHERE herramientas.id = " + id_herramienta, cb);
}

function updateHerramientasFechaCambio (id_herramienta, opcion, cb) {
	conn("UPDATE herramientas SET fecha_cambio='" + opcion + "' " +
	" WHERE herramientas.id = " + id_herramienta, cb);
}