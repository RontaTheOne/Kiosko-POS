import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {getPaymentMethods,createPayment,processCardPayment,} from "../services/checkoutService.js";
import { downloadInvoice } from "../utils/downloadInvoice.js";
import { delay } from "../utils/delay.js";

export function useCheckout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [methods, setMethods] = useState([]);
  const [processingCard, setProcessingCard] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const [order] = useState(() => {
    if (location.state?.order) {
      return location.state.order;
    }

    const stored = sessionStorage.getItem("order");

    return stored ? JSON.parse(stored) : null;
  });

  const totalProducts =
    order?.productCount ||
    order?.totalProductos ||
    order?.detalles?.reduce(
      (sum, item) => sum + (Number(item.cantidad) || 0),
      0,
    ) ||
    0;
/* =========================
  GUARDAR ORDEN EN SESSION STORAGE
========================= */
  useEffect(() => {
    if (order) {
      sessionStorage.setItem("order", JSON.stringify(order));
    }
  }, [order]);

  const loadMethods = async () => {
    try {
      const data = await getPaymentMethods();

      setMethods(data);
    } catch (error) {
      console.error(error);
    }
  };
/* =========================
  CARGAR MÉTODOS DE PAGO AL INICIAR EL COMPONENTE
========================= */
  useEffect(() => {
    const fetchData = async () => {
      loadMethods();
    };
    fetchData();
  }, []);

  const handlePayment = async (method) => {
    if (!order) return;

    try {
      const data = await createPayment(
        order.id_orden,
        method.id_metodo_pago,
        order.total,
      );

      // efectivo
      if (data.nombre === "efectivo") {
        navigate(`/pago/efectivo/${data.pago.id_pago}`);
      }

      // tarjeta
      if (data.nombre === "tarjeta") {
        setProcessingCard(true);
        setPaymentStatus(null);

        await delay(2500);

        const paymentData = await processCardPayment(data.pago.id_pago);

        setProcessingCard(false);

        if (paymentData.success) {
          setPaymentStatus({
            success: true,
            title: "Pago aprobado por el banco",
            description: "Su pago ha sido autorizado exitosamente.",
          });

          await downloadInvoice(order.id_orden);
        } else {
          setPaymentStatus({
            success: false,
            title: "Pago rechazado",
            description: "El banco no pudo autorizar el pago.",
          });
        }
      }
    } catch (error) {
      console.error("Error procesando pago:", error);
    }
  };

  return {
    order,
    methods,
    processingCard,
    paymentStatus,
    totalProducts,
    handlePayment,
    setPaymentStatus,
    navigate,
  };
}
