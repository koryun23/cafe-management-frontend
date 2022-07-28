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
                                <b><i><p>WaiterUsername: {order.waiterUsername}</p></i></b>
                                <b><i><p>Status: {order.status}</p></i></b>
                                <b><i><p>Date: {order.date}</p></i></b>
                                <a className="add-product-in-order"
                                   href={"/products-in-order/register/" + order.orderId} >
                                    Add Product
                                </a>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ViewOrders;