import React from 'react';
import Input from './Input';
import '../css/OrdersRegister.css';
class OrdersRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: "Successfully registered an order",
            success: false
        }
    }

    render() {
        return (
            <div className={"response-box "+ (this.state.success ? "green" : "red")} >
                <h3 className="response">{this.state.response}</h3>
            </div>
        );
    }
}

export default OrdersRegister;