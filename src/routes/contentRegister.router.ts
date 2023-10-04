import { Router } from "express";
import {
  deleteAppointment,
  deletePayment,
  getAppointments,
  getDatePayment,
  getEmployees,
  getPayments,
  registerAppointment,
  registerPayment,
  updateAppointment,
  updatePayment,
} from "../controllers/contentRegister.controller";

const recordRouter = Router();

recordRouter.get("/employees", getEmployees);
recordRouter.post("/register/appointment", registerAppointment);
recordRouter.post("/register/payment", registerPayment);
recordRouter.post("/update/appointment", updateAppointment);
recordRouter.post("/update/payment", updatePayment);
recordRouter.get("/delete/appointment/:id", deleteAppointment);
recordRouter.get("/delete/payment/:id", deletePayment);
recordRouter.get("/Appointments", getAppointments);
recordRouter.get("/Payments", getPayments);
recordRouter.get("/datepayment", getDatePayment);

export default recordRouter;
