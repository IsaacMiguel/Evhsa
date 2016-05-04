var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByFecha : getByFecha,
	getByFecha_Nombre : getByFecha_Nombre,
	getByCodigo : getByCodigo,
	insert : insert,
	getById : getById,
	update : update,
	del : del,
	updateUbicacion : updateUbicacion,
	updateFechaCambio : updateFechaCambio,
	getAllOperarios : getAllOperarios,
	getOperarioByUnica : getOperarioByUnica
}

function getAll (cb) {
	conn("select * from herramientras", cb);
}

function getByFecha (d, cb) {
	conn("SELECT *, ubicaciones_herramientas.descripcion as ubicacion_herramientastxt, " +
	"herramientas.id as id_herramientas, " +
	"herramientas.valor as valor_herramientas, " +
	"herramientas.marca as marca_herramientas, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') as fecha_cambio_f " +
	"FROM herramientas " +
	"LEFT JOIN repuestos ON repuestos.codigo = herramientas.codigo " +
	"LEFT JOIN ubicaciones_herramientas " +
	"ON herramientas.id_ubicacionherramientas_fk = ubicaciones_herramientas.id " +
	"WHERE fecha_movimiento >= '" + d.desde + "' " +
	"AND fecha_movimiento <= '" + d.hasta + "' ORDER BY fecha_movimiento DESC", cb);

}

function getByFecha_Nombre (d, cb) {
	conn("SELECT *, ubicaciones_herramientas.descripcion as ubicacion_herramientastxt, " +
	"herramientas.id as id_herramientas, " +
	"herramientas.valor as valor_herramientas, " +
	"herramientas.marca as marca_herramientas, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') as fecha_cambio_f " +
	"FROM herramientas " +
	"LEFT JOIN repuestos ON repuestos.codigo = herramientas.codigo " +
	"LEFT JOIN ubicaciones_herramientas " +
	"ON herramientas.id_ubicacionherramientas_fk = ubicaciones_herramientas.id " +
	"WHERE fecha_movimiento >= '" + d.desde + "' " +
	"AND fecha_movimiento <= '" + d.hasta + "' " +
	"AND repuestos.nombre like '%" + d.denominacion + "%' ORDER BY fecha_movimiento DESC", cb);
}

function getByCodigo (codigo, cb) {
	conn("select *, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"from herramientas where codigo = '" + codigo + "'", cb);
}

function insert (d, cb) {	
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
	"herramientas.marca as marca_herramientas, " +
	"herramientas.valor as valor_herramientas, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') as fecha_cambio_f " +
	"from herramientas " +
	"LEFT JOIN repuestos ON repuestos.codigo = herramientas.codigo " +
	"where herramientas.id = " + id_herramienta, cb);
}

function update (d, cb) {
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

function del (id_herramienta, cb) {
	conn("delete from herramientas where id=" + id_herramienta, cb);
}

function updateUbicacion (id_herramienta, id_ubicacion, cb) {
	conn("UPDATE herramientas SET id_ubicacionherramientas_fk=" + id_ubicacion + 
	" WHERE herramientas.id = " + id_herramienta, cb);
}

function updateFechaCambio (id_herramienta, opcion, cb) {
	conn("UPDATE herramientas SET fecha_cambio='" + opcion + "' " +
	" WHERE herramientas.id = " + id_herramienta, cb);
}

function getAllOperarios (desde, hasta, cb) {
	conn("SELECT * , SUM( herramientas.cantidad ) AS cantHerramientas, " +
	"SUM( herramientas.valor ) AS valorHerramientas, " +
	"DATE_FORMAT( herramientas.fecha_movimiento, '%d/%m/%Y') AS fecha_movimiento_f " +
	"FROM herramientas " +
	"LEFT JOIN secr ON secr.unica = herramientas.unica_usuariodestino_fk " +
	"WHERE herramientas.fecha_movimiento >= '" + desde + "'" +
	"AND herramientas.fecha_cambio <= '" + hasta + "'" +
	"GROUP BY secr.unica", cb);
}

function getOperarioByUnica (desde, hasta, unicaOperario, cb) {
	conn("SELECT *, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') AS fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') AS fecha_cambio_f, " +
	"SUM( herramientas.valor ) AS valorHerramientas, " +
	"SUM( herramientas.cantidad ) AS cantHerramientas " +
	"FROM herramientas " +
	"INNER JOIN secr ON herramientas.unica_usuariodestino_fk = secr.unica " +
	"WHERE unica_usuariodestino_fk = " + unicaOperario + " " +
	"AND fecha_movimiento >=  '" + desde + "' " +
	"AND fecha_cambio <=  '" + hasta + "' " +
	"GROUP BY fecha_movimiento DESC", cb);
}