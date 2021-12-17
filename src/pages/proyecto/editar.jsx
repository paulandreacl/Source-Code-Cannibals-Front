import React, { useEffect, useState } from "react";
import { GET_PROYECTO } from "graphql/proyecto/queries";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import useFormData from "hooks/useFormData";
import Input from "components/Input";
import {
  EDITAR_PROYECTO,
  EDITAR_OBJETIVO,
  ELIMINAR_OBJETIVO,
} from "graphql/proyecto/mutations";
import { toast } from "react-toastify";
import ButtonLoading from "components/ButtonLoading";
import DropDown from "components/DropDown";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "utils/enums";
import PrivateComponent from "components/PrivateComponent";
import { Enum_TipoObjetivo } from "utils/enums";
import { nanoid } from "nanoid";
import { ObjContext, useObj } from "context/objContext";
import { Dialog } from "@material-ui/core";
import ReactLoading from "react-loading";

const EditarProyecto = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });

  const [
    editarProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_PROYECTO);
  console.log(mutationData);

  const submitForm = (e) => {
    e.preventDefault();
    formData.presupuesto = parseFloat(formData.presupuesto);
    console.log(formData);
    editarProyecto({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Proyecto modificado correctamente");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el proyecto");
    }

    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Loading...</div>;

  return (
    ext-3xl text-gray-800 font-bold text-center">
        Editar Proyecto
      </h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="row g-3 items-center justify-center"
      >
        <div className="col-md-3">
          <Input
            label="Nombre del proyecto:"
            type="text"
            name="nombre"
            defaultValue={queryData.Proyecto.nombre}
            required={true}
          />
        </div>

        <div className="col-md-3">
          <Input
            label="Presupuesto del proyecto:"
            type="number"
            name="presupuesto"
            defaultValue={queryData.Proyecto.presupuesto}
            required={true}
          />
        </div>
        <div className="col-md-3">
          <Input
            readOnly
            label="Fecha Inicio:"
            type="Date"
            name="fechaInicio"
            defaultValue={
              !queryData.Proyecto.fechaInicio
                ? ""
                : queryData.Proyecto.fechaInicio.slice(0, -14)
            }
            required={true}
          />
        </div>
        <div className="col-md-3">
          <Input
            readOnly
            label="Fecha Fin:"
            type="Date"
            name="fechaFin"
            defaultValue={
              !queryData.Proyecto.fechaFin
                ? ""
                : queryData.Proyecto.fechaFin.slice(0, -14)
            }
            required={true}
          />
        </div>

        <PrivateComponent roleList="ADMINISTRADOR">
          <div className="col-md-3">
            <DropDown
              label="Estado del proyecto:"
              name="estado"
              defaultValue={queryData.Proyecto.estado}
              required={true}
              options={Enum_EstadoProyecto}
            />
          </div>
          <div className="col-md-3">
            <DropDown
              label="Fase del proyecto:"
              name="fase"
              defaultValue={queryData.Proyecto.fase}
              required={true}
              options={Enum_FaseProyecto}
            />
          </div>
        </PrivateComponent>

        <div>
        <div>
          <h2 className="m-4 text-xl text-gray-800 font-bold text-center">
            Objetivos
          </h2>
          <table className="table table-hover tabla_basedatos">
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Editar</th>
            <tbody>
              {queryData.Proyecto.objetivos.map(
                      

        <ButtonLoading
          className="btn-primary"
espaldoDespliegueDic16
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Confirmar"
        />
      </form>
      {/* {queryData.Proyecto.objetivos.map((objetivo) =>(<Objetivo
           descripcion={objetivo.descripcion}
           tipo={objetivo.tipo}                          
           idProyecto={_id}
           setShowEditDialog={setShowEditDialog}
           />))} 
           
      comentrio pra hcer pull request despues*/}

      
    </div>
  );
};

// desde acá esta añadido

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();

  // falta capturar error de la mutacion
  // falta toast de success

          disabled=
pruebasCI
  const [editarProyecto, { loading }] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
  return (
    <>
      <div>
        <div className="flex my-2">
          <button type="button" onClick={() => setShowEditDialog(true)}>
            <i className="fas fa-pen mx-2 text-yellow-500 hover:text-yellow-200 cursor-pointer" />
          </button>
        </div>
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
          <EditarObjetivo
            descripcion={descripcion}
            tipo={tipo}
            index={index}
            idProyecto={idProyecto}
            setShowEditDialog={setShowEditDialog}
          />
        </Dialog>
      </div>
    </>
  );
};

const EditarObjetivo = ({
  descripcion,
  tipo,
  index,
  idProyecto,
  setShowEditDialog,
}) => {
  const { form, formData, updateFormData } = useFormData();

  const [editarObjetivo, { data: dataMutation, loading }] = useMutation(
    EDITAR_OBJETIVO,
    {
      refetchQueries: [{ query: GET_PROYECTO }],
    }
  );

  useEffect(() => {
    if (dataMutation) {
      toast.success("Objetivo editado con exito");
      setShowEditDialog(false);
    }
      },
    }).catch((error) => {
      toast.error("Error editando el objetivo", error);
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900">Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label="Tipo de Objetivo"
          name="tipo"
          required
          options={Enum_TipoObjetivo}
          defaultValue={tipo}
        />
        <Input
          label="Descripcion del objetivo"
          name="descripcion"
          required
          defaultValue={descripcion}
        />
        <ButtonLoading
          text="Confirmar"
          disabled={Object.keys(formData).length === 0}
          loading={loading}
        />
      </form>
    </div>
  );
};

export default EditarProyecto;
