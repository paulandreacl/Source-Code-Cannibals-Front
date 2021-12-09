import React/* , { useEffect } */ from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS, GET_USUARIOROL } from 'graphql/usuario/queries';
import { Link } from 'react-router-dom';
import './usuario.css'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoUsuario, Enum_Rol } from 'utils/enums';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';

const IndexUsuariosLider = () => {
  const { data, error, loading } = useQuery(GET_USUARIOROL, {variables:{rol:'ESTUDIANTE'}});
  console.log(data)
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Errores...</div>;
  
  return (
    <div>
      <div className="accordion" id="accordionExample">

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
              aria-expanded="false" aria-controls="collapseOne">
              Agregar Usuario
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">

            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Agregar Usuario</h1>
            <form
                /* onSubmit={submitForm}
                onChange={updateFormData}
                ref={form} */
                className='row g-3  items-center justify-center '
            >
                <div className="col-md-3">
                    <Input
                        label='Nombre del usuario:'
                        type='text'
                        name='nombre'
                        required={true}
                    />
                </div>
                <div className="col-md-3">
                    <Input
                        label='Apellido del usuario:'
                        type='text'
                        name='apellido'
                        required={true}
                    />
                </div>
                <div className="col-md-3">
                <Input
                    label='Correo del usuario:'
                    type='email'
                    name='correo'
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <Input
                    label='Identificación del usuario:'
                    type='text'
                    name='identificacion'
                    required={true}
                />
                </div>
                <div className="col-md-3">
                <DropDown
                    label='Estado del usuario:'
                    name='estado'
                    required={true}
                    defaultValue={"Pendiente"}
                    options={Enum_EstadoUsuario}
                    disabled={true}
                />
                </div>
                <div className="col-md-3">
                <DropDown
                    label='Rol del usuario:'
                    name='rol'
                    required={true}
                    options={Enum_Rol}
                    disabled={false}
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
              Consultar Estudiantes
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              
              <table className='table table-hover tabla_basedatos'>
                <thead className="table-green-titles">
                  <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Identificación</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.listaFiltradaRol.map((u) => {
                      return (
                        <tr key={u._id}>
                          <td>{u.nombre}</td>
                          <td>{u.apellido}</td>
                          <td>{u.correo}</td>
                          <td>{u.identificacion}</td>
                          <td>{u.rol}</td>
                          <td>{u.estado}</td>
                          <td>
                            <Link to={`/usuarios/editar/${u._id}`}>
                              <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                            </Link>
                          </td>
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

export default IndexUsuariosLider
