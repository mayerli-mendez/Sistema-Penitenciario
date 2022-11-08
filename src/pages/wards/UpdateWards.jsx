import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { WardForm } from '../../components/organisms/WardForm';

export const UpdateWard = () => {
    const { id } = useParams();
    const [wards, setWard] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getWard = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/ward/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const ward = { ...response.data.data.ward, id }
                setWard(ward);
                console.log(ward);
            } catch (error) {
                console.log(error);
            }
        }
        getWard()
    }, [])

    return (
        <div>
        <div className="container-fluid">
            <div className="panel panel-info">
                <div className="panel-heading bg-info">
                    <h3 className="panel-title text-light"><i className="bi bi-pencil-square"></i> &nbsp; EDITAR Pabellon</h3>
                </div>
                {
                    Object.keys(wards).length > 0 ?
                        (
                            <WardForm ward={wards} />
                        )
                        :
                        (
                            <p className="bg-yellow-600 border-t border-b border-yellow-900 text-black px-4 py-3 m-5 text-center rounded-lg">No hay datos para este Pabellon</p>
                        )
                }
            </div>
        </div>

    </div>
    )
}
