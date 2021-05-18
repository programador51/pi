import React, { useState } from "react";
import MenuItem from "./ItemMenu";
import "./Menu.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign,faWrench,faBoxes } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
  const inventory = <FontAwesomeIcon icon={faBoxes} />;
  const refactions = <FontAwesomeIcon icon={faDollarSign} />;
  const manage = <FontAwesomeIcon icon={faWrench} />;

  const [expandMenu, setExpandMenu] = useState(false);

  const changeMenuView = (boolean) => {
    setExpandMenu(boolean);

    if(boolean===true){
        document.getElementById('menu').classList.add('w-25');
    }else{
        document.getElementById('menu').classList.remove('w-25');
    }
  };

  return (
    <div 
        id='menu'
        className="menu"
        onMouseEnter={() => changeMenuView(true)}
        onMouseLeave={()=> changeMenuView(false)}>
      {expandMenu ? 
      
      (
          <>
          <MenuItem 
            icon={manage} 
            text='Refacciones' 
            link='refacciones'
            aditionalClass='w-50'
        />
          <MenuItem icon={inventory} text='Inventario' link='inventario'/>
          <MenuItem icon={refactions} text='Gestion' link='gestion'/>
          </>
      )
      
      : (
        <>
          <MenuItem icon={manage} />
          <MenuItem icon={inventory} />
          <MenuItem icon={refactions} />
        </>
      )}
    </div>
  );
}
