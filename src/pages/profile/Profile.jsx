import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

export const Profile = () => {

	const navigate = useNavigate();
	const [report, setReport] = useState([]);
	const token = localStorage.getItem('token');


	const getReport = async () => {
		try {
			const response = await axios.get(
				'http://127.0.0.1:8000/api/v1/reporte',
				{ headers: { 'accept': 'application/json', 'authorization': token } }
			);
			console.log(response.data.data.users)
			setReport(response.data.data.users)
		} catch (error) {
			console.log(error);
		}
	}

	const deleteReport = async (id) => {
		try {
			console.warn(id);
			// eslint-disable-next-line no-restricted-globals
			const confirmation = confirm("Are you sure?")
			if (confirmation) {
				await axios.get(
					`http://127.0.0.1:8000/api/v1/reporte/${id}/destroy`,
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
		<>
			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles"><i className="zmdi zmdi-account-circle zmdi-hc-fw"></i> MIS DATOS</h1>
				</div>
				<p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse voluptas reiciendis tempora voluptatum eius porro ipsa quae voluptates officiis sapiente sunt dolorem, velit quos a qui nobis sed, dignissimos possimus!</p>
			</div>


			<div className="container-fluid ">
				<div className="panel panel-success ">
					<div className="panel-heading bg-success">
						<h3 className="panel-title text-light"><i className="zmdi zmdi-refresh"></i> &nbsp; MIS DATOS</h3>
					</div>
					<div className="panel-body">
						<form>
							<fieldset>
								<legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información personal</legend>
								<div className="container-fluid">
									<div className="row">
										<div className="col-xs-12">
											<div className="form-group label-floating">
												<label className="control-label">DNI/CEDULA *</label>
												<input pattern="[0-9-]{1,30}" className="form-control" type="text" name="dni-up" required="" maxLength="30" />
											</div>
										</div>
										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">
												<label className="control-label">Nombres *</label>
												<input pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,30}" className="form-control" type="text" name="nombre-up" required="" maxLength="30" />
											</div>
										</div>
										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">
												<label className="control-label">Apellidos *</label>
												<input pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,30}" className="form-control" type="text" name="apellido-up" required="" maxLength="30" />
											</div>
										</div>
										<div className="col-xs-12 col-sm-6">
											<div className="form-group label-floating">
												<label className="control-label">Teléfono</label>
												<input pattern="[0-9+]{1,15}" className="form-control" type="text" name="telefono-up" maxLength="15" />
											</div>
										</div>
										<div className="col-xs-12">
											<div className="form-group label-floating">
												<label className="control-label">Dirección</label>
												<textarea name="direccion-up" className="form-control" rows="2" maxLength="100"></textarea>
											</div>
										</div>
									</div>
								</div>
							</fieldset>
							<br />
							<fieldset>
								<legend><i className="zmdi zmdi-attachment-alt"></i> &nbsp; Avatar </legend>
								<div className="col-xs-12">
									<div className="form-group">
										<label className="control-label">Imágen</label>
										<input type="file" name="imagen-up" className='form-control' accept=".jpg, .png, .jpeg"/>
											<span><smallspan>Tamaño máximo de los archivos adjuntos 5MB. Tipos de archivos permitidos imágenes: PNG, JPEG y JPG</smallspan></span>
									</div>
								</div>
							</fieldset>
							<p className="text-center">
								<button type="submit" className="btn btn-success btn-raised btn-sm"><i className="zmdi zmdi-refresh"></i> Actualizar</button>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}