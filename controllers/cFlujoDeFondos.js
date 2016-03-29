//requiriendo modelo mensaje.js:
var mFlujoDeFondos = require('../models/mFlujoDeFondos');
var mBorro = require('../models/mBorro');
var mAyuda = require('../models/mAyuda');

var nodeExcel = require('excel-export');

module.exports = {
	getIndex: getIndex,
	postGeneracion: postGeneracion,
	getGeneracion_Excel: getGeneracion_Excel
}

function getIndex(req, res) {
	// req.session.nromenu = 3;
	res.render('flujodefondos_index', {
		pagename: 'Generacion de Reporte de Flujo de Fondos'
	});
}

var formatNumber = {
	separador: ",", // separador para los miles
	sepDecimal: ".", // separador para los decimales
	formatear:function (num){
		num +='';
		var splitStr = num.split('.');
		var splitLeft = splitStr[0];
		var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
		var regx = /(\d+)(\d{3})/;
		while (regx.test(splitLeft)) {
			splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
		}
		return this.simbol + splitLeft +splitRight;
	},
	new:function(num, simbol){
		this.simbol = simbol ||'';
		return this.formatear(num);
	}
}// formatNumber.new(123456779.18); // retorna "123.456.779,18"

function postGeneracion(req, res){
	var params = req.body;
	var anio = params.anio;
	var mes = params.mes;

	var saldo_inicial = {'saldoi01': 0};
	var deficit = {};

	mFlujoDeFondos.getIngresos(anio, mes, function (ingresos){
		// console.log(ingresos)
		mFlujoDeFondos.getTotalIngresos(anio, mes, function (total_ingresos){
			// console.log(total_ingresos)
			mFlujoDeFondos.getEgresos(anio, mes, function (egresos){			
				mFlujoDeFondos.getTotalEgresos(anio, mes, function (total_egresos){
					mFlujoDeFondos.getSaldosDiarios(anio, mes, function (saldos_diarios){
						// console.log(saldos_diarios)
						mFlujoDeFondos.getSaldosDiariosSinFormat(anio, mes, function (saldos_diarios_sinformat){
							var saldos_diarios_sinformat = saldos_diarios_sinformat[0];

							deficit.def01 = saldos_diarios_sinformat.saldo01 + saldo_inicial.saldoi01;
							deficit.def01 = deficit.def01;
							saldo_inicial.saldoi02 = deficit.def01;
							deficit.def02 = saldos_diarios_sinformat.saldo02 + saldo_inicial.saldoi02;
							saldo_inicial.saldoi03 = deficit.def02;
							deficit.def03 = saldos_diarios_sinformat.saldo03 + saldo_inicial.saldoi03;							
							saldo_inicial.saldoi04 = deficit.def03;
							deficit.def04 = saldos_diarios_sinformat.saldo04 + saldo_inicial.saldoi04;
							saldo_inicial.saldoi05 = deficit.def04;
							deficit.def05 = saldos_diarios_sinformat.saldo05 + saldo_inicial.saldoi05;
							saldo_inicial.saldoi06 = deficit.def05;
							deficit.def06 = saldos_diarios_sinformat.saldo06 + saldo_inicial.saldoi06;
							saldo_inicial.saldoi07 = deficit.def06;
							deficit.def07 = saldos_diarios_sinformat.saldo07 + saldo_inicial.saldoi07;
							saldo_inicial.saldoi08 = deficit.def07;
							deficit.def08 = saldos_diarios_sinformat.saldo08 + saldo_inicial.saldoi08;
							saldo_inicial.saldoi09 = deficit.def08;
							deficit.def09 = saldos_diarios_sinformat.saldo09 + saldo_inicial.saldoi09;
							saldo_inicial.saldoi10 = deficit.def09;
							deficit.def10 = saldos_diarios_sinformat.saldo10 + saldo_inicial.saldoi10;
							saldo_inicial.saldoi11 = deficit.def10;
							deficit.def11 = saldos_diarios_sinformat.saldo11 + saldo_inicial.saldoi11;
							saldo_inicial.saldoi12 = deficit.def11;
							deficit.def12 = saldos_diarios_sinformat.saldo12 + saldo_inicial.saldoi12;
							saldo_inicial.saldoi13 = deficit.def12;
							deficit.def13 = saldos_diarios_sinformat.saldo13 + saldo_inicial.saldoi13;
							saldo_inicial.saldoi14 = deficit.def13;
							deficit.def14 = saldos_diarios_sinformat.saldo14 + saldo_inicial.saldoi14;
							saldo_inicial.saldoi15 = deficit.def14;
							deficit.def15 = saldos_diarios_sinformat.saldo15 + saldo_inicial.saldoi15;
							saldo_inicial.saldoi16 = deficit.def15;
							deficit.def16 = saldos_diarios_sinformat.saldo16 + saldo_inicial.saldoi16;
							saldo_inicial.saldoi17 = deficit.def16;
							deficit.def17 = saldos_diarios_sinformat.saldo17 + saldo_inicial.saldoi17;
							saldo_inicial.saldoi18 = deficit.def17;
							deficit.def18 = saldos_diarios_sinformat.saldo18 + saldo_inicial.saldoi18;
							saldo_inicial.saldoi19 = deficit.def18;
							deficit.def19 = saldos_diarios_sinformat.saldo19 + saldo_inicial.saldoi19;
							saldo_inicial.saldoi20 = deficit.def19;
							deficit.def20 = saldos_diarios_sinformat.saldo20 + saldo_inicial.saldoi20;
							saldo_inicial.saldoi21 = deficit.def20;
							deficit.def21 = saldos_diarios_sinformat.saldo21 + saldo_inicial.saldoi21;
							saldo_inicial.saldoi22 = deficit.def21;
							deficit.def22 = saldos_diarios_sinformat.saldo22 + saldo_inicial.saldoi22;
							saldo_inicial.saldoi23 = deficit.def22;
							deficit.def23 = saldos_diarios_sinformat.saldo23 + saldo_inicial.saldoi23;
							saldo_inicial.saldoi24 = deficit.def23;
							deficit.def24 = saldos_diarios_sinformat.saldo24 + saldo_inicial.saldoi24;
							saldo_inicial.saldoi25 = deficit.def24;
							deficit.def25 = saldos_diarios_sinformat.saldo25 + saldo_inicial.saldoi25;
							saldo_inicial.saldoi26 = deficit.def25;
							deficit.def26 = saldos_diarios_sinformat.saldo26 + saldo_inicial.saldoi26;
							saldo_inicial.saldoi27 = deficit.def26;
							deficit.def27 = saldos_diarios_sinformat.saldo27 + saldo_inicial.saldoi27;
							saldo_inicial.saldoi28 = deficit.def27;
							deficit.def28 = saldos_diarios_sinformat.saldo28 + saldo_inicial.saldoi28;
							saldo_inicial.saldoi29 = deficit.def28;
							deficit.def29 = saldos_diarios_sinformat.saldo29 + saldo_inicial.saldoi29;
							saldo_inicial.saldoi30 = deficit.def29;
							deficit.def30 = saldos_diarios_sinformat.saldo30 + saldo_inicial.saldoi30;
							saldo_inicial.saldoi31 = deficit.def30;
							deficit.def31 = saldos_diarios_sinformat.saldo31 + saldo_inicial.saldoi31;

							saldo_inicial.saldoi01 = formatNumber.new(saldo_inicial.saldoi01.toFixed(2));
							saldo_inicial.saldoi02 = formatNumber.new(saldo_inicial.saldoi02.toFixed(2));
							saldo_inicial.saldoi03 = formatNumber.new(saldo_inicial.saldoi03.toFixed(2));
							saldo_inicial.saldoi04 = formatNumber.new(saldo_inicial.saldoi04.toFixed(2));
							saldo_inicial.saldoi05 = formatNumber.new(saldo_inicial.saldoi05.toFixed(2));
							saldo_inicial.saldoi06 = formatNumber.new(saldo_inicial.saldoi06.toFixed(2));
							saldo_inicial.saldoi07 = formatNumber.new(saldo_inicial.saldoi07.toFixed(2));
							saldo_inicial.saldoi08 = formatNumber.new(saldo_inicial.saldoi08.toFixed(2));
							saldo_inicial.saldoi09 = formatNumber.new(saldo_inicial.saldoi09.toFixed(2));
							saldo_inicial.saldoi10 = formatNumber.new(saldo_inicial.saldoi10.toFixed(2));
							saldo_inicial.saldoi11 = formatNumber.new(saldo_inicial.saldoi11.toFixed(2));
							saldo_inicial.saldoi12 = formatNumber.new(saldo_inicial.saldoi12.toFixed(2));
							saldo_inicial.saldoi13 = formatNumber.new(saldo_inicial.saldoi13.toFixed(2));
							saldo_inicial.saldoi14 = formatNumber.new(saldo_inicial.saldoi14.toFixed(2));
							saldo_inicial.saldoi15 = formatNumber.new(saldo_inicial.saldoi15.toFixed(2));
							saldo_inicial.saldoi16 = formatNumber.new(saldo_inicial.saldoi16.toFixed(2));
							saldo_inicial.saldoi17 = formatNumber.new(saldo_inicial.saldoi17.toFixed(2));
							saldo_inicial.saldoi18 = formatNumber.new(saldo_inicial.saldoi18.toFixed(2));
							saldo_inicial.saldoi19 = formatNumber.new(saldo_inicial.saldoi19.toFixed(2));
							saldo_inicial.saldoi20 = formatNumber.new(saldo_inicial.saldoi20.toFixed(2));
							saldo_inicial.saldoi21 = formatNumber.new(saldo_inicial.saldoi21.toFixed(2));
							saldo_inicial.saldoi22 = formatNumber.new(saldo_inicial.saldoi22.toFixed(2));
							saldo_inicial.saldoi23 = formatNumber.new(saldo_inicial.saldoi23.toFixed(2));
							saldo_inicial.saldoi24 = formatNumber.new(saldo_inicial.saldoi24.toFixed(2));
							saldo_inicial.saldoi25 = formatNumber.new(saldo_inicial.saldoi25.toFixed(2));
							saldo_inicial.saldoi26 = formatNumber.new(saldo_inicial.saldoi26.toFixed(2));
							saldo_inicial.saldoi27 = formatNumber.new(saldo_inicial.saldoi27.toFixed(2));
							saldo_inicial.saldoi28 = formatNumber.new(saldo_inicial.saldoi28.toFixed(2));
							saldo_inicial.saldoi29 = formatNumber.new(saldo_inicial.saldoi29.toFixed(2));
							saldo_inicial.saldoi30 = formatNumber.new(saldo_inicial.saldoi30.toFixed(2));
							saldo_inicial.saldoi31 = formatNumber.new(saldo_inicial.saldoi31.toFixed(2));

							deficit.def01 = formatNumber.new(deficit.def01.toFixed(2));
							deficit.def02 = formatNumber.new(deficit.def02.toFixed(2));
							deficit.def03 = formatNumber.new(deficit.def03.toFixed(2));
							deficit.def04 = formatNumber.new(deficit.def04.toFixed(2));
							deficit.def05 = formatNumber.new(deficit.def05.toFixed(2));
							deficit.def06 = formatNumber.new(deficit.def06.toFixed(2));
							deficit.def07 = formatNumber.new(deficit.def07.toFixed(2));
							deficit.def08 = formatNumber.new(deficit.def08.toFixed(2));
							deficit.def09 = formatNumber.new(deficit.def09.toFixed(2));
							deficit.def10 = formatNumber.new(deficit.def10.toFixed(2));
							deficit.def11 = formatNumber.new(deficit.def11.toFixed(2));
							deficit.def12 = formatNumber.new(deficit.def12.toFixed(2));
							deficit.def13 = formatNumber.new(deficit.def13.toFixed(2));
							deficit.def14 = formatNumber.new(deficit.def14.toFixed(2));
							deficit.def15 = formatNumber.new(deficit.def15.toFixed(2));
							deficit.def16 = formatNumber.new(deficit.def16.toFixed(2));
							deficit.def17 = formatNumber.new(deficit.def17.toFixed(2));
							deficit.def18 = formatNumber.new(deficit.def18.toFixed(2));
							deficit.def19 = formatNumber.new(deficit.def19.toFixed(2));
							deficit.def20 = formatNumber.new(deficit.def20.toFixed(2));
							deficit.def21 = formatNumber.new(deficit.def21.toFixed(2));
							deficit.def22 = formatNumber.new(deficit.def22.toFixed(2));
							deficit.def23 = formatNumber.new(deficit.def23.toFixed(2));
							deficit.def24 = formatNumber.new(deficit.def24.toFixed(2));
							deficit.def25 = formatNumber.new(deficit.def25.toFixed(2));
							deficit.def26 = formatNumber.new(deficit.def26.toFixed(2));
							deficit.def27 = formatNumber.new(deficit.def27.toFixed(2));
							deficit.def28 = formatNumber.new(deficit.def28.toFixed(2));
							deficit.def29 = formatNumber.new(deficit.def29.toFixed(2));
							deficit.def30 = formatNumber.new(deficit.def30.toFixed(2));
							deficit.def31 = formatNumber.new(deficit.def31.toFixed(2));

							res.render("flujodefondos_reporte", {
								anio: anio,
								mes: mes,
								ingresos: ingresos,
								egresos: egresos,
								total_ingresos: total_ingresos[0],
								total_egresos: total_egresos[0],
								saldos_diarios: saldos_diarios[0],
								saldo_inicial: saldo_inicial,
								deficit: deficit
							});
						});						
					});
				});
			});
		});		
	});
}

function getGeneracion_Excel(req, res){
	var params = req.params;
	var anio = params.anio;
	var mes = params.mes;

	var saldo_inicial = {'saldoi01': 0};
	var deficit = {};

	mFlujoDeFondos.getIngresos(anio, mes, function (ingresos){
		mFlujoDeFondos.getTotalIngresos(anio, mes, function (total_ingresos){
			mFlujoDeFondos.getEgresos(anio, mes, function (egresos){			
				mFlujoDeFondos.getTotalEgresos(anio, mes, function (total_egresos){
					mFlujoDeFondos.getSaldosDiarios(anio, mes, function (saldos_diarios){
						mFlujoDeFondos.getSaldosDiariosSinFormat(anio, mes, function (saldos_diarios_sinformat){
							var saldos_diarios_sinformat = saldos_diarios_sinformat[0];

							deficit.def01 = saldos_diarios_sinformat.saldo01 + saldo_inicial.saldoi01;
							deficit.def01 = deficit.def01;
							saldo_inicial.saldoi02 = deficit.def01;
							deficit.def02 = saldos_diarios_sinformat.saldo02 + saldo_inicial.saldoi02;
							saldo_inicial.saldoi03 = deficit.def02;
							deficit.def03 = saldos_diarios_sinformat.saldo03 + saldo_inicial.saldoi03;							
							saldo_inicial.saldoi04 = deficit.def03;
							deficit.def04 = saldos_diarios_sinformat.saldo04 + saldo_inicial.saldoi04;
							saldo_inicial.saldoi05 = deficit.def04;
							deficit.def05 = saldos_diarios_sinformat.saldo05 + saldo_inicial.saldoi05;
							saldo_inicial.saldoi06 = deficit.def05;
							deficit.def06 = saldos_diarios_sinformat.saldo06 + saldo_inicial.saldoi06;
							saldo_inicial.saldoi07 = deficit.def06;
							deficit.def07 = saldos_diarios_sinformat.saldo07 + saldo_inicial.saldoi07;
							saldo_inicial.saldoi08 = deficit.def07;
							deficit.def08 = saldos_diarios_sinformat.saldo08 + saldo_inicial.saldoi08;
							saldo_inicial.saldoi09 = deficit.def08;
							deficit.def09 = saldos_diarios_sinformat.saldo09 + saldo_inicial.saldoi09;
							saldo_inicial.saldoi10 = deficit.def09;
							deficit.def10 = saldos_diarios_sinformat.saldo10 + saldo_inicial.saldoi10;
							saldo_inicial.saldoi11 = deficit.def10;
							deficit.def11 = saldos_diarios_sinformat.saldo11 + saldo_inicial.saldoi11;
							saldo_inicial.saldoi12 = deficit.def11;
							deficit.def12 = saldos_diarios_sinformat.saldo12 + saldo_inicial.saldoi12;
							saldo_inicial.saldoi13 = deficit.def12;
							deficit.def13 = saldos_diarios_sinformat.saldo13 + saldo_inicial.saldoi13;
							saldo_inicial.saldoi14 = deficit.def13;
							deficit.def14 = saldos_diarios_sinformat.saldo14 + saldo_inicial.saldoi14;
							saldo_inicial.saldoi15 = deficit.def14;
							deficit.def15 = saldos_diarios_sinformat.saldo15 + saldo_inicial.saldoi15;
							saldo_inicial.saldoi16 = deficit.def15;
							deficit.def16 = saldos_diarios_sinformat.saldo16 + saldo_inicial.saldoi16;
							saldo_inicial.saldoi17 = deficit.def16;
							deficit.def17 = saldos_diarios_sinformat.saldo17 + saldo_inicial.saldoi17;
							saldo_inicial.saldoi18 = deficit.def17;
							deficit.def18 = saldos_diarios_sinformat.saldo18 + saldo_inicial.saldoi18;
							saldo_inicial.saldoi19 = deficit.def18;
							deficit.def19 = saldos_diarios_sinformat.saldo19 + saldo_inicial.saldoi19;
							saldo_inicial.saldoi20 = deficit.def19;
							deficit.def20 = saldos_diarios_sinformat.saldo20 + saldo_inicial.saldoi20;
							saldo_inicial.saldoi21 = deficit.def20;
							deficit.def21 = saldos_diarios_sinformat.saldo21 + saldo_inicial.saldoi21;
							saldo_inicial.saldoi22 = deficit.def21;
							deficit.def22 = saldos_diarios_sinformat.saldo22 + saldo_inicial.saldoi22;
							saldo_inicial.saldoi23 = deficit.def22;
							deficit.def23 = saldos_diarios_sinformat.saldo23 + saldo_inicial.saldoi23;
							saldo_inicial.saldoi24 = deficit.def23;
							deficit.def24 = saldos_diarios_sinformat.saldo24 + saldo_inicial.saldoi24;
							saldo_inicial.saldoi25 = deficit.def24;
							deficit.def25 = saldos_diarios_sinformat.saldo25 + saldo_inicial.saldoi25;
							saldo_inicial.saldoi26 = deficit.def25;
							deficit.def26 = saldos_diarios_sinformat.saldo26 + saldo_inicial.saldoi26;
							saldo_inicial.saldoi27 = deficit.def26;
							deficit.def27 = saldos_diarios_sinformat.saldo27 + saldo_inicial.saldoi27;
							saldo_inicial.saldoi28 = deficit.def27;
							deficit.def28 = saldos_diarios_sinformat.saldo28 + saldo_inicial.saldoi28;
							saldo_inicial.saldoi29 = deficit.def28;
							deficit.def29 = saldos_diarios_sinformat.saldo29 + saldo_inicial.saldoi29;
							saldo_inicial.saldoi30 = deficit.def29;
							deficit.def30 = saldos_diarios_sinformat.saldo30 + saldo_inicial.saldoi30;
							saldo_inicial.saldoi31 = deficit.def30;
							deficit.def31 = saldos_diarios_sinformat.saldo31 + saldo_inicial.saldoi31;

							saldo_inicial.saldoi01 = formatNumber.new(saldo_inicial.saldoi01.toFixed(2));
							saldo_inicial.saldoi02 = formatNumber.new(saldo_inicial.saldoi02.toFixed(2));
							saldo_inicial.saldoi03 = formatNumber.new(saldo_inicial.saldoi03.toFixed(2));
							saldo_inicial.saldoi04 = formatNumber.new(saldo_inicial.saldoi04.toFixed(2));
							saldo_inicial.saldoi05 = formatNumber.new(saldo_inicial.saldoi05.toFixed(2));
							saldo_inicial.saldoi06 = formatNumber.new(saldo_inicial.saldoi06.toFixed(2));
							saldo_inicial.saldoi07 = formatNumber.new(saldo_inicial.saldoi07.toFixed(2));
							saldo_inicial.saldoi08 = formatNumber.new(saldo_inicial.saldoi08.toFixed(2));
							saldo_inicial.saldoi09 = formatNumber.new(saldo_inicial.saldoi09.toFixed(2));
							saldo_inicial.saldoi10 = formatNumber.new(saldo_inicial.saldoi10.toFixed(2));
							saldo_inicial.saldoi11 = formatNumber.new(saldo_inicial.saldoi11.toFixed(2));
							saldo_inicial.saldoi12 = formatNumber.new(saldo_inicial.saldoi12.toFixed(2));
							saldo_inicial.saldoi13 = formatNumber.new(saldo_inicial.saldoi13.toFixed(2));
							saldo_inicial.saldoi14 = formatNumber.new(saldo_inicial.saldoi14.toFixed(2));
							saldo_inicial.saldoi15 = formatNumber.new(saldo_inicial.saldoi15.toFixed(2));
							saldo_inicial.saldoi16 = formatNumber.new(saldo_inicial.saldoi16.toFixed(2));
							saldo_inicial.saldoi17 = formatNumber.new(saldo_inicial.saldoi17.toFixed(2));
							saldo_inicial.saldoi18 = formatNumber.new(saldo_inicial.saldoi18.toFixed(2));
							saldo_inicial.saldoi19 = formatNumber.new(saldo_inicial.saldoi19.toFixed(2));
							saldo_inicial.saldoi20 = formatNumber.new(saldo_inicial.saldoi20.toFixed(2));
							saldo_inicial.saldoi21 = formatNumber.new(saldo_inicial.saldoi21.toFixed(2));
							saldo_inicial.saldoi22 = formatNumber.new(saldo_inicial.saldoi22.toFixed(2));
							saldo_inicial.saldoi23 = formatNumber.new(saldo_inicial.saldoi23.toFixed(2));
							saldo_inicial.saldoi24 = formatNumber.new(saldo_inicial.saldoi24.toFixed(2));
							saldo_inicial.saldoi25 = formatNumber.new(saldo_inicial.saldoi25.toFixed(2));
							saldo_inicial.saldoi26 = formatNumber.new(saldo_inicial.saldoi26.toFixed(2));
							saldo_inicial.saldoi27 = formatNumber.new(saldo_inicial.saldoi27.toFixed(2));
							saldo_inicial.saldoi28 = formatNumber.new(saldo_inicial.saldoi28.toFixed(2));
							saldo_inicial.saldoi29 = formatNumber.new(saldo_inicial.saldoi29.toFixed(2));
							saldo_inicial.saldoi30 = formatNumber.new(saldo_inicial.saldoi30.toFixed(2));
							saldo_inicial.saldoi31 = formatNumber.new(saldo_inicial.saldoi31.toFixed(2));

							deficit.def01 = formatNumber.new(deficit.def01.toFixed(2));
							deficit.def02 = formatNumber.new(deficit.def02.toFixed(2));
							deficit.def03 = formatNumber.new(deficit.def03.toFixed(2));
							deficit.def04 = formatNumber.new(deficit.def04.toFixed(2));
							deficit.def05 = formatNumber.new(deficit.def05.toFixed(2));
							deficit.def06 = formatNumber.new(deficit.def06.toFixed(2));
							deficit.def07 = formatNumber.new(deficit.def07.toFixed(2));
							deficit.def08 = formatNumber.new(deficit.def08.toFixed(2));
							deficit.def09 = formatNumber.new(deficit.def09.toFixed(2));
							deficit.def10 = formatNumber.new(deficit.def10.toFixed(2));
							deficit.def11 = formatNumber.new(deficit.def11.toFixed(2));
							deficit.def12 = formatNumber.new(deficit.def12.toFixed(2));
							deficit.def13 = formatNumber.new(deficit.def13.toFixed(2));
							deficit.def14 = formatNumber.new(deficit.def14.toFixed(2));
							deficit.def15 = formatNumber.new(deficit.def15.toFixed(2));
							deficit.def16 = formatNumber.new(deficit.def16.toFixed(2));
							deficit.def17 = formatNumber.new(deficit.def17.toFixed(2));
							deficit.def18 = formatNumber.new(deficit.def18.toFixed(2));
							deficit.def19 = formatNumber.new(deficit.def19.toFixed(2));
							deficit.def20 = formatNumber.new(deficit.def20.toFixed(2));
							deficit.def21 = formatNumber.new(deficit.def21.toFixed(2));
							deficit.def22 = formatNumber.new(deficit.def22.toFixed(2));
							deficit.def23 = formatNumber.new(deficit.def23.toFixed(2));
							deficit.def24 = formatNumber.new(deficit.def24.toFixed(2));
							deficit.def25 = formatNumber.new(deficit.def25.toFixed(2));
							deficit.def26 = formatNumber.new(deficit.def26.toFixed(2));
							deficit.def27 = formatNumber.new(deficit.def27.toFixed(2));
							deficit.def28 = formatNumber.new(deficit.def28.toFixed(2));
							deficit.def29 = formatNumber.new(deficit.def29.toFixed(2));
							deficit.def30 = formatNumber.new(deficit.def30.toFixed(2));
							deficit.def31 = formatNumber.new(deficit.def31.toFixed(2));
							
							// ARRANCA EL EXCEL

							var conf = {};

							//este tiene una url acá pero en el server es otra....
							conf.stylesXmlFile = "C:/Users/Administrador/Documents/Proyectos/Evhsa/style.xml";
							//conf.stylesXmlFile = "C:/Users/leandro/Documents/Evhsa-master/style.xml";

							conf.cols = [{caption:'FLUJO DE FONDOS', type:'string'},
						    {caption:'EVHSA', type:'string'}, {caption:'', type:'string'}, {caption:'', type:'string'},
						    {caption:'', type:'string'}, {caption:'', type:'string'}, {caption:'', type:'string'},
						    {caption:'', type:'string'}, {caption:'', type:'string'}, {caption:'', type:'string'},
						    {caption:'', type:'string'}, {caption:'', type:'string'}, {caption:'', type:'string'},
						    {caption:'', type:'string'}, {caption:'', type:'string'}, {caption:'', type:'string'},
						    {caption:'', type:'string'}, {caption:'', type:'string'}, {caption:'', type:'string'},
						    {caption:'', type:'string'}, {caption:'', type:'string'}, {caption:'', type:'string'},
						    {caption:'', type:'string'}, {caption:'', type:'string'}, {caption:'', type:'string'},
						    {caption:'', type:'string'}, {caption:'', type:'string'}, {caption:'', type:'string'},
						    {caption:'', type:'string'}, {caption:'', type:'string'}, {caption:'', type:'string'},
						    {caption:'', type:'string'}];

						    var rows = [];
						    var fila = ['INGRESOS', '01/'+mes+"/"+anio, '02/'+mes+"/"+anio, '03/'+mes+"/"+anio, '04/'+mes+"/"+anio,
						    '05/'+mes+"/"+anio, '06/'+mes+"/"+anio, '07/'+mes+"/"+anio, '08/'+mes+"/"+anio, '09/'+mes+"/"+anio,
						    '10/'+mes+"/"+anio, '11/'+mes+"/"+anio, '12/'+mes+"/"+anio, '13/'+mes+"/"+anio, '14/'+mes+"/"+anio,
						    '15/'+mes+"/"+anio, '16/'+mes+"/"+anio, '17/'+mes+"/"+anio, '18/'+mes+"/"+anio, '19/'+mes+"/"+anio,
						    '20/'+mes+"/"+anio, '21/'+mes+"/"+anio, '22/'+mes+"/"+anio, '23/'+mes+"/"+anio, '24/'+mes+"/"+anio,
						    '25/'+mes+"/"+anio, '26/'+mes+"/"+anio, '27/'+mes+"/"+anio, '28/'+mes+"/"+anio, '29/'+mes+"/"+anio,
						    '30/'+mes+"/"+anio, '31/'+mes+"/"+anio];

						    rows.push(fila);

						    // INGRESOS

						    for (var i = 0; i < ingresos.length ; i++){
						    	fila = [ingresos[i].codigotxt, ingresos[i].suma01, ingresos[i].suma02, ingresos[i].suma03, 
						    	ingresos[i].suma04, ingresos[i].suma05, ingresos[i].suma06, ingresos[i].suma07, ingresos[i].suma08, 
						    	ingresos[i].suma09, ingresos[i].suma10, ingresos[i].suma11, ingresos[i].suma12, ingresos[i].suma13, 
						    	ingresos[i].suma14, ingresos[i].suma15, ingresos[i].suma16, ingresos[i].suma17, ingresos[i].suma18, 
						    	ingresos[i].suma19, ingresos[i].suma20, ingresos[i].suma21, ingresos[i].suma22, ingresos[i].suma23, 
						    	ingresos[i].suma24, ingresos[i].suma25, ingresos[i].suma26, ingresos[i].suma27, ingresos[i].suma28, 
						    	ingresos[i].suma29, ingresos[i].suma30, ingresos[i].suma31];

						    	rows.push(fila);
						    }

						    // TOTAL INGRESOS

						    var total_i = total_ingresos[0];

						    fila = ['TOTAL INGRESOS', 
						    total_i.total01, total_i.total02, total_i.total03, total_i.total04, total_i.total05, total_i.total06,
						    total_i.total07, total_i.total08, total_i.total09, total_i.total10, total_i.total11, total_i.total12,
						    total_i.total13, total_i.total14, total_i.total15, total_i.total16, total_i.total17, total_i.total18,
						    total_i.total19, total_i.total20, total_i.total21, total_i.total22, total_i.total23, total_i.total24,
						    total_i.total25, total_i.total26, total_i.total27, total_i.total28, total_i.total29, total_i.total30,
						    total_i.total31];

						    rows.push(fila);

						    // EGRESOS
						    var fila = ['EGRESOS', '01/'+mes+"/"+anio, '02/'+mes+"/"+anio, '03/'+mes+"/"+anio, '04/'+mes+"/"+anio,
						    '05/'+mes+"/"+anio, '06/'+mes+"/"+anio, '07/'+mes+"/"+anio, '08/'+mes+"/"+anio, '09/'+mes+"/"+anio,
						    '10/'+mes+"/"+anio, '11/'+mes+"/"+anio, '12/'+mes+"/"+anio, '13/'+mes+"/"+anio, '14/'+mes+"/"+anio,
						    '15/'+mes+"/"+anio, '16/'+mes+"/"+anio, '17/'+mes+"/"+anio, '18/'+mes+"/"+anio, '19/'+mes+"/"+anio,
						    '20/'+mes+"/"+anio, '21/'+mes+"/"+anio, '22/'+mes+"/"+anio, '23/'+mes+"/"+anio, '24/'+mes+"/"+anio,
						    '25/'+mes+"/"+anio, '26/'+mes+"/"+anio, '27/'+mes+"/"+anio, '28/'+mes+"/"+anio, '29/'+mes+"/"+anio,
						    '30/'+mes+"/"+anio, '31/'+mes+"/"+anio];

						    rows.push(fila);

						    for (var i = 0; i < egresos.length ; i++){
						    	fila = [egresos[i].codigotxt, egresos[i].suma01, egresos[i].suma02, egresos[i].suma03, 
						    	egresos[i].suma04, egresos[i].suma05, egresos[i].suma06, egresos[i].suma07, egresos[i].suma08, 
						    	egresos[i].suma09, egresos[i].suma10, egresos[i].suma11, egresos[i].suma12, egresos[i].suma13, 
						    	egresos[i].suma14, egresos[i].suma15, egresos[i].suma16, egresos[i].suma17, egresos[i].suma18, 
						    	egresos[i].suma19, egresos[i].suma20, egresos[i].suma21, egresos[i].suma22, egresos[i].suma23, 
						    	egresos[i].suma24, egresos[i].suma25, egresos[i].suma26, egresos[i].suma27, egresos[i].suma28, 
						    	egresos[i].suma29, egresos[i].suma30, egresos[i].suma31];

						    	rows.push(fila);
						    }

						    // TOTAL EGRESOS

						    var total_e = total_egresos[0];

						    fila = ['TOTAL EGRESOS', 
						    total_e.total01, total_e.total02, total_e.total03, total_e.total04, total_e.total05, total_e.total06,
						    total_e.total07, total_e.total08, total_e.total09, total_e.total10, total_e.total11, total_e.total12,
						    total_e.total13, total_e.total14, total_e.total15, total_e.total16, total_e.total17, total_e.total18,
						    total_e.total19, total_e.total20, total_e.total21, total_e.total22, total_e.total23, total_e.total24,
						    total_e.total25, total_e.total26, total_e.total27, total_e.total28, total_e.total29, total_e.total30,
						    total_e.total31];

						    rows.push(fila);

						    // SALDOS DIARIOS

						    var sd = saldos_diarios[0];

						    fila = ['SALDO DIARIO', sd.saldo01, sd.saldo02, sd.saldo03, sd.saldo04, sd.saldo05, sd.saldo06, sd.saldo07, 
						    sd.saldo08, sd.saldo09, sd.saldo10, sd.saldo11, sd.saldo12, sd.saldo13, sd.saldo14, sd.saldo15, sd.saldo16, 
						    sd.saldo17, sd.saldo18, sd.saldo19, sd.saldo20, sd.saldo21, sd.saldo22, sd.saldo23, sd.saldo24, sd.saldo25, 
						    sd.saldo26, sd.saldo27, sd.saldo28, sd.saldo29, sd.saldo30, sd.saldo31];

						    rows.push(fila);

						    // SALDO INICIAL
						    
						    var si = saldo_inicial;

						    fila = ['SALDO INICIAL', si.saldoi01, si.saldoi02, si.saldoi03, si.saldoi04, si.saldoi05, si.saldoi06, 
						    si.saldoi07, si.saldoi08, si.saldoi09, si.saldoi10, si.saldoi11, si.saldoi12, si.saldoi13, si.saldoi14, 
						    si.saldoi15, si.saldoi16, si.saldoi17, si.saldoi18, si.saldoi19, si.saldoi20, si.saldoi21, si.saldoi22, 
						    si.saldoi23, si.saldoi24, si.saldoi25, si.saldoi26, si.saldoi27, si.saldoi28, si.saldoi29, si.saldoi30, 
						    si.saldoi31];

						    rows.push(fila);

						    // DEFICIT/SUPERAVIT

						    var d = deficit;

						    fila = ['DEFICIT/SUPERAVIT', d.def01, d.def02, d.def03, d.def04, d.def05, d.def06, d.def07, d.def08, 
						    d.def09, d.def10, d.def11, d.def12, d.def13, d.def14, d.def15, d.def16, d.def17, d.def18, d.def19, 
						    d.def20, d.def21, d.def22, d.def23, d.def24, d.def25, d.def26, d.def27, d.def28, d.def29, d.def30, 
						    d.def31];

						    rows.push(fila);

						    conf.rows = rows;
						    var result = nodeExcel.execute(conf);
						    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
						    res.setHeader("Content-Disposition", "attachment; filename=" + "Reporte Flujo de Fondos "+mes+" "+anio+".xlsx");
						    res.end(result, 'binary');

						});						
					});
				});
			});
		});		
	});
}