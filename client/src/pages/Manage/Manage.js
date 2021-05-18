import React, { useEffect, useState } from "react";
import Menu from '../../components/general/Menu/Menu';
import { getActualDate,months } from '../../helpers/dates';
import {fetchManage} from '../../helpers/apis';
import { Link } from 'react-router-dom';
import { calculateCash } from '../../helpers/manage';
import ModalReport from './ModalReport';
import { formatMoney } from '../../helpers/numbers';
import './Manage.scss';

export default function Manage() {

  document.title = `Gestion`;

  const [isFetching , setIsFetching] = useState(true);

  const [cash,setCash] = useState({
    cashRegister:0,
    expenses:0,
    incomes:0,
    expensesMoves:[],
    incomesMoves:[]
  });

  const actualDate = getActualDate();
  const stringDate = `${actualDate.numberDate.day}-${months[actualDate.numberDate.month+1]}-${actualDate.numberDate.year}`;

  useEffect(()=>{
    const initialLoad = async() =>{
      const [moves,cashRegister] = await fetchManage(actualDate.numberDate.day,actualDate.numberDate.month+1,actualDate.numberDate.year);
      
      let movesIncomes = [];
      let movesExpenses = [];

      console.log(moves);
      if(!moves){
        return;
      }

      moves.map(move=>{
        {move.tipo === 1 ? movesIncomes.push(move) : movesExpenses.push(move)}
      })
      
      const [totalCashRegister,income,expenses] = calculateCash(cashRegister,moves);

      setCash({
        cashRegister:totalCashRegister,
        expenses:expenses,
        incomes:income,
        movesIncomes,
        movesExpenses
      });

      document.getElementById('cashRegister').value = formatMoney.format(totalCashRegister);
      document.getElementById('income').value = formatMoney.format(income);
      document.getElementById('expenses').value = formatMoney.format(expenses);

      setIsFetching(false);
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

        {isFetching ? null : <ModalReport dataManage={cash} idModal='modalSelectReport'/> }

        <div className="manageButtons">

          <Link to="/movimientos" className="w-25">
            <button id="btnSeeMoves" className="customBtn">
              Ver movimientos
            </button>
          </Link>

          <button 
            data-toggle="modal" 
            data-target="#modalSelectReport"
            id="btnGenerateReport" 
            className="w-25 customBtn">
            Generar reporte
          </button>

        </div>
      </div>
    </>
  );
}
