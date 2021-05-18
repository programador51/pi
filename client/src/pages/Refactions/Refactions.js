import React, { useContext, useEffect, useState } from "react";
import Menu from "../../components/general/Menu/Menu";
import ModalAdd from "./ModalAdd";
import ModalEdit from './ModalEdit';
import { getRefactions } from "../../helpers/apis";
import Table from "../../components/general/Table/Table";
import UtilitiesContext from "../../context/View/ViewContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {showOptions,setInfoModal} from '../../helpers/refactions';
import { deleteRefaction } from '../../helpers/alerts'; 

export default function Refactions() {
  document.title = `Refacciones`;

  const { reload,infoRow,selectedRow } = useContext(UtilitiesContext);

  const status = <FontAwesomeIcon icon={faCheckCircle} />;

  const [refactions, setRefactions] = useState([]);
  const [isFetching, setIsFetching] = useState(true); 
  useEffect(() => {
    const initialLoad = async () => {
      setIsFetching(true);
      const data = await getRefactions();

      if(!data){
        console.log(`No hay refacciones!`);
        return;
      }

      setRefactions(data);
      setIsFetching(false);
    };

    initialLoad();
  }, [reload]);

  return (
    <>
      <Menu />
      <div className="bodyContent">
        <div className="row d-flex align-items-center">
          <div className="col-6">
            <button
              data-toggle="modal"
              data-target="#modalAddRefaction"
              className="mb-3 mr-3 customBtn w-50"
            >
              Agregar refaccion
            </button>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <h2>Estatus {status}</h2>
          </div>
        </div>

        <h3 className="text-center">Refacciones solicitadas</h3>
        {isFetching ? null : (
          <Table
            headers={["#", "Cantidad", "Refaccion", "Marca", "Modelo"]}
            dataFetched={refactions}
            idRow={"pedido"}
            idTable={"refactions"}
            attributes={["pedido", "cantidad", "refaccion", "marca", "modelo"]}
            extraFunction={() => showOptions('optionsRefactions')}
          />
        )}

          <div className="d-none" id="optionsRefactions">
            <button 
              onClick = {()=>deleteRefaction(`Estas seguro de borrar la refaccion ${selectedRow}?`,selectedRow)}
              className="w-25 customBtn">
              Eliminar
            </button>

            <button  
                data-toggle="modal" 
                onClick={()=>setInfoModal(infoRow)}
                data-target="#modalEditRefaction"
                className="w-25 customBtn">
              Editar
            </button>
          </div>

        <ModalAdd idModal="modalAddRefaction" />
        <ModalEdit idModal='modalEditRefaction' />
      </div>
    </>
  );
}
