import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const SuspendProfile = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <FaExclamationTriangle size={50} color="red" />
            <h1>Your application has been suspended</h1>
            <p>due to your restricted activity.</p>
            <p>If you have any queries, please contact us on:</p>
            <p>Mobile: 9100000000</p>
            <p>Email: transithive.system@gmail.com</p>
        </div>
    );
};

export default SuspendProfile;