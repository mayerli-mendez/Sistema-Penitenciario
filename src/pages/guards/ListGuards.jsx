import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

export const ListGuards = () => {

  const navigate = useNavigate();
  const [guards, setGuards] = useState([]);
  const token = localStorage.getItem('token');


  const getGuards = async () => {
    try {
      const response = await axios.get(
        'https://apiterminado.herokuapp.com/api/v1/guard',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.users)
      setGuards(response.data.data.users)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteGuard = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("¿Estas seguro?")
      if (confirmation) {
        await axios.get(
          `https://apiterminado.herokuapp.com/api/v1/guard/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getGuards();
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getGuards();
  }, [])

  return (
    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <div className="panel-heading bg-success">
            <h3 className="panel-title text-light "><i className="zmdi zmdi-format-list-bulleted"></i> &nbsp; LISTA DE GUARDIAS</h3>
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
                    guards.map((guard, index) => (
                      <tr key={guard.id}>
                        <td>{++index}</td>
                        <td>{guard.username}</td>
                        <td>{guard.full_name}</td>
                        <td>{guard.email}</td>
                        
                        <td>
                          <Link to={`/guards/show/${guard.id}`} className="btn btn-warning btn-raised btn-xs">
                            <i className="bi bi-file-earmark-person-fill"></i>
                          </Link>
                        </td>
                        <td>
                          {/* Agregar :id en la ruta */}
                          <Link to={`/guards/edit/${guard.id}`} className="btn btn-info btn-raised btn-xs">
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                        <td>
                          <form>
                            <a type="submit" onClick={() => { deleteGuard(guard.id) }} className={`btn ${guard.state ? ' btn-success' : 'btn-danger'} btn-raised btn-xs`}>
                              {guard.state ? <i className="bi bi-person-check-fill"></i> :
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

