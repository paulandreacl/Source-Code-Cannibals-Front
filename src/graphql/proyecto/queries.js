import { gql } from '@apollo/client';

const GET_PROYECTOS = gql`
    query Proyectos {
  Proyectos {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
    objetivos {
      _id
      descripcion
      tipo
    }
  }
}
`;

const GET_PROYECTO = gql`
    query ProyectoFiltro($_id: String!) {
        Proyecto(_id: $_id) {
            _id
            nombre
            presupuesto
            fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
    objetivos {
      _id
      descripcion
      tipo
    }
  
        }
    }
`;

const GET_PROYECTOS_LIDERADOS = gql`
query ProyectosLiderado($id: String!) {
  proyectosLiderado(_id: $id) {
    nombre
    presupuesto
    _id
    lider {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
    fechaInicio
    fase
    estado
    fechaFin
    objetivos {
      _id
      descripcion
      tipo
    }
    
}
}
`;

const GET_AVANCES = gql`
query FiltrarAvance($id: String!) {
  filtrarAvance(_id: $id) {
    descripcion
    fecha
    observaciones
    _id
    proyecto {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
    }
  }
}

`

export { GET_PROYECTOS, GET_PROYECTO, GET_PROYECTOS_LIDERADOS, GET_AVANCES };