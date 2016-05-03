var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByFecha: getByFecha,
	getByNroVale: getByNroVale,
	insertVale: insertVale,
	updateVale: updateVale,
	del: del,
	getById: getById,
	getLastNroVale: getLastNroVale,
	getVales2_ByNroVale: getVales2_ByNroVale,
	getVales2_ById: getVales2_ById,
	insertRepuesto: insertRepuesto,
	updateRepuesto: updateRepuesto,
	delRepuesto: delRepuesto
}

function getAll(cb){
	conn("select *, DATE_FORMAT(vales1.fecha, '%d/%m/%Y') as fechaf from vales1", cb);
}

function getByFecha(desde, hasta, cb){
	conn("select *, DATE_FORMAT(vales1.fecha, '%d/%m/%Y') as fechaf from vales1 where fecha >= '"+desde+"' AND fecha <= '"+hasta+"'", cb);
}

function getByNroVale(nro_vale, cb){
	conn("select vales1.*, DATE_FORMAT(vales1.fecha, '%d/%m/%Y') as fechaf, destinos_vales.descripcion as destinotxt "+
		"FROM vales1 "+
		"LEFT JOIN destinos_vales ON destinos_vales.id = vales1.id_valedestino_fk "+
		"where vales1.nro_vale="+nro_vale, cb);
}

function insertVale(nro_vale, fecha, destino, nro_coche, carro, codigo, serie, nro_equipo, operario, responsable, cb){
	conn("insert into vales1(nro_vale, fecha, nro_coche, conjunto_codigo, conjunto_serie, unica_operario_fk, nro_equipo, carro, "+
		"responsable, id_valedestino_fk) VALUES("+nro_vale+", '"+fecha+"', "+nro_coche+", '"+codigo+"', '"+serie+"', "+operario+
		", "+nro_equipo+", '"+carro+"', '"+responsable+"', "+destino+")", cb);
}

function updateVale(id, responsable, nro_coche, carro, cb){
	conn("update vales1 set responsable = '"+responsable+"', nro_coche = "+nro_coche+", carro='"+carro+"' where id = "+id, cb);
}

function del(id, cb){
	conn("delete from vales1 where id = "+id, cb);
}

function getById(id, cb){
	conn("select vales1.*, DATE_FORMAT(vales1.fecha, '%d/%m/%Y') as fechaf, destinos_vales.descripcion as destinotxt "+
		"FROM vales1 "+
		"LEFT JOIN destinos_vales ON destinos_vales.id = vales1.id_valedestino_fk "+
		"where vales1.id="+id, cb);
}

function getLastNroVale(cb){
	conn("SELECT * FROM vales1 ORDER BY nro_vale DESC LIMIT 1", cb);
}

function getVales2_ByNroVale(nro_vale, cb){
	conn("select vales2.*, repuestos.nombre as denominacion "+
		"from vales2 "+
		"left join repuestos on repuestos.codigo = vales2.codigo_repuesto "+
		"where vales2.nro_vale = "+nro_vale, cb);
}

function getVales2_ById(id_vale2, cb){
	conn("select vales2.*, repuestos.nombre as denominacion "+
		"from vales2 "+
		"left join repuestos on repuestos.codigo = vales2.codigo_repuesto "+
		"where vales2.id = "+id_vale2, cb);
}

function insertRepuesto(nro_vale, codigo_repuesto, precio, cantidad, cb){
	conn("INSERT INTO vales2 (nro_vale, codigo_repuesto, cantidad, precio) VALUES ("+nro_vale+", '"+codigo_repuesto+"', "+cantidad+", "+precio+")", cb);
}

function updateRepuesto(id_vale2, precio, cantidad, cb){
	conn("UPDATE vales2 SET cantidad = "+cantidad+", precio = "+precio+" WHERE id = "+id_vale2, cb);
}

function delRepuesto(id_vale2, cb){
	conn("DELETE FROM vales2 WHERE vales2.id = "+id_vale2, cb);
}