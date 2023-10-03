import React from "react";
import { Link } from "react-router-dom";

function Tabla({cols, list, controlador}){
    

    return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>
                            <Link className="btn btn-success" to={`/${controlador}/add`}>New</Link>
                        </th>
                        {
                            cols.map((value, index) => {
                                return <th key={index}>{value}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                        {
                            list.map((item, index) =>{
                                return <tr key={index}>
                                    <td>
                                        <Link to={`/${controlador}/edit/${Object.values(item)[0]}`} className="btn btn-primary">Edit</Link>
                                        <Link  to={`/${controlador}/delete/${Object.values(item)[0]}`} className="btn btn-danger">Delete</Link>
                                    </td>
                                    {
                                        Object.values(item).map((value, index2) =>{
                                            return <td key={index2}>{value}</td>
                                        })
                                    }
                                </tr>
                            })
                        }
                </tbody>
                <tfoot>
                        <tr>
                            <td></td>
                        {
                            cols.map((value, index) => {
                                return <th key={index}>{value}</th>
                            })
                        }
                        </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Tabla