
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Label, Button } from '../../components'


export const Forgot_password = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const Forgot = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://apiterminado.herokuapp.com/api/v1/forgot-password',
                { email },
                { headers: { 'accept': 'application/json' } }
            )
            console.log(response.data.data);

            navigate('/login/reset_password');
        } catch (error) {
            console.log(error.response.data.message, 'error');
            setEmail('');
        }
    }

    return (
        <>
            <form onSubmit={Forgot} className="logInForm bg-dark text-dark">
                <p className="text-center text-light "><i className="zmdi zmdi-account-circle zmdi-hc-5x"></i></p>
                <p className="text-center text-light text-uppercase">Recuperar contraseña</p>
                <div className="form-group label-floating">
                    <Label description="Correo" htmlFor='email' />
                    <input
                        className="form-control"
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        placeholder='Ingresa tu correo'
                        maxLength="35"
                        required
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                    <p className="help-block text-muted">Escribe tú Correo</p>
                </div>
                <div className='pt-4 flex justify-center'>
                    <Button name='Enviar correo' styles='w-3/5' />
                </div>
                <div className="text-center">
                    <a onClick={() => { navigate("/login") }} className="small text-info" href="#">Regresar</a>
                </div>
            </form>
        </>
    )
}



