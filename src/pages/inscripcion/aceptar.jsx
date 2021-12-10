import React, { useEffect } from 'react';
import { GET_INSCRIPCION } from 'graphql/inscripcion/queries';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import { ACEPTAR_INSCRIPCION } from 'graphql/inscripcion/mutations';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoInscripcion } from 'utils/enums';

const AceptarInscripcion = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const {
        loading: queryLoading,
        error: queryError,
        data: queryData,
    } = useQuery(GET_INSCRIPCION, {
        variables: { _id }
    });

    const [aceptarInscripcion, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(ACEPTAR_INSCRIPCION);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formData);
        aceptarInscripcion({
            variables: { _id, ...formData }
        })
    };

    useEffect(() => {
        if (mutationData) {
            toast.success('Usuario modificado correctamente');
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error('Error modificando el usuario');
        }

        if (queryError) {
            toast.error('Error consultando el usuario');
        }
    }, [queryError, mutationError]);

    if (queryLoading) return <div>Loading...</div>;

    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/inscripciones'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Aceptar Inscripcion</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
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

        
                
                <div className="col-md-3">
                <DropDown
                    label='Estado del proyecto:'
                    name='estado'
                    /* defaultValue={queryData.Inscripcion.estado} */
                    required={true}
                    options={Enum_EstadoInscripcion}
                    disabled={false}
                />
                </div>
            
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
                    
                    loading={mutationLoading}
                    text='Aceptar Inscripción'
                />
            </form>
        </div>
    );
};

export default AceptarInscripcion;
