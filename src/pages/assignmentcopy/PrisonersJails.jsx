import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
import axios from 'axios';

export const PrisonersJails = () => {

  const navigate = useNavigate();
  const [PrisionerJails, setPrisonersJails] = useState([]);
  const token = localStorage.getItem('token');


  const getPrisionerJails = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/prsionjails',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.users)
      setPrisonersJails(response.data.data.users)
    } catch (error) {
      console.log(error);
    }
  }

  const deletePrisionerJails = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Are you sure?")
      if (confirmation) {
        await axios.get(
          `http://127.0.0.1:8000/api/v1/prsionjails/${id}/destroy`,
          { headers: { 'accept': 'application/json', 'authorization': token } }
        );
        await getPrisionerJails();
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getPrisionerJails();
  }, [])

  return (
    <div>
      <div className="container-fluid">
        <div className="panel panel-success ">
          <div className="panel-heading bg-info">
            <h3 className="panel-title text-light "><i className="bi bi-incognito"></i> + <i className="bi bi-view-stacked"></i> &nbsp; ASIGNACION DE PRISIONEROS A PABELLON</h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Nombre de Pricionero</th>
                    <th className="text-center"></th>
                    <th className="text-center">ID</th>
                    <th className="text-center">Nombre del Pabellón</th>
                    <th className="text-center">Modificar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Bebesita</td>
                    <td>    </td>
                    <td>3</td>
                    <td>San roque</td>
                    <td>
                      {/* Agregar :id en la ruta */}
                      <Link to="/Dashboard/assignment/prisoners-and-jails/modificar" className="btn btn-warning btn-raised btn-xs">
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <nav className="text-center">
              <ul className="pagination pagination-sm">
                <li className="disabled"><a href="javascript:void(0)">«</a></li>
                <li className="active"><a href="javascript:void(0)">1</a></li>
                <li><a href="javascript:void(0)">2</a></li>
                <li><a href="javascript:void(0)">3</a></li>
                <li><a href="javascript:void(0)">4</a></li>
                <li><a href="javascript:void(0)">5</a></li>
                <li><a href="javascript:void(0)">»</a></li>
              </ul>
            </nav> */}
          </div>
        </div>
      </div>
      
      <Outlet/>

      {/* LIST VIEJO COPIAR LA GUNCIONALIDAD */}
      <h1 className='font-black text-4xl text-sky-900'>PrisionerJails</h1>
      <hr className='mt-3' />
      <p className='mt-3'>List of created PrisionerJails</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-sky-900 text-white'>
          <tr>
            <th className='p-2'>#</th>
            <th className='p-2'>Username</th>
            <th className='p-2'>Full Name</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>State</th>
            <td className='p-2'></td>
          </tr>
        </thead>
        <tbody>
          {
            PrisionerJails.map((prsionjails, index) => (
              <tr key={prsionjails.id} className="border-b hover:bg-gray-100">
                <td className='p-3'>{++index}</td>
                <td className='p-3'>{prsionjails.username}</td>
                <td className='p-3'>{prsionjails.full_name}</td>
                <td className='p-3'>{prsionjails.email}</td>
                <td className='p-3'>{prsionjails.state ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-900 font-bold">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-900 font-bold">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                }</td>
                <td className='p-3'>
                  <button type='button' className='bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl'
                    onClick={() => navigate(`/PrisionerJails/show/${prsionjails.id}`)}>Show</button>
                  <button type='button' className='bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                    onClick={() => navigate(`/PrisionerJails/edit/${prsionjails.id}`)}>Edit</button>

                  <button type='button' className={`${prsionjails.state ? 'bg-red-800' : 'bg-green-800 '} block w-full text-white p-2 uppercase font-bold text-xs rounded-xl`}
                    onClick={() => { deletePrisionerJails(prsionjails.id) }}>{prsionjails.state ? 'Inactive' : 'Active'}</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
