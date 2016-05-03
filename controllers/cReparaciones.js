//requiriendo modelo mensaje.js:
const mReparaciones = require('../models/mReparaciones');
const mBorro = require('../models/mBorro');
const mAyuda = require('../models/mAyuda');
const mVehiculos = require('../models/mVehiculos');
const mUsuarios = require('../models/mUsuarios');

module.exports = {
	getLista: getLista,
	getReparacionesFiltroFecha: getReparacionesFiltroFecha,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	req.session.nromenu = 3;
	res.render('reparaciones_lista', {
		pagename: 'Archivo de Reparaciones de Emergencia'
	});
}

function getAlta(req, res){
	mVehiculos.getAll(function (vehiculos){
		mUsuarios.getAllUsuarios(function (usuarios){
			res.render("reparaciones_alta", {
				pagename: "Alta de Reparacion de Emergencia",
				coches: vehiculos,
				usuarios: usuarios
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	fecha = params.fecha;
	descripcion = params.descripcion;
	cantidad = params.cantidad;
	destinos = params.destino;
	coche = params.coche;
	total = params.total;
	operario = params.operario;
	memo = params.memo;
	empresa = params.empresa;

	fecha = changeDate(fecha);

	mReparaciones.insert(fecha, descripcion, cantidad, destinos, coche, total, operario, memo, empresa, function (){
		res.redirect("reparaciones_lista");
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mReparaciones.getById(id, function (reparacion){		
		res.render("reparaciones_modificar", {
			pagename: "Modificar Reparacion de Emergencia",
			reparacion: reparacion[0]
		});				
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	fecha = params.fecha;
	descripcion = params.descripcion;
	cantidad = params.cantidad;
	destinos = params.destino;
	coche = params.coche;
	total = params.total;
	operario = params.operario;
	memo = params.memo;
	empresa = params.empresa;

	fecha = changeDate(fecha);

	mReparaciones.update(id, fecha, descripcion, cantidad, destinos, coche, total, operario, memo, empresa, function (){
		res.redirect("reparaciones_lista");
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mReparaciones.del(id, function (){
		res.redirect("reparaciones_lista");
	});
}

function getReparacionesFiltroFecha(req, res){
	const params = req.params;
	var desde = params.desde;
	var hasta = params.hasta;

	desde = changeDate(desde);
	hasta = changeDate(hasta);

	mReparaciones.getBetweenFecha(desde, hasta, function (reparaciones){
		res.send(reparaciones);
	});
}