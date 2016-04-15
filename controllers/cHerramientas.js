var mHerramientas = require('../models/mHerramientas');

module.exports = {
	getLista
}

function getLista (req, res) {
	res.render('herramientas_lista', {
		pagename : 'Lista de Herramientras'
	});
}