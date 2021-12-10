import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      estado: $estado
    ) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const CREAR_USUARIO = gql`
mutation CrearUsuario(
  $nombre: String!,
  $apellido: String!,
  $identificacion: String!,
  $correo: String!,
  $rol: Enum_Rol!,
  $estado: Enum_EstadoUsuario
  
  ) {
  crearUsuario(
    nombre: $nombre,
    apellido: $apellido,
    identificacion: $identificacion,
      correo: $correo,
      rol: $rol,
      estado: $estado) {
    _id
    nombre
    apellido
    identificacion
    correo
    rol
    estado
  }
}
`;

const REGISTRO = gql`
  mutation registro(
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $rol: Enum_Rol!
    $password: String!
  ) {
    registro(
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      rol: $rol
      password: $password
    ) {
      token
      error
    }
  }
`;

const ELIMINAR_USUARIO = gql`
mutation EliminarUsuario($id: String!) {
  eliminarUsuario(_id: $id) {
    _id
    nombre
    apellido
    identificacion
    correo
    rol
    estado
  }
}
`;


export { EDITAR_USUARIO, REGISTRO, ELIMINAR_USUARIO, CREAR_USUARIO };
