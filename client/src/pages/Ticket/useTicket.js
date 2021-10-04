import { querySuccess } from "../../helpers/alerts";
import { UpdateTicket } from "../../helpers/apis"
import { useHistory } from "react-router-dom";

export default function useTicket(){

    const history = useHistory();

    async function updateTicket(data){

        // console.log(data);

        const wasUpdate = await UpdateTicket(data);
        if(wasUpdate){
            querySuccess('Ticket actualizado',()=>{
                history.push('/tickets/ver');
            });
        }
    }

    return{
        updateTicket
    }
}