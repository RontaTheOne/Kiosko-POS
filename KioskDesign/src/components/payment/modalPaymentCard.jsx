import React from "react";
import success from "../../assets/img/success.png";
import error from "../../assets/img/error.png";

function ModalPaymentCard({ processingCard, paymentStatus, onClose, onFinish }) {
  const title = processingCard
    ? "Pago con tarjeta"
    : paymentStatus?.title;

  return (
    <>  
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body text-center">
              {processingCard ? (
                <>
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                  />
                  <h5>Conectando con datafono...</h5>
                  <p className="mb-0">Acerque o inserte su tarjeta</p>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <img
                      src={paymentStatus?.success === true ? error : success}
                      alt={paymentStatus?.success === true ? "Pago exitoso" : "Pago fallido"}
                      className="img-fluid"
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <p className="fs-5">{paymentStatus.description}</p>
                </>
              )}
            </div>
            {!processingCard && (
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className={`btn ${paymentStatus.success ? "btn-danger" : "btn-danger"}`}
                  onClick={paymentStatus.success ? onFinish : onClose}
                >
                  {paymentStatus.success ? "Finalizar" : "Cerrar"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}

export default ModalPaymentCard;