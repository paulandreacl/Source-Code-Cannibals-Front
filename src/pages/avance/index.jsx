import React/* , { useEffect } */ from 'react';
import { useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avance/queries';
import { Link } from 'react-router-dom';
import './avance.css'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoUsuario, Enum_Rol } from 'utils/enums';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import MisAvances from './misAvances';
import AvancesLiderados from './avancesLiderados'
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';

const IndexAvances = () => {
  const { data, error, loading } = useQuery(GET_AVANCES);

  

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <div>

      <PrivateComponent roleList={['ESTUDIANTE']}>
        <div><MisAvances></MisAvances></div>
      </PrivateComponent>
      <PrivateComponent roleList={['LIDER']}>
        <div><AvancesLiderados></AvancesLiderados></div>
      </PrivateComponent>




    </div>
  );
};

export default IndexAvances
