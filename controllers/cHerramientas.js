var mHerramientas = require('../models/mHerramientas');

module.exports = {
	getLista : getLista,
	getFiltrar : getFiltrar
}

function getLista(req, res) {
	res.render('herramientas_lista', {
		pagename : 'Lista de Herramientras'
	});
}

function getFiltrar (req, res) {
	var params = req.params;

	if (params.toolName === 'NoName') {
		var data = {
			'date1' : params.date1, 
			'date2' : params.date2, 
			'toolname' : params.toolName
		}

		mHerramientas.getByFecha_Nombre(data, function (herramientas) {
			res.send(herramientas);
		});

	} else {
		var data = {
			'date1' : params.date1, 
			'date2' : params.date2
		}

		mHerramientas.getByFecha(data, function (herramientas) {
			res.send(herramientas);
		});
	}
}