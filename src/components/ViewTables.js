import axios, { CanceledError } from 'axios';
import React from 'react';
import '../css/ViewTables.css';
import BackgroundImage from './BackgroundImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCheck } from 'react-icons/fa';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import RefreshTokenBox from './RefreshTokenBox';
const API_URL = "http://localhost:7000/";

class ViewTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [

            ],
            tokenIsExpired: false
        };
        this.refresh = this.refresh.bind(this);
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
        }).catch(err => {
            if(err.response) { 
                if(err.response.status == 401) {
                    this.setState({tokenIsExpired: true});
                }
            }
            console.log(err.data);
        })
    }

    refresh() {
        this.setState({tokenIsExpired: false});
    } 

    render() {
        if(this.state.tokenIsExpired) {
            return <RefreshTokenBox onRefresh={this.refresh}/>
        }
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