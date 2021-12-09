import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
   query Query($filtro: FiltroUsuarios) {
       Usuarios(filtro: $filtro) {
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

export { GET_USUARIOS, GET_USUARIO };