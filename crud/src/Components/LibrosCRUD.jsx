import React, {useState, useEffect} from "react";
import axios from "axios";
import Tabla from "./Tabla";

function LibrosCRUD({api}){
    const[libros, setLibros] = useState()

    useEffect(() => {
        cargarLibros()
    }, [])
    
    async function cargarLibros(){
        try{
            let res = await axios(api)
            let data = await res.data

            setLibros(data)
        }
        catch(error){
            alert(error)
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