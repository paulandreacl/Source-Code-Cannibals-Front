import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import { CREAR_AVANCE } from 'graphql/avance/mutations';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoProyecto, Enum_FaseProyecto } from 'utils/enums';
import { useUser } from 'context/userContext';
import { GET_PROYECTO } from 'graphql/proyecto/queries';

const CrearAvance = () => {
    const navigate = useNavigate();
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const { userData } = useUser();

    const {
        loading: queryLoading,
        error: queryError,
        data: queryData,
    } = useQuery(GET_PROYECTO, {
        variables: { _id }
    });

    const [crearAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(CREAR_AVANCE);

    const submitForm = (e) => {
        e.preventDefault();
        formData.descripcion = formData.descripcion;
        formData.proyecto = queryData.Proyecto._id;
        formData.creadoPor = userData._id;
        crearAvance({
            
            variables: { fecha : Date.now(), ...formData }

        });
    };

    useEffect(() => {
        if (mutationData) {
            toast.success('Avance creado correctamente');
            navigate("/avances")
            window.location.reload()
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error('Error modificando el avance');
        }

    }, [mutationError]);

    return (
        <div>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Agregar Avance</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='row g-3 items-center justify-center'
            >

                <div className="col-md-3">
                    <Input
                        label='Descripcion:'
                        type='text'
                        name='descripcion'
                        /* defaultValue={queryData.Avance.estado} */
                        required={true}
                    />
                </div>
                <ButtonLoading className="btn-primary" 
                    onClick={crearAvance}
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                />

            </form>
        </div>

    );
};

export default CrearAvance;
