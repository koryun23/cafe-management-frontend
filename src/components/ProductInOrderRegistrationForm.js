import axios from 'axios';
import React from 'react';
import ErrorMessage from './ErrorMessage';
import Input from './Input';
import Submit from './Submit';
import { Redirect, withRouter } from 'react-router-dom';
import Message from './Message';
const API_URL = "http://localhost:7000/";

class ProductInOrderRegistrationForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productAmount: '',
            registered: false,
            errorMessages: []
        }
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductAmountChange = this.handleProductAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static invalidCreds(creds) {
        return (
            !creds.productName ||
            !creds.productAmount
        );
    }

    handleProductNameChange(name) {
        this.setState({productName: name});
    }

    handleProductAmountChange(amount) {
        this.setState({productAmount: amount});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(ProductInOrderRegistrationForm.invalidCreds(this.state)) {
            this.setState({errorMessages: ["All fields are required"]});
            return;
        }
        console.log(this.state);
        console.log(this.props.match.params.orderId);
        const auth = "Bearer " + localStorage.getItem("token");
        axios.post(API_URL + "products-in-order/register/" + this.props.match.params.orderId, {
            productName: this.state.productName,
            amount: this.state.productAmount,
            orderId: this.props.match.params.orderId
        }, {headers: {
            "Authorization" : auth,
            "Content-Type" : "application/json"
        }}).then(res => {
            this.setState({registered: true}, () => console.log(this.state));
        }).catch(err => {
            console.log(err);
            this.setState({errorMessages: err.response.data.errors});
            //this.setState({errorMessages: err.response.data.errors});
        });
    }
    render() {
        return (
            <div className="user-add-form"> 
                <form className={this.state.errorMessages.length == 0 || !this.state.registered ? "form-group" : "form-group blur"}>
                    <Input type="text"
                        name="product-name"
                        placeholder="Product Name"
                        value={this.state.productName}
                        onChange={this.handleProductNameChange} 
                        label="Product Name" />
                    <Input type="number"
                        name="product-amount"
                        placeholder="Product Amount"
                        value={this.state.productAmount}
                        onChange={this.handleProductAmountChange} 
                        label="Product Amount" />
                    <Submit onSubmit={this.handleSubmit} value="Add Product"/>
                </form>
                {this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={() => this.setState({errorMessages: []})}/>}
                {this.state.registered && <Message message={"Successfully registered a product in order"} onClose={() => this.setState({registered: false})}/>}
            </div>
        );
    }
}

export default withRouter(ProductInOrderRegistrationForm);