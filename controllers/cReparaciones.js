//requiriendo modelo mensaje.js:
const mReparaciones = require('../models/mReparaciones');
const mBorro = require('../models/mBorro');
const mAyuda = require('../models/mAyuda');
const mVehiculos = require('../models/mVehiculos');
const mUsuarios = require('../models/mUsuarios');
const mVales = require('../models/mVales');
const mLineas = require('../models/mLineas');

module.exports = {
	getLista: getLista,
	getReparacionesFiltroFecha: getReparacionesFiltroFecha,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getCheckNroVale: getCheckNroVale
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	req.session.nromenu = 3;
	res.render('reparaciones_lista', {
		pagename: 'Archivo de Reparaciones de Emergencia'
	});
}

function getAlta(req, res){
	mVehiculos.getAll(function (vehiculos){
		mUsuarios.getAllUsuarios(function (usuarios){
			mLineas.getAll(function (lineas){
				res.render("reparaciones_alta", {
					pagename: "Alta de Reparacion de Emergencia",
					coches: vehiculos,
					usuarios: usuarios,
					lineas: lineas
				});
			});
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	console.log(params)
	var fecha = params.fecha;
	fecha = changeDate(fecha);
	const modo2 = params.modo2;
	const nro_coche = params.nro_coche;
	const servicio = params.servicio;
	const linea = params.linea;
	const chofer = params.chofer;
	var hora_aviso = params.hora_aviso;
	const aviso_medio = params.aviso_medio;
	const aviso_recibio = params.aviso_recibio;
	const aviso_desde = params.aviso_desde;
	const parado_en = params.parado_en;
	const corte_en = params.corte_en;
	const desperfecto = params.desperfecto;
	const coord_turno = params.coord_turno;
	const responsable1 = params.responsable1;
	const responsable2 = params.responsable2;
	var reparacion_hora_inicio = params.reparacion_hora_inicio;
	const reparacion_detalle = params.reparacion_detalle;
	var reparacion_hora_fin = params.reparacion_hora_fin;
	var vale1 = params.vale1;
	if (vale1 == '')
		vale1 = 0;
	var vale2 = params.vale2;
	if (vale2 == '')
		vale2 = 0;
	var vale3 = params.vale3;
	if (vale3 == '')
		vale3 = 0;
	const probado = params.probado;
	const pendiente = params.pendiente;
	const reemplazo = params.reemplazo;
	var reemplazo_desde = params.reemplazo_desde;
	var reemplazo_hasta = params.reemplazo_hasta;
	var reemplazo_coche = params.reemplazo_coche;
	if (reemplazo_coche == '')
		reemplazo_coche = 0;
	var reemplazo_chofer = params.reemplazo_chofer;
	const retoma = params.retoma;
	var retoma_hora = params.retoma_hora;
	var horas_perdidas = params.horas_perdidas;
	const retoma_chofer = params.retoma_chofer;
	var km_perdidos = params.km_perdidos;
	if (km_perdidos == '')
		km_perdidos = 0;
	const informe_texto = params.informe_texto;
	var informe_horafin = params.informe_horafin;

	mReparaciones.insert(fecha, modo2, nro_coche, servicio, linea, chofer, hora_aviso, aviso_desde, aviso_medio, aviso_recibio, parado_en, corte_en, desperfecto, coord_turno, responsable1, responsable2, reparacion_hora_inicio, reparacion_detalle, reparacion_hora_fin, vale1, vale2, vale3, probado, pendiente, reemplazo, reemplazo_desde, reemplazo_hasta, reemplazo_coche, reemplazo_chofer, retoma, retoma_hora, horas_perdidas, retoma_chofer, km_perdidos, informe_texto, informe_horafin, function (){
		res.redirect("reparaciones_lista");
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;
	mReparaciones.getById(id, function (reparacion){
		console.log(reparacion[0])
		mVehiculos.getAll(function (vehiculos){
			mUsuarios.getAllUsuarios(function (usuarios){
				mLineas.getAll(function (lineas){
					res.render("reparaciones_modificar", {
						pagename: "Modificar Reparacion de Emergencia",
						reparacion: reparacion[0],
						coches: vehiculos,
						usuarios: usuarios,
						lineas: lineas
					});
				});
			});
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	console.log(params)
	const id = params.id;
	var fecha = params.fecha;
	fecha = changeDate(fecha);
	const modo2 = params.modo2;
	const nro_coche = params.nro_coche;
	const servicio = params.servicio;
	const linea = params.linea;
	const chofer = params.chofer;
	var hora_aviso = params.hora_aviso;
	const aviso_medio = params.aviso_medio;
	const aviso_recibio = params.aviso_recibio;
	const aviso_desde = params.aviso_desde;
	const parado_en = params.parado_en;
	const corte_en = params.corte_en;
	const desperfecto = params.desperfecto;
	const coord_turno = params.coord_turno;
	const responsable1 = params.responsable1;
	const responsable2 = params.responsable2;
	var reparacion_hora_inicio = params.reparacion_hora_inicio;
	const reparacion_detalle = params.reparacion_detalle;
	var reparacion_hora_fin = params.reparacion_hora_fin;
	var vale1 = params.vale1;
	if (vale1 == '')
		vale1 = 0;
	var vale2 = params.vale2;
	if (vale2 == '')
		vale2 = 0;
	var vale3 = params.vale3;
	if (vale3 == '')
		vale3 = 0;
	const probado = params.probado;
	const pendiente = params.pendiente;
	const reemplazo = params.reemplazo;
	var reemplazo_desde = params.reemplazo_desde;
	var reemplazo_hasta = params.reemplazo_hasta;
	var reemplazo_coche = params.reemplazo_coche;
	if (reemplazo_coche == '')
		reemplazo_coche = 0;
	var reemplazo_chofer = params.reemplazo_chofer;
	const retoma = params.retoma;
	var retoma_hora = params.retoma_hora;
	var horas_perdidas = params.horas_perdidas;
	const retoma_chofer = params.retoma_chofer;
	var km_perdidos = params.km_perdidos;
	if (km_perdidos == '')
		km_perdidos = 0;
	const informe_texto = params.informe_texto;
	var informe_horafin = params.informe_horafin;

	mReparaciones.update(id, fecha, modo2, nro_coche, servicio, linea, chofer, hora_aviso, aviso_desde, aviso_medio, aviso_recibio, parado_en, corte_en, desperfecto, coord_turno, responsable1, responsable2, reparacion_hora_inicio, reparacion_detalle, reparacion_hora_fin, vale1, vale2, vale3, probado, pendiente, reemplazo, reemplazo_desde, reemplazo_hasta, reemplazo_coche, reemplazo_chofer, retoma, retoma_hora, horas_perdidas, retoma_chofer, km_perdidos, informe_texto, informe_horafin, function (){
		res.redirect("reparaciones_lista");
	});
}

function getDel(req, res){
	const params = req.params;
	const id = params.id;

	mReparaciones.del(id, function (){
		res.redirect("reparaciones_lista");
	});
}

function getReparacionesFiltroFecha(req, res){
	const params = req.params;
	var desde = params.desde;
	var hasta = params.hasta;

	desde = changeDate(desde);
	hasta = changeDate(hasta);

	mReparaciones.getBetweenFecha(desde, hasta, function (reparaciones){
		res.send(reparaciones);
	});
}

function getCheckNroVale(req, res){
	const params = req.params;
	const nro_vale = params.nro_vale;

	mVales.getByNroVale(nro_vale, function (vale){
		res.send(vale);
	});
}