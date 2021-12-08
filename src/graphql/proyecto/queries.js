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
        }
    }
`;



export { GET_PROYECTOS, GET_PROYECTO };