import { querySuccess } from "../../helpers/alerts";
import { AddTicket } from "../../helpers/apis";
import { useHistory } from "react-router-dom";

export default function useTickets(){

    const history = useHistory();

    async function saveOnDb(data){
        
        parseDates();
        parseName();

        const wasAdded = await AddTicket(data);

        if(wasAdded){
            querySuccess('Ticket agregado',()=>history.push('/gestion'));
        }
                
        function parseDates(){
            const received = new Date(data.receptionDate);
            const receivedDay = received.getDate();
            const receivedMonth = received.getMonth()+1;
            const receivedYear = received.getFullYear();
    
            const deliver = new Date(data.deliverDate);
            const deliverDay = deliver.getDate();
            const deliverMonth = deliver.getMonth()+1;
            const deliverYear = deliver.getFullYear();

            data = {
                ...data,
                receivedDay,
                receivedMonth,
                receivedYear,
                deliverDay,
                deliverMonth,
                deliverYear
            }
        }

        function parseName(){
            data = {
                ...data,
                customerFullName:`${data.customerName} ${data.customerMiddleName} ${data.customerPattern} ${data.customerMother}`
            };
        }

    }

    return {
        saveOnDb
    }
}