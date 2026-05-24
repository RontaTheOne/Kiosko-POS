import Coca from "../assets/img/coca-cola.png";
import Pepsi from "../assets/img/pepsi.png";
import Jugo from "../assets/img/jugo de naranja.png";
import hamburguesa from "../assets/img/Hamburguesa clásica.png";
import perro from "../assets/img/Perro caliente.png";
import pizza from "../assets/img/Pizza personal.png";
import helado from "../assets/img/Helado de vainilla.png";
import brownie from "../assets/img/Brownie con helado.png";
import malteada from "../assets/img/Malteada de chocolate.png";
import papas from "../assets/img/Papas fritas.png";
import aros from "../assets/img/Aros de cebolla.png";
import nuggets from "../assets/img/Nuggets de pollo.png";
import defaultImg from "../assets/img/default.png";

const productImages = {
  "coca-cola": Coca,
  pepsi: Pepsi,
  "jugo de naranja": Jugo,
  "hamburguesa clásica": hamburguesa,
  "perro caliente": perro,
  "pizza personal": pizza,
  "helado de vainilla": helado,
  "brownie con helado": brownie,
  "malteada de chocolate": malteada,
  "papas fritas": papas,
  "aros de cebolla": aros,
  "nuggets de pollo": nuggets,
};
/* =========================
DICCIONARIO DE IMÁGENES DE PRODUCTOS
========================= */
export const getProductImage = (productName) => {
  if (!productName) return defaultImg;

  const key = productName.toLowerCase().trim();

  return productImages[key] || defaultImg;
};
