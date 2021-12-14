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
import PrivateComponent from 'components/PrivateComponent';

const EditarProyecto = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const {
        loading: queryLoading,
        error: queryError,
        data: queryData,
    } = useQuery(GET_PROYECTO, {
        variables: { _id }
    });

    const [editarProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_PROYECTO);
    console.log(mutationData)

    const submitForm = (e) => {
        e.preventDefault();
        formData.presupuesto = parseFloat(formData.presupuesto);
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
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Proyecto</h1>
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
                    type='number'
                    name='presupuesto'
                    defaultValue={queryData.Proyecto.presupuesto}
                    required={true}
                /> 
                </div>
                <div className="col-md-3">
                <Input
                    readOnly
                    label='Fecha Inicio:'
                    type='Date'
                    name='fechaInicio'
                    defaultValue={!queryData.Proyecto.fechaInicio ? '' : queryData.Proyecto.fechaInicio.slice(0, -14)}
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <Input
                    readOnly
                    label='Fecha Fin:'
                    type='Date'
                    name='fechaFin'
                    defaultValue={!queryData.Proyecto.fechaFin ? '' : queryData.Proyecto.fechaFin.slice(0, -14)}
                    required={true}
                />
                </div>
                
                <PrivateComponent roleList='ADMINISTRADOR'>
                <div className="col-md-3">
                <DropDown
                    label='Estado del proyecto:'
                    name='estado'
                    defaultValue={queryData.Proyecto.estado}
                    required={true}
                    options={Enum_EstadoProyecto}
                    
                />
                </div>
                <div className="col-md-3">

                <DropDown
                    label='Fase del proyecto:'
                    name='fase'
                    defaultValue={queryData.Proyecto.fase}
                    required={true}
                    options={Enum_FaseProyecto}
                    
                />
                </div>
               </PrivateComponent> 
                
                <ButtonLoading className="btn-primary"
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                />
                
            </form>
        </div>
    );
};

export default EditarProyecto;
