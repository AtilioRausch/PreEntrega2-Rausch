import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  documentId,
  writeBatch,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link, Navigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Typography, Box } from "@mui/material";

const schema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "The name is too short")
    .max(20, "Maximum 20 characters")
    .required("This field is mandatory"),
  apellido: Yup.string()
    .min(3, "The surname is too short")
    .max(20, "Maximum 20 characters")
    .required("This field is mandatory"),
  telefono: Yup.string()
    .min(3, "The phone number is too short")
    .max(20, "The phone number is too long")
    .matches(/^[0-9]+$/, "The phone number can only contain numerical digits")
    .required("This field is mandatory"),
  direccion: Yup.string()
    .min(6, "La direccion es demasiado corta")
    .max(30, "Maximum 30 characters")
    .required("This field is mandatory"),
  email: Yup.string()
    .required("This field is mandatory")
    .email("Invalid email"),
  email2: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails do not match")
    .required("This field is mandatory"),
});

const Checkout = () => {
  const { cart, totalCompra, vaciarCarrito } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (values) => {
    setLoading(true);

    const orden = {
      cliente: values,
      items: cart.map((item) => ({
        id: item.id,
        precio: item.precio,
        cantidad: item.cantidad,
        nombre: item.nombre,
      })),
      total: totalCompra(),
      fyh: new Date(),
    };

    const batch = writeBatch(db);
    const ordersRef = collection(db, "orders");
    const productosRef = collection(db, "productos");
    const q = query(
      productosRef,
      where(
        documentId(),
        "in",
        cart.map((item) => item.id)
      )
    );

    const productos = await getDocs(q);
    const outOfStock = [];

    productos.docs.forEach((doc) => {
      const item = cart.find((prod) => prod.id === doc.id);
      const stock = doc.data().stock;

      if (stock >= item.cantidad) {
        batch.update(doc.ref, {
          stock: stock - item.cantidad,
        });
      } else {
        outOfStock.push(item);
      }
    });

    if (outOfStock.length === 0) {
      await batch.commit();
      const doc = await addDoc(ordersRef, orden);

      vaciarCarrito();
      setOrderId(doc.id);
    } else {
      alert("Hay items sin stock");
      console.log(outOfStock);
    }

    addDoc(ordersRef, orden).then((doc) => {
      vaciarCarrito();
      setOrderId(doc.id);
    });
    setLoading(false);
  };

  if (orderId) {
    return (
      <Box style={{ paddingTop: "14rem" }} className="container my-5">
        <Typography variant="h4" color={"primary"}>
          Your purchase was success!
        </Typography>
        <hr />
        <Typography color={"primary"}>
          Your order number is: <strong>{orderId}</strong>
        </Typography>

        <Link to="/">
          <Button>Volver</Button>
        </Link>
      </Box>
    );
  }

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{ marginTop: "14rem", marginBottom: "1rem", width: "100%" }}
      display={"flex"}
      justifyContent={"center"}
    >
      <Typography variant="h5" color={"primary"}>
        Checkout
      </Typography>
      <hr />

      <Formik
        initialValues={{
          nombre: "",
          direccion: "",
          email: "",
          email2: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {() => (
          <Form className="form">
            <Field
              placeholder="Name"
              className="form-control mt-6"
              type="text"
              name="nombre"
            />
            <ErrorMessage
              name="nombre"
              component="p"
              style={{ color: "red" }}
            />
            <Field
              placeholder="Surname"
              className="form-control mt-6"
              type="text"
              name="apellido"
            />
            <ErrorMessage
              name="apellido"
              component="p"
              style={{ color: "red" }}
            />
            <Field
              placeholder="Phone"
              className="form-control mt-6"
              type="text"
              name="telefono"
            />
            <ErrorMessage
              name="telefono"
              component="p"
              style={{ color: "red" }}
            />
            <Field
              placeholder="Address"
              className="form-control mt-6"
              type="text"
              name="direccion"
            />
            <ErrorMessage
              name="direccion"
              component="p"
              style={{ color: "red" }}
            />
            <Field
              placeholder="Email"
              className="form-control mt-6"
              type="email"
              name="email"
            />
            <ErrorMessage name="email" component="p" style={{ color: "red" }} />
            <Field
              placeholder="Confirm your email"
              className="form-control mt-6"
              type="email"
              name="email2"
            />
            <ErrorMessage
              name="email2"
              component="p"
              style={{ color: "red" }}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Checkout;
