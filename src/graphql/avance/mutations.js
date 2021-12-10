import { gql } from '@apollo/client';

const EDITAR_AVANCE = gql`
mutation EditarAvance($id: String!, $descripcion: String!) {
  editarAvance(_id: $id, descripcion: $descripcion) {
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
      rol
    }
  }
}
`;

export { EDITAR_AVANCE };