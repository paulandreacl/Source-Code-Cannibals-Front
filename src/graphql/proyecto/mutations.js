import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
mutation EditarProyecto($_id: String!, $nombre: String, $presupuesto: Float, $fechaInicio: Date, $fechaFin: Date, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto, $lider: String, $objetivos: [crearObjetivo]) {
  editarProyecto(_id: $_id, nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, estado: $estado, fase: $fase, lider: $lider, objetivos: $objetivos) {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    fase
    estado   
    objetivos {      
      descripcion
      tipo
    }
  }
}
`;

const CREAR_PROYECTO = gql`
mutation Mutation($nombre: String!, $presupuesto: Float!, $lider: String!, $objetivos: [crearObjetivo]!) {
  crearProyecto(nombre: $nombre, presupuesto: $presupuesto, lider: $lider, objetivos: $objetivos) {
    _id
    nombre
    presupuesto
    estado
    fase
    fechaInicio
    fechaFin
    lider {
      _id
    }
  }
}
`;

const PROYECTO_FASE_EDITADO = gql`
mutation EditarEstadoProyecto($id: String!, $estado: Enum_EstadoProyecto!, $fase: Enum_FaseProyecto, $fechaInicio: Date) {
  editarEstadoProyecto(_id: $id, estado: $estado, fase: $fase, fechaInicio: $fechaInicio) {
    _id
    nombre
    fechaInicio
    estado
  }
}
`;

const CREAR_INSCRIPCION = gql`
mutation CrearInscripcion($proyecto: String!, $estudiante: String!) {
  crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
    _id
    estado
    fechaIngreso
    fechaEgreso
    proyecto {
      _id
    }
    estudiante {
      _id
    }
  }
}
`;


const EDITAR_OBJETIVO = gql`
mutation EditarObjetivo(
  $idProyecto: String!
  $indexObjetivo: Int!
  $campos: camposObjetivo!
) {
  editarObjetivo(
    idProyecto: $idProyecto
    indexObjetivo: $indexObjetivo
    campos: $campos
  ) {
    _id
  }
}
`;

const ELIMINAR_OBJETIVO = gql`
  mutation Mutation($idProyecto: String!, $idObjetivo: String!) {
    eliminarObjetivo(idProyecto: $idProyecto, idObjetivo: $idObjetivo) {
      _id
    }
  }
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO, PROYECTO_FASE_EDITADO, CREAR_INSCRIPCION, EDITAR_OBJETIVO };
