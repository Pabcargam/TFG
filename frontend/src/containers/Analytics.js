import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Analytics = () => {

    // --- DATABASE DATA STATES --- //

    const [innerTemp, setInnerTemp] = useState(0);
    const [meanInnerTemp, setMeanInnerTemp] = useState(0);
    const [outterTemp, setOutterTemp] = useState(0);
    const [meanOutterTemp, setMeanOutterTemp] = useState(0);
    const [diffTrigger, setDiffTrigger] = useState(0);
    const [pump, setPump] = useState(false);


        // --- ENERGY SAVE & PERFORMANCE DATA STATES --- //

        const [maxTankTemp, setmaxTankTemp] = useState(0);
        const [maxTime, setMaxTime] = useState('');
        const [minTankTemp, setMinTankTemp] = useState(0);
        const [minTime, setMinTime] = useState('');
        const [lightPriceYesterdayGenTime, setLightPriceYesterdayGenTime] = useState(0);


    // --- ELECTRICITY DATA STATES --- //

    const[currentLightPrice, setCurrentLightPrice] = useState(0);


    /*
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    */


    const getAnalytics = () => {

        // --- DATE AND TIME VARIABLES --- //

        var today = new Date();
        var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var currentHour = today.getHours();

        var yesterdayDate = '';

        if (today.getDate() === 1) {
            if ((today.getMonth() + 1) === 1){ // El metodo getMonth() solo va de la posicion 0 a la 11, es por ello que deberemos sumarle '1' para que concuerde con el mes actual.
                yesterdayDate = (today.getFullYear() - 1) + '-' + (today.getMonth() + 12) + '-' + (today.getDate() + 29);
            }
            else {
                yesterdayDate = today.getFullYear() + '-' + today.getMonth() + '-' + (today.getDate() + 29);
            }
        }
        else {
            yesterdayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1);
        }

        var lastHour = 24 - today.getHours();


        // --- HEADERS ELECTRICITY API REQUESTS --- //

        const headersAPIluz = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': 'apidatos.ree.es'  
            }
        };


        // --- HEADERS DATABASE API REQUESTS --- //

        const headersDB = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token YJCYxd9ss0wJh1AivnRa0_j89oQGBFYLJpnpinZjohomSLTq0kcvUkPs90Px6xj688rwDt_s1bP14rmHSiHw_A=='
            }
        };


        // --- PARAMS ELECTRICITY API REQUESTS --- //

        const paramsAPIluzActual = {
            params: {
                'start_date': currentDate + 'T00:00',
                'end_date': currentDate + 'T23:59',
                'time_trunc': 'hour'  
            }
        };

        const paramsAPIluzAyer = {
            params: {
                'start_date': yesterdayDate + 'T00:00',
                'end_date': yesterdayDate + 'T23:59',
                'time_trunc': 'hour'  
            }
        };


        // --- BODY DATABASE API REQUESTS --- //

        const inner_temp = {
            "query": "SELECT inside FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 2m",
            "type": "influxql",
            "bucket": "sensors"
            };

        const mean_inner_temp = {
            "query": "SELECT MEAN(inside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 6h",
            "type": "influxql",
            "bucket": "sensors"
            };

        const outter_temp = {
            "query": "SELECT outside FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 2m",
            "type": "influxql",
            "bucket": "sensors"
            };

        const mean_outter_temp = {
            "query": "SELECT MEAN(outside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 6h",
            "type": "influxql",
            "bucket": "sensors"
            };

        const diff_trigger = {
            "query": "SELECT diff FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 2m",
            "type": "influxql",
            "bucket": "sensors"
            };

        const pump_bool = {
            "query": "SELECT pump FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 2m",
            "type": "influxql",
            "bucket": "sensors"
            };

    
            // --- BODY ENERGY SAVE & PERFORMANCE API REQUESTS --- //

            const max_tank_temp = {
                "query": "SELECT MAX(inside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time >= now() - " + currentHour + "h - 1d AND time <= now() + " + lastHour + "- 1d",
                "type": "influxql",
                "bucket": "sensors"
            };

            const min_tank_temp = {
                "query": "SELECT MIN(inside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time >= now() - " + currentHour + "h - 1d AND time <= now() + " + lastHour + "- 1d",
                "type": "influxql",
                "bucket": "sensors"
            };


        // --- DATABASE API REQUESTS --- //

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', inner_temp, headersDB).then(
            (response) => {
                console.log(response);
                setInnerTemp(response.data.results[0].series[0].values[0][1]);
            }
        );

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', mean_inner_temp, headersDB).then(
            (response) => {
                console.log(response);
                setMeanInnerTemp(response.data.results[0].series[0].values[0][1].toFixed(1));
            }
        );

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', outter_temp, headersDB).then(
            (response) => {
                console.log(response);
                setOutterTemp(response.data.results[0].series[0].values[0][1]);
            }
        );

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', mean_outter_temp, headersDB).then(
            (response) => {
                console.log(response);
                setMeanOutterTemp(response.data.results[0].series[0].values[0][1].toFixed(1));
            }
        );

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', diff_trigger, headersDB).then(
            (response) => {
                console.log(response);
                setDiffTrigger(response.data.results[0].series[0].values[0][1]);
            }
        );

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', pump_bool, headersDB).then(
            (response) => {
                console.log(response);
                setPump(response.data.results[0].series[0].values[0][1]);
            }
        );


            // --- ENERGY SAVE & PERFORMANCE API REQUESTS --- //

            Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', max_tank_temp, headersDB).then(
                (response) => {
                    console.log(response);
                    setmaxTankTemp(response.data.results[0].series[0].values[0][1]);
                    setMaxTime(response.data.results[0].series[0].values[0][0]);
                }
            );

            Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', min_tank_temp, headersDB).then(
                (response) => {
                    console.log(response);
                    setMinTankTemp(response.data.results[0].series[0].values[0][1]);
                    setMinTime(response.data.results[0].series[0].values[0][0]);
                }
            );


        // --- ELECTRICITY API REQUESTS --- //

        Axios.get('https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real', paramsAPIluzActual, headersAPIluz).then(
            (response) => {
                console.log(response);
                setCurrentLightPrice(response.data.included[0].attributes.values[currentHour].value);
            }
        );

        Axios.get('https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real', paramsAPIluzAyer, headersAPIluz).then(
            (response) => {
                console.log(response);
                setLightPriceYesterdayGenTime(response.data.included[0].attributes.values[11].value);
            }
        );

        console.log(currentDate);
        console.log(currentHour);
        console.log(yesterdayDate);
    };


    // --- AUTO-CALL FUNCTION WHEN RENDERS THE PAGE --- //

    useEffect(() => {
        getAnalytics();
    }, [])


    // --- MONTHLY SAVED MONEY METHOD --- //

    const getMoneySavedMonthly = () => {

        var dailySave = [];

        if (dailySave.length < 30) {
            dailySave.push(moneySaved);
            for(let c = 0; c < dailySave.length; c++) {
                currentSave += dailySave[c]; 
            }
        } 
        else {
            dailySave = [];
            lastMonthSave = currentSave;
            currentSave = 0;
            
        }
    };


    // --- AUTO-CALL FUNCTION WHEN RENDERS THE PAGE --- //

    const DAY_MS = 86400000;

    useEffect(() => {
    const interval = setInterval(() => {
        getAnalytics();
        getMoneySavedMonthly();
    }, DAY_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


    // --- POSTPROCESSED VARIABLES --- //

        var currentSave = 0;
        var lastMonthSave = 0;


        var maxDate = new Date(maxTime);
        var minDate = new Date(minTime);

        var tankDiff = 0;
    
        if (maxDate > minDate) {
            tankDiff = maxTankTemp - minTankTemp;
        } 
        else {
            tankDiff = 0;
        }


        var energySaved = (300 * tankDiff) * 0.00116222;
        var moneySaved = energySaved * (lightPriceYesterdayGenTime/1000);


        var timeDiff = maxDate.getHours() - minDate.getHours();
        var realPerformance = (((tankDiff/timeDiff) * 300) * 0.00116222);
        var expectedPerformance = (700 * 1.22)/1000;
        var performanceString = '';

        if (realPerformance > expectedPerformance) {
            performanceString = 'Bueno';
        }
        else if (realPerformance <= expectedPerformance && realPerformance > (expectedPerformance - 0.2)) {
            performanceString = 'Estandar';
        }
        else {
            performanceString = 'Malo';
        }
        
    return (
        <div>
            Hola, obtén tus analíticas clicando en el siguiente botón. 
            <button onClick={getAnalytics}> Actualizar Analíticas</button><br/>
            Temperatura del tanque: {innerTemp}° <br/>
            Media de temperatura del tanque: {meanInnerTemp}° <br/>
            Temperatura de la placa: {outterTemp}°<br/>
            Media de temperatura de la placa: {meanOutterTemp}° <br/>
            Diferencial de activación: {diffTrigger}° <br/>
            Bombeo: {pump ? 'Activado' : 'No Activado'}<br/><br/>

            Precio de la luz (Hora actual): {(currentLightPrice/1000).toFixed(3)} €/kWh <br/><br/>

            Energía ahorrada ayer (Para tanque de 300L): {energySaved.toFixed(3)} kW <br/><br/>

            Dinero ahorrado durante el dia de ayer (Para el precio de generación a las 12 del mediodía): {moneySaved.toFixed(2)} € <br/><br/>

            Rendimiento de las placas solares: {performanceString} <br/>
            {tankDiff}° <br/>
            {realPerformance} kW/h <br/>
            {expectedPerformance} kW/h <br/><br/>

            {timeDiff} <br/>
            {maxDate.getHours()} <br/>
            {minDate.getHours()} <br/><br/>

            Dinero ahorrado este mes: {currentSave} <br/>
            Dinero ahorrado el mes pasado: {lastMonthSave}

        </div>
    );
}

export default Analytics;
