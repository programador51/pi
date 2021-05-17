import React, { useContext } from 'react';
import {InlineInput} from '../../components/individual/Inputs';
import {editRefaction} from '../../helpers/apis';
import UtilitiesContext from '../../context/View/ViewContext';

export default function ModalEdit({idModal}){

    const { reload,setReload,selectedRow } = useContext(UtilitiesContext);

    const triggerEdit = async() => {
        const result = await editRefaction(selectedRow);
        document.getElementById('closeEditRefaction').click();
        
        if(result){
            setReload(!reload);
        }
    }

    return(
        <div className="modal fade" id={idModal} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Editar refaccion
                            <span className="d-none" id="queryAlertMove">

                            </span>
                        </h5>
                    </div>
                    <form id="editRefactionForm" className="modal-body">

                    <InlineInput
                        label="Cantidad"
                        type="number"
                        htmlFor="editQuantity"
                        required={true}
                        placeholder = 'Obligatorio'
                        id='editQuantity'
                        css='mt-2'
                    />

                    <InlineInput
                        label="Refaccion"
                        type="text"
                        htmlFor="editRefaction"
                        required={true}
                        placeholder = 'Obligatorio'
                        id='editRefaction'
                        css='mt-2'
                    />

                    <InlineInput
                        label="Marca"
                        type="text"
                        htmlFor="editFabricant"
                        required={true}
                        placeholder = 'Obligatorio'
                        id='editFabricant'
                        css='mt-2'
                    />

                    <InlineInput
                        label="Modelo"
                        type="text"
                        htmlFor="editModel"
                        required={true}
                        placeholder = 'Obligatorio'
                        id='editModel'
                        css='mt-2'
                    />

                    </form>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            id="closeEditRefaction"
                            className="w-25 cancelBtn" 
                            data-dismiss="modal">
                                Cerrar
                        </button>

                        <button 
                            type="button" 
                            onClick={()=>triggerEdit()}
                            className="w-25 customBtn">
                            Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}