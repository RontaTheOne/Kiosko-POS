import React from "react";
import { Link } from "react-router-dom";

function orderType() {  
    return (
        <div className="container">
            <div className="align-items-center justify-content-center d-flex flex-column">
                <br />
                <h1>¿Cómo quieres ordenar?</h1>
                <p className="lead mb-4">
                    Elige tu tipo de orden para continuar.
                </p>
                <div className="d-flex gap-3">
                    <Link to="/Home" className="btn btn-outline-primary">
                        Para llevar
                    </Link>
                    <Link to="/Home" className="btn btn-outline-primary">
                        Comer aquí
                    </Link>
                </div>
                <small className="d-block mt-4 text-secondary">
                    <i class="bi bi-hand-index-thumb-fill"></i> Presiona una opción para continuar
                </small>
            </div>
        </div>
    );
}
export default orderType;