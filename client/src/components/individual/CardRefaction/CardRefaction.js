import React,{useContext} from "react";
import "./CardRefaction.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { updateDispatch } from "../../../helpers/alerts";
import UtilitiesContext from "../../../context/View/ViewContext";

export default function CardRefaction({ refactions }) {
  const ready = <FontAwesomeIcon size="4x" icon={faCheckCircle} />;
  const pending = <FontAwesomeIcon size="4x" icon={faTimesCircle} />;

  const { reload, setReload } = useContext(UtilitiesContext);

  const fetchedRefactions = refactions;

  const triggerUpdate = async (idRefaction) => {
    const refactionRequested = fetchedRefactions.find(
      (refaction) => refaction.pedido == idRefaction
    );

    if(refactionRequested.surtido===1)return;

    const result = await updateDispatch(
      `Despachar ${refactionRequested.marca} ${refactionRequested.modelo} - ${refactionRequested.cantidad} pzs?`,
      idRefaction
    );

    setReload(!reload);
   
  };

  return (
    <>
      {refactions.map((refaction) => {
        let cssClass = ``;
        {
          refaction.surtido === 0
            ? (cssClass = "pending")
            : (cssClass = "ready");
        }

        return (
          <div class={`cardRefaction ${cssClass}`}>
            <div className="left">
              <p>
                <b>Marca</b>
              </p>
              <p className="mb-2">{refaction.marca}</p>

              <p>
                <b>Modelo</b>
              </p>
              <p className="mb-2">{refaction.modelo}</p>

              <p>
                <b>Refaccion</b>
              </p>
              <p>{refaction.refaccion}</p>
            </div>

            <div
              id={refaction.pedido}
              className="right"
              onClick={(e) => {
                triggerUpdate(e.target.parentNode.parentNode.id);
                /* updateDispatch()
                alert(e.target.parentNode.parentNode.id)
                } */
              }}
            >
              {refaction.surtido === 0 ? pending : ready}
            </div>
          </div>
        );
      })}
    </>
  );
}
