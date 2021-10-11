import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <Link className='navbar-brand' to='/'>Nelium Analytics</Link>
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-toggle='collapse' 
                    data-target='#navbarNav' 
                    aria-controls='navbarNav' 
                    aria-expanded='false' 
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/'> Home </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/login'> Iniciar Sesión </Link>
                        </li>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/signup'> Resgistrarse </Link>
                        </li>
                    </ul>
                </div>
            </nav>
);

export default Navbar;