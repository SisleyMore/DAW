export interface Cita {
    codCita : number;
    servicio: Servicio;
    nombrePersona : string;
    numeroTel : string;
    email : string;
    descripcion : string;
    fechaCita : Date;
    turno : Turno;
    estado : boolean;
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