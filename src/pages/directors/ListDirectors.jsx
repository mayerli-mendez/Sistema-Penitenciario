import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

export const ListDirectors = () => {

  const navigate = useNavigate();
  const [directors, setDirectors] = useState([]);
  const token = localStorage.getItem('token');


  const getDirectors = async () => {
    try {
      const response = await axios.get(
        'https://apiterminado.herokuapp.com/api/v1/director',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.users)
      setDirectors(response.data.data.users)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteDirector = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("¿Estas seguro ?")
      if (confirmation) {
        await axios.get(
          `https://apiterminado.herokuapp.com/api/v1/director/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getDirectors();
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getDirectors();
  }, [])

  return (
    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <div className="panel-heading bg-success">
            <h3 className="panel-title text-light "><i className="zmdi zmdi-format-list-bulleted"></i> &nbsp; LISTA DE DIRECTORES</h3>
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
                    directors.map((director, index) => (
                      <tr key={director.id}>
                        <td>{++index}</td>
                        <td>{director.username}</td>
                        <td>{director.full_name}</td>
                        <td>{director.email}</td>
                        
                        <td>
                          <Link to={`/directors/show/${director.id}`} className="btn btn-warning btn-raised btn-xs">
                            <i className="bi bi-file-earmark-person-fill"></i>
                          </Link>
                        </td>
                        <td>
                          {/* Agregar :id en la ruta */}
                          <Link to={`/directors/edit/${director.id}`} className="btn btn-info btn-raised btn-xs">
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                        <td>
                          <form>
                            <a  type="submit" onClick={() => { deleteDirector(director.id) }} className={`btn ${director.state ? ' btn-success' : 'btn-danger'} btn-raised btn-xs`}>
                              {director.state ? <i className="bi bi-person-check-fill"></i> :
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
