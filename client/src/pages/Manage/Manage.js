import React, { useEffect, useState } from "react";
import Menu from '../../components/general/Menu/Menu';
import { getActualDate,months } from '../../helpers/dates';
import {fetchManage, GetManageStatics} from '../../helpers/apis';
import { Link } from 'react-router-dom';
import { calculateCash } from '../../helpers/manage';
import ModalReport from './ModalReport';
import { formatMoney } from '../../helpers/numbers';
import { validateRol } from '../../helpers/auth';

import { Text } from '../../atoms/Inputs/Text/Text';

import './Manage.scss';
import ContainerManage from "./Styles";

export default function Manage() {

  document.title = `Gestion`;

  const [isFetching , setIsFetching] = useState(true);

  const [cash,setCash] = useState({
    cashRegister:0,
    expenses:0,
    incomes:0,
    expensesMoves:[],
    incomesMoves:[],
    ticketAverage:null
  });

  const actualDate = getActualDate();
  const stringDate = `${actualDate.numberDate.day}-${months[actualDate.numberDate.month+1]}-${actualDate.numberDate.year}`;

  useEffect(()=>{
    const initialLoad = async() =>{
      const [moves,cashRegister] = await fetchManage(actualDate.numberDate.day,actualDate.numberDate.month+1,actualDate.numberDate.year);
      
      const apiStatics = await GetManageStatics();

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
        movesExpenses,
        ticketAverage:apiStatics.ticketAverage
      });

      document.getElementById('cashRegister').value = formatMoney.format(totalCashRegister);
      document.getElementById('income').value = formatMoney.format(income);
      document.getElementById('expenses').value = formatMoney.format(expenses);

      setIsFetching(false);
    }
    validateRol();

    initialLoad();

  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
        <Menu/>
      <ContainerManage>
        <div>
        <b className="mt-5">
          Fecha:
          <span> {stringDate}</span>
        </b>

        <form action="">
          <div className="form-group row mt-5">
            <label htmlFor="caja" className="col-2 col-form-label">
              <b>Caja</b>
            </label>
            <div className="col-4">
              <Text
                id = 'cashRegister'
                name = 'cashRegister'
                placeholder = 'No editable'
                readOnly = {true}
              />
            </div>
          </div>

          <div className="form-group row mt-5">
            <label htmlFor="ingresos" className="col-2 col-form-label">
              <b>Ingresos</b>
            </label>
            <div className="col-4">
              <Text
                id = 'income'
                name = 'income'
                placeholder = 'No editable'
                readOnly = {true}
              />
            </div>
          </div>

          <div className="form-group row mt-5">
            <label htmlFor="gastos" className="col-2 col-form-label">
              <b>Gastos</b>
            </label>
            <div className="col-4">
              <Text
                id = 'expenses'
                name = 'expenses'
                placeholder = 'No editable'
                readOnly = {true}
              />
            </div>
          </div>

          <div className="form-group row mt-5">
            <label htmlFor="averageTicket" className="col-2 col-form-label">
              <b>Ticket promedio</b>
            </label>
            <div className="col-4">
              <Text
                id = 'averageTicket'
                name = 'averageTicket'
                placeholder = 'No editable'
                defaultValue = {cash.ticketAverage?.formated}
                readOnly = {true}
              />
            </div>
          </div>

          <div className="form-group row mt-5">
            <label htmlFor="rotationInventory" className="col-2 col-form-label">
              <b>Rotacion inventario</b>
            </label>
            <div className="col-4">
              <Text
                id = 'rotationInventory'
                name = 'rotationInventory'
                placeholder = 'No editable'
                readOnly = {true}
              />
            </div>
          </div>

          <div className="form-group row mt-5">
            <label htmlFor="suministerDays" className="col-2 col-form-label">
              <b>Dias de suministro</b>
            </label>
            <div className="col-4">
              <Text
                id = 'suministerDays'
                name = 'suministerDays'
                placeholder = 'No editable'
                readOnly = {true}
              />
            </div>
          </div>

          <div className="form-group row mt-5">
            <label htmlFor="suministerWeek" className="col-2 col-form-label">
              <b>Semana de suministro</b>
            </label>
            <div className="col-4">
              <Text
                id = 'suministerWeek'
                name = 'suministerWeek'
                placeholder = 'No editable'
                readOnly = {true}
              />
            </div>
          </div>
        </form>
        </div>
      
        

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
      </ContainerManage>
    </>
  );
}
