import React from "react";
import { QRCodeCanvas } from "qrcode.react";
//import { useNavigate } from "react-router-dom";
function CheckoutCash() {
  //const navigate = useNavigate();
  return (
    <div className="container">
      <br />
      <br />
      <div className="card shadow mb-4 mt-4">
        <div className="card-body">
            <div className="text-center align-items-center mb-4">  
                <h1 className="card-title mt-3">Pago en efectivo</h1>
                <QRCodeCanvas value={123} size={200} />
                < h5 className="card-title mt-3">Escanea el código QR para pagar en efectivo</h5>
                <p className="card-text">Una vez que hayas escaneado el código QR, dirígete a caja para completar el pago.</p>
            </div>       

            <div class="alert alert-warning" role="alert">
                <i class="bi bi-info-circle"></i> Importante escanear el código QR para se descargue el ticket de compra y se pueda realizar el pago en efectivo.
            </div>

            <div class="d-grid gap-2">
                <button class="btn btn-outline-danger" type="button">
                    <i class="bi bi-house-door-fill"></i> Inicio
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
export default CheckoutCash;
