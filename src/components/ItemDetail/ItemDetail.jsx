import { useContext, useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ItemDetail = ({ item }) => {
  const { agregarAlCarrito, isInCart } = useContext(CartContext);

  const [cantidad, setCantidad] = useState(1);

  const handleAgregar = () => {
    const newItem = {
      ...item,
      cantidad,
    };

    agregarAlCarrito(newItem);
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid
        item
        xs={"6"}
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#090C02",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ color: "white" }}>
          {item.nombre}
        </Typography>
      </Grid>
      <Grid
        item
        xs={"6"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "#090C02", marginBottom: "1rem" }}
        >
          Descripción
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#090C02", margin: "0 2rem", textJustify: "justify" }}
        >
          {item.largedescription}
        </Typography>
        {isInCart(item.id) ? (
          <Link to="/cart">
            <Button variant="contained">Finish my purchase</Button>
          </Link>
        ) : (
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <ItemCount
              max={item.stock}
              cantidad={cantidad}
              setCantidad={setCantidad}
              agregar={handleAgregar}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ItemDetail;
