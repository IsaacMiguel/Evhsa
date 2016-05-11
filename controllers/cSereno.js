module.exports = {
	getLista : getLista
}

function getLista (req, res) {
	res.render('sereno_lista', {
		pagename : 'Listado Herramientas Sereno'
	});
}