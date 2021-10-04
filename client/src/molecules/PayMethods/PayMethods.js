import React, { useEffect, useState } from 'react';
import Radio from '../../atoms/Inputs/Radio/Radio';
import { GetPayMethods } from '../../helpers/apis';

export default function PayMethods({
    forwardRef = () => {},
    id = 'payMethods',
    name = 'payMethods',
    errors = {},
    defValue = null,
    disabled = false
}){

    const [payMethods,setPayMethods] = useState([]);

    useEffect(()=>{
        (async function(){
            const apiPayMethods = await GetPayMethods();
            setPayMethods(apiPayMethods);
        })();
    },[]);

    return(
        <>
            <Radio
                forwardRef = {forwardRef}
                errors = {errors}
                label = 'description'
                value = 'id'
                name = {name}
                options = {payMethods}
                selected = {defValue}
                disabled = {disabled}
            />
        </>
    )
}