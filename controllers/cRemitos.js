var mProveedores = require('../models/mProveedores');
var mRemitos = require('../models/mRemitos');

module.exports = {
	getLista : getLista,
	getListaProveedores : getListaProveedores,
	getListaRemitos : getListaRemitos,
	getRemito : getRemito
}

function getLista (req, res) {
	res.render('remitos_lista', {
		pagename : 'Listado de Remitos'
	});
}

function getListaProveedores (req, res) {
	var params = req.params;

	mProveedores.getAll(function (proveedores) {
		res.send(proveedores);
	});
}

function getListaRemitos (req, res) {
	var params = req.params;
	var opcion = params.opcion;
	var buscar = params.buscar;
	var desde = params.desde;
	var hasta = params.hasta;

	switch (opcion) {
		case '1':
			mRemitos.getRemitosEntrefechas(desde, hasta, function (remitos) {
				res.send(remitos);
			});

			break;

		case '2':
			mRemitos.getRemitosXProveedores(buscar, desde, hasta, function (remitos) {
				res.send(remitos);
			});

			break;

		case '3':
			mRemitos.getRemitosXEstado(buscar, function (remitos) {
				res.send(remitos);
			});

			break;

		default:
			res.redirect('/');

			break;
	}
}

function getRemito (req, res) {
	var params = req.params;
	var id_remito1 = params.id_remito1;

	mRemitos.getVerRemito(id_remito1, function (remito) {
		res.send(remito);
	})
}