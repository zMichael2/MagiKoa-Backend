import { uid } from "uid";
import {
  ControlCita,
  Empleado,
  Registro,
} from "../models/registerContent.model";
import {
  NewAppointment,
  NewPayment,
  NewUpdateAppointment,
  NewUpdatePayment,
} from "../interface/contentRegister.interface";
import { sequelize } from "../config/database";
import { Op } from "sequelize";

export const employees = async () => {
  const empleados = await Empleado.findAll({
    attributes: ["id", "nombre"],
  });
  return empleados;
};

/**---------------------------register--------------------------- */

export const appointment = async (newAppointment: NewAppointment) => {
  const id = uid();
  await ControlCita.create({ id, ...newAppointment });
};

export const paymnet = async (newPayment: NewPayment) => {
  const id = uid();
  let total = newPayment.servicio + newPayment.insumo - newPayment.gasto;

  await Registro.create({ id, ...newPayment, total });
};
/**---------------------------xxxxxx--------------------------- */
export const allAppointments = async () => {
  const controlCitas = await ControlCita.findAll({
    include: [
      {
        model: Empleado,
        attributes: ["nombre"],
      },
    ],
    raw: true,
  });

  return controlCitas;
};

export const ByPaymnet = async () => {
  const registros = await Registro.findAll({
    include: [
      {
        model: Empleado,
        attributes: ["nombre"],
      },
    ],
    raw: true,
  });

  return registros;
};

export const paymentList = async (fecha: string) => {
  const resultados = await Registro.findAll({
    where: sequelize.where(
      sequelize.fn("DATE_FORMAT", sequelize.col("fecha"), "%d/%m/%Y"),
      fecha
    ),
  });

  return resultados;
};

export const paymentMonth = async (mes: string) => {
  const fechaActual = new Date();

  const añoActual = fechaActual.getFullYear();

  const resultados = await Registro.findAll({
    where: {
      [Op.and]: [
        sequelize.where(
          sequelize.fn("YEAR", sequelize.col("fecha")),
          añoActual
        ),
        sequelize.where(sequelize.fn("MONTH", sequelize.col("fecha")), mes),
      ],
    },
  });

  return resultados;
};
/**---------------------------Update--------------------------- */

export const updateAppointmentService = async (
  updateAppointment: NewUpdateAppointment
) => {
  const { id, ...data } = updateAppointment;

  await ControlCita.update(data, { where: { id: id } });
};

export const updatePaymnetService = async (
  newUpdatePayment: NewUpdatePayment
) => {
  const { id, ...data } = newUpdatePayment;
  console.log(data, "xxxxxxxxxx");
  const total =
    newUpdatePayment.servicio +
    newUpdatePayment.insumo -
    newUpdatePayment.gasto;

  await Registro.update({ ...data, total }, { where: { id: id } });
  return total;
};

/**---------------------------Delete--------------------------- */
export const deleteAppointmentService = async (id: string) => {
  await ControlCita.destroy({
    where: {
      id: id,
    },
  });
};

export const deletePaymentService = async (id: string) => {
  await Registro.destroy({
    where: {
      id: id,
    },
  });
};
