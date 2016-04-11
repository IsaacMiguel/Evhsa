//requiriendo modelo mensaje.js:
var mEquipos = require('../models/mEquipos');
var mVehiculos = require('../models/mVehiculos');

var utils = require('../public/js/main').changeDate2;

module.exports = {
	getLista : getLista,
	getAlta : getAlta,
	postAlta : postAlta,
	getVer : getVer,
	getModificar : getModificar,
	postModificar : postModificar,
	getDelete : getDelete
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
	mVehiculos.getDataVehiculos(function (vehiculos) {
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

function getVer (req, res) {
	mEquipos.getById(req.params.id, function (equipo) {
		fcolocacion = utils(equipo[0].fecha_sacado);
		fsacado = utils(equipo[0].fecha_colocacion);
			res.render('equipo_ver', {
				pagename : 'Ver Equipo',
				equipo : equipo[0],
				fcolocacion : fcolocacion,
				fsacado : fsacado
			});
	});
}

function getModificar (req, res) {
	mEquipos.getById(req.params.id, function (equipo) {
		mVehiculos.getDataVehiculos(function (vehiculos) {
			res.render('equipo_modificar', {
				pagename : 'Modificar Equipo',
				equipo : equipo[0],
				vehiculos : vehiculos
			});
		});
	});
}

function postModificar (req, res) {
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

	mEquipos.update(data, function () {
		res.redirect("equipos_lista");
	});
}

function getDelete (req, res) {
	mEquipos.del(req.params.id, function () {
		res.redirect("equipos_lista");
	});
}