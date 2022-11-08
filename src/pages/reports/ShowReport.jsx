import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ShowReport = () => {
    const { id } = useParams();
    const [reports, setReports] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getReport = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/report/${id}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const report = { ...response.data.data.report, id };
                console.log(report);
                setReports(report);
            } catch (error) {
                console.log(error);
            }
        };
        getReport();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-warning">
                        <h3 className="panel-title text-light">
                            <i className="bi bi-file-earmark-richtext-fill"></i> &nbsp; DETALLES DE REPORTE
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {Object.keys(reports).length > 0 ? (
                                <>
                                    <div className="col-xs-12 col-sm-6">
                                        <legend><i className="zmdi zmdi-account-box"></i> &nbsp; Información de reporte</legend>
                                        <p className="">

                                            <span className="">
                                                <strong> Titulo:</strong>{" "}
                                            </span>
                                            {reports.title}
                                        </p>
                                        <p className="">
                                            <span className="">
                                                <strong> Descripcion: </strong>{" "}
                                            </span>
                                            {reports.description}
                                        </p>

                                        <p className="">
                                            <span className="">
                                                <strong>Estado:</strong>{" "}
                                            </span>
                                            {reports.state ? "Active" : "Inactive"}
                                        </p>

                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <legend><i className="zmdi zmdi-attachment-alt"></i> &nbsp; Imágen </legend>
                                        <img className=" col-xs-12  w-50" src={`${reports.image}`} />
                                    </div>
                                </>)
                                : (
                                    <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">
                                        No hay datos para este reporte
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};


