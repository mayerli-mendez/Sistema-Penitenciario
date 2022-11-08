import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const JailForm = ({ jail }) => {
    
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        name: jail?.name ?? "",
        code: jail?.code ?? "",
        type: jail?.type ?? "",
        ward_id: jail?.ward?.id ?? "",
        capacity: jail?.capacity ?? "",
        description: jail?.description ?? "",
        
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
            console.log(jail.ward)
            if (jail?.id) {
                await axios.post(
                    `https://apiterminado.herokuapp.com/api/v1/jail/${jail.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `https://apiterminado.herokuapp.com/api/v1/jail/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/jails');

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
                        <legend><i className="bi bi-bank2"></i> &nbsp; Información de la celda</legend>
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='code' className="control-label">Codigo *</label>
                                        <input
                                            className="form-control"
                                            id='code'
                                            type="text"
                                            placeholder='Nombre'
                                            name='code'
                                            value={form.code}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='name' className="control-label">Nombre *</label>
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
                                        <label htmlFor='type' className="control-label">Tipo *</label>
                                        <input
                                            className="form-control"
                                            id='type'
                                            type="text"
                                            placeholder='Tipo'
                                            name='type'
                                            value={form.type}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='capacity' className="control-label">Capacidad *</label>
                                        <input
                                            className="form-control"
                                            id='capacity'
                                            type="number"
                                            placeholder='Capacidad'
                                            name='capacity'
                                            value={form.capacity}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='ward_id' className="control-label">Id del pabellon *</label>
                                        <input
                                            className="form-control"
                                            id='ward_id'
                                            type="number"
                                            placeholder='Id del pabellon'
                                            name='ward_id'
                                            value={form.ward_id}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='last_name' className="control-label">Descripcion *</label>
                                        <textarea
                                            className="form-control"
                                            placeholder='Descripción'
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
                        <button value={jail?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn btn-info btn-raised btn-sm"><i className="zmdi zmdi-floppy"></i> GUARDAR</button>
                    </p>
                </form>
            </div>


        </>

    )
}
