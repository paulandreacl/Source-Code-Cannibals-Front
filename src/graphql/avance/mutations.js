import { gql } from '@apollo/client';

const ACEPTAR_INSCRIPCION = gql`
mutation AprobarInscripcion($aprobarInscripcionId: String!) {
  aprobarInscripcion(id: $aprobarInscripcionId) {
    _id
    estado
    fechaIngreso
    fechaEgreso
  }
}
`;

const RECHAZAR_INSCRIPCION = gql`
mutation RechazarInscripcion($rechazarInscripcionId: String!) {
  rechazarInscripcion(id: $rechazarInscripcionId) {
    _id
    estado
    fechaIngreso
    fechaEgreso
  }
}
`;
export { ACEPTAR_INSCRIPCION,RECHAZAR_INSCRIPCION };