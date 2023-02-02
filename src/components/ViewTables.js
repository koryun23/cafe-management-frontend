import axios from 'axios';
import React from 'react';
import '../css/ViewTables.css';
import BackgroundImage from './BackgroundImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCheck } from 'react-icons/fa';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
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
        if(this.state.tables.length == 0) {
            return (
                <div className='main-div'>
                    <h2 className="h2">Oops!</h2>
                    <p className='p'>No Data found.</p>
                </div>
            );
        }
        return (
            <div className='main-div'>
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Code</th>
                        <th>Seats</th>
                        <th>Status</th>
                    </tr>
                {
                    this.state.tables.map(table => (
                        <tr>
                            <td>{table.id}</td>
                            <td>{table.code}</td>
                            <td>{table.numberOfSeats}</td>
                            <td>
                                {
                                    (table.status == 'FREE' && <FontAwesomeIcon icon={faCheck} size="lg"/>) ||
                                    (table.status == 'TAKEN' && <FontAwesomeIcon icon={faClose} size="lg" />)
                                }
                            </td>
                        </tr>
                        // <div className="table-box">
                        //     <div className="table-image"></div>
                        //     <b><p className="table-code">CODE: {table.code}</p></b>
                        //     <b><p className="table-seats">SEATS: {table.numberOfSeats}</p></b>
                        //     <b><p className="table-status">STATUS: {table.status}</p></b>
                        //     <b><p className="table-id">ID: {table.id}</p></b>

                        // </div>
                    ))
                }
                </table>

            </div>
        );
    }
}

export default ViewTables;