import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { arrayIndicesToSquareName, squareNameToArrayIndices } from "../helpers";
import Square from './Square';
import './Chessboard.css';
import { getAllowedMoves } from "../selectors/playerSelectors";

class Chessboard extends React.Component {

    componentDidMount() {
        if (this.props.turnNumber === 1) {
            this.props.initializeChessboard();
        }
    }

    isPieceSelectable = function(piece) {
        return piece && piece.color === this.props.player;
    };

    handleClick = (squareName) => {
        if (!squareName) {
            return;
        }

        const [x,y] = squareNameToArrayIndices(squareName);
        const newlySelectedPiece = this.props.board[x][y];

        const currentSquare = this.props.selectedSquareName;
        const {allowedMoves} = this.props;

        if (allowedMoves.includes(squareName)) {
            const [curX,curY] = squareNameToArrayIndices(currentSquare);
            const currentPiece = this.props.board[curX][curY];
            this.props.playTurn(currentSquare, squareName, currentPiece);
            return;
        }

        if (!this.isPieceSelectable(newlySelectedPiece) || squareName === currentSquare) {
            this.props.selectPiece('');
            return;
        }

        this.props.selectPiece(squareName);
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
        turnNumber: state.turn.number,
        selectedSquareName: state.player.selectedSquareName,
        allowedMoves: getAllowedMoves(state.board, state.player.selectedSquareName, state.player.enPassantSquareName)
    };
};

export default connect(mapStateToProps, actions)(Chessboard);