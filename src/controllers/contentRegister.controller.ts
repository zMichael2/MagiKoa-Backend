import { Request, Response } from "express";
import {
  ByPaymnet,
  allAppointments,
  appointment,
  deleteAppointmentService,
  deletePaymentService,
  employees,
  paymentList,
  paymentMonth,
  paymnet,
  updateAppointmentService,
  updatePaymnetService,
} from "../services/contentRegister.service";

/**---------------------------GET--------------------------- */

export const getEmployees = async (req: Request, res: Response) => {
  const response = await employees();
  res.status(200).json(response);
};

export const getAppointments = async (req: Request, res: Response) => {
  const response = await allAppointments();
  res.status(200).json(response);
};

export const getPayments = async (req: Request, res: Response) => {
  const response = await ByPaymnet();
  res.status(200).json(response);
};

export const getDatePayment = async (req: Request, res: Response) => {
  try {
    const { selectopt, date } = req.query;
    const fecha = `${date}`;

    if (selectopt === "dia") {
      const response = await paymentList(fecha);
      return res.status(200).json(response);
    } else if (selectopt === "mes") {
      const response = await paymentMonth(fecha);
      return res.status(200).json(response);
    }

    res.status(400).json({ message: "no hay información" });
  } catch (error) {
    return res.status(500).json({ message: "internal error" });
  }
};

/**---------------------------register--------------------------- */

export const registerAppointment = async (req: Request, res: Response) => {
  const { body } = req;
  await appointment(body);
  res.status(200).json();
};

export const registerPayment = async (req: Request, res: Response) => {
  const { body } = req;
  await paymnet(body);
  res.status(200).json();
};

/**---------------------------Update--------------------------- */

export const updateAppointment = async (req: Request, res: Response) => {
  const { body } = req;
  await updateAppointmentService(body);
  res.status(200).json();
};

export const updatePayment = async (req: Request, res: Response) => {
  const { body } = req;
  const response = await updatePaymnetService(body);
  res.status(200).json({
    data: response,
    message: "Registro actualizado correctamente",
  });
};

/**---------------------------Delete--------------------------- */

export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteAppointmentService(id);
  res.status(200).json();
};

export const deletePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deletePaymentService(id);
  res.status(200).json();
};
