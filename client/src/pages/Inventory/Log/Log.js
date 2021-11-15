import { DefaultTable } from 'js-smart-table/dist/pagination';
import React, { useEffect } from 'react';
import { GetLogManage } from '../../../helpers/apis';

import { configLogTable } from './SchemaTable';

export default function Log() {

    let Table;

    useEffect(() => {

        (async function () {

            const { pages, actualPage, commodity } = await GetLogManage(1, "DESC", "na", '');

            configLogTable.pages = pages;
            configLogTable.actualPage = actualPage;
            configLogTable.rows = commodity;

            Table = new DefaultTable(configLogTable);

            Table.printTable();
            Table.printPagination();

        })()
    }, []);

    return (
        <div className="customTable">
            <div className="containerTable">
                <table id="log-commodity"></table>
            </div>
            <div id="pagination-commodity" className="default-pagination"></div>
        </div>
    )
}
