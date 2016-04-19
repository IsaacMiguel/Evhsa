var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByFecha : getByFecha,
	getByFecha_Nombre : getByFecha_Nombre,
	getByCodigo : getByCodigo,
	insertHerramienta : insertHerramienta,
	getById : getById
}

function getAll (cb) {
	conn("select * from herramientras", cb);
}

function getByFecha (d, cb) {
	conn("SELECT *, ubicaciones_herramientas.descripcion as ubicacion_herramientastxt, " +
	"herramientas.id as id_herramientas, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') as fecha_cambio_f " +
	"FROM herramientas " +
	"LEFT JOIN ubicaciones_herramientas " +
	"ON herramientas.id_ubicacionherramientas_fk = ubicaciones_herramientas.id " +
	"WHERE fecha_movimiento >= '" + d.date1 + "' " +
	"AND fecha_cambio <= '" + d.date2 + "'", cb);

}

function getByFecha_Nombre (d, cb) {
	conn("SELECT *, ubicaciones_herramientas.descripcion as ubicacion_herramientastxt, " +
	"herramientas.id as id_herramientas, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') as fecha_cambio_f " +
	"FROM herramientas " +
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
	conn("select *, " +
	"DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_cambio, '%d/%m/%Y') as fecha_cambio_f " +
	"from herramientas where id = " + id_herramienta, cb);
}