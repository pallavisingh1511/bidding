import React, {Component} from 'react';
import './BiddingForm.css';
const BID_VALUE = {
    MIN: 0,
    MAX: 1
}

export default class BiddingForm extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            bid: '',
            error: ''
        }
    }

    _handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            error: ''
        });
    }

    _placeBid = event => {
        if (!this.state.name) {
            this.setState({
                error: 'Please enter your name!'
            })
        } else if (!this.state.bid) {
            this.setState({
                error: 'Please enter your bid amount!'
            })
        } else if (this.state.bid <= BID_VALUE.MIN || this.state.bid >= BID_VALUE.MAX) {
            this.setState({
                error: 'Bid amount should be between 0 and 1!'
            })
        }
        event.preventDefault();
    }

    render () {
        return (
            <div className="form-container">
                <form onSubmit={this._placeBid} className="bidding-form">
                    <div className="page-title">Place Your Bid</div>
                    <label className="row">
                        Name
                        <input className="bidding-input" type="text" name="name" value={this.state.name} onChange={this._handleChange} />
                    </label>
                    <label className="row">
                        Bid (between 0.01 and 0.99)
                        <input className="bidding-input" type="text" name="bid" value={this.state.bid} onChange={this._handleChange} />
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