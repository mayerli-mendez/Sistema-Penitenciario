import React from 'react';
import { DirectorForm } from '../../components/organisms';
import { useNavigate } from "react-router-dom";

export const CreateDirector = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="zmdi zmdi-plus"></i> &nbsp; NUEVO DIRECTOR</h3>
                    </div>
                    <DirectorForm />
                </div>
            </div>

        </div>
    );
}