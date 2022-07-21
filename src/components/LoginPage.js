import React from 'react';
import '../css/Login.css';
import BackgroundImage from './BackgroundImage.js';
import LoginBox from './LoginBox.js';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login-page justify-content-center">
                <BackgroundImage />
                <SiteDescription />
                <LoginBox />
            </div>
        );
    }
}

class SiteDescription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="description">
                    Cafe Management
                </h1>
            </div>
        );
    }
}


export default LoginPage;