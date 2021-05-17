import React,{useContext, useState} from "react";
import parse from "html-react-parser";
import './Table.scss';
import UtilitiesContext from '../../../context/View/ViewContext';

export default function Table({ headers, dataFetched, attributes,idTable,idRow,extraFunction,classesRow = '' }) {

    const {setSelectedRow,selectedRow,infoRow} = useContext(UtilitiesContext);

    const [lastSelected, setLastSelected] = useState(-999);

    const functionality = (e) => {
    let rowSelected = e.target.parentNode;
    rowSelected = rowSelected.getAttribute("id");
    rowSelected = parseInt(rowSelected, 10);

    /* SET THE INFO OF THE SELECTED ROW ON THE STATE */
    let lastClickedRow = document.getElementById(lastSelected);

    lastClickedRow.classList.remove("rowSelected");

    const rowInformation = dataFetched.filter(
      (idData) => idData[idRow] === rowSelected
    );
    

    setLastSelected(rowInformation[0][idRow]);

    document
      .getElementById(rowInformation[0][idRow])
      .classList.add("rowSelected");
    
    setSelectedRow([rowSelected,rowInformation[0]]);

    extraFunction();
  };

  return (
    <div className="containerTable overflow-auto">

    
    <table className="table table-bordered">
      <thead>
        <tr className="text-center">
          {headers.map((header) => {
            return <th>{header}</th>;
          })}
        </tr>
    </thead>


        <tbody>
          <tr id="-999" className="rowSelected"></tr>
          {dataFetched.map((info, i) => {
            let html = ``;

            /* On the first loop 1-3. (Just an example)
            Will do a loop for each of the elements that we spicified as
            argument, for example. If the parameter attributes was
            ['idUser','userName','initials','fullName','email','rolName','statusDescription']
            Will be a loop of 7 times that gonna renderize that attributes of the json */
            attributes.map((attribute, i) => {
              html += `<td class="${classesRow[i]}">${info[attribute]}</td>`;
            });
            return (
              <tr
                id={dataFetched[i][idRow]}
                key={dataFetched[i][idRow]}
                onClick={(e) => functionality(e)}
              >
                {/* This lib will parse to jsx the string getted on
                the 2nd loop */}
                {parse(html)}
              </tr>
            );
          })}
        </tbody>
    </table>
    </div>
  );
}
