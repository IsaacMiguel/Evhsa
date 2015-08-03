var mEmple = require('../models/mEmple');
var mCargos = require('../models/mCargos');
var mBorro = require('../models/mBorro');
var mAyuda = require('../models/mAyuda');
var mSectores = require('../models/mSectores');
var mCategorias = require('../models/mCategorias');
var mCondicion = require('../models/mCondicion');
var mTurnos = require('../models/mTurnos');
var mContratos = require('../models/mContratos');

var nodeExcel = require('excel-export');

module.exports = {
	getEmpleados: getEmpleados,
	getVer: getVer,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDelEmple: getDelEmple,
	getAllEmple: getAllEmple,
	getExport: getExport,
	getFiltro: getFiltro,
	postFiltro: postFiltro
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getEmpleados(req, res) {
	req.session.nromenu = 4;
	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
		mCargos.getAll(function (cargos){
	  		mEmple.getAllActivos(function (empleados){
				//console.log(docs2)
	  			res.render('emplelista', {
					pagename: 'Archivo de Empleados',
					cargos: cargos,
					empleados: empleados,
					ayuda: ayuda[0]
				});
	  		});
	  	});
	});
}

function getVer(req, res){
	params = req.params;
	codigo = params.codigo;
	mEmple.getEmplePorCodigoconJoin(codigo, function (emple){
		res.render('emplever',{
			pagename: 'Ver Ficha de Empleado',
			emple: emple[0],
		});
	});
}

function getAlta(req, res){
	mSectores.getAllActivos(function (sectores){
		mCargos.getAll(function (cargos){
			mEmple.getUltimo(function (docs2){
				mCategorias.getAll(function (categorias){
					mCondicion.getAll(function (condiciones){
						mTurnos.getAll(function (turnos){
							mContratos.getAll(function (contratos){
								if(docs2[0].max==null)
									res.render('emplealta', {
										pagename: 'Alta de Empleados',
										cargos: cargos,
										sectores: sectores,
										cdmax: 1,
										categorias: categorias,
										condiciones: condiciones,
										turnos: turnos,
										contratos: contratos
									});
								else
									res.render('emplealta', {
										pagename: 'Alta de Empleados',
										cargos: cargos,
										sectores: sectores,
										cdmax: docs2[0].max +1,
										categorias: categorias,
										condiciones: condiciones,
										turnos: turnos,
										contratos: contratos
									});
							});
						});
					});
				});
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	console.log(params)
	codigo = params.codigo;
	nombre = params.nombre;
	falta = params.falta;
	fbaja = params.fbaja;
	cargo = params.cargo;
	sector = params.sector;
	//nuevos campos
	legajo = params.legajo;
	cuil = params.cuil;
	fnac = params.fnac;
	domicilio = params.domicilio;
	cp = params.cp;
	telefono = params.telefono;
	tarjeta = params.tarjeta;
	sexo = params.sexo;
	//fin nuevos campos
	falta = changeDate(falta);
	fbaja = changeDate(fbaja);
	fnac = changeDate(fnac);

	//nuevos campos
	categoria = params.categoria;
	turno = params.turno;
	condicion = params.condicion;
	contrato = params.contrato;

	if (sexo == "masculino") {
		sexo = 0;
	}else{
		sexo = 1;
	}

	if (fbaja == ""){
		res.render('error',{
			error: "La fecha de baja no puede estar vacia."
		});
	}else{
		mEmple.getEmplePorLegajo(legajo, function (emple){
			if (emple[0] != null){
				res.render('error',{
					error: "El número de legajo no puede repetirse."
				});
			}else{
				mEmple.insert(codigo, nombre, falta, fbaja, cargo, sector, 1, legajo, cuil, fnac, domicilio, cp, telefono, tarjeta, sexo, categoria, turno, condicion, contrato, function(){
					res.redirect('emplelista');
				});
			}
		});
	}
}	

function getModificar(req, res){
	params = req.params;
	codigo= params.codigo;
	mEmple.getEmplePorCodigo(codigo, function (emple){
		mCargos.getAll(function (cargos){
			mSectores.getAllActivos(function (sectores){
				mCategorias.getAll(function (categorias){
					mCondicion.getAll(function (condiciones){
						mTurnos.getAll(function (turnos){
							mContratos.getAll(function (contratos){
								res.render('emplemodificar', {
									pagename: 'Modificar Empleado',
									emple: emple[0],
									cargos: cargos,
									sectores: sectores,
									categorias: categorias,
									condiciones: condiciones,
									turnos: turnos,
									contratos: contratos
								});
							});
						});
					});
				});
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	codigo = params.codigo;
	nombre = params.nombre;
	falta = params.falta;
	fbaja =  params.fbaja;
	cargo = params.cargo;
	sector = params.sector;
	activo = params.activa;
	//nuevos campos
	legajo = params.legajo;
	cuil = params.cuil;
	fnac = params.fnac;
	domicilio = params.domicilio;
	cp = params.cp;
	telefono = params.telefono;
	tarjeta = params.tarjeta;
	sexo = params.sexo;
	//fin nuevos campos

	if (sexo == "masculino")
		sexo = 0;
	else
		sexo = 1;


	if (activo=='on')
		activo=1;
	else
		activo=0;
	falta = changeDate(falta);
	fbaja = changeDate(fbaja);
	fnac = changeDate(fnac);
	//nuevos campos
	categoria = params.categoria;
	turno = params.turno;
	condicion = params.condicion;
	contrato = params.contrato;

	mEmple.getEmplePorLegajo(legajo, function (empleporlegajo){
		mEmple.getEmplePorLegajoConIdDistinto(empleporlegajo[0].codigo, legajo, function (empleporlegajocondistintoid){
			if (empleporlegajocondistintoid[0] != null){
				res.render('error',{
					error: "El número de legajo no puede repetirse."
				});
			}else{
				mEmple.update(codigo, nombre, falta, fbaja, cargo, sector, activo, legajo, cuil, fnac, domicilio, cp, telefono, tarjeta, sexo, categoria, turno, condicion, contrato, function(){
					res.redirect('/emplelista');
				})
			}
		});
	});
}

function getDelEmple(req, res){
  var params = req.params;
  var codigo = params.codigo;

  mEmple.getEmplePorCodigo(codigo, function (docs){
  	emple = docs[0];
  	mBorro.add(req.session.user.usuario,"Empleados", "Borra Nombre de Empleado: "+ emple.nombre + ", id: "+ emple.codigo, function(){
  		mEmple.delEmple(codigo, function(){
	    	res.redirect('/emplelista'); 
	  	});
  	});	
  });  
}

function getAllEmple(req, res){
	mEmple.getAllActivos(function (emples){
		res.send(emples);
	});
}

//export to excel

function getExport(req, res){

    var conf ={};
    conf.stylesXmlFile = "styles.xml";
    conf.cols = [{
        caption:'string',
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        },
        width:28.7109375
    },{
        caption:'date',
        type:'date',
        beforeCellWrite:function(){
            var originDate = new Date(Date.UTC(1899,11,30));
            return function(row, cellData, eOpt){
                if (eOpt.rowNum%2){
                    eOpt.styleIndex = 1;
                }  
                else{
                    eOpt.styleIndex = 2;
                }
                if (cellData === null){
                  eOpt.cellType = 'string';
                  return 'N/A';
                } else
                  return (cellData - originDate) / (24 * 60 * 60 * 1000);
            } 
        }()
    },{
        caption:'bool',
        type:'bool'
    },{
        caption:'number',
         type:'number'              
    }];
    conf.rows = [
        ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
        ["e", new Date(2012, 4, 1), false, 2.7182],
        ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
        ["null date", null, true, 1.414]  
    ];

    var result = nodeExcel.execute(conf);
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.send(result, 'binary');

}

function getTurnos(req, res){
	params = req.params;
	idsector = params.idsector;

	mTurnos.getByIdSector(idsector, function (turnos){
		res.send(turnos);
	});
}

function getFiltro(req, res){
	mSectores.getAll(function (sectores){
		mTurnos.getAllSinRepetir(function (turnos){
			mCondicion.getAll(function (condiciones){
				res.render("emplefiltro", {
					pagename: "Filtrar Lista de Empleados",
					sectores: sectores,
					turnos: turnos,
					condiciones: condiciones
				});
			});
		});
	});
}

function postFiltro(req, res){
	params = req.body;
	idsector = params.cmbSector;
	idcondicion = params.cmbCondicion;
	codigoturno = params.cmbTurno;
	nrolegajomenor = params.legajomenor;
	nrolegajomayor = params.legajomayor;

	console.log(codigoturno)
	mEmple.getFiltrado(idsector, idcondicion, codigoturno, nrolegajomenor, nrolegajomayor, function (empleados){
		res.render("emplelista", {
			pagename: "Lista de Empleados Filtrada",
			empleados: empleados
		});
	});
}