import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faChessRook, faChessKnight, faChessBishop,
    faChessQueen, faChessKing, faChessPawn
} from '@fortawesome/free-solid-svg-icons';

import './Piece.css';

library.add(
    faChessRook, faChessKnight, faChessBishop,
    faChessQueen, faChessKing, faChessPawn
);

export default props => {
    return (
        <div className={`piece ${props.color}`}>
            <FontAwesomeIcon icon={`chess-${props.type}`} color={props.color} size="3x" />
        </div>
    );
}