import React from 'react';
import { JailForm } from '../../components/organisms/JailForm';
import { useNavigate } from "react-router-dom";

export const CreateJails = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="panel panel-info">
                    <div className="panel-heading bg-info">
                        <h3 className="panel-title text-light"><i className="zmdi zmdi-plus"></i> &nbsp; NUEVA CÁRCEL</h3>
                    </div>
                    <JailForm />
                </div>
            </div>

            
        </div>
    );
}