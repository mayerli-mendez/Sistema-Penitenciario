import React from 'react';
import { GuardFrom } from '../../components/organisms/GuardFrom';
import { useNavigate } from "react-router-dom";

export const CreateGuard = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="zmdi zmdi-plus"></i> &nbsp; NUEVO GUARDIA</h3>
                    </div>
                    <GuardFrom />
                </div>
            </div>


        </div>
    );
}