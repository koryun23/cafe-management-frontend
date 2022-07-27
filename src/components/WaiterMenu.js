import React from 'react';
import Menu from './Menu.js';

class WaiterMenu extends React.Component {
    constructor(props) {
        super(props);
        this.menuItems = []
        this.dropdownItems = [this.assignedTablesDropdownItems]
    }

    render() {
        return <Menu items={this.menuItems} dropdownItems={this.dropdownItems} />
    }
}

export default WaiterMenu;