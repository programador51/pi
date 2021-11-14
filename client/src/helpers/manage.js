import { URL_API } from "../config";

export function calculateCash(cashRegister, moves) {

    let income = 0;
    let expenses = 0;

    moves.map(move => {
        { move.tipo === 0 ? income += move.precio : expenses += move.precio }
    });

    const totalEarning = cashRegister + (income - expenses);

    return [totalEarning, income, expenses];
}

export function prepareReport(moves) {
    let listIncomes = [];
    let listExpenses = [];
    let income = 0;
    let expenses = 0;

    moves.map(move => {

        if (move.tipo === 0) {
            income += move.precio;
            listIncomes.push(move);
        } else {
            expenses += move.precio;
            listExpenses.push(move);
        }

    });

    const utilities = income - expenses;

    return {
        income,
        expenses,
        listIncomes,
        listExpenses,
        utilities
    }
}

export async function dailyReport() {
    try {
        const reportApi = await fetch(`${URL_API}inventario/reporte/diario`);

        const report = await reportApi.json();

        return report;

    } catch (error) {

    }
}

export async function monthlyReport() {
    try {
        const reportApi = await fetch(`${URL_API}inventario/reporte/mensual`);

        const report = await reportApi.json();
        console.log(report);

        return report;
    } catch (error) {

    }
}