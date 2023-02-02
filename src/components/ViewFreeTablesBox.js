import React from "react";
import axios from "axios";
import "../css/ViewFreeTablesBox.css";

class ViewFreeTablesBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            freeTables: []
        }
    }

    fetchFreeTables() {

    }

    componentDidMount() {
        this.fetchFreeTables();
    }

    render() {
        return (
            <div className="tables-box"></div>
        );
    }

}