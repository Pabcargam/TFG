import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Alert from './Alert';
import '../styles/navbarStyle.css';
import neliumImage from '../assets/NeliumTransparente.jpg';

const Navbar = ({ logout, isAuthenticated }) => {

    const responsiveNav = () => {
        var x = document.getElementById('myNav');
        if (x.className === 'navbar navbar-expand-lg navbar-dark bg-dark px-3') {
          x.className += 'responsive';
        } else {
          x.className = 'navbar navbar-expand-lg navbar-dark bg-dark px-3';
        }
    };

    const linksInvitados = () => (

        /*<Fragment>
            <Link className='nav-link' to='/login'>Iniciar Sesión</Link>
            <Link className='nav-link' to='/signup'>Resgistrarse</Link>
        </Fragment>*/

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

        /*<Fragment>
            <Link className='nav-link' to='/analytics'>Analíticas</Link>
            <Link className='nav-link' to='/' onClick={logout}>Cerrar Sesión</Link>
        </Fragment>*/

        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/analytics'>Analíticas</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/' onClick={logout}>Cerrar Sesión</Link>
            </li>
        </Fragment>
    );

    return (

        /*<div class='topnav' id='myTopnav'>
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'></link>
            <Link className='navbar-brand' to='/'><img src={neliumImage} alt='Nelium Analytics' width='200px' height='100%'/></Link>
            <Link className='nav-link' to='/'> Home </Link>
            {isAuthenticated ? linksAutenticados() : linksInvitados()}
            <a href='javascript:void(0);' class='icon' onclick={myFunction}>
                <i class="fa fa-bars"></i>
            </a>
        </div>*/

        <Fragment>
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'></link>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-3' id='myNav'>
                <Link className='navbar-brand' to='/'><img src={neliumImage} alt='Nelium Analytics' width='200px' height='100%'/></Link>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/'> Home </Link>
                        </li>
                        {isAuthenticated ? linksAutenticados() : linksInvitados()}
                        <li className='nav-item'>
                            <a href='javascript:void(0);' className='icon' onclick={responsiveNav}>
                                <i class='fa fa-bars'></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <Alert />
        </Fragment>
    );        
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);