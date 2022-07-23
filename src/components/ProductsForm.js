import React from 'react';
import Input from './Input.js';
import Submit from './Submit.js';

class ProductsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productPrice: '',
            productAmount: ''
        }
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductAmountChange = this.handleProductAmountChange.bind(this);
        this.handleProductPriceChange = this.handleProductPriceChange.bind(this);
    }

    handleProductNameChange(name) {
        this.setState({productName: [name]});
    }

    handleProductAmountChange(amount) {
        this.setState({productAmount: [amount]});
    }

    handleProductPriceChange(price) {
        this.setState({productPrice: [price]});
    }

    render() {
        return (
            <div className='user-add-form'>
                <form className="form-group">
                    <Input type="text"
                        name="product-name"
                        placeholder="Product Name"
                        value={this.state.productName}
                        onChange={this.handleProductNameChange} 
                        label="Product Name" />
                    <Input type="number"
                        name="product-price"
                        placeholder="Product Price"
                        value={this.state.productPrice}
                        onChange={this.handleProductPriceChange} 
                        label="Product Price" />
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

export default ProductsForm;