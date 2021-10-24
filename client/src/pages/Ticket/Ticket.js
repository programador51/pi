import React, { useEffect, useState } from "react";
import NativeDate from "../../atoms/Inputs/Dates/NativeDate/NativeDate";
import Number from "../../atoms/Inputs/Number/Number";
import { Text } from "../../atoms/Inputs/Text/Text";
import TextArea from "../../atoms/Inputs/TextArea/TextArea";
import Menu from "../../components/general/Menu/Menu";
import PayMethods from "../../molecules/PayMethods/PayMethods";
import RepairStatus from "../../molecules/RepairStatus/RepairStatus";
import SelectServices from "../../molecules/Services/Services";
import { SelectUsers } from "../../molecules/Users/Users";
import { ContainerTicket } from "../Tickets/Styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { GetTicket } from "../../helpers/apis";
import { useParams } from "react-router-dom";

import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useTicket from "./useTicket";
import { formatMoney } from "../../helpers/numbers";

export function Ticket() {
  const PhoneIcon = <FontAwesomeIcon icon={faPhoneAlt} />;
  const CardId = <FontAwesomeIcon icon={faIdCard} />;

  const { idTicket } = useParams();

  const [ticket, setTicket] = useState(null);

  const { updateTicket } = useTicket();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yup.object({
      repairStatus: yup.number().positive().required().typeError('Inserta un estatus valido')
    })),
    shouldFocusError: false,
    reValidateMode: "onSubmit"
  });

  useEffect(() => {
    (async function () {
      const apiTicket = await GetTicket(idTicket);
      reset({
        repairStatus: apiTicket.idRepairStatus
      })
      setTicket(apiTicket);
    })();
  }, []);

  const save = data => {
    updateTicket({
      ...data,
      idTicket: ticket.id
    });
  }

  return (
    <>
      <Menu
        linkAddTickets='../../tickets'
        linkRefactions='../../refacciones'
        linkInventory='../../inventario'
        linkManage='../../gestion'
        linkTickets='../../tickets/ver'
      />

      {ticket !== null ? (
        <ContainerTicket onSubmit={handleSubmit(save)}>
          <p className="header">Informacion ticket</p>

          <p className="client">Informacion del cliente</p>
          <p className="ticket">Folio: {ticket.id}</p>

          <div className="customerInfo">
            <div className="customerName">
              <div className="icon">{CardId}</div>
              <Text
                placeholder="1er. nombre"
                id="customerName"
                name="customerName"
                defaultValue={ticket.customer.fullName}
                readOnly={true}
              />
            </div>

            <div className="technician">
              <label htmlFor="">Tecnico a cargo</label>
              <SelectUsers
                defValue={ticket.idTechnician}
                disabled={true}
              />
            </div>

            <div className="phoneCustomer">
              <div className="icon">{PhoneIcon}</div>

              <Number
                id="customerPhone"
                name="customerPhone"
                readOnly={true}
                defValue={ticket.customer.phone}
              />
            </div>

            <div className="repatirStatus">
              <label htmlFor="">Estado de reparacion</label>
              <RepairStatus
                defValue={ticket.idRepairStatus}
                forwardRef={register}
                errors={errors}

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
                    defValue={format(new Date(ticket.recolectionDate), 'yyyy-MM-dd')}
                    id="receptionDate"
                    name="receptionDate"
                    disabled={true}
                  />
                </div>

                <div>
                  <label htmlFor="">Marca *</label>
                  <Text
                    placeholder="Escribe aqui"
                    id="fabricant"
                    name="fabricant"
                    defaultValue={ticket.fabricant}
                    readOnly={true}
                  />
                </div>

                <div>
                  <label htmlFor="">Modelo *</label>
                  <Text
                    placeholder="Escribe aqui"
                    id="model"
                    name="model"
                    defaultValue={ticket.model}
                    readOnly={true}
                  />
                </div>

                <div>
                  <label htmlFor="">Servicio</label>
                  <SelectServices
                    defValue={ticket.idService}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="deliver">
                <label htmlFor="">Fecha de entrega</label>
                <NativeDate
                  defValue={format(new Date(ticket.deliverDate), 'yyyy-MM-dd')}
                  id="deliverDate"
                  name="deliverDate"
                  disabled={true}
                />
              </div>

              <div className="status">
                <p>Estado del equipo</p>
                <div className="listStatus">
                  <div>
                    <input type="checkbox" />
                    <label htmlFor="">Apagado</label>
                  </div>
                  <div>
                    <input type="checkbox" />
                    <label htmlFor="">Chip</label>
                  </div>
                  <div>
                    <input type="checkbox" />
                    <label htmlFor="">Encendido</label>
                  </div>
                  <div>
                    <input type="checkbox" />
                    <label htmlFor="">Sim</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="desc">
            <TextArea
              readOnly={true}
              defValue={ticket.observations}
              name="observations"
              id="observations"
              placeholder="Comentarios/Observaciones"
            />
          </div>

          <div className="payMethod">
            <PayMethods
              defValue={ticket.idPayMethod}
              disabled={true}
            />
          </div>

          <div className="quotation">
            <label htmlFor="quotation">Cotizacion</label>


            <Text
              id='quotation'
              name='quotation'
              placeholder='No editable'
              readOnly={true}
              defaultValue={formatMoney.format(ticket.quotation)}
            />
          </div>

          <div className="total">
            <label htmlFor="total">Total</label>

            <Text
              id='total'
              name='total'
              placeholder='No editable'
              readOnly={true}
              defaultValue={formatMoney.format(ticket.amount)}
            />
          </div>

          {ticket.idRepairStatus === 2 ? null :

            <input
              type="submit"
              className="save customBtn"
              value="Actualizar estado"
            />

          }

        </ContainerTicket>
      ) : null}
    </>
  );
}
