import React from 'react';
import { jsPDF } from "jspdf";
import {months} from '../../helpers/dates';
import {formatMoney} from '../../helpers/numbers'; 
import {dayly,month} from './Images';
import {getMovesMonth} from '../../helpers/apis';

export default function ModalReport({ idModal, dataManage }) {

    const triggerGenerate = async()=>{
        fillTable()
    }

    const file = new jsPDF('0.1','pt','a4');

    const expensesHeader = `<tr><th colspan="4" class="text-center                  text-danger">Egresos</th></tr>`;

    const incomesHeader = `<tr><th colspan="4" class="text-center                  text-success">Ingresos</th></tr>`

    const headerIncomes = `
    <tr>
        <th class="text-center">ID Movimiento</th>
        <th class="text-center">Dia Movimiento</th>
        <th class="text-center">Precio</th>
        <th class="text-center">Concepto</th>
    </tr>`;

    let bodyIncomes = ``;
    let bodyExponses = ``;

    dataManage.movesIncomes.map(move => {
        bodyIncomes+=`<tr>
            <td class="text-center">${move.idMovimiento}</td>
            <td class="text-center">${move.diaMovimiento}-${months[move.mesMovimiento]}-${move.yearMovimiento}</td>
            <td class="text-center">${formatMoney.format(move.precio)}</td>
            <td class="text-center">${move.nombre}</td>
        </tr>`
    });

    dataManage.movesExpenses.map(move=>{
        bodyExponses+=`<tr>
            <td class="text-center">${move.idMovimiento}</td>
            <td class="text-center">${move.diaMovimiento}-${months[move.mesMovimiento]}-${move.yearMovimiento}</td>
            <td class="text-center">${formatMoney.format(move.precio)}</td>
            <td class="text-center">${move.nombre}</td>
        </tr>`
    })

    function genReport() {
        file.setFontSize(14);
        file.addImage(dayly, 'PNG', 100, 0, 0, 0);
        file.html(`
        <table style="width:500px;font-size:10px;">
            ${expensesHeader}
            ${headerIncomes}${bodyIncomes}
        </table>
        
        <br><br>

        <table style="width:500px;font-size:10px;">
            ${incomesHeader}
            ${headerIncomes}${bodyExponses}
        </table>

        `, {
            callback: (file) => {
                file.save();
            },
            x: 50,
            y: 150
        })
    }

    let tableIncomes = ``;
    let tableExpenses = ``;

    let dataIncomes = [];


    function fillTable(incomes,exponses){
        tableIncomes = ``;
        tableExpenses = ``;

        incomes.map(incomes=>{

        })
    }

    function generateReport(){

    }

    return (
        <div className="modal fade" id={idModal} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Generar reporte
                            <span className="d-none" id="queryAlertMove">

                            </span>
                        </h5>
                    </div>

                    <div className="my-4 d-flex justify-content-center align-items-center">
                        <p
                            onClick={() => genReport('diary')}
                            className="cardReport">Diario</p>

                        <p 
                            onClick={()=>triggerGenerate()}
                            className="cardReport">Mensual</p>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            id="closeAddProduct"
                            className="w-25 cancelBtn"
                            data-dismiss="modal">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}