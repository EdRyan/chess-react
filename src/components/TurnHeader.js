import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getCheckStatus } from "../selectors/playerSelectors";
import './TurnHeader.css';

library.add(faUser);

class TurnHeader extends React.Component {

    renderCheck() {
        return <>{this.props.checkStatus}</>;
    }

    render() {
        return (
            <div className={`turn-header`}>
                <div className="turn-header-main">
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
                <div className={`check-indicator  ${this.props.checkStatus ? 'in-check' : 'not-in-check'}`}>
                    {this.renderCheck()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        number: state.turn.number,
        player: state.turn.player,
        checkStatus: getCheckStatus(state.board, state.turn.player, state.player.enPassantSquareName)
    };
};

export default connect(mapStateToProps)(TurnHeader);