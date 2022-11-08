import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const WardForm = ({ ward }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        name: ward?.name ?? "",
        description: ward?.description ?? "",
        location: ward?.location ?? "",

    });
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(form).includes("")) {
            console.log("error");
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500);
            return;
        }

        try {
            console.log(ward)
            if (ward?.id) {
                await axios.post(
                    `https://apiterminado.herokuapp.com/api/v1/ward/${ward.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `https://apiterminado.herokuapp.com/api/v1/ward/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/wards');

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
      <div className="panel-body">
                <form onSubmit={handleSubmit}>
                    {
                        error && <p className='text-red-700 font-semibold text-xl'>Todos los campos son obligatorios</p>
                    }
                    <fieldset>
                        <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información del Pabellon</legend>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='first_name' className="control-label">Nombre del pabellon *</label>
                                        <input
                                            className="form-control"
                                            id='name'
                                            type="text"
                                            placeholder='Nombre'
                                            name='name'
                                            value={form.name}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='location' className="control-label">Dirección *</label>
                                        <input
                                            className="form-control"
                                            id='location'
                                            type="text"
                                            placeholder='Dirección'
                                            name='location'
                                            value={form.location}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='last_name' className="control-label">Descripcion *</label>
                                        <textarea
                                            className="form-control"
                                            placeholder='Descripcion'
                                            name='description'
                                            value={form.description}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
   
                                
                            </div>
                        </div>
                    </fieldset>
                    <br />
                    <p className="text-center">
                        <button value={ward?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn btn-info btn-raised btn-sm"><i className="zmdi zmdi-floppy"></i> GUARDAR</button>
                    </p>
                </form>
            </div>
     

        </>

    )
}
