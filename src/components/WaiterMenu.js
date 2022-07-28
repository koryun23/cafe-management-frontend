import React from 'react';
import Menu from './Menu.js';

class WaiterMenu extends React.Component {
    constructor(props) {
        super(props);
        this.menuItems = [
            {path: '', text: 'Assigned Tables'},
            {path: '', text: 'Orders'}
        ]
        this.assignedTablesDropdownItems = [
            {path: '/tables-to-waiters', text: 'View Assigned Tables'}
        ]
        this.ordersDropdownItems = [
            {path: '/orders', text: 'View Orders'}
        ]
        this.dropdownItems = [
            this.assignedTablesDropdownItems,
            this.ordersDropdownItems
        ]
    }

    render() {
        return <Menu items={this.menuItems} dropdownItems={this.dropdownItems} />
    }
}

export default WaiterMenu;