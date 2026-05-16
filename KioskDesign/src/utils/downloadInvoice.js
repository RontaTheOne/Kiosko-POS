import jsPDF from "jspdf";

export async function downloadInvoice(orderId) {
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
    throw error;
  }
}
