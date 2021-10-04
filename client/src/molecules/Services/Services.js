import React, { useEffect , useState } from 'react';
import Selection from '../../atoms/Inputs/Select/Select';
import { GetServices } from '../../helpers/apis';
import { ContainerServices } from './Styles';

export default function SelectServices({
    forwardRef = () => {},
    errors = {},
    defValue = null,
    disabled = false
}){

    const [services,setServices] = useState([]);

    useEffect(()=>{
        (async function(){
            const apiServices = await GetServices();

            setServices(apiServices);
        })();
    },[]);

    return(
        <div>
            <Selection
                options = {services}
                id = 'service'
                name = 'service'
                value = 'idServicio'
                label = 'descripcion'
                forwardRef = {forwardRef}
                errors = {errors}
                defaultValue = {defValue}
                disabled = {disabled}
            />
        </div>
    )
}