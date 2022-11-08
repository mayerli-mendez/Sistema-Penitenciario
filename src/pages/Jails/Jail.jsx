import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Jails = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const urlActual = location.pathname;

	console.log();
	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
						<i className="bi bi-bank2"></i> Administración{" "}
						<small>DE CELDA</small>
					</h1>
				</div>
				<p className="lead">
				Es una pequeña habitación en una prisión donde se encuentra un prisionero.
				Las celdas varían enormementepor su mobiliario, servicios higiénicos y 
				limpieza, tanto entre países como según el nivel de castigo al que se
				ha condenado a la persona detenida. 
				</p>
			</div>

			<div className="container-fluid">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/jails" className={`${urlActual === '/jails' ? ' btn-success': 'btn-outline-success'} btn `}>
							<i className="bi bi-list-check"></i> &nbsp;LISTA DE CELDA
						</Link>
					</li>
					<li>
						<Link to="/jails/create" className={`${urlActual === '/jails/create' ? ' btn-info': 'btn-outline-info'} btn `}>
							<i className="zmdi zmdi-plus"></i> &nbsp; NUEVA CELDA
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);
};
