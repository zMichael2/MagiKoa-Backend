"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.deleteAppointment = exports.updatePayment = exports.updateAppointment = exports.registerPayment = exports.registerAppointment = exports.getDatePayment = exports.getPayments = exports.getAppointments = exports.getEmployees = void 0;
const contentRegister_service_1 = require("../services/contentRegister.service");
/**---------------------------GET--------------------------- */
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, contentRegister_service_1.employees)();
    res.status(200).json(response);
});
exports.getEmployees = getEmployees;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, contentRegister_service_1.allAppointments)();
    res.status(200).json(response);
});
exports.getAppointments = getAppointments;
const getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, contentRegister_service_1.ByPaymnet)();
    res.status(200).json(response);
});
exports.getPayments = getPayments;
const getDatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { selectopt, date } = req.query;
        const fecha = `${date}`;
        if (selectopt === "dia") {
            const response = yield (0, contentRegister_service_1.paymentList)(fecha);
            return res.status(200).json(response);
        }
        else if (selectopt === "mes") {
            const response = yield (0, contentRegister_service_1.paymentMonth)(fecha);
            return res.status(200).json(response);
        }
        res.status(400).json({ message: "no hay información" });
    }
    catch (error) {
        return res.status(500).json({ message: "internal error" });
    }
});
exports.getDatePayment = getDatePayment;
/**---------------------------register--------------------------- */
const registerAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield (0, contentRegister_service_1.appointment)(body);
    res.status(200).json();
});
exports.registerAppointment = registerAppointment;
const registerPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield (0, contentRegister_service_1.paymnet)(body);
    res.status(200).json();
});
exports.registerPayment = registerPayment;
/**---------------------------Update--------------------------- */
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield (0, contentRegister_service_1.updateAppointmentService)(body);
    res.status(200).json();
});
exports.updateAppointment = updateAppointment;
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const response = yield (0, contentRegister_service_1.updatePaymnetService)(body);
    res.status(200).json({
        data: response,
        message: "Registro actualizado correctamente",
    });
});
exports.updatePayment = updatePayment;
/**---------------------------Delete--------------------------- */
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, contentRegister_service_1.deleteAppointmentService)(id);
    res.status(200).json();
});
exports.deleteAppointment = deleteAppointment;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, contentRegister_service_1.deletePaymentService)(id);
    res.status(200).json();
});
exports.deletePayment = deletePayment;
