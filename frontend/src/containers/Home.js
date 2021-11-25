import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ isAuthenticated }) => {

    const invitados = () => (
        <Link className='btn btn-primary btn-lg' to='/login' role='button'>Iniciar Sesión</Link>
    );

    const autenticados = () => (
        <Link className='btn btn-primary btn-lg' to='/analytics'>Analíticas</Link>
    );

    return (
        <div className='container'>
            <div class='jumbotron mt-5'>
                <h1 class='display-4'>Bienvenido a Nelium Analytics!</h1>
                <p class='lead'>Te mostramos estadísticas básicas sobre tu generación y consumo eléctrico</p>
                <hr class='my-4' />

                <p className='mt-3'>Inicia sesión pulsando el siguiente botón:</p>
                {isAuthenticated ? autenticados() : invitados()}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);