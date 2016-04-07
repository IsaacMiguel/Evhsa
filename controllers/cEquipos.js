//requiriendo modelo mensaje.js:
var mEquipos = require('../models/mEquipos');
var mVehiculos = require('../models/mVehiculos');

module.exports = {
	getLista : getLista,
	getAlta : getAlta,
	postAlta : postAlta
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
	var numero = params.numero;
	var denominacion = params.denominacion;
	var numero_coche_fk = params.nro_coche;
	var fecha_colocacion = params.f_colocacion;
	var total = params.total;
	var unica_operador_fk = req.session.user.unica;
	var responsable = params.responsable;
	var observaciones = params.observaciones;
		observaciones = observaciones.trim();
	var tipo = params.tipo;
	var fecha_sacado = params.f_sacado;
	var km = params.km;
	var resultado = params.resultado;
		resultado = resultado.trim();

	var data = {
		'numero' : numero,
		'denominacion' : denominacion,
		'numero_coche_fk' : numero_coche_fk,
		'fecha_colocacion' : fecha_colocacion,
		'total' : total,
		'unica_operador_fk' : unica_operador_fk,
		'responsable' : responsable,
		'observaciones' : observaciones,
		'tipo' : tipo,
		'fecha_sacado' : fecha_sacado,
		'km' : km,
		'resultado' : resultado
		};

	mEquipos.insert(data, function () {
		res.redirect("equipos_lista");
	});
}