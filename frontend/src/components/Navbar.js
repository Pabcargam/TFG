import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import Alert from './Alert';
import '../styles/navbarStyle.css';
import neliumImage from '../assets/NeliumTransparente.jpg';

const Navbar = ({ logout, isAuthenticated }) => {


    // --- RESPONSIVE STATES --- //

    const [responsiveLinks, setResponsiveLinks] = useState(true);


    // --- LINKS AUTHENTICATED-BASED --- //

    const linksInvitados = () => (

        <Fragment>
            <Link to='/login'>Iniciar Sesión</Link>
            <Link to='/signup'>Resgistrarse</Link>
        </Fragment>

        /*<Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Iniciar Sesión</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signup'>Resgistrarse</Link>
            </li>
        </Fragment>*/
    );

    const linksAutenticados = () => (

        <Fragment>
            <Link to='/analytics'>Analíticas</Link>
            <Link to='/' onClick={logout}>Cerrar Sesión</Link>
        </Fragment>

        /*<Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/analytics'>Analíticas</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/' onClick={logout}>Cerrar Sesión</Link>
            </li>
        </Fragment>*/
    );


    // --- HTML CONTENT --- //

    return (

        <Fragment>
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'></link>
            <div className='navbar'>
                <div className='leftSide'>
                    <div className='neliumLink'>
                        <Link to='/'><img src={neliumImage} alt='Nelium Analytics' width='232px' height='34px'/></Link>
                    </div>
                </div>
                <div className='middleSide'>
                    <div className='links' id={responsiveLinks ? 'hidden' : ''}>
                        <Link to='/'> Home </Link>
                        {isAuthenticated ? linksAutenticados() : linksInvitados()}
                    </div>
                    <button> Responsive </button>
                </div>
            </div>
            <Alert />
        </Fragment>
    );        
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);