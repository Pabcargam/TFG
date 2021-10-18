import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Redirect to='/' />
    }

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center' 
                style={{ marginTop: '125px' }}
            >
                <h1 className='mb-4'>Activación de Cuenta:</h1>
                <div class='card'>
                    <div class='card-body'>
                        <p 
                            class='card-text lead mt-2' 
                            style={{ textAlign: 'center', marginBottom: '40px' }}>

                            <b> 
                                Te encuentras a solo un click de crear una cuenta en Nelium 
                                Analytics para tener acceso a las siguientes funcionalidades:
                            </b>
                        </p>
                        <ul>
                            <li className='mb-1'>Analíticas en tiempo real del rendimiento de tu placa solar</li>
                            <li className='mb-1'>Coste actual de la luz por tramos horarios</li>
                            <li className='mb-1'>Sistema inteligente de planificación para el ahorro de energía de la vivienda</li>
                            <li className='mb-1'>Mucho más...</li>
                        </ul>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <button
                                onClick={verify_account}
                                type='button'
                                className='btn btn-primary mt-3'
                                style={{ fontSize: '20px' }}
                            >
                                Activar
                            </button>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);