import React, { useEffect } from 'react';
import { GET_USUARIO } from 'graphql/usuario/queries';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import { EDITAR_USUARIO } from 'graphql/usuario/mutations';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoUsuario, Enum_Rol } from 'utils/enums';

const EditarUsuario = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const {
        loading: queryLoading,
        error: queryError,
        data: queryData,
    } = useQuery(GET_USUARIO, {
        variables: { _id }
    });

    const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_USUARIO);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formData);
        editarUsuario({
            variables: { _id, ...formData, rol: 'ADMINISTRADOR' }
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
            <Link to='/usuarios'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='row g-3  items-center justify-center '
            >
                <div className="col-md-3">
                    <Input
                        label='Nombre del usuario:'
                        type='text'
                        name='nombre'
                        defaultValue={queryData.Usuario.nombre}
                        required={true}
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label='Apellido del usuario:'
                        type='text'
                        name='apellido'
                        defaultValue={queryData.Usuario.apellido}
                        required={true}
                    />
                </div>
                <div className="col-md-6">
                <Input
                    label='Correo del usuario:'
                    type='email'
                    name='correo'
                    defaultValue={queryData.Usuario.correo}
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <Input
                    label='Identificación del usuario:'
                    type='text'
                    name='identificacion'
                    defaultValue={queryData.Usuario.identificacion}
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <DropDown
                    label='Estado del usuario:'
                    name='estado'
                    defaultValue={queryData.Usuario.estado}
                    required={true}
                    options={Enum_EstadoUsuario}
                    disabled={false}
                />
                </div>
                <div className="col-md-3">
                <DropDown
                    label='Rol del usuario:'
                    name='rol'
                    defaultValue={queryData.Usuario.rol}
                    required={true}
                    options={Enum_Rol}
                    disabled={true}
                />
                </div>
                {/* <span>Rol del usuario: {queryData.Usuario.rol}</span> */}
                
                <ButtonLoading className="btn-primary"
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                />
            </form>
        </div>
    );
};

export default EditarUsuario;
