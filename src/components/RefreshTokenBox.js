import React from "react";
import "../css/RefreshTokenBox.css";
import axios from "axios";
import BackgroundImage from "./BackgroundImage";

const API_URL = "http://localhost:7000/";

class RefreshTokenBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshToken: ""
        }
        this.onFetchRefreshToken = this.onFetchRefreshToken.bind(this);
    }

    onFetchRefreshToken() {
        console.log(localStorage.getItem("username"));
        let headers = {
            "Content-Type" : "application/json"
        };
        let refreshToken = axios.post(
            API_URL + "refresh-token", 
            {username : localStorage.getItem("username")},
            {headers: headers}
        ).then(res => {
            console.log(res.data);
            localStorage.removeItem("token");
            localStorage.removeItem("expiresIn");
            localStorage.setItem("token", res.data.refreshToken);
            localStorage.setItem("expiresIn", res.data.expiresIn);
            this.setState({refreshToken: refreshToken});
            this.props.onRefresh();

        }).catch(err => {
            console.log(err.response);
        });
        console.log(refreshToken);
    }

    render() {
        console.log("refresh token box");
        return (
            <div>
                <BackgroundImage />
                <div className="refresh-token-box">
                    <br></br>
                    <h1 className="text">Session expired</h1>
                    <hr></hr>
                    <p className="text">Please confirm the session renewal.</p>
                    <button className="custom-button-refresh"
                            onClick={this.onFetchRefreshToken}>Confirm</button>
                </div>
            </div>

        );
    }
}

export default RefreshTokenBox;