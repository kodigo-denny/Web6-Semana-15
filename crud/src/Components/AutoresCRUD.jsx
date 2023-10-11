import React, {useState, useEffect} from "react";
import Tabla from "./Tabla";
import axios from "axios";

// api: donce voy a recibir la URL de la api de la entidad autores
function AutoresCRUD({api}){

    // El estado donde vamos a alojar los datos de todos los autores
    const[autores, setAutores] = useState()
    

    // Solo se ejecuta una vez cuando el componente es montado
    useEffect(() =>{
        cargarAutores()// Invoca la solicitud del metodo que devuelve los autores
    }, [])

    // Esta funcion es la encargada de hacer la solicitud GET a la API sobre los autores
    async function cargarAutores(){
        try{
            let res = await axios(api)// Solicitud de tipo GET hacia autores
            let data = await res.data// Convertimos el resultado en un array de objetos de tipo autor

            //console.log(data)
            setAutores(data)// El listado de los autores se envia al estado llamado Autores
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