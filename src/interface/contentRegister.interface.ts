export interface NewAppointment {
  empleado_id: string;
  descripcion: string;
  usuario: string;
  fecha: string;
  hora: string;
}

export interface NewPayment {
  empleado_id: string;
  descripcion: string;
  gasto: number;
  insumo: number;
  servicio: number;
  tipo_pago: string;
  fecha: string;
}

export interface NewUpdateAppointment extends NewAppointment {
  id: string;
}

export interface NewUpdatePayment extends NewPayment {
  id: string;
}
