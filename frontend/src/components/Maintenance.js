import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/maintenance.css';

const Application_maintenance = () => {


    // --- COUNTDOWN STATES --- //

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);


    // --- MAINTENANCE COUNTDOWN --- //

    const getCountdown = () => {

        // Set the date we're counting down to
        var countDownDate = new Date('Jan 5, 2050 01:00:00').getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for hours, minutes and seconds, as well as assigning them to states
        var hoursCalculation = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setHours(hoursCalculation);
        var minutesCalculation = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setMinutes(minutesCalculation);
        var secondsCalculation = Math.floor((distance % (1000 * 60)) / 1000);
        setSeconds(secondsCalculation);

        /* If the count down is finished, refresh the page
        if (distance === 0) {
            window.location.reload(true);
        }
        */

        // Update the count down every 1 second
        }, 1000);
    };

    
    // --- AUTO-CALL FUNCTION WHEN RENDERS THE PAGE --- //

    useEffect(() => {
        getCountdown();
    }, [1000])


    // --- HTML CONTENT (VIEW) --- //

    return (
        <div className='container'>
            <div className='jumbotron mt-5'>
                <h1 className='display-4'>Tus Analíticas</h1>
                <p className='lead'>Conoce todos los datos relevantes de tus placas solares, desde los más simples 
                                    como su temperatura actual hasta calculos complejos como la cantidad de energia 
                                    recogida el día anterior y como repercute dicho dato diariamente y mensualmente 
                                    a tu bolsillo.
                </p>
                <div className='row'>
                    <div className='column' id='column_left'>
                        <div className='alert_warning'>
                            <strong> Aplicación en estado de mantenimiento, espere hasta que esta vuelva a estar operativa. El tiempo restante aproximado es: {hours} h {minutes} m {seconds} s 
                            </strong>
                        </div>
                    </div>

                    <div className='column' id='column_right'>
                        <Link className='btn btn-primary btn-lg' to='/login' role='button'>Iniciar Sesión</Link>    
                    </div>
                </div>
            </div>
            <hr classNameName='my-4' />

            <div id='maintenance'>
                <div className='maintenance'>
                    <div className='maintenance_Alert'>
                        <h1>Mantenimiento de la aplicación en proceso!</h1>
                    </div>
                    <h2>Tiempo restante de mantenimiento: {hours} h {minutes} m {seconds} s</h2>
                    <p>La página solicitada requiere permisos de usuario autenticado para poder ver su contenido.</p>
                    <a className='btn btn-primary btn-lg' href='/analytics' role='button'>Actualizar</a>
                </div>
            </div>
        </div>
    );
};

export default Application_maintenance;