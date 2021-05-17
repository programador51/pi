import React from "react";
import { URL_CLIENT } from "../../config";

export default function Login() {
  return (
    <div class="login ">
      <div className="container justify-content-center d-flex align-items-center">
        <div className="row">
          <form action="" className="col-12 ">
            <img
              src={`${URL_CLIENT}media/logo.png`}
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
            <button id="btnLogin" class="mt-3 customBtn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
