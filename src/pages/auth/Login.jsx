import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label, Button } from '../../components'
import { AuthContext } from '../../contexts';

export const Login = () => 
{
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://apiterminado.herokuapp.com/api/v1/login',
                { email, password },
                { headers: { 'accept': 'application/json' } }
            )
            const {access_token, token_type, user} = response.data.data 
            console.warn(access_token, token_type, user);
            login(user, `${token_type} ${access_token}`);   
            navigate('/');       
        } catch (error) {
            console.log(error.response.data.message, 'error');
            setEmail('');
            setPassword('');
        }
    }

    return (
        <>
            <form className='logInForm bg-dark text-dark"' onSubmit={onLogin}>
            <p className="text-center text-light "><i className="zmdi zmdi-account-circle zmdi-hc-5x"></i></p>
			<p className="text-center text-light text-uppercase">Inicia sesión con tu cuenta</p>
                <div className="form-group label-floating">
                    <Label description="Correo" htmlFor='email' />
                    <input
                        className='form-control'
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        placeholder='Escribe tu correo'
                        maxLength="35"
                        required
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                    <p className="help-block text-muted">Escribe tú nombre de usuario</p>
                </div>
                <div className="form-group label-floating">
                    <Label description="Contraseña" htmlFor='password' />
                    <input
                        className='form-control'
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        placeholder='Escribe tu contraseña'
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                    <p className="help-block text-muted">Escribe tú contraseña</p>
                </div>
                <div className='pt-4 flex justify-center'>
                    <Button name='INICIAR SESION' styles='w-3/5' />
                </div>
                <div className="text-center">
                    <a onClick={() => { navigate("/login/forgot_password") }} className="small text-info" href="#">Olvide me contraseña</a>
                </div>
                <div className="text-center">
                    <a onClick={() => { navigate("/login/reset_password") }} className="small text-info" href="#">Restaurar contraseña</a>
                </div>
            </form>
        </>
    );
}
