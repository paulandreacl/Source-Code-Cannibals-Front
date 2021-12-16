import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avance/queries';
import { GET_PROYECTOS } from 'graphql/proyecto/queries';
import { EDITAR_AVANCE } from 'graphql/avance/mutations';
import { Link } from 'react-router-dom';
import './avance.css'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoInscripcion } from 'utils/enums';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import { useUser } from 'context/userContext';

const AvancesLiderados = () => {
  const { data, error, loading } = useQuery(GET_AVANCES);
  console.log('informacion data', data)
  /*useEffect(() => {
    console.log(data)
  },[data]);*/

  const { userData } = useUser();
  console.log('información de USERDATA', userData)

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;


  return (
    <div className="accordion" id="accordionExample">

      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFour">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour"
            aria-expanded="false" aria-controls="collapseFour">
            Avances Liderados
          </button>
        </h2>
        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour"
          data-bs-parent="#accordionExample">
          <div className="accordion-body">

            <table className='table table-hover tabla_basedatos'>
              <thead className="table-green-titles">
                <tr>
                  <th>Proyecto</th>
                  <th>Avance</th>
                  <th>Creado por:</th>
                  <th>Creación</th>
                  <th>Observ. 1</th>
                  <th>Observ. 2</th>
                  <th>Observ. 3</th>
                </tr>
              </thead>
              <tbody>
                {/* {data &&
                      data.Proyectos.map((u) => {
                        return (
                          <tr key={u._id}>
                          </tr>
                        );
                      })} */}
                {data &&
                  data.Avances.filter((cod) => (cod.proyecto.lider._id === userData._id)).map((u) => {
                    return (
                      <tr key={u._id}>
                        <td>{u.proyecto.nombre}</td>
                        <td>{u.descripcion}</td>
                        <td>{u.creadoPor.nombre + " " + u.creadoPor.apellido}</td>
                        <td>{!u.fecha ? '' : u.fecha.slice(0, -14)}</td>
                        <td>{u.observaciones[0]}</td>
                        <td>{u.observaciones[1]}</td>
                        <td>{u.observaciones[2]}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </div >
  );
};

export default AvancesLiderados