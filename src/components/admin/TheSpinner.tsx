import React from 'react';

const TheSpinner = () => {
    return (
        <div className="pt-3 text-center">
            <div className="sk-spinner sk-spinner-pulse" />
        </div>
    );
};

export default React.memo(TheSpinner);
