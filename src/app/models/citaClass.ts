export class ClassCita {
    codCita: number = 0;
    servicio: ClassServicio = new ClassServicio();
    nombrePersona: string = "";
    numero: string = "";
    email: string = "";
    descripcion: string = "";
    fecha_cita: Date = new Date();
    turno: ClassTurno = new ClassTurno();
    estado: boolean = true;
    sede: ClassSede = new ClassSede();
}

export class ClassTurno{
    idTurno: number = 0;
    turno: string = "";
    horario: string = "";
}

export class ClassServicio{
    codServicio: number = 0;
    nombreServicio: string = "";
}

export class ClassSede{
    idSede: number = 0;
    distrito: string = "";
    direccion: string = "";
    referencia: string = "";
}