import React, { useContext } from 'react';
import {InlineInput, SelectInput} from '../../components/individual/Inputs';
import { updateProduct } from '../../helpers/apis';
import UtilitiesContext from '../../context/View/ViewContext';
import {querySuccess} from '../../helpers/alerts';

export default function ModalEdit({idModal,categorys}){

    const {infoRow,reload,setReload} = useContext(UtilitiesContext);

    async function confirmEditButton(){
        const resultUpdate = await updateProduct(infoRow);
        if(resultUpdate){
            querySuccess(`Producto actualizado correctamente!`);
            document.getElementById('closeEditProduct').click();
            setReload(!reload);
        }
    }

    return(
        <div className="modal fade" id={idModal} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Editar producto
                            <span className="d-none" id="queryAlertMove">

                            </span>
                        </h5>
                    </div>
                    <form id="editProduct" className="modal-body">

                        <input type="hidden" id="editProductCode" />

                        <InlineInput
                            label="Descripcion"
                            type="text"
                            htmlFor="editProductDescription"
                            required={true}
                            placeholder = 'Obligatorio'
                            id='editProductDescription'
                        />

                        <InlineInput
                            label="Stock"
                            type="number"
                            htmlFor="editProductStock"
                            required={true}
                            placeholder = 'Obligatorio'
                            id='editProductStock'
                            css='mt-2'
                        />

                        <SelectInput
                            label='Categoria'
                            htmlFor='editCategory'
                            id='editCategory'
                            options={categorys}
                            css='mt-2'
                            attributes = {
                                {
                                    text:"nombre",
                                    value:'idCategoria'
                                }
                            }
                        />

                        <InlineInput
                            label="Precio compra"
                            type="number"
                            htmlFor="editProductPrice"
                            required={true}
                            placeholder = 'Obligatorio'
                            id='editProductPrice'
                            css='mt-2'
                        />

                        <InlineInput
                            label="Precio venta"
                            type="number"
                            htmlFor="editProductSell"
                            required={true}
                            placeholder = 'Obligatorio'
                            id='editProductSell'
                            css='mt-2'
                        />
                    </form>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            id="closeEditProduct"
                            className="w-25 cancelBtn" 
                            data-dismiss="modal">
                                Cerrar
                        </button>

                        <button 
                            type="button" 
                            onClick={()=>confirmEditButton()}
                            className="w-25 customBtn">
                            Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}