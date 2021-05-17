import React, { useContext } from 'react';
import {InlineInput, SelectInput} from '../../components/individual/Inputs';
import { addCategory } from '../../helpers/apis';
import UtilitiesContext from '../../context/View/ViewContext';
import {querySuccess} from '../../helpers/alerts';

export default function ModalAddCategory({idModal,categorys}){

    const {reload,setReload} = useContext(UtilitiesContext);

    async function confirmAddCategory(){
        const resultAdd = await addCategory();
        if(resultAdd){
            document.getElementById('closeAddProduct').click();
            querySuccess(`Producto actualizado correctamente!`);
            document.getElementById('addCategoryForm').reset();
            setReload(!reload);
        }
    }

    return(
        <div className="modal fade" id={idModal} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Agregar categoria
                            <span className="d-none" id="queryAlertMove">

                            </span>
                        </h5>
                    </div>
                    <form id="addCategoryForm" className="modal-body">
                        <InlineInput
                            label="Categoria"
                            type="text"
                            htmlFor="addCategory"
                            required={true}
                            placeholder = 'Obligatorio'
                            id='addCategory'
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
                            onClick={()=>confirmAddCategory()}
                            className="w-25 customBtn">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}