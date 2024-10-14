export interface Cita {
    codCita : number;
    servicio: Servicio;
    nombrePersona : string;
    numero : string;
    email : string;
    descripcion : string;
    fecha_cita : Date;
    turno : Turno;
    estado : true;
    sede : Sede;
}

export interface Turno{
    idTurno : number;
    turno : string;
    horario : string;
}

export interface Servicio{
    codServicio: number;
    nombreServicio: string;
}

export interface Sede{
    idSede: number;
    distrito: string;
    direccion: string;
    referencia: string;
}