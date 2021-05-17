import React from "react";
import Menu from "../../components/general/Menu/Menu";
import ModalAdd from './ModalAdd';

export default function Refactions() {
  document.title = `Refacciones`;

  return (
    <>
      <Menu />
      <div className="bodyContent">
        <button
          data-toggle="modal"
          data-target="#modalAddRefaction"
          className="mb-3 mr-3 customBtn w-25"
        >
          Agregar refaccion
        </button>

        <ModalAdd idModal='modalAddRefaction'/>
      </div>
    </>
  );
}
