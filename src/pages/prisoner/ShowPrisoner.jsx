import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShowPrisoner = () => {
    const { id } = useParams();
    const [prisoner, setPrisoner] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getPrisoner = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/prisoner/${id}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const user = { ...response.data.data.user, id };
                setPrisoner(user);
            } catch (error) {
                console.log(error);
            }
        };
        getPrisoner();
    }, []);

    return (
        <div>
        <div className="container-fluid">
            <div className="panel panel-info">
                <div className="panel-heading bg-warning">
                    <h3 className="panel-title text-light">
                        <i className="bi bi-file-earmark-person-fill"></i> &nbsp; DETALLES DE PRISIONERO
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        {Object.keys(prisoner).length > 0 ? (
                            <div className="col-xs-12 ">
                                <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información personal</legend>
                                <p className="">
                                    <span className="">
                                        <strong> Nombre de usuario:</strong>{" "}
                                    </span>
                                    {prisoner.username}
                                </p>
                                <p className="">
                                    <span className="">
                                        <strong> Nombre: </strong>{" "}
                                    </span>
                                    {prisoner.first_name}
                                </p>
                                <p className="">
                                    <span className="">
                                        <strong>Apellido:</strong>{" "}
                                    </span>
                                    {prisoner.last_name}
                                </p>
                                <p className="">
                                    <span className="">
                                        <strong> Correo:</strong>{" "}
                                    </span>
                                    {prisoner.email}
                                </p>
                                <p className="">
                                    <span className="">
                                        <strong>Telefono Celular:</strong>{" "}
                                    </span>
                                    {prisoner.phone_number}
                                </p>
                                <p className="">
                                    <span className="">
                                        <strong>Estado:</strong>{" "}
                                    </span>
                                    {prisoner.state ? "Active" : "Inactive"}
                                </p>
                                <p className="">
                                    <span className="">
                                        <strong>Cumpleaños:</strong>{" "}
                                    </span>
                                    {prisoner.birthdate ? prisoner.birthdate : "N/A"}
                                </p>
                                <p className="">
                                    <span className="">
                                        <strong>Teléfono de domicilio:</strong>{" "}
                                    </span>
                                    {prisoner.home_phone
                                        ? prisoner.home_phone
                                        : "N/A"}
                                </p>
                            </div>)
                            : (
                                <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">
                                    No hay datos para este prisoner
                                </p>
                            )}
                    </div>
                </div>
            </div>
        </div>

    </div>
    );
};
