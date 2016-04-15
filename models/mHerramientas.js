var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByFecha : getByFecha,
	getByFecha_Nombre : getByFecha_Nombre
}

function getAll (cb) {
	conn("select * from herramientras", cb);
}

function getByFecha (d, cb) {
	conn("SELECT *, ubicaciones_herramientas.descripcion as ubicacion_herramientastxt " +
	"FROM herramientas " +
	"LEFT JOIN ubicaciones_herramientas " +
	"ON herramientas.id_ubicacionherramientas_fk = ubicaciones_herramientas.id " +
	"WHERE fecha_movimiento >= '" + d.date1 + "' " +
	"AND fecha_cambio <= '" + d.date2 + "'", cb);

}

function getByFecha_Nombre (d, cb) {
	conn("SELECT *, ubicaciones_herramientas.descripcion as ubicacion_herramientastxt " +
	"FROM herramientas " +
	"LEFT JOIN ubicaciones_herramientas " +
	"ON herramientas.id_ubicacionherramientas_fk = ubicaciones_herramientas.id " +
	"WHERE fecha_movimiento >= '" + d.date1 + "' " +
	"AND fecha_cambio <= '" + d.date2 + "' " +
	"AND codigo like '%" + d.toolName + "%' ", cb);
}