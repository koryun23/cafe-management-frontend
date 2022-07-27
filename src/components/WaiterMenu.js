import React from 'react';
import Menu from './Menu.js';

class WaiterMenu extends React.Component {
    constructor(props) {
        super(props);
        this.menuItems = [
            {path: '', text: 'Orders'}
        ]

        this.orderDropdownItems = [
            {path: '/orders', text: 'See orders'}
        ]
        this.dropdownItems = [
            this.orderDropdownItems
        ]
    }

    render() {
        return <Menu items={this.menuItems} dropdownItems={this.dropdownItems} />
    }
}

export default WaiterMenu;