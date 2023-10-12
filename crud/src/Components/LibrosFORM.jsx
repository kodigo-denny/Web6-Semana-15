import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// api: es un atributo donde se recibe la url de endpoint libros
// api2: es un atributo donde se recibe la url de endpoint autores
// del: es un atributo donde se recibe si el formulario se a cargado para eliminar un registro
function LibrosFORM({api, api2, del}){
    console.log("api", api)
    console.log("api2", api2)
    console.log("del", del)

    // Estados son creados para los campos del formulario
    const[titulo, setTitulo] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const[edicion, setEdicion] = useState("")
    const[isbn, setIsbn] = useState("")
    const[autorId, setAutorId] = useState()

    // El estado que almacena el listado de autores con el cual se carga el elemento SELECT
    const[autores, setAutores] = useState()
    
    // Este estado sirve para mostrar que el campo es invalido cuando no se cumple la expresion regular
    const[validIsbn, setValidIsbn] = useState("")
    const[validEdicion, setValidEdicion] = useState("")



    const navigate = useNavigate()// Se crea la funcion para navegar


    const{id} = useParams()// Aqui se capturan los parametros recibidos por la url
    console.log("ID", id)

    // Se invoca cuando el componente a terminado de montarse
    useEffect(() =>{
        cargarAutores()// Invocamos a la funcion que carga el listado de los autores devueltos por la API

        // Verificamos si es una edicion o eliminacion para cargar los datos del libro en el formulario
        if(id !== undefined){
            cargarLibro()// Invocamos a la funcion que carga los datos del libro
        }
    }, [])

    async function cargarLibro(){
        try{
            let res = await axios(`${api}/${id}`)// Hacemos la solicitud GET con parametro hacia el endpoint de libros
            let data = await res.data// Convertimos el resultado en objeto

            // Asigna los valores del objeto devuelto por la API hacia los respectivos estados
            setTitulo(data.titulo)
            setDescripcion(data.descripcion)
            setEdicion(data.edicion)
            setIsbn(data.isbn)
            setAutorId(data.autorId)
        }
        catch(error){
            // Mostramos un mensaje de error
            alert(error)
            console.log(error)
        }
    }

    // Funciona que invoca los autores desde la API
    async function cargarAutores(){
        try{
            let res = await axios(api2)// Solicitud GET hacia endpoint de autores
            let data = await res.data// Convertimos el resultado en objeto

            setAutores(data)// Asignamos los datos devueltos por la API hacia el estado de autores
        }
        catch(error){
            alert(error)// Mostramos el mensaje de error
            console.log(error)
        }
    }

    // Previene el submit
    // Invoca la validacion
    // Invocar las funciones de guardar, editar, eliminar
    function enviar(e){
        const form = document.querySelector(".needs-validation")// Seleccionamos el formulario

        // Detenemos el submit
        e.preventDefault()
        e.stopPropagation()

        // Verificamos si el formulario es invalido
        if(!form.checkValidity()){
            form.classList.add('was-validated')
        }
        // Verificamos si cumple la expresion regular de Edicion e ISBN
        else if(validarEdicion() === true && validarISBN()===true){
            //console.log("Formulario validado")
            // Guardado, edicion, eliminacion

            // Verificamos si el ID es igual a undefined, si esto es cierto significa que es un registro nuevo
            if(id === undefined){
                guardar()
            }
            else if(del !== true){
                editar()
            }
            else{
                let respuesta = window.confirm("Esta seguro que desea eliminar")
                
                if(respuesta === true){
                    eliminar()
                }
            }
            
        }
    }

    async function eliminar(){
        try{
            // Hacemos una solitud DELETE al endpoint de libros
            let res = await axios.delete(`${api}?id=${id}`)
            let data = await res.data// Convertimos el resutlado en un objeto

            // Verificamos si la API en status devolvio 1
            if(data.status === 1){
                alert(data.message)// Mostramos el mensaje devuelto por la API
                navigate("/libros")// Redireccionamos a la tabla donde se muestran los libros
            }
        }
        catch(error){
            // Verificamos si no se encontro el libro a eliminar
            if(error.response.status === 404){
                alert("El libro ya fue eliminado")
                navigate("/libros")
            }
            else{
                // Otro tipo de error
                alert(error)
                console.log(error)
            }
        }
    }

    async function editar(){
        try{
            // Construimos el objeto libro
            let libro = {
                libroID: id,
                titulo: titulo,
                descripcion: descripcion,
                edicion: edicion,
                isbn: isbn,
                autorId: autorId
            }

            // Hacemos la solicitud PUT hacia endpoint de libros y le enviamos el objeto libro
            let res = await axios.put(api, libro)
            let data = res.data// Convertimos el resultado a objeto

            // Verificamos si la api en status a devuelto 1
            if(data.status === 1){
                alert(data.message)// Mostramos el mensaje devuelto por la API
                navigate("/libros")// Redireccionamos hacia la tabla donde se muestran los libros
            }
        }
        catch(error){
            // Verificamos si el libro dio error de que no existe
            if(error.response.status === 500){
                alert("El libro ya no existe")
                navigate("/libros")
            }
            else{
                // Otro tipo de error
                alert(error)
                console.log(error)
            }
        }
    }


    // Funcion asincrona que hace una solicitud POST al endpoint de libros
    async function guardar(){
        try{
            // Construimos el objeto que le enviaremos a la API
            let libro = {
                titulo: titulo,
                descripcion: descripcion,
                edicion: edicion,
                isbn: isbn,
                autorId: autorId
            }

            // Realizo la solicitud POSt y le paso el objeto libro
            let res = await axios.post(api, libro)
            let data = res.data// Convertimos el resultado en un objeto

            // Verificamos si la API en el campo status a devuelto 1
            if(data.status === 1){
                alert(data.message)// Mostramos el mensaje devuelto por la API
                navigate("/libros")// Redireccionamos a la tabla principal donde se muestran los libros
            }
        }
        catch(error){
            // Mostrar un mensaje de error
            alert(error)
            console.log(error)
        }
    }

    function validarISBN(){
        //    0-9767736-6-X
        //978-0-9767736-6-5
        //let expresion = "^[0-9]-[0-9]{7}-[0-9]-[0-9]$"
        //let expresion = "^[0-9]{3}-[0-9]-[0-9]{7}-[0-9]-[0-9]$"
        let expresion = "^([0-9]{3}-)?[0-9]-[0-9]{7}-[0-9]-[0-9]$"
        const expr = new RegExp(expresion)// Creamos el objeto RegExp

        let result = expr.test(isbn)// Invocamos la funcion test y le enviamos el valor a evaluar

        // Verificamos si no se cumple la expresion regular
        if(!result)
            setValidIsbn("is-invalid")// Agregamos el is-invalid el cual se agrega al campo ISBN
        else// Significa que si se cumplio la expresion regular
            setValidIsbn("")// Le quitamos el is-invalid al campo ISBN

            return result// Devolvemos el resultado
    }

    function validarEdicion(){
        let expresion = "^[0-9]+$"// Expresion regular para validar si es un digito
        const expr = new RegExp(expresion)// Creamos el objeto para RegExp

        let result = expr.test(edicion)// Evaluamos la expresion regular con respecto al campo edicion

        // Verificamos sino se cumple la expresion regular
        if(!result)
            setValidEdicion("is-invalid")// Agregamos is-invalid al campo relacionado con edicion
        else// Significa que la expresion regular se cumple
            setValidEdicion("")// Le quitamos el is-invalid al campo relacion con edicion

        return result// Devolvemos el resultado de la evluacion de la expresion regular
    }

    return(
        <div>
            <form className="needs-validation" noValidate>
                {
                    id === undefined ?
                    ""
                    :
                    <div className="form-group mt-3">
                        <label>Libro ID</label>
                        <input className="form-control" value={id} disabled />
                     </div>
                    }
                
                <div className="form-group mt-3">
                    <label className="form-label">Titulo:</label>
                    <input type="text" value={titulo} className="form-control" disabled={del === undefined ? false : true} onChange={(e) => setTitulo(e.target.value)} required />
                    <div className="invalid-feedback">Campo obligatorio</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" type="text" value={descripcion} disabled={del === undefined ? false : true} onChange={(e) => setDescripcion(e.target.value)} required />
                    <div className="invalid-feedback">Campo obligatorio</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Edición</label>
                    <input className={`form-control ${validEdicion}`} type="text" value={edicion} disabled={del === undefined ? false : true} onKeyUp={validarEdicion} onChange={(e) => setEdicion(e.target.value)} required />
                    <div className="invalid-feedback">Campo obligatorio (debe ser un número)</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">ISBN</label>
                    <input className={`form-control ${validIsbn}`} type="text" value={isbn} onKeyUp={validarISBN} disabled={del === undefined ? false : true} onChange={(e) => setIsbn(e.target.value)} required />
                    <div className="invalid-feedback">Campo obligatorio formato 10: #-#######-#-#  o  formato 13: ###-#-#######-#-#</div>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Autor</label>
                    <select value={autorId} onChange={(e) => setAutorId(e.target.value)} disabled={del===undefined ? false : true} className="form-select" required>
                        <option value="">No seleccionado</option>
                        {
                            autores === undefined ?
                            ""
                            :
                            autores.map((value, index) =>{
                                return <option key={index} value={value.autorId}>{value.nombre} {value.apellido}</option>
                            })
                        }
                    </select>
                    <div className="invalid-feedback">Campo obligatorio</div>
                </div>
                <div className="mt-3">
                    <button className={`btn btn-${(id === undefined ? "success" : del===true ? "danger" : "primary")}`} onClick={(e) => enviar(e)}><i className={id === undefined ? "fa-solid fa-floppy-disk" : del===true ? "fa-solid fa-trash" : "fa-solid fa-pen-to-square"}></i> {id === undefined ? "Guardar" : del===true ? "Eliminar" : "Editar"}</button>
                    <button className="btn btn-warning" onClick={() => navigate("/libros")}><i className="fa-solid fa-xmark"></i> Cancelar</button>
                </div>
                
            </form>
        </div>
    )
}

export default LibrosFORM