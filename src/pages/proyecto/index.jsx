import React/* , { useEffect } */ from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROYECTOS } from 'graphql/proyecto/queries';
import { Link } from 'react-router-dom';
import './proyecto.css'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';

const IndexProyectos = () => {
  const { data, error, loading } = useQuery(GET_PROYECTOS);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <div>
      <div className="accordion" id="accordionExample">

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
              aria-expanded="false" aria-controls="collapseOne">
              Agregar Proyecto
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Agregar Proyecto</h1>
            <form
                /* onSubmit={submitForm}
                onChange={updateFormData}
                ref={form} */
                className='row g-3  items-center justify-center '
            >
                <div className="col-md-3">
                    <Input
                        label='Nombre del proyecto:'
                        type='text'
                        name='nombre'
                        required={true}
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label='Presupuesto:'
                        type='number'
                        name='apellido'
                        required={true}
                    />
                </div>
                <div className="col-md-3">
                <Input
                    label='Fecha Inicio:'
                    type='date'
                    name='fechaInicio'
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <Input
                    label='Fecha Fin:'
                    type='date'
                    name='fechaFin'
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <Input
                    label='Líder:'
                    type='text'
                    name='lider'
                    required={true}
                />
                </div>
                
                <div className="col-md-3">
                <DropDown
                    label='Estado del proyecto:'
                    name='estado'
                    required={true}
                    defaultValue={"INACTIVO"}
                    options={Enum_EstadoProyecto}
                    disabled={true}
                />
                </div>
                <div className="col-md-3">
                <DropDown
                    label='Fase del proyecto:'
                    name='fase'
                    required={true}
                    defaultValue={"NULO"}
                    options={Enum_FaseProyecto}
                    disabled={true}
                />
                </div>

                <div className="col-md-8">
                <Input
                    label='Objetivo:'
                    type='text'
                    name='objetivo'
                    required={true}
                />
                </div>


                {/* <span>Rol del usuario: {queryData.Usuario.rol}</span> */}
                
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
              Consultar Proyectos
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              
              <table className='table table-hover tabla_basedatos'>
                <thead className="table-green-titles">
                  <tr>
                    <th>Nombre</th>
                    <th>Presupuesto</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Estado</th>
                    <th>Fase</th>
                    <th>Lider</th>
                    <th>Editar</th>
                    <th>Incripción</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.Proyectos.map((u) => {
                      return (
                        <tr key={u._id}>
                          <td>{u.nombre}</td>
                          <td>{u.presupuesto}</td>
                          <td>{u.fechaInicio}</td>
                          <td>{u.fechaFin}</td>
                          <td>{u.estado}</td>
                          <td>{u.fase}</td>
                          <td>{u.lider.nombre + ' '+ u.lider.apellido}</td>
                          
                          <td className='py-3 px-4'>
                            <Link to={`/proyectos/editar/${u._id}`}>
                              <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                            </Link>
                          </td>
                          <td className='py-3 px-5'> <button><i onClick={()=>{console.log("chido")}} className='fas fa-plus-circle text-green-600 hover:text-yellow-400
                            cursor-pointer'/></button></td>
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

export default IndexProyectos
