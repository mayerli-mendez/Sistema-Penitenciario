import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

export const ListJails = () => {

  const navigate = useNavigate();
  const [jails, setJail] = useState([]);
  const token = localStorage.getItem('token');


  const getJail = async () => {
    try {
      const response = await axios.get(
        'https://apiterminado.herokuapp.com/api/v1/jail',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.jails)
      setJail(response.data.data.jails)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteJail = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("¿Estas seguro ?")
      if (confirmation) {
        await axios.get(
          `https://apiterminado.herokuapp.com/api/v1/jail/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getJail();
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getJail();
  }, [])

  return (
    <div className="container-fluid">
      <div className="panel panel-success ">
        <div className="panel-heading bg-success">
          <h3 className="panel-title text-light "><i className="zmdi zmdi-format-list-bulleted"></i> &nbsp; LISTA DE CELDAS</h3>
        </div>
        <div className="panel-body">


          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Nombre de la celda</th>
                  <th className="text-center">Descripcion</th>
                  <th className="text-center">Mostrar</th>
                  <th className="text-center">Editar</th>
                  <th className="text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {
                  jails.map((jails, index) => (
                    <tr key={jails.id}>
                      <td>{++index}</td>
                      <td>{jails.name}</td>
                      <td>{jails.description}</td>
                      <td>
                        <Link to={`/jails/show/${jails.id}`} className="btn btn-warning btn-raised btn-xs">
                          <i className="bi bi-file-earmark-text-fill"></i>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/jails/edit/${jails.id}`} className="btn btn-info btn-raised btn-xs">
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                      </td>
                      <td>
                        <form>
                          <a type="submit" onClick={() => { deleteJail(jails.id) }} className={`btn ${jails.state ? ' btn-success' : 'btn-danger'} btn-raised btn-xs`}>
                            {jails.state ? <i className="bi bi-check2-square"></i> :
                              <i className="bi bi-x-square"></i>
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
  );
}
