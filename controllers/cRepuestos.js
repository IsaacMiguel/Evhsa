//requiriendo modelo mensaje.js:
const mRepuestos = require('../models/mRepuestos');
const mBorro = require('../models/mBorro');
const mRubros = require('../models/mRubros');
const mRubosGrupos = require('../models/mGrupoRubros');
// const mVerificacion = require('../models/mVerificacion');
const mAyuda = require('../models/mAyuda');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getCantRepuestosEnRubroById: getCantRepuestosEnRubroById,
	getFiltro : getFiltro
}

function getLista(req, res) {
	req.session.nromenu = 3;
	mRubros.getAll(function (rubros){
		mRubosGrupos.getAll(function (rubros_grupo) {
			res.render('repuestoslista', {
				pagename: 'Archivo de Repuestos',
				rubros_grupo : rubros_grupo,
				rubros: rubros
			});
		});
	});
}

function getAlta(req, res){
	mRubros.getAll(function (rubros){
		res.render('repuestosalta', {
			pagename: 'Alta de Repuestos',
			rubros: rubros
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	const id_rubro = params.rubro;
	const codigo1 = params.codigo1;
	const codigo2 = params.codigo2;
	const nombre = params.nombre;
	const stock = params.stock;
	const valor = params.valor;
	const calle = params.calle;
	const modulo = params.modulo;
	const estante = params.estante;
	const minimo = params.minimo;
	const maximo = params.maximo;
	const descripcion = params.descripcion;
	const marca = params.marca;
	
	if (marca == 'on')
		marca = 1;
	else
		marca = 0;

	const observaciones = params.observaciones;
	const puntopedido = params.puntopedido;
	const coche = params.coche;

	const codigo = codigo1 + codigo2;
	mRepuestos.getByCodigo(codigo, function (repuesto){
		if (repuesto[0]==null){
			mRepuestos.insert(codigo, nombre, stock, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, observaciones, puntopedido, coche, id_rubro, function (){
				res.redirect('repuestoslista');
			});
		}else{
			res.render('error', {
      			error: "Codigo de Repuesto existente. Intente con otro Codigo."
      		});
		}
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;
	
	mRubros.getAll(function (rubros){
		mRepuestos.getById(id, function (repuesto){
			const codigo = repuesto[0].codigo;
			const codigo1 = codigo.substring(0, 5);
			const codigo2 = codigo.substring(5, 8);
			
			res.render("repuestosmodificar", {
				pagename: "Modificar Repuesto",
				repuesto: repuesto[0],
				codigo1: codigo1,
				codigo2: codigo2,
				rubros: rubros
			});
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const id_repuesto = params.id;
	const id_rubro = params.rubro;
	const codigo1 = params.codigo1;
	const codigo2 = params.codigo2;
	const nombre = params.nombre;
	const stock = params.stock;
	const valor = params.valor;
	const calle = params.calle;
	const modulo = params.modulo;
	const estante = params.estante;
	const minimo = params.minimo;
	const maximo = params.maximo;
	const descripcion = params.descripcion;
	const marca = params.marca;
	
	if (marca == 'on')
		marca = 1;
	else
		marca = 0;

	const observaciones = params.observaciones;
	const puntopedido = params.puntopedido;
	const coche = params.coche;

	const codigo = codigo1 + codigo2;

	mRepuestos.getByCodigo(codigo, function (repuestosporcodigo){
		if (repuestosporcodigo.length == 0){
			mRepuestos.update(id_repuesto, codigo, nombre, stock, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, observaciones, puntopedido, id_rubro, function(){
				res.redirect('repuestoslista');
			});
		}else{
			if (repuestosporcodigo.length == 1){
				if (repuestosporcodigo[0].id == id){
					mRepuestos.update(id_repuesto, codigo, nombre, stock, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, observaciones, puntopedido, id_rubro, function(){
				res.redirect('repuestoslista');
			});
				}else{				
					res.render('error', {
      			error: "Codigo de Repuesto existente. Intente con otro Codigo."
      		});
		   	}
			}else{
				var aparece = false;
				
				for (var i = 0 ; i < repuestosporcodigo.length ; i++) {
					if (repuestosporcodigo[i].id == id){
						console.log(i+": aca está!")
						aparece = true;
						break;
					}else{
						console.log(i+": aca no está.")
					}
				}
				
				if (aparece) {
					res.render('error', {
      			error: "Codigo de Repuesto existente. Intente con otro Codigo."
      		});
				}else{
					res.render('error', {
      			error: "Codigo de Repuesto existente. Intente con otro Codigo.."
      		});
				}
			}			
    }
	});	
}

function getDel(req, res){
	const params = req.params;
	const id_repuesto = params.id;

	mRepuestos.del(id_repuesto, function (){
		res.redirect('repuestoslista');
	});
}

function getCantRepuestosEnRubroById(req, res){
	const params = req.params;
	const id_rubro = params.id_rubro;

	mRepuestos.getCantRepuestosEnRubroById(id_rubro, function (repuestos){
		res.send(repuestos);
	})
}

function getFiltro (req, res) {
	const params = req.params;
	const filtro = params.filtro;
	var paramA = params.paramA;
	var paramB = params.paramB;

	switch (filtro) {
		case '1':
			mRepuestos.getAll(function (data) {
				res.send(data);
			});

			break;

		case '2':
			mRepuestos.getByLetter(paramA, function (data) {
				res.send(data);
			});

			break;

		case '3':
			mRepuestos.getByCodigoLista(paramA, function (data) {
				res.send(data);
			});

			break;

		case '4':
			mRepuestos.getByCalle(paramA, function (data) {
				res.send(data);
			});

			break;

		case '5':
			mRepuestos.getByModulo(paramA, function (data) {
				res.send(data);
			});

			break;

		case '6':
			mRepuestos.getByEstante(paramA, function (data) {
				res.send(data);
			});

			break;

		case '7':
			mRepuestos.getByAsterisco(function (data) {
				res.send(data);
			});

			break;

		case '8':
			mRepuestos.getByResumido(paramA, paramB, function (data) {
				res.send(data);
			});

			break;

		case '9':
			mRepuestos.getByFaltantes(function (data) {
				res.send(data);
			});

			break;
	}
}