import React from 'react';
import '../css/Box.css';

class Box extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"box box-" + this.props.color}>
                <div className={this.props.imageClassName}></div>
                <p className="box-description">{this.props.text}</p>
                <a className={"box-button box-button-" + this.props.color}
                        href={this.props.path}>
                    {this.props.buttonText}
                </a>
                
            </div>
        );
    }
}

export default Box;