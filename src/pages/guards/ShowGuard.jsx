import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShowGuard = () => {
    const { id } = useParams();
    const [guard, setGuard] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getGuard = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/guard/${id}`,
                    { headers: { 'accept': "application/json", 'authorization': token } }
                );
                const user = { ...response.data.data.user, id };
                setGuard(user);
            } catch (error) {
                console.log(error);
            }
        };
        getGuard();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-warning">
                        <h3 className="panel-title text-light">
                            <i className="bi bi-file-earmark-person-fill"></i> &nbsp; DETALLES DEL GUARDIA
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                        {Object.keys(guard).length > 0 ? (
                                <div className="col-xs-12 ">
                                    <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información personal</legend>
                                    <p className="">
                                        <span className="">
                                            <strong> Nombre de usuario:</strong>{" "}
                                        </span>
                                        {guard.username}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong> Nombre: </strong>{" "}
                                        </span>
                                        {guard.first_name}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong>Apellido:</strong>{" "}
                                        </span>
                                        {guard.last_name}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong> Correo:</strong>{" "}
                                        </span>
                                        {guard.email}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong>Telefono Celular:</strong>{" "}
                                        </span>
                                        {guard.phone_number}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong>Estado:</strong>{" "}
                                        </span>
                                        {guard.state ? "Active" : "Inactive"}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong>Cumpleaños:</strong>{" "}
                                        </span>
                                        {guard.birthdate ? guard.birthdate : "N/A"}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong>Teléfono de domicilio:</strong>{" "}
                                        </span>
                                        {guard.home_phone
                                            ? guard.home_phone
                                            : "N/A"}
                                    </p>
                                </div>)
                                : (
                                    <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">
                                        No hay datos para este Guardia
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

            
