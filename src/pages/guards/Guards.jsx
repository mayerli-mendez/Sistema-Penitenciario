import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Guards = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const urlActual = location.pathname;

	console.log(Guards);
	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
						<i className="bi bi-shield-shaded"></i> ADMINISTRACIÓN{" "}
						<small>DE GUARDIAS</small>
					</h1>
				</div>
				<p className="lead">
				El guardia de seguridad , persona cuya labor es salvaguardar
				bienes de los prisioneros y del sistema penitenciario.
				</p>
			</div>

			<div className="container-fluid">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/guards" className={`${urlActual === '/guards' ? ' btn-success': 'btn-outline-success'} btn `}>
							<i className="bi bi-list-check"></i> &nbsp;LISTA DE GUARDIAS
						</Link>
					</li>
					<li>
						<Link to="/guards/create" className={`${urlActual === '/guards/create' ? ' btn-info': 'btn-outline-info'} btn `}>
							<i className="zmdi zmdi-plus"></i> &nbsp; NUEVO GUARDIA
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);
};
