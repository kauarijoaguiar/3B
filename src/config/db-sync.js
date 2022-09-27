const { Usuario } = require('../usuarios/model');
const { Tenis } = require('../tenis/model');
const { Marca } = require('../marcas/model');
const { sequelizeCon } = require('./db-config');


Tenis.belongsTo(Marca);
Marca.hasMany(Tenis);

Marca.belongsTo(Usuario);
Usuario.hasMany(Marca);

sequelizeCon.sync();