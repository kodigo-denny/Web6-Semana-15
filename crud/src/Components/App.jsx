import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AutoresCRUD from "./AutoresCRUD";
import LibrosCRUD from "./LibrosCRUD";
import NotFound from "./NotFound";
import Menu from "./Menu";
import AutoresFORM from "./AutoresFORM";

function App(){
    const[apiAutores, setApiAutores] = useState("https://denny2023.azurewebsites.net/api/autores")

    return(
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/autores" element={<AutoresCRUD api={apiAutores} />} />
                <Route path="/autores/add" element={<AutoresFORM api={apiAutores} />} />
                <Route path="/autores/edit/:id" element={<AutoresFORM api={apiAutores} />} />
                <Route path="/autores/delete/:id" element={<AutoresFORM del={true} api={apiAutores} />} />
                <Route path="/libros" element={<LibrosCRUD />} />
                <Route path="*" element={<NotFound />} /> 
            </Routes>
            <Menu />
        </BrowserRouter>
    )
}

export default App