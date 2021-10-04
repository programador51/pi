import React, { useEffect } from 'react';

export default function NativeDate({
    forwardRef = () => {},
    errors = {},
    id = null,
    name = null,
    defValue = null,
    disabled = false
}){

    useEffect(()=>{
        if(defValue!==null){
            document.getElementById(id).value = defValue;
        }
    },[defValue]);

    return(
        <>
        <input 
            disabled = {disabled}
            type="date" 
            id = {id}
            name = {name}
            {...forwardRef(name)}
        />
        <p className="text-danger">{errors[name]?.['message']}</p>
        </>
    )
}