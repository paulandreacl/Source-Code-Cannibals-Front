import { gql } from '@apollo/client';

const EDITAR_AVANCE = gql`
  mutation EditarAvance(
      $_id: String!
      $descripcion: String!
  ){
  editarAvance(
      _id: $_id
      descripcion: $descripcion!
     ) {
    _id
    descripcion
  }
}
`;

const CREAR_AVANCE = gql`
  mutation CrearAvance(
      $fecha: Date!
      $descripcion: String!
      $proyecto: String!
      $creadoPor: String!
  ){
  crearAvance(
      fecha: $fecha!
      descripcion: $descripcion!
      proyecto: $proyecto!
      creadoPor: $creadoPor!
     ) {
    _id
    
  }
}
`;
const AGREGAR_OBSERVACIONES_AVANCE = gql`
  mutation AgregarObservacionesAvance(
      $_id: String!
      $observaciones: String!

  ){
  agregarObservacionesAvance(
      _id: $_id!
      observaciones: $observaciones!

      ) {
    _id
    
  }
}
`;
export { EDITAR_AVANCE, CREAR_AVANCE, AGREGAR_OBSERVACIONES_AVANCE };