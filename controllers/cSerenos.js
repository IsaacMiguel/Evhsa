const mRepuestos = require('../models/mRepuestos');
const mSerenos = require('../models/mSerenos');
const mVehiculos = require('../models/mVehiculos');
const tools = require('../public/js/utils');

module.exports = {
	getLista : getLista,
	getAlta : getAlta,
	postAlta : postAlta,
	getListaHerramientas : getListaHerramientas,
	getVehiculos : getVehiculos,
	postColocarCoche : postColocarCoche,
	getDel : getDel,
	postSacarCoche : postSacarCoche
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
	const params = req.body;
	const fecha_movimiento = tools.changeDate(params.fecha_movimiento);
	const unica_operador_fk = req.session.user.unica;
	const id_repuesto_fk = params.repuesto;
	const cantidad = params.cantidad;

	mSerenos.insertSerenos(fecha_movimiento, unica_operador_fk, id_repuesto_fk, cantidad, function () {
		res.redirect('sereno_lista');
	});
}

function getListaHerramientas (req, res) {
	const params = req.params;
	const filtro = params.filtro;
	const fecha_desde = params.desde;
	const fecha_hasta = params.hasta;

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
 const params = req.params;
 const id_sereno = params.id_sereno;
 const id_coche = params.id_coche;
 const fecha_colocado = params.fecha_colocado;

 mSerenos.updateSerenosByColocado(id_sereno, id_coche, fecha_colocado, function () {
 	res.send('true');
 });
}

function getDel (req, res) {
	const params = req.params;
	const id_sereno = params.id_sereno;

	mSerenos.del(id_sereno, function () {
		res.send('true');
	});
}

function postSacarCoche (req, res) {
	const params = req.params;
	const id_sereno = params.id_sereno;

	mSerenos.updateSerenosByNoColocado(id_sereno, function () {
		res.send('true');
	})
}