import React, { useContext } from 'react';
import {InlineInput, SelectInput} from '../../individual/Inputs';
import { addMove } from '../../../helpers/apis';
import UtilitiesContext from '../../../context/View/ViewContext';

export default function ModalAddMove({idModal}) {

    const {reload,setReload} = useContext(UtilitiesContext);

    const options = [
        {id:1,value:1,text:'Egreso'},
        {id:0,value:0,text:'Ingreso'}
    ];

    const saveMove = async() => {
        const refresh = await addMove();
        if(refresh===true){
            setReload(!reload);
        }
    }

    return (
        <div className="modal fade" id={idModal} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Agregar movimiento
                            <span className="d-none" id="queryAlertMove">

                            </span>
                        </h5>
                    </div>
                    <form id="addMoveForm" className="modal-body">
                        <InlineInput
                            label="Cantidad"
                            type="number"
                            htmlFor="quantity"
                            required={true}
                            placeholder = 'Obligatorio'
                            id='quantity'
                        />

                        <SelectInput
                            label='Tipo'
                            htmlFor='typeMove'
                            id='typeMove'
                            options={options}
                            css='mt-3'
                            attributes = {
                                {
                                    text:"text",
                                    value:'value'
                                }
                            }
                        />

                        <InlineInput
                            label="Concepto"
                            type="text"
                            htmlFor="concept"
                            required={true}
                            placeholder = 'Obligatorio'
                            css='mt-3'
                            id='concept'
                        />

                    </form>
                    <div className="modal-footer">
                        <button type="button" className="w-25 cancelBtn" data-dismiss="modal">Cerrar</button>
                        <button 
                            type="button" 
                            onClick={()=>saveMove()}
                            className="w-25 customBtn">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}