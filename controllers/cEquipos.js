//requiriendo modelo mensaje.js:
var mEquipos = require('../models/mEquipos');
var mVehiculos = require('../models/mVehiculos');

var utils = require('../public/utilities/utils').changeDate2;

module.exports = {
	getLista : getLista,
	getAlta : getAlta,
	postAlta : postAlta,
	getEquipo : getEquipo,
	getModificarEquipo : getModificarEquipo,
	postModificarEquipo : postModificarEquipo,
	deleteEquipo : deleteEquipo
}

function getLista (req, res) {
	mEquipos.getAll(function (equipos) {
		res.render('equipos_lista', {
			pagename : 'Lista de Equipos',
			equipos : equipos
		});
	});
}

function getAlta (req, res) {
	mVehiculos.getVehiculo(function (vehiculos) {
		res.render('equipos_alta', {
			pagename : 'Alta de Equipos',
			vehiculos : vehiculos
		});
	});
}

function postAlta (req, res) {
	var params = req.body;

	var observaciones = params.observaciones;
		observaciones = observaciones.trim();

	var resultado = params.resultado;
		resultado = resultado.trim();

	var data = {
		'numero' : params.numero,
		'denominacion' : params.denominacion,
		'numero_coche_fk' : params.nro_coche,
		'fecha_colocacion' : params.f_colocacion,
		'total' : params.total,
		'unica_operador_fk' : req.session.user.unica,
		'responsable' : params.responsable,
		'observaciones' : observaciones,
		'tipo' : params.tipo,
		'fecha_sacado' : params.f_sacado,
		'km' : params.km,
		'resultado' : resultado
		};

	mEquipos.insert(data, function () {
		res.redirect("equipos_lista");
	});
}

function getEquipo (req, res) {
	mEquipos.getById(req.params.id, function (equipo) {
		utils(equipo[0].fecha_sacado, function (fsacado) {
			utils(equipo[0].fecha_colocacion, function (fcolocacion) {
				res.render('equipo_ver', {
					pagename : 'Ver Equipo',
					equipo : equipo[0],
					fcolocacion : fcolocacion,
					fsacado : fsacado
				});
			});
		});
	});
}

function getModificarEquipo (req, res) {
	mEquipos.getById(req.params.id, function (equipo) {
		mVehiculos.getVehiculo(function (vehiculos) {
			res.render('equipo_modificar', {
				pagename : 'Modificar Equipo',
				equipo : equipo[0],
				vehiculos : vehiculos
			});
		});
	});
}

function postModificarEquipo (req, res) {
	var params = req.body;

	var observaciones = params.observaciones;
		observaciones = observaciones.trim();

	var resultado = params.resultado;
		resultado = resultado.trim();

	var data = {
		'id' : params.id,
		'numero' : params.numero,
		'denominacion' : params.denominacion,
		'numero_coche_fk' : params.nro_coche,
		'fecha_colocacion' : params.f_colocacion,
		'total' : params.total,
		'unica_operador_fk' : req.session.user.unica,
		'responsable' : params.responsable,
		'observaciones' : observaciones,
		'tipo' : params.tipo,
		'fecha_sacado' : params.f_sacado,
		'km' : params.km,
		'resultado' : resultado
		};

	mEquipos.updateEquipo(data, function () {
		res.redirect("equipos_lista");
	});
}

function deleteEquipo (req, res) {
	mEquipos.delEquipo(req.params.id, function () {
		res.redirect("equipos_lista");
	});
}