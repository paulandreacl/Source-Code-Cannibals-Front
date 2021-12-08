import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
  mutation EditarProyecto(
      $id: String!
      $nombre: String
      $presupuesto: Float
      $fechaInicio: Date
      $fechaFin: Date
      $estado: Enum_EstadoProyecto
      $fase: Enum_FaseProyecto
      $lider: String
  ){
  editarProyecto(
      _id: $id
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      estado: $estado
      fase: $fase
      lider: $lider
      objetivos: $objetivos
      ) {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id
    }
    objetivos {
      _id
      descripcion
      tipo
    }
  }
}
`;

export { EDITAR_PROYECTO };