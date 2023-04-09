import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Hotel from "./pages/Hotel/Hotel";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Favorites from "./pages/Favorites/Favorites";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="hotel">
            <Route path=":id" element={<Hotel />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
