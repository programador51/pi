import React, { useEffect, useState } from "react";
import Number from "../../atoms/Inputs/Number/Number";
import Modal from "../../components/general/Modal/Modal";
import { SelectUsers } from "../../molecules/Users/Users";
import { ContainerRequestItem } from "./Styles";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DispatchInventory from "../../components/individual/Inputs/DispatchInventory";
import { querySuccess } from "../../helpers/alerts";
import { UpdateRequestItem } from "../../helpers/apis";

export default function ModalRequest() {
  const [item,setItem] = useState(null);
  const [showSpinner,setShowSpinner] = useState(false);

  const schema = yup.object({
    idCode: yup
      .number()
      .positive()
      .required("Ingresa el codigo del producto")
      .typeError("Selecciona un item"),

    idTechnician: yup
      .number()
      .positive()
      .required("Selecciona el tecnico que solicita"),
    quantity: yup
      .number()
      .positive()
      .required("Escribe una cantidad")
      .max(item?.stock, `Maximo ${item?.stock}`)
      .min(1, "Minimo 1")
      .typeError("Escribe una cantidad valida"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    shouldFocusError: false,
    reValidateMode: "onSubmit"
  });

  const validateForm = async(data) => {
      data = {
          ...data,
          total:data.quantity*item.buyPrice,
          price:item.buyPrice,
          idItem:item.id
      }

      const requested = await UpdateRequestItem(data);
      
      if(requested) querySuccess('Producto solicitado',()=>document.getElementById('closeModal').click());
  };

  const showErrors = errors => {
      console.log(errors);
  }

  return (
    <div className="w-25">
      <Modal
        buttonText="Solicitar mercancia"
        close="Cancelar"
        title="Sacar producto de inventario"
        submit = 'Guardar'
        idForm = 'requestItem'
        textSpinner = 'Cargando...'
        showSpinner = {showSpinner}
      >
        <ContainerRequestItem
            id = 'requestItem'
          onSubmit={handleSubmit(validateForm,showErrors)}
        >
          <div>
            <div className="rowInput">
              <label htmlFor="idCode">Codigo</label>
              <DispatchInventory
                forwardRef={register}
                onChange={(item) => {
                    setItem(item)
                }}
                errors={errors}
              />
            </div>

            <div className="rowInput ">
              <label htmlFor="idTechnician">Tecnico que solicita</label>
              <SelectUsers id="idTechnician" name="idTechnician" forwardRef = {register}/>
            </div>

            {item !== null ? (
              <div className="rowInput mt-3">
                <label htmlFor="idCode">Requerimiento</label>
                <Number
                  id="quantity"
                  name="quantity"
                  placeholder="Ingresa cantidad"
                  errors={errors}
                  forwardRef={register}
                />
              </div>
            ) : null}

          </div>
        </ContainerRequestItem>
      </Modal>
    </div>
  );
}
