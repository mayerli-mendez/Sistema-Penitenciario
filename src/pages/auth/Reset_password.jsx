import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';
import { Label, Button } from '../../components'


export const Reset_password = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordcon] = useState('')

    const Reset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://apiterminado.herokuapp.com/api/v1/reset-password',
                { token , email, password, password_confirmation },
                { headers: { 'accept': 'application/json' } }
            )
            console.log(response.data.data);
            console.log(token);
            console.log(email);
            console.log(password);
            console.log(password_confirmation);
            navigate('/login');
        } catch (error) {
            console.log(error.response.data.message, 'error');
            setPassword('');
            setPasswordcon('');
        }
    }
    return (
        <>
            <form onSubmit={Reset} className="logInForm bg-dark text-dark">
                <p className="text-center text-light text-uppercase">Recuperar contraseña</p>
                <div className="form-group label-floating">
                    <Label description="Token" htmlFor='token' />
                    <input
                        className="form-control"
                        id='token'
                        name='token'
                        type='text'
                        value={token}
                        placeholder='Ingresa el token'
                        required
                        autoFocus
                        onChange={e => setToken(e.target.value)}
                    />
                    <p className="help-block text-muted">Escribe tu token</p>
                </div>
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
                <div className="form-group label-floating">
                    <Label description="Contraseña" htmlFor='password' />
                    <input
                        className="form-control"
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        placeholder='Ingresa contraseña'
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                    <p className="help-block text-muted">Escribe tú Contraseña</p>
                </div>
                <div className="form-group label-floating">
                    <Label description="Confirmar Contraseña" htmlFor='password_confirmation' />
                    <input
                        className="form-control"
                        id='password_confirmation'
                        name='password_confirmation'
                        type='password'
                        value={password_confirmation}
                        placeholder='Ingresa tu contraseña'
                        required
                        onChange={e => setPasswordcon(e.target.value)}
                    />
                    <p className="help-block text-muted">Escribe tú contraseña</p>
                </div>
                <div className='pt-4 flex justify-center'>
                    <Button name='Restaurar contraseña' styles='w-3/5' />
                </div>
                <div className="text-center">
                    <a onClick={() => { navigate("/login/forgot_password") }} className="small text-info" href="#">Regresar</a>
                </div>
            </form>
        </>
    )
}