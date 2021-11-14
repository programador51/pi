import React from "react";
import Menu from "../../components/general/Menu/Menu";
import { ContainerTicket } from "./Styles";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { getCheckValues } from '../../helpers/forms/checkbox';

import { schema } from "./Validations";


import { Text } from "../../atoms/Inputs/Text/Text";
import { SelectUsers } from "../../molecules/Users/Users";
import Number from "../../atoms/Inputs/Number/Number";
import SelectServices from "../../molecules/Services/Services";
import TextArea from "../../atoms/Inputs/TextArea/TextArea";
import NativeDate from "../../atoms/Inputs/Dates/NativeDate/NativeDate";
import RepairStatus from "../../molecules/RepairStatus/RepairStatus";
import PayMethods from "../../molecules/PayMethods/PayMethods";

import useTickets from "./useTickets";

export function Ticket() {
  const PhoneIcon = <FontAwesomeIcon icon={faPhoneAlt} />;
  const CardId = <FontAwesomeIcon icon={faIdCard} />;

  const { saveOnDb } = useTickets();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    shouldFocusError: false,
    reValidateMode: "onSubmit",
    defaultValues: {
      receptionDate: new Date()
    }
  });

  const addTicket = (data) => {
    data = {
      ...data,
      status: getCheckValues('listStatus')
    }

    saveOnDb(data);
  };

  return (
    <>
      <Menu />
      <ContainerTicket onSubmit={handleSubmit(addTicket)}>
        <p className="header">Crear nuevo ticket</p>

        <p className="client">Informacion del cliente</p>
        <p className="ticket">Folio: ND</p>

        <div className="customerInfo">
          <div className="customerName">
            <div className="icon">{CardId}</div>
            <Text
              forwardRef={register}
              placeholder="1er. nombre"
              id="customerName"
              name="customerName"
              errors={errors}
            />

            <Text
              forwardRef={register}
              placeholder="2do. nombre"
              id="customerMiddleName"
              name="customerMiddleName"
              errors={errors}
            />

            <Text
              forwardRef={register}
              placeholder="Paterno"
              id="customerPattern"
              name="customerPattern"
              errors={errors}
            />

            <Text
              forwardRef={register}
              placeholder="Materno"
              id="customerMother"
              name="customerMother"
              errors={errors}
            />
          </div>

          <div className="technician">
            <label htmlFor="">Tecnico a cargo</label>
            <SelectUsers forwardRef={register} errors={errors} />
          </div>

          <div className="phoneCustomer">
            <div className="icon">{PhoneIcon}</div>

            <Number
              errors={errors}
              forwardRef={register}
              id="customerPhone"
              name="customerPhone"
            />
          </div>

          <div className="repatirStatus">
            <label htmlFor="">Estado de reparacion</label>
            <RepairStatus
              errors={errors}
              forwardRef={register}
            />
          </div>
        </div>

        <div className="equip">
          <p className="header">Informacion del equipo</p>
          <div className="info">
            <div className="equipment">
              <div>
                <label htmlFor="">Fecha de recepcion</label>
                <NativeDate
                  forwardRef={register}
                  errors={errors}
                  id="receptionDate"
                  name="receptionDate"
                  defValue={format(new Date(), "yyyy-MM-dd")}
                />
              </div>

              <div>
                <label htmlFor="">Marca *</label>
                <Text
                  forwardRef={register}
                  placeholder="Escribe aqui"
                  id="fabricant"
                  name="fabricant"
                  errors={errors}
                />
              </div>

              <div>
                <label htmlFor="">Modelo *</label>
                <Text
                  forwardRef={register}
                  placeholder="Escribe aqui"
                  id="model"
                  name="model"
                  errors={errors}
                />
              </div>

              <div>
                <label htmlFor="">Servicio</label>
                <SelectServices forwardRef={register} errors={errors} />
              </div>
            </div>

            <div className="deliver">
              <label htmlFor="">Fecha de entrega</label>
              <NativeDate
                forwardRef={register}
                errors={errors}
                id="deliverDate"
                name="deliverDate"
              />
            </div>

            <div className="status">
              <p>Estado del equipo</p>
              <div id="listStatus" className="listStatus">
                <div>
                  <input value="1" id="off" name="off" type="checkbox" />
                  <label htmlFor="off">Apagado</label>
                </div>
                <div>
                  <input value="2" id="chip" name="chip" type="checkbox" />
                  <label htmlFor="chip">Chip</label>
                </div>
                <div>
                  <input value="3" id="on" name="on" type="checkbox" />
                  <label htmlFor="on">Encendido</label>
                </div>
                <div>
                  <input value="4" id="sim" name="sim" type="checkbox" />
                  <label htmlFor="sim">Sim</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="desc">
          <TextArea
            name="observations"
            id="observations"
            forwardRef={register}
            placeholder='Comentarios/Observaciones'
          />
        </div>

        <div className="payMethod">
          <PayMethods forwardRef={register} errors={errors} />
        </div>

        <div className="quotation">
          <label htmlFor="quotation">Cotizacion</label>
          <Number
            forwardRef={register}
            errors={errors}
            id="quotation"
            name="quotation"
            placeholder="Escribe aqui *"
          />
        </div>

        <div className="total">
          <label htmlFor="total">Total</label>
          <Number
            forwardRef={register}
            errors={errors}
            id="total"
            name="total"
            placeholder="Escribe aqui *"
          />
        </div>

        <input type="submit" className="save customBtn" value="Agregar" />
      </ContainerTicket>
    </>
  );
}
