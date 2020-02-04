import React, {Component} from 'react';
import './BiddingForm.css';
import api from '../api'

const BID_VALUE = {
    MIN: 0,
    MAX: 1
}

export default class BiddingForm extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            amount: '',
            error: ''
        }
    }

    _handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            error: ''
        });
    }

    _checkValidation = event => {
        if (!this.state.name) {
            this.setState({
                error: 'Please enter your name!'
            })
        } else if (!this.state.amount) {
            this.setState({
                error: 'Please enter your bid amount!'
            })
        } else if (this.state.amount <= BID_VALUE.MIN || this.state.amount >= BID_VALUE.MAX) {
            this.setState({
                error: 'Bid amount should be between 0 and 1!'
            })
        } else {
            this._placeBid()
        }

        event.preventDefault();
    }

    _placeBid = async () => {
        const { name, amount } = this.state
        const payload = { name, amount }

        await api.placeBid(payload).then(res => {
            window.alert(`Bid placed successfully`)
            this.setState({
                name: '',
                amount: '',
            })
        })
    }

    render () {
        return (
            <div className="form-container">
                <form onSubmit={this._checkValidation} className="bidding-form">
                    <div className="page-title">Place Your Bid</div>
                    <label className="row">
                        Name
                        <input className="bidding-input" type="text" name="name" value={this.state.name} onChange={this._handleChange} />
                    </label>
                    <label className="row">
                        Bid (between 0.01 and 0.99)
                        <input className="bidding-input" type="text" name="amount" value={this.state.amount} onChange={this._handleChange} />
                    </label>
                    <input type="submit" value="Submit" className="submit-button" />
                    {
                        this.state.error &&
                            <div className="error-message">
                                {this.state.error}
                            </div>
                    }
                </form>
            </div>
        )
    }
}