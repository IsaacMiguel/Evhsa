var mConjunto = require('../models/mConjunto');
var mAyuda = require('../models/mAyuda');
var mRepuestos = require('../models/mRepuestos');
var mUbicaciones = require('../models/mUbicaciones');

module.exports = {
	getAlta: getAlta,
	getBuscar_Repuesto_x_Codigo: getBuscar_Repuesto_x_Codigo,
	getBuscar_Repuesto_x_Codigo_y_Serie: getBuscar_Repuesto_x_Codigo_y_Serie,
	getVerificar_CodigoySerie: getVerificar_CodigoySerie,
	// getBuscar_ConjuntoFicha_x_CodigoySerie: getBuscar_ConjuntoFicha_x_CodigoySerie,
	postAlta: postAlta,
	getVerFicha: getVerFicha,
	getBuscar_Ficha_x_Codigo: getBuscar_Ficha_x_Codigo,
	getBuscar_ConjuntoDefinicion_xCodigo: getBuscar_ConjuntoDefinicion_xCodigo,
	getConjunto_Ficha_Alta: getConjunto_Ficha_Alta
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getAlta(req, res) {
	// req.session.nromenu = 3;
	res.render('conjunto_alta', {
		pagename: 'Alta de Conjunto'
	});
}

function getBuscar_Repuesto_x_Codigo(req, res){
	var params = req.params;
	var codigo = params.codigo;

	mRepuestos.getByCodigo(codigo, function (rep){
		res.send(rep[0]);
	});
}

function getBuscar_Repuesto_x_Codigo_y_Serie(req, res){
	var params = req.params;
	var codigo = params.codigo;
	var serie = params.serie;

	mRepuestos.getByCodigo_y_Serie(codigo, serie, function (rep){
		res.send(rep[0]);
	});
}

function getVerificar_CodigoySerie(req, res){
	var params = req.params;
	var codigo = params.codigo;
	var serie = params.serie;

	mConjunto.getBuscar_x_CodigoySerie(codigo, serie, function (conjunto){
		res.send(conjunto);
	});
}

// function getBuscar_ConjuntoFicha_x_CodigoySerie(req, res){
// 	var params = req.params;
// 	var codigo = params.codigo;
// 	var serie = params.serie;

// 	mConjunto.getBuscar_ConjuntoFicha_x_CodigoySerie(codigo, serie, function (conjunto_ficha){
// 		res.send(conjunto_ficha);
// 	});
// }


function postAlta(req, res){
	var params = req.body;
	var codigo1 = params.codigo1;
	var codigo2 = params.codigo2;
	var codigo = codigo1+"."+codigo2;
	var denominacion = params.denominacion;
	var serie = params.serie;
	var fecha_compra = params.fecha_compra;
	var proveedor = params.proveedor;
	var valor = params.valor;
	var ubicacion = params.ubicacion;
	var experimental = params.experimental;
	var chasis = params.chasis;

	fecha_compra = changeDate(fecha_compra);

	mConjunto.insert(codigo, serie, fecha_compra, proveedor, valor, ubicacion, experimental, chasis, function (){
		res.render('conjunto_alta', {
			pagename: 'Alta de Conjunto'
		});
	});
}

function getBuscar_Ficha_x_Codigo(req, res){
	var params = req.params;
	var codigo = params.codigo;
	var serie = params.serie;

	res.render('conjunto_buscarfichaxcodigo',{
		pagename: 'Buscar Ficha por Codigo y N° Serie'
	});
}

function getVerFicha(req, res){
	var params = req.params;
	var codigo = params.codigo;
	var serie = params.serie;

	mConjunto.getBuscar_x_CodigoySerie(codigo, serie, function (conjunto_definicion){
		mConjunto.getBuscar_ConjuntoFicha_x_CodigoySerie(codigo, serie, function (conjunto_ficha){
			res.render("conjunto_verficha", {
				pagename: "Ficha completa de Conjunto",
				conjunto_definicion: conjunto_definicion[0],
				conjunto_ficha: conjunto_ficha
			});
		});
	});
}

function getBuscar_ConjuntoDefinicion_xCodigo(req, res){
	var params = req.params;
	var codigo = params.codigo;

	mConjunto.getBuscar_ConjuntoDefinicion_xCodigo(codigo, function (conjunto_definicion){
		res.send(conjunto_definicion);
	});
}

function getConjunto_Ficha_Alta(req, res){
	var params = req.params;
	var codigo = params.codigo;
	var serie = params.serie;

	res.render("conjunto_ficha_alta", {
		pagename: "Alta de Movimiento",
		codigo: codigo,
		serie: serie
	});
}



// 
function getDel(req, res){
	var params = req.params;
	var id = params.id;
	mConjunto.getById(id, function (rubro){
	  	rubro = rubro[0];
	  	mRepuestos.getRubroEnRepById(id, function (rubroEnRep){
	  		// console.log(rubroEnRep.length)
	  		if (rubroEnRep.length == 0){
	  			mBorro.add(req.session.user.usuario,"Rubro", "Borra. Nombre Rubro: "+ rubro.nombre + ", id: " + id ,function(){
			  		mConjunto.del(id, function(){
			    		res.redirect('/rubroslista'); 
			  		});
				});
	  		}else{
	  			res.render('error', {
	      			error: "No se puede eliminar este Rubro. Posee registros en la base de datos 'Repuestos'."
	      		});
	  		}
	  	});
	}); 
}