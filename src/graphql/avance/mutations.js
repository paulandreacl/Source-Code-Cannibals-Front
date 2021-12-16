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

export { EDITAR_AVANCE };