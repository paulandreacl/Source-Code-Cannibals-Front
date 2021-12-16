import { gql } from '@apollo/client';

const EDITAR_AVANCE = gql`
mutation EditarAvance(
  $id: String!, $descripcion: String!
  ) {
  editarAvance(
    _id: $id,
    descripcion: $descripcion
    ) {
    _id
    descripcion
  }
}
`;

const CREAR_AVANCE = gql`
mutation Mutation($fecha: Date!, $descripcion: String!, $proyecto: String!, $creadoPor: String!) {
  crearAvance(fecha: $fecha, descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
    _id
    fecha
    observaciones
    descripcion
    proyecto {
      _id
    }
    creadoPor {
      _id
    }
  }
}
`;

const OBSERVACIONES = gql `
mutation Mutation($id: String!, $observaciones: String!) {
  agregarObservacionesAvance(_id: $id, observaciones: $observaciones) {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      _id
    }
    creadoPor {
      _id
    }
  }
}
`;

export { EDITAR_AVANCE, CREAR_AVANCE, OBSERVACIONES };