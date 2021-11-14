import React, { useEffect, useState } from "react";
import Menu from "../../components/general/Menu/Menu";
import { DefaultTable } from "js-smart-table/dist/pagination";
import { configTicketsTable } from "./SchemaTable";
import { GetTickets } from "../../helpers/apis";

import ContainerTable from "./Styles";
import { SelectUsers } from "../../molecules/Users/Users";
import { Link } from "react-router-dom";
import useListTickets from './useListTickets';
import { getUser } from '../../helpers/auth'

export default function ListTickets() {
  let Tickets;

  const { FetchTickets } = useListTickets();

  const { rol, id: userId } = getUser();

  const [filterUser, setFilterUser] = useState(userId);

  const [row, setRow] = useState(null);

  useEffect(() => {
    (async function () {
      const apiTickets = await GetTickets(1, "DESC", "na", `&idTecnico=${filterUser}`);

      configTicketsTable.pages = apiTickets.pages;
      configTicketsTable.actualPage = apiTickets.actualPage;
      configTicketsTable.rows = apiTickets.tickets;
      configTicketsTable.paginationFn = async (page, order, columnOrdering, aditionalQuery) => {
        const data = await FetchTickets(page, order, columnOrdering, filterUser);
        setRow(null);
        return data;
      }

      configTicketsTable.cbSelection = () => {
        setRow(Tickets.infoRow);
      };

      Tickets = new DefaultTable(configTicketsTable);

      Tickets.printTable();
      Tickets.printPagination();
    })();
  }, [filterUser]);

  return (
    <>
      <Menu
        linkRefactions='../refacciones'
        linkInventory='../inventario'
        linkAddTickets='../tickets'
        linkTickets='../tickets/ver'
        linkManage='../gestion'
      />

      <ContainerTable>
        <header>
          <h2>Tickets</h2>
        </header>

        {rol === 3 ? <div className="filter">
          <>

            <SelectUsers
              defValue={userId}
              onChange={userId => setFilterUser(userId)}
            />
          </>
        </div> : null}


        <div className="customTable">
          <div className="containerTable">
            <table id="tickets"></table>
          </div>
          <div id="pagination-tickets" className="default-pagination"></div>
        </div>

        {row !== null ? (
          <div className="edit">
            <Link to={`./ver/${row.id}`}>
              <button className=" px-4 customBtn">
                {row.reparation.id === 2 ? 'Ver' : 'Ver/Editar'}
              </button>
            </Link>
          </div>
        ) : null}
      </ContainerTable>
    </>
  );
}
