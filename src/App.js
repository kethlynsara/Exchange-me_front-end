import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SignUp from "../src/pages/SignUp";
import SignIn from "../src/pages/SignIn";
import Home from "./pages/Home";
import Exchange from "./pages/Exchange";
import ExchangeRegister from "./pages/ExchangeRegister";
import UserContext from "./contexts/UserContext";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ExchangeRequest from "./pages/ExchangeRequest";
import Book from "./pages/Book";
import Header from "./components/Header";
import createGlobalStyle from "./assets/css/global";
import Success from "./pages/Success";

function App() {
  const [bookStatus, setBookStatus] = useState("");
  const [pix, setPix] = useState("");
  const [confirmOrderStep, setConfirmOrderStep] = useState(0);
  
  return (
    <UserContext.Provider value={{ bookStatus, setBookStatus, pix, setPix, confirmOrderStep, setConfirmOrderStep}}>
      <BrowserRouter>
        <createGlobalStyle />
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/books/:bookId" element={<Book />} />
          <Route path="/exchanges" element={<Exchange />} />
          <Route path="/exchanges/requests/:exchangeId" element={<ExchangeRequest />} />
          <Route path="/exchanges/register" element={<ExchangeRegister />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
