const API = "http://localhost:3000/pago";
const API_Methods = "http://localhost:3000/metodo-pago";

/* Servicio para obtener métodos de pago */     
export async function getPaymentMethods() {
    const res = await fetch(API_Methods);
    if (!res.ok) {
        throw new Error("Error al obtener métodos de pago");
    }
    return await res.json();
}
/* Servicio para crear pago */  
export async function createPayment(orderId, methodId, amount) {
    const res = await fetch(`${API}/${orderId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            id_metodo_pago: methodId,
            monto: amount,
        })
    });
    if (!res.ok) {
        throw new Error("Error al crear el pago");
    }
    return await res.json();
}

/* Servicio para procesar pago con tarjeta */
export async function processCardPayment(paymentId) {
    const res = await fetch(`${API}/tarjeta/${paymentId}`, {
        method: "PUT",
    });
    if (!res.ok) {
        throw new Error("Error al procesar el pago con tarjeta");
    }
    return await res.json();
}
