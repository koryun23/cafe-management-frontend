import React from 'react';
import '../css/ViewProductsInOrder.css';

class ViewProductsInOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsInOrder: [
                {productName: 'Product1', orderId: 1, amount: 5, status: "ACTIVE"},
                {productName: 'Product2', orderId: 1, amount: 3, status: "ACTIVE"},
                {productName: 'Product3', orderId: 2, amount: 5, status: "ACTIVE"}
            ]
        };
    }

    render() {
        return (
            <div>
                {
                    this.state.productsInOrder.map(product => (
                        <div className="product-in-order-box">
                            <div className="product-image"></div>
                            <h2 className="product-name">{product.productName}</h2>
                            <b><i><p className="order-id">Order Id: {product.orderId}</p></i></b>
                            <b><i><p className="status">Status: {product.status}</p></i></b>
                            <a className="update-product-in-order"
                               href={"/products-in-order/update/" + product.orderId}>
                                Update
                            </a>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ViewProductsInOrder;