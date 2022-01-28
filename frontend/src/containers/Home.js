import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ isAuthenticated }) => {

    const invitados = () => (
        <Fragment>
            <p className='mt-3'>Inicia sesión pulsando el siguiente botón:</p>
            <Link className='btn btn-primary btn-lg' to='/login' role='button'>Iniciar Sesión</Link>
        </Fragment>
    );

    const autenticados = () => (
        <Fragment>
            <p className='mt-3'>Accede a tus analiticas pulsando el siguiente botón:</p>
            <Link className='btn btn-primary btn-lg' to='/analytics'>Analíticas</Link>
        </Fragment>
    );

    return (
        <div className='container'>
            <div className='jumbotron mt-5'>
                <h1 className='display-4'>Bienvenido a Nelium Analytics!</h1>
                <p className='lead'>Te mostramos estadísticas básicas sobre tu generación y consumo eléctrico</p>
                <hr className='my-4' />

                {isAuthenticated ? autenticados() : invitados()}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);