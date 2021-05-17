import React, { useContext, useEffect, useState } from "react";
import Menu from "../../components/general/Menu/Menu";
import Table from "../../components/general/Table/Table";
import { fetchAllMoves } from "../../helpers/apis";
import ModalAddMove from '../../components/general/Modal/ModalAddMove';
import UtilitiesContext from '../../context/View/ViewContext';

export default function Moves() {
  const [moves, setMoves] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const {reload} = useContext(UtilitiesContext);

  useEffect(() => {
    const initialLoad = async () => {
      const movesFetched = await fetchAllMoves();
      setMoves(movesFetched);
      setIsFetching(false);
    };

    initialLoad();
  }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Menu />
      <div className="bodyContent">
        <button 
            data-toggle="modal" 
            data-target="#openNewMove"
            className="mb-3 customBtn w-25">
            Nuevo movimiento
        </button>

        {isFetching ? null : (
          <Table
            headers={["#", "Cantidad", "Concepto", "Tipo", "Fecha"]}
            dataFetched={moves}
            idRow = { 'idMovimiento' }
            idTable = { 'moves' }
            extraFunction = {()=>{}}
            attributes = {['idMovimiento','precio','nombre','typeMove','dateCreated']}
          />
        )}

        <ModalAddMove idModal = 'openNewMove'/>

      </div>
    </>
  );
}
