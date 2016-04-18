var mHerramientas = require('../models/mHerramientas');
var mRepuestos = require('../models/mRepuestos');

module.exports = {
	getLista : getLista,
	getFiltrar : getFiltrar,
	getAlta : getAlta,
	getRepuestos : getRepuestos
}

function getLista (req, res) {
	res.render('herramientas_lista', {
		pagename : 'Lista de Herramientas'
	});
}

function getFiltrar (req, res) {
	var params = req.params;

	if (params.denominacion === 'NoName') {
		var data = {
			'date1' : params.date1, 
			'date2' : params.date2
		}

		mHerramientas.getByFecha(data, function (herramientas) {
			res.send(herramientas);
		});

	} else {
		var data = {
			'date1' : params.date1, 
			'date2' : params.date2, 
			'denominacion' : params.denominacion
		}

		mHerramientas.getByFecha_Nombre(data, function (herramientas) {
			res.send(herramientas);
		});
	}
}

function getAlta (req, res) {
	res.render('herramientas_alta_filtro', {
		pagename : 'Filtro de alta de Herramientas'
	});
}

function getRepuestos (req, res) {
	var params = req.params;

	if (params.codigo !== false) {
		mRepuestos.getByCodigo(params.codigo, function (repuestos) {
			res.send(repuestos);
		});
	} else {
		mRepuestos.getByDescripcion(params.descripcion, function (repuestos) {
			res.send(repuestos);
		});
	}
}