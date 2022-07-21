import React from 'react';
import { Link } from 'react-router-dom';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.menuItem.onClick(event);
    }
    render() {
        const item = this.props.menuItem;
        return (
            <li key={item.text}>
                <Link to={item.path} onClick={this.handleClick}>{item.text}</Link>
            </li>
        );
    }
}

export default MenuItem;