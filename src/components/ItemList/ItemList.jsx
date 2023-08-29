import { Box } from "@mui/material";
import ItemCard from "../ItemCard/ItemCard";

const ItemList = ({ productos }) => {
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "2rem",
        rowGap: "2rem",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {productos.map((prod) => (
        <ItemCard key={prod.id} item={prod} />
      ))}
    </Box>
  );
};

export default ItemList;
