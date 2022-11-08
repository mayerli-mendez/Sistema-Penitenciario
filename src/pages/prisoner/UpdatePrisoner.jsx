import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PrisonerForm } from '../../components/organisms';

export const UpdatePrisoner = () => {
    const { id } = useParams();
    const [prisoner, setPrisoner] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getPrisoner = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/prisoner/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setPrisoner(user);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getPrisoner();
        console.log(prisoner);
    }, [])

    return (
        <div>
        <div className="container-fluid">
            <div className="panel panel-info">
                <div className="panel-heading bg-info">
                    <h3 className="panel-title text-light"><i className="bi bi-pencil-square"></i> &nbsp; EDITAR PRISIONERO</h3>
                </div>
                {
                    Object.keys(prisoner).length > 0 ?
                        (
                            <PrisonerForm prisoner={prisoner} />
                        )
                        :
                        (
                            <p className="bg-warning text-dark  text-center">No hay datos del prisionero</p>
                        )
                }
            </div>
        </div>
    </div>
    )
}
