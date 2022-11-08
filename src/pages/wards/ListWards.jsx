import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

export const ListWards = () => {

  const navigate = useNavigate();
  const [wards, setWards] = useState([]);
  const token = localStorage.getItem('token');


  const getWards = async () => {
    try {
      const response = await axios.get(
        'https://apiterminado.herokuapp.com/api/v1/ward',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.wards)
      setWards(response.data.data.wards)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteWard = async (id) => {
    try {
      console.warn(id);
      console.log(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("¿Estas seguro?")
      if (confirmation) {
        await axios.get(
          `https://apiterminado.herokuapp.com/api/v1/ward/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getWards();
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getWards();
  }, [])

  return (
    <div className="container-fluid">
      <div className="panel panel-success ">
        <div className="panel-heading bg-success">
          <h3 className="panel-title text-light "><i className="zmdi zmdi-format-list-bulleted"></i> &nbsp; LISTA DE PABELLONES</h3>
        </div>
        <div className="panel-body">


          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Nombre Pabellon</th>
                  <th className="text-center">Descripción</th>
                  <th className="text-center">Mostrar</th>
                  <th className="text-center">Editar</th>
                  <th className="text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {
                  wards.map((ward, index) => (
                    <tr key={ward.id}>
                      <td>{++index}</td>
                      <td>{ward.name}</td>
                      <td>{ward.description}</td>
                    

                      <td>
                        <Link to={`/wards/show/${ward.id}`} className="btn btn-warning btn-raised btn-xs">
                          <i className="bi bi-file-earmark-text-fill"></i>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/wards/edit/${ward.id}`} className="btn btn-info btn-raised btn-xs">
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                      </td>
                      <td>
                        <form>
                          <a type="submit" onClick={() => { deleteWard(ward.id) }} className={`btn ${ward.state ? ' btn-success' : 'btn-danger'} btn-raised btn-xs`}>
                            {ward.state ? <i className="bi bi-check2-square"></i> :
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
