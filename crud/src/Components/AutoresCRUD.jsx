import React, {useState, useEffect} from "react";
import Tabla from "./Tabla";
import axios from "axios";

function AutoresCRUD(){

    const[autores, setAutores] = useState()

    useEffect(() =>{
        cargarAutores()
    }, [])

    async function cargarAutores(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/autores")
            let data = await res.data

            //console.log(data)
            setAutores(data)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    

    return(
        <div>
            <h1>Autores</h1>
            {
                autores === undefined ?
                    <div>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                            
                        </div>
                        <h1>Cargando</h1>
                    </div>
                :
                <Tabla controlador={"autores"} list={autores} cols={["Autor ID", "Nombre", "Apellido", "Pais de origen"]} />
            }
            
        </div>
    )
}

export default AutoresCRUD