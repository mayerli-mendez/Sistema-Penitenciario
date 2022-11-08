import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const GuardFrom = ({ guard }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        first_name: guard?.first_name ?? "",
        last_name: guard?.last_name ?? "",
        username: guard?.username ?? "",
        email: guard?.email ?? "",
        personal_phone: guard?.personal_phone ?? "",
        home_phone: guard?.home_phone ?? "",
        address: guard?.address ?? ""
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
            console.log(guard)
            if (guard?.id) {
                await axios.post(
                    `https://apiterminado.herokuapp.com/api/v1/guard/${guard.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `https://apiterminado.herokuapp.com/api/v1/guard/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/guards');

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
                        <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información personal</legend>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='first_name' className="control-label">Nombres *</label>
                                        <input
                                            className="form-control"
                                            id='first_name'
                                            type="text"
                                            placeholder='Nombre'
                                            name='first_name'
                                            value={form.first_name}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='last_name' className="control-label">Apellidos *</label>
                                        <input
                                            id='last_name'
                                            type="text"
                                            className="form-control"
                                            placeholder='Apellido'
                                            name='last_name'
                                            value={form.last_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='personal_phone' className="control-label">Teléfono</label>
                                        <input
                                            className="form-control"
                                            id='personal_phone'
                                            type="tel"
                                            name='personal_phone'
                                            placeholder='Telefono'
                                            value={form.personal_phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='home_phone' className="control-label">Telédono de Casa</label>
                                        <input
                                            className="form-control"
                                            id='home_phone'
                                            type="tel"
                                            name='home_phone'
                                            placeholder='Telefono de casa'
                                            value={form.home_phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <div className="form-group label-floating">
                                        <label htmlFor='address' className="control-label">Dirección</label>
                                        <textarea
                                            className="form-control"
                                            placeholder='Dirrecion'
                                            name='address'
                                            value={form.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <br />
                    <fieldset>
                        <legend><i className="zmdi zmdi-key"></i> &nbsp; Datos de la cuenta</legend>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='username' className="control-label">Nombre de usuario *</label>
                                        <input
                                            className="form-control"
                                            id='username'
                                            type="username"
                                            placeholder='Nombre de usuario'
                                            name='username'
                                            value={form.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <div className="form-group label-floating">
                                        <label htmlFor='email' className="control-label">E-mail</label>
                                        <input
                                            className="form-control"
                                            id='email'
                                            type="email"
                                            name='email'
                                            placeholder='Correo'
                                            value={form.email}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <p className="text-center">
                        <button value={guard?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn btn-info btn-raised btn-sm"><i className="zmdi zmdi-floppy"></i> GUARDAR</button>
                    </p>
                </form>
            </div>
        </>

    )
}
