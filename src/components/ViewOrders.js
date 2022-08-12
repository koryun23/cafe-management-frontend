import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import axios from 'axios';
import React from 'react';
import '../css/ViewOrders.css';
import BackgroundImage from './BackgroundImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const API_URL = "http://localhost:7000/";

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

        this.handleAddProductInOrderClick = this.handleAddProductInOrderClick.bind(this);
        this.handleViewProductsInOrderClick = this.handleViewProductsInOrderClick.bind(this);
    }

    componentDidMount() {
        const auth = "Bearer " + localStorage.getItem("token");
        axios.get(API_URL + "orders", {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            },
            data: {}
        }).then(res => {
            this.setState({orders: res.data.orderRetrievalResponseDtoList.map(order => (
                {
                    orderId: order.orderId,
                    tableId: order.tableId,
                    waiterUsername: order.waiterUsername,
                    status: order.orderStatus,
                    date: new Date(order.createdAt)
                }
            ))});
        }).catch(err => {
            console.log(err);
        });
    }

    handleAddProductInOrderClick(id) {
        localStorage.setItem("orderId", id);
    }

    handleViewProductsInOrderClick(id) {
        localStorage.setItem("orderId", id);
    }
    render() {
        console.log(this.state);
        return (
            <div className='main-div'>
                <table>
                    <tr>
                        <th>Table Id</th>
                        <th>Status</th>
                        <th>Waiter</th>
                        <th>Created At</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                {
                    this.state.orders.map(order => (
                            <tr>
                                <td>{order.tableId}</td>
                                <td>{order.status}</td>
                                <td>{order.waiterUsername}</td>
                                <td>{order.date.toLocaleString()}</td>
                                <td>
                                    <a className="update-order"
                                        href={"/orders/update/" + order.orderId}>
                                        {<FontAwesomeIcon icon={faEdit} size="lg"/>} Order
                                    </a>
                                </td>
                                <td>
                                    <a className="add-product-in-order"
                                    href={"/products-in-order/register/" + order.orderId} 
                                    onClick={() => this.handleAddProductInOrderClick(order.orderId)}>
                                        {<FontAwesomeIcon icon={faAdd} size="lg"/>} Product
                                    </a>
                                </td>
                                <td>
                                    <a className="products-in-order-view" 
                                    href={"/products-in-order/" + order.orderId}
                                    onClick={() => this.handleViewProductsInOrderClick(order.orderId)}>
                                        {<FontAwesomeIcon icon={faSearch} size="lg"/>} Products
                                    </a>
                                </td>
                            </tr>
                    ))
                }
                </table>

            </div>
        );
    }
}

export default ViewOrders;