import React from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Assignments = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const urlActual = location.pathname;

	console.log(Assignments);
	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					<h1 className="text-titles">
						<i className="bi bi-person-lines-fill"></i> Administracion{" "}
						<small>DE ASIGNACION</small>
					</h1>
				</div>
				<p className="lead">
					Asignar de guardias a celdas y 
					de  prisionero a un pabelllon con el objetivo de  
					mantener el orden del centro peitenciario. 
				</p>
			</div>

			<div className="container-fluid">
				<ul className="breadcrumb breadcrumb-tabs">
					<li>
						<Link to="/Dashboard/assignment/guards-and-wards" className={`${urlActual === '/Dashboard/assignment/guards-and-wards' ? ' btn-primary': 'btn-outline-primary'} btn `}>
							<i className="bi bi-shield-shaded "></i> + <i className="bi bi-bank2"></i> &nbsp;ASIGNAR GUARDIA A CELDA
						</Link>
					</li>
					<li>
						<Link to="/Dashboard/assignment/prisoners-and-jails" className={`${urlActual === '/Dashboard/assignment/prisoners-and-jails' ? ' btn-info': 'btn-outline-info'} btn `}>
						<i className="bi bi-incognito"></i> + <i className="bi bi-view-stacked"></i>  &nbsp; ASIGNAR PRISIONERO A PABELLON 
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
		</>
	);
};
