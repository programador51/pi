import React from "react";
import { URL_CLIENT } from "../../config";
import { login } from '../../helpers/apis';
import { Redirect } from 'react-router-dom';

export default function Login(props) {

  async function triggerLogin(e){
    const [resultLogin,redirect] = await login(e);

    if(resultLogin){
      console.log('Redireccionando...');
      props.history.push(redirect);
    }

  }

  return (
    <div class="login ">
      <div className="container justify-content-center d-flex align-items-center">
        <div className="row">
          <form className="col-12 ">
            <img
              src='https://res.cloudinary.com/dmtvwe2ur/image/upload/v1621226317/logo_igsd6n.png'
              alt="logotipo-ste-soluciones"
              className="mt-3"
            />
            <input
              id="userName"
              class="form-control my-4"
              type="text"
              placeholder="Usuario"
              required
            />
            <input
              id="password"
              class="form-control mt-2"
              type="password"
              placeholder="Contraseña"
              required
            />
            <button 
              id="btnLogin" 
              onClick={(e)=>triggerLogin(e)}
              class="mt-3 customBtn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
