import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShowJails = () => {
    const { id } = useParams();
    const [jails, setJails] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getJail = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/jail/${id}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const jail = { ...response.data.data.jail, id };
                console.log(jail);
                setJails(jail);
            } catch (error) {
                console.log(error);
            }
        };
        getJail();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-warning">
                        <h3 className="panel-title text-light">
                            <i className="bi bi-file-earmark-text-fill"></i> &nbsp; DETALLES DE LA CELDA
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {Object.keys(jails).length > 0 ? (
                                <>
                                    <div className="col-xs-12">
                                        <legend><i className="bi bi-bank2"></i> &nbsp; Información de la celda</legend>
                                        <p className="">
                                            <span className="">
                                                <strong> Nombre de la celda:</strong>{" "}
                                            </span>
                                            {jails.name}
                                        </p>
                                        <p className="">
                                            <span className="">
                                                <strong> Codigo:</strong>{" "}
                                            </span>
                                            {jails.code}
                                        </p>
                                        <p className="">
                                            <span className="">
                                                <strong> Capacidad</strong>{" "}
                                            </span>
                                            {jails.capacity}
                                        </p>
                                        <p className="">
                                            <span className="">
                                                <strong> Descripcion: </strong>{" "}
                                            </span>
                                            {jails.description}
                                        </p>
                                 
                                        <p className="">
                                            <span className="">
                                                <strong>Estado:</strong>{" "}
                                            </span>
                                            {jails.state ? "Active" : "Inactive"}
                                        </p>
                                    </div>
                                    <div className="col-xs-12">
                                        <legend><i className="bi bi-view-stacked"></i> &nbsp; Información del pabellon a la que pertenece</legend>
                                        <p className="">
                                            <span className="">
                                                <strong> ID: </strong>{" "}
                                            </span>
                                            {jails.ward.id}
                                        </p>
                                        <p className="">
                                            <span className="">
                                                <strong> Nombre: </strong>{" "}
                                            </span>
                                            {jails.ward.name}
                                        </p>
                                        
                                        <p className="">
                                            <span className="">
                                                <strong> Ubicación: </strong>{" "}
                                            </span>
                                            {jails.ward.location}
                                        </p>
                                        
                                    </div>
                                </>)
                                : (
                                    <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">
                                        No hay datos para esta celda
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
