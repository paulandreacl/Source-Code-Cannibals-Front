const Enum_EstadoUsuario = {
    PENDIENTE: 'Pendiente',
    AUTORIZADO: 'Autorizado',
    NO_AUTORIZADO: 'No autorizado',
};

const Enum_Rol = {
    ADMINISTRADOR: 'Administrador',
    ESTUDIANTE: 'Estudiante',
    LIDER: 'Líder',
  };

const Enum_EstadoProyecto = {
    ACTIVO: 'Activo',
    INACTIVO: 'Inactivo',
}


const Enum_FaseProyecto = {
    INICIADO: 'Iniciado',
    DESARROLLO: 'Terminado',
    TERMINADO: 'Desarrollo',
    NULO: 'Nulo'
}

const Enum_EstadoInscripcion = {
    PENDIENTE: 'Pendiente', 
    ACEPTADO: 'Aceptado',
    RECHAZADO: 'Rechazado'
}


export { Enum_EstadoUsuario, Enum_Rol, Enum_EstadoProyecto, Enum_FaseProyecto, Enum_EstadoInscripcion};