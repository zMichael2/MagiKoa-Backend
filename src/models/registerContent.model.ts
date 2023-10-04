import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Empleado extends Model {
  public id!: string;
  public nombre!: string;
  public active!: boolean;
}

Empleado.init(
  {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Empleado",
    tableName: "empleados",
    timestamps: false,
  }
);

class ControlCita extends Model {
  public id!: string;
  public empleado_id!: string;
  public descripcion!: string;
  public usuario!: string;
  public celular!: string;
  public fecha!: string;
  public hora!: string;
}

ControlCita.init(
  {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    empleado_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    celular: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    fecha: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    hora: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ControlCita",
    tableName: "controlcita",
    timestamps: false,
  }
);

class Registro extends Model {
  public id!: string;
  public empleado_id!: string;
  public descripcion!: string;
  public gasto!: number;
  public insumo!: number;
  public servicio!: number;
  public tipo_pago!: string;
  public fecha!: string;
}

Registro.init(
  {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    empleado_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    gasto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    insumo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    servicio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tipo_pago: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Registro",
    tableName: "registro",
    timestamps: false,
  }
);

Empleado.hasMany(ControlCita, { foreignKey: "empleado_id" });
ControlCita.belongsTo(Empleado, { foreignKey: "empleado_id" });
Empleado.hasMany(Registro, { foreignKey: "empleado_id" });
Registro.belongsTo(Empleado, { foreignKey: "empleado_id" });

export { Empleado, ControlCita, Registro };
