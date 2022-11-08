import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Wards = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const urlActual = location.pathname;

	console.log(Wards);
	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
						<i className="bi bi-view-stacked"></i> Administrar{" "}
						<small>PABELLONES</small>
					</h1>
				</div>
				<p className="lead">
				El objetivo principal de los prisioneros. Es mantener distanciado las organizaciones.
				</p>
			</div>

			<div className="container-fluid">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/wards" className={`${urlActual === '/wards' ? ' btn-success': 'btn-outline-success'} btn `}>
							<i className="bi bi-list-check"></i> &nbsp;LISTA DE PABELLONES
						</Link>
					</li>
					<li>
						<Link to="/wards/create" className={`${urlActual === '/wards/create' ? ' btn-info': 'btn-outline-info'} btn `}>
							<i className="zmdi zmdi-plus"></i> &nbsp; NUEVO PABELLON
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);
};
