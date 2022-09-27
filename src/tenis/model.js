const { DataTypes, Model } = require('sequelize');
const { sequelizeCon } = require('../config/db-config');
const { Marca } = require('../marcas/model');

class Tenis extends Model {}
    
Tenis.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome : DataTypes.STRING,
    descricao: DataTypes.STRING,
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'tenis',
    createdAt: false,
    updatedAt: false,
    timestamps: true
},true);



module.exports = { Tenis };