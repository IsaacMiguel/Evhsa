var mHerramientas = require('../models/mHerramientas');

module.exports = {
	getLista,
	getFiltrar
}

function getLista (req, res) {
	res.render('herramientas_lista', {
		pagename : 'Lista de Herramientras'
	});
}

function getFiltrar (req, res) {
	var params = req.params;

	mHerramientas.getLista(
		params.date1,
		params.date2,
		params.toolName, function (herramientas) {
			
		});
}