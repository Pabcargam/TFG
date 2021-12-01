import React, { useState } from 'react';
import Axios from 'axios';

const Analytics = () => {

    // --- DATABASE DATA STATES --- //

    const [innerTemp, setInnerTemp] = useState(0);
    const [meanInnerTemp, setMeanInnerTemp] = useState(0);
    const [outterTemp, setOutterTemp] = useState(0);
    const [meanOutterTemp, setMeanOutterTemp] = useState(0);
    const [diffTrigger, setDiffTrigger] = useState(0);
    const [pump, setPump] = useState(false);


        // --- ENERGY SAVE DATA STATES --- //

        const [currentTankTempDiff, setCurrentTankTempDiff] = useState(0);
        const [lightPriceGenTime, setLightPriceGenTime] = useState(0);
        const [performanceTempDiff, setPerformanceTempDiff] = useState(0);


    // --- ELECTRICITY DATA STATES --- //

    const[lightPrice, setLightPrice] = useState(0);


    /*
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    */


    const getAnalytics = () => {

        // --- DATE AND TIME VARIABLES --- //

        var today = new Date();
        var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var currentHour = today.getHours();
        var minHourPerformance = today.getHours() - 12;
        var maxHourPerformance = today.getHours() - 17;


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

        const paramsAPIluz = {
            params: {
                'start_date': currentDate + 'T00:00',
                'end_date': currentDate + 'T23:59',
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
            "query": "SELECT MEAN(inside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 12h",
            "type": "influxql",
            "bucket": "sensors"
            };

        const outter_temp = {
            "query": "SELECT outside FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 2m",
            "type": "influxql",
            "bucket": "sensors"
            };

        const mean_outter_temp = {
            "query": "SELECT MEAN(outside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 12h",
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

    
            // --- BODY ENERGY SAVE API REQUESTS --- //

            const current_tank_temp_diff = {
                "query": "SELECT inside FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time >= now() - " + currentHour + "h AND time <= now()",
                "type": "influxql",
                "bucket": "sensors"
            };

            const performance_temp_diff = {
                "query": "SELECT inside FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time >= now() - " + minHourPerformance + "h - 1d AND time <= now() - " + maxHourPerformance + "h - 1d",
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


            // --- ENERGY SAVE API REQUESTS --- //

            Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', current_tank_temp_diff, headersDB).then(
                (response) => {
                    console.log(response);
                    var totalValues = response.data.results[0].series[0].values;
                    setCurrentTankTempDiff(response.data.results[0].series[0].values[totalValues.length - 1][1] - response.data.results[0].series[0].values[0][1]);
                }
            );

            Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', performance_temp_diff, headersDB).then(
                (response) => {
                    console.log(response);
                    var totalValues = response.data.results[0].series[0].values;
                    setPerformanceTempDiff(response.data.results[0].series[0].values[totalValues.length - 1][1] - response.data.results[0].series[0].values[0][1]);
                }
            );


        // --- ELECTRICITY API REQUESTS --- //

        Axios.get('https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real', paramsAPIluz, headersAPIluz).then(
            (response) => {
                console.log(response);
                setLightPrice(response.data.included[0].attributes.values[currentHour].value);
                setLightPriceGenTime(response.data.included[0].attributes.values[11].value);
            }
        );

        console.log(currentDate);
        console.log(currentHour);

    };


    // --- POSTPROCESSED VARIABLES --- //

        var energySaved = (300 * currentTankTempDiff) * 0.00116222;
        var moneySaved = energySaved * (lightPriceGenTime/1000);
        var realPerformance = (((performanceTempDiff/5) * 300) * 0.00116222);
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
            <button onClick={getAnalytics}> Get Analytics </button><br/>
            Temperatura del tanque: {innerTemp}° <br/>
            Media de temperatura del tanque: {meanInnerTemp}° <br/>
            Temperatura de la placa: {outterTemp}°<br/>
            Media de temperatura de la placa: {meanOutterTemp}° <br/>
            Diferencial de activación: {diffTrigger}° <br/>
            Bombeo: {pump ? 'Activado' : 'No Activado'}<br/><br/>

            Precio de la luz (Hora actual): {(lightPrice/1000).toFixed(3)} €/kWh <br/><br/>

            Energía ahorrada (Para tanque de 300L): {energySaved.toFixed(3)} kW <br/><br/>

            Dinero ahorrado hoy (Para el precio de generación a las 12 del mediodía): {moneySaved.toFixed(2)} € <br/><br/>

            Rendimiento de las placas solares: {performanceString} <br/>
            {performanceTempDiff}° <br/>
            {realPerformance} kW/h <br/>
            {expectedPerformance} kW/h

        </div>
    );
}

export default Analytics;
