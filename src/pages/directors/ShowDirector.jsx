import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShowDirector = () => {
    const { id } = useParams();
    const [director, setDirector] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getDirector = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/director/${id}`,
                    { headers: { 'accept': "application/json", 'authorization': token } }
                );
                const user = { ...response.data.data.user, id };
                console.table(user)
                setDirector(user);
            } catch (error) {
                console.log(error);
            }
        };
        getDirector();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-warning">
                        <h3 className="panel-title text-light">
                            <i className="bi bi-file-earmark-person-fill"></i> &nbsp; DETALLES DE DIRECTOR
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {Object.keys(director).length > 0 ? (
                                <div className="col-xs-12 ">
                                    <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información personal</legend>
                                    <p className="">
                                        <span className="">
                                            <strong> Nombre de usuario:</strong>{" "}
                                        </span>
                                        {director.username}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong> Nombre: </strong>{" "}
                                        </span>
                                        {director.first_name}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong>Apellido:</strong>{" "}
                                        </span>
                                        {director.last_name}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong> Correo:</strong>{" "}
                                        </span>
                                        {director.email}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong>Telefono Celular:</strong>{" "}
                                        </span>
                                        {director.phone_number}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong>Estado:</strong>{" "}
                                        </span>
                                        {director.state ? "Active" : "Inactive"}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong>Cumpleaños:</strong>{" "}
                                        </span>
                                        {director.birthdate ? director.birthdate : "N/A"}
                                    </p>
                                    <p className="">
                                        <span className="">
                                            <strong>Teléfono de domicilio:</strong>{" "}
                                        </span>
                                        {director.home_phone
                                            ? director.home_phone
                                            : "N/A"}
                                    </p>
                                </div>)
                                : (
                                    <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">
                                        No hay datos para este director
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
