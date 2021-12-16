import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { GET_USUARIOS } from 'graphql/usuario/queries';
import { PROYECTO_FASE_EDITADO } from 'graphql/proyecto/mutations';

import { GET_PROYECTOS, GET_PROYECTO } from 'graphql/proyecto/queries';
import { CREAR_INSCRIPCION } from 'graphql/proyecto/mutations';
import { Link, useNavigate } from 'react-router-dom';
import './proyecto.css'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import { CREAR_PROYECTO } from 'graphql/proyecto/mutations';
import { useUser } from 'context/userContext';
import { Enum_TipoObjetivo } from 'utils/enums';
import { nanoid } from 'nanoid';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';
import IndexProyectosLider from './indexLider';
import ActivarProyecto from './activarProyecto';
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';
import InactivarProyecto from './inactivarProyecto';


const IndexProyectos = () => {
  const { form, formData, updateFormData } = useFormData();
  const { data, error, loading } = useQuery(GET_PROYECTOS);
  const { userData } = useUser();
  console.log("Variable userData: ", userData.nombre)
  console.log("peticiones de proyectos", data)
  //console.log("Variable decoded: ", decoded)
  const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_PROYECTO);


  useEffect(() => {

    console.log('data mutation', mutationData);
  }, [mutationData]);

  const submitForm = (e) => {
    e.preventDefault();

    formData.presupuesto = parseFloat(formData.presupuesto);
    formData.objetivos = Object.values(formData.objetivos);
    formData.lider = userData._id;
    console.log(formData)
    crearProyecto({
      variables: formData,

    });
  };

  useEffect(() => {
    console.log('data mutation', mutationData);
    if (mutationData) {

      window.location.reload(true)
    }
  }, [mutationData]);
  // const { data: dataMutation2, loading: loadingMutation2,
  //   error: errorMutaton2 } = useQuery(GET_PROYECTO);

  const [inscribir, { data: dataMutation2, loading: loadingMutation2,
    error: errorMutaton2 }] = useMutation(CREAR_INSCRIPCION);

  const navigate = useNavigate('/inscripciones', { replace: true });

  const inscripcion = (proyecto) => {
    console.log(proyecto._id)
    inscribir({
      variables: {
        proyecto: proyecto._id,
        estudiante: userData._id,   /* Warning colocar info del usuario que se registro inicialmente*/
      }
    }
    );
    navigate('/inscripciones', { replace: true });
    window.location.reload(true)
  };


  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;


  return (
    <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER', 'ESTUDIANTE']}>
      <div>

        <PrivateComponent roleList={['LIDER']}>

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
                  <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
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
                        name='presupuesto'
                        required={true}
                      />
                    </div>
                    <div>
                      <Objetivos />
                    </div>



                    {/* <span>Rol del usuario: {queryData.Usuario.rol}</span> */}

                    <ButtonLoading
                      disabled={Object.keys(formData).length === 0}
                      loading={mutationLoading}
                      text='Confirmar'
                    />
                  </form>
                </div>
              </div>
            </div >
          </div >

          <div> <IndexProyectosLider /> </div>
        </PrivateComponent>


        <PrivateComponent roleList={['ADMINISTRADOR', 'ESTUDIANTE']}>
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
                        <th>Objetivo</th>
                        <PrivateComponent roleList={['LIDER']}>
                          <th>Editar</th>
                        </PrivateComponent>
                        <PrivateComponent roleList={['ESTUDIANTE']}>
                          <th>Agregar Inscripción</th>
                          <th>Agregar Avance</th>
                        </PrivateComponent>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.Proyectos.map((u) => {
                          return (
                            <tr key={u._id}>
                              <td>{u.nombre}</td>
                              <td>{u.presupuesto}</td>
                              <td>{!u.fechaInicio ? '' : u.fechaInicio.slice(0, -14)}</td>
                              <td>{!u.fechaFin ? '' : u.fechaFin.slice(0, -14)}</td>
                              <td>{u.estado}</td>
                              <td>{u.fase}</td>
                              <td>{u.lider.nombre + ' ' + u.lider.apellido}</td>
                              <td>
                                {u.objetivos.map((objetivo) => {
                                  return <Objetivo tipo={objetivo.tipo} descripcion={objetivo.descripcion} />;
                                })}
                              </td>

                              <PrivateComponent roleList={['LIDER']}>

                                <td className='py-3 px-5'>
                                  <Link to={`/proyectos/editar/${u._id}`}>
                                    <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                                  </Link>
                                </td>

                              </PrivateComponent>

                              <PrivateComponent roleList={['ESTUDIANTE']}>
                                {u.estado != 'INACTIVO' ?
                                  <>
                                    <td className='py-3 px-5'> <button><i onClick={() => { inscripcion(u) }} className='fas fa-plus-circle text-green-600 hover:text-yellow-400
                            cursor-pointer'/></button></td>

                                    <td className='py-3 px-5'>
                                      <Link to={`/avance/crear/${u._id}`}>
                                        <i className='fas fa-plus-circle text-green-600 hover:text-yellow-400 cursor-pointer' />
                                      </Link>
                                    </td>
                                  </> : ""}
                              </PrivateComponent>

                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                </div>
              </div>
            </div >
          </div >
        </PrivateComponent>

        <PrivateComponent roleList={['ADMINISTRADOR']}>

          <div> <ActivarProyecto /> </div>
          <div> <InactivarProyecto /> </div>

        </PrivateComponent>


      </div>

    </PrivateRoute>
  );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {

  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span>Objetivos del Proyecto</span>
        {
          <i
            onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}
            className='fas fa-plus rounded-full bg-indigo-700 hover:bg-indigo-500 text-white p-2 mx-2 cursor-pointer'
          />
        }
        {listaObjetivos.map((objetivo) => {
          return objetivo;
        })}
      </div>
    </ObjContext.Provider>
  );
};

const Objetivo = ({ tipo, descripcion }) => {
  return (
    <div>
      <div className='text-lg font-bold'>{tipo}</div>
      <div>{descripcion}</div>
      {/*  <PrivateComponent roleList={['ADMINISTRADOR']}>
        <div>Editar</div>
      </PrivateComponent> */}
    </div>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div className='flex items-center'>
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label='Descripción'
        type='text'
        required={true}
      />
      <DropDown
        name={`nested||objetivos||${id}||tipo`}
        options={Enum_TipoObjetivo}
        label='Tipo de Objetivo'
        required={true}
      />
      <i
        onClick={() => eliminarObjetivo(id)}
        className='fas fa-trash rounded-full bg-indigo-700 hover:bg-indigo-500 text-white p-2 mx-2 cursor-pointer mt-6'
      />
    </div>
  );
};



export default IndexProyectos
