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
	getDelete : getDelete,
	getEquiposFiltro : getEquiposFiltro
}

function getLista (req, res) {
	res.render('equipos_lista', {
		pagename : 'Lista de Equipos'
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

	if (params.total == '') {
		var total = 0;
	}

	if (params.km == '') {
		var km = 0;
	}

	var observaciones = params.observaciones;
		observaciones = observaciones.trim();

	var resultado = params.resultado;
		resultado = resultado.trim();

	var data = {
		'numero' : params.numero,
		'denominacion' : params.denominacion,
		'numero_coche_fk' : params.nro_coche,
		'fecha_colocacion' : params.f_colocacion,
		'total' : total,
		'unica_operador_fk' : req.session.user.unica,
		'responsable' : params.responsable,
		'observaciones' : observaciones,
		'tipo' : params.tipo,
		'fecha_sacado' : params.f_sacado,
		'km' : km,
		'resultado' : resultado
		};

	mEquipos.insert(data, function () {
		res.redirect("equipos_lista");
	});
}

function getVer (req, res) {
	mEquipos.getById(req.params.id, function (equipo) {
			res.render('equipo_ver', {
				pagename : 'Ver Equipo',
				equipo : equipo[0]
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

	if (params.total == '') {
		var total = 0;
	}

	if (params.km == '') {
		var km = 0;
	}

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
		'total' : total,
		'unica_operador_fk' : req.session.user.unica,
		'responsable' : params.responsable,
		'observaciones' : observaciones,
		'tipo' : params.tipo,
		'fecha_sacado' : params.f_sacado,
		'km' : km,
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

function getEquiposFiltro (req, res) {
	var params = req.params;
	
	console.log("parametros: " + params.opcion + '/' + params.buscar);
}