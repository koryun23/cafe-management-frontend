import React from 'react';
import '../css/ViewTables.css';

class ViewTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [
                {code: "qwerty", numberOfSeats: 5, id: 1},
                {code: "abcd", numberOfSeats: 3, id: 2},
                {code: "asdf123", numberOfSeats: 4, id: 3}
            ]
        };
    }

    render() {
        return (
            <div>
                {
                    this.state.tables.map(table => (
                        <div className="table-box">
                            <div className="table-image"></div>
                            <b><p className="table-code">CODE: {table.code}</p></b>
                            <b><p className="table-seats">SEATS: {table.numberOfSeats}</p></b>
                            <b><p className="table-id">ID: {table.id}</p></b>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ViewTables;