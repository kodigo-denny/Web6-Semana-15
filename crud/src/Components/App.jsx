import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AutoresCRUD from "./AutoresCRUD";
import LibrosCRUD from "./LibrosCRUD";
import NotFound from "./NotFound";
import Menu from "./Menu";

function App(){

    return(
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/autores" element={<AutoresCRUD />} />
                <Route path="/libros" element={<LibrosCRUD />} />
                <Route path="*" element={<NotFound />} /> 
            </Routes>
            <Menu />
        </BrowserRouter>
    )
}

export default App