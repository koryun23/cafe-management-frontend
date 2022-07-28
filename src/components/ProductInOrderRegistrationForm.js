import React from 'react';
import Input from './Input';
import Submit from './Submit';
class ProductInOrderRegistrationForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productAmount: '',
            waiterUsername: this.props.waiterUsername
        }
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductAmountChange = this.handleProductAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleProductNameChange(name) {
        this.setState({productName: [name]});
    }

    handleProductAmountChange(amount) {
        this.setState({productAmount: [amount]});
    }

    handleSubmit(event) {
        console.log(this.state);
        this.setState({
            productName: '',
            productAmount: '',
            waiterUsername: this.props.waiterUsername
        });
    }
    render() {
        return (
            <div className="user-add-form"> 
                <form className="form-group">
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
            </div>
        );
    }
}

export default ProductInOrderRegistrationForm;