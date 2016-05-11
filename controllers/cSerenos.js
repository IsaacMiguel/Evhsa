var mRepuestos = require('../models/mRepuestos');
var mSerenos = require('../models/mSerenos');
var tools = require('../public/js/utils');

module.exports = {
	getLista : getLista,
	getAlta : getAlta,
	postAlta : postAlta
}

function getLista (req, res) {
	res.render('sereno_lista', {
		pagename : 'Listado Herramientas Sereno'
	});
}

function getAlta (req, res) {
	mRepuestos.getAll(function (repuestos) {
		res.render('serenos_alta', {
			pagename : 'Alta de Herramientas para Sereno',
			repuestos : repuestos
		})
	})
}

function postAlta (req, res) {
	var params = req.body;
	fecha_movimiento = tools.changeDate(params.fecha_movimiento);

	var data = {
		'fecha_movimiento' : fecha_movimiento,
		'unica_operador_fk' : req.session.user.unica,
		'id_repuesto_fk' : params.repuesto,
		'cantidad' : params.cantidad
	}

	mSerenos.insertSerenos(data, function () {
		res.render('sereno_lista', {
			pagename : 'Listado Herramientas Sereno'
		})
	})
}