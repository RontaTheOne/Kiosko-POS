import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // Agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (i) => i.id_producto === product.id_producto,
      );

      if (existingItem) {
        return prevCart.map((i) =>
          i.id_producto === product.id_producto
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }

      return [
        ...prevCart,
        {
          id_producto: product.id_producto,
          nombre: product.nombre,
          precio_unitario: Number(product.precio_base),
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  // Eliminar un producto del carrito
  const removeFromCart = (item) => {
    setCart(cart.filter((i) => i.id_producto !== item.id_producto));
  };

  // Incrementar la cantidad de un producto en el carrito
  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.id_producto === id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };

  // Decrementar la cantidad de un producto en el carrito
  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.id_producto === id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      ),
    );
  };

  // Limpiar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
