import React from 'react';
import { connect } from 'react-redux';

import TurnHeader from "./TurnHeader";
import Chessboard from "./Chessboard";
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

    render() {
        return (
            <div className="app ui container center aligned">
                <TurnHeader/>
                <Chessboard/>
                {this.renderRestartButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        canRestart: state.turn.number > 1
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRestartClick: () => dispatch(restartGame())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);