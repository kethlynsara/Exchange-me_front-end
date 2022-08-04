import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "../src/pages/SignUp";
import SignIn from "../src/pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
