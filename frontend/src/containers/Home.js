import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import conceptImage from '../assets/conceptoHome.jpg';

import '../styles/homeStyle.css';

const Home = ({ isAuthenticated }) => {

    const invitados = () => (
        <Fragment>
            <p className='lead mt-3'>Inicia sesión pulsando el siguiente botón:</p>
            <Link className='btn btn-primary btn-lg mb-5' to='/login' role='button'>Iniciar Sesión</Link>
        </Fragment>
    );

    const autenticados = () => (
        <Fragment>
            <p className='lead mt-3'>Accede a tus analiticas pulsando el siguiente botón:</p>
            <Link className='btn btn-primary btn-lg mb-5' to='/analytics'>Analíticas</Link>
        </Fragment>
    );

    return (
        <div className='container'>
            <div className='jumbotron mt-5 mb-3'>
                <h1 className='display-4'>Bienvenido a Nelium Analytics!</h1>
                <p className='lead'>Te mostramos estadísticas básicas sobre tu generación y consumo eléctrico</p>
                <hr className='my-4' />

                {isAuthenticated ? autenticados() : invitados()}

                <img id='concept' src={conceptImage} alt='Nelium Analytics' width='1280px' height='720px'/>

            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);