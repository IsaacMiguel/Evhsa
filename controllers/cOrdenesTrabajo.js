const mOrdenesTrabajo = require('../models/mOrdenesTrabajo');
const mVehiculos = require('../models/mVehiculos');
const tool = require('../public/js/utils');

module.exports = {
	getLista : getLista,
	getAlta : getAlta,
	getUltimaOrden : getUltimaOrden,
	postAlta : postAlta
}

function getLista (req, res) {
	res.render('ordenes_trabajo', {
		pagename : 'Ordenes de Trabajo'
	});
}

function getAlta (req, res) {
	mVehiculos.getAll(function (vehiculos) {
		res.render('ordenestrabajo_alta', {
			pagename : 'Alta de Ordenes de Trabajo',
			vehiculos : vehiculos
		});
	});
}

function getUltimaOrden (req, res) {
	const params = req.params;
	const nro_coche = params.nro_coche;
	const fecha_hoy = params.fecha_hoy;

	mOrdenesTrabajo.getMaxByIdVehiculo(nro_coche, fecha_hoy, function (id_ordentrabajo) {
		if (id_ordentrabajo[0].id !== null) {
			mOrdenesTrabajo.getById(id_ordentrabajo[0].id, function (ordentrabajo) {
				res.send(ordentrabajo[0]);
			})
		} else {
			res.send('null');
		}
	});
}

function postAlta (req, res) {
	const params = req.body;
	const nro_coche = params.coches;
	var fecha = params.fecha;
		fecha = tool.changeDate(fecha);

	var fecha_anterior = params.fecha_anterior;
		if (fecha_anterior !== '') { fecha_anterior = tool.changeDate(fecha_anterior); }

	var nro_ant = params.nro_ant;
		if (nro_ant === '') { nro_ant = 0 }

	var km_hastahoy = params.km_hastahoy;
		if (km_hastahoy === '') { km_hastahoy = 0 }

	mOrdenesTrabajo.insert(nro_coche, fecha, fecha_anterior, nro_ant, km_hastahoy, function () {
		res.redirect('/ordenes_trabajo');
	});
}