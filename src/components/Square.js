import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import {squareNameToArrayIndices} from "../helpers";
import Piece from './Piece';
import './Square.css';
import {getAllowedMoves} from "../selectors/playerSelectors";

class Square extends React.Component {

    renderPiece() {
        const { piece } = this.props;

        if (!piece) {
            return null;
        }

        return <Piece type={piece.type} color={piece.color} />;
    }

    render() {
        return (
            <div
                onClick={this.props.onClick}
                className={`square ${this.props.color} ${this.props.selectable ? 'selectable' : ''} ${this.props.selected ? 'selected' : ''} ${this.props.allowedMove ? 'allowed selectable' : ''}`}
            >
                {this.renderPiece()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const [x,y] = squareNameToArrayIndices(ownProps.name);
    const piece = state.board[x][y];
    return {
        piece: piece,
        selectable:  piece && (piece.color === state.turn.player),
        selected: ownProps.name === state.player.selectedSquareName,
        allowedMove: getAllowedMoves(state.board,state.player.selectedSquareName).includes(ownProps.name)
    };
};

export default connect(mapStateToProps, actions)(Square);