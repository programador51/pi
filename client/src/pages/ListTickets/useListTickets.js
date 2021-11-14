import { GetTickets } from "../../helpers/apis";

export default function useListTickets() {
    async function FetchTickets(page = 1, order = 'DESC', columnOrdering = 'na', idUser) {
        const apiTickets = await GetTickets(page, order, columnOrdering, `&idTecnico=${idUser}`);
        return apiTickets;
    }

    return {
        FetchTickets
    }
}