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
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEstudiantes"
              aria-expanded="false" aria-controls="collapseEstudiantes">
              Consultar Estudiantes
            </button>
          </h2>
          <div id="collapseEstudiantes" className="accordion-collapse collapse" aria-labelledby="headingTwo"
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
                          {u.estado === 'PENDIENTE' && <td>
                            <Link to={`/usuarios/editar/estudiantes/${u._id}`}>
                              <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                            </Link>
                          </td>}
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
