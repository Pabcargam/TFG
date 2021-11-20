import React, { useState } from 'react';
import Axios from 'axios';

const Analytics = () => {
    const [analytics, setAnalytics] = useState("");

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token YJCYxd9ss0wJh1AivnRa0_j89oQGBFYLJpnpinZjohomSLTq0kcvUkPs90Px6xj688rwDt_s1bP14rmHSiHw_A=='
        }
    };

    const body = {
        "query": "SELECT MEAN(outside) FROM mqtt_consumer WHERE topic = 'ivanlab/solaris/S/2' AND time > now() - 20m",
        "type": "influxql",
        "bucket": "sensors"
        };

    const getAnalytics = () => {
        Axios.post('http://pablo-dev.ivanlab.lan:8086/api/v2/query?org=TFG_sensors', body, config).then(
            (response) => {
                console.log(response);
            }
        );
    };

    return (
        <div>
            Hello, get your analytics by clicking in the next button. 
            <button onClick={getAnalytics}> Get Analytics </button>
        </div>
    );
}

export default Analytics;
