import React, { useEffect } from 'react';

export default function Number({
    id = null,
    name = null,
    placeholder = 'Escribe aqui',
    forwardRef = () => {},
    errors = {},
    defValue = null,
    readOnly = false
}){

    useEffect(() => {
        if (defValue === null) return;
    
        const htmlElement = document.getElementById(id);
    
        if (htmlElement === null || htmlElement === undefined) return;
    
        htmlElement.value = defValue;
      }, [defValue]);

    return(
        <div>
            <input readOnly = {readOnly} {...forwardRef(name)} type="number" id={id} name={name} placeholder = {placeholder}/>
            <p className="text-danger">{errors?.[name]?.['message']}</p>
        </div>
    )
}