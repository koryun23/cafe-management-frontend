import axios from 'axios';
import React from 'react';
import ErrorMessage from './ErrorMessage';
import Input from './Input';
import Submit from './Submit';

const API_URL = "http://localhost:7000/";

class ProductInOrderRegistrationForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productAmount: 0,
            waiterUsername: this.props.waiterUsername,
            registered: false,
            errorMessages: []
        }
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductAmountChange = this.handleProductAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleProductNameChange(name) {
        this.setState({productName: name});
    }

    handleProductAmountChange(amount) {
        this.setState({productAmount: amount});
    }

    handleSubmit(event) {
        console.log(this.state);
        console.log(localStorage.getItem("orderId"));
        const auth = "Bearer " + localStorage.getItem("token");
        axios.post(API_URL + "products-in-order/register/" + localStorage.getItem("orderId"), {
            productName: this.state.productName,
            amount: this.state.productAmount,
            orderId: localStorage.getItem("orderId")
        }, {headers: {
            "Authorization" : auth,
            "Content-Type" : "application/json"
        }}).then(res => {
            this.setState({registered: true});
            localStorage.removeItem("orderId");
        }).catch(err => {
            console.log(err);
            //this.setState({errorMessages: err.response.data.errors});
        });
        this.setState({
            productName: '',
            productAmount: '',
            waiterUsername: this.props.waiterUsername
        });
        localStorage.removeItem("orderId");
    }
    render() {
        return (
            <div className="user-add-form"> 
                <form className={this.state.errorMessages.length == 0 ? "form-group" : "form-group blur"}>
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
            </div>
        );
    }
}

export default ProductInOrderRegistrationForm;