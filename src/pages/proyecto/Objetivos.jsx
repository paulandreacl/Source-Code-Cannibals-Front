import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from 'components/Input';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { Link } from 'react-router-dom';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Enum_TipoObjetivo } from 'utils/enums';
import { nanoid } from 'nanoid';
import { ObjContext, useObj } from 'context/objContext';



const Objetivos = () => {
    const [listaObjetivos, setListaObjetivos] = useState([]);
    const [maxObjetivos, setMaxObjetivos] = useState(false);
  
    const eliminarObjetivo = (id) => {
      setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
    };
  
    const componenteObjetivoAgregado = () => {
      const id = nanoid();
      return <FormObjetivo key={id} id={id} />;
    };
  
    useEffect(() => {
      if (listaObjetivos.length > 4) {
        setMaxObjetivos(true);
      } else {
        setMaxObjetivos(false);
      }
    }, [listaObjetivos]);
  
    return (
      <ObjContext.Provider value={{ eliminarObjetivo }}>
        <div>
          <span>Objetivos del Proyecto</span>
          {!maxObjetivos && (
            <button
              type='button'
              onClick={() =>
                setListaObjetivos([
                  ...listaObjetivos,
                  componenteObjetivoAgregado(),
                ])
              }
            >
              <i className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer' />
            </button>
          )}
          {listaObjetivos.map((objetivo) => objetivo)}
        </div>
      </ObjContext.Provider>
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
          required
        />
        <DropDown
          name={`nested||objetivos||${id}||tipo`}
          options={Enum_TipoObjetivo}
          label='Tipo de Objetivo'
          required
        />
        <button type='button' onClick={() => eliminarObjetivo(id)}>
          <i className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6' />
        </button>
      </div>
    );
  };


  