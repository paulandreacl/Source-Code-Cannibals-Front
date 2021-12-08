import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
query Inscripciones {
  Inscripciones {
    _id
    estado
    fechaIngreso
    fechaEgreso
    estudiante {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
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
`;

const GET_INSCRIPCION = gql`
query InscripcionFiltro($_id: String!) {
  Inscripciones(_id: $_id) {
    _id
    estado
    fechaIngreso
    fechaEgreso
    proyecto {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
    }
    estudiante {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
  }
}
`;




export { GET_INSCRIPCIONES, GET_INSCRIPCION };