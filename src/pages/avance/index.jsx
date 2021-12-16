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
      <div className="accordion" id="accordionExample">

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
              aria-expanded="false" aria-controls="collapseOne">
              Agregar Avance
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">

            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Agregar Avance</h1>
            <form
                /* onSubmit={submitForm}
                onChange={updateFormData}
                ref={form} */ 
                className='row g-3 items-center justify-center'
            >
                <div className="col-md-3">
                <Input
                    label='Nombre del proyecto:'
                    type='text'
                    name='nombre'
                    /* defaultValue={queryData.Avance.fecha} */
                    required={true}
                />  
                </div>
                <div className="col-md-3">
                <Input
                    label='Creado por:'
                    type='text'
                    name='creadoPor'
                    /* defaultValue={queryData.Avance.presupuesto} */
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <Input
                    label='Fecha:'
                    type='date'
                    name='fecha'
                    /* defaultValue={queryData.Avance.fechaInicio+ 'hola'} */
                    required={true}
                />
                </div>
    
                <div className="col-md-3">
                <Input
                    label='Observación 1:'
                    type='text'
                    name='observacion1'
                    /* defaultValue={queryData.Avance.estado} */
                    required={true}  
                />
                </div>
                <div className="col-md-3">
                <Input
                    label='Observación 2:'
                    type='text'
                    name='observacion2'
                    /* defaultValue={queryData.Avance.estado} */
                    required={true}  
                />
                </div>
                <div className="col-md-3">
                <Input
                    label='Observación 3:'
                    type='text'
                    name='observacion3'
                    /* defaultValue={queryData.Avance.estado} */
                    required={true}  
                />
                </div>

                <ButtonLoading className="btn-primary"
                    /* disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading} */
                    text='Confirmar'
                />
                
            </form>
            </div>
          </div>
        </div >
      </div >

      <div className="accordion" id="accordionExample">

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
              aria-expanded="false" aria-controls="collapseTwo">
              Consultar Avances
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
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
                    {/* <th>Egreso</th> */}
                    
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.Avances.map((u) => {
                      return (
                        <tr key={u._id}>
                          <td>{u.proyecto.nombre}</td>
                          <td>{u.descripcion}</td>
                          <td>{u.creadoPor.nombre+ " "+ u.creadoPor.apellido}</td>
                          <td>{!u.fecha ? '' : u.fecha.slice(0, -14)}</td>
                          <td>{u.observaciones[0]}</td>
                          <td>{u.observaciones[1]}</td>
                          <td>{u.observaciones[2]}</td>
                          {/* <td>{u.fecha}</td> */}
                          
                          <td>
                            <Link to={`/avances/editar/${u._id}`}>
                              <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

            </div>
          </div>
        </div >
      </div >

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
