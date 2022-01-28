import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/notFoundStyle.css';

const notFound = () => (
    <div id='notfound'>
        <div className='notfound'>
            <div className='notfound-404'>
                <h1>Oops!</h1>
            </div>
            <h2>404 - Página no encontrada</h2>
            <p>La página solicitada puede haber sido borrada, haber sufrido un cambio de nombre o estar temporalmente no disponible.</p>
            <Link className='btn btn-primary btn-lg' to='/' role='button'>Ir a Home</Link>
        </div>
    </div>
);

export default notFound;