var conn = require('../config/db').conn;

module.exports = {
	getIngresos: getIngresos,
	getEgresos: getEgresos,
	getTotalIngresos: getTotalIngresos,
	getTotalEgresos: getTotalEgresos,
	getSaldosDiarios: getSaldosDiarios,
	getSaldosDiariosSinFormat: getSaldosDiariosSinFormat,
	getSP_getIngresos: getSP_getIngresos,
	getSP_getTotalIngresos: getSP_getTotalIngresos,
	getSP_getEgresos: getSP_getEgresos,
	getSP_getTotalEgresos: getSP_getTotalEgresos,
	getSP_getSaldosDiarios: getSP_getSaldosDiarios,
	getSP_getSaldosDiariosSinFormat: getSP_getSaldosDiariosSinFormat
}

function getIngresos(anio, mes, cb){
	conn("select codigosie.nombre as codigotxt, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-01' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma01, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-02' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma02, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-03' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma03, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-04' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma04, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-05' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma05, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-06' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma06, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-07' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma07, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-08' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma08, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-09' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma09, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-10' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma10, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-11' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma11, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-12' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma12, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-13' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma13, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-14' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma14, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-15' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma15, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-16' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma16, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-17' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma17, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-18' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma18, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-19' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma19, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-20' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma20, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-21' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma21, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-22' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma22, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-23' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma23, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-24' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma24, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-25' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma25, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-26' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma26, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-27' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma27, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-28' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma28, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-29' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma29, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-30' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma30, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-31' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as suma31, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha like '"+anio+"-"+mes+"-%' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 2, 'de_DE'), 0) as totalsuma "+
		"from codigosie where codigosie.tipo = 'I' order by nombre", cb);
}

function getTotalIngresos(anio, mes, cb){
	conn("select "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-01' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total01, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-02' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total02, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-03' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total03, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-04' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total04, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-05' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total05, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-06' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total06, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-07' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total07, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-08' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total08, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-09' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total09, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-10' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total10, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-11' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total11, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-12' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total12, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-13' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total13, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-14' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total14, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-15' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total15, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-16' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total16, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-17' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total17, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-18' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total18, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-19' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total19, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-20' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total20, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-21' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total21, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-22' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total22, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-23' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total23, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-24' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total24, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-25' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total25, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-26' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total26, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-27' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total27, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-28' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total28, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-29' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total29, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-30' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total30, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-31' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as total31, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha like '"+anio+"-"+mes+"-%' and ingegr.tipo = 'I'), 0)), 2, 'de_DE') as sumatotal "+
		"from codigosie where codigosie.tipo = 'I'", cb);
}

function getEgresos(anio, mes, cb){
	conn("select codigosie.nombre as codigotxt, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-01' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma01, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-02' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma02, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-03' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma03, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-04' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma04, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-05' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma05, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-06' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma06, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-07' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma07, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-08' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma08, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-09' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma09, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-10' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma10, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-11' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma11, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-12' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma12, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-13' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma13, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-14' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma14, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-15' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma15, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-16' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma16, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-17' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma17, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-18' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma18, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-19' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma19, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-20' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma20, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-21' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma21, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-22' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma22, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-23' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma23, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-24' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma24, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-25' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma25, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-26' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma26, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-27' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma27, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-28' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma28, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-29' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma29, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-30' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma30, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-31' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as suma31, "+
		"ifnull(FORMAT((select sum(ingegr.importe) from ingegr where fecha like '"+anio+"-"+mes+"-%' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 2, 'de_DE'), 0) as totalsuma "+
		"from codigosie where codigosie.tipo = 'E' order by nombre", cb);
}

function getTotalEgresos(anio, mes, cb){
	conn("select "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-01' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total01, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-02' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total02, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-03' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total03, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-04' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total04, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-05' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total05, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-06' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total06, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-07' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total07, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-08' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total08, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-09' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total09, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-10' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total10, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-11' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total11, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-12' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total12, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-13' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total13, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-14' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total14, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-15' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total15, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-16' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total16, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-17' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total17, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-18' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total18, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-19' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total19, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-20' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total20, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-21' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total21, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-22' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total22, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-23' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total23, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-24' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total24, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-25' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total25, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-26' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total26, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-27' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total27, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-28' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total28, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-29' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total29, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-30' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total30, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha = '"+anio+"-"+mes+"-31' and ingegr.id_codigoie_fk = codigosie.id and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as total31, "+
		"FORMAT(sum( ifnull((select sum(ingegr.importe) from ingegr where fecha like '"+anio+"-"+mes+"-%' and ingegr.tipo = 'E'), 0)), 2, 'de_DE') as sumatotal "+
		"from codigosie where codigosie.tipo = 'E'", cb);
}

function getSaldosDiarios(anio, mes, cb){
	conn("SELECT FORMAT((a.totali01 - a.totale01), 2, 'de_DE') as saldo01, "+
				"FORMAT((b.totali02 - b.totale02), 2, 'de_DE') as saldo02, "+
				"FORMAT((c.totali03 - c.totale03), 2, 'de_DE') as saldo03, "+
				"FORMAT((d.totali04 - d.totale04), 2, 'de_DE') as saldo04, "+
				"FORMAT((e.totali05 - e.totale05), 2, 'de_DE') as saldo05, "+
				"FORMAT((f.totali06 - f.totale06), 2, 'de_DE') as saldo06, "+
				"FORMAT((g.totali07 - g.totale07), 2, 'de_DE') as saldo07, "+
				"FORMAT((h.totali08 - h.totale08), 2, 'de_DE') as saldo08, "+
				"FORMAT((i.totali09 - i.totale09), 2, 'de_DE') as saldo09, "+
				"FORMAT((j.totali10 - j.totale10), 2, 'de_DE') as saldo10, "+
				"FORMAT((k.totali11 - k.totale11), 2, 'de_DE') as saldo11, "+
				"FORMAT((l.totali12 - l.totale12), 2, 'de_DE') as saldo12, "+
				"FORMAT((m.totali13 - m.totale13), 2, 'de_DE') as saldo13, "+
				"FORMAT((n.totali14 - n.totale14), 2, 'de_DE') as saldo14, "+
				"FORMAT((o.totali15 - o.totale15), 2, 'de_DE') as saldo15, "+
				"FORMAT((p.totali16 - p.totale16), 2, 'de_DE') as saldo16, "+
				"FORMAT((q.totali17 - q.totale17), 2, 'de_DE') as saldo17, "+
				"FORMAT((r.totali18 - r.totale18), 2, 'de_DE') as saldo18, "+
				"FORMAT((s.totali19 - s.totale19), 2, 'de_DE') as saldo19, "+
				"FORMAT((t.totali20 - t.totale20), 2, 'de_DE') as saldo20, "+
				"FORMAT((u.totali21 - u.totale21), 2, 'de_DE') as saldo21, "+
				"FORMAT((v.totali22 - v.totale22), 2, 'de_DE') as saldo22, "+
				"FORMAT((w.totali23 - w.totale23), 2, 'de_DE') as saldo23, "+
				"FORMAT((x.totali24 - x.totale24), 2, 'de_DE') as saldo24, "+
				"FORMAT((y.totali25 - y.totale25), 2, 'de_DE') as saldo25, "+
				"FORMAT((z.totali26 - z.totale26), 2, 'de_DE') as saldo26, "+
				"FORMAT((aa.totali27 - aa.totale27), 2, 'de_DE') as saldo27, "+
				"FORMAT((bb.totali28 - bb.totale28), 2, 'de_DE') as saldo28, "+
				"FORMAT((cc.totali29 - cc.totale29), 2, 'de_DE') as saldo29, "+
				"FORMAT((dd.totali30 - dd.totale30), 2, 'de_DE') as saldo30, "+
				"FORMAT((ee.totali31 - ee.totale31), 2, 'de_DE') as saldo31 "+
			"FROM (SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-01' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali01, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-01' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale01 from codigosie) as a "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-02' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali02, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-02' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale02 from codigosie) as b "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-03' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali03, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-03' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale03 from codigosie) as c "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-04' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali04, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-04' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale04 from codigosie) as d "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-05' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali05, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-05' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale05 from codigosie) as e "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-06' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali06, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-06' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale06 from codigosie) as f "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-07' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali07, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-07' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale07 from codigosie) as g "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-08' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali08, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-08' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale08 from codigosie) as h "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-09' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali09, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-09' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale09 from codigosie) as i "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-10' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali10, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-10' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale10 from codigosie) as j "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-11' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali11, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-11' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale11 from codigosie) as k "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-12' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali12, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-12' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale12 from codigosie) as l "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-13' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali13, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-13' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale13 from codigosie) as m "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-14' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali14, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-14' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale14 from codigosie) as n "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-15' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali15, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-15' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale15 from codigosie) as o "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-16' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali16, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-16' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale16 from codigosie) as p "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-17' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali17, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-17' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale17 from codigosie) as q "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-18' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali18, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-18' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale18 from codigosie) as r "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-19' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali19, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-19' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale19 from codigosie) as s "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-20' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali20, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-20' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale20 from codigosie) as t "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-21' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali21, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-21' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale21 from codigosie) as u "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-22' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali22, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-22' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale22 from codigosie) as v "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-23' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali23, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-23' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale23 from codigosie) as w "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-24' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali24, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-24' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale24 from codigosie) as x "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-25' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali25, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-25' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale25 from codigosie) as y "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-26' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali26, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-26' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale26 from codigosie) as z "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-27' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali27, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-27' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale27 from codigosie) as aa "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-28' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali28, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-28' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale28 from codigosie) as bb "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-29' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali29, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-29' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale29 from codigosie) as cc "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-30' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali30, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-30' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale30 from codigosie) as dd "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-31' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali31, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-31' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale31 from codigosie) as ee", cb);
}

function getSaldosDiariosSinFormat(anio, mes, cb){
	conn("SELECT (a.totali01 - a.totale01) as saldo01, "+
				"(b.totali02 - b.totale02) as saldo02, "+
				"(c.totali03 - c.totale03) as saldo03, "+
				"(d.totali04 - d.totale04) as saldo04, "+
				"(e.totali05 - e.totale05) as saldo05, "+
				"(f.totali06 - f.totale06) as saldo06, "+
				"(g.totali07 - g.totale07) as saldo07, "+
				"(h.totali08 - h.totale08) as saldo08, "+
				"(i.totali09 - i.totale09) as saldo09, "+
				"(j.totali10 - j.totale10) as saldo10, "+
				"(k.totali11 - k.totale11) as saldo11, "+
				"(l.totali12 - l.totale12) as saldo12, "+
				"(m.totali13 - m.totale13) as saldo13, "+
				"(n.totali14 - n.totale14) as saldo14, "+
				"(o.totali15 - o.totale15) as saldo15, "+
				"(p.totali16 - p.totale16) as saldo16, "+
				"(q.totali17 - q.totale17) as saldo17, "+
				"(r.totali18 - r.totale18) as saldo18, "+
				"(s.totali19 - s.totale19) as saldo19, "+
				"(t.totali20 - t.totale20) as saldo20, "+
				"(u.totali21 - u.totale21) as saldo21, "+
				"(v.totali22 - v.totale22) as saldo22, "+
				"(w.totali23 - w.totale23) as saldo23, "+
				"(x.totali24 - x.totale24) as saldo24, "+
				"(y.totali25 - y.totale25) as saldo25, "+
				"(z.totali26 - z.totale26) as saldo26, "+
				"(aa.totali27 - aa.totale27) as saldo27, "+
				"(bb.totali28 - bb.totale28) as saldo28, "+
				"(cc.totali29 - cc.totale29) as saldo29, "+
				"(dd.totali30 - dd.totale30) as saldo30, "+
				"(ee.totali31 - ee.totale31) as saldo31 "+
			"FROM (SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-01' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali01, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-01' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale01 from codigosie) as a "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-02' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali02, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-02' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale02 from codigosie) as b "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-03' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali03, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-03' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale03 from codigosie) as c "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-04' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali04, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-04' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale04 from codigosie) as d "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-05' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali05, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-05' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale05 from codigosie) as e "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-06' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali06, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-06' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale06 from codigosie) as f "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-07' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali07, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-07' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale07 from codigosie) as g "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-08' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali08, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-08' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale08 from codigosie) as h "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-09' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali09, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-09' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale09 from codigosie) as i "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-10' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali10, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-10' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale10 from codigosie) as j "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-11' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali11, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-11' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale11 from codigosie) as k "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-12' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali12, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-12' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale12 from codigosie) as l "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-13' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali13, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-13' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale13 from codigosie) as m "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-14' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali14, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-14' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale14 from codigosie) as n "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-15' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali15, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-15' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale15 from codigosie) as o "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-16' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali16, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-16' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale16 from codigosie) as p "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-17' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali17, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-17' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale17 from codigosie) as q "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-18' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali18, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-18' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale18 from codigosie) as r "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-19' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali19, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-19' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale19 from codigosie) as s "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-20' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali20, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-20' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale20 from codigosie) as t "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-21' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali21, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-21' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale21 from codigosie) as u "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-22' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali22, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-22' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale22 from codigosie) as v "+
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-23' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali23, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-23' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale23 from codigosie) as w "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-24' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali24, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-24' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale24 from codigosie) as x "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-25' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali25, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-25' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale25 from codigosie) as y "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-26' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali26, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-26' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale26 from codigosie) as z "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-27' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali27, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-27' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale27 from codigosie) as aa "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-28' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali28, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-28' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale28 from codigosie) as bb "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-29' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali29, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-29' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale29 from codigosie) as cc "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-30' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali30, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-30' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale30 from codigosie) as dd "+			
			"JOIN "+
			"(SELECT "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
			        "where fecha = '"+anio+"-"+mes+"-31' "+
			        "and ingegr.id_codigoie_fk = codigosie.id "+
			        "and ingegr.tipo = 'I'), 0)) as totali31, "+
				"sum( ifnull((select sum(ingegr.importe) "+
					"from ingegr "+
					"where fecha = '"+anio+"-"+mes+"-31' "+
					"and ingegr.id_codigoie_fk = codigosie.id "+
					"and ingegr.tipo = 'E'), 0)) as totale31 from codigosie) as ee", cb);
}

function getSP_getIngresos(anio, mes, cb){
	conn("call getIngresos('"+anio+"', '"+mes+"');", cb);
}

function getSP_getTotalIngresos(anio, mes, cb){
	conn("call getTotalIngresos('"+anio+"', '"+mes+"');", cb);
}

function getSP_getEgresos(anio, mes, cb){
	conn("call getEgresos('"+anio+"', '"+mes+"');", cb);
}

function getSP_getTotalEgresos(anio, mes, cb){
	conn("call getTotalEgresos('"+anio+"', '"+mes+"');", cb);
}

function getSP_getSaldosDiarios(anio, mes, cb){
	conn("call getSaldosDiarios('"+anio+"', '"+mes+"');", cb);
}

function getSP_getSaldosDiariosSinFormat(anio, mes, cb){
	conn("call getSaldosDiariosSinFormat('"+anio+"', '"+mes+"');", cb);
}