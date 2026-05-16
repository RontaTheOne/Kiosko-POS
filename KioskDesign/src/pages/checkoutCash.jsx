import React, {useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import {QRCodeCanvas} from "qrcode.react";
import jsPDF from "jspdf";

function CheckoutCash() {

  const navigate = useNavigate();

  const { id_pago } =
    useParams();

  const [payment, setPayment] =
    useState(null);

  // obtener pago
  useEffect(() => {

    fetch(
      `http://localhost:3000/pago/${id_pago}`
    )
      .then(res => res.json())
      .then(data => {

        console.log(data);

        setPayment(data);
      })
      .catch(error =>
        console.error(error)
      );

  }, [id_pago]);

  // descargar pdf
  const downloadPDF = () => {
  if (!payment) return;

  const doc = new jsPDF();

  // =========================
  // CONFIGURACIÓN GENERAL
  // =========================
  const pageWidth = doc.internal.pageSize.getWidth();

  // Fondo superior
  doc.setFillColor(33, 37, 41);
  doc.rect(0, 0, pageWidth, 45, "F");

  // =========================
  // TÍTULO
  // =========================
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);

  doc.text(
    "Kiosko POS",
    pageWidth / 2,
    20,
    { align: "center" }
  );

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(
    "Ticket de Pago",
    pageWidth / 2,
    30,
    { align: "center" }
  );

  // =========================
  // CONTENIDO
  // =========================
  let y = 60;

  const addRow = (label, value) => {
    // Label
    doc.setTextColor(80);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);

    doc.text(label, 20, y);

    // Value
    doc.setTextColor(30);
    doc.setFont("helvetica", "normal");

    doc.text(String(value), 70, y);

    // Línea separadora
    doc.setDrawColor(220);
    doc.line(20, y + 5, 190, y + 5);

    y += 18;
  };

  addRow(
    "Fecha:",
    new Date(payment.fecha).toLocaleString()
  );

  addRow("Orden:", `#${payment.id_orden}`);

  addRow("Pago:", `#${payment.id_pago}`);

  addRow(
    "Estado:",
    payment.estado === "en_pago"
      ? "Pendiente de pago"
      : "Pagado"
  );

  // =========================
  // TOTAL DESTACADO
  // =========================
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(20, y + 10, 170, 25, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(0);

  doc.text(
    `Total: $${payment.total} COP`,
    pageWidth / 2,
    y + 26,
    { align: "center" }
  );

  // =========================
  // FOOTER
  // =========================
  doc.setFontSize(10);
  doc.setTextColor(120);

  doc.text(
    "Presenta este ticket en caja para completar el pago.",
    pageWidth / 2,
    285,
    { align: "center" }
  );

  // =========================
  // DESCARGAR PDF
  // =========================
  doc.save(
    `ticket-orden-${payment.id_orden}.pdf`
  );
};

  // loading
  if (!payment) {

    return (

      <div className="container text-center mt-5">

        <div
          className="spinner-border text-danger"
          role="status"
        />

        <h5 className="mt-3">
          Cargando información...
        </h5>

      </div>
    );
  }

  return (

    <div className="container">

      <br />

      <div className="card shadow mb-4 mt-4">

        <div className="card-body">

          <div className="text-center align-items-center mb-4">

            <h2 className="card-title mt-3">
              ID Orden
            </h2>

            <h1 className="card-title mt-3">

              <strong>
                #{payment.id_orden}
              </strong>

            </h1>

            <br />

            <QRCodeCanvas
              value={`Pago #${payment.id_pago}`}
              size={150}
            />

            <h5 className="card-title mt-3">
              Escanea el código QR para descargar el ticket PDF
            </h5>

            <p className="card-text">
              Una vez descargado el ticket,
              dirígete a caja para completar el pago.
            </p>

          </div>

          <div
            className="alert alert-warning"
            role="alert"
          >

            <i className="bi bi-info-circle"></i>

            {" "}Importante escanear el código QR
            para descargar el ticket PDF y realizar
            el pago en efectivo.

          </div>

          <div className="d-grid gap-2">

            {/* PDF FRONTEND */}
            <button
              className="btn btn-danger"
              onClick={downloadPDF}
            >

              <i className="bi bi-download"></i>

              {" "}Descargar Ticket PDF

            </button>

            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => navigate("/")}
            >

              <i className="bi bi-house-door-fill"></i>

              {" "}Inicio

            </button>

          </div>
        </div>
      </div>

    </div>
  );
}

export default CheckoutCash;