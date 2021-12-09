import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
    query Usuarios {
        Usuarios {
            _id
            nombre
            apellido
            identificacion
            correo
            estado
            rol
        }
    }
`;

const GET_USUARIO = gql`
    query UsuarioFiltro($_id: String!) {
        Usuario(_id: $_id) {
            _id
            nombre
            apellido
            identificacion
            correo
            estado
            rol
        }
    }
`;

const GET_USUARIOROL = gql`
query ListaFiltradaRol($rol: Enum_Rol!) {
    listaFiltradaRol(rol: $rol) {
      nombre
      estado
      _id
      rol
      apellido
      identificacion
      correo
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO, GET_USUARIOROL };