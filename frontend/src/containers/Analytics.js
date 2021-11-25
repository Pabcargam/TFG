import React, { useState } from 'react';
import Axios from 'axios';

const Analytics = () => {

    // --- DATE AND TIME VARIABLES --- //

    var today = new Date();
    var actualDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay();
    var actualHour = today.getHours();


    // --- DATABASE DATA STATES --- //

    const [innerTemp, setInnerTemp] = useState(0);
    const [meanInnerTemp, setMeanInnerTemp] = useState(0);
    const [outterTemp, setOutterTemp] = useState(0);
    const [meanOutterTemp, setMeanOutterTemp] = useState(0);
    const [diffTrigger, setDiffTrigger] = useState(0);
    const [pump, setPump] = useState(false);


    // --- ELECTRICITY DATA STATES --- //

    const[precioLuz, setPrecioLuz] = useState(0);


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
            'start_date': actualDate + '00:00',
            'end_date': actualDate + '23:59',
            'time_trunc': 'hour'  
        }
    };


    // --- BODY DATABASE API REQUESTS --- //

    const inner_temp = {
        "query": "SELECT inside FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/1' AND time > now() - 2m",
        "type": "influxql",
        "bucket": "sensors"
        };

    const mean_inner_temp = {
        "query": "SELECT MEAN(inside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/1' AND time > now() - 1h",
        "type": "influxql",
        "bucket": "sensors"
        };

    const outter_temp = {
        "query": "SELECT outside FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/1' AND time > now() - 2m",
        "type": "influxql",
        "bucket": "sensors"
        };

    const mean_outter_temp = {
        "query": "SELECT MEAN(outside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/1' AND time > now() - 1h",
        "type": "influxql",
        "bucket": "sensors"
        };

    const diff_trigger = {
        "query": "SELECT diff FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/1' AND time > now() - 2m",
        "type": "influxql",
        "bucket": "sensors"
        };

    const pump_bool = {
        "query": "SELECT pump FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/1' AND time > now() - 2m",
        "type": "influxql",
        "bucket": "sensors"
        };

    const getAnalytics = () => {


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
                setMeanInnerTemp(response.data.results[0].series[0].values[0][1]);
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
                setMeanOutterTemp(response.data.results[0].series[0].values[0][1]);
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


        // --- ELECTRICITY API REQUESTS --- //

        Axios.get('https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real', paramsAPIluz, headersAPIluz).then(
            (response) => {
                console.log(response);
                setPrecioLuz(response.data.included[0].attributes.values[actualHour].value);
            }
        );

    };

    return (
        <div>
            Hello, get your analytics by clicking in the next button. 
            <button onClick={getAnalytics}> Get Analytics </button><br/>
            {innerTemp}<br/>
            {meanInnerTemp}<br/>
            {outterTemp}<br/>
            {meanOutterTemp}<br/>
            {diffTrigger}<br/>
            {pump ? 'True' : 'False'}<br/><br/>
            {precioLuz}
            

        </div>
    );
}

export default Analytics;
