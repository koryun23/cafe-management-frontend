import React from 'react';
import '../css/ViewTables.css';

class ViewTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [
                {code: "qwerty", numberOfSeats: 5},
                {code: "abcd", numberOfSeats: 3},
                {code: "asdf123", numberOfSeats: 4}
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
                            <p className="table-code">CODE: {table.code}</p>
                            <p className="table-seats">SEATS: {table.numberOfSeats}</p>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ViewTables;