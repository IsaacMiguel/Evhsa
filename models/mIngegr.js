var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getByCodigo: getByCodigo,
	getById_codigoie: getById_codigoie,
	getDesdeHasta: getDesdeHasta,
	getSumTotalEntreFechasByTipo: getSumTotalEntreFechasByTipo,
	getDatosEntreFechasByTipo: getDatosEntreFechasByTipo,
	getSumTotalEntreFechasByCodigo: getSumTotalEntreFechasByCodigo,
	getDatosEntreFechasByCodigo: getDatosEntreFechasByCodigo
}

function getAll(cb){
	conn("select ingegr.*, ingegr_grupos.codigo as codigogrupo, ingegr_grupos.nombre as grupotxt from ingegr "+
		"left join ingegr_grupos on ingegr_grupos.id = ingegr.id_grupo_fk order by codigo", cb);
}

function getById(id, cb){
	conn("select ingegr.*, DATE_FORMAT(ingegr.fecha, '%d/%m/%Y') as fechaf, "+
		"codigosie.nombre as codigotxt, "+
		"codigosie.cuenta as cuenta, "+
		"case ingegr.tipo when 'I' then 'Ingreso' when 'E' then 'Egreso' end as tipotxt, "+
		"secr.usuario as operadortxt "+
		"FROM ingegr "+
		"LEFT JOIN codigosie ON codigosie.id = ingegr.id_codigoie_fk "+
		"LEFT JOIN secr ON secr.unica = ingegr.id_operador_fk "+
		"WHERE ingegr.id = "+id, cb);
}

function insert(fecha, codigo, tipo, operador, importe, cb){
	conn("insert into ingegr(fecha, id_codigoie_fk, tipo, id_operador_fk, importe) values('"+fecha+"', "+codigo+", '"+tipo+
		"', "+operador+", "+importe+")", cb);
}

function update(id, fecha, codigo, tipo, importe, cb){
	conn("update ingegr set fecha = '"+fecha+"', id_codigoie_fk = "+codigo+", tipo='"+tipo+"', importe = "+importe+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from ingegr where id = "+id, cb);
}

function getByCodigo(codigo, cb){
	conn("select * from ingegr where codigo='"+codigo+"'", cb);
}

function getById_codigoie(id_codigoie, cb){
	conn("select * from ingegr where id_codigoie_fk = "+id_codigoie, cb);
}

function getDesdeHasta(desde, hasta, cb){
	conn("select ingegr.*, DATE_FORMAT(ingegr.fecha, '%d/%m/%Y') as fechaf, "+
		"FORMAT (ingegr.importe, 2) as importe_f, "+
		"codigosie.nombre as codigotxt, "+
		"codigosie.cuenta as cuenta, "+
		"case ingegr.tipo when 'I' then 'Ingreso' when 'E' then 'Egreso' end as tipotxt, "+
		"case ingegr.tipo when 'I' then '1' when 'E' then '' end as tipovalue, "+
		"secr.usuario as operadortxt "+
		"FROM ingegr "+
		"LEFT JOIN codigosie ON codigosie.id = ingegr.id_codigoie_fk "+
		"LEFT JOIN secr ON secr.unica = ingegr.id_operador_fk "+
		"WHERE fecha >= '"+desde+"' AND fecha <= '"+hasta+"' ORDER BY fecha DESC", cb);
}

function getSumTotalEntreFechasByTipo(desde, hasta, tipo, cb){
	conn("SELECT *, sum(importe) as total from ingegr WHERE fecha >= '"+desde+"' AND fecha <= '"+hasta+"' AND tipo = '"+tipo+"' ", cb)
}

function getDatosEntreFechasByTipo(desde, hasta, tipo, cb){
	conn("SELECT fecha, sum(importe) as totalxdia from ingegr WHERE fecha >= '"+desde+"' AND fecha <= '"+hasta+"' AND tipo = '"+tipo+"' GROUP BY fecha", cb)
}

function getSumTotalEntreFechasByCodigo(desde, hasta, codigo, cb){
	conn("SELECT fecha, sum(importe) as totalxdia from ingegr WHERE fecha >= '"+desde+"' AND fecha <= '"+hasta+"' AND id_codigoie_fk = "+codigo+"", cb)
}

function getDatosEntreFechasByCodigo(desde, hasta, codigo, cb){
	conn("SELECT * from ingegr WHERE fecha >= '"+desde+"' AND fecha <= '"+hasta+"' AND id_codigoie_fk = "+codigo+" GROUP BY fecha", cb)
}