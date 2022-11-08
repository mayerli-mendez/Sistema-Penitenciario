import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ReportForm = ({ report }) => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    
    const [form, setForm] = useState({
        title: report?.title ?? "",
        description: report?.description ?? "",
        image: report?.image ?? "",
    });
    
    form.image = '';

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
            console.log(report)
            if (report?.id) {
                await axios.post(
                    `https://apiterminado.herokuapp.com/api/v1/report/${report.id}/update`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            } else {
                await axios.post(
                    `https://apiterminado.herokuapp.com/api/v1/report/create`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': token } }
                );
            }
            navigate('/reports');

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
                    <fieldset className='col-xs-12 col-sm-6'>
                        <legend><i className="bi bi-file-earmark-richtext-fill"></i> &nbsp; Información del reporte</legend>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="form-group label-floating">
                                        <label htmlFor='title' className="control-label">Titulo *</label>
                                        <input
                                            className="form-control"
                                            id='title'
                                            type="text"
                                            placeholder='Titulo'
                                            name='title'
                                            value={form.title}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <div className="form-group label-floating">
                                        <label htmlFor='description' className="control-label">Descripcion *</label>
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
                    <fieldset className='col-xs-12 col-sm-6'>
                        <legend><i className="zmdi zmdi-attachment-alt"></i> &nbsp; Imágen </legend>
                        <div className="col-xs-12">
                            <div className="form-group">
                                <label htmlFor='imagen' className="control-label">Imágen</label>
                                <input
                                    id='imagen'
                                    type="file"
                                    name="imagen"
                                    placeholder='imagen'
                                    value={form.image}
                                    className='form-control'
                                    accept=".jpg, .png, .jpeg" 
                                    onChange={handleChange}
                                    required />
                                <span><smallspan>Inserte la URL de la imagen</smallspan></span>
                            </div>
                        </div>
                    </fieldset>
                    <p className="text-center">
                        <button value={report?.id ? 'Actualizar' : 'Guardar'} type="submit" className="btn btn-info btn-raised btn-sm"><i className="zmdi zmdi-floppy"></i> GUARDAR</button>
                    </p>
                </form>
            </div>

        </>

    )
}
