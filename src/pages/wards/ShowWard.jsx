import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShowWard = () => {
    const { id } = useParams();
    const [wards, setWards] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getWard = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/ward/${id}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const ward = { ...response.data.data.ward, id };
                console.log(ward);
                setWards(ward);
            } catch (error) {
                console.log(error);
            }
        };
        getWard();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-warning">
                        <h3 className="panel-title text-light">
                            <i className="bi bi-file-earmark-text-fill"></i> &nbsp; DETALLES DEL PABELLON
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {Object.keys(wards).length > 0 ? (
                                <>
                                    <div className="col-xs-12">
                                        <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información de pabellon</legend>
                                        <p className="">
                                            <span className="">
                                                <strong> Nombre del Pabellón:</strong>{" "}
                                            </span>
                                            {wards.name}
                                        </p>
                                        <p className="">
                                            <span className="">
                                                <strong> Direccion:</strong>{" "}
                                            </span>
                                            {wards.location}
                                        </p>
                                        <p className="">
                                            <span className="">
                                                <strong> Descripcion: </strong>{" "}
                                            </span>
                                            {wards.description}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong>Estado:</strong>{" "}
                                            </span>
                                            {wards.state ? "Active" : "Inactive"}
                                        </p>
                                    </div>
                                    
                                </>)
                                : (
                                    <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">
                                        No hay datos para este pabellon
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};


