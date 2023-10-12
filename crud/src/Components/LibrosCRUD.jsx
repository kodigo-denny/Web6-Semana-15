import React, {useState, useEffect} from "react";
import axios from "axios";
import Tabla from "./Tabla";

// api es la url de la Endpoint de libros
function LibrosCRUD({api}){
    //console.log(api)
    
    // Se crea el estado donde se almacenara el listado de los libros devueltos por la API
    const[libros, setLibros] = useState()

    // UseEfect se invoca al finalizar de montar el componente
    useEffect(() => {
        cargarLibros()// Invocamos a la funcion encargada de cargar los datos de los libros
    }, [])
    
    // Se encarga de solicitar a travez de GET el listado de libros a la API
    async function cargarLibros(){
        try{
            let res = await axios(api)// Hacemos la solicitud GET
            let data = await res.data// Convertimos el resultado en objeto

            setLibros(data)// El listado devuelto por la API lo guardamos en el estado de libros
        }
        catch(error){
            alert(error)// Muestra mensaje de error
            console.log(error)
        }
    }

    return(
        <div>
            <h1>Libros</h1>
            {
                libros === undefined ?
                    <div>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                            
                        </div>
                        <h1>Cargando</h1>
                    </div>
                :
                <Tabla controlador={"libros"} list={libros} cols={["Libro ID", "Titulo", "Descripción", "Edicion", "ISBN", "Autor ID", "Nombre", "Apellido"]} />
            }
        </div>
    )
}

export default LibrosCRUD