import React from 'react';
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Earn from "./pages/Earn.jsx";
import Friends from "./pages/Friends.jsx";
import Wallet from "./pages/Wallet.jsx";
import Wrapper from "./wrapper/Wrapper.jsx";

function App() {
  return (
     <Routes>
         <Route path="/" element={<Wrapper />}>
             <Route index element={<Home />} />
             <Route path="/earn" element={<Earn />} />
             <Route path="/friends" element={<Friends />} />
             <Route path="/wallet" element={<Wallet />} />
         </Route>

         {/*<Route path="/passed" element={<Passed />} />*/}
     </Routes>
  )
}

export default App
