//requiriendo modelo mensaje.js:
var mEquipos = require('../models/mEquipos');

module.exports = {
	getLista : getLista
}

function getLista (req, res) {
	mEquipos.getAll(function (equipos) {
		res.render('equiposlista', {
			pagename : 'Lista de Equipos',
			equipos : equipos
		});
	});
}