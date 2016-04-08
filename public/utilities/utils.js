function changeDate2(date, cb){
	// input: yyyy/mm/dd
	fechaus = date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
	cb(fechaus);
	// output: dd/mm/yyyy
}

exports.changeDate2 = changeDate2;