import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

export const ListPrisoner = () => {

    const navigate = useNavigate();
    const [prisoner, setPrisoner] = useState([]);
    const token = localStorage.getItem('token');


    const getPrisoner = async () => {
        try {
            const response = await axios.get(
                'https://apiterminado.herokuapp.com/api/v1/prisoner',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.users)
            setPrisoner(response.data.data.users)
        } catch (error) {
            console.log(error);
        }
    }

    const deletePrisoner = async (id) => {
        try {
            console.warn(id);
            // eslint-disable-next-line no-restricted-globals
            const confirmation = confirm("¿Estas seguro?")
            if (confirmation) {
                await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/prisoner/${id}/destroy`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                );
                await getPrisoner();
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getPrisoner();
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-success ">
                    <div className="panel-heading bg-success">
                        <h3 className="panel-title text-light "><i className="zmdi zmdi-format-list-bulleted"></i> &nbsp; LISTA DE PRIOSIONEROS</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <table className="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-center">Usuario</th>
                                        <th className="text-center">Nombre</th>
                                        <th className="text-center">Correo</th>
                                        <th className="text-center">Mostra</th>
                                        <th className="text-center">Editar</th>
                                        <th className="text-center">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        prisoner.map((prisoner, index) => (
                                            <tr key={prisoner.id}>
                                                <td>{++index}</td>
                                                <td>{prisoner.username}</td>
                                                <td>{prisoner.full_name}</td>
                                                <td>{prisoner.email}</td>

                                                <td>
                                                    <Link to={`/prisoners/show/${prisoner.id}`} className="btn btn-warning btn-raised btn-xs">
                                                        <i className="bi bi-file-earmark-person-fill"></i>
                                                    </Link>
                                                </td>
                                                <td>
                                                    {/* Agregar :id en la ruta */}
                                                    <Link to={`/prisoners/edit/${prisoner.id}`} className="btn btn-info btn-raised btn-xs">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form>
                                                        <a type="submit" onClick={() => { deletePrisoner(prisoner.id) }} className={`btn ${prisoner.state ? ' btn-success' : 'btn-danger'} btn-raised btn-xs`}>
                                                            {prisoner.state ? <i className="bi bi-person-check-fill"></i> :
                                                                <i className="bi bi-person-x-fill"></i>
                                                            }
                                                        </a>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
