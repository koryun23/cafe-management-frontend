import React from 'react';
import Menu from './Menu.js';

class WaiterHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.menuItems = [
            {path: '', text: 'Orders'}
        ];
        this.orderDropdownItems = [
            {path: '/orders/register', text: 'Register Orders', onClick: ''}
        ];

        this.dropdownItems = [
            this.orderDropdownItems
        ];
    }

    handleRegisterOrdersClick(event) {

    }
    
    render() {
        return (
            <div>
                <Menu items={this.menuItems} dropdownItems={this.dropdownItems}/>
            </div>
        );
    }
}

export default WaiterHomePage;