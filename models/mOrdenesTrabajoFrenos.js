const conn = require('../config/db').conn;

module.exports = {
	insertGeneral : insertGeneral,
	insertUbicacion: insertUbicacion,
	getFrenos_General: getFrenos_General,
	getFrenos_Ubica: getFrenos_Ubica
}

function insertGeneral(id_orden, cb){
	conn("INSERT INTO ot_frenos_general(id_orden_fk) VALUES("+id_orden+")",	cb);
}

function insertUbicacion(id_orden, id_ubicacion, cb){
	conn("INSERT INTO ot_frenos(id_orden_fk, id_ubica_freno_fk) VALUE("+id_orden+", "+id_ubicacion+")", cb);
}

function getFrenos_General(id_orden, cb){
	conn("SELECT id, id_orden_fk, "+
	"IFNULL(ot_frenos_general.valv_pedalera, '') as valv_pedalera, "+
	"IF(ot_frenos_general.valv_pedalera_fecha = '0000-00-00', '', IFNULL(DATE_FORMAT(ot_frenos_general.valv_pedalera_fecha, '%d/%m/%Y'), '')) as valv_pedalera_fecha, "+
	"IF(ot_frenos_general.valv_pedalera_km = 0, '', IFNULL(ot_frenos_general.valv_pedalera_km, '')) as valv_pedalera_km, "+
	"IFNULL(ot_frenos_general.valv_estaciona, '') as valv_estaciona, "+
	"IF(ot_frenos_general.valv_estaciona_fecha = '0000-00-00', '', IFNULL(DATE_FORMAT(ot_frenos_general.valv_estaciona_fecha, '%d/%m/%Y'), '')) as valv_estaciona_fecha, "+
	"IF(ot_frenos_general.valv_estaciona_km = 0, '', IFNULL(ot_frenos_general.valv_estaciona_km, '')) as valv_estaciona_km, "+
	"IF(ot_frenos_general.freno_motor = '0000-00-00', '', IFNULL(DATE_FORMAT(ot_frenos_general.freno_motor, '%d/%m/%Y'), '')) as freno_motor, "+
	"IF(ot_frenos_general.piston = '0000-00-00', '', IFNULL(DATE_FORMAT(ot_frenos_general.piston, '%d/%m/%Y'), '')) as piston, "+
	"IFNULL(ot_frenos_general.varios, '') as varios, "+
	"IFNULL(ot_frenos_general.operario1, '') as operario1, "+
	"IFNULL(ot_frenos_general.operario1_hrs, '') as operario1_hrs, "+
	"IFNULL(ot_frenos_general.operario2, '') as operario2, "+
	"IFNULL(ot_frenos_general.operario2_hrs, '') as operario2_hrs, "+
	"IFNULL(ot_frenos_general.operario3, '') as operario3, "+
	"IFNULL(ot_frenos_general.operario3_hrs, '') as operario3_hrs, "+
	"IFNULL(ot_frenos_general.operarios_hrstotal, '') as operarios_hrstotal, "+
	"IF(ot_frenos_general.servo_del = '0000-00-00', '', IFNULL(DATE_FORMAT(ot_frenos_general.servo_del, '%d/%m/%Y'), '')) as servo_del, "+
	"IFNULL(ot_frenos_general.servo_del_diafragma, '') as servo_del_diafragma, "+
	"IFNULL(ot_frenos_general.servo_del_controlfuga, '') as servo_del_controlfuga, "+
	"IF(ot_frenos_general.servo_tra = '0000-00-00', '', IFNULL(DATE_FORMAT(ot_frenos_general.servo_tra, '%d/%m/%Y'), '')) as servo_tra, "+
	"IFNULL(ot_frenos_general.servo_tra_diafragma, '') as servo_tra_diafragma, "+
	"IFNULL(ot_frenos_general.servo_tra_controlfuga, '') as servo_tra_controlfuga, "+
	"IF(ot_frenos_general.bomba_del = '0000-00-00', '', IFNULL(DATE_FORMAT(ot_frenos_general.bomba_del, '%d/%m/%Y'), '')) as bomba_del, "+
	"IFNULL(ot_frenos_general.bomba_del_marca, '') as bomba_del_marca, "+
	"IF(ot_frenos_general.bomba_tra = '0000-00-00', '', IFNULL(DATE_FORMAT(ot_frenos_general.bomba_tra, '%d/%m/%Y'), '')) as bomba_tra, "+
	"IFNULL(ot_frenos_general.bomba_tra_marca, '') as bomba_tra_marca, "+
	"IF(ot_frenos_general.electrovalvula = '0000-00-00', '', IFNULL(DATE_FORMAT(ot_frenos_general.electrovalvula, '%d/%m/%Y'), '')) as electrovalvula "+
	"FROM ot_frenos_general where id_orden_fk = "+id_orden,	cb);
}

function getFrenos_Ubica(id_orden, cb){
	conn("SELECT ot_frenos.id, "+
		"ot_frenos.id_orden_fk, "+
		"ot_frenos.id_ubica_freno_fk, "+
		"ifnull(ot_frenos.fecha_ultima_reparacion, '') as fecha_ultima_reparacion, "+
		"ifnull(ot_frenos.km, '') as km, "+
		"ifnull(ot_frenos.nro_equipo,'') as nro_equipo, "+
		"ifnull(ot_frenos.cinta,'') as cinta, "+
		"ifnull(ot_frenos.rodillomm,'') as rodillomm, "+
		"ifnull(ot_frenos.diafragma,'') as diafragma, "+
		"ifnull(ot_frenos.diafragma_fecha,'') as diafragma_fecha, "+
		"ifnull(ot_frenos.regulador,'') as regulador, "+
		"ifnull(ot_frenos.regulador_fecha,'') as regulador_fecha, "+
		"ifnull(ot_frenos.leva,'') as leva, "+
		"ifnull(ot_frenos.leva_fecha,'') as leva_fecha, "+
		"ifnull(ot_frenos.pulmon,'') as pulmon, "+
		"ifnull(ot_frenos.pulmon_fecha,'') as pulmon_fecha, "+
		"ifnull(ot_frenos.campana,'') as campana, "+
		"ifnull(ot_frenos.otros,'') as otros, "+
		"ifnull(ot_frenos.probado_apoyo_tiza,'') as probado_apoyo_tiza, "+
		"ifnull(ot_frenos.control_fugas,'') as control_fugas, "+
	 	"ubicaciones_frenos.descripcion as ubicatxt, "+
	 	"UPPER(ubicaciones_frenos.descripcion) as ubicatxtmayus "+
	 	"FROM ot_frenos "+
		"LEFT JOIN ubicaciones_frenos ON ubicaciones_frenos.id = ot_frenos.id_ubica_freno_fk "+
		"where id_orden_fk = "+id_orden, cb);
}

function insertGeneral(id_orden, valv_pedalera, valv_pedalera_fecha, valv_pedalera_km, valv_estaciona, valv_estaciona_fecha, valv_estaciona_km, freno_motor, piston, electrovalvula, servo_del, servo_del_diafragma, servo_del_controlfuga, servo_tra, servo_tra_diafragma, servo_tra_controlfuga, bomba_del, bomba_del_marca, bomba_tra, bomba_tra_marca, varios, operario1, operario1_hrs, operario2, operario2_hrs, operario3, operario3_hrs, operarios_hrstotal, cb){
	conn("UPDATE ot_frenos_general SET valv_pedalera='"+valv_pedalera+"', "+"valv_pedalera_fecha='"+valv_pedalera_fecha+"', "+
		"valv_pedalera_km="+valv_pedalera_km+", valv_estaciona='"+valv_estaciona+"', valv_estaciona_fecha='"+valv_estaciona_fecha+"', "+
		"valv_estaciona_km="+valv_estaciona_km+", freno_motor='"+freno_motor+"', piston='"+piston+"', varios='"+varios+"', "+
		"operario1='"+operario1+"', operario1_hrs='"+operario1_hrs+"', operario2='"+operario2+"', operario2_hrs='"+operario2_hrs+"', "+
		"operario3='"+operario3+"', operario3_hrs='"+operario3_hrs+"', operarios_hrstotal='"+operarios_hrstotal+"', "+
		"servo_del='"+servo_del+"', servo_del_diafragma='"+servo_del_diafragma+"', servo_del_controlfuga='"+servo_del_controlfuga+"', "+
		"servo_tra='"+servo_tra+"', servo_tra_diafragma='"+servo_tra_diafragma+"', servo_tra_controlfuga='"+servo_tra_controlfuga+"', "+
		"bomba_del='"+bomba_del+"', bomba_del_marca='"+bomba_del_marca+"', bomba_tra='"+bomba_tra+"', "+
		"bomba_tra_marca='"+bomba_tra_marca+"', electrovalvula='"+electrovalvula+"' WHERE id_orden_fk="+id_orden, cb);
}