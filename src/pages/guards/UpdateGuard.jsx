import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GuardFrom } from '../../components/organisms';

export const UpdateGuard = () => {
    const { id } = useParams();
    const [guard, setGuard] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getGuard = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/guard/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setGuard(user);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getGuard()
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="bi bi-pencil-square"></i> &nbsp; EDITAR GUARDIA</h3>
                    </div>
                    {
                        Object.keys(guard).length > 0 ?
                            (
                                <GuardFrom guard={guard} />
                            )
                            :
                            (
                                <p className=" text-white px-4 py-3 m-5 text-center rounded-lg">No hay datos del guardia</p>
                            )
                    }
                </div>
            </div>
        </div>
    ) }