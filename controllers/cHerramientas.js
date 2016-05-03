var mHerramientas = require('../models/mHerramientas');
var mRepuestos = require('../models/mRepuestos');
var mUbicacionesHerramientas = require('../models/mUbicacionesHerramientas');
var mUsuarios = require('../models/mUsuarios');
var tools = require('../public/js/utils');

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
	postModificarFechaCambio : postModificarFechaCambio,
	getContromensual : getContromensual
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
			'desde' : params.desde, 
			'hasta' : params.hasta
		}

		mHerramientas.getByFecha(data, function (herramientas) {
			res.send(herramientas);
		});

	} else {
		var data = {
			'desde' : params.desde, 
			'hasta' : params.hasta, 
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
	var codigo = params.codigo;
	var descripcion = params.descripcion;

	if (codigo === 'false') {
		mRepuestos.getByDescripcion(descripcion, function (repuestos) {
			res.send(repuestos);
		});
	} else {
		if (descripcion === 'false') { descripcion = ''}

		mRepuestos.getByCodigoLike(
			codigo, 
			descripcion, 
				function (repuestos) {
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
	var fecha_movimiento = tools.changeDate(params.fecha_movimiento);
	var nro_recibo = params.nro_recibo;
	var valor = params.valor;
	var cantidad = params.cantidad;
	
	if (!nro_recibo) { var nro_recibo = 0 }
	if (!valor) { var valor = 0 }
	if (!cantidad) { var cantidad = 0 }

	if (params.fecha_cambio === 'on') {
		var fecha_cambio = tools.generateTodayDateYMD();
	} else {
		var fecha_cambio = '0000-00-00';
	}

	var data = {
		codigo : params.codigo,
		unica_usuariodestino_fk : params.usuario_destino,
		id_ubicacionherramientas_fk : params.ubicacion,
		fecha_movimiento : fecha_movimiento,
		nro_recibo : nro_recibo,
		unica_operador_fk : req.session.user.unica,
		marca : params.marca,
		lugar_compra : params.lugar_compra,
		valor : valor,
		cantidad : cantidad,
		fecha_cambio : fecha_cambio
	}

	mHerramientas.insert(data, function () {
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
						pagename : 'Modificar de Herramientas',
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
	var fecha_movimiento = tools.changeDate(params.fecha_movimiento);
	var nro_recibo = params.nro_recibo;
	var valor = params.valor;
	var cantidad = params.cantidad;
	
	if (!nro_recibo) { var nro_recibo = 0 }
	if (!valor) { var valor = 0 }
	if (!cantidad) { var cantidad = 0 }

	if (params.fecha_cambio === 'on') {
		var fecha_cambio = tools.generateTodayDateYMD();
	} else {
		var fecha_cambio = '0000-00-00';
	}

	var data = {
		id_herramienta : params.id_herramienta,
		unica_usuariodestino_fk : params.usuario_destino,
		id_ubicacionherramientas_fk : params.ubicacion,
		fecha_movimiento : fecha_movimiento,
		nro_recibo : nro_recibo,
		unica_operador_fk : req.session.user.unica,
		marca : params.marca,
		lugar_compra : params.lugar_compra,
		valor : valor,
		cantidad : cantidad,
		fecha_cambio : fecha_cambio
	}

	mHerramientas.update(data, function () {
		res.redirect('herramientas_lista');
	});
}

function getEliminar (req, res) {
	var params = req.params;

	mHerramientas.del(params.id_herramienta, function () {
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

	mHerramientas.updateUbicacion(
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
		var opcion = tools.generateTodayDateYMD();
	}

	mHerramientas.updateFechaCambio(
		params.id_herramienta,
		opcion, 
			function () {
				res.send(true)
			});
}

// function getContromensual (req, res) {
// 	mUsuarios.getAllUsuarios(function (operarios) {
// 		res.render('herramientas_controlmensual', {
// 			pagename : 'Control Mensual',
// 			operarios : operarios
// 		});
// 	});
// }