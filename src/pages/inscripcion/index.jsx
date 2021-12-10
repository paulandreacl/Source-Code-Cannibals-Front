import React/* , { useEffect } */ from 'react';
import { useQuery } from '@apollo/client';
import { GET_INSCRIPCIONES } from 'graphql/inscripcion/queries';
import { Link } from 'react-router-dom';
import './inscripcion.css'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoInscripcion} from 'utils/enums';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';

const IndexInscripciones = () => {
  const { data, error, loading } = useQuery(GET_INSCRIPCIONES);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <div>
      <div className="accordion" id="accordionExample">

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
              aria-expanded="false" aria-controls="collapseOne">
              Agregar Inscripción
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">

            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Agregar Inscripción</h1>
            <form
                /* onSubmit={submitForm}
                onChange={updateFormData}
                ref={form} */
                className='row g-3  items-center justify-center '
            >
                <div className="col-md-3">
                    <Input
                        label='Nombre del Proyecto:'
                        type='text'
                        name='nombre'
                        /* defaultValue={queryData.Inscripcion._id} */
                        required={true}
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label='Nombre del estudiante:'
                        type='text'
                        name='estudiante'
                        /* defaultValue={queryData.Inscripcion.apellido} */
                        required={true}
                    />
                </div>

        
                
                {/* <div className="col-md-3">
                <DropDown
                    label='Estado de la Inscripción:'
                    name='estado'
                    defaultValue={"pendiente"} 
                    required={true}
                    options={Enum_EstadoInscripcion}
                    disabled={true}
                />
                </div> */}
            
                {/* <span>Rol del usuario: {queryData.Usuario.rol}</span> */}
                <div className="col-md-3">
                <Input
                    label='Ingreso:'
                    type='date'
                    name='ingreso'
                    /* defaultValue={queryData.Inscripcion.identificacion} */
                    required={true}
                />
                </div>

                <div className="col-md-3">
                <Input
                    label='Egreso:'
                    type='date'
                    name='egreso'
                    /* defaultValue={queryData.Inscripcion.correo} */
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
              Consultar Inscripciones
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              
              <table className='table table-hover tabla_basedatos'>
                <thead className="table-green-titles">
                  <tr>
                    <th>Proyecto</th>
                    <th>Estudiante</th>
                    <th>Estado</th>
                    <th>Ingreso</th>
                    <th>Egreso</th>
                    
                    <th>Aceptar</th>
                    <th>Rechazar</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.Inscripciones.map((u) => {
                      return (
                        <tr key={u._id}>
                          <td>{u.proyecto.nombre}</td>
                          <td>{u.estudiante.nombre+ " "+ u.estudiante.apellido}</td>
                          <td>{u.estado}</td>
                          <td>{u.fechaIngreso}</td>
                          <td>{u.fechaEgreso}</td>
                          
                          <td>
                            <Link to={`/inscripciones/aceptar/${u._id}`}>
                              <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                              <i className='fas fa-user-minus text-red-600 hover:text-red-400 cursor-pointer' />
                            </Link>
                          </td>
                          <td>
                            <Link to={`/inscripciones/rechazar/${u._id}`}>
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





    </div>
  );
};

export default IndexInscripciones
