export function calculateCash(cashRegister,moves){
    
    let income = 0;
    let expenses = 0;
    
    moves.map(move=>{
        { move.tipo === 0 ? income+=move.precio : expenses+=move.precio }
    });

    const totalEarning = cashRegister + (income-expenses);

    return [totalEarning,income,expenses];
}

export function prepareReport(moves){
    let listIncomes = [];
    let listExpenses = [];
    let income = 0;
    let expenses = 0;

    moves.map(move=>{

        if(move.tipo === 0 ){
            income+=move.precio;
            listIncomes.push(move);
        }else{
            expenses+=move.precio;
            listExpenses.push(move);
        }

    });

    return {
        income,
        expenses,
        listIncomes,
        listExpenses
    }
}