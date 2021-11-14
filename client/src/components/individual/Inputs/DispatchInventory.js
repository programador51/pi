import React, { useEffect, useState } from 'react'
import Selection from '../../../atoms/Inputs/Select/Select'
import { GetAvailableInventory } from '../../../helpers/apis';

export default function DispatchInventory({
    forwardRef = () => { },
    onChange = () => { },
    errors = {}
}) {

    const [inventory, setInventory] = useState([]);

    const findElement = id => {
        const item = inventory.find(item => item.id == id);
        onChange(item);
    }

    useEffect(() => {
        (async function () {
            const apiInventory = await GetAvailableInventory();
            setInventory(apiInventory);
        })();
    }, []);

    return (
        <div className="w-100">
            <Selection
                css='w-100'
                options={inventory}
                name='idCode'
                id='idCode'
                value='id'
                label='idDesc'
                forwardRef={forwardRef}
                onChange={value => findElement(value)}
            />

            <p className="text-danger">{errors?.["idCode"]?.['message']}</p>
        </div>
    )
}
