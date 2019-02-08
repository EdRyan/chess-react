import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import {squareNameToArrayIndices} from "../helpers";
import Piece from './Piece';
import './Square.css';

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
            <div className={`square ${this.props.color}`}>
                {this.renderPiece()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const [x,y] = squareNameToArrayIndices(ownProps.name);
    return {
        piece: state.board[x][y]
    };
};

export default connect(mapStateToProps, actions)(Square);