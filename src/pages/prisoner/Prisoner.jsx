import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Prisoner = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const urlActual = location.pathname;

	console.log(Prisoner);
	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
						<i className="bi bi-incognito"></i> ADMINISTRACIÓN{" "}
						<small>DE PRISIONEROS</small>
					</h1>
				</div>
				<p className="lead">
					Es una persona que está privada de su libertad y que es
					obligada a permanecer en un lugar de encierro.
				</p>
			</div>

			<div className="container-fluid">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/prisoners" className={`${urlActual === '/prisoners' ? ' btn-success': 'btn-outline-success'} btn `}>
							<i className="bi bi-list-check"></i> &nbsp;LISTA DE PRISIONEROS
						</Link>
					</li>
					<li>
						<Link to="/prisoners/create" className={`${urlActual === '/prisoners/create' ? ' btn-info': 'btn-outline-info'} btn `}>
							<i className="zmdi zmdi-plus"></i> &nbsp; NUEVO PRISIONERO
						</Link>
					</li>
					<li>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);
};
