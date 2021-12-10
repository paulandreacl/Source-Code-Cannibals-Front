import React, { useEffect } from 'react';
import { GET_AVANCE_ID } from 'graphql/avance/queries';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import { EDITAR_AVANCE } from 'graphql/avance/mutations';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';

const EditarAvance = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const {
        loading: queryLoading,
        error: queryError,
        data: queryData,
    } = useQuery(GET_AVANCE_ID, {
        variables: { _id }
    });

    const [editarAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_AVANCE);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formData);
        editarAvance({
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
            <Link to='/avances'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Avance</h1>
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
                    defaultValue={queryData.filtrarAvanceId.proyecto.nombre}
                    required={true}
                />  
                </div>
                <div className="col-md-3">
                <Input
                    label='Creado por:'
                    type='text'
                    name='creadoPor'
                    defaultValue={queryData.filtrarAvanceId.creadoPor.nombre+" "+queryData.filtrarAvanceId.creadoPor.apellido}
                    required={true}
                />
                </div>
    
                <div className="col-md-10">
                <Input
                    label='Observación 1:'
                    type='text'
                    name='observacion1'
                    defaultValue={queryData.filtrarAvanceId.observaciones[0]}
                    required={false}  
                />
                </div>
                <div className="col-md-10">
                <Input
                    label='Observación 2:'
                    type='text'
                    name='observacion2'
                    defaultValue={queryData.filtrarAvanceId.observaciones[1]}
                    required={false}  
                />
                </div>
                <div className="col-md-10">
                <Input
                    label='Observación 3:'
                    type='text'
                    name='observacion3'
                    defaultValue={queryData.filtrarAvanceId.observaciones[2]}
                    required={false}  
                />
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

export default EditarAvance;
