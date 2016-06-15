const mOrdenesTrabajo = require('../models/mOrdenesTrabajo');
const mVehiculos = require('../models/mVehiculos');
const tool = require('../public/js/utils');

module.exports = {
	getLista : getLista,
	getAlta : getAlta,
	getUltimaOrden : getUltimaOrden,
	postAlta : postAlta,
	getValidarInsert : getValidarInsert,
	getFiltrar : getFiltrar,
	getModificar : getModificar,
	postModificar : postModificar,
	getEliminar : getEliminar,
	getVer : getVer
}

function getLista (req, res) {
	res.render('ordenes_trabajo', {
		pagename : 'Ordenes de Trabajo'
	});
}

function getAlta (req, res) {
	mVehiculos.getAll(function (vehiculos) {
		mOrdenesTrabajo.getMax(function (maxNum) {
			res.render('ordenestrabajo_alta', {
				pagename : 'Alta de Ordenes de Trabajo',
				vehiculos : vehiculos,
				maxNum : maxNum[0].ultimo + 1
			});		
		})
	});
}

function getUltimaOrden (req, res) {
	const params = req.params;
	const nro_coche = params.nro_coche;
	const fecha_hoy = params.fecha_hoy;

	mOrdenesTrabajo.getMaxByIdVehiculo(nro_coche, fecha_hoy, function (id_ordentrabajo) {
		if (id_ordentrabajo.length > 0) {
			mOrdenesTrabajo.getById(id_ordentrabajo[0].id, function (ordentrabajo) {
				res.send(ordentrabajo[0]);
			})
		} else {
			res.send('null');
		}
	});
}

function getValidarInsert (req, res) {
	const params = req.params;
	const numero = params.numero;

	mOrdenesTrabajo.getByNumero(numero, function (orden) {
		if (orden.length > 0) {
			res.send('true');
		} else {
			res.send('false');
		}
	});
}

function postAlta (req, res) {
	const params = req.body;
	const numero = params.numero;
	const nro_coche = params.coches;
	var fecha = params.fecha;
	var fecha_ant = params.fecha_ant;
	var km_hastahoy = params.km_hastahoy;
	var nro_ant = params.nro_ant;
		
	fecha = tool.changeDate(fecha);

	if (fecha_ant !== '') { fecha_ant = tool.changeDate(fecha_ant); }
	if (nro_ant === '') { nro_ant = 0 }
	if (km_hastahoy === '') { km_hastahoy = 0 }

	mOrdenesTrabajo.getByNumero(numero, function (orden) {
		if (orden.length > 0) {
			mOrdenesTrabajo.getMax(function (maxNum) {
				const e_numero = maxNum[0].ultimo + 1;

				mOrdenesTrabajo.insert(e_numero, nro_coche, fecha, fecha_ant, nro_ant, km_hastahoy, function () {
					res.redirect('/ordenes_trabajo');
				});
			});
		} else {
			mOrdenesTrabajo.insert(numero, nro_coche, fecha, fecha_ant, nro_ant, km_hastahoy, function () {
				res.redirect('/ordenes_trabajo');
			});
		}
	});
}

function getFiltrar (req, res) {
	const params = req.params;
	const desde = params.desde;
	const hasta = params.hasta;

	mOrdenesTrabajo.getAllDesdeHasta(desde, hasta, function (ordenes) {
		res.send(ordenes);
	});
}

function getModificar (req, res) {
	const params = req.params;
	const id = params.id;

	mOrdenesTrabajo.getById(id, function (orden) {
		mVehiculos.getByNumero(orden[0].nro_coche, function (vehiculo) {
			res.render('ordenestrabajo_modificar', {
				pagename : 'Modificar Orden de Trabajo',
				vehiculo : vehiculo[0],
				orden : orden[0]
			});
		});
	});
}

function postModificar (req, res) {
	const params = req.body;
	const id = params.id_orden;
	var fecha = params.fecha;

	fecha = tool.changeDate(fecha);

	mOrdenesTrabajo.update(id, fecha, function () {
		res.redirect('/ordenes_trabajo');
	});
}

function getEliminar (req, res) {
	const params = req.params;
	const id = params.id;

	mOrdenesTrabajo.del(id, function () {
		res.send(true);
	});
}

function getVer (req, res) {
	const params = req.params;
	const id = params.id;

	mOrdenesTrabajo.getById(id, function (orden) {
		res.render('ordenestrabajo_ver', {
			pagename : 'Ordenes de Trabajo',
			orden : orden[0]
		});
	});
}