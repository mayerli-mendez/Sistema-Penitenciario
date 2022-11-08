import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const UpdatePrisonersJails = () => {
    const { id } = useParams();
    const [guard, setPrisonersJails] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getPrisonersJails = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/v1/prisionjail/${id}`,
                    { headers: { accept: "application/json", authorization: token } }
                );
                const user = { ...response.data.data.user, id };
                setPrisonersJails(user);
            } catch (error) {
                console.log(error);
            }
        };
        getPrisonersJails();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-warning">
                        <h3 className="panel-title text-light">
                            <i className="bi bi-pencil-square"></i> &nbsp; MODIFICAR ASIGNACION DEL PRISIONERO
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <legend><i className="bi bi-incognito"></i> &nbsp; Información del prisionero</legend>
                                <p className="">
                                    <span className="">
                                        * First Name:{" "}
                                    </span>
                                    {guard.first_name}
                                </p>
                                <p className="">
                                    <span className="">
                                        * Last Name:{" "}
                                    </span>
                                    {guard.last_name}
                                </p>

                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <legend><i className="bi bi-view-stacked"></i> &nbsp; Asignar a otro pabellón </legend>
                                <select className="form-select" id="">
                                    {
                                        <option value="">San roque</option>
                                    }
                                </select>
                            </div>
                            <p className="text-center">
                                <button type="submit" className="btn btn-warning btn-raised btn-sm"><i className="zmdi zmdi-floppy"></i> Guardar</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
