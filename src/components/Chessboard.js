import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { arrayIndicesToSquareName } from "../helpers";
import Square from './Square';
import './Chessboard.css';

class Chessboard extends React.Component {

    componentDidMount() {
        this.props.initializeChessboard();
    }

    renderBoard() {

        let white = true;

        return [...Array(8).keys()].map(b => {
            const y = 7-b;

            return  (
                <div key={`row-${y}`} className="row">
                    {
                        [...Array(8).keys()].map(x => {

                            if (x !== 0) {
                                white = !white;
                            }

                            return <Square key={`square-${x}-${y}`} name={arrayIndicesToSquareName([x,y])} color={white ? 'white' : 'black'}/>;
                        })
                    }
                </div>
            );
        });
    }

    render() {
        return (
            <div className="chessboard">
                {this.renderBoard()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        board: state.board
    };
};

export default connect(mapStateToProps, actions)(Chessboard);