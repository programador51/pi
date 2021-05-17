import { SET_RELOAD_DATA, SET_VIEW,SET_SELECTED_ROW } from '../../types/index';

export default function(state,action){
    switch(action.type){
        case SET_VIEW:
            return{
                ...state,
                view:action.payload
            }

        case SET_RELOAD_DATA : 
            return{
                ...state,
                reload:action.payload
        }

        case SET_SELECTED_ROW:
            console.log(action.payload);
            return{
                ...state,
                selectedRow:action.payload[0],
                infoRow:action.payload.[1]
            }

        default:
        break;
    }
} 