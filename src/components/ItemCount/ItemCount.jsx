import { Box, Typography } from "@material-ui/core";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";

const ItemCount = ({ max, cantidad, setCantidad, agregar }) => {
  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1);
  };

  const handleSumar = () => {
    cantidad < max && setCantidad(cantidad + 1);
  };

  return (
    <div>
      <Box display={"flex"}>
        <Button
          onClick={handleRestar}
          variant="outlined"
          disabled={cantidad === 1}
          sx={{ marginRight: "1rem" }}
        >
          -
        </Button>
        <Typography color="primary" display="inline">
          {cantidad}
        </Typography>
        <Button
          onClick={handleSumar}
          variant="contained"
          disabled={cantidad === max}
          sx={{ marginLeft: "1rem" }}
        >
          +
        </Button>
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
        <Button
          onClick={agregar}
          variant="contained"
          endIcon={<ShoppingCartIcon />}
          sx={{ marginTop: "1rem", width: "100%" }}
        >
          Add
        </Button>
      </Box>
    </div>
  );
};

export default ItemCount;
