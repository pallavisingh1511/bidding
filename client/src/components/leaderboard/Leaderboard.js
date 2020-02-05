import React, { Component } from 'react';
import './Leaderboard.css';
import api from '../../api'

class Leaderboard extends Component {
    constructor () {
        super()
        this.state = {
            leaderboardData: []
        }
    }
    componentDidMount() {
        api.getLeaderboard().then(response => {
            // debugger
            this.setState({
                leaderboardData: response.data.data
            })
        })
    }
    render () {
        return (
            <div className="leaderboard-container">
                {Object.keys(this.state.leaderboardData).length > 0 ?
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                    {this.state.leaderboardData.map(bid => (
                        <tr>
                            <td>{bid.name}</td>
                            <td>{bid.amount}</td>
                        </tr>
                    ))}
                </table>
                :
                <div>No bids have been placed yet!</div>
                }

            </div>
        )
    }
}

export default Leaderboard