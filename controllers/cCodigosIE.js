//requiriendo modelo mensaje.js:
var mCodigosIE = require('../models/mCodigosIE');
var mBorro = require('../models/mBorro');
// var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');
var mRepuestos = require('../models/mRepuestos');
var mIngegr = require("../models/mIngegr");

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
}

function getLista(req, res) {
	req.session.nromenu = 3;
  	mCodigosIE.getAll(function (codigos){
  		// console.log(codigos)  
  		res.render('codigosie_lista', {
			pagename: 'Archivo de Codigos de Ingreso/Egreso',
			codigos: codigos
		});
  	});
}

function getAlta(req, res){
	res.render('codigosie_alta', {
		pagename: 'Alta de Nuevo Codigo de Ingreso/Egreso'
	});
}


function postAlta(req, res){
	const params = req.body;
	const nombre = params.nombre;
	const tipo = params.tipo;
	const  cuenta = params.cuenta;

	mCodigosIE.insert(nombre, tipo, cuenta, function(){
		res.redirect('codigosie_lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mCodigosIE.getById(id, function (codigo){
		res.render('codigosie_modificar',{
			pagename: 'Modificar Codigo de Ingreso/Egreso',
			codigo: codigo[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const nombre = params.nombre;
	const tipo = params.tipo;
	var activo = params.activo;
	if (activo == 'on')
		activo = 1;
	else
		activo = 0;
	const  cuenta = params.cuenta;

	mCodigosIE.update(id, nombre, tipo, activo, cuenta, function(){
		res.redirect('codigosie_lista');
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;

  	mIngegr.getById_codigoie(id, function (ingegr){
  		// console.log(rubroEnRep.length)
  		if (ingegr.length == 0){
  			mBorro.add(req.session.user.usuario, "CodigosIE", "Borra.", function(){
		  		mCodigosIE.del(id, function(){
		    		res.redirect('/codigosie_lista'); 
		  		});
			});
  		}else{
  			res.render('error', {
      			error: "No se puede eliminar este Codigo. Posee registros en la base de datos 'Ingresos/Egresos'."
      		});
  		}
  	});
}