const conn = require('../config/db').conn;

module.exports = {
	getAll : getAll
}

function getAll (cb) {
	conn("SELECT * FROM rubros_grupos", cb);
}