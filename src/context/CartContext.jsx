import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const init = JSON.parse(localStorage.getItem("cart")) || [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(init);

  const agregarAlCarrito = (item) => {
    setCart([...cart, item]);
  };

  const removerDelCarrito = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const totalCompra = () => {
    const totalPrice = cart.reduce((acc, item) => {
      const itemPrice = item.preciooferta ? item.preciooferta : item.precio;
      return acc + itemPrice * item.cantidad;
    }, 0);

    return totalPrice;
  };

  const totalCantidad = () => {
    return cart.reduce((acc, item) => acc + item.cantidad, 0);
  };

  const vaciarCarrito = () => {
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        agregarAlCarrito,
        isInCart,
        totalCompra,
        vaciarCarrito,
        totalCantidad,
        removerDelCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
