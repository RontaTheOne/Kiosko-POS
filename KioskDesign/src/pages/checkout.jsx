import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import ModalPaymentCard from "../components/payment/modalPaymentCard";
import jsPDF from "jspdf";

function Checkout() {

  const navigate = useNavigate();

  const location = useLocation();

  // orden
  const [order] = useState(() => {

    if (
      location.state &&
      location.state.order
    ) {

      return location.state.order;
    }

    const stored =
      sessionStorage.getItem("order");

    return stored
      ? JSON.parse(stored)
      : null;
  });

  // métodos
  const [methods, setMethods] =
    useState([]);

  // loading tarjeta
  const [processingCard,
    setProcessingCard] =
    useState(false);
  const [paymentStatus,
    setPaymentStatus] =
    useState(null);

  // guardar orden
  useEffect(() => {

    if (order) {

      sessionStorage.setItem(
        "order",
        JSON.stringify(order)
      );
    }

  }, [order]);

  // métodos de pago
  useEffect(() => {

    fetch(
      "http://localhost:3000/metodo-pago"
    )
      .then(res => res.json())
      .then(data => setMethods(data))
      .catch(error =>
        console.error(error)
      );

  }, []);

  // delay
  const delay = (ms) => {

    return new Promise(resolve =>
      setTimeout(resolve, ms)
    );
  };

  const downloadInvoice = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/orden/${orderId}`
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener la orden");
      }

      const orderData = await response.json();
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 14;
      let y = 20;

      doc.setFillColor(33, 37, 41);
      doc.rect(0, 0, pageWidth, 36, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(
        "Factura Kiosko POS",
        pageWidth / 2,
        22,
        { align: "center" }
      );

      doc.setFontSize(10);
      doc.text(
        "Pago aprobado por el banco",
        pageWidth / 2,
        30,
        { align: "center" }
      );

      y = 46;
      doc.setTextColor(0);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Factura #: ${orderData.id_orden}`, margin, y);
      doc.text(
        `Fecha: ${new Date(orderData.fecha).toLocaleString()}`,
        pageWidth - margin,
        y,
        { align: "right" }
      );
      y += 7;
      const orderTypeLabel =
        orderData.tipo_orden === "comer_aqui"
          ? "Comer aquí"
          : orderData.tipo_orden === "llevar" || orderData.tipo_orden === "para_llevar"
          ? "Para llevar"
          : orderData.tipo_orden || "-";

      doc.text(
        `Tipo de orden: ${orderTypeLabel}`,
        margin,
        y
      );
      doc.text(
        `Estado: ${orderData.estado || "-"}`,
        pageWidth - margin,
        y,
        { align: "right" }
      );
      y += 10;
      doc.setDrawColor(200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Detalle de la orden", margin, y);
      y += 8;

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Producto", margin, y);
      doc.text("Cant.", 100, y, { align: "right" });
      doc.text("Precio", 135, y, { align: "right" });
      doc.text("Subtotal", pageWidth - margin, y, { align: "right" });
      y += 6;
      doc.setDrawColor(200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      let subtotalSum = 0;
      orderData.detalles?.forEach((item) => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }

        const itemSubtotal = Number(item.subtotal) || 0;
        subtotalSum += itemSubtotal;

        doc.text(item.nombre, margin, y);
        doc.text(String(item.cantidad), 100, y, { align: "right" });
        doc.text(
          `$${Number(item.precio_unitario).toFixed(2)}`,
          135,
          y,
          { align: "right" }
        );
        doc.text(
          `$${itemSubtotal.toFixed(2)}`,
          pageWidth - margin,
          y,
          { align: "right" }
        );
        y += 7;
      });

      let ivaAmount = Number(orderData.total) - subtotalSum;
      if (ivaAmount < 0) {
        ivaAmount = 0;
      }

      if (y > 220) {
        doc.addPage();
        y = 20;
      }

      y += 8;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(
        `Subtotal: $${subtotalSum.toFixed(2)} COP`,
        pageWidth - margin,
        y,
        { align: "right" }
      );
      y += 7;
      doc.text(
        `IVA: $${ivaAmount.toFixed(2)} COP`,
        pageWidth - margin,
        y,
        { align: "right" }
      );
      y += 7;
      doc.setFontSize(12);
      doc.text(
        `Total: $${Number(orderData.total).toFixed(2)} COP`,
        pageWidth - margin,
        y,
        { align: "right" }
      );

      doc.save(`factura-orden-${orderId}.pdf`);
    } catch (error) {
      console.error("Error al generar factura:", error);
    }
  };

  // crear pago
  const handlePayment =
    async (method) => {

      if (!order) return;

      try {

        // crear pago
        const res = await fetch(
          `http://localhost:3000/pago/${order.id_orden}`,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              id_metodo_pago:
                method.id_metodo_pago,

              monto:
                order.total

            })
          }
        );

        const data =
          await res.json();

        console.log(data);

        // efectivo
        if (
          data.nombre === "efectivo"
        ) {

          navigate(
            `/pago/efectivo/${data.pago.id_pago}`
          );
        }

        // tarjeta
        if (
          data.nombre === "tarjeta"
        ) {

          setProcessingCard(true);
          setPaymentStatus(null);

          // simulación datafono
          await delay(2500);

          const paymentRes =
            await fetch(
              `http://localhost:3000/pago/tarjeta/${data.pago.id_pago}`,
              {
                method: "PUT"
              }
            );

          const paymentData =
            await paymentRes.json();

          console.log(paymentData);

          setProcessingCard(false);

          if (
            paymentData.success
          ) {
            setPaymentStatus({
              success: true,
              title: "Pago aprobado por el banco",
              description:
                "Su pago ha sido autorizado exitosamente."
            });

            await downloadInvoice(order.id_orden);
          } else {
            setPaymentStatus({
              success: false,
              title: "Pago rechazado",
              description:
                "El banco no pudo autorizar el pago. Intente con otra tarjeta o método."
            });
          }
        }

      } catch (error) {

        console.error(
          "Error procesando pago:",
          error
        );
      }
    };

  // sin orden
  if (!order) {

    return (

      <div className="container text-center mt-5">

        <div
          className="spinner-border text-danger"
          role="status"
        />

        <h5 className="mt-3">
          No hay orden activa
        </h5>

      </div>
    );
  }

  return (

    <div className="container">

      <br />
      <br />

      <div className="card shadow">

        <div className="card-body">

          <h3 className="text-center mb-4">
            Order Summary
          </h3>

          <div className="d-flex justify-content-between mb-2">

            <span>Orden</span>

            <strong>
              #{order.id_orden}
            </strong>

          </div>

          <div className="d-flex justify-content-between mb-2">

            <span>Estado</span>

            <span className="badge text-bg-warning">

              {order.estado}

            </span>

          </div>

          <hr />

          <div className="d-flex justify-content-between mb-3">

            <span>Total Amount:</span>

            <strong>
              {order.total} COP
            </strong>

          </div>

          {/* métodos */}
          <div className="text-center">

            <h5 className="mb-3">
              Select Payment Method
            </h5>

            <div className="d-flex gap-2 justify-content-center">

              {methods.map(method => (

                <button
                  key={
                    method.id_metodo_pago
                  }

                  className="btn btn-primary"

                  disabled={
                    processingCard
                  }

                  onClick={() =>
                    handlePayment(method)
                  }
                >

                  {method.nombre}

                </button>

              ))}

            </div>
          </div>

          {/* modal datafono */}
          {(processingCard || paymentStatus) && (
            <ModalPaymentCard
              processingCard={processingCard}
              paymentStatus={paymentStatus}
              onClose={() => setPaymentStatus(null)}
              onFinish={() => navigate("/")}
            />
          )}

          <button
            className="btn btn-secondary w-100 mt-4"
            disabled={processingCard}
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>

        </div>
      </div>
    </div>

    
  );
}

export default Checkout;