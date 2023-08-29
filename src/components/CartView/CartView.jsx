import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Button } from "@mui/material";

const CartView = () => {
  const { cart, totalCompra, vaciarCarrito, removerDelCarrito } =
    useContext(CartContext);

  if (cart.length === 0) {
    return (
      <Box
        sx={{ marginTop: "14rem" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant="h3" color={"primary"}>
          Your cart is empty :(
        </Typography>
        <hr />
        <Link to="/products/all">
          <Button variant="contained">Go to buy!</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box
      sx={{ marginTop: "14rem", marginBottom: "2rem" }}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Typography variant="h2" color={"primary"}>
        Your purchase
      </Typography>
      <hr />
      <Box display={"flex"} justifyContent={"space-around"} flexWrap={"wrap"}>
        {cart.map((item) => (
          <Box key={item.id} margin={"1rem"}>
            <Typography variant="h4" color={"primary"}>
              {item.nombre}
            </Typography>
            <img src={item.img} alt={item.nombre} />
            <Typography variant="h6" color={"primary"}>
              Precio: ${item.precio * item.cantidad}
            </Typography>
            <Typography variant="h6" color={"primary"}>
              Cantidad: {item.cantidad}
            </Typography>
            <button
              onClick={() => removerDelCarrito(item.id)}
              className="btn btn-danger"
            >
              <FaTrashAlt />
            </button>
            <hr />
          </Box>
        ))}
      </Box>
      <div>
        <Typography variant="h4" color={"primary"}>
          Total: ${totalCompra()}
        </Typography>
        <Button onClick={vaciarCarrito} variant="outlined">
          Clear cart
        </Button>
        <Link to="/checkout">
          <Button variant="contained" sx={{ marginLeft: "1rem" }}>
            Finish my purchase
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default CartView;
