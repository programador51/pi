import React, { useState, useEffect, useContext } from "react";
import Menu from "../../components/general/Menu/Menu";
import Table from "../../components/general/Table/Table";
import { fetchInventory, getCategorys } from "../../helpers/apis";
import { setInputs } from "../../helpers/inventory";
import { showOptions } from "../../helpers/table";
import { deleteProduct } from "../../helpers/alerts";
import UtilitiesContext from "../../context/View/ViewContext";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import ModalAddCategory from "./ModalAddCategory";
import { getUser, validateRol } from "../../helpers/auth";
import ModalRequest from "./ModalRequest";
import Modal from "../../components/general/Modal/Modal";
import Log from "./Log/Log";

export default function Inventory() {
  document.title = `Inventario`;

  const { rol } = getUser();

  const { selectedRow, infoRow, reload } = useContext(UtilitiesContext);

  const [isFetching, setIsFetching] = useState(true);
  const [categorys, setCategorys] = useState([]);
  const [fetchedCategorys, setFetchedCategorys] = useState(false);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const initialLoad = async () => {
      setIsFetching(true);
      const fetchedInventory = await fetchInventory();
      setInventory(fetchedInventory);
      setIsFetching(false);
    };

    initialLoad();
  }, [reload]);

  useEffect(() => {
    const initialLoad = async () => {
      setFetchedCategorys(false);
      const fetchedCategorys = await getCategorys();
      setCategorys(fetchedCategorys);
      setFetchedCategorys(true);
    };
    validateRol();

    initialLoad();
  }, [reload]);

  return (
    <>
      <Menu />

      <div className="bodyContent">
        <div className="d-flex justify-content-start mb-3">
          {rol === 3 ? (
            <>
              <button
                data-toggle="modal"
                data-target="#modalAddCategory"
                className=" mr-3 customBtn w-25"
              >
                Agregar categoria
              </button>

              <button
                data-toggle="modal"
                data-target="#newProduct"
                className="customBtn w-25"
              >
                Agregar producto
              </button>

              <div className="px-3 w-25">
                <Modal
                  buttonText="Log mercancia solicitada"
                  title="Log mercancia solicitada"
                  close="Cerrar"
                >
                  <Log />
                </Modal>
              </div>
            </>
          ) : null}

          <ModalRequest />
        </div>

        {isFetching ? null : (
          <Table
            headers={[
              "Codigo",
              "Descripcion",
              "Categoria",
              "Stock",
              "Precio Compra",
              "Precio Venta",
            ]}
            dataFetched={inventory}
            idRow={"codigo"}
            idTable={"moves"}
            attributes={[
              "codigo",
              "descripcion",
              "nombre",
              "stock",
              "precioCompra",
              "precioVenta",
            ]}
            extraFunction={() => showOptions("optionsInventory")}
          />
        )}

        {fetchedCategorys ? (
          <ModalEdit idModal="modalEditProduct" categorys={categorys} />
        ) : null}

        {fetchedCategorys ? (
          <ModalAdd idModal="newProduct" categorys={categorys} />
        ) : null}

        <ModalAddCategory idModal="modalAddCategory" />

        {rol === 3 ? (
          <div className="d-none mt-3" id="optionsInventory">
            <button
              className="w-25 customBtn"
              onClick={() => {
                deleteProduct(
                  `Estas seguro de borrar el producto ${selectedRow}`,
                  selectedRow
                );
              }}
            >
              Eliminar
            </button>

            <button
              data-toggle="modal"
              onClick={() => setInputs(infoRow)}
              data-target="#modalEditProduct"
              className="w-25 ml-3 customBtn"
            >
              Editar
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
