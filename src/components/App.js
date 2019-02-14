import React from 'react';
import { connect } from 'react-redux';

import TurnHeader from "./TurnHeader";
import Chessboard from "./Chessboard";
import PromotePawn from "./PromotePawn";
import { restartGame } from "../actions";

class App extends React.Component {

    renderRestartButton() {
        if (this.props.canRestart) {
            return (
                <div style={{marginTop:'30px'}}>
                    <button className="ui button" onClick={this.props.onRestartClick}>Restart Game</button>
                </div>
            );
        };
    }

    renderPawnPromotionModal() {
        if (this.props.showPawnPromotionModal) {
            return <PromotePawn {...this.props} />
        }
    }

    render() {
        return (
            <div className="app ui container center aligned">
                <TurnHeader/>
                <Chessboard/>
                {this.renderRestartButton()}
                {this.renderPawnPromotionModal()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        canRestart: state.turn.number > 1,
        showPawnPromotionModal: state.player.showPawnPromotionModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRestartClick: () => dispatch(restartGame())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);