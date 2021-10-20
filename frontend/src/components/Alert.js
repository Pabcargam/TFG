import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SuccessStyle = {
    width: '100%',
    height: '4rem',
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#28a745',
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '1rem 2rem'
}

const FailStyle = {
    width: '100%',
    height: '4rem',
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#dc3545',
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '1rem 2rem'
}

const alertSuccess = () => (
    <div key={alert.id} style={SuccessStyle}>
        <p> La acción se ha llevado a cabo con exito </p>
    </div>
);

const alertFail = () => (
    <div key={alert.id} style={FailStyle}>
        <p> Ha ocurrido un error mientras se llevaba a cabo la acción </p>
    </div>
);

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div>
        {alert.alertType === 'success' ? alertSuccess() : alertFail()}
    </div>

));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);