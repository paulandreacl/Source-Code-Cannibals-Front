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
query FiltrarAvance($id: String!) {
  filtrarAvance(_id: $id) {
    _id
    descripcion
    fecha
    observaciones
    proyecto {
      _id
      nombre
    }
    creadoPor {
      _id
      nombre
      apellido
      rol
    }
  }
}
`;




export { GET_AVANCE, GET_AVANCES };