var conn = require('../config/db').conn;

module.exports = {
	getAllRepuestos: getAllRepuestos,
	getAllRubros: getAllRubros,
	getVehiculos: getVehiculos,
	getFive: getFive,
	getOperariosTemp: getOperariosTemp,
	getOtrosGastos_Temp: getOtrosGastos_Temp,
	getOperarios: getOperarios,
	getEquipos_temp : getEquipos_temp
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