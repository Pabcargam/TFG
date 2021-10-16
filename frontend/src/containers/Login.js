import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Inicio de Sesión</h1>
            <p>Inicia sesión en tu cuenta</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group, mb-2'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group, mb-3'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='7'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Iniciar Sesión</button>
            </form>
            <p className='mt-3'>
                ¿No tienes una cuenta aun? <Link to='/signup'>¡Regístrate!</Link>
            </p>
            <p className='mt-3'>
                ¿Has olvidado tu contraseña? <Link to='/reset-password'>Restablecer Contraseña</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);