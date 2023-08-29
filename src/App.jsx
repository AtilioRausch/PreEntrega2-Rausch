import Header from "./components/Header/Header";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import Contacto from "./components/Contacto/Contacto";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartProvider } from "./context/CartContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import CartView from "./components/CartView/CartView";
import Checkout from "./components/Checkout/Checkout";
import SpeedDialBottom from "./components/SpeedDial/SpeedDial";
import Presentation from "./components/Presentation/Presentation";

function App() {
  return (
    <DarkModeProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <SpeedDialBottom />
          <Routes>
            <Route path="/" element={<Presentation />} />
            <Route
              path="/products/:categoryId"
              element={<ItemListContainer />}
            />
            <Route path="/detail/:itemId" element={<ItemDetailContainer />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* <Route path="*" element={ <Error404 /> }/> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* <Footer /> */}
        </BrowserRouter>
      </CartProvider>
    </DarkModeProvider>
  );
}

export default App;
