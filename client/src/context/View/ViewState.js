import { useReducer } from 'react';
import ViewContext from './ViewContext';
import ViewReducer from './ViewReducer';

import { SET_VIEW,SET_RELOAD_DATA,SET_SELECTED_ROW } from '../../types/index';

const ViewState = (props) => {
    const initialState = {
        view:'default',
        reload:false,
        selectedRow:0,
        infoRow:{}
    }

    const [state,dispatch] = useReducer(ViewReducer,initialState);

    const setView = screen => {
        dispatch({
            type:SET_VIEW,
            payload:screen
        })
    }

    const setReload = boolean => {
        dispatch({
            type:SET_RELOAD_DATA,
            payload:boolean
        })
    }

    const setSelectedRow = data =>{
        dispatch({
            type:SET_SELECTED_ROW,
            payload:data
        })
    }

    const values = {
        view:state.view,
        reload:state.reload,
        selectedRow:state.selectedRow,
        infoRow:state.infoRow,
        setView,
        setReload,
        setSelectedRow
    }
    
    return(
        <ViewContext.Provider value={values}>
            {props.children}
        </ViewContext.Provider>
    )
}

export default ViewState;