import React, { useEffect, useState } from "react";
import Menu from '../../components/general/Menu/Menu';
import { getActualDate,months } from '../../helpers/dates';
import {fetchManage} from '../../helpers/apis';
import { Link } from 'react-router-dom';
import { calculateCash } from '../../helpers/manage';
import { formatMoney } from '../../helpers/numbers';

export default function Manage() {

  document.title = `Gestion`;

  const [manage,setManage] = useState([{
    moves:null,
    cashRegister:0
  }])

  const actualDate = getActualDate();
  const stringDate = `${actualDate.numberDate.day}-${months[actualDate.numberDate.month+1]}-${actualDate.numberDate.year}`;

  useEffect(()=>{
    const initialLoad = async() =>{
      const [moves,cashRegister] = await fetchManage(actualDate.numberDate.day,actualDate.numberDate.month+1,actualDate.numberDate.year);
      
      console.log(moves);
      if(!moves){
        return;
      }

      setManage([{
        moves,
        cashRegister
      }]);
      
      const [totalCashRegister,income,expenses] = calculateCash(cashRegister,moves);

      document.getElementById('cashRegister').value = formatMoney.format(totalCashRegister);
      document.getElementById('income').value = formatMoney.format(income);
      document.getElementById('expenses').value = formatMoney.format(expenses);
    }

    initialLoad();

  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
        <Menu/>
      <div className="bodyContent">
        <b className="mt-5">
          Fecha:
          <span> {stringDate}</span>
        </b>

        <form action="">
          <div className="form-group row mt-5">
            <label htmlFor="caja" className="col-1 col-form-label">
              <b>Caja</b>
            </label>
            <div className="col-4">
              <input
                type="text"
                id="cashRegister"
                name="cashRegister"
                className="form-control"
                disabled
              />
            </div>
          </div>

          <div className="form-group row mt-5">
            <label htmlFor="ingresos" className="col-1 col-form-label">
              <b>Ingresos</b>
            </label>
            <div className="col-4">
              <input
                type="text"
                id="income"
                name="income"
                className="form-control"
                disabled
              />
            </div>
          </div>

          <div className="form-group row mt-5">
            <label htmlFor="gastos" className="col-1 col-form-label">
              <b>Gastos</b>
            </label>
            <div className="col-4">
              <input
                type="text"
                name="expenses"
                id="expenses"
                className="form-control"
                disabled
              />
            </div>
          </div>
        </form>

        <div className="manageButtons">

          <Link to="/movimientos" className="w-25">
            <button id="btnSeeMoves" className="customBtn">
              Ver movimientos
            </button>
          </Link>

          <button id="btnGenerateReport" className="w-25 customBtn">
            Generar reporte
          </button>

        </div>
      </div>
    </>
  );
}
