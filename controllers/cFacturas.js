const mFacturas = require("../models/mFacturas");
const mProveedores = require("../models/mProveedores");
const mRepuestos = require("../models/mRepuestos");

const tool = require("../public/js/utils");

module.exports = {
	getLista : getLista,
	getAlta : getAlta,
	getByFiltro : getByFiltro,
	postAlta : postAlta,
	getRepuesto : getRepuesto,
	getModFactura : getModFactura,
	postModificar : postModificar,
	getDelete : getDelete,
	getVer : getVer
}

function getLista (req, res) {
	res.render("facturas_lista", {
		pagename : "Lista de Facturas"
	});
}

function getAlta (req, res) {
	mFacturas.getUltima(function (factura) {
		mProveedores.getAll(function (proveedores) {
			res.render("facturas_alta", {
				pagename : "Alta de Facturas",
				factura : factura[0],
				proveedores : proveedores
			});
		});
	});
}

function getByFiltro (req, res) {
	const params = req.params;
	const desde = params.desde;
	const hasta = params.hasta;
	const filtro = params.filtro;


	switch (filtro) {
		case "0":
			res.status(404);

			break;
		case "1":
			mFacturas.getByAltas(desde, hasta, function (facturas) {
				res.send(facturas);
			});

			break;
		case "2":
			mFacturas.getByBajas(desde, hasta, function (facturas) {
				res.send(facturas);
			});

			break;
		case "3":
			mFacturas.getAll(desde, hasta, function (facturas) {
				res.send(facturas);
			});

			break;
	}
}

function postAlta (req, res) {
	const params = req.body;

	var fecha = params.fecha;
	const id_operario_fk = req.session.user.unica;
	const nro_comprobante = params.nro_comprobante;
	const codigo1 = params.codigo1;
	const codigo2 = params.codigo2;
	var codigo_articulo_fk = "";
	const importe = params.valor_t;
	const id_proveedor_fk = params.id_proveedor;
	const cantidad = params.cantidad;
	var mueve = params.mueve;
	var detalle = params.detalle;

	fecha = tool.changeDate(fecha);

	if (codigo1 != "" || codigo2 != "") {
		codigo_articulo_fk = codigo1 + "." + codigo2;
		codigo_articulo_fk = codigo_articulo_fk.toUpperCase();
	} else {
		codigo_articulo_fk = "";
	}
	
	if (mueve === "on") {
		mueve = "S";
	} else {
		mueve = "N";
	}

	detalle = detalle.trim();

	mFacturas.insert(fecha, id_operario_fk, nro_comprobante, codigo_articulo_fk, importe, id_proveedor_fk, cantidad, mueve, detalle, function () {
		res.redirect("/facturas");
	});
}

function getRepuesto (req, res) {
	const params = req.params;
	const codigo = params.codigo;

	mFacturas.getValorRepuesto(codigo, function (valor) {
		res.send(valor[0]);
	});
}

function getModFactura (req, res) {
	const params = req.params;
	const id = params.id;

	mFacturas.getById(id, function (factura) {
		mProveedores.getAll(function (proveedores) {
			const codigo = factura[0].codigo_articulo_fk;
			mRepuestos.getByCodigo(codigo, function (repuesto) {
				const codigo1 = codigo.substring(0, 4);
				const codigo2 = codigo.substring(5, 8);

				res.render("facturas_modificar", {
					pagename : "Modificar Factura",
					factura : factura[0],
					proveedores : proveedores,
					codigo1 : codigo1,
					codigo2 : codigo2,
					repuesto : repuesto[0]
				});
			});
		});
	});
}

function postModificar (req, res) {
	const params = req.body;

	const id_factura = params.id_factura;
	var fecha = params.fecha;
	const id_operario_fk = req.session.user.unica;
	const nro_comprobante = params.nro_comprobante;
	const codigo1 = params.codigo1;
	const codigo2 = params.codigo2;
	var codigo_articulo_fk = "";
	const importe = params.valor_t;
	const id_proveedor_fk = params.id_proveedor;
	const cantidad = params.cantidad;
	var mueve = params.mueve;
	var detalle = params.detalle;

	fecha = tool.changeDate(fecha);

	if (codigo1 != "" || codigo2 != "") {
		codigo_articulo_fk = codigo1 + "." + codigo2;
		codigo_articulo_fk = codigo_articulo_fk.toUpperCase();
	} else {
		codigo_articulo_fk = "";
	}
	
	if (mueve === "on") {
		mueve = "S";
	} else {
		mueve = "N";
	}

	detalle = detalle.trim();

	mFacturas.update(id_factura, fecha, id_operario_fk, nro_comprobante, codigo_articulo_fk, importe, id_proveedor_fk, cantidad, mueve, detalle, function () {
		res.redirect("/facturas");
	});
}

function getDelete (req, res) {
	const params = req.params;
	const id_factura = params.id;

	mFacturas.del(id_factura, function () {
		res.redirect("/facturas");
	});
}

function getVer (req, res) {
	const params = req.params;
	const id = params.id;

	mFacturas.getVer(id, function (factura) {
		res.render("facturas_ver", {
			pagename : "Modificar Factura",
			factura : factura[0]
		});
	});
}