import React from 'react';

import { Link } from "react-router-dom";

export default function ItemMenu({ icon, text = "",link,aditionalClass}) {
    return (

        <Link to={link}>
            <div className={`${aditionalClass} d-flex align-items-center justify-content-center`}>
                {icon}
                <p>{text}</p>
            </div>
        </Link>

    )
}