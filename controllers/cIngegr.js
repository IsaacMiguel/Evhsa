//requiriendo modelo mensaje.js:
var mIngegr = require('../models/mIngegr');
var mBorro = require('../models/mBorro');
// var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');
var mCodigosIE = require('../models/mCodigosIE');

module.exports = {
	getLista: getLista,
	getDesdeHasta: getDesdeHasta,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	req.session.nromenu = 3;

	res.render('ingegr_lista', {
		pagename: 'Archivo de Registros de Ingresos/Egresos'
	});
}

function getDesdeHasta(req, res){
	var params = req.params;
	var desde = params.desde;
	var hasta = params.hasta;

	desde = changeDate(desde);
	hasta = changeDate(hasta);

	mIngegr.getDesdeHasta(desde, hasta, function (ingegr){
		res.send(ingegr);
	});
}

function getAlta(req, res){
	mCodigosIE.getAll(function (codigos){
		res.render('ingegr_alta', {
			pagename: 'Alta de Registro de Ingreso/Egreso',
			codigos: codigos
		});
	});
}

function postAlta(req, res){
	var params = req.body;
	var fecha = params.fecha;
	var codigo = params.codigo;
	var operador = req.session.user.unica;
	var importe = params.importe;

	fecha = changeDate(fecha);

	mCodigosIE.getById(codigo, function (ingegr){
		if (ingegr[0] != null){
			var tipo = ingegr[0].tipo;
			mIngegr.insert(fecha, codigo, tipo, operador, importe, function(){
				res.redirect('ingegr_lista');
			});
		}else{
			res.render('error', {
      			error: "Error: No existe ese codigo de ingreso/egreso."
      		});
      	}
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mCodigosIE.getAll(function (codigos){
		mIngegr.getById(id, function (ingegr){
			// console.log(codigos)
			// console.log(ingegr)
			res.render('ingegr_modificar',{
				pagename: 'Modificar Registro de Ingreso/Egreso',
				codigos: codigos,
				ingegr: ingegr[0]
			});
		});
});
}

function postModificar(req, res){
	var params = req.body;
	var id = params.id;
	var fecha = params.fecha;
	var codigo = params.codigo;
	var importe = params.importe;

	fecha = changeDate(fecha);
	mCodigosIE.getById(codigo, function (ingegr){
		if (ingegr[0] != null){
			var tipo = ingegr[0].tipo;
			mIngegr.update(id, fecha, codigo, tipo, importe, function (){
				res.redirect("ingegr_lista");
			});
		}else{
			res.render('error', {
      			error: "Error: No existe ese codigo de ingreso/egreso."
      		});
      	}
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;

	mBorro.add(req.session.user.usuario,"Ingegr", "Borra.", function(){
		mIngegr.del(id, function(){
			res.redirect('/ingegr_lista'); 
		});
	});
}