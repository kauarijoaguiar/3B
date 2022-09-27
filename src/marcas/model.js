const { DataTypes, Model } = require('sequelize');
const { sequelizeCon } = require('../config/db-config');

class Marca extends Model {}
    
Marca.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome : DataTypes.STRING,
    descricao: DataTypes.STRING,
    datacriacao : DataTypes.DATE,
    cidade : DataTypes.STRING,

}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'marca',
    createdAt: false,
    updatedAt: false,
    timestamps: true
},true);

module.exports = { Marca };