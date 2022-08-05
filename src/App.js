import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "../src/pages/SignUp";
import SignIn from "../src/pages/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
