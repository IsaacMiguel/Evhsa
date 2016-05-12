var conn = require('../config/db').conn;

module.exports = {
	insertSerenos : insertSerenos,
	getAllHerramientas : getAllHerramientas,
	getHerramientasByColocados : getHerramientasByColocados,
	getHerramientasByNoColocados : getHerramientasByNoColocados,
	updateSerenosByColocado : updateSerenosByColocado,
	del : del
}

function insertSerenos (fecha_movimiento, unica_operador_fk, id_repuesto_fk, cantidad, cb) {
 conn("INSERT into serenos(fecha_movimiento, unica_operador_fk, id_repuesto_fk, cantidad) " +
 "VALUES('" + fecha_movimiento + "', " + unica_operador_fk + ", " + id_repuesto_fk + ", " + cantidad + ")", cb);
}

function getAllHerramientas (fecha_desde, fecha_hasta, cb) {
	conn("SELECT *, DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_colocado, '%d/%m/%Y') as fecha_colocado_f, " +
	"repuestos.valor AS valor_unitario, " +
	"serenos.id as id_serenos " +
	"FROM `serenos` " +
	"LEFT JOIN repuestos ON serenos.id_repuesto_fk = repuestos.id " +
	"LEFT JOIN vehiculos ON serenos.numero_coche = vehiculos.id " +
	"WHERE fecha_movimiento >= '" + fecha_desde + "' " +
	"AND fecha_movimiento <= '" + fecha_hasta + "'", cb);
}

function getHerramientasByColocados (fecha_desde, fecha_hasta, cb) {
	conn("SELECT *, DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_colocado, '%d/%m/%Y') as fecha_colocado_f, " +
	"repuestos.valor AS valor_unitario, " +
	"serenos.id as id_serenos " +
	"FROM `serenos` " +
	"LEFT JOIN repuestos ON serenos.id_repuesto_fk = repuestos.id " +
	"LEFT JOIN vehiculos ON serenos.numero_coche = vehiculos.id " +
	"WHERE fecha_movimiento >= '" + fecha_desde + "' " +
	"AND fecha_movimiento <= '" + fecha_hasta + "' " +
	"AND fecha_colocado != '0000-00-00'", cb);
}

function getHerramientasByNoColocados (fecha_desde, fecha_hasta, cb) {
	conn("SELECT *, DATE_FORMAT(fecha_movimiento, '%d/%m/%Y') as fecha_movimiento_f, " +
	"DATE_FORMAT(fecha_colocado, '%d/%m/%Y') as fecha_colocado_f, " +
	"repuestos.valor AS valor_unitario, " +
	"serenos.id as id_serenos " +
	"FROM `serenos` " +
	"LEFT JOIN repuestos ON serenos.id_repuesto_fk = repuestos.id " +
	"LEFT JOIN vehiculos ON serenos.numero_coche = vehiculos.id " +
	"WHERE fecha_movimiento >= '" + fecha_desde + "' " +
	"AND fecha_movimiento <= '" + fecha_hasta + "' " +
	"AND fecha_colocado = '0000-00-00'", cb);
}

function updateSerenosByColocado (id_sereno, id_coche, fecha_colocado, cb) {
	conn("UPDATE serenos SET " +
	"fecha_colocado='" + fecha_colocado + "', " +
	"numero_coche=" + id_coche + " " +
	"WHERE id= " + id_sereno, cb);
}

function del (id_sereno, cb) {
	conn("DELETE FROM serenos WHERE id=" + id_sereno, cb);
}