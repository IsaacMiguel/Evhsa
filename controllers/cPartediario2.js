var mPartediario1 = require('../models/mPartediario1');
var mPartediario2 = require('../models/mPartediario2');
var mAyuda = require('../models/mAyuda');
var mLugares = require('../models/mLugares');
var mSectores = require('../models/mSectores');
var mClasificacion = require('../models/mClasificacion')
var mImputacion = require('../models/mImputacion');
var mEmple = require('../models/mEmple');
var mTipoHora = require('../models/mTipoHora');
var mCodigohora = require('../models/mCodigoHora');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getEmples: getEmples,
	getEmpleInPartediario2: getEmpleInPartediario2
};

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	params = req.params;
	id = params.id;
	//req.session.nromenu = 5;
	//mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	mPartediario1.getById(id, function (partediario1){
		//console.log(partediario1[0])
		mPartediario2.getAllByPartediario1Id(id, function (partediario2s){
			mTipoHora.getAllActivos(function (tipohoras){
				res.render('partediario2lista', {
		        	pagename: 'Lista de Empleados',
		        	partediario2s: partediario2s,
		        	partediario1: partediario1[0],
		        	tipohoras: tipohoras
		        	//ayuda: ayuda[0]
		      	}); 
			});		
		}); 	
	});	   
	//});
};


function getAlta(req, res){
	params = req.params;
	id = params.id;
	mSectores.getAll(function (sectores){
		mEmple.getAllActivos(function (empleados){
			res.render('partediario2alta', {
				pagename: "Alta de Empleado",
				empleados: empleados,
				idpartediario1: id,
				sectores: sectores
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	idempleado = params.empleado;
	idpartediario1 = params.idpartediario1;

	//acá corregir para que agrege bien el Numero de empleado en el PArte Diario
	//se va a agregar el campo numero en la funcion insertNewEmpleado

	if( idempleado != 0){
		mPartediario2.getLastNumerobyPd1(idpartediario1, function (lastnumero){
			lastnumero = lastnumero[0].ultnumero;
			//console.log(lastnumero)
			if (lastnumero != null){
				lastnumeroInt = parseInt(lastnumero)
				var proxnro = lastnumeroInt +1;	
			}else{
				var proxnro = 1;
			}
			
			mPartediario2.insertNewEmpleado(idpartediario1, idempleado, proxnro, function(){
				res.redirect('partediario2lista/'+idpartediario1);
			});
		});
	}else{
		res.redirect('partediario2lista/'+idpartediario1);
	}
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mPartediario2.getById(id, function (partediario2){
		mPartediario1.getById(partediario2[0].id_partediario1_fk, function (partediario1){
			mLugares.getAllActivos(function (lugares){
				mSectores.getAllActivos(function (sectores){
					mClasificacion.getAllActivos(function (clasificaciones){
						mImputacion.getAllActivos(function (items){
							mCodigohora.getAll(function (codigoshora){
								mTipoHora.getAll(function (tiposhora){
									//console.log(partediario2)
									res.render('partediario2modificar', {
										pagename: "Modificar Parte Diario",
										partediario2: partediario2[0],
										partediario1: partediario1[0],
										items: items,
										clasificaciones: clasificaciones,
										sectores: sectores,
										lugares: lugares,
										codigoshora: codigoshora,
										tiposhora: tiposhora
									});
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
	id = params.id;
	idpartediario1 = params.idpartediario1;
	codigohora = params.codigohora;
	entrada = params.entrada;
	salida = params.salida;
	total = params.total;
	//nuevos campos
	adicional1_n = params.adicional1_n;
	adicional1_50 = params.adicional1_50;
	adicional1_100 = params.adicional1_100;
	if (!adicional1_n)
		adicional1_n = 0;
	if (!adicional1_50)
		adicional1_50 = 0;
	if (!adicional1_100)
		adicional1_100 = 0;
	adicional2_n = params.adicional2_n;
	adicional2_50 = params.adicional2_50;
	adicional2_100 = params.adicional2_100;
	if (!adicional2_n)
		adicional2_n = 0;
	if (!adicional2_50)
		adicional2_50 = 0;
	if (!adicional2_100)
		adicional2_100 = 0;
	adicional3_n = params.adicional3_n;
	adicional3_50 = params.adicional3_50;
	adicional3_100 = params.adicional3_100;
	if (!adicional3_n)
		adicional3_n = 0;
	if (!adicional3_50)
		adicional3_50 = 0;
	if (!adicional3_100)
		adicional3_100 = 0;
	adicional4_n = params.adicional4_n;
	adicional4_50 = params.adicional4_50;
	adicional4_100 = params.adicional4_100;
	if (!adicional4_n)
		adicional4_n = 0;
	if (!adicional4_50)
		adicional4_50 = 0;
	if (!adicional4_100)
		adicional4_100 = 0;
	adicional5_n = params.adicional5_n;
	adicional5_50 = params.adicional5_50;
	adicional5_100 = params.adicional5_100;
	if (!adicional5_n)
		adicional5_n = 0;
	if (!adicional5_50)
		adicional5_50 = 0;
	if (!adicional5_100)
		adicional5_100 = 0;
	adicional6_n = params.adicional6_n;
	adicional6_50 = params.adicional6_50;
	adicional6_100 = params.adicional6_100;
	if (!adicional6_n)
		adicional6_n = 0;
	if (!adicional6_50)
		adicional6_50 = 0;
	if (!adicional6_100)
		adicional6_100 = 0;
	//fin nuevos campos, actualizar "imputacion" por "items"
	item1_n = params.item1_n;
	item1_50 = params.item1_50;
	item1_100 = params.item1_100;
	if (!item1_n)
		item1_n = 0;
	if (!item1_50)
		item1_50 = 0;
	if (!item1_100)
		item1_100 = 0;
	item2_n = params.item2_n;
	item2_50 = params.item2_50;
	item2_100 = params.item2_100;
	if (!item2_n)
		item2_n = 0;
	if (!item2_50)
		item2_50 = 0;
	if (!item2_100)
		item2_100 = 0;
	item3_n = params.item3_n;
	item3_50 = params.item3_50;
	item3_100 = params.item3_100;
	if (!item3_n)
		item3_n = 0;
	if (!item3_50)
		item3_50 = 0;
	if (!item3_100)
		item3_100 = 0;
	item4_n = params.item4_n;
	item4_50 = params.item4_50;
	item4_100 = params.item4_100;
	if (!item4_n)
		item4_n = 0;
	if (!item4_50)
		item4_50 = 0;
	if (!item4_100)
		item4_100 = 0;
	item5_n = params.item5_n;
	item5_50 = params.item5_50;
	item5_100 = params.item5_100;
	if (!item5_n)
		item5_n = 0;
	if (!item5_50)
		item5_50 = 0;
	if (!item5_100)
		item5_100 = 0;
	item6_n = params.item6_n;
	item6_50 = params.item6_50;
	item6_100 = params.item6_100;
	if (!item6_n)
		item6_n = 0;
	if (!item6_50)
		item6_50 = 0;
	if (!item6_100)
		item6_100 = 0;
	item7_n = params.item7_n;
	item7_50 = params.item7_50;
	item7_100 = params.item7_100;
	if (!item7_n)
		item7_n = 0;
	if (!item7_50)
		item7_50 = 0;
	if (!item7_100)
		item7_100 = 0;
	item8_n = params.item8_n;
	item8_50 = params.item8_50;
	item8_100 = params.item8_100;
	if (!item8_n)
		item8_n = 0;
	if (!item8_50)
		item8_50 = 0;
	if (!item8_100)
		item8_100 = 0;
	item9_n = params.item9_n;
	item9_50 = params.item9_50;
	item9_100 = params.item9_100;
	if (!item9_n)
		item9_n = 0;
	if (!item9_50)
		item9_50 = 0;
	if (!item9_100)
		item9_100 = 0;
	item10_n = params.item10_n;
	item10_50 = params.item10_50;
	item10_100 = params.item10_100;
	if (!item10_n)
		item10_n = 0;
	if (!item10_50)
		item10_50 = 0;
	if (!item10_100)
		item10_100 = 0;
	item11_n = params.item11_n;
	item11_50 = params.item11_50;
	item11_100 = params.item11_100;
	if (!item11_n)
		item11_n = 0;
	if (!item11_50)
		item11_50 = 0;
	if (!item11_100)
		item11_100 = 0;
	item12_n = params.item12_n;
	item12_50 = params.item12_50;
	item12_100 = params.item12_100;
	if (!item12_n)
		item12_n = 0;
	if (!item12_50)
		item12_50 = 0;
	if (!item12_100)
		item12_100 = 0;

	mPartediario2.update(id, codigohora, entrada, salida, total, adicional1_n, adicional1_50, adicional1_100, adicional2_n, adicional2_50, adicional2_100, adicional3_n, adicional3_50, adicional3_100, adicional4_n, adicional4_50, adicional4_100, adicional5_n, adicional5_50, adicional5_100, adicional6_n, adicional6_50, adicional6_100, item1_n, item1_50, item1_100, item2_n, item2_50, item2_100, item3_n, item3_50, item3_100, item4_n, item4_50, item4_100, item5_n, item5_50, item5_100, item6_n, item6_50, item6_100, item7_n, item7_50, item7_100, item8_n, item8_50, item8_100, item9_n, item9_50, item9_100, item10_n, item10_50, item10_100, item11_n, item11_50, item11_100, item12_n, item12_50, item12_100, function(){
		res.redirect('partediario2lista/'+idpartediario1);
	});
}

function getEmples(req, res){
	params = req.params;
	sector = params.id;

	mEmple.getEmpleBySector(sector, function (emples){
		res.send(emples);
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mPartediario2.getById(id, function (p2){
		p2 = p2[0];
		mPartediario2.del(id, function (){
			res.redirect('partediario2lista/'+p2.id_partediario1_fk);
		});
	});
}

function getEmpleInPartediario2(req, res){
	params = req.params;
	idpartediario1 = params.idp1;
	idemple = params.idemple;

	mPartediario2.getEmpleInPartediario2(idpartediario1, idemple, function (resultado){
		res.send(resultado);
	});
}