var conn = require('../config/db').conn;

module.exports = {
	getAll
}

function getAll (cb) {
	conn("select * from herramientras", cb);
}