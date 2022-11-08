import React from 'react';
import { PrisonerForm } from '../../components/organisms';
import { useNavigate } from "react-router-dom";

export const CreatePrisoner = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="zmdi zmdi-plus"></i> &nbsp; NUEVO PRISIONERO</h3>
                    </div>
                    <PrisonerForm />
                </div>
            </div>

            
        </div>
    );
}