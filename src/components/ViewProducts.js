import React from 'react';
import '../css/ViewProduct.css';
import Submit from './Submit.js';

class ViewProducts extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {productName: "Product1", productAmount: 50, productPrice: 150},
                {productName: "Product2", productAmount: 25, productPrice: 200},
                {productName: "Product3", productAmount: 20, productPrice: 850},
            ]
        }
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleUpdateClick(event) {

    }

    handleDeleteClick(event) {

    }

    render() {
        return (
            <div className="products">
                {
                    this.state.products.map((product) => (
                        <div className="product-box">
                            <h2 className="name">{product.productName}</h2>
                            <i><b><p className="amount">AMOUNT: {product.productAmount}</p></b></i>
                            <i><b><p className="price">PRICE: {product.productPrice}</p></b></i>
                            <input type="submit"
                                   value="Update"
                                   onClick={this.handleUpdateClick} 
                                   className="btn btn-primary"/>
                            <br/>
                            <input type="submit"
                                   value="Delete "
                                   onClick={this.handleDeleteClick} 
                                   className="btn btn-danger"/>                                   
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ViewProducts;