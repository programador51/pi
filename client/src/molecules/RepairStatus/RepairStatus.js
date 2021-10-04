import React, { useEffect, useState } from 'react';
import Selection from '../../atoms/Inputs/Select/Select';
import { GetRepairStatus } from '../../helpers/apis';

export default function RepairStatus({
    id = 'repairStatus',
    name = 'repairStatus',
    forwardRef = () => {},
    errors = {},
    defValue = null,
    disabled = false
}){

    const [status,setStatus] = useState([]);

    useEffect(()=>{
        (async function(){
            const apiRepairStatus = await GetRepairStatus();
            console.log(apiRepairStatus);
            setStatus(apiRepairStatus);
        })();
    },[]);

    return(
        <Selection
            options = {status}
            forwardRef = {forwardRef}
            label = 'description'
            value = 'id'
            id = {id}
            name = {name}
            errors = {errors}
            defaultValue = {defValue}
            disabled = {disabled}
        />
    )
}