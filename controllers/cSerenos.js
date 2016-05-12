var mRepuestos = require('../models/mRepuestos');
var mSerenos = require('../models/mSerenos');
var mVehiculos = require('../models/mVehiculos');
var tools = require('../public/js/utils');

module.exports = {
	getLista : getLista,
	getAlta : getAlta,
	postAlta : postAlta,
	getListaHerramientas : getListaHerramientas,
	getVehiculos : getVehiculos,
	postColocarCoche : postColocarCoche,
	getDel : getDel
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
	var fecha_movimiento = tools.changeDate(params.fecha_movimiento);

	var fecha_movimiento =  fecha_movimiento;
	var unica_operador_fk = req.session.user.unica;
	var id_repuesto_fk = params.repuesto;
	var cantidad = params.cantidad;

	mSerenos.insertSerenos(fecha_movimiento, unica_operador_fk, id_repuesto_fk, cantidad, function () {
		res.render('sereno_lista', {
			pagename : 'Listado Herramientas Sereno'
		})
	})
}

function getListaHerramientas (req, res) {
	var params = req.params;
	var filtro = params.filtro;
	var fecha_desde = params.desde;
	var fecha_hasta = params.hasta;

	switch (filtro) {
		case '1':
			mSerenos.getAllHerramientas(fecha_desde, fecha_hasta, function (herramientas) {
				res.send(herramientas)
			})

			break;

		case '2':
			mSerenos.getHerramientasByColocados(fecha_desde, fecha_hasta, function (herramientas) {
				res.send(herramientas)
			})

			break;

		case '3':
			mSerenos.getHerramientasByNoColocados(fecha_desde, fecha_hasta, function (herramientas) {
				res.send(herramientas)
			})

			break;

		default:
			res.redirect('/')

			break;
	}
}

function getVehiculos (req, res) {
	mVehiculos.getAll(function (vehiculos) {
		res.send(vehiculos)
	})
}

function postColocarCoche (req, res) {
 var params = req.params;
 var id_sereno = params.id_sereno;
 var id_coche = params.id_coche;
 var fecha_colocado = params.fecha_colocado;

 mSerenos.updateSerenosByColocado(id_sereno, id_coche, fecha_colocado, function () {
 	res.send('true');
 });
}

function getDel (req, res) {
	var params = req.params;
	var id_sereno = params.id_sereno;

	mSerenos.del(id_sereno, function () {
		res.render('sereno_lista', {
			pagename : 'Listado Herramientas Sereno'
		});
	})
}