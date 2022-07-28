import React from 'react';
import { useParams } from 'react-router-dom';
import Input from './Input';
import Submit from './Submit';

function GetOriginalName(props) {
    let {originalName} = useParams();
    return originalName;
}
class ProductsUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            originalName: GetOriginalName()
        };
    }

    render() {
        console.log(this.state.originalName);
        return (
            <div class="user-add-form">
                <form className="form-group">
                    <Input type="text"
                        name="product-name"
                        placeholder="Product Original Name"
                        value={this.state.productOriginalName}
                        onChange={this.handleProductOriginalNameChange} 
                        label="Product Original Name" />
                </form>
            </div>
        );
    }
}

export default ProductsUpdate;