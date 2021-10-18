import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import neliumImage from '../assets/NeliumTransparente.jpg';

const Navbar = ({ logout, isAuthenticated }) => {

    const linksInvitados = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Iniciar Sesión</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signup'>Resgistrarse</Link>
            </li>
        </Fragment>
    );

    const linksAutenticados = () => (
        <Fragment>
            <li className='nav-item'>
                <a className='nav-link' href='#!'>Analíticas</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='#!' onClick={logout}>Cerrar Sesión</a>
            </li>
        </Fragment>
    );

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-3' >
            <Link className='navbar-brand' to='/'><img src={neliumImage} alt='Nelium Analytics' width='200px' height='100%'/></Link>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav'>
                    <li className='nav-item active'>
                        <Link className='nav-link' to='/'> Home </Link>
                    </li>
                    {isAuthenticated ? linksAutenticados() : linksInvitados()}
                </ul>
            </div>
        </nav>
    );        
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);