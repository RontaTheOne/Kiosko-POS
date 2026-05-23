import {useNavigate} from "react-router-dom";
import { useCart } from "../context/cartContext";

export function useHandlePay() {
  const navigate = useNavigate();
  const { cart, clearCart, tipoOrden } = useCart();

  const handlePay = async () => {
    try {
      const response = await fetch("http://localhost:3000/orden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tipo_orden: tipoOrden,
          productos: cart.map(p => ({
            id_producto: p.id_producto,
            cantidad: p.quantity,

          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      clearCart();

      const productCount = cart.reduce(
        (acc, product) => acc + (Number(product.quantity) || 0),
        0
      );

      navigate(`/Pago`, 
        { 
          state: { 
            order: { ...data, productCount }
           } 
      });

    } catch (error) {
      console.error(error);
      alert("Error en el proceso de pago");
    }
  };

  return { handlePay };
}