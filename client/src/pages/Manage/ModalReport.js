import React, { useState } from "react";
import PDF from "./PDF";

export default function ModalReport({ idModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [typePdf, setTypePdf] = useState("none");

  const generateDailyReport = () => {
    setIsLoading(true);
    setTypePdf("diario");
    return <PDF typeReport="diario" />;
  };

  const generateMontlyReport = () => {
    setIsLoading(true);
    setTypePdf("mensual");
    return <PDF typeReport="mensual" />
  }

  const reset = () => {
    setIsLoading(false);
    setTypePdf("none");
  };

  const fileToGenerate = {
    none: <></>,
    diario: <PDF typeReport="diario" onFinish={reset} />,
    mensual: <PDF typeReport="mensual" onFinish={reset} />
  };

  return (
    <>
      {fileToGenerate[typePdf]}

      <div
        className="modal fade"
        id={idModal}
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Generar reporte
                <span className="d-none" id="queryAlertMove"></span>
              </h5>
            </div>

            {isLoading ? (
              <p>Generando PDF...</p>
            ) : (
              <>
                <div className="d-flex py-3">
                  <button
                    onClick={generateDailyReport}
                    className="customBtn w-50"
                  >
                    Diario
                  </button>

                  <button
                    onClick={generateMontlyReport}
                    className="customBtn w-50"
                  >
                    Mensual
                  </button>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="closeAddProduct"
                    className="w-25 cancelBtn"
                    data-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
