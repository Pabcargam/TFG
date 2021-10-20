import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import { setAlert } from '../actions/alert';

const ResetPasswordConfirm = ({ match, setAlert, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);

        if (new_password === re_new_password) {
            setRequestSent(true);
        }else {
            setAlert('Contraseñas no idénticas', 'error');
        }
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Restablecimiento de Contraseña:</h1>
            <p>Escriba la nueva contraseña deseada dos veces</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group mb-2'>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='New Password*'
                            name='new_password'
                            value={new_password}
                            onChange={e => onChange(e)}
                            minLength='7'
                            required
                        />
                </div>
                <div className='form-group mb-3'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password*'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='7'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Restablecer Contraseña</button>
            </form>
        </div>
    );
};

export default connect(null, { reset_password_confirm, setAlert })(ResetPasswordConfirm);