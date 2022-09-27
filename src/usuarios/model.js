const { DataTypes, Model } = require('sequelize');
const { sequelizeCon } = require('../config/db-config');

class Usuario extends Model {}
    
Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    email: DataTypes.STRING,
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'usuario',
    createdAt: false,
    updatedAt: false,
    timestamps: true
});


module.exports = { Usuario };