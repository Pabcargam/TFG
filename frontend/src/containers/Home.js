import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='container'>
        <div class='jumbotron mt-5'>
            <h1 class='display-4'>Bienvenido a Nelium Analytics!</h1>
            <p class='lead'>Te mostramos estadisticas básicas sobre tu generación y consumo eléctrico!</p>
            <hr class='my-4' />
            <p>Inicia sesión pulsando el siguiente botón:</p>
            <Link class='btn btn-primary btn-lg' to='/login' role='button'>Iniciar Sesión</Link>
        </div>
    </div>
);

export default Home;