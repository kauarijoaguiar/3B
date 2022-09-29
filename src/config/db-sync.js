const { Usuario } = require('../usuarios/model');
const { Tenis } = require('../tenis/model');
const { Marca } = require('../marcas/model');
const { sequelizeCon } = require('./db-config');


Tenis.belongsTo(Marca);
Marca.hasMany(Tenis, { onDelete: 'CASCADE' } );

Marca.belongsTo(Usuario);
Usuario.hasMany(Marca, { onDelete: 'CASCADE' });

sequelizeCon.sync();