import React , { useEffect } from 'react';
import { useQuery, useMutation} from '@apollo/client';
import { GET_INSCRIPCIONES } from 'graphql/inscripcion/queries';
import { ACEPTAR_INSCRIPCION, RECHAZAR_INSCRIPCION } from 'graphql/inscripcion/mutations';
import { Link } from 'react-router-dom';
import './inscripcion.css'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/DropDown'
import { Enum_EstadoInscripcion} from 'utils/enums';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';

const MisInscripciones = () => {
    const { data, error, loading } = useQuery(GET_INSCRIPCIONES);
    console.log('informacion data', data)
    /*useEffect(() => {
      console.log(data)
    },[data]);*/
  
    const [aceptar,{data: dataMutation1, loading: loadingMutation1,
      error: errorMutaton1}]=useMutation(ACEPTAR_INSCRIPCION);
    
    const [rechazar,{data: dataMutation2, loading: loadingMutation2,
      error: errorMutaton2}]=useMutation(RECHAZAR_INSCRIPCION);
  
  
    const aceptarInscripcion = (e) => {
      // console.log('Incripción Aceptada');
      let alertaUsuario=window.confirm('¿Está seguro de aceptar el usuario?');
      if (alertaUsuario) {
        aceptar({variables:{
          aprobarInscripcionId:e._id
        }});    
      }
    };
  
    const rechazarInscripcion = (e) => {
      // console.log('Incripción Rechazada')
      let alertaUsuario=window.confirm('¿Está seguro de aceptar el usuario?');
      if (alertaUsuario){
        rechazar({variables:{
          rechazarInscripcionId:e._id
        }})
      }
    };
  
    if (loading) return <div>Loading...</div>;
  
    if (error) return <div>Error...</div>;
  
  
  return (
    <div className="accordion" id="accordionExample">

      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree"
            aria-expanded="false" aria-controls="collapseThree">
            Mis Inscripciones
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
          data-bs-parent="#accordionExample">
          <div className="accordion-body">
            
            <table className='table table-hover tabla_basedatos'>
              <thead className="table-green-titles">
                <tr>
                  <th>Proyecto</th>
                  <th>Lider</th>
                  <th>Estudiante</th>
                  <th>Estado</th>
                  <th>Ingreso</th>
                  <th>Egreso</th>
                  
                  <th>Aceptar</th>
                  <th>Rechazar</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.Inscripciones.filter((cod)=> cod.proyecto.lider._id==='619f00643562c617b240f25e').map((u) => {
                    return (
                      <tr key={u._id}>
                        <td>{u.proyecto.nombre}</td>
                        <td>{u.proyecto.lider.nombre}</td>
                        <td>{u.estudiante.nombre+ " "+ u.estudiante.apellido}</td>
                        <td>{u.estado}</td>
                        <td>{!u.fechaIngreso ? '' : u.fechaIngreso.slice(0, -14)}</td>
                        <td>{!u.fechaEgreso ? '' : u.fechaEgreso.slice(0, -14)}</td>
                        <td className='py-3 px-4'>
                          {/* <Link to={`/inscripciones/aceptar/${u._id}`}>
                            <i className='fas fa-check-circle text-green-600 hover:text-yellow-400 cursor-pointer' />
                          </Link>  */}
                          <button><i onClick={()=>{aceptarInscripcion(u)}} className='fas fa-check-circle text-green-600 hover:text-yellow-400
                          cursor-pointer'/></button>
                        </td>
                        <td className='py-3 px-4'>
                          {/* <Link to={`/inscripciones/rechazar/${u._id}`}>
                            <i className='fas fa-times-circle text-red-600 hover:text-yellow-400 cursor-pointer' />
                          </Link> */}
                          <button><i onClick={()=>(rechazarInscripcion(u))} className='fas fa-times-circle text-red-600 hover:text-yellow-400 cursor-pointer'/></button>
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
  );
};

export default MisInscripciones
