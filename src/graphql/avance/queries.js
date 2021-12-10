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
query FiltrarAvance {
  filtrarAvance {
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

const GET_AVANCE_ID = gql`
query FiltrarAvanceId($_id: String!) {
  filtrarAvanceId(_id: $_id){
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

export { GET_AVANCE, GET_AVANCES, GET_AVANCE_ID};