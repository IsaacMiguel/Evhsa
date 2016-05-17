const vehiculos = require('../models/mVehiculos');
const novedadesCoches = require('../models/mNovedadesCoches');

const tool = require('../public/js/utils');

module.exports = {
	getLista : getLista,
	getAlta : getAlta,
	postAlta : postAlta,
	getFiltro : getFiltro,
	getNovedad : getNovedad,
	getDel : getDel,
	postNroOrden : postNroOrden,
	postNoOrden : postNoOrden,
	getModificar : getModificar,
	postModificar : postModificar
}

function getLista (req, res) {
	vehiculos.getAll(function (vehiculos) {
		res.render('novedades_lista', {
			pagename : 'Novedades de Coches',
			vehiculos : vehiculos
		});
	});
}

function getAlta (req, res) {
	vehiculos.getAll(function (vehiculos) {
		res.render('novedades_alta', {
			pagename : 'Alta de Novedades de Coche',
			vehiculos : vehiculos
		});
	});
}

function postAlta (req,res) {
	const params = req.body;
	var fecha = params.fecha;
		fecha = tool.changeDate(fecha);
	const numero_coche = params.vehiculo;
	const detalle = params.detalle;

	novedadesCoches.insert(fecha, numero_coche, detalle, function () {
		res.redirect('/novedades_lista');
	});
}

function getFiltro (req, res) {
	const params = req.params;
	const desde = params.desde;
	const hasta = params.hasta;
	const numero_coche = params.numero_coche;
	const sin_reparar = params.sinreparar;

	if (numero_coche === "0" && sin_reparar === "false") {
		novedadesCoches.getByDateRange(desde, hasta, function (novedades) {
			res.send(novedades);
		})
	} else if (numero_coche !== "0" && sin_reparar === "true") {
		novedadesCoches.getByDateRange_NroCoche_SinReparar(desde, hasta, numero_coche, function (novedades) {
			res.send(novedades);
		})
	} else if (numero_coche !== "0" && sin_reparar === "false") {
		novedadesCoches.getByDateRange_IdCoche(desde, hasta, numero_coche, function (novedades) {
			res.send(novedades);
		})
	} else if (numero_coche === "0" && sin_reparar === "true") {
		novedadesCoches.getByDateRange_SinReparar(desde, hasta, function (novedades) {
			res.send(novedades);
		})
	}
}

function getNovedad (req, res) {
	const params = req.params;
	const id_novedad = params.id_novedad;

	novedadesCoches.getById(id_novedad, function (novedad) {
		res.send(novedad[0]);
	});
}

function getDel (req, res) {
	const params = req.params;
	const id_novedad = params.id_novedad;

	novedadesCoches.del(id_novedad, function () {
		res.send('true');
	});
}

function postNroOrden (req, res) {
	const params = req.params;
	const id_novedad = params.id_novedad;
	const nro_orden = params.nro_orden;

	novedadesCoches.updateOrden(id_novedad, nro_orden, function () {
		res.send('true');
	});
}

function postNoOrden (req, res) {
	const params = req.params;
	const id_novedad = params.id_novedad;

	novedadesCoches.updateNoOrden(id_novedad, function () {
		res.send('true');
	});
}

function getModificar (req, res) {
	const params = req.params;
	const id_novedad = params.id_novedad;

	novedadesCoches.getNovedadById(id_novedad, function (novedad) {
		vehiculos.getAll(function (vehiculos) {
			res.render('novedades_modificar', {
				pagename : 'Modificar Novedades de Coche',
				vehiculos : vehiculos,
				novedad : novedad[0]
			});
		});
	});
}

function postModificar (req, res) {
	const params = req.body;
	const id_novedad = params.id_novedad;
	var fecha = params.fecha;
		fecha = tool.changeDate(fecha);
	const numero_vehiculo = params.vehiculo;
	const detalle = params.detalle;

	novedadesCoches.updateNovedadCoche(id_novedad, fecha, numero_vehiculo, detalle, function () {
		res.redirect('/novedades_lista');
	});
}