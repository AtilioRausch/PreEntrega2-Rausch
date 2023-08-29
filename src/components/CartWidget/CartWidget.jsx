import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartWidget = ({ color }) => {
  const { totalCantidad } = useContext(CartContext);

  return (
    <Link to="/cart">
      <IconButton aria-label="cart" color={color}>
        <Badge
          badgeContent={totalCantidad()}
          overlap="rectangular"
          color="secondary"
        >
          <ShoppingCartIcon color={color} />
        </Badge>
      </IconButton>
    </Link>
  );
};
export default CartWidget;
