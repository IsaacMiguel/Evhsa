const conn = require('../config/db').conn;

module.exports = {
	getByAltas : getByAltas,
	getByBajas : getByBajas,
	getAll : getAll,
	getUltima : getUltima,
	getValorRepuesto : getValorRepuesto,
	insert : insert,
	update : update,
	getById : getById,
	del : del,
	getVer : getVer
}

function getByAltas (desde, hasta, cb) {
	conn("SELECT *, DATE_FORMAT(fecha, '%d/%m/%Y') as fecha_f, facturas.id as id_facturas " +
	"FROM facturas " +
	"LEFT JOIN proveedores ON proveedores.id = facturas.id_proveedor_fk " +
	"LEFT JOIN repuestos ON repuestos.codigo = facturas.codigo_articulo_fk " +
	"WHERE " +
	"fecha >= '" + desde + "' AND " +
	"fecha <= '" + hasta + "' AND " +
	"cantidad > 0 ORDER BY fecha DESC", cb);
}

function getByBajas (desde, hasta, cb) {
	conn("SELECT *, DATE_FORMAT(fecha, '%d/%m/%Y') as fecha_f, facturas.id as id_facturas  " +
	"FROM facturas " +
	"LEFT JOIN proveedores ON proveedores.id = facturas.id_proveedor_fk " +
	"LEFT JOIN repuestos ON repuestos.codigo = facturas.codigo_articulo_fk " +
	"WHERE " +
	"fecha >= '" + desde + "' AND " +
	"fecha <= '" + hasta + "' AND " +
	"cantidad < 0 ORDER BY fecha DESC", cb);
}

function getAll (desde, hasta, cb) {
	conn("SELECT *, DATE_FORMAT(fecha, '%d/%m/%Y') as fecha_f, facturas.id as id_facturas  " +
	"FROM facturas " +
	"LEFT JOIN proveedores ON proveedores.id = facturas.id_proveedor_fk " +
	"LEFT JOIN repuestos ON repuestos.codigo = facturas.codigo_articulo_fk " +
	"WHERE " +
	"fecha >= '" + desde + "' AND " +
	"fecha <= '" + hasta + "' ORDER BY fecha DESC", cb);
}

function getUltima (cb) {
	conn("SELECT *, " +
	"DATE_FORMAT(fecha, '%d/%m/%Y') as fecha_f " +
	" FROM facturas ORDER BY id DESC LIMIT 1", cb);
}

function getValorRepuesto (codigo, cb) {
	conn("SELECT valor FROM repuestos WHERE codigo = '" + codigo + "'", cb);
}

function insert (fecha, id_operario_fk, nro_comprobante, codigo_articulo_fk, importe, id_proveedor_fk, cantidad, mueve, detalle, cb) {
	conn("INSERT INTO facturas (fecha, id_operario_fk, nro_comprobante, codigo_articulo_fk, importe, id_proveedor_fk, cantidad, mueve, detalle) " +
	"VALUES (" +
	"'" + fecha + "', " +
	id_operario_fk + ", " +
	"'" + nro_comprobante + "', " +
	"'" + codigo_articulo_fk + "', " +
	importe + ", " +
	id_proveedor_fk + ", " +
	cantidad + ", " +
	"'" + mueve + "'," +
	"'" + detalle + "')", cb);
}

function update (id_factura, fecha, id_operario_fk, nro_comprobante, codigo_articulo_fk, importe, id_proveedor_fk, cantidad, mueve, detalle, cb) {
	conn("UPDATE facturas " +
	"SET fecha='" + fecha + "', " +
	"id_operario_fk = " + id_operario_fk + ", " +
	"nro_comprobante = '" + nro_comprobante + "', " +
	"codigo_articulo_fk = '" + codigo_articulo_fk + "', " +
	"importe = " + importe + ", " +
	"id_proveedor_fk = " + id_proveedor_fk + ", " +
	"cantidad = " + cantidad + ", " +
	"mueve = '" + mueve + "', " +
	"detalle = '" + detalle + "'" +
	"WHERE id = " + id_factura, cb);
}

function getById (id, cb) {
	conn("SELECT *, DATE_FORMAT(fecha, '%d/%m/%Y') as fecha_f FROM facturas WHERE id = " + id, cb);
}

function del (id_factura, cb) {
	conn("DELETE FROM facturas WHERE id = " + id_factura, cb);
}

function getVer (id_factura, cb) {
	conn("SELECT * FROM facturas " +
	"LEFT JOIN proveedores ON proveedores.id = facturas.id_proveedor_fk " +
	"LEFT JOIN repuestos ON repuestos.codigo = facturas.codigo_articulo_fk " +
	"WHERE facturas.id = " + id_factura, cb);
}