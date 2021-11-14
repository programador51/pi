import React, { forwardRef, useEffect, useState } from 'react';
import Selection from '../../atoms/Inputs/Select/Select';
import { GetUsers } from '../../helpers/apis';

/**
 * 
 * @property {string?} name - name attribute for the select tag
 * @property {string?} id - id attribute for the select tag
 * @property {object?} errors - react-hook-form errors-v7
 * @property {()=>{}} forwardRef - react-hook-form register-v7
 * @property {number} defValue - id of the user selected by default
 * @returns {JSX.Element} Select of users
 */
export function SelectUsers({
    forwardRef = () => { },
    name = 'idUser',
    id = 'idUser',
    errors = {},
    defValue = null,
    disabled = false,
    onChange = () => { }
}) {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        (async function () {
            const apiUsers = await GetUsers();

            const parsedUsers = apiUsers.map(user => {
                return {
                    ...user,
                    fullName: user.name.fullName
                }
            });

            setUsers(parsedUsers);

        })();

    }, []);

    return (

        <>
            {users.length > 0 ?
                <Selection
                    forwardRef={forwardRef}
                    options={users}
                    value='id'
                    name={name}
                    id={id}
                    label='fullName'
                    defaultValue={defValue}
                    errors={errors}
                    placeholder={false}
                    disabled={disabled}
                    onChange={value => onChange(+value)}
                />
                : null}
        </>

    )
}