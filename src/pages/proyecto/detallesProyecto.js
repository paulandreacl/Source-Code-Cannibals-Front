import React, { useEffect } from 'react';
import { GET_PROYECTO } from 'graphql/proyecto/queries';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import { EDITAR_PROYECTO } from 'graphql/proyecto/mutations';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
import { GET_AVANCES, GET_AVANCE } from 'graphql/avance/queries';

const DetallesProyecto = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const {
        loading: queryLoading,
        error: queryError,
        data: queryData,
    } = useQuery(GET_PROYECTO, {
        variables: { _id }
    });

    const {
        loading: queryLoadingAv,
        error: queryErrorAv,
        data: queryDataAv,
    } = useQuery(GET_AVANCES);
    console.log(queryData)
    const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_PROYECTO);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formData);
        editarProyecto({
            variables: { _id, ...formData }
        })
    };

    useEffect(() => {
        if (mutationData) {
            toast.success('Proyecto modificado correctamente');
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error('Error modificando el proyecto');
        }

        if (queryError) {
            toast.error('Error consultando el proyecto');
        }
    }, [queryError, mutationError]);

    if (queryLoading) return <div>Loading...</div>;

    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/proyectos'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Actualizar Proyecto</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='row g-3 items-center justify-center'
            >
                <div className="col-md-3">
                <Input
                    label='Nombre del proyecto:'
                    type='text'
                    name='nombre'
                    defaultValue={queryData.Proyecto.nombre}
                    required={true}
                />  
                </div>
                <div className="col-md-3">
                <Input
                    label='Presupuesto del proyecto:'
                    type='text'
                    name='presupuesto'
                    defaultValue={queryData.Proyecto.presupuesto}
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <Input
                    label='Fecha Inicio:'
                    type='text'
                    name='fechaInicio'
                    defaultValue={queryData.Proyecto.fechaInicio}
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <Input
                    label='Fecha Fin:'
                    type='date'
                    name='fechaFin'
                    defaultValue={queryData.Proyecto.fechaFin}
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <DropDown
                    label='Estado del proyecto:'
                    name='estado'
                    defaultValue={queryData.Proyecto.estado}
                    required={true}
                    options={Enum_EstadoProyecto}
                    
                />
                </div>
                <div>
                <table className='table table-hover tabla_basedatos'>
                <thead className="table-green-titles">
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    
                    <th>Editar</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {queryData &&
                    queryData.Proyecto.objetivos.map((u) => {
                      return (
                        <tr key={u._id}>
                          <td>{u.descripcion}</td>
                          <td>{u.tipo}</td>
                          <td><Link to={`/proyectos/editar/${u._id}`}>
                              <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                            </Link></td>
                         

                            
                        </tr>
                      );
                    })}
                </tbody>
              </table>

            </div>

            <div>
                <table className='table table-hover tabla_basedatos'>
                <thead className="table-green-titles">
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha</th>
                    
                    <th>Editar</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {queryDataAv &&
                    queryDataAv.Avances.map((a) => {
                        console.log(a)
                      return (
                        <tr key={a._id}>
                          <td>{a.descripcion}</td>
                          <td>{a.fecha}</td>
                          <td><Link to={`/proyectos/editar/${a._id}`}>
                              <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                            </Link></td>
                         

                            
                        </tr>
                      );
                    })}
                </tbody>
              </table>

            </div>
                
                <ButtonLoading className="btn-primary"
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                />
                
            </form>
        </div>
    );
};

export default DetallesProyecto;
