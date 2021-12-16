import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_INSCRIPCIONES } from 'graphql/inscripcion/queries';
import { ACEPTAR_INSCRIPCION, RECHAZAR_INSCRIPCION } from 'graphql/inscripcion/mutations';
import { Link } from 'react-router-dom';
import './inscripcion.css'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoInscripcion } from 'utils/enums';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import IndexUsuariosLider from '../usuario/indexUsuariosLider';
import MisInscripciones from './misInscripciones';
import { useUser } from 'context/userContext';
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';

const IndexInscripciones = () => {
  const { data, error, loading } = useQuery(GET_INSCRIPCIONES);

  const { userData } = useUser();

  /*useEffect(() => {
    console.log(data)
  },[data]);*/

  const [aceptar, { data: dataMutation1, loading: loadingMutation1,
    error: errorMutaton1 }] = useMutation(ACEPTAR_INSCRIPCION);

  const [rechazar, { data: dataMutation2, loading: loadingMutation2,
    error: errorMutaton2 }] = useMutation(RECHAZAR_INSCRIPCION);


  const aceptarInscripcion = (e) => {
    // console.log('Incripción Aceptada');
    let alertaUsuario = window.confirm('¿Está seguro de aceptar el usuario?');
    if (alertaUsuario) {
      aceptar({
        variables: {
          aprobarInscripcionId: e._id
        }
      });
    }
  };

  const rechazarInscripcion = (e) => {
    // console.log('Incripción Rechazada')
    let alertaUsuario = window.confirm('¿Está seguro de aceptar el usuario?');
    if (alertaUsuario) {
      rechazar({
        variables: {
          rechazarInscripcionId: e._id
        }
      })
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <PrivateRoute roleList={['LIDER']}>
      <div>
        {/* Arthur y Andy */}
        <PrivateComponent roleList={['LIDER']}>
        <div><MisInscripciones></MisInscripciones></div>
        </PrivateComponent>




      </div>
    </PrivateRoute>
  );
};

export default IndexInscripciones
