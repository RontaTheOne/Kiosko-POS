import React from "react";

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
                  <div className={`mb-3 text-${paymentStatus.success ? "success" : "danger"}`}>
                    <strong style={{ fontSize: "2rem" }}>
                      {paymentStatus.success ? "✔" : "✖"}
                    </strong>
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