import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JailForm } from '../../components/organisms/JailForm';

export const UpdateJails = () => {
    const { id } = useParams();
    const [jails, setJail] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getJail = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/jail/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const jail = { ...response.data.data.jail, id }
                setJail(jail);
                console.log(jail);
            } catch (error) {
                console.log(error);
            }
        }
        getJail()
    }, [])

    return (
        <div>
        <div className="container-fluid">
            <div className="panel panel-info">
                <div className="panel-heading bg-info">
                    <h3 className="panel-title text-light"><i className="bi bi-pencil-square"></i> &nbsp; EDITAR CELDA</h3>
                </div>
                {
                    Object.keys(jails).length > 0 ?
                        (
                            <JailForm jail={jails} />
                        )
                        :
                        (
                            <p className="bg-yellow-600 border-t border-b border-yellow-900 text-black px-4 py-3 m-5 text-center rounded-lg">No hay datos para este Carcel</p>
                        )
                }
            </div>
        </div>

    </div>
    )
}


