import React, { useContext } from 'react';
import {InlineInput, SelectInput} from '../../components/individual/Inputs';
import { addProduct } from '../../helpers/apis';
import UtilitiesContext from '../../context/View/ViewContext';
import {querySuccess} from '../../helpers/alerts';

export default function ModalAdd({idModal,categorys}){

    const {reload,setReload} = useContext(UtilitiesContext);

    async function callAddProduct(){
        const result = await addProduct();
        if(result){
            querySuccess(`Producto agregado correctamente!`);
            document.getElementById('closeAddProduct').click();
            document.getElementById('addProductForm').reset();
            setReload(!reload);
        }
    }

    return(
        <div className="modal fade" id={idModal} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Agregar producto
                            <span className="d-none" id="queryAlertMove">

                            </span>
                        </h5>
                    </div>
                    <form id="addProductForm" className="modal-body">

                        <input type="hidden" id="editProductCode" />

                        <InlineInput
                            label="Descripcion"
                            type="text"
                            htmlFor="addProductName"
                            required={true}
                            placeholder = 'Obligatorio'
                            id='addProductName'
                        />

                        <InlineInput
                            label="Stock"
                            type="number"
                            htmlFor="addProductStock"
                            required={true}
                            placeholder = 'Obligatorio'
                            id='addProductStock'
                            css='mt-2'
                        />

                        <SelectInput
                            label='Categoria'
                            htmlFor='categorys'
                            id='categorys'
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
                            htmlFor="addProductPrice"
                            required={true}
                            placeholder = 'Obligatorio'
                            id='addProductPrice'
                            css='mt-2'
                        />

                        <InlineInput
                            label="Precio venta"
                            type="number"
                            htmlFor="addProductSell"
                            required={true}
                            placeholder = 'Obligatorio'
                            id='addProductSell'
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
                            onClick={()=>callAddProduct()}
                            className="w-25 customBtn">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}