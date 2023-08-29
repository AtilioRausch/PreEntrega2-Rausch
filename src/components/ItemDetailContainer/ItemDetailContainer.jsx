import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loader from "../Loader/Loader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Box } from "@mui/material";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);

    //1- armar la ref
    const itemRef = doc(db, "items", itemId);
    //2- llamar la ref
    getDoc(itemRef)
      .then((doc) => {
        // doc === ok
        setItem({
          id: doc.id,
          ...doc.data(),
        });
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return <Box>{loading ? <Loader /> : <ItemDetail item={item} />}</Box>;
};

export default ItemDetailContainer;
