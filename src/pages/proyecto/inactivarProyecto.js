import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROYECTOS } from 'graphql/proyecto/queries';
import { PROYECTO_FASE_EDITADO } from 'graphql/proyecto/mutations';
import { toast } from 'react-toastify';


const InactivarProyecto = () => {
    const { data, error, loading } = useQuery(GET_PROYECTOS);
    const [inactivar, { data: dataMutation, loading: loadingMutation,
        error: errorMutaton }] = useMutation(PROYECTO_FASE_EDITADO);
    const [finalizar, { data: dataMutation1, loading: loadingMutation1,
        error: errorMutaton1 }] = useMutation(PROYECTO_FASE_EDITADO);

    const inactivarProyecto = (e) => {
        inactivar({
            variables: {
                id: e._id,
                fechaFin: Date.now(),
                estado: "INACTIVO",
            }
        });
    };

    const finalizarProyecto = (e) => {
        finalizar({
            variables: {
                id: e._id,
                fechaFin: Date.now(),
                fase: "TERMINADO",
                estado: "INACTIVO",
            }
        });
    };

    useEffect(() => {
        if ([dataMutation, dataMutation1]) {
        }
    }, [dataMutation, dataMutation1, data]);

    const Objetivo = ({ tipo, descripcion }) => {
        return (
            <div>
                <div className='text-lg font-bold'>{tipo}</div>
                <div>{descripcion}</div>
                {/*  <PrivateComponent roleList={['ADMINISTRADOR']}>
              <div>Editar</div>
            </PrivateComponent> */}
            </div>
        );
    };

    return (

        <div className="accordion" id="accordionExample">

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingInactivar">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInactivar"
                        aria-expanded="false" aria-controls="collapseInactivar">
                        Proyectos activos
                    </button>
                </h2>
                <div id="collapseInactivar" className="accordion-collapse collapse" aria-labelledby="headingInactivar"
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <table className='table table-hover tabla_basedatos'>
                            <thead className="table-green-titles">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Presupuesto</th>
                                    <th>Inicio</th>
                                    <th>Fin</th>
                                    <th>Estado</th>
                                    <th>Fase</th>
                                    <th>Lider</th>
                                    <th>Objetivo</th>
                                    <th>Inactivar</th>
                                    <th>Finalizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data.Proyectos.map((u) => {
                                        return (
                                            <tr key={u._id}>
                                                {u.estado == "ACTIVO" ?
                                                    <>
                                                        <td>{u.nombre}</td>
                                                        <td>{u.presupuesto}</td>
                                                        <td>{!u.fechaInicio ? '' : u.fechaInicio.slice(0, -14)}</td>
                                                        <td>{!u.fechaFin ? '' : u.fechaFin.slice(0, -14)}</td>
                                                        <td>{u.estado}</td>
                                                        <td>{u.fase}</td>
                                                        <td>{u.lider.nombre + ' ' + u.lider.apellido}</td>
                                                        <td> {u.objetivos.map((objetivo) => {
                                                            return <Objetivo tipo={objetivo.tipo} descripcion={objetivo.descripcion} />;
                                                        })}</td>

                                                        <td className='py-2 px-5'>
                                                            <button><i onClick={() => { inactivarProyecto(u) }} className='fas fa-check-circle text-green-600 hover:text-yellow-400
                                                                cursor-pointer'/></button>
                                                        </td>


                                                        <td className='py-2 px-5'>
                                                            {u.fase == "DESARROLLO" ?
                                                                <button><i onClick={() => { finalizarProyecto(u) }} className='fas fa-check-circle text-green-600 hover:text-yellow-400
                                                                cursor-pointer'/></button>
                                                                : <i className='fas fa-ban text-red-700'></i>}
                                                        </td>
                                                    </> : ""}
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div >
        </div >
    )
};

export default InactivarProyecto;