import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Box, Typography } from "@mui/material";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const productosRef = collection(db, "items");

    const q =
      categoryId !== "all"
        ? query(productosRef, where("category", "==", categoryId))
        : productosRef;

    getDocs(q)
      .then((resp) => {
        const docs = resp.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setProductos(docs);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <Box sx={{ marginTop: "14rem", marginBottom: "1rem" }}>
      <Typography
        variant={"h2"}
        sx={{ color: "#090C02", marginLeft: "2rem", marginBottom: "2rem" }}
      >
        Products
      </Typography>
      <Typography
        variant={"h4"}
        sx={{ color: "#090C02", marginLeft: "2rem", marginBottom: "2rem" }}
      >
        {categoryId.toUpperCase()}
      </Typography>

      {loading ? <Loader /> : <ItemList productos={productos} />}
    </Box>
  );
};

export default ItemListContainer;
