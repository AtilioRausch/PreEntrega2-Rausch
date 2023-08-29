import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import ItemCount from "../ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Box } from "@material-ui/core";

export default function ItemCard({ item }) {
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito, isInCart } = useContext(CartContext);
  const handleAgregar = () => {
    const newItem = {
      ...item,
      cantidad,
    };

    agregarAlCarrito(newItem);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/detail/${item.id}`} style={{ textDecoration: "none" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="420"
            image={item.img}
            alt={item.nombre}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="primary"
            >
              {item.nombre}
            </Typography>
            {item.category == "oportunities" ? (
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="primary"
              >
                Precio: <del>${item.precio}</del>&nbsp;&nbsp;$
                {item.preciooferta}
              </Typography>
            ) : (
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="primary"
              >
                Precio: ${item.precio}
              </Typography>
            )}
            <Typography variant="body2" color="primary">
              {item.descripcion}
            </Typography>
            {item.stock < 10 && (
              <Typography variant="body2" color="primary">
                Quedan sólo {item.stock} unidades!
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "self-end",
        }}
      >
        <Link to={`/detail/${item.id}`}>
          <Button variant="outlined">Details</Button>
        </Link>
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          <ItemCount
            max={item.stock}
            cantidad={cantidad}
            setCantidad={setCantidad}
            agregar={handleAgregar}
          />
        </Box>
      </CardActions>
    </Card>
  );
}
