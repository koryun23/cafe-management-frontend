import React from 'react';
import "../css/ErrorMessage.css";
class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="error-message">
                <br/>
                <br/>
                <h2 className="error-heading">Success</h2>
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

export default Message;