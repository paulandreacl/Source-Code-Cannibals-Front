import { gql } from '@apollo/client';

const GET_AVANCES = gql`
query Avances {
  Avances {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      _id
      nombre
    }
    creadoPor {
      _id
      nombre
      apellido
    }
  }
}
`;

const GET_AVANCE = gql`
query FiltrarInscripcion($id: String!) {
  FiltrarInscripcion(_id: $id) {
    _id
    estado
    fechaIngreso
    fechaEgreso
    proyecto {
      _id
      nombre
    }
    estudiante {
      _id
      nombre
      apellido
    }
  }
}
`;




export { GET_AVANCE, GET_AVANCES };