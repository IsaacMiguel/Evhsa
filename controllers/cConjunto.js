var mConjunto = require('../models/mConjunto');
var mAyuda = require('../models/mAyuda');
var mRepuestos = require('../models/mRepuestos');
var mUbicaciones = require('../models/mUbicaciones');
var mVehiculos = require('../models/mVehiculos');
var mUbicacionesNeumaticos = require('../models/mUbicacionesNeumaticos');
var mTipoCubierta = require('../models/mTipoCubierta');

module.exports = {
	getAlta: getAlta,
	getBuscar_Repuesto_x_Codigo: getBuscar_Repuesto_x_Codigo,
	getBuscar_Repuesto_x_Codigo_y_Serie: getBuscar_Repuesto_x_Codigo_y_Serie,
	getVerificar_CodigoySerie: getVerificar_CodigoySerie,
	postAlta: postAlta,
	getVerFicha: getVerFicha,
	getBuscar_Ficha_x_Codigo: getBuscar_Ficha_x_Codigo,
	getBuscar_ConjuntoDefinicion_xCodigo: getBuscar_ConjuntoDefinicion_xCodigo,
	getConjunto_Ficha_Alta: getConjunto_Ficha_Alta,
	postConjuntoFicha_Alta: postConjuntoFicha_Alta,
	getBuscar_Ficha_x_Listado: getBuscar_Ficha_x_Listado,
	getFichas_x_Filtro: getFichas_x_Filtro,
	getModificar: getModificar,
	getDel: getDel,
	postModificar: postModificar,
	getFicha_Modificar: getFicha_Modificar,
	postFicha_Modificar: postFicha_Modificar,
	getFicha_Del: getFicha_Del,
	postBaja: postBaja,
	postRecuperarAlta: postRecuperarAlta,
	getBuscarxCoche: getBuscarxCoche,
	postBuscarxCoche: postBuscarxCoche,
	getFormacionCoche: getFormacionCoche
}

function ActualizarUbicacionesActuales(codigo, serie, cb){
	var bandera = false;

	mConjunto.getFichaWithFechaMax(codigo, serie, function (ficha) {
		const ultima_ubicacion = ficha[0].codigo_ubicacion_actual_fk;
		const ubicacion_neumaticos = ficha[0].codigo_ubicacion_neumatico_fk;
		const numero_coche = ficha[0].numero_coche_colocado_fk;
		// si es hacia coche, updatear tambien ubicacion_neumaticos, sino, sólo ubicacion_actual
		if (ultima_ubicacion == 'C'){
			mConjunto.update_UbicacionActual_onDefinicion(codigo, serie, ultima_ubicacion, function (){
				mConjunto.update_UbicacionCocheActual_onDefinicion(codigo, serie, numero_coche, function (){
					mConjunto.update_UbicacionActualNeumaticos_onDefinicion(codigo, serie, ubicacion_neumaticos, function (){
						bandera = true;
						return cb();
					});
				});
			});
		}else{
			mConjunto.update_UbicacionActual_onDefinicion(codigo, serie, ultima_ubicacion, function (){
				bandera = true;
				return cb();
			});
		}
	});

	// if (bandera)	
	// 	return cb();
	// else
	// 	console.log("ERROR AL ACTUALIZAR LAS UBICACIONES ACTUALES DE ESTE CONJUNTO");
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
	if (valor == '')
		valor = 0;
	var ubicacion = params.ubicacion;
	var experimental = params.experimental;
	var chasis = params.chasis;
	codigo = codigo.toUpperCase();
	var es_neumatico = params.es_neumatico;

	fecha_compra = changeDate(fecha_compra);

	mConjunto.insertDefinicion(codigo, serie, fecha_compra, proveedor, valor, ubicacion, experimental, chasis, es_neumatico, function (){
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

	ActualizarUbicacionesActuales(codigo, serie, function (){
		mConjunto.getBuscar_x_CodigoySerie(codigo, serie, function (conjunto_definicion){
			mConjunto.getBuscar_ConjuntoFicha_x_CodigoySerie(codigo, serie, function (conjunto_fichas){
				res.render("conjunto_verficha", {
					pagename: "Ficha completa de Conjunto",
					conjunto_definicion: conjunto_definicion[0],
					conjunto_fichas: conjunto_fichas,
					es_neumatico: conjunto_definicion[0].es_neumatico
				});
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

	//seguir aca, mostrar si es neumatico en el alta y poner condicionales en los campos que afecta

	mConjunto.getBuscar_x_CodigoySerie(codigo, serie, function (conjunto_definicion){
		mRepuestos.getByCodigo(codigo, function (rep){
			mVehiculos.getAll(function (vehiculos){
				mUbicacionesNeumaticos.getAll(function (ubicaciones_neumaticos){
					mTipoCubierta.getAll(function (tipo_cubiertas){
						mUbicaciones.getAll(function (ubicaciones){
							res.render("conjunto_ficha_alta", {
								pagename: "Alta de Movimiento",
								codigo: codigo,
								serie: serie,
								es_neumatico: conjunto_definicion[0].es_neumatico,
								rep: rep[0],
								vehiculos: vehiculos,
								ubicaciones_neumaticos: ubicaciones_neumaticos,
								tipo_cubiertas: tipo_cubiertas,
								ubicaciones: ubicaciones
							});
						});
					});
				});
			});		
		});
	});	
}

function postConjuntoFicha_Alta(req, res){
	var params = req.body;
	// console.log(params)
	var codigo = params.codigo;
	var serie = params.serie;
	var fecha_movimiento = params.fecha_movimiento;
	fecha_movimiento = changeDate(fecha_movimiento);
	var coche_sacado = params.coche_sacado;
	var coche_colocado = params.coche_colocado;
	var ubicacion_actual = params.ubicacion_actual;
	var destino = params.destino;
	var detalle = params.detalle;
	var costo = params.costo;
	if (costo == '')
		costo = 0;
	var imputado = params.imputado;
	var ubicacion_neumatico = params.ubicacion_neumatico;
	var responsable_reparacion = params.responsable_reparacion;
	var responsable_rotura = params.responsable_rotura;
	var tipo_cubiertas = params.tipo_cubiertas;
	var mm = params.mm;
	if (mm == '')
		mm = 0;
	var suma_estadistica = params.suma_estadistica;
	var es_neumatico = params.es_neumatico;

	switch(ubicacion_actual) {
	    case 'A':
	    	coche_colocado = 0;
	    	ubicacion_neumatico = 'NN';
	    	break;
	    case 'C':
	    	break;
	    case 'P':	    	
	    	coche_colocado = 0;
	    	ubicacion_neumatico = 'NN';
	    	break;
	    case 'T':	    	
	    	coche_colocado = 0;
	    	ubicacion_neumatico = 'NN';
	    	break;
	    case 'B':
	    	coche_colocado = 0;
	    	ubicacion_neumatico = 'NN';
	    	break;
	    default:
	}

	if (es_neumatico == 0){
		tipo_cubiertas = 0;
		mm == 0;
	}

	mConjunto.insertMovimiento(codigo, serie, fecha_movimiento, coche_sacado, coche_colocado, ubicacion_actual, destino, detalle, costo, imputado, ubicacion_neumatico, responsable_reparacion, responsable_rotura, tipo_cubiertas, mm, suma_estadistica, function (){
		ActualizarUbicacionesActuales(codigo, serie, function (){
			res.redirect("conjunto_verficha/"+codigo+"/"+serie);
		});
	});
}

function getBuscar_Ficha_x_Listado(req, res){
	res.render("conjunto_buscarfichaxlista", {
		pagename: "Buscar Fichas por Listado"
	});
}

function getFichas_x_Filtro(req, res){
	var params = req.params;
	var opcion = params.opcion;
	var codigo = params.codigo;
	console.log(params)

	if (codigo != "NOCODE"){
		switch (opcion){
			case 1:
				mConjunto.getAll_xCodigo(codigo, function (fichas){
					res.send(fichas);
				});
				break;
			case 2:
				mConjunto.getAllActivas_xCodigo(codigo, function (fichas){
					res.send(fichas);
				});
				break;
			case 3:
				mConjunto.getAllBajas_xCodigo(codigo, function (fichas){
					res.send(fichas);
				});
				break;
			default:
				mConjunto.getAll_xCodigo(codigo, function (fichas){
					res.send(fichas);
				});
				break;
		}
	}else{
		// get fichas por codigo solo
		switch (opcion){
			case 1:
				mConjunto.getAll(function (fichas){
					res.send(fichas);
				});
				break;
			case 2:
				mConjunto.getAllActivas(function (fichas){
					res.send(fichas);
				});
				break;
			case 3:
				mConjunto.getAllBajas(function (fichas){
					res.send(fichas);
				});
				break;
			default:
				mConjunto.getAll(function (fichas){
					res.send(fichas);
				});
				break;
		}
	}

}

function getModificar(req, res){
	var params = req.params;
	var id = params.id;

	mConjunto.getById(id, function (conjunto){
		res.render("conjunto_modificar", {
			conjunto: conjunto[0]
		});
	});
}

function postModificar(req, res){
	var params = req.body;
	var id = params.id;
	var codigo = params.codigo;
	var denominacion = params.denominacion;
	var serie = params.serie;
	var fecha_compra = params.fecha_compra;
	var proveedor = params.proveedor;
	var valor = params.valor;
	if (valor == '')
		valor = 0;
	var ubicacion = params.ubicacion;
	var experimental = params.experimental;
	var chasis = params.chasis;
	codigo = codigo.toUpperCase();
	var es_neumatico = params.es_neumatico;

	fecha_compra = changeDate(fecha_compra);

	mConjunto.updateDefinicion(id, fecha_compra, proveedor, valor, ubicacion, experimental, chasis, es_neumatico, function (){
		ActualizarUbicacionesActuales(codigo, serie, function (){
			res.redirect("conjunto_buscarfichaxlistado");
		});
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;

	// console.log("rubroEnRep.length")
	// traer la definicion, para sacar codigo y serie,
	// que se fije en conjunto_fichas si tiene 'movimientos',
	// si tiene, alerta que no se puede borrar porque tiene movimientos y que se dirija al listado de movimientos y elimine todos
	// si no tiene, borra.

	mConjunto.getById(id, function (conjunto){
		conjunto = conjunto[0];
		mConjunto.getBuscar_ConjuntoFicha_x_CodigoySerie(conjunto.codigo, conjunto.serie, function (conjunto_ficha){
			// console.log(conjunto_ficha.length)
			// console.log("conjunto_ficha.length")
			if (conjunto_ficha.length > 0){
				res.render("error", {
					error: "El Conjunto no puede ser eliminado porque posee movimientos. Elimine todos los movimientos y vuelva a intentarlo."
				});
			}else{
				mConjunto.del(id, function (){
					res.redirect("conjunto_buscarfichaxlistado")
				});
			}
		});
	});
}

function getFicha_Modificar(req, res){
	var params = req.params;
	var id = params.id;

	mConjunto.getBuscar_ConjuntoFicha_ById(id, function (ficha){
		var codigo = ficha[0].codigo;
		var serie = ficha[0].serie;
		mConjunto.getBuscar_x_CodigoySerie(codigo, serie, function (conjunto_definicion){
			mRepuestos.getByCodigo(codigo, function (rep){
				mVehiculos.getAll(function (vehiculos){
					mUbicacionesNeumaticos.getAll(function (ubicaciones_neumaticos){
						mTipoCubierta.getAll(function (tipo_cubiertas){
							mUbicaciones.getAll(function (ubicaciones){
								res.render("conjunto_ficha_modificar", {
									ficha: ficha[0],
									es_neumatico: conjunto_definicion[0].es_neumatico,
									vehiculos: vehiculos,
									ubicaciones_neumaticos: ubicaciones_neumaticos,
									tipo_cubiertas: tipo_cubiertas,
									ubicaciones: ubicaciones,
									ubicacion_actual: ficha[0].codigo_ubicacion_actual_fk
								});
							});
						});
					});
				});
			});
		});
	});
}

function postFicha_Modificar(req, res){
	var params = req.body;
	var id = params.id;
	var codigo = params.codigo;
	var serie = params.serie;
	var fecha_movimiento = params.fecha_movimiento;
	fecha_movimiento = changeDate(fecha_movimiento);
	var coche_sacado = params.coche_sacado;
	var coche_colocado = params.coche_colocado;
	var ubicacion_actual = params.ubicacion_actual;
	var destino = params.destino;
	var detalle = params.detalle;
	var costo = params.costo;
	if (costo == '')
		costo = 0;
	var imputado = params.imputado;
	var ubicacion_neumatico = params.ubicacion_neumatico;
	var responsable_reparacion = params.responsable_reparacion;
	var responsable_rotura = params.responsable_rotura;
	var tipo_cubiertas = params.tipo_cubiertas;
	var mm = params.mm;
	if (mm == '')
		mm = 0;
	var suma_estadistica = params.suma_estadistica;
	var es_neumatico = params.es_neumatico;

	switch(ubicacion_actual) {
	    case 'A':
	    	coche_colocado = 0;
	    	ubicacion_neumatico = 'NN';
	    	break;
	    case 'C':
	    	break;
	    case 'P':	    	
	    	coche_colocado = 0;
	    	ubicacion_neumatico = 'NN';
	    	break;
	    case 'T':	    	
	    	coche_colocado = 0;
	    	ubicacion_neumatico = 'NN';
	    	break;
	    case 'B':
	    	coche_colocado = 0;
	    	ubicacion_neumatico = 'NN';
	    	break;
	    default:
	}

	if (es_neumatico == 0){
		tipo_cubiertas = 0;
		mm == 0;
	}

	mConjunto.updateMovimiento(id, fecha_movimiento, coche_sacado, coche_colocado, ubicacion_actual, destino, detalle, costo, imputado, ubicacion_neumatico, responsable_reparacion, responsable_rotura, tipo_cubiertas, mm, suma_estadistica, function (){
		ActualizarUbicacionesActuales(codigo, serie, function (){
			res.redirect("conjunto_verficha/"+codigo+"/"+serie);
		});
	});

}

function getFicha_Del(req, res){
	var params = req.params;
	var id = params.id;

	mConjunto.getBuscar_ConjuntoFicha_ById(id, function (ficha){
		var codigo = ficha[0].codigo;
		var serie = ficha[0].serie;
		mConjunto.del_Ficha(id, function (){
			res.redirect("conjunto_verficha/"+codigo+"/"+serie);
		});
	});
}

function postBaja(req, res){
	var params = req.params;
	var id = params.id;
	var fecha_baja = params.fecha_baja;
	var motivo_baja = params.motivo_baja;

	mConjunto.postBaja(id, fecha_baja, motivo_baja, function (asd){
		// console.log(asd);
		res.send(asd);
	});
}

function postRecuperarAlta(req, res){
	var params = req.params;
	var id = params.id;

	mConjunto.postRecuperarAlta(id, function (asd){
		res.send(asd);
	});
}

function getBuscarxCoche(req, res){
	res.render("conjunto_buscarxcoche", {
		pagename: "Buscar Formacion de Coche"
	});
}

function postBuscarxCoche(req, res){
	var params = req.body;
	var nro_coche = params.nro_coche;
	
	res.redirect("conjunto_formacioncoche/"+nro_coche);	
}

// SEGUIR ACA

function getFormacionCoche(req, res) {
	var params = req.params;
	var numero = params.numero;

	mConjunto.getFormacionCoche(numero, function (formacion) {
		console.log(formacion)
		res.render("conjunto_formacioncoche", {
			pagename: "Formacion de Coche Nro "+numero,
			formacion: formacion
		});
	});
}