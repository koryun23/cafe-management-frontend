import React from 'react';
import '../css/ViewOrders.css';

class ViewOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders : [
                {orderId: 1, tableId: 1, waiterUsername: "john11", status: "OPEN", date: new Date().toString()},
                {orderId: 2, tableId: 2, waiterUsername: "john11", status: "OPEN", date: new Date().toString()},
                {orderId: 3, tableId: 3, waiterUsername: "john11", status: "OPEN", date: new Date().toString()},
            ]
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => (
                        <div className="order-box" key={order.tableId.toString()}>
                            <div className="order-image"></div>
                            <b><i><p>Table Id: {order.tableId}</p></i></b>
                                <b><i><p>Waiter: {order.waiterUsername}</p></i></b>
                                <b><i><p>Status: {order.status}</p></i></b>
                                <b><i><p>Date: {order.date}</p></i></b>
                                <a className="update-order"
                                   href={"/orders/update/" + order.orderId}>
                                    Update Order
                                </a>
                                <a className="add-product-in-order"
                                   href={"/products-in-order/register/" + order.orderId} >
                                    Add Product
                                </a>
                                <a className="products-in-order-view" 
                                   href={"/products-in-order/" + order.orderId}>
                                    View Products
                                </a>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ViewOrders;