import React from 'react';
import Menu from './Menu.js';

class ManagerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.menuItems = [
            {path: '', text: 'Users'},
            {path: '', text: 'Tables'},
            {path: '', text: 'Products'},
        ];

        this.usersDropdownItems = [
            {path: '/users/register', text: 'Add Users'},
            {path: '/users', text: 'View Users'}
        ];

        this.tablesDropdownItems = [
            {path: '/tables/register', text: 'Add Tables'},
            {path: '/tables-to-waiters/assign', text: 'Assign'},
            {path: '/tables', text: 'View Tables'}
        ];

        this.productsDropdownItems = [
            {path: '/products/register', text: 'Add Products'},
            {path: '/products', text: 'View Products'}
        ];

        this.dropdownItems = [
            this.usersDropdownItems,
            this.tablesDropdownItems,
            this.productsDropdownItems,
        ]
    }

    render() {
        return (
            <div>
                <Menu items={this.menuItems} dropdownItems={this.dropdownItems}/>

            </div>
        );
    }
}

export default ManagerMenu;