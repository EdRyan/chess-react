import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './TurnHeader.css';

library.add(faUser);

class TurnHeader extends React.Component {

    render() {
        return (
            <div className="turn-header">
                <div className="turn">
                    <h3>Turn</h3>
                </div>
                <div className="number">
                    {this.props.number}
                </div>
                <div className="player">
                    <h3>Player</h3>
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={`user`} color={this.props.player} size="2x" />
                    <p className={this.props.player}>{this.props.player}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        number: state.turn.number,
        player: state.turn.player
    };
};

export default connect(mapStateToProps)(TurnHeader);