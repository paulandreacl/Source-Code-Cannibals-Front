import { gql } from '@apollo/client';

const GET_AVANCES = gql`
    query Avances {
  Avances {
    _id
    fecha
    descripcion
    observaciones 
    proyecto{
        _id
    }

    creadoPor{
        _id
        nombre
        apellido
        correo
        estado
        identificacion
    }
  }
}
`;

const GET_PROYECTO = gql`
    query ProyectoFiltro($_id: String!) {
        Proyecto(_id: $_id) {
            _id
            nombre
            presupuesto
        }
    }
`;



export { GET_PROYECTOS, GET_PROYECTO };