import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { arrayIndicesToSquareName, squareNameToArrayIndices } from "../helpers";
import Square from './Square';
import './Chessboard.css';

class Chessboard extends React.Component {

    componentDidMount() {
        this.props.initializeChessboard();
    }

    isPieceSelectable = function(piece) {
        return piece && piece.color === this.props.player;
    };

    handleClick = (squareName) => {
        if (!squareName) {
            return;
        }

        const [x,y] = squareNameToArrayIndices(squareName);
        const piece = this.props.board[x][y];

        if (!this.isPieceSelectable(piece) || squareName === this.props.selectedPiece.squareName) {
            this.props.selectPiece('', null, this.props.board);
            return;
        }

        this.props.selectPiece(squareName, piece, this.props.board);
    };

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

                            const squareName = arrayIndicesToSquareName([x,y]);

                            return <Square
                                key={`square-${x}-${y}`}
                                name={squareName}
                                color={white ? 'white' : 'black'}
                                onClick={() => this.handleClick(squareName)}
                            />;
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
        board: state.board,
        player: state.turn.player,
        selectedPiece: state.selectedPiece
    };
};

export default connect(mapStateToProps, actions)(Chessboard);