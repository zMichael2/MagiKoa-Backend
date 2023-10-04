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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentService = exports.deleteAppointmentService = exports.updatePaymnetService = exports.updateAppointmentService = exports.paymentMonth = exports.paymentList = exports.ByPaymnet = exports.allAppointments = exports.paymnet = exports.appointment = exports.employees = void 0;
const uid_1 = require("uid");
const registerContent_model_1 = require("../models/registerContent.model");
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const employees = () => __awaiter(void 0, void 0, void 0, function* () {
    const empleados = yield registerContent_model_1.Empleado.findAll({
        attributes: ["id", "nombre"],
    });
    return empleados;
});
exports.employees = employees;
/**---------------------------register--------------------------- */
const appointment = (newAppointment) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uid_1.uid)();
    yield registerContent_model_1.ControlCita.create(Object.assign({ id }, newAppointment));
});
exports.appointment = appointment;
const paymnet = (newPayment) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uid_1.uid)();
    let total = newPayment.servicio + newPayment.insumo - newPayment.gasto;
    yield registerContent_model_1.Registro.create(Object.assign(Object.assign({ id }, newPayment), { total }));
});
exports.paymnet = paymnet;
/**---------------------------xxxxxx--------------------------- */
const allAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    const controlCitas = yield registerContent_model_1.ControlCita.findAll({
        include: [
            {
                model: registerContent_model_1.Empleado,
                attributes: ["nombre"],
            },
        ],
        raw: true,
    });
    return controlCitas;
});
exports.allAppointments = allAppointments;
const ByPaymnet = () => __awaiter(void 0, void 0, void 0, function* () {
    const registros = yield registerContent_model_1.Registro.findAll({
        include: [
            {
                model: registerContent_model_1.Empleado,
                attributes: ["nombre"],
            },
        ],
        raw: true,
    });
    return registros;
});
exports.ByPaymnet = ByPaymnet;
const paymentList = (fecha) => __awaiter(void 0, void 0, void 0, function* () {
    const resultados = yield registerContent_model_1.Registro.findAll({
        where: database_1.sequelize.where(database_1.sequelize.fn("DATE_FORMAT", database_1.sequelize.col("fecha"), "%d/%m/%Y"), fecha),
    });
    return resultados;
});
exports.paymentList = paymentList;
const paymentMonth = (mes) => __awaiter(void 0, void 0, void 0, function* () {
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const resultados = yield registerContent_model_1.Registro.findAll({
        where: {
            [sequelize_1.Op.and]: [
                database_1.sequelize.where(database_1.sequelize.fn("YEAR", database_1.sequelize.col("fecha")), añoActual),
                database_1.sequelize.where(database_1.sequelize.fn("MONTH", database_1.sequelize.col("fecha")), mes),
            ],
        },
    });
    return resultados;
});
exports.paymentMonth = paymentMonth;
/**---------------------------Update--------------------------- */
const updateAppointmentService = (updateAppointment) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = updateAppointment, data = __rest(updateAppointment, ["id"]);
    yield registerContent_model_1.ControlCita.update(data, { where: { id: id } });
});
exports.updateAppointmentService = updateAppointmentService;
const updatePaymnetService = (newUpdatePayment) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = newUpdatePayment, data = __rest(newUpdatePayment, ["id"]);
    console.log(data, "xxxxxxxxxx");
    const total = newUpdatePayment.servicio +
        newUpdatePayment.insumo -
        newUpdatePayment.gasto;
    yield registerContent_model_1.Registro.update(Object.assign(Object.assign({}, data), { total }), { where: { id: id } });
    return total;
});
exports.updatePaymnetService = updatePaymnetService;
/**---------------------------Delete--------------------------- */
const deleteAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield registerContent_model_1.ControlCita.destroy({
        where: {
            id: id,
        },
    });
});
exports.deleteAppointmentService = deleteAppointmentService;
const deletePaymentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield registerContent_model_1.Registro.destroy({
        where: {
            id: id,
        },
    });
});
exports.deletePaymentService = deletePaymentService;
