import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Directors = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const urlActual = location.pathname;

	console.log(Directors);
	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
						<i className="bi bi-person-lines-fill"></i> Usuarios{" "}
						<small>DIRECTOR</small>
					</h1>
				</div>
				<p className="lead">
				Los directores de prisión son los gerentes operativos 
				de Instituciones Penitenciarias y son responsables de 
				la administración y buen funcionamiento de un centro penitenciario.
				</p>
			</div>

			<div className="container-fluid">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/directors" className={`${urlActual === '/directors' ? ' btn-success': 'btn-outline-success'} btn `}>
							<i className="bi bi-list-check"></i> &nbsp;LISTA DE DIRECTORES
						</Link>
					</li>
					<li>
						<Link to="/directors/create" className={`${urlActual === '/directors/create' ? ' btn-info': 'btn-outline-info'} btn `}>
							<i className="zmdi zmdi-plus"></i> &nbsp; NUEVO DIRECTOR
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);
};
