const cIndex = require('./controllers/cIndex');
const cUsuario = require('./controllers/cUsuario');
const cAdmin = require('./controllers/cAdmin');
const cAccesos = require('./controllers/cAccesos');
// const cCargos = require('./controllers/cCargos');
const cUmed = require('./controllers/cUmed');
const cRubros = require('./controllers/cRubros');
const cRubrosGrupos = require('./controllers/cRubrosGrupos');
const cRepuestos = require('./controllers/cRepuestos');
const cVehiculos = require('./controllers/cVehiculos');
const cProveedores = require('./controllers/cProveedores');
const cAgenda = require('./controllers/cAgenda');
const cOtrosGastos = require('./controllers/cOtrosGastos');
const cPlanillaDiaria = require('./controllers/cPlanillaDiaria');
const cTank = require('./controllers/cTank');
const cStockGasoilEnTanque = require('./controllers/cStockGasoilEnTanque');
const cConsumoxFechas = require('./controllers/cConsumoxFechas');
const cCodigosIE = require('./controllers/cCodigosIE');
const cIngegr = require('./controllers/cIngegr');
const cFlujoDeFondos = require('./controllers/cFlujoDeFondos');
const cConjunto = require('./controllers/cConjunto');
const cEquipos = require('./controllers/cEquipos');
const cHerramientas = require('./controllers/cHerramientas');
const cVales = require('./controllers/cVales');
const cReparaciones = require('./controllers/cReparaciones');

const mEventos = require('./models/mEventos');
const mAccesos = require('./models/mAccesos');
const mAyuda = require('./models/mAyuda');

// const cPruebaSQL = require('./controllers/cPruebaSQL');
const cRandom = require('./controllers/cRandom');

function logout (req, res) {
	console.log(req.cookies);
	fecha = new Date();
	day = fecha.getDate();
	month = fecha.getMonth();
	if (day<10)
		day = "0" + day;
	if (month<10)
		month = "0" + month;
	fecha = fecha.getFullYear() + "/"+month+"/"+day+" "+fecha.getHours()+":"+fecha.getMinutes()
	mEventos.add(req.session.user.unica, fecha, "Logout", "", function(){
		req.session.destroy(function (err) {
			console.log("session destroyed executed")
			if (!err){
				res.clearCookie('connect.sid', { path: '/' });
		 		res.redirect('/');
		 	}else{
		 		console.log(err);
		 	}
		});	
	});	
}

// Verifica que este logueado
function auth (req, res, next) {
	if (req.session.auth) {
		return next();
	} else {
		res.redirect('/')
	}
}

function acceso (req, res, next){
	var id_usuario = req.session.user.unica;
	var id_menu = req.session.user.id_menu;
	var accion = req.session.user.accion;

	if (id_menu != 00 && id_menu != 1 && id_menu != 43 && id_menu != 44 && id_menu != 45 ){
		mAccesos.VerificarNivelSupervisor(id_usuario, function (user){
			if (user[0].tiene_permiso){
				next();
			}else{
				mAccesos.verificarAcceso(id_usuario, id_menu, accion, function (acceso){
					console.log(acceso)
					if (accion == "c")
						var acceso = acceso[0].c;

					if (accion == "a")
						var acceso = acceso[0].a;

					if (accion == "m")
						var acceso = acceso[0].m;

					if (accion == "b")
						var acceso = acceso[0].b;

					var acciontxt = "";
					if (acceso == 1){
						next();
					}else{
						var nombre_usuario = req.session.user.usuario;
						if (accion == 'a'){
							acciontxt = "al Alta";
						}else{
							if (accion == 'b'){
								acciontxt = "a dar de Baja";
							}else{
								if (accion == 'm'){
									acciontxt = "a Modificar";
								}else{
									if (accion == 'c'){
										acciontxt = "a Consultar";
									}else{
										console.log("asd");
									}
								}
							}
						}
						mAyuda.getAyuda(id_menu, function (ayuda){
							res.render("error", {
								error: nombre_usuario+": No tiene acceso "+acciontxt+" en el menú id "+id_menu+" llamado '"+ayuda[0].titulo+"'"
							});
						});
					}
				});
			}
		});
	}else{
		switch (id_menu){
			case '00':
				mAccesos.VerificarNivelSupervisor(id_usuario, function (user){
					if (user[0].tiene_permiso){
						next();
					}else{
				        mAccesos.VerificarNivelProgramador(id_usuario, function (user){
							if (user[0].tiene_permiso){
								next();
							}else{
								mAyuda.getAyuda(id_menu, function (ayuda){
									var nombre_usuario = req.session.user.usuario;
									res.render("error", {
										error: nombre_usuario+": No tiene acceso al modulo Interno para programadores."
									});
								});
							}
						});
					}
				});
				break;
		    case '1':
		    	// usuarios
		    	mAccesos.VerificarNivelSupervisor(id_usuario, function (user){
					if (user[0].tiene_permiso){
						next();
					}else{
				        mAccesos.VerificarNivelClaves(id_usuario, function (user){
							if (user[0].tiene_permiso){
								next();
							}else{
								mAyuda.getAyuda(id_menu, function (ayuda){
									var nombre_usuario = req.session.user.usuario;
									res.render("error", {
										error: nombre_usuario+": No tiene acceso al modulo de Usuarios."
									});
								});
							}
						});
					}
				});
		        break;
		    case '43':
		    case '44':
		    case '45':
			    mAccesos.VerificarNivelSupervisor(id_usuario, function (user){
					if (user[0].tiene_permiso){
						next();
					}else{
				        mAccesos.VerificarNivelAdministracion(id_usuario, function (user){
							if (user[0].tiene_permiso){
								next();
							}else{
								mAyuda.getAyuda(id_menu, function (ayuda){
									var nombre_usuario = req.session.user.usuario;
									res.render("error", {
										error: nombre_usuario+": No tiene acceso al modulo de Administracion."
									});
								});
							}
						});
				    }
				});
		        break;
		    default:
		        res.render("error", {
					error: "Error inesperado por favor reportelo para que llegue a los programadores."
				});
		}
	}
}

module.exports = function(app) {
	app.get('/', cAdmin.getLogin);
	app.get('/login', cAdmin.getLogin)
	app.post('/login', cAdmin.postLogin);
	app.get('/logout', logout);
	app.get('/inicio', auth, cIndex.getInicio);
	app.get('/error', cIndex.getError);
	app.post('/updatemenuinfo/:id_menu/:accion', auth, cIndex.updateMenuInfo);
	//ayuda
	app.get('/ayuda', cIndex.getAyuda);
	app.get('/ayudaver/:id', cIndex.AyudaVer);
	//novedades
	app.get('/listanovedades', cIndex.getNovedades);
	//usuarios
	app.get('/usuarioslista', auth, acceso, cUsuario.getUsuarios);
	app.get('/usuariosalta', auth, acceso, cUsuario.getUsuariosAlta);
	app.post('/usuariosalta', auth, cUsuario.putUsuario);
	app.get('/usuariosmodificar/:id', auth, acceso, cUsuario.getUsuarioModificar);
	app.post('/usuariosmodificar', auth, cUsuario.postUsuarioModificar);
	app.get('/usuariosborrar/:id', auth, acceso, cUsuario.getDelUsuario);
	//configurar accesos
	app.get('/accesoslista/:id', auth, cAccesos.getAccesos);
	app.post('/accesoslista', auth, cAccesos.postAccesos);
	app.post("/updateacceso/:id_usuario/:id_menu/:acceso_short/:value", auth, cAccesos.updateAcceso);
	//unidades de medida "umed"
	app.get('/umedlista', auth, acceso, cUmed.getAllUmed);
	app.get('/umedalta', auth, acceso, cUmed.getAlta);
	app.post('/umedalta', auth, cUmed.postAlta);
	app.get('/umedmodificar/:id', auth, acceso, cUmed.getModificar);
	app.post('/umedactualizar', auth, cUmed.postModificar);
	app.get('/umedborrar/:id', auth, acceso, cUmed.getDelUmed);
	//rubros
	app.get('/rubroslista', auth, acceso, cRubros.getLista);
	app.get('/rubrosalta', auth, acceso, cRubros.getAlta);
	app.post('/rubrosalta', auth, cRubros.postAlta);
	app.get('/rubrosmodificar/:id', auth, acceso, cRubros.getModificar);
	app.post('/rubrosmodificar', auth, cRubros.postModificar);
	app.get('/rubrosborrar/:id', auth, acceso, cRubros.getDel);
	app.get('/getRubrosPorGrupo/:id_grupo', auth, cRubros.getRubrosPorGrupo);
	//grupos de rubros
	app.get('/rubrosgruposlista', auth, acceso, cRubrosGrupos.getLista);
	app.get('/rubrosgruposalta', auth, acceso, cRubrosGrupos.getAlta);
	app.post('/rubrosgruposalta', auth, cRubrosGrupos.postAlta);
	app.get('/rubrosgruposmodificar/:id', auth, acceso, cRubrosGrupos.getModificar);
	app.post('/rubrosgruposmodificar', auth, cRubrosGrupos.postModificar);
	app.get('/rubrosgruposborrar/:id', auth, acceso, cRubrosGrupos.getDel);
	//repuestos
	app.get('/repuestoslista', auth, acceso, cRepuestos.getLista);
	app.get('/repuestosalta', auth, acceso, cRepuestos.getAlta);
	app.post('/repuestosalta', auth, cRepuestos.postAlta);
	app.get('/repuestosmodificar/:id', auth, acceso, cRepuestos.getModificar);
	app.post('/repuestosmodificar', auth, cRepuestos.postModificar);
	app.get('/repuestosborrar/:id', auth, acceso, cRepuestos.getDel);
	app.get('/getCantRepuestosEnRubro/:id_rubro', auth, cRepuestos.getCantRepuestosEnRubroById);
	//vehiculos
	app.get('/vehiculoslista', auth, acceso, cVehiculos.getLista);
	app.get('/vehiculosalta', auth, acceso, cVehiculos.getAlta);
	app.post('/vehiculosalta', auth, cVehiculos.postAlta);
	app.get('/vehiculosmodificar/:id', auth, acceso, cVehiculos.getModificar);
	app.post('/vehiculosmodificar', auth, cVehiculos.postModificar);
	app.get('/vehiculosborrar/:id', auth, acceso, cVehiculos.getDel);
	app.get('/vehiculosver/:id', auth, acceso, cVehiculos.getVer);
	app.get("/vehiculos_verificarNumero/:numero", auth, cVehiculos.verificarNumero);
	//proveedores
	app.get('/proveedoreslista', auth, acceso, cProveedores.getLista);
	app.get('/proveedoresalta', auth, acceso, cProveedores.getAlta);
	app.post('/proveedoresalta', auth, cProveedores.postAlta);
	app.get('/proveedoresmodificar/:id', auth, acceso, cProveedores.getModificar);
	app.post('/proveedoresmodificar', auth, cProveedores.postModificar);
	app.get('/proveedoresborrar/:id', auth, acceso, cProveedores.getDel);
	app.get('/proveedoresver/:id', auth, cProveedores.getVer);
	//agenda
	app.get('/agendalista', auth, acceso, cAgenda.getLista);
	app.get('/agendaalta', auth, acceso, cAgenda.getAlta);
	app.post('/agendaalta', auth, cAgenda.postAlta);
	app.get('/agendamodificar/:id', auth, acceso, cAgenda.getModificar);
	app.post('/agendamodificar', auth, cAgenda.postModificar);
	app.get('/agendaborrar/:id', auth, acceso, cAgenda.getDel);
	app.get('/agendaupdatehecho/:id/:valor', auth, cAgenda.updateHecho);
	//otrosgastos
	app.get("/otrosgastoslista", auth, cOtrosGastos.getLista);
	app.get("/otrosgastosalta", auth, acceso, cOtrosGastos.getAlta),
	app.post("/otrosgastosalta", auth, cOtrosGastos.postAlta);
	app.get("/otrosgastosmodificar/:id", auth, acceso, cOtrosGastos.getModificar);
	app.post("/otrosgastosmodificar", auth, cOtrosGastos.postModificar);
	app.get("/otrosgastosborrar/:id", auth, acceso, cOtrosGastos.getDel);
	//combustibles - planilla diaria
	app.get("/planilladiarialista", auth, acceso, cPlanillaDiaria.getLista);
	app.get("/planilladiariaalta", auth, acceso, cPlanillaDiaria.getAlta);
	app.post("/planilladiariaalta", auth, cPlanillaDiaria.postAlta);
	app.get("/planilladiariamodificar/:id", auth, acceso, cPlanillaDiaria.getModificar);
	app.post("/planilladiariamodificar", auth, cPlanillaDiaria.postModificar);
	app.get("/planilladiariaborrar/:id", auth, acceso, cPlanillaDiaria.getDel);
	app.get("/getplanilladiariabyfecha/:fecha", auth, cPlanillaDiaria.getByFecha);
	app.get("/planilladiariaverfechascondatos", auth, cPlanillaDiaria.getVerFechasConDatos);
	app.get("/getplanilladiariadfechascondatos/:desde/:hasta", auth, cPlanillaDiaria.getFechasConDatos);
	//Tank - Carga gas oil a tanque
	app.get("/tanklista", auth, acceso, cTank.getLista);
	app.get("/tankalta", auth, acceso, cTank.getAlta);
	app.post("/tankalta", auth, cTank.postAlta);
	app.get("/tankmodificar/:id", auth, acceso, cTank.getModificar);
	app.post("/tankmodificar", auth, cTank.postModificar);
	app.get("/tankborrar/:id", auth, acceso, cTank.getDel);
	app.get("/gettankentrefechas/:desde/:hasta", auth, cTank.getTankEntreFechas);
	//consulta stock gasoil en tanque
	app.get("/stockgasoilentanque", auth, acceso, cStockGasoilEnTanque.getIndex);
	app.get("/getstock/:id_tanque/:fecha", auth, cStockGasoilEnTanque.getStock);
	//consulta consumo x fechas
	app.get("/consumoxfechas", auth, acceso, cConsumoxFechas.getIndex);
	app.get("/getconsumoentrefechas/:desde/:hasta", auth, cConsumoxFechas.getConsumoEntreFechas);
	//administracion - codigos ingreso egreso
	app.get("/codigosie_lista", auth, acceso, cCodigosIE.getLista);
	app.get("/codigosie_alta", auth, acceso, cCodigosIE.getAlta);
	app.post("/codigosie_alta", auth, cCodigosIE.postAlta);
	app.get("/codigosie_modificar/:id", auth, acceso, cCodigosIE.getModificar);
	app.post("/codigosie_modificar", auth, cCodigosIE.postModificar);
	app.get("/codigosie_borrar/:id", auth, acceso, cCodigosIE.getDel);
	// administracion - ingresos y egresos "ingegr"
	app.get("/ingegr_lista", auth, acceso, cIngegr.getLista);
	app.get("/ingegr_getDesdeHasta/:desde/:hasta", auth, cIngegr.getDesdeHasta);
	app.get("/ingegr_alta", auth, acceso, cIngegr.getAlta);
	app.post("/ingegr_alta", auth, cIngegr.postAlta);
	app.get("/ingegr_modificar/:id", auth, acceso, cIngegr.getModificar);
	app.post("/ingegr_modificar", auth, cIngegr.postModificar);
	app.get("/ingegr_borrar/:id", auth, acceso, cIngegr.getDel);
	app.get("/flujodefondos_index", auth, acceso, cFlujoDeFondos.getIndex);
	app.post("/flujodefondos_generacion", auth, cFlujoDeFondos.postGeneracion);
	app.get("/flujodefondos_generacion_excel/:anio/:mes", auth, cFlujoDeFondos.getGeneracion_Excel);
	// CONJUNTOS: Definicion de Conjunto y Fichas de Conjunto
	app.get("/conjuntos_alta", auth, acceso, cConjunto.getAlta);
	app.get("/conjunto_buscar_repuesto_por_codigo/:codigo", auth, cConjunto.getBuscar_Repuesto_x_Codigo);
	app.get("/conjunto_buscar_repuesto_por_codigo_y_serie/:codigo/:serie", auth, cConjunto.getBuscar_Repuesto_x_Codigo_y_Serie);
	app.get("/conjunto_verificar_codigoyserie/:codigo/:serie", auth, cConjunto.getVerificar_CodigoySerie);
	// app.get("/conjunto_ficha_verificar_codigoyserie/:codigo/:serie", auth, cConjunto.getBuscar_ConjuntoFicha_x_CodigoySerie);
	app.post("/conjuntos_alta", auth, acceso, cConjunto.postAlta);
	app.get("/conjunto_buscarfichaxcodigo", auth, acceso, cConjunto.getBuscar_Ficha_x_Codigo);
	app.get("/conjunto_verficha/:codigo/:serie", auth, acceso, cConjunto.getVerFicha);
	app.get("/conjunto_definicion_buscarxcodigo/:codigo", auth, cConjunto.getBuscar_ConjuntoDefinicion_xCodigo);
	app.get("/conjunto_ficha_alta/:codigo/:serie", auth, acceso, cConjunto.getConjunto_Ficha_Alta);
	app.post('/conjunto_ficha_alta', auth, cConjunto.postConjuntoFicha_Alta);
	app.get("/conjunto_buscarfichaxlistado", auth, acceso, cConjunto.getBuscar_Ficha_x_Listado);
	app.get("/getFichasFiltro/:opcion/:codigo", auth, cConjunto.getFichas_x_Filtro);
	app.get("/conjunto_modificar/:id", auth, acceso, cConjunto.getModificar);
	app.post("/conjunto_modificar", auth, cConjunto.postModificar);
	app.get("/conjunto_borrar/:id", auth, acceso, cConjunto.getDel);
	app.get("/conjunto_ficha_modificar/:id", auth, acceso, cConjunto.getFicha_Modificar);
	app.post("/conjunto_ficha_modificar", auth, cConjunto.postFicha_Modificar);
	app.get("/conjunto_ficha_borrar/:id", auth, acceso, cConjunto.getFicha_Del);
	app.post("/conjunto_dardebaja/:id/:fecha_baja/:motivo_baja", auth, cConjunto.postBaja);
	app.post("/conjunto_dardealta/:id", auth, cConjunto.postRecuperarAlta);
	app.get("/conjunto_buscarxcoche", auth, acceso, cConjunto.getBuscarxCoche);
	app.post("/conjunto_buscarxcoche", auth, cConjunto.postBuscarxCoche);
	app.get("/conjunto_formacioncoche/:numero", auth, acceso, cConjunto.getFormacionCoche);
	app.get("/conjunto_checkFormacionNotNull/:numero", auth, cConjunto.getCheckFormacionNotNull);
	app.get("/conjunto_buscarneumaticoxcoche", auth, acceso, cConjunto.getNeumaticoCoche);
	app.post("/conjunto_buscarneumaticoxcoche", auth, cConjunto.postNeumaticoCoche);
	app.get("/conjunto_checkNeumaticosNotNull/:numero", auth, cConjunto.getCheckNeumaticoNotNull);
	app.get("/conjunto_neumaticos_ubicacion/:numero", auth, acceso, cConjunto.getNeumaticos_Ubicacion);
	// VALES DE PAÑOL
	app.get("/vales_lista", auth, acceso, cVales.getLista);
	app.get("/getValesFiltroFecha/:desde/:hasta", auth, cVales.getValesFiltroFecha);
	app.get("/vales_alta", auth, acceso, cVales.getAlta);
	app.post("/vales_alta", auth, cVales.postAlta);
	app.get("/vales_modificar/:id", auth, acceso, cVales.getModificar);
	app.post("/vales_modificar", auth, cVales.postModificar);
	app.get("/vales_borrar/:id", auth, acceso, cVales.getDel);
	app.get("/vales_ver/:id", auth, cVales.getVer);
	app.get("/vales_alta_repuesto/:id_vale1", auth, cVales.getAltaRepuesto);
	app.post("/vales_alta_repuesto", auth, cVales.postAltaRepuesto);
	app.get("/vales_modificar_repuesto/:id_vale1/:id_vale2", auth, cVales.getModificarRepuesto);
	app.post("/vales_modificar_repuesto", auth, cVales.postModificarRepuesto);
	app.get("/vales_borrar_repuesto/:id_vale1/:id_vale2", auth, cVales.getDelRepuesto);
	// REPARACIONES DE EMERGENCIA
	app.get("/reparaciones_lista", auth, acceso, cReparaciones.getLista);
	app.get("/getReparacionesFiltroFecha/:desde/:hasta", auth, cReparaciones.getReparacionesFiltroFecha);
	app.get("/reparaciones_alta", auth, acceso, cReparaciones.getAlta);
	app.get("/reparaciones_checkVale/:nro_vale", auth, cReparaciones.getCheckNroVale);
	app.post("/reparaciones_alta", auth, cReparaciones.postAlta);
	app.get("/reparaciones_modificar/:id", auth, acceso, cReparaciones.getModificar);
	app.post("/reparaciones_modificar", auth, cReparaciones.postModificar);
	app.get("/reparaciones_borrar/:id", auth, acceso, cReparaciones.getDel);
	app.get("/reparaciones_ver/:id", auth, acceso, cReparaciones.getVer);

	//EQUIPOS
	app.get("/equipos_lista", auth, acceso, cEquipos.getLista);
	app.get("/equipos_alta", auth, acceso, cEquipos.getAlta);
	app.post("/equipos_alta", auth, cEquipos.postAlta);
	app.get("/equipos_ver/:id", auth, acceso, cEquipos.getVer);
	app.get("/equipos_modificar/:id", auth, acceso, cEquipos.getModificar);
	app.post("/equipos_modificar", auth, cEquipos.postModificar);
	app.get("/equipos_eliminar/:id", auth, acceso, cEquipos.getDelete);
	app.get("/equipos_filtrar/:opcion/:buscar", auth, acceso, cEquipos.getEquiposFiltro);
	//HERRAMIENTRAS - MOVIMIENTOS
	app.get("/herramientas_lista", auth, acceso, cHerramientas.getLista);
	app.get("/herramientas_filtrar/:desde/:hasta/:denominacion", auth, acceso, cHerramientas.getFiltrar);
	app.get("/herramientas_alta", auth, acceso, cHerramientas.getAlta);
	app.get("/herramientas_filtro_repuestos/:codigo/:descripcion", auth, acceso, cHerramientas.getRepuestos);
	app.get("/herramientas_alta_form/:codigo", auth, acceso, cHerramientas.getAltaForm);
	app.post("/herramientas_alta", auth, cHerramientas.postAlta);
	app.get("/herramientas_ver/:id_herramienta", auth, acceso, cHerramientas.getVer);
	app.get("/herramientas_modificar/:id_herramienta", auth, acceso, cHerramientas.getModificar);
	app.post("/herramientas_modificar", auth, cHerramientas.postModificar);
	app.get("/herramientas_eliminar/:id_herramienta", auth, acceso, cHerramientas.getEliminar);
	app.get("/herramientas_ubicaciones", auth, acceso, cHerramientas.getUbicaciones);
	app.post("/herramientas_cambiar_ubicacion", auth, cHerramientas.postHerramientasUbicacion);
	app.post("/herramientas_modificar_fechaCambio/:id_herramienta/:opcion", auth, cHerramientas.postModificarFechaCambio);	
	//HERRAMIENTAS - CONTROL MENSUAL
	app.get("/herramientas_controlmensual", auth, acceso, cHerramientas.getControlMensual);
	app.get("/herramientas_listaoperarios/:desde/:hasta/:operario", auth, acceso, cHerramientas.getOperarios);
	//HERRAMIENTAS - REPORTE X UBICACION
	app.get("/herramientas_reporteubicacion", auth, acceso, cHerramientas.getReporteXUbicacion);
	app.get("/herramientas_listareporteubicacion/:desde/:hasta/:id_ubicacion", auth, acceso, cHerramientas.getListadoReporteUbicacion);





	//pruebasql
	// app.get('/pruebasql', auth, cPruebaSQL.getPrueba);
	// //random
	app.get('/random', auth, acceso, cRandom.getRandom);
	app.get('/updateRepuestosConIdRubroFk', auth, cRandom.updateRepuestosConIdRubroFk);
	app.get("/updateTablaVehiculosConFive", auth, cRandom.updateTablaVehiculosConFive);
	app.get("/updateTablaSecr", auth, cRandom.updateTablaSecrConOperariosTemp);
	app.get("/actualizarOtrosGastos", auth, cRandom.updateOtrosGastos);
	app.get("/actualizarEquipos", auth, cRandom.updateEquipos);
	app.get("/actualizarConjuntos", auth, cRandom.updateConjuntos);
	app.get("/actualizarConjuntosFichas", auth, cRandom.updateConjuntosFichas);
	app.get("/actualizarVales", auth, cRandom.updateVales);
	app.get("/actualizarHerramientas", auth, cRandom.updateHerramientas);
};