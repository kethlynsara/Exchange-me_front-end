import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "../src/pages/SignUp";
import SignIn from "../src/pages/SignIn";
import Home from "./pages/Home";
import Exchange from "./pages/Exchange";
import ExchangeRegister from "./pages/ExchangeRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/' element={<Home />} />
        <Route path='/exchanges' element={<Exchange />} />
        <Route path='/exchanges/register' element={<ExchangeRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
