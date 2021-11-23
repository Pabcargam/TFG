import React, { useState } from 'react';
import Axios from 'axios';

const Analytics = () => {

    const [analytics, setAnalytics] = useState({
        innerTemp: '',
        meanInnerTemp: '',
        outterTemp: '',
        meanOutterTemp: '',
        diffTrigger: '',
        pump: ''
     });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token YJCYxd9ss0wJh1AivnRa0_j89oQGBFYLJpnpinZjohomSLTq0kcvUkPs90Px6xj688rwDt_s1bP14rmHSiHw_A=='
        }
    };

    const inner_temp = {
        "query": "SELECT inside FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 2m",
        "type": "influxql",
        "bucket": "sensors"
        };

    const mean_inner_temp = {
        "query": "SELECT MEAN(inside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 1h",
        "type": "influxql",
        "bucket": "sensors"
        };

    const outter_temp = {
        "query": "SELECT outside FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 2m",
        "type": "influxql",
        "bucket": "sensors"
        };

    const mean_outter_temp = {
        "query": "SELECT MEAN(outside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 1h",
        "type": "influxql",
        "bucket": "sensors"
        };

    const diff_trigger = {
        "query": "SELECT diff FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 2m",
        "type": "influxql",
        "bucket": "sensors"
        };

    const pump = {
        "query": "SELECT pump FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 2m",
        "type": "influxql",
        "bucket": "sensors"
        };

    const getAnalytics = () => {
        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', inner_temp, config).then(
            (response) => {
                setAnalytics({innerTemp : response.data.results[0].series[0].values[0][1]});
            }
        );

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', mean_inner_temp, config).then(
            (response) => {
                console.log(response);
                setAnalytics({meanInnerTemp : response.data.results[0].series[0].values[0][1]});
            }
        );

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', outter_temp, config).then(
            (response) => {
                console.log(response);
                setAnalytics({outterTemp : response.data.results[0].series[0].values[0][1]});
            }
        );

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', mean_outter_temp, config).then(
            (response) => {
                console.log(response);
                setAnalytics({meanOutterTemp : response.data.results[0].series[0].values[0][1]});
            }
        );

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', diff_trigger, config).then(
            (response) => {
                console.log(response);
                setAnalytics({diffTrigger : response.data.results[0].series[0].values[0][1]});
            }
        );

        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', pump, config).then(
            (response) => {
                console.log(response);
                setAnalytics({pump : response.data.results[0].series[0].values[0][1]});
            }
        );
    };

    return (
        <div>
            Hello, get your analytics by clicking in the next button. 
            <button onClick={getAnalytics}> Get Analytics </button>
            {analytics.innerTemp}

        </div>
    );
}

export default Analytics;
