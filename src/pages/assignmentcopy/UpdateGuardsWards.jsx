import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const UpdateGuardsWards = () => {
    const { id } = useParams();
    const [guard, setGuard] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getGuard = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/v1/guard/${id}`,
                    { headers: { accept: "application/json", authorization: token } }
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
                            <i className="bi bi-pencil-square"></i> &nbsp; MODIFICAR ASIGNACION DEL GUARDIA
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <legend><i className="bi bi-shield-shaded"></i> &nbsp; Información del guardia</legend>
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
                                <legend><i className="bi bi-bank2"></i> &nbsp; Asignar a otra cárcel </legend>
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

            <h1 className="font-black text-4xl text-sky-900">Guard</h1>
            <hr className="mt-3" />
            <p className="mt-3">Guard details</p>
            {Object.keys(guard).length > 0 ? (
                <div className="m-5 flex justify-between">
                    <div>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * First Name:{" "}
                            </span>
                            {guard.first_name}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * Last Name:{" "}
                            </span>
                            {guard.last_name}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * Email:{" "}
                            </span>
                            {guard.email}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * Phone Number:{" "}
                            </span>
                            {guard.phone_number}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * State:{" "}
                            </span>
                            {guard.state ? "Active" : "Inactive"}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * Birthdate:{" "}
                            </span>
                            {guard.birthdate ? guard.birthdate : "N/A"}
                        </p>
                        <p className="text-2xl text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">
                                * Home phone number:{" "}
                            </span>
                            {guard.home_phone_number ? guard.home_phone_number : "N/A"}
                        </p>
                    </div>
                    <div>
                        <img src={guard.avatar} alt="avatar" className="h-80 w-80" />
                    </div>
                </div>
            ) : (
                <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">
                    No data for this guard
                </p>
            )}
        </div>
    );
};
