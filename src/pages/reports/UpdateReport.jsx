import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ReportForm } from '../../components/organisms/ReportForm';

export const UpdateReport = () => {
    const { id } = useParams();
    const [reports, setReport] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getReport = async () => {
            try {
                const response = await axios.get(
                    `https://apiterminado.herokuapp.com/api/v1/report/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const report = { ...response.data.data.report, id }
                
                console.log(report);
                setReport(report);
            } catch (error) {
                console.log(error);
            }
        }
        getReport();
        console.log(<div class="d-print-block">
            
        </div>);
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="bi bi-pencil-square"></i> &nbsp; EDITAR REPORTE</h3>
                    </div>
                    {
                        Object.keys(reports).length > 0 ?
                            (
                                <ReportForm report={reports} />
                            )
                            :
                            (
                                <p className="bg-yellow-600 border-t border-b border-yellow-900 text-black px-4 py-3 m-5 text-center rounded-lg">No hay datos para este reporte</p>
                            )
                    }
                </div>
            </div>

        </div>
    )
}
