var mHerramientas = require('../models/mHerramientas');
var mRepuestos = require('../models/mRepuestos');
var mUbicacionesHerramientas = require('../models/mUbicacionesHerramientas');
var mUsuarios = require('../models/mUsuarios');
var utils = require('../public/js/utils');

module.exports = {
	getLista : getLista,
	getFiltrar : getFiltrar,
	getAlta : getAlta,
	getRepuestos : getRepuestos,
	getAltaForm : getAltaForm,
	postAlta : postAlta,
	getVer : getVer,
	getModificar : getModificar,
	postModificar : postModificar,
	getEliminar : getEliminar,
	getUbicaciones : getUbicaciones,
	postHerramientasUbicacion : postHerramientasUbicacion,
	postModificarFechaCambio : postModificarFechaCambio
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

	if (params.codigo === 'false') {
		mRepuestos.getByDescripcion(params.descripcion, function (repuestos) {
			res.send(repuestos);
		});
	} else {
		mRepuestos.getByCodigoLike(params.codigo, function (repuestos) {
			res.send(repuestos);
		});
	}
}

function getAltaForm (req, res) {
	var params = req.params;

	mRepuestos.getByCodigo(params.codigo, function (repuesto) {
		mUbicacionesHerramientas.getAll(function (ubicaciones) {
			mUsuarios.getAllUsuarios(function (usuarios) {
				res.render('herramientas_alta_form', {
					pagename : 'Alta de Herramientas',
					repuesto : repuesto,
					ubicaciones : ubicaciones,
					usuarios : usuarios
				});
			});
		});
	});
}

function postAlta (req, res) {
	var params = req.body;
	var nro_recibo = params.nro_recibo;
	var valor = params.valor;
	var cantidad = params.cantidad;
	
	if (!nro_recibo) { var nro_recibo = 0 }
	if (!valor) { var valor = 0 }
	if (!cantidad) { var cantidad = 0 }

	if (params.fecha_cambio === 'on') {
		var fecha_cambio = utils.generateTodayDateYMD();
	} else {
		var fecha_cambio = '0000-00-00';
	}

	var data = {
		codigo : params.codigo,
		unica_usuariodestino_fk : params.usuario_destino,
		id_ubicacionherramientas_fk : params.ubicacion,
		fecha_movimiento : params.fecha_movimiento,
		nro_recibo : nro_recibo,
		unica_operador_fk : req.session.user.unica,
		marca : params.marca,
		lugar_compra : params.lugar_compra,
		valor : valor,
		cantidad : cantidad,
		fecha_cambio : fecha_cambio
	}

	mHerramientas.insertHerramienta(data, function () {
		res.redirect('herramientas_lista');
	});
}

function getVer (req, res) {
	var id_herramienta = req.params.id_herramienta;

	mHerramientas.getById(id_herramienta, function (herramienta) {		
		res.render('herramientas_ver', {
			pagename : 'Ver Herramienta',
			herramienta : herramienta
		});
	});
}

function getModificar (req, res) {
	var id_herramienta = req.params.id_herramienta;

	mHerramientas.getById(id_herramienta, function (herramienta) {
		mRepuestos.getByCodigo(herramienta[0].codigo, function (repuesto) {
			mUbicacionesHerramientas.getAll(function (ubicaciones) {
				mUsuarios.getAllUsuarios(function (usuarios) {
					res.render('herramientas_modificar', {
						pagename : 'Alta de Herramientas',
						herramienta : herramienta,
						repuesto : repuesto,
						ubicaciones : ubicaciones,
						usuarios : usuarios
					});
				});
			});
		});
	});
}

function postModificar (req, res) {
	var params = req.body;
	var nro_recibo = params.nro_recibo;
	var valor = params.valor;
	var cantidad = params.cantidad;
	
	if (!nro_recibo) { var nro_recibo = 0 }
	if (!valor) { var valor = 0 }
	if (!cantidad) { var cantidad = 0 }

	if (params.fecha_cambio === 'on') {
		var fecha_cambio = utils.generateTodayDateYMD();
	} else {
		var fecha_cambio = '0000-00-00';
	}

	var data = {
		id_herramienta : params.id_herramienta,
		unica_usuariodestino_fk : params.usuario_destino,
		id_ubicacionherramientas_fk : params.ubicacion,
		fecha_movimiento : params.fecha_movimiento,
		nro_recibo : nro_recibo,
		unica_operador_fk : req.session.user.unica,
		marca : params.marca,
		lugar_compra : params.lugar_compra,
		valor : valor,
		cantidad : cantidad,
		fecha_cambio : fecha_cambio
	}

	mHerramientas.updateHerramienta(data, function () {
		res.redirect('herramientas_lista');
	});
}

function getEliminar (req, res) {
	var params = req.params;

	mHerramientas.deleteHerramienta(params.id_herramienta, function () {
		res.redirect('herramientas_lista');
	});
}

function getUbicaciones (req, res) {
	mUbicacionesHerramientas.getAll(function (ubicaciones) {
		res.send(ubicaciones);
	});
}

function postHerramientasUbicacion (req, res) {
	var id_herramienta = req.body.id_herramienta_form;
	var id_ubicacion = req.body.id_ubicacion_form;

	console.log("id_herramienta: " + id_herramienta)
	console.log("id_ubicacion: " + id_ubicacion)

	mHerramientas.updateHeramientasUbicacion(
		id_herramienta,
		id_ubicacion, 
			function () {
				res.redirect('herramientas_lista');
			});
}

function postModificarFechaCambio (req, res) {
	var params = req.params;

	if (params.opcion === 'true') {
		var opcion = '0000-00-00';
	} else {
		var opcion = utils.generateTodayDateYMD();
	}

	mHerramientas.updateHerramientasFechaCambio(
		params.id_herramienta,
		opcion, 
			function () {
				res.send(true)
			});
}