import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AutoresFORM({api, del}){
    const[nombre, setNombre] = useState("")
    const[apellido, setApellido] = useState("")
    const[pais, setPais] = useState("")

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() =>{
        
        if(id !== undefined){
            // cargar datos
            cargarAutor()
        }
    }, [])

    async function cargarAutor(){
        try{
            let res = await axios(api+"/"+id)
            let data = await res.data

            setNombre(data.nombre)
            setApellido(data.apellido)
            setPais(data.paisOrigen)
        }
        catch(error){
            if(error.response.status === 404){
                alert("El registro no existe")
                navigate("/autores")
            }
            else{
                alert(error)
                console.log(error)
            }
        }
    }

    async function guardar(){
        try{
            let autor = {
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }

            let res = await axios.post(api, autor)
            let data = await res.data

            if(data.status === 1){
                alert(data.message)
                navigate("/autores")
            }
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    async function editar(){
        try{
            let autor = {
                autorId: id,
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }
            
            let res = await axios.put(api, autor)
            let data = await res.data

            if(data.status === 1){
                alert(data.message)
                navigate("/autores")
            }
        }
        catch(error){
            
            if(error.response.status === 500){
                alert("El registro ya no existe")
                navigate("/autores")
            }
            else{
                alert(error)
                console.log(error)
            }
        }
    }

    async function eliminar(){
        try{
            let res = await axios.delete(api+"?id="+id)
            let data = await res.data

            if(data.status === 1){
                alert(data.message)
                navigate("/autores")
            }

        }
        catch(error){
            if(error.response.status === 404){
                alert("El autor ya no existe")
                navigate("/autores")
            }
            else{
                alert(error)
                console.log(error)
            }
        }
    }

    function enviar(e){
        e.preventDefault()
        e.stopPropagation()
        let form = document.querySelector(".needs-validation")

        if (!form.checkValidity()){
            form.classList.add('was-validated')
        }
        else{
            // Validaciones extras
            if(id === undefined)
                guardar()
            else if(del === undefined)
                editar()
            else{
                let respuesta = window.confirm("Esta seguro que desea eliminar?")
                if(respuesta === true)
                    eliminar()
            }
        }
        

    }

    return(
        <div>
            <form className="needs-validation" noValidate>

                {
                    id !== undefined ?
                        <div className="form-group mt-3">
                            <label className="form-label">Autor ID:</label>
                            <input className="form-control" type="text" value={id} readOnly disabled />
                        </div>
                    :
                        ""
                }

                <div className="form-group mt-3">
                    <label className="form-label">Nombre:</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={del===undefined ? false : true} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Apellido:</label>
                    <input type="text" className="form-control" onChange={(e) => setApellido(e.target.value)} value={apellido} disabled={del===true ? true: false} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">País de origen:</label>
                    <input type="text" className="form-control" value={pais} onChange={(e) => setPais(e.target.value)} disabled={del === true ? true : false} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <button className={`btn btn-${(id === undefined ? "success" : del===undefined ? "primary" : "danger")}`} onClick={(e) => enviar(e)}>{id === undefined ? "Guardar" : del === undefined ? "Editar" : "Eliminar"}</button>
                <button className="btn btn-warning" onClick={() => navigate("/autores")}>Cancelar</button>
            </form>
        </div>
    )
}

export default AutoresFORM