import React, { useState } from "react";
import MenuItem from "./ItemMenu";
import "./Menu.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign,faWrench,faBoxes, faTicketAlt , faEye ,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Menu({
  linkRefactions = 'refacciones',
  linkInventory = 'inventario',
  linkManage = 'gestion',
  linkAddTickets = 'tickets',
  linkTickets = 'tickets/ver',
  linkLogout = '/'
}) {
  const inventory = <FontAwesomeIcon icon={faBoxes} />;
  const refactions = <FontAwesomeIcon icon={faDollarSign} />;
  const manage = <FontAwesomeIcon icon={faWrench} />;
  const tickets = <FontAwesomeIcon icon = {faTicketAlt}/>
  const eye = <FontAwesomeIcon icon = {faEye}/>
  const logout = <FontAwesomeIcon icon = {faSignOutAlt}/>

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
            link={linkRefactions}
            aditionalClass='w-50'
        />
          <MenuItem icon={inventory} text='Inventario' link={linkInventory}/>
          <MenuItem icon={refactions} text='Gestion' link={linkManage}/>


            <MenuItem icon = {tickets} text = 'Tickets' link={linkAddTickets}/>
            <MenuItem icon = {eye} text = 'Ver tickets' link={linkTickets}/>
            <MenuItem icon = {logout} text = 'Cerrar sesion' link={linkLogout}/>

          </>
      )
      
      : (
        <>
          <MenuItem icon={manage} />
          <MenuItem icon={inventory} />
          <MenuItem icon={refactions} />
          <MenuItem icon = {tickets}/>
          <MenuItem icon = {eye}/>
          <MenuItem icon = {logout}/>
        </>
      )}
    </div>
  );
}
