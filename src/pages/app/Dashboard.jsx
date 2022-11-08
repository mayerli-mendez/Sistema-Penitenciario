import React from 'react'
import axios from 'axios';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../contexts';


export const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const urlActual = location.pathname;
    const { user, logout } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const onLogout = async () => {
        try {
            await axios.post(
                'https://apiterminado.herokuapp.com/api/v1/logout',
                {}, { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            navigate('/login', { replace: true });
            logout();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <section className="full-box dashboard-sideBar" >
                <div className="full-box dashboard-sideBar-bg btn-menu-dashboard"></div>
                <div className="full-box dashboard-sideBar-ct">

                    <div className="full-box text-uppercase text-center text-titles dashboard-sideBar-title">
                        Sistema Carcelario <i className="zmdi zmdi-close btn-menu-dashboard visible-xs"></i>
                    </div>

                    <div className="full-box dashboard-sideBar-UserInfo">
                        <figure className="full-box">
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                            {<figcaption className="text-center text-titles">{user.full_name}</figcaption>}
                            <p className="text-center"><small>{user.role}</small></p>
                        </figure>
                        <ul className="full-box list-unstyled text-center">

                            <li>
                                <a onClick={onLogout} className="">
                                    <i className="zmdi zmdi-power"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <ul className="list-unstyled full-box dashboard-sideBar-Menu">
                        <li>
                            <Link to='/'>
                                <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"></i> Inicio
                            </Link>
                        </li>
                        <li>
                            <a href="" className="btn-sideBar-SubMenu ">
                                <i className="zmdi zmdi-case zmdi-hc-fw"></i> Administración <i className="zmdi zmdi-caret-down pull-right"></i>
                            </a>
                            <ul className="list-unstyled full-box dashboard-sideBar-Menu">
                                <li>
                                    <Link to="/reports"><i className="bi bi-file-earmark-richtext-fill"></i> Reporte</Link>
                                </li>
                                <li>
                                    <Link to="/wards"><i className="bi bi-view-stacked"></i> Pabellones</Link>
                                </li>
                                <li>
                                    <Link to="/jails"><i className="bi bi-bank2"></i> Carceles</Link>
                                </li>
                                {/* <li>
                                    <Link to="/assignment"><i className="bi bi-pass-fill"></i> Asignacion</Link>
                                </li> */}
                            </ul>
                        </li>
                        <li>
                            <a href="" className="btn-sideBar-SubMenu">
                                <i className="zmdi zmdi-account-add "></i> Usuarios <i className="zmdi zmdi-caret-down pull-right"></i>
                            </a>
                            <ul className="list-unstyled full-box dashboard-sideBar-Menu">
                                <li>
                                    <Link to="/directors" href="" className=''><i className="bi bi-person-lines-fill"></i> Directores</Link>
                                </li>
                                <li>
                                    <Link to="/guards"><i className="bi bi-shield-shaded "></i> Guardias</Link>
                                </li>
                                <li>
                                    <Link to="/prisoners"><i className="bi bi-incognito"></i> Prisioneros</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>


            <section className="full-box dashboard-contentPage bg-light">

                <nav className="full-box dashboard-Navbar bg-dark">
                    <ul className="full-box list-unstyled text-right">
                        <li className="pull-left">
                            <a href="" className="btn-menu-dashboard"><i class="zmdi zmdi-more-vert"></i></a>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </section>
        </>
    )
}

