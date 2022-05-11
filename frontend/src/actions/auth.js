import axios from 'axios';
import { setAlert } from './alert';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    LOGOUT
} from './types';

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`http://pablo-dev.ivanlab.lan:8000/auth/jwt/verify/`, body, config)

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`http://pablo-dev.ivanlab.lan:8000/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`http://pablo-dev.ivanlab.lan:8000/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());

        dispatch(setAlert('Inicio de sesión exitoso', 'success'));
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });

        dispatch(setAlert('Email/Contraseña erróneos', 'error'));
    }
};

export const signup = (name, email, password, re_password) => async dispatch => {
    if (password === re_password) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ name, email, password, re_password });

        try {
            const res = await axios.post(`http://pablo-dev.ivanlab.lan:8000/auth/users/`, body, config);

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });

            dispatch(setAlert('Registro de cuenta exitoso', 'success'));
        } catch (err) {
            dispatch({
                type: SIGNUP_FAIL
            })
            dispatch(setAlert('Registro de cuenta erróneo', 'error'));
        }
    } else {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`http://pablo-dev.ivanlab.lan:8000/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });

        dispatch(setAlert('Activación de cuenta exitosa', 'success'));
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });

        dispatch(setAlert('Activación de cuenta errónea', 'error'));
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`http://pablo-dev.ivanlab.lan:8000/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
        dispatch(setAlert('Solicitud de cambio de contraseña exitosa', 'success'));
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
        dispatch(setAlert('Solicitud de cambio de contraseña erróneo', 'error'));
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`http://pablo-dev.ivanlab.lan:8000/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });

        dispatch(setAlert('Cambio de contraseña exitoso', 'success'));
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });

    dispatch(setAlert('Cierre de sesión exitoso', 'success'));
};
