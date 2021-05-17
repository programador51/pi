import React from "react";
import { SelectInput } from "../../components/individual/Inputs";

export default function Despatch() {

    const branches = [
        {value:1,text:'San Nicolas'},
        {value:2,text:'Monterrey'},
        {value:3,text:'Guadalupe'},
        {value:4,text:'Apodaca'}
    ];

  return (
    <>
      <SelectInput
        label="Sucursal"
        htmlFor="branch"
        id="branch"
        options={branches}
        css="mt-2"
        attributes={{
          text: "text",
          value: "value",
        }}
      />
    </>
  );
}
