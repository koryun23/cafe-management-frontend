import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../css/Menu.css"
import UserForm from "./UserForm.js";
import TableForm from "./TableForm.js";
import AssignForm from "./AssignForm.js";
import MenuItem from "./MenuItem";

class Menu extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav>
                    <ul> {
                            this.props.items.map((item) => (
                                <MenuItem menuItem={{path: item.path, text: item.text, onClick: item.onClick}} />
                            ))
                        } 
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Menu;