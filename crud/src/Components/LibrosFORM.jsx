import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LibrosFORM({api, api2}){
    const[titulo, setTitulo] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const[edicion, setEdicion] = useState("")
    const[isbn, setIsbn] = useState("")
    const[autorId, setAutorId] = useState()
    const[autores, setAutores] = useState()
    const[validIsbn, setValidIsbn] = useState("")
    const[validEdicion, setValidEdicion] = useState("")

    const navigate = useNavigate()

    useEffect(() =>{
        cargarAutores()
    }, [])

    async function cargarAutores(){
        try{
            let res = await axios(api2)
            let data = await res.data

            setAutores(data)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    function enviar(e){
        const form = document.querySelector(".needs-validation")

        e.preventDefault()
        e.stopPropagation()

        if(!form.checkValidity()){
            form.classList.add('was-validated')
        }
        else if(validarEdicion() === true && validarISBN()===true){
            console.log("Formulario validado")
            // Guardado, edicion, eliminacion
        }
    }

    function validarISBN(){
        //    0-9767736-6-X
        //978-0-9767736-6-5
        //let expresion = "^[0-9]-[0-9]{7}-[0-9]-[0-9]$"
        //let expresion = "^[0-9]{3}-[0-9]-[0-9]{7}-[0-9]-[0-9]$"
        let expresion = "^([0-9]{3}-)?[0-9]-[0-9]{7}-[0-9]-[0-9]$"
        const expr = new RegExp(expresion)

        let result = expr.test(isbn)

        if(!result)
            setValidIsbn("is-invalid")
        else
            setValidIsbn("")

            return result
    }

    function validarEdicion(){
        let expresion = "^[0-9]+$"
        const expr = new RegExp(expresion)

        let result = expr.test(edicion)

        if(!result)
            setValidEdicion("is-invalid")
        else
            setValidEdicion("")

        return result
    }

    return(
        <div>
            <form className="needs-validation" noValidate>
                <div className="form-group mt-3">
                    <label className="form-label">Titulo:</label>
                    <input type="text" value={titulo} className="form-control" onChange={(e) => setTitulo(e.target.value)} required />
                    <div className="invalid-feedback">Campo obligatorio</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                    <div className="invalid-feedback">Campo obligatorio</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Edición</label>
                    <input className={`form-control ${validEdicion}`} type="text" value={edicion} onKeyUp={validarEdicion} onChange={(e) => setEdicion(e.target.value)} required />
                    <div className="invalid-feedback">Campo obligatorio (debe ser un número)</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">ISBN</label>
                    <input className={`form-control ${validIsbn}`} type="text" value={isbn} onKeyUp={validarISBN} onChange={(e) => setIsbn(e.target.value)} required />
                    <div className="invalid-feedback">Campo obligatorio formato 10: #-#######-#-#  o  formato 13: ###-#-#######-#-#</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Autor</label>
                    <select value={autorId} onChange={(e) => setAutorId(e.target.value)} className="form-select" required>
                        <option value="">No seleccionado</option>
                        {
                            autores === undefined ?
                            ""
                            :
                            autores.map((value, index) =>{
                                return <option key={index} value={value.autorId}>{value.nombre}</option>
                            })
                        }
                    </select>
                    <div className="invalid-feedback">Campo obligatorio</div>
                </div>
                <div className="mt-3">
                    <button className="btn btn-success" onClick={(e) => enviar(e)}>Guardar</button>
                    <button className="btn btn-warning" onClick={() => navigate("/libros")}>Cancelar</button>
                </div>
                
            </form>
        </div>
    )
}

export default LibrosFORM