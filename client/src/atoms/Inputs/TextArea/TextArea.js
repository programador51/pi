import React, { useEffect } from 'react';

export default function TextArea({
    forwardRef = () => {},
    id = null,
    name = null,
    placeholder = 'Escribe aqui',
    readOnly = false,
    defValue = null
}){

    useEffect(() => {
        if (defValue === null) return;
    
        const htmlElement = document.getElementById(id);
    
        if (htmlElement === null || htmlElement === undefined) return;
    
        htmlElement.value = defValue;
      }, [defValue]);

    return(
        <textarea 
            id = { id } 
            readOnly = {readOnly}
            name = { name }
            placeholder = {placeholder}
            {...forwardRef(name)}
        >
        </textarea>
    )
}