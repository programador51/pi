import React, { useEffect, useState } from "react";
import { dailyReport, monthlyReport } from "../../helpers/manage";
import { formatMoney } from "../../helpers/numbers";
import "./PDF.scss";
import { jsPDF } from "jspdf";
import mimes from "./pdfMimes";

export default function PDF({ typeReport = "diario", onFinish = () => {} }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    (async function () {
      let apiInfo;

      if (typeReport === "diario") {
        apiInfo = await dailyReport();
        setInfo(apiInfo);
      } else {
        apiInfo = await monthlyReport();
        setInfo(apiInfo);
      }
    })();
  }, []);

  useEffect(() => {
    if (info === null) {
      return;
    }

    const pdfReport = new jsPDF({
      format: "a4",
      unit: "px",
      hotfixes: ["px_scaling"],
    });

    const documentA4 = document.getElementById("pdfTarget");

    const actualDate = new Date();
    const fileName = `${actualDate.getUTCDate()}_${
      actualDate.getUTCMonth() + 1
    }_${actualDate.getUTCFullYear()}`;

    pdfReport.html(documentA4, {
      callback: (doc) => {
        doc.save(`${typeReport}_${fileName}`);
        onFinish();
      },
    });
  }, [info]);

  const isExpenses = () =>
    info.expenses.length === 0 ? "(No hay egresos)" : "";
  const isIncomings = () =>
    info.incomings.length === 0 && info.tickets.length === 0
      ? "(No hay ingresos)"
      : "";
  const isTickets = () =>
    info.tickets.length === 0 ? "(No hay tickets reparados)" : "";

  return (
    <div id="pdfTarget">
      <div className="a4">
        {info !== null ? (
          <>
            <header>
              <div className="logoContainer">
                <img
                  className="logo"
                  src={mimes.logoEnterprise}
                  alt="logoEnterprise"
                />
              </div>

              <div className="adress">
                <p className="typeReport">Reporte {typeReport}</p>
                <p>Hector victoria #839</p>
                <p>Col. Los Naranjos</p>
              </div>
            </header>
            <div class="sellElement">
              <p className="header incoming">Ingresos {isIncomings()}</p>
              <div className="details">
                <p>No. mov.</p>
                <p>Dia mov.</p>
                <p>Precio</p>
                <p>Concepto</p>
                {info.incomings.map((incoming) => (
                  <>
                    <p>{incoming.idMovement}</p>
                    <p>{incoming.date}</p>
                    <p>{formatMoney.format(incoming.price)}</p>
                    <p>{incoming.description}</p>
                  </>
                ))}
              </div>
            </div>
            <div class="sellElement">
              <p className="header expense">Egresos {isExpenses()}</p>
              <div className="details">
                <p>No. mov.</p>
                <p>Dia mov.</p>
                <p>Precio</p>
                <p>Concepto</p>
                {info.expenses.map((expense) => (
                  <>
                    <p>{expense.idMovement}</p>
                    <p>{expense.date}</p>
                    <p>{formatMoney.format(expense.price)}</p>
                    <p>{expense.description}</p>
                  </>
                ))}
              </div>
            </div>
            <div class="sellElement">
              <p className="header incoming">Tickets {isTickets()}</p>
              <div className="details">
                <p>No. mov.</p>
                <p>Dia mov.</p>
                <p>Precio</p>
                <p>Concepto</p>
                {info.tickets.map((ticket) => (
                  <>
                    <p>{ticket.idMovement}</p>
                    <p>{ticket.date}</p>
                    <p>{formatMoney.format(ticket.price)}</p>
                    <p>{ticket.description}</p>
                  </>
                ))}
              </div>
            </div>
            <div>
              <p>
                <b>Ingresos: </b>
                {formatMoney.format(info.total.incoming)}
              </p>

              <p>
                <b>Egresos: </b>
                {formatMoney.format(info.total.expenses)}
              </p>

              {typeReport === "diario" ? (
                <>
                  <p>
                    <b>Ticket promedio: </b>
                    {info.total.averageTicket}
                  </p>
                </>
              ) : (
                <p>
                  <b>Semana de suministro: </b>
                  {info.total.suministerWeek}
                </p>
              )}

              <p>
                <b>Ticket: </b>
                {formatMoney.format(info.total.ticketPrice)}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
