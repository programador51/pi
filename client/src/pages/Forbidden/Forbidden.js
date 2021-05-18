import React from "react";
import { Link } from 'react-router-dom'

export default function Forbidden() {

    const info = JSON.parse(localStorage.getItem('userInfo'));
    let link = ``;
    if(info.rol===1){
        link = 'gestion'
    }else{
        link = 'despacho'
    }

  return (
    <div className="my-auto h-100vh justify-content-center d-flex align-items-center">
      <div>
      <div className="d-flex justify-content-center">
          <Link to={link}>
        <button className="mb-3 customBtn">Regresar</button>

          </Link>
      </div>

      <div className="d-flex justify-content-center">
        <img
          className="img-fullScreen"
          src="https://i.pinimg.com/originals/b4/ee/b8/b4eeb8af793c2eb897646664ed6f2038.png"
          alt=""
        />
      </div>
      </div>
    </div>
  );
}
