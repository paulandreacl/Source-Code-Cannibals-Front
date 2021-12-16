import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';
import { useUser } from 'context/userContext';
import { GET_ONEAVANCEBYID } from 'graphql/avance/queries';
import { OBSERVACIONES } from 'graphql/avance/mutations';

const Observacion = () => {
    const navigate = useNavigate();
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
    const { userData } = useUser();

    const {
        loading: queryLoading,
        error: queryError,
        data: queryData,
    } = useQuery( GET_ONEAVANCEBYID, {
        variables: { _id }
    });

    console.log(queryData);

    const [observacion, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(OBSERVACIONES);

    const submitForm = (e) => {
        e.preventDefault();
        formData.observaciones = formData.observaciones;
        formData.id = queryData.Avance._id;
        observacion({
            variables: {_id, ...formData }

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
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Agregar Observaciones</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form}
                className='row g-3 items-center justify-center'
            >

                <div className="col-md-3">
                    <Input
                        label='Observaciones:'
                        type='text'
                        name='observaciones'
                        /* defaultValue={queryData.Avance.estado} */
                        required={true}
                    />
                </div>
                <ButtonLoading className="btn-primary" 
                    onClick={observacion}
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                />

            </form>
        </div>

    );
};

export default Observacion;
