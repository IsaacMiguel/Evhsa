//requiriendo modelo mensaje.js:
const mVales = require('../models/mVales');
const mBorro = require('../models/mBorro');
// const mVerificacion = require('../models/mVerificacion');
const mAyuda = require('../models/mAyuda');
const mValesDestinos = require('../models/mValesDestinos');
const mRepuestos = require('../models/mRepuestos');

module.exports = {
	getLista: getLista,
	getValesFiltroFecha: getValesFiltroFecha,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getVer: getVer,
	getAltaRepuesto: getAltaRepuesto,
	postAltaRepuesto: postAltaRepuesto,
	getModificarRepuesto: getModificarRepuesto,
	postModificarRepuesto: postModificarRepuesto,
	getDelRepuesto: getDelRepuesto
}

function changeDate(date){
	// input: dd/mm/yyyy
	const fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	res.render('vales_lista', {
		pagename: 'Archivo de Vales'
	});
}

function getValesFiltroFecha(req, res){
	const params = req.params;
	var desde = params.desde;
	var hasta = params.hasta;
	// console.log(params)
	desde = changeDate(desde);
	hasta = changeDate(hasta);

	mVales.getByFecha(desde, hasta, function (vales){
		res.send(vales);
	});
}

function getAlta(req, res){
	var proximo_nro_vale = 0;
	mValesDestinos.getAll(function (vales_destinos){
		mVales.getLastNroVale(function (ultimo_nro_vale) {
			// console.log(ultimo_nro_vale)
			// console.log(ultimo_nro_vale.length)
			if (ultimo_nro_vale.length != 0){
				proximo_nro_vale = ultimo_nro_vale[0].nro_vale+1;
			}else{
				proximo_nro_vale = proximo_nro_vale+1;
			}
			res.render('vales_alta', {
				pagename: 'Alta de Vales',
				proximo_nro_vale: proximo_nro_vale,
				vales_destinos: vales_destinos
			});
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	// console.log(req.session);
	const responsable = params.responsable;
	const nro_vale = params.nro_vale;
	const fecha = params.fecha;
	const destino = params.destino;
	var nro_coche = params.nro_coche;
	if (nro_coche == '')
		nro_coche = 0;
	var carro = params.carro;
	const codigo = params.codigo;
	const serie = params.serie;
	var nro_equipo = params.nro_equipo
	const operario = req.session.user.unica;
	if (nro_equipo == '')
		nro_equipo = 0;
	// console.log(operario)

	switch (destino){
		case "0":
			console.log("ERRORRRRR")
			break;
		case "COCHE":	
			break;
		case "CONJUNTO":
		case "OTROS":
		case "EQUIPO":
			carro = "N";
			break;
	}

	mVales.insertVale(nro_vale, fecha, destino, nro_coche, carro, codigo, serie, nro_equipo, operario, responsable, function (){
		mVales.getByNroVale(nro_vale, function (vale){
			const id_vale1 = vale[0].id;
			res.redirect("vales_ver/"+id_vale1);
		});
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mValesDestinos.getAll(function (vales_destinos){
		mVales.getById(id, function (vale){
			console.log(vale[0])
			res.render('vales_modificar',{
				pagename: 'Modificar Vale',
				vale: vale[0],
				vales_destinos: vales_destinos
			});
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	console.log(params)
	const id = params.id;
	const responsable = params.responsable;
	const destino = params.destino;
	var nro_coche = params.nro_coche;
	var carro = params.carro;
	
	if (destino != 'Coche'){
		nro_coche = 0;
		carro = 'N'
	}

	mVales.updateVale(id, responsable, nro_coche, carro, function (){
		res.redirect("vales_lista");
	});
}

function getDel(req, res){
	const params = req.params;
	const id_vale1 = params.id;
	
	mVales.getById(id_vale1, function (vale1){
		const nro_vale = vale1[0].nro_vale;
		mVales.getVales2_ByNroVale(nro_vale, function (vales2){
		  	if (vales2.length == 0){
	  			mBorro.add(req.session.user.usuario,"Vales1", "Borra Vales 1, id: " + id_vale1 ,function(){
			  		mVales.del(id_vale1, function(){
			    		res.redirect('/vales_lista'); 
			  		});
				});
	  		}else{
	  			res.render('error', {
	      			error: "No se puede eliminar este Vale porque posee movimientos. Elimine todos los movimientos y luego podrá eliminarlo."
	      		});
	  		}
	  	});
	});
}

function getVer(req, res){
	const params = req.params;
	const id_vale1 = params.id;

	mVales.getById(id_vale1, function (vale1){
		const nro_vale = vale1[0].nro_vale;
		mVales.getVales2_ByNroVale(nro_vale, function (vales2){
			console.log(vales2)
			res.render("vales_ver", {
				pagename: "Vale de Pañol: Detalle",
				vale1: vale1[0],
				vales2: vales2
			});		
		});
	});
}

function getAltaRepuesto(req, res){
	const params = req.params;
	const id_vale1 = params.id_vale1;
	mVales.getById(id_vale1, function (vale1){
		mRepuestos.getAll(function (repuestos){
			res.render("vales_alta_repuesto", {
				pagename: "Alta de Repuesto",
				vale1: vale1[0],
				repuestos: repuestos
			});
		});
	});
}

function postAltaRepuesto(req, res){
	const params = req.body;
	const id_vale1 = params.id_vale1;
	const nro_vale = params.nro_vale;
	const codigo_repuesto = params.repuesto;
	const precio = params.precio;
	const cantidad = params.cantidad;

	mVales.insertRepuesto(nro_vale, codigo_repuesto, precio, cantidad, function (){
		res.redirect("vales_ver/"+id_vale1);
	});
}

function getModificarRepuesto(req, res){
	const params = req.params;
	const id_vale2 = params.id_vale2;
	const id_vale1 = params.id_vale1;

	mVales.getVales2_ById(id_vale2, function (vale2){
		res.render("vales_modificar_repuesto", {
			pagename: "Modificar Repuesto",
			vale2: vale2[0],
			id_vale1: id_vale1
		});
	});
}

function postModificarRepuesto(req, res){
	const params = req.body;
	const id_vale1 = params.id_vale1;
	const id_vale2 = params.id_vale2;
	const nro_vale = params.nro_vale
	const precio = params.precio;
	const cantidad = params.cantidad;

	mVales.updateRepuesto(id_vale2, precio, cantidad, function (){
		res.redirect("vales_ver/"+id_vale1);
	});
}

function getDelRepuesto(req, res){
	const params = req.params;
	const id_vale1 = params.id_vale1;
	const id_vale2 = params.id_vale2;

	mVales.delRepuesto(id_vale2, function (){
		res.redirect("vales_ver/"+id_vale1);
	});
}

