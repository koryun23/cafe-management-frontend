import React from 'react';
import "../css/ErrorMessage.css";
class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="error-message">
                <br/>
                <br/>
                <h2 className="error-heading">Error</h2>
                <p className="text">
                    {this.props.message}
                </p>
                <button className="close" onClick={this.props.onClose}>
                    <p className="close-text">OK</p>
                </button>
            </div>
        );
    }
}

export default ErrorMessage;