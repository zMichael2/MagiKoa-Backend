"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registro = exports.ControlCita = exports.Empleado = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Empleado extends sequelize_1.Model {
}
exports.Empleado = Empleado;
Empleado.init({
    id: {
        type: sequelize_1.DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Empleado",
    tableName: "empleados",
    timestamps: false,
});
class ControlCita extends sequelize_1.Model {
}
exports.ControlCita = ControlCita;
ControlCita.init({
    id: {
        type: sequelize_1.DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    empleado_id: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    celular: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    hora: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "ControlCita",
    tableName: "controlcita",
    timestamps: false,
});
class Registro extends sequelize_1.Model {
}
exports.Registro = Registro;
Registro.init({
    id: {
        type: sequelize_1.DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    empleado_id: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    gasto: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    insumo: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    servicio: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    tipo_pago: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Registro",
    tableName: "registro",
    timestamps: false,
});
Empleado.hasMany(ControlCita, { foreignKey: "empleado_id" });
ControlCita.belongsTo(Empleado, { foreignKey: "empleado_id" });
Empleado.hasMany(Registro, { foreignKey: "empleado_id" });
Registro.belongsTo(Empleado, { foreignKey: "empleado_id" });
