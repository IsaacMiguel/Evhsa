var conn = require('../config/db').conn;

module.exports = {
	getAllRepuestos: getAllRepuestos,
	getAllRubros: getAllRubros,
	getVehiculos: getVehiculos,
	getFive: getFive,
	getOperariosTemp: getOperariosTemp,
	getOtrosGastos_Temp: getOtrosGastos_Temp,
	getOperarios: getOperarios,
	getEquipos_temp : getEquipos_temp,
	getFic2: getFic2,
	getFico: getFico,
	getFico2015: getFico2015,
	getPagol: getPagol,
	getPagol2015: getPagol2015,
	getHerramientas_temp : getHerramientas_temp,
	getRemitos_temp : getRemitos_temp
}	

function getAllRepuestos(cb){
	conn("select * from repuestos", cb);
}

function getAllRubros(cb){
	conn("select * from rubros", cb);
}

function getVehiculos(cb){
	conn("select * from vehiculos", cb);
}

function getFive(cb){
	conn("select * from five_temp", cb);
}

function getOperariosTemp(cb){
	conn("Select * from operarios_temp", cb);
}

function getOtrosGastos_Temp(cb){
	conn("select * from otrosgastos_temp where fecha > '2010-01-01'", cb);
}

function getOperarios(cb){
	conn("select * from secr", cb);
}

function getEquipos_temp (cb) {
	conn("select * from equipos_temp", cb);
}

function getFic2(cb){
	conn("select * from fic2", cb);
}

function getFico(cb){
	conn("select * from fico", cb);
}

function getFico2015(cb){
	conn("SELECT * FROM `fico` where fecha like '2015%' ORDER BY id", cb);
}

function getPagol(cb){
	conn("SELECT * from temp_pagol", cb);
}

function getPagol2015(cb){
	conn("SELECT * from temp_pagol where fecha like '2015-05%' ORDER BY id", cb);
}

function getHerramientas_temp(cb){
	conn("SELECT * FROM herramientas_temp", cb);
}

function getRemitos_temp(cb){
	conn("SELECT * FROM remitos_temp", cb);
}