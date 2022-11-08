import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

export const ListReport = () => {

  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const token = localStorage.getItem('token');


  const getReport= async () => {
    console.log(reports);
    try {
      const response = await axios.get(
        'https://apiterminado.herokuapp.com/api/v1/report',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(reports);
      console.log(response.data.data.reports);
      setReports(response.data.data.reports);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteReport = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("¿Estas seguro ?")
      if (confirmation) {
        await axios.get(
          `https://apiterminado.herokuapp.com/api/v1/report/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getReport();
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getReport();
  }, [])

  return (
    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <div className="panel-heading bg-success">
            <h3 className="panel-title text-light "><i className="zmdi zmdi-format-list-bulleted"></i> &nbsp; LISTA DE REPORTES</h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Titulo</th>
                    <th className="text-center">Descripcion</th>
                    <th className="text-center">Imagen</th>
                    <th className="text-center">Mostra</th>
                    <th className="text-center">Editar</th>
                    <th className="text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    reports.map((report, index) => (
                      <tr key={report.id}>
                        <td>{++index}</td>
                        <td>{report.title}</td>
                        <td>{report.description}</td>
                        <td><img className='w-10' src={`${report.image}`} alt="" /></td>
                        
                        <td>
                          <Link to={`/reports/show/${report.id}`} className="btn btn-warning btn-raised btn-xs">
                            <i className="bi bi-file-earmark-richtext-fill"></i>
                          </Link>
                        </td>
                        <td>
                          {/* Agregar :id en la ruta */}
                          <Link to={`/reports/edit/${report.id}`} className="btn btn-info btn-raised btn-xs">
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                        <td>
                          <form>
                            <a type="submit" onClick={() => { deleteReport(report.id) }} className={`btn ${report.state ? ' btn-success' : 'btn-danger'} btn-raised btn-xs`}>
                              {report.state ? <i className="bi bi-person-check-fill"></i> :
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
