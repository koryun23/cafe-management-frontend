import React from 'react';
import '../css/ViewProduct.css';
import Submit from './Submit.js';
import {FaBeer} from 'react-icons/fa';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import BackgroundImage from './BackgroundImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from './ErrorMessage';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/to-have-accessible-description';
import ProductsUpdate from './ProductsUpdate';
import DeleteConfirm from './DeleteConfirm';

const API_URL = "http://localhost:7000/";
class ViewProducts extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            errorMessages: [],
            showUpdateForm: false,
            showDeleteConfirm: false,
            selectedProduct: {}
        }
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.onUpdateFormClose = this.onUpdateFormClose.bind(this);
    }

    componentDidMount() {
        const auth = "Bearer " + localStorage.getItem("token");
        const getProducts = axios.get(API_URL + "products", {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            },
            data: {}
        });
        getProducts.then(res => {
            console.log(res.data);
            const fetchedProducts = res.data.productRetrievalResponseDtoList.map(product => (
                {productName: product.name, productAmount: product.amount, productPrice: product.price, productId: product.id}
            ))
            this.setState({products: fetchedProducts});
        }).catch(error => {
            console.log(error);
        });
    }
    handleUpdateClick(product) {
        this.setState({showUpdateForm: true, selectedProduct: product});
    }

    handleDeleteClick(product) {
        this.setState({showDeleteConfirm: true, selectedProduct: product});
        console.log(product.id);
    }

    onUpdateFormClose(event) {
        event.preventDefault();
        this.setState({showUpdateForm: false});
    }

    render() {
        console.log(this.state.errorMessages);
        if(this.state.products.length == 0) {
            return (
                <div className='main-div'>
                    <h2 className="h2">Oops!</h2>
                    <p className='p'>No Data found.</p>
                </div>
            );
        }
        return (
            <div className="main-div">
                <table className={this.state.errorMessages.length == 0 && !this.state.showUpdateForm && !this.state.showDeleteConfirm ? '' : 'blur'}>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th className="last-row"></th>
                        </tr>
                    {
                        this.state.products.map((product) => (
                            <tr>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.productAmount}</td>
                                <td>{product.productPrice}</td>
                                <td className="last-row">
                                    <a className="update-button" onClick={() => this.handleUpdateClick(product)}>
                                        {<FontAwesomeIcon icon={faEdit}/>}
                                    </a>
                                    <a className="delete-button" onClick={() => this.handleDeleteClick(product)}>
                                        {<FontAwesomeIcon icon={faTrash}/>}
                                    </a>
                                </td>

                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {this.state.errorMessages.length > 0 &&
                <ErrorMessage message={this.state.errorMessages[0]} onClose={() => this.setState({errorMessages: []})} />}
                {this.state.showUpdateForm &&
                <ProductsUpdate product={this.state.selectedProduct} onUpdate={() => this.setState({showUpdateForm: false})} onUpdateFormClose={this.onUpdateFormClose}/>}
                {this.state.showDeleteConfirm &&
                <DeleteConfirm product={this.state.selectedProduct} onDelete={() => this.setState({showDeleteConfirm: false})} onCancelDeletion={() => this.setState({showDeleteConfirm: false})} />}
            </div>
        );
    }
}

export default ViewProducts;