//requiriendo modelo mensaje.js:
var mRandom = require('../models/mRandom');
var mysql = require('mysql');
var async = require('async');

module.exports = {
	getRandom: getRandom,
	updateRepuestosConIdRubroFk: updateRepuestosConIdRubroFk,
	updateTablaVehiculosConFive: updateTablaVehiculosConFive,
	updateTablaSecrConOperariosTemp: updateTablaSecrConOperariosTemp,
	updateOtrosGastos: updateOtrosGastos,
	updateEquipos : updateEquipos,
	updateConjuntos: updateConjuntos,
	updateConjuntosFichas: updateConjuntosFichas,
	updateVales: updateVales,
	updateHerramientas : updateHerramientas
}

function getRandom(req, res){
	res.render('random', {
		pagename: 'Seccion Interna para los Programadores',
	});
}

function updateRepuestosConIdRubroFk(req, res){

	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	// connection.connect();


	mRandom.getAllRepuestos(function (repuestos){
		mRandom.getAllRubros(function (rubros){

			connection.connect();

			async.eachSeries(repuestos, function (rep, callback) {
				var i = repuestos.indexOf(rep);
				if(i == '100')
					console.log("100 !")
				if(i == '500')
					console.log("500 !!")
				if(i == '1000')
					console.log("1000 !!")
				if(i == '1500')
					console.log("1500 !!!")
				if(i == '2000')
					console.log("2000 !!!!")

				for (var x = 0; x < rubros.length; x++) {
					codigodelrepuesto = rep.codigo.substring(0, 4);
					if (codigodelrepuesto == rubros[x].codigo) {
						var query = "update repuestos set repuestos.id_rubro_fk = "+rubros[x].id+" where repuestos.id = "+rep.id;
						connection.query(query, function(err, rows, fields) {
							if (err) {
								throw err;
						    	console.log(err);

							}else{
								// cb(rows);
								//console.log("updated !");
								
							}
						    // console.log(rows)
						    // console.log(fields)						    
						});
						callback();
						break;						
					}else{
						
					}
				}
				//console.log(i);
			}, function (err) {
				//Esta parte se sejecuta cuando termina de recorrer el array
				// acomode la funcion "callback" de Async, ya que sino nos queda el callback
				// de 	mFichadas.MySqlInsert dando vueltas
				console.log(i)
				if (err) { 
					throw err; 
				}else{
					res.send("finished");
				connection.end();
				return cb();
				}				
			});						
		});
	});	
}

function updateTablaVehiculosConFive(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	connection.connect();

	mRandom.getVehiculos(function (vehiculos){
		mRandom.getFive(function (five_temp){
			async.eachSeries(vehiculos, function (vehi, callback) {
				for (var i = 0; i < five_temp.length; i++) {
					if (five_temp[i].nro_coche == vehi.numero ){
						//actualizar
						var nro_coche = five_temp[i].nro_coche;
						var chasis = five_temp[i].chasis;
						var chasis_fecha = five_temp[i].chasis_fecha;
						var chasis_dlls = five_temp[i].chasis_dlls;
						var chasis_pesos = five_temp[i].chasis_pesos;
						var carro = five_temp[i].carro;
						var carro_fecha = five_temp[i].carro_fecha;
						var carro_dlls = five_temp[i].carro_dlls;
						var carro_pesos = five_temp[i].carro_pesos;

						query = "UPDATE `vehiculos` SET chasis='"+chasis+"', chasis_fecha='"+chasis_fecha+"', chasis_dlls="+chasis_dlls+", chasis_pesos = "+chasis_pesos+", carro ='"+carro+"', carro_fecha ='"+carro_fecha+"', carro_dlls ="+carro_dlls+", carro_pesos ="+carro_pesos+" WHERE numero ="+nro_coche;
						connection.query(query, function(err, rows, fields) {
							if (err) {
								throw err;
						    	console.log(err);

							}else{
								// cb(rows);
								callback();
								console.log(query);
								console.log("updated !");
							}					    
						});
					}else{
						//next
					}
				};
			}, function (err) {
				if (err) { 
					throw err; 
				}else{
					res.send("finished");
					connection.end();
					return cb();
				}				
			});		
		});
	});		
}

function updateTablaSecrConOperariosTemp(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	connection.connect();

	mRandom.getOperariosTemp(function (ops){
		console.log("inside");
		console.log(ops.length);

		async.eachSeries(ops, function (op, callback) {
			var legajo = op.legajo;
			var nombre = op.nombre;

			query = "INSERT INTO secr(unica, usuario, clave, alta, baja, activa) VALUES("+legajo+",'"+nombre+"', '"+legajo+"', '2016-01-07', '2100-01-01', 1)"
			connection.query(query, function (err, rows, fields) {
				if (err) {
					throw err;
			    	console.log(err);
				}else{
					// cb(rows);
					callback();
					console.log(query);
					console.log("updated !");
				}					    
			});
		}, function (err) {
			if (err) { 
				throw err; 
			}else{
				res.send("finished");
				connection.end();
				// return cb();
			}				
		});
	});
}

function updateOtrosGastos(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	connection.connect();

	mRandom.getOtrosGastos_Temp(function (otrosgastos_temp){
		console.log(otrosgastos_temp.length);

		async.eachSeries(otrosgastos_temp, function (ot_temp, callback) {
			var temp_fecha = ot_temp.fecha;
			var temp_descripcion = ot_temp.descripcion;
			var temp_cantidad = ot_temp.cantidad;
			var temp_destino = ot_temp.destino;
			var temp_coche = ot_temp.coche;
			var temp_total = ot_temp.total;
			var temp_operario = ot_temp.operario;
			var temp_memo = ot_temp.memo;
			var temp_empresa = ot_temp.empresa;

			var id_usuario_fk = 0;

			switch(temp_operario) {
			    case '169':
			    	id_usuario_fk = 169;
			        break;
			    case '182':
			    	id_usuario_fk = 182;
			        break;
			    case '189':
			    	id_usuario_fk = 189;
			        break;
			    case '333':
			    	id_usuario_fk = 333;
			        break;
			    case '363':
			    	id_usuario_fk = 363;
			        break;
			    case '9':
			    	id_usuario_fk = 9;
			        break;
			    case '99':
			    	id_usuario_fk = 99;
			        break;
			    // default:
			    // 	id_usuario_fk = 0;
			}

			query = "INSERT INTO otrosgastos(`fecha`, `descripcion`, `cantidad`, `id_destino_fk`, `id_vehiculo_fk`, `total`, `id_usuario_fk`, `memo`, `empresa`) VALUES('"+temp_fecha+"','"+temp_descripcion+"', "+temp_cantidad+", "+temp_destino+", "+temp_coche+", "+temp_total+", "+id_usuario_fk+", '"+temp_memo+"', '"+temp_empresa+"')"
			connection.query(query, function (err, rows, fields) {
				if (err) {
					throw err;
			    	console.log(err);
				}else{
					// cb(rows);					
					console.log(query);
					console.log("updated !");
					callback();
				}					    
			});

		}, function (err) {
			if (err) { 
				throw err; 
			}else{
				res.send("finished");
				connection.end();
				// return cb();
			}				
		});
	});
}

function updateEquipos(req, res) {
	var connection = mysql.createConnection({
	    user: 'root',
	    password: 'root',
	    host: 'localhost',
	    port: '',
	    database: 'evhsa',
	    dateStrings : true
 	});

	connection.connect();

	mRandom.getEquipos_temp(function (equipos_temp) {
		console.log(equipos_temp.length)

		async.eachSeries(equipos_temp, function (equipo, callback) {
			var numero = equipo.EQ_NUME;
			var denominacion = equipo.EQ_DENO;
				denominacion = denominacion.replace(/"|'/g, "");

			var numero_coche_fk = equipo.EQ_COCHE;
			var fecha_colocacion = equipo.EQ_FECO;
			var total = equipo.EQ_TOTAL;
			var unica_operador_fk = 0;
			var responsable = equipo.EQ_RESPO;
				responsable = responsable.replace(/"|'/g, "");
			var observaciones = equipo.EQ_OBSE;
				observaciones = observaciones.replace(/"|'/g, "");
			var tipo = equipo.EQ_TIPO;
			var fecha_sacado = equipo.EQ_FESA;
			var km = equipo.EQ_KM;
			var resultado = equipo.EQ_RESU;
				resultado = resultado.replace(/"|'/g, "");

			var query = "INSERT INTO equipos(" +
				"numero, " +
				"denominacion, " +
				"numero_coche_fk, " +
				"fecha_colocacion, " +
				"total, " +
				"unica_operador_fk, " +
				"responsable, " +
				"observaciones, " +
				"tipo, " +
				"fecha_sacado, " +
				"km, " +
				"resultado) " +
					"VALUES( " +
						numero + ", '" +
						denominacion + "', " +
					  numero_coche_fk	+ ", '" +
						fecha_colocacion + "', " +
						total + ", " +
						unica_operador_fk + ", '" +
						responsable + "', '" +
						observaciones + "', '" +
						tipo + "', '" +
						fecha_sacado + "', " +
						km + ", '" +
						resultado + "')";

			connection.query(query, function (err, rows, fields) {
				console.log("conection.query: " + query)
				if (err) {
					throw err;
			    console.log(err);
				}else{
					// cb(rows);
					console.log("updated !");
					callback();
				}					    
			});

		}, function (err2) {
			if (err2) { 
				throw err2; 
			}else{
				res.send("finished");
				connection.end();
				// return cb();
			}				
		});
	});
}

function updateConjuntos(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	connection.connect();

	mRandom.getFic2(function (fic2){
		console.log(fic2.length);
		async.eachSeries(fic2, function (fic, callback) {

			// asignar valores
			const codigo = fic.codigo;
			// const denominacion = fic.denominacion;
			const serie = fic.serie;
			const fecha_compra = fic.fecha_compra;
			const proveedor = fic.proveedor;
			const valor = fic.valor;
			const identificacion = fic.identificacion; //ubicacion
			const ubicacion_actual = fic.ubicacion_actual;
			const coche = fic.coche;
			const ubicacion_neumatico = fic.ubicacion_neumatico;
			const experimental = fic.expe;
			const chasis = fic.chasis;			
			const es_neumatico = fic.es_neumatico;
			const fecha_baja = fic.fecha_baja;
			const motivo = fic.motivo;

			//verificaciones con ifs
			if (ubicacion_neumatico == '')
				ubicacion_neumatico = 'NN';

			//insertar en conjuntos_definicion

			query = "INSERT INTO `evhsa`.`conjunto_definicion` (`codigo`, `serie`, `fecha_compra`,	`proveedor`, `valor`, "+
				"`identificacion`, `codigo_ubicacion_actual_fk`,	`numero_coche_fk`, `codigo_ubicacion_neumatico_fk`,	"+
				"`experimental`,	`es_neumatico`,	`chasis`,`fecha_baja`,	`motivo_baja`) "+
				"VALUES "+
					"('"+codigo+"', "+
					"'"+serie+"', "+
					"'"+fecha_compra+"', "+
					"'"+proveedor+"', "+
					valor+", "+
					"'"+identificacion+"', "+
					"'"+ubicacion_actual+"', "+
					coche+", "+
					"'"+ubicacion_neumatico+"', "+
					"'"+experimental+"', "+
					es_neumatico+", "+
					"'"+chasis+"', "+
					"'"+fecha_baja+"', "+
					"'"+motivo+"');";
			
			console.log(query)
			connection.query(query, function (err, rows, fields) {
				if (err) {
					throw err;
			    	console.log(err);
				}else{
					// cb(rows);					
					console.log(query);
					console.log("updated !");
					callback();
				}					    
			});

		}, function (err2) {
			if (err2) {
				throw err2; 
			}else{
				res.send("finished");
				connection.end();
				// return callback();
			}				
		});
	});
}

function updateConjuntosFichas(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	connection.connect();

	mRandom.getFico2015(function (fico){
		console.log(fico.length);
		// console.log(fico[0])
		async.eachSeries(fico, function (fico2, callback) {
			// fico2 = fico2o[0]
			// asignar valores
			const codigo = fico2.codigo;
			// const denominacion = fico2.denominacion;
			const serie = fico2.serie;
			const fecha_movimiento = fico2.fecha;
			const coche_sacado = fico2.coche_sacado;
			const destino = fico2.destino;
			const coche_colocado = fico2.coche_colocado; //ubicacion
			const ubicacion_actual = fico2.ubicacion_actual;
			const valor = fico2.valor;
			const memo = fico2.memo;
			var ubicacion_neumatico = fico2.ubicacion_neumatico;
			const imputa = fico2.imputa;
			const responsable_reparacion = fico2.responsable_reparacion;			
			const responsable_rotura = fico2.responsable_rotura;
			const km = fico2.km;
			var tipo_cubierta = fico2.tipo_cubierta;
			var estadistica = fico2.estadistica;
			const mm = fico2.mm;

			//verificaciones con ifs
			if (tipo_cubierta == '')
				tipo_cubierta = '0';

			if (ubicacion_neumatico == '')
				ubicacion_neumatico = 'NN';

			if (estadistica == '' || estadistica == '0')
				estadistica = 'n'
			else if (estadistica == '1')
				estadistica = 's'
			//insertar en conjuntos_ficha

			var query = "INSERT INTO `evhsa`.`conjunto_ficha` (`codigo`, `serie`, `fecha_movimiento`, "+
				"`numero_coche_sacado_fk`, `numero_coche_colocado_fk`, `codigo_ubicacion_actual_fk`, "+
				"`valor`, `memo`, `codigo_ubicacion_neumatico_fk`, `imputa`, `responsable_reparacion`, "+
				"`responsable_rotura`, `km`, `codigo_tipo_cubierta_fk`, `est`, `mm`) VALUES"+
					"('"+codigo+"', '"+serie+"', '"+fecha_movimiento+"', "+
					coche_sacado+", "+coche_colocado+", '"+ubicacion_actual+"', "+
					valor+", '"+memo+"', '"+ubicacion_neumatico+"', "+imputa+", '"+responsable_reparacion+"', "+
					"'"+responsable_rotura+"', "+km+", '"+tipo_cubierta+"', '"+estadistica+"', "+mm+");";
			
			// console.log(query)
			connection.query(query, function (err, rows, fields) {
				if (err) {
					throw err;
			    	console.log(err);
				}else{
					callback();
				}					    
			});

			}, function (err2) {
			if (err2) {
				throw err2;
				console.log(err);
			}else{
				console.log("finished");
				res.send("finished");
				connection.end();
				// return callback();
			}				
		});
	});
}

function updateVales(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	// CONTROLAR QUE INSERTE BIEN LOS DECIMALES

	connection.connect();

	mRandom.getPagol2015(function (pagol){
		// console.log(pagol.length);
		// console.log(pagol[0])
		async.eachSeries(pagol, function (pagol2, callback) {
			// asignar valores
			const nro_vale = pagol2.numero;
			const destino = pagol2.destino;
			const fecha = pagol2.fecha;
			const cam1 = pagol2.cam1;
			const cam2 = pagol2.cam2;
			const cam3 = pagol2.cam3;
			const cam4 = pagol2.cam4;
			const cam5 = pagol2.cam5;
			const cam6 = pagol2.cam6;
			const cam7 = pagol2.cam7;
			const cam8 = pagol2.cam8;
			const cam9 = pagol2.cam9;
			const cam10 = pagol2.cam10;
			const cam11 = pagol2.cam11;
			const cam12 = pagol2.cam12;
			const cam13 = pagol2.cam13;
			const cam14 = pagol2.cam14;
			const cant1 = pagol2.cant1;
			const cant2 = pagol2.cant2;
			const cant3 = pagol2.cant3;
			const cant4 = pagol2.cant4;
			const cant5 = pagol2.cant5;
			const cant6 = pagol2.cant6;
			const cant7 = pagol2.cant7;
			const cant8 = pagol2.cant8;
			const cant9 = pagol2.cant9;
			const cant10 = pagol2.cant10;
			const cant11 = pagol2.cant11;
			const cant12 = pagol2.cant12;
			const cant13 = pagol2.cant13;
			const cant14 = pagol2.cant14;
			const total = pagol2.total;
			const responsable = pagol2.responsable;
			const nro_coche = pagol2.nro_coche;
			const codigo = pagol2.codigo;
			const serie = pagol2.serie;
			const operario = pagol2.operario;
			const equipo = pagol2.equipo;
			const precio1 = pagol2.precio1;
			const precio2 = pagol2.precio2;
			const precio3 = pagol2.precio3;
			const precio4 = pagol2.precio4;
			const precio5 = pagol2.precio5;
			const precio6 = pagol2.precio6;
			const precio7 = pagol2.precio7;
			const precio8 = pagol2.precio8;
			const precio9 = pagol2.precio9;
			const precio10 = pagol2.precio10;
			const precio11 = pagol2.precio11;
			const precio12 = pagol2.precio12;
			const precio13 = pagol2.precio13;
			const precio14 = pagol2.precio14;
			const carro = pagol2.carro;

			//armado de arrays para insertar luego en vales2
			var aCodigo = [];
			var aCant = [];
			var aPrecio = [];

			aCodigo.push(cam1);
			aCodigo.push(cam2);
			aCodigo.push(cam3);
			aCodigo.push(cam4);
			aCodigo.push(cam5);
			aCodigo.push(cam6);
			aCodigo.push(cam7);
			aCodigo.push(cam8);
			aCodigo.push(cam9);
			aCodigo.push(cam10);
			aCodigo.push(cam11);
			aCodigo.push(cam12);
			aCodigo.push(cam13);
			aCodigo.push(cam14);

			aCant.push(cant1);
			aCant.push(cant2);
			aCant.push(cant3);
			aCant.push(cant4);
			aCant.push(cant5);
			aCant.push(cant6);
			aCant.push(cant7);
			aCant.push(cant8);
			aCant.push(cant9);
			aCant.push(cant10);
			aCant.push(cant11);
			aCant.push(cant12);
			aCant.push(cant13);
			aCant.push(cant14);
			
			aPrecio.push(precio1);
			aPrecio.push(precio2);
			aPrecio.push(precio3);
			aPrecio.push(precio4);
			aPrecio.push(precio5);
			aPrecio.push(precio6);
			aPrecio.push(precio7);
			aPrecio.push(precio8);
			aPrecio.push(precio9);
			aPrecio.push(precio10);
			aPrecio.push(precio11);
			aPrecio.push(precio12);
			aPrecio.push(precio13);
			aPrecio.push(precio14);
			
			var vale = {};
			var vales = [];

			//armo el array con el contenido de este vale, para vales2
			for (var i=0 ; i<14 ; i++){
				// if (aCodigo[i] != '' || aCant[i] > 0 || aPrecio[i] > 0){
				if (aCodigo[i] != ''){
					vale = {'codigo': aCodigo[i], 'cant': aCant[i], 'precio': aPrecio[i]};
					vales.push(vale);
				}	
			}

			//insertar en vales1
			var query = "INSERT INTO evhsa.vales1 (nro_vale, fecha, total, responsable, nro_coche, conjunto_codigo, conjunto_serie, "+
						"unica_operario_fk, nro_equipo, carro, id_valedestino_fk) "+
						"VALUES ("+nro_vale+", '"+fecha+"', "+total+", '"+responsable+"', "+nro_coche+", '"+codigo+"', '"+
						serie+"', "+operario+", "+equipo+", '"+carro+"', "+destino+");";
			console.log(query)
			// ejecuto query de insert en vale1 y cuando termine inserto todo en vales2 
			connection.query(query, function (err, rows, fields) {
				if (err) {
					throw err;
			    	console.log(err);
				}else{
					if (vales.length > 0){

						// CONTROLAR QUE INSERTE BIEN LOS DECIMALES
						async.eachSeries(vales, function (val, callback2) {
							var query2 = "INSERT INTO vales2(nro_vale, codigo_repuesto, cantidad, precio) "+
						  				"VALUES("+nro_vale+", '"+val.codigo+"', "+val.cant+", "+val.precio+");";
						  	console.log(query2)
						  	connection.query(query2, function (err, rows, fields) {
								if (err) {
									throw err;
							    	console.log(err);
								}else{										
									callback2();
								}					    
							});
						}, function (err) {
							if (err) {
								throw err;
								console.log(err);
							}else{
								callback();
							}				
						});
						// CONTROLAR QUE INSERTE BIEN LOS DECIMALES
					}else{
						callback();
					}				
				}					    
			});
		}, function (err) {
			if (err) {
				throw err;
				console.log(err);
			}else{
				console.log("finished");
				res.send("finished");
				connection.end();
				res.redirect("inicio")
				// return callback();
			}				
		});
	});
}

function updateHerramientas (req, res) {
	var connection = mysql.createConnection({
	    user: 'root',
	    password: 'root',
	    host: 'localhost',
	    port: '',
	    database: 'evhsa',
	    dateStrings : true
 	});

	connection.connect();

	mRandom.getHerramientas_temp(function (herramientas_temp) {
		console.log(herramientas_temp.length)

		async.eachSeries(herramientas_temp, function (herramienta, callback) {
			var codigo = herramienta.HE_CODIGO;
			var unica_usuariodestino_fk = herramienta.HE_LEGA;
			var id_ubicacionherramientas_fk = herramienta.HE_UBIC;
			var fecha_movimiento = herramienta.HE_FECHA;
			var nro_recibo = herramienta.HE_RECI;
			var unica_operador_fk = herramienta.HE_OPER;
			var marca = herramienta.HE_MARCA;
			var lugar_compra = herramienta.HE_LUCOM;
			var valor = herramienta.HE_VALE;
			var cantidad = herramienta.HE_CANTI;
			var fecha_cambio = '0000-00-00';

			var query = "INSERT INTO herramientas(" +
				"codigo, " +
				"unica_usuariodestino_fk, " +
				"id_ubicacionherramientas_fk, " +
				"fecha_movimiento, " +
				"nro_recibo, " +
				"unica_operador_fk, " +
				"marca, " +
				"lugar_compra, " +
				"valor, " +
				"cantidad, " +
				"fecha_cambio) " +
					"VALUES( '" +
						codigo + "', " +
						unica_usuariodestino_fk + ", " +
					  id_ubicacionherramientas_fk	+ ", '" +
						fecha_movimiento + "', " +
						nro_recibo + ", " +
						unica_operador_fk + ", '" +
						marca + "', '" +
						lugar_compra + "', " +
						valor + ", " +
						cantidad + ", '" +
						fecha_cambio + "')";

			connection.query(query, function (err, rows, fields) {
				console.log("conection.query: " + query)
				if (err) {
					throw err;
			    console.log(err);
				}else{
					// cb(rows);
					console.log("updated !");
					callback();
				}					    
			});

		}, function (err2) {
			if (err2) { 
				throw err2; 
			}else{
				res.send("finished");
				connection.end();
				// return cb();
			}				
		});
	});
}