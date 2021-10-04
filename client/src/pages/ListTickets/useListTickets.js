import { GetTickets } from "../../helpers/apis";

export default function useListTickets(){
    async function FetchTickets(page = 1,order = 'DESC',columnOrdering = 'na',aditionalQuery){

        let idUser = document.getElementById('idUser');

        if(idUser===null || idUser === undefined){
            const session = JSON.parse(localStorage.getItem('userInfo'));
            idUser = session.id;
        }else{
            idUser = idUser.value;
        }

        const apiTickets = await GetTickets(page,order,columnOrdering,`&idTecnico=${idUser}`);
        return apiTickets;
    }

    return {
        FetchTickets
    }
}