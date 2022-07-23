import React from 'react';
import { Link } from 'react-router-dom';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
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