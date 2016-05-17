// ONKEYPRESS NO ANDA, USAR ONKEYDOWN

function soloNumeros(e){
	var key = window.Event ? e.which : e.keyCode
	return (key >= 48 && key <= 57)
}//onKeyPress="return soloNumeros(event)"

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function changeDate2(date){
	// input: yyyy/mm/dd
	fechaus = date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
	return fechaus;
	// output: dd/mm/yyyy
}

function changeDate3(date){
    // input: dd/mm/yyyy
    fechaus = date.substring(6,10) + "-" + date.substring(3,5) + "-" + date.substring(0,2);
    return fechaus;
    // output: yyyy-mm-dd
}

function Numy1Punto(e, field) {
	key = e.keyCode ? e.keyCode : e.which
	// backspace
	if (key == 8) return true
	// 0-9
	if (key > 47 && key < 58) {
    	if (field.value == "") return true
    	regexp = /.[0-9]{2}$/
    	return !(regexp.test(field.value))
    	}
    	// .
    	if (key == 46) {
    	if (field.value == "") return false
    	regexp = /^[0-9]+$/
    	return regexp.test(field.value)
	}
	// other key
	return false
}//onkeypress="return Numy1Punto(event, this)"

function checkDec(el){
	var ex = /^[0-9]+\.?[0-9]*$/;
	if(ex.test(el.value)==false){
	   	el.value = el.value.substring(0,el.value.length - 1);
	}
}//i cant remember what this does

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}// onkeypress='validate(event)'

function Validate7EntY2Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
            	// dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{7}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate7EntY2Dec(event,this)"

function Validate7EntY2Dec_Neg(e, field) {// ^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{7}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[+-]?[0-9]{7}\\.[0-9]{2}$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate7EntY2Dec_Neg(event,this)"


function Validate8EntY2Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{8}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate8EntY2Dec(event,this)"

function lettersOnly(evt) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        // alert("Enter letters only.");
        return false;
    }
    return true;
}//onkeypress="return lettersOnly(event)"

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}//onkeypress="return isNumber(event)"

function isNumberKey(evt){
    var e = evt || window.event; //window.event is safer, thanks @ThiefMaster
    var charCode = e.which || e.keyCode;                        
    if (charCode > 31 && (charCode < 47 || charCode > 57))
        return false;
    if (e.shiftKey) return false;
        return true;
}//onkeypress="return isNumberKey(event)"

// PARA EL SWIG CUANDO SE USA CON AJAX EN LAS VISTAS
function parseSwig(input, data) {
    var output = swig.render(input, { locals: {
        data: data
    }});

    return output;
}

function generateTodayDate(){
    var myDate = new Date();
    year = myDate.getFullYear(); 
    day = myDate.getDate();
    if (day<10)
        day = "0"+day;
    month = myDate.getMonth()+1;
    if (month<10)
        month = "0"+month
    myDate = day + "/" + month + "/" + year;
    return myDate;
}

function Validate6EntY1Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{1}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{6}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate6EntY1Dec(event,this)"

function generateTodayDateYMD () {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;

    if (day < 10) { day = '0' + day }
    if (month < 10) { month = '0' + month }

    today = today.getFullYear() + '-' + month + '-' + day;
    return today;
}

function checkDateLessToday (date) {
    var fecha = new Date(date);
    var fecha_hoy = new Date();

    if (fecha > fecha_hoy) {
        return false;
    } else {
        return true;
    }
}

function generateFirstDateActualMonth () {
    var desdeSet = new Date();
    var mes = desdeSet.getMonth() + 1;

    if (mes < 10) { mes = '0' + mes }

    desdeSet = '01/' + mes + '/' + desdeSet.getFullYear();
    
    return desdeSet;
}

//testing functions

//{1,9} significa 1 digito entero minimo y 9 maximo
//{1,2} significa 1 digito decimal minimo y 2 maximo
//signo negativo es opcional
//valores enteros y decimales entre 0 y 9
// ^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$

// function numbersOnly(Sender, evt, isFloat, isNegative) {
//     if(Sender.readOnly) return false;       

//     var key   = evt.which || !window.event ? evt.which : event.keyCode;
//     var value = Sender.value;

//     if((key == 46 || key == 44) && isFloat){                
//         var selected = document.selection ? document.selection.createRange().text : "";
//         if(selected.length == 0 && value.indexOf(".") == -1 && value.length > 0) Sender.value += ".";
//         return false;
//     }
//     if(key == 45) { // minus sign '-'
//         if(!isNegative) return false;
//         if(value.indexOf('-')== -1) Sender.value = '-'+value; else Sender.value = value.substring(1);
//         if(Sender.onchange != null) {
//             if(Sender.fireEvent){
//                 Sender.fireEvent('onchange');
//             } else {
//                 var e = document.createEvent('HTMLEvents');
//                     e.initEvent('change', false, false);
//                 Sender.dispatchEvent(e);
//             }
//         }

//         var begin = Sender.value.indexOf('-') > -1 ? 1 : 0;
//         if(Sender.setSelectionRange){
//             Sender.setSelectionRange(begin,Sender.value.length);
//         } else {
//             var range = Sender.createTextRange();
//             range.moveStart('character',begin);
//             range.select();                 
//         }

//         return false;
//     }
//     if(key > 31 && (key < 48 || key > 57)) return false;
// }//onkeypress='return numbersOnly(this,event,false,true);' asd