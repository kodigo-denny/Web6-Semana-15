import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AutoresCRUD from "./AutoresCRUD";
import LibrosCRUD from "./LibrosCRUD";
import NotFound from "./NotFound";
import Menu from "./Menu";
import AutoresFORM from "./AutoresFORM";
import LibrosFORM from "./LibrosFORM";

function App(){
    const[apiAutores, setApiAutores] = useState("https://denny2023.azurewebsites.net/api/autores")
    const[apiLibros, setApiLibros] = useState("https://denny2023.azurewebsites.net/api/libros")

    return(
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Enrutamiento a la pagina principal del CRUD de autores */}
                <Route path="/autores" element={<AutoresCRUD api={apiAutores} />} />

                {/* Enrutamiento hacia el formulario de nuevo registro de atuor*/}
                <Route path="/autores/add" element={<AutoresFORM api={apiAutores} />} />

                {/* Enrutamiento hacia el formulario de editar autor*/}
                <Route path="/autores/edit/:id" element={<AutoresFORM api={apiAutores} />} />

                {/* Enrutamiento hacia el formulario de eliminar autor */}
                <Route path="/autores/delete/:id" element={<AutoresFORM del={true} api={apiAutores} />} />

                {/* Enrutamiento a la pagina principal del CRUD de libros */}
                <Route path="/libros" element={<LibrosCRUD api={apiLibros} />} />

                {/* Enrutamiento hacia el formulario de nuevo libro*/}
                <Route path="/libros/add" element={<LibrosFORM api={apiLibros} api2={apiAutores} />} />

                {/* Enrutamiento hacia el formulario de editar libro */}
                <Route path="/libros/edit/:id" element={<LibrosFORM api={apiLibros} api2={apiAutores} />} />

                {/* Enrutamiento hacia el formulario de eliminar libro */}
                <Route path="/libros/delete/:id" element={<LibrosFORM api={apiLibros} api2={apiAutores} del={true} />} />

                <Route path="*" element={<NotFound />} /> 
            </Routes>
            <Menu />
        </BrowserRouter>
    )
}

export default App