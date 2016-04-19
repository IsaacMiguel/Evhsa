var mHerramientas = require('../models/mHerramientas');
var mRepuestos = require('../models/mRepuestos');
var mUbicacionesHerramientas = require('../models/mUbicacionesHerramientas');
var mUsuarios = require('../models/mUsuarios');

module.exports = {
	getLista : getLista,
	getFiltrar : getFiltrar,
	getAlta : getAlta,
	getRepuestos : getRepuestos,
	getAltaForm : getAltaForm,
	postAlta : postAlta,
	getVer : getVer
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
	console.log("codigo repuesto: " + params.codigo)

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
	
	if (!params.nro_recibo) { var nro_recibo = 0 }
	if (!params.valor) { var valor = 0 }
	if (!params.cantidad) { var cantidad = 0 }

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
		fecha_cambio : params.fecha_cambio
	}

	mHerramientas.insertHerramienta(data, function () {
		res.redirect('herramientas_lista');
	});
}

function getVer (req, res) {
	var id_herramienta = req.params.id_herramienta;

	mHerramientas.getById(id_herramienta, function (herramienta) {
		console.log("herramienta : ")
		for(var a in herramienta){
			console.log(herramienta[a]);
		}
		
		res.render('herramientas_ver', {
			pagename : 'Ver Herramienta',
			herramienta : herramienta
		});
	});
}