export function calculateCash(cashRegister,moves){
    
    let income = 0;
    let expenses = 0;
    
    moves.map(move=>{
        { move.tipo === 0 ? income+=move.precio : expenses+=move.precio }
    });

    const totalEarning = cashRegister + (income-expenses);

    return [totalEarning,income,expenses];
}