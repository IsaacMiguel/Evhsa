var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getBetweenFecha: getBetweenFecha,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getByCodigo: getByCodigo
}

function getAll(cb){
	conn('select * from reparaciones_emergencia', cb);
}

function getBetweenFecha(desde, hasta, cb){
	conn("SELECT *, DATE_FORMAT(fecha_reparacion, '%d/%m/%Y') as fecha_reparacion_f "+ 
		"FROM reparaciones_emergencia WHERE fecha_reparacion >= '"+desde+"' AND fecha_reparacion <= '"+hasta+"'", cb);
}

function getById(id, cb){
	conn("SELECT *, DATE_FORMAT(fecha_reparacion, '%d/%m/%Y') as fecha_reparacion_f "+ 
		"FROM reparaciones_emergencia WHERE id = "+id, cb);
}

function insert(codigo, sector, id_grupo, cb){
	conn("insert into reparaciones_emergencia(codigo, nombre, id_grupo_fk) values('"+codigo+"', '"+nombre+"', "+id_grupo+")", cb);
}

function update(id, fecha, modo2, nro_coche, servicio, linea, chofer, hora_aviso, aviso_desde, aviso_medio, aviso_recibio, parado_en, corte_en, desperfecto, coord_turno, responsable1, responsable2, reparacion_hora_inicio, reparacion_detalle, reparacion_hora_fin, vale1, vale2, vale3, probado, pendiente, reemplazo, reemplazo_desde, reemplazo_hasta, reemplazo_coche, reemplazo_chofer, retoma, retoma_hora, horas_perdidas, retoma_chofer, km_perdidos, informe_texto, informe_horafin, cb){
	conn("UPDATE evhsa.reparaciones_emergencia SET fecha_reparacion = '"+fecha+"', nro_coche = "+nro_coche+", chofer = '"+chofer+
		"', unica_encargado_fk = "+coord_turno+", nro_linea = "+linea+", aviso_hora = '"+hora_aviso+"', aviso_desde = '"+aviso_desde+
		"', aviso_medio = '"+aviso_medio+"', aviso_recibio = '"+aviso_recibio+"', parado_en = '"+parado_en+"', desperfecto = '"+desperfecto+
		"', corte_en = '"+corte_en+"', reemplazo = '"+reemplazo+"', reemplazo_hora_desde = '"+reemplazo_desde+"', reemplazo_hora_hasta = '"+
		reemplazo_hasta+"', reemplazo_nro_coche = "+reemplazo_coche+", reemplazo_chofer = '"+reemplazo_chofer+"', horas_perdidas = '"+
		horas_perdidas+"', retoma = '"+retoma+"', retoma_hora = '"+retoma_hora+"', retoma_chofer = '"+retoma_chofer+"', km_perdidos = '"+
		km_perdidos+"', modo2 = '"+modo2+"', responsable1 = '"+responsable1+"', responsable2 = '"+responsable2+"', reparacion_hora_inicio = '"+
		reparacion_hora_inicio+"', reparacion_detalle = '"+reparacion_detalle+"', reparacion_hora_fin = '"+reparacion_hora_fin+"', probado = '"+
		probado+"', texto_pendiente = '"+pendiente+"', informe_horafin = '"+informe_horafin+"', informe_texto = '"+informe_texto+
		"', servicio = '"+servicio+"', nro_vale1_fk = "+vale1+", nro_vale2_fk = "+vale2+", nro_vale3_fk = "+vale3+" WHERE id = "+id, cb);
}

function del(id, cb){
	conn("delete from reparaciones_emergencia where id = "+id, cb);
}

function getByCodigo(codigo, cb){
	conn("select * from reparaciones_emergencia where codigo='"+codigo+"'", cb);
}

function insert(fecha_reparacion, modo2, nro_coche, servicio, linea, chofer, hora_aviso, aviso_desde, aviso_medio, aviso_recibio, parado_en, corte_en, desperfecto, coord_turno, responsable1, responsable2, reparacion_hora_inicio, reparacion_detalle, reparacion_hora_fin, vale1, vale2, vale3, probado, pendiente, reemplazo, reemplazo_desde, reemplazo_hasta, reemplazo_coche, reemplazo_chofer, retoma, retoma_hora, horas_perdidas, retoma_chofer, km_perdidos, informe_texto, informe_horafin, cb){
	conn("INSERT INTO evhsa.reparaciones_emergencia (fecha_reparacion, nro_coche, chofer, unica_encargado_fk, nro_linea, aviso_hora, "+
		"aviso_desde, aviso_medio, aviso_recibio, parado_en, desperfecto, corte_en, reemplazo, reemplazo_hora_desde, reemplazo_hora_hasta, "+
		"reemplazo_nro_coche, reemplazo_chofer, horas_perdidas, retoma, retoma_hora, retoma_chofer, km_perdidos, modo2, responsable1, "+
		"responsable2, reparacion_hora_inicio, reparacion_detalle, reparacion_hora_fin, probado, texto_pendiente, informe_horafin, informe_texto, "+
	 	"servicio, nro_vale1_fk, nro_vale2_fk, nro_vale3_fk) VALUES "+
		"('"+fecha_reparacion+"', "+nro_coche+", '"+chofer+"', "+coord_turno+", "+linea+", '"+hora_aviso+"', '"+aviso_desde+"', '"+
		aviso_medio+"', '"+aviso_recibio+"', '"+parado_en+"', '"+desperfecto+"', '"+corte_en+"', '"+reemplazo+"', '"+reemplazo_desde+"', '"+
		reemplazo_hasta+"', "+reemplazo_coche+", '"+reemplazo_chofer+"', '"+horas_perdidas+"', '"+retoma+"', '"+retoma_hora+"', '"+
		retoma_chofer+"', "+km_perdidos+", '"+modo2+"', '"+responsable1+"', '"+responsable2+"', '"+reparacion_hora_inicio+"', '"+
		reparacion_detalle+"', '"+reparacion_hora_fin+"', '"+probado+"', '"+pendiente+"', '"+informe_horafin+"', '"+informe_texto+
		"', '"+servicio+"', "+vale1+", "+vale2+", "+vale3+");", cb);
}