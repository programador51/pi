import React, { useEffect, useState } from "react";

function Modal({
  children,
  title = "[Insert a title here]",
  close = "Cerrar",
  accpet = null,
  buttonText = "Abrir modal",
  cbAccept = () => {},
  cbReject = () => {},
  cbForm = () => false,
  idCloseModal = "closeModal",
  idAccetModal = "acceptModal",
  idFooter = "footerModal",
  showSpinner = false,
  submit = null,
  idForm = null,
  textSpinner = "Cargando...",
}) {
  /**
   * True if the modal must be show on the screen
   * @type {[boolean,Function]}
   */
  const [show, setShow] = useState(false);
  const [stateShowSpinner, stateSetShowSpiner] = useState(showSpinner);

  useEffect(() => {
    stateSetShowSpiner(showSpinner);
  }, [showSpinner]);

  const acceptModal = async () => {
    await cbAccept();
    setShow(false);
  };

  const closeModal = async () => {
    await cbReject();
    setShow(false);
  };

  const openModal = () => {
    setShow(true);
  };

  const formModal = async() => {
    const shouldClose = await cbForm();
    if(shouldClose) setShow(false);
  }

  return (
    <>


      <button id="openModal" onClick = {openModal} className="customBtn">
            {buttonText}
      </button>

      {show === true ? (
        <>
          <div
            className="modal fade show d-block  "
            id="staticBackdrop"
            data-backdrop="static"
            data-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    {title}
                  </h5>
                </div>
                <div className="modal-body">{children}</div>

                <div className="modal-footer" id={idFooter}>
                  {stateShowSpinner === true ? (
                    <p>Cargando...</p>
                  ) : (
                    <>  

                        <button 
                        id = {idCloseModal}
                        className="cancelBtn w-25 mr-3"
                        onClick = { closeModal }>
                            {close}
                        </button>

                      {accpet === null ? null : (

                        <button 
                          className="customBtn w-25" 
                          id = {idAccetModal} 
                          onClick = {acceptModal}>
                            {accpet}
                        </button>

                      )}

                      {submit === null ? null :
                      <>
                      
                      <input 
                        onClick = {formModal}
                        type="submit" className="customBtn w-25" 
                        value ={submit}
                        form = {idForm}
                      />
                      
                      </>
                      
                      }
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      ) : null}
    </>
  );
}

Modal.propTypes = {};

export default Modal;