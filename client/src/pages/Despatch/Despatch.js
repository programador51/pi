import React, { useContext, useEffect, useState } from "react";
import CardRefaction from "../../components/individual/CardRefaction/CardRefaction";
import UtilitiesContext from "../../context/View/ViewContext";
import { refactionsOffice } from "../../helpers/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { validateRol } from '../../helpers/auth';

export default function Despatch() {
  const [refactions, setRefactions] = useState({});
  const [office, setOffice] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const { reload, setReload } = useContext(UtilitiesContext);

  const reloadIcon = <FontAwesomeIcon icon={faRedoAlt} size="1x" />

  useEffect(() => {
    const initialLoad = async () => {
      setIsFetching(true);
      const fetchedRefactions = await refactionsOffice(office);

      console.log(fetchedRefactions);

      if (!fetchedRefactions) return;

      setRefactions(fetchedRefactions);
      setIsFetching(false);
    };
    validateRol();
    initialLoad();
  }, [office, reload]);

  const branches = [
    { value: 1, text: "San Nicolas" },
    { value: 2, text: "Monterrey" },
    { value: 3, text: "Guadalupe" },
    { value: 4, text: "Apodaca" },
  ];

  return (
    <>
      <div className="d-flex justify-content-center align-items-center my3">
        <label className="text-right mr-2 w-25" htmlFor="branch">
          Sucursal
        </label>

        <select
          onChange={e => setOffice(parseInt(e.target.value, 10))}
          name="branch" className="w-60 mt-3" required>
          {branches.map((branch) => {
            return <option value={branch.value}>{branch.text}</option>;
          })}
        </select>
      </div>

      <p
        onClick={() => setReload(!reload)}
        className="reload">
        {reloadIcon} Refrescar
      </p>

      {isFetching ? null : <CardRefaction refactions={refactions} />}
    </>
  );
}
