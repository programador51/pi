import React, { useContext, useEffect, useState } from "react";
import Menu from "../../components/general/Menu/Menu";
import Table from "../../components/general/Table/Table";
import { fetchAllMoves } from "../../helpers/apis";
import ModalAddMove from '../../components/general/Modal/ModalAddMove';
import UtilitiesContext from '../../context/View/ViewContext';
import { getUser, validateRol } from '../../helpers/auth';

export default function Moves() {
  const [moves, setMoves] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const { reload } = useContext(UtilitiesContext);

  const { rol } = getUser();

  useEffect(() => {
    const initialLoad = async () => {
      const movesFetched = await fetchAllMoves();
      setMoves(movesFetched);
      setIsFetching(false);
    };
    validateRol();
    initialLoad();
  }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Menu />
      <div className="bodyContent">
        {
          rol === 3 ?
            <button
              data-toggle="modal"
              data-target="#openNewMove"
              className="mb-3 customBtn w-25">
              Nuevo movimiento
            </button>
            :
            null
        }

        {isFetching ? null : (
          <Table
            headers={["#", "Cantidad", "Concepto", "Tipo", "Fecha"]}
            dataFetched={moves}
            idRow={'idMovimiento'}
            idTable={'moves'}
            extraFunction={() => { }}
            attributes={['idMovimiento', 'precio', 'nombre', 'typeMove', 'dateCreated']}
          />
        )}

        <ModalAddMove idModal='openNewMove' />

      </div>
    </>
  );
}
