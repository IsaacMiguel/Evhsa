const mOrdenesTrabajo = require('../models/mOrdenesTrabajo');
const mOrdenesTrabajoFrenos = require('../models/mOrdenesTrabajoFrenos');
const mVehiculos = require('../models/mVehiculos');
const tool = require('../public/js/utils');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	getUltimaOrden: getUltimaOrden,
	postAlta: postAlta,
	getValidarInsert: getValidarInsert,
	getFiltrar: getFiltrar,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar,
	getVer: getVer,
	getModificarFrenosGeneral: getModificarFrenosGeneral,
	postModificarFrenosGeneral: postModificarFrenosGeneral
}

function getLista(req, res){
	res.render('ordenestrabajo_lista', {
		pagename : 'Ordenes de Trabajo'
	});
}

function getAlta(req, res){
	mVehiculos.getAll(function (vehiculos) {
		mOrdenesTrabajo.getMax(function (maxNum) {
			res.render('ordenestrabajo_alta', {
				pagename : 'Alta de Ordenes de Trabajo',
				vehiculos : vehiculos,
				maxNum : maxNum[0].ultimo + 1
			});		
		})
	});
}

function getUltimaOrden(req, res){
	const params = req.params;
	const nro_coche = params.nro_coche;
	const fecha_hoy = params.fecha_hoy;

	mOrdenesTrabajo.getMaxByIdVehiculo(nro_coche, fecha_hoy, function (id_ordentrabajo) {
		if (id_ordentrabajo.length > 0) {
			mOrdenesTrabajo.getById(id_ordentrabajo[0].id, function (ordentrabajo) {
				res.send(ordentrabajo[0]);
			})
		} else {
			res.send('null');
		}
	});
}

function getValidarInsert(req, res){
	const params = req.params;
	const numero = params.numero;

	mOrdenesTrabajo.getByNumero(numero, function (orden) {
		if (orden.length > 0) {
			res.send('true');
		} else {
			res.send('false');
		}
	});
}

function postAlta(req, res){
	const params = req.body;
	const numero = params.numero;
	const nro_coche = params.coches;
	var fecha = params.fecha;
	var fecha_ant = params.fecha_ant;
	var km_hastahoy = params.km_hastahoy;
	var nro_ant = params.nro_ant;
		
	fecha = tool.changeDate(fecha);

	if (fecha_ant != '')
		fecha_ant = tool.changeDate(fecha_ant);
	else
		fecha_ant = '0000-00-00';
	if (nro_ant == '')
		nro_ant = 0;
	if (km_hastahoy == '')
		km_hastahoy = 0;

	mOrdenesTrabajo.getByNumero(numero, function (orden) {
		if (orden.length > 0) {
			mOrdenesTrabajo.getMax(function (maxNum) {
				const e_numero = maxNum[0].ultimo + 1;
				mOrdenesTrabajo.insert(e_numero, nro_coche, fecha, fecha_ant, nro_ant, km_hastahoy, function () {
					mOrdenesTrabajoFrenos.insertGeneral(e_numero, function(){
						mOrdenesTrabajoFrenos.insertUbicacion(e_numero, 1, function(){
							mOrdenesTrabajoFrenos.insertUbicacion(e_numero, 2, function(){
								mOrdenesTrabajoFrenos.insertUbicacion(e_numero, 3, function(){
									mOrdenesTrabajoFrenos.insertUbicacion(e_numero, 4, function(){
										res.redirect('/ordenestrabajo_lista');
									});
								});
							});
						});
					});
				});
			});
		}else{
			//insert frenos general
			//insert frenos ubicacion (4)
			mOrdenesTrabajo.insert(numero, nro_coche, fecha, fecha_ant, nro_ant, km_hastahoy, function () {
				mOrdenesTrabajoFrenos.insertGeneral(numero, function(){
					mOrdenesTrabajoFrenos.insertUbicacion(numero, 1, function(){
						mOrdenesTrabajoFrenos.insertUbicacion(numero, 2, function(){
							mOrdenesTrabajoFrenos.insertUbicacion(numero, 3, function(){
								mOrdenesTrabajoFrenos.insertUbicacion(numero, 4, function(){
									res.redirect('/ordenestrabajo_lista');
								});
							});
						});
					});
				});
			});
		}
	});
}

function getFiltrar(req, res){
	const params = req.params;
	const desde = params.desde;
	const hasta = params.hasta;

	mOrdenesTrabajo.getAllDesdeHasta(desde, hasta, function (ordenes) {
		res.send(ordenes);
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mOrdenesTrabajo.getById(id, function (orden) {
		mVehiculos.getByNumero(orden[0].nro_coche, function (vehiculo) {
			res.render('ordenestrabajo_modificar', {
				pagename : 'Modificar Orden de Trabajo',
				vehiculo : vehiculo[0],
				orden : orden[0]
			});
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id_orden;
	var fecha = params.fecha;

	fecha = tool.changeDate(fecha);

	mOrdenesTrabajo.update(id, fecha, function () {
		res.redirect('/ordenestrabajo_lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mOrdenesTrabajo.del(id, function () {
		res.send(true);
	});
}

function getVer(req, res){
	const params = req.params;
	const id = params.id;

	mOrdenesTrabajo.getById(id, function (orden) {
		mOrdenesTrabajoFrenos.getFrenos_General(id, function(frenos_general){
			mOrdenesTrabajoFrenos.getFrenos_Ubica(id, function(frenos_ubica){
				res.render('ordenestrabajo_ver', {
					pagename: 'Ordenes de Trabajo',
					orden: orden[0],
					frenos_general: frenos_general[0],
					frenos_ubica: frenos_ubica
				});
			});
		});
	});
}

function getModificarFrenosGeneral(req, res){
	const params = req.params;
	const id_orden = params.id;

	mOrdenesTrabajoFrenos.getFrenos_General(id_orden, function(frenos_general){
		// console.log(frenos_general[0])
		res.render("ordenestrabajo_frenos_modificar", {
			pagename: "Modificar Informacion General de Frenos",
			frenos_general: frenos_general[0],
			id_orden: id_orden
		});
	});
}

function postModificarFrenosGeneral(req, res){
	const params = req.body;
	const id_orden = params.id_orden;
	const valv_pedalera = params.valv_pedalera;
	var valv_pedalera_fecha = params.valv_pedalera_fecha;
	var valv_pedalera_km = params.valv_pedalera_km;
	const valv_estaciona = params.valv_estaciona;
	var valv_estaciona_fecha = params.valv_estaciona_fecha;
	var valv_estaciona_km = params.valv_estaciona_km;
	var freno_motor = params.freno_motor;
	var piston = params.piston;
	var electrovalvula = params.electrovalvula;
	var servo_del = params.servo_del;
	const servo_del_diafragma = params.servo_del_diafragma;
	const servo_del_controlfuga = params.servo_del_controlfuga;
	var servo_tra = params.servo_tra;
	const servo_tra_diafragma = params.servo_tra_diafragma;
	const servo_tra_controlfuga = params.servo_tra_controlfuga;
	var bomba_del = params.bomba_del;
	const bomba_del_marca = params.bomba_del_marca;
	var bomba_tra = params.bomba_tra;
	const bomba_tra_marca = params.bomba_tra_marca;
	const varios = params.varios;
	const operario1 = params.operario1;
	const operario1_hrs = params.operario1_hrs;
	const operario2 = params.operario2;
	const operario2_hrs = params.operario2_hrs;
	const operario3 = params.operario3;
	const operario3_hrs = params.operario3_hrs;
	const operarios_hrstotal = params.operarios_hrstotal;

	if (valv_pedalera_km == '')
		valv_pedalera_km = 0;
	
	if (valv_estaciona_km == '')
		valv_estaciona_km = 0;

	if (valv_pedalera_fecha == '')
		valv_pedalera_fecha = '0000-00-00';
	else
		valv_pedalera_fecha = tool.changeDate(valv_pedalera_fecha);

	if (valv_estaciona_fecha == '')
		valv_estaciona_fecha = '0000-00-00';
	else
		valv_estaciona_fecha = tool.changeDate(valv_estaciona_fecha);

	if (freno_motor == '')
		freno_motor = '0000-00-00';
	else
		freno_motor = tool.changeDate(freno_motor);

	if (piston == '')
		piston = '0000-00-00';
	else
		piston = tool.changeDate(piston);

	if (electrovalvula == '')
		electrovalvula = '0000-00-00';
	else
		electrovalvula = tool.changeDate(electrovalvula);

	if (servo_del == '')
		servo_del = '0000-00-00';
	else
		servo_del = tool.changeDate(servo_del);

	if (servo_tra == '')
		servo_tra = '0000-00-00';
	else
		servo_tra = tool.changeDate(servo_tra);

	if (bomba_del == '')
		bomba_del = '0000-00-00';
	else
		bomba_del = tool.changeDate(bomba_del);

	if (bomba_tra == '')
		bomba_tra = '0000-00-00';
	else
		bomba_tra = tool.changeDate(bomba_tra);

	mOrdenesTrabajoFrenos.insertGeneral(id_orden, valv_pedalera, valv_pedalera_fecha, valv_pedalera_km, valv_estaciona, valv_estaciona_fecha, valv_estaciona_km, freno_motor, piston, electrovalvula, servo_del, servo_del_diafragma, servo_del_controlfuga, servo_tra, servo_tra_diafragma, servo_tra_controlfuga, bomba_del, bomba_del_marca, bomba_tra, bomba_tra_marca, varios, operario1, operario1_hrs, operario2, operario2_hrs, operario3, operario3_hrs, operarios_hrstotal, function(){
		res.redirect("ordenestrabajo_ver/"+id_orden)
	});
}