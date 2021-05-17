import React from 'react';
import {InlineInput, SelectInput} from '../../components/individual/Inputs';

export default function ModalAdd({idModal}){
    return(
        <div className="modal fade" id={idModal} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Agregar refaccion
                            <span className="d-none" id="queryAlertMove">

                            </span>
                        </h5>
                    </div>
                    <form id="addProductForm" className="modal-body">

                    <InlineInput
                        label="Cantidad"
                        type="number"
                        htmlFor="quantity"
                        required={true}
                        placeholder = 'Obligatorio'
                        id='quantity'
                        css='mt-2'
                    />

                    <InlineInput
                        label="Refaccion"
                        type="text"
                        htmlFor="refaction"
                        required={true}
                        placeholder = 'Obligatorio'
                        id='quantity'
                        css='mt-2'
                    />

                    <InlineInput
                        label="Marca"
                        type="text"
                        htmlFor="fabricant"
                        required={true}
                        placeholder = 'Obligatorio'
                        id='fabricant'
                        css='mt-2'
                    />

                    <InlineInput
                        label="Modelo"
                        type="text"
                        htmlFor="model"
                        required={true}
                        placeholder = 'Obligatorio'
                        id='model'
                        css='mt-2'
                    />

                    </form>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            id="closeAddProduct"
                            className="w-25 cancelBtn" 
                            data-dismiss="modal">
                                Cerrar
                        </button>

                        <button 
                            type="button" 
                            className="w-25 customBtn">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}