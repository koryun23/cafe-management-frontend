import React from 'react';
import Input from './Input.js';
import Submit from './Submit';

class TableForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSeatsChange = this.handleSeatsChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.state = {
            seats: '', code: ''
        }
    }

    handleSeatsChange(seats) {
        this.setState({seats: [seats]});
    }

    handleCodeChange(code) {
        this.setState({code: [code]});
    }

    render() {
        return (
            <div className='user-add-form'>
                <form className="form-group">
                    <Input type="number"
                        name="seats"
                        placeholder="Number of seats"
                        value={this.state.seats}
                        onChange={this.handleSeatsChange} 
                        label="Seats" />
                    <Input type="text"
                        name="code"
                        placeholder="Table code"
                        value={this.state.code}
                        onChange={this.handleCodeChange} 
                        label="Table Code" />
                    <Submit onSubmit={this.handleSubmit} value="Add"/>
                </form>
            </div>
        );
    }
}
export default TableForm;