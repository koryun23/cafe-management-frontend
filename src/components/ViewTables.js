import axios from 'axios';
import React from 'react';
import '../css/ViewTables.css';

const API_URL = "http://localhost:7000/";

class ViewTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [
                {code: "qwerty", numberOfSeats: 5, status: "FREE", id: 1},
                {code: "abcd", numberOfSeats: 3, status: "FREE", id: 2},
                {code: "asdf123", numberOfSeats: 4, status: "FREE", id: 3}
            ]
        };
    }

    componentDidMount() {
        const auth = "Bearer " + localStorage.getItem("token");
        const getTables = axios.get(API_URL + "tables", {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            },
            data: {

            }
        });
        getTables.then(res => {
            console.log(res.data);
            const fetchedTables = res.data.cafeTableRetrievalResponseDtoList.map(table => (
                {id: table.id, code: table.code, numberOfSeats: table.seats, status: table.status}
            ))
            this.setState({tables: fetchedTables});
        }).catch(res => {
            console.log(res.data);
        })
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
                            <b><p className="table-status">STATUS: {table.status}</p></b>
                            <b><p className="table-id">ID: {table.id}</p></b>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ViewTables;