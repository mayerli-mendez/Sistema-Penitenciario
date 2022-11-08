import React from 'react';
import { WardForm } from '../../components/organisms';
import { useNavigate } from "react-router-dom";

export const CreateWard = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="zmdi zmdi-plus"></i> &nbsp; NUEVO PABELLON</h3>
                    </div>
                    <WardForm />
                </div>
            </div>
        </div>
    );
}