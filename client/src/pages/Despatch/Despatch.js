import React, { useContext, useEffect, useState } from "react";
import { SelectInput } from "../../components/individual/Inputs";
import CardRefaction from "../../components/individual/CardRefaction/CardRefaction";
import UtilitiesContext from '../../context/View/ViewContext';
import { refactionsOffice } from "../../helpers/apis";

export default function Despatch() {
  const [refactions, setRefactions] = useState({});
  const [office, setOffice] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const {reload} = useContext(UtilitiesContext);

  useEffect(() => {
    const initialLoad = async () => {
      setIsFetching(true);
      const fetchedRefactions = await refactionsOffice(office);
      setRefactions(fetchedRefactions);
      setIsFetching(false);
    };

    initialLoad();
  }, [reload]);

  const branches = [
    { value: 1, text: "San Nicolas" },
    { value: 2, text: "Monterrey" },
    { value: 3, text: "Guadalupe" },
    { value: 4, text: "Apodaca" },
  ];

  return (
    <>
      <SelectInput
        label="Sucursal"
        htmlFor="branch"
        id="branch"
        options={branches}
        css="my-3"
        attributes={{
          text: "text",
          value: "value",
        }}
      />

      {isFetching ? (
        <p>Cargando datos...</p>
      ) : (
        <CardRefaction refactions={refactions} />
      )}
    </>
  );
}
