import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faChessRook, faChessKnight, faChessBishop, faChessQueen
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Modal from './Modal';
import * as actions from '../actions';

library.add(
    faChessRook, faChessKnight, faChessBishop, faChessQueen
);

class PromotePawn extends React.Component {

    handleCancel = () => {
        this.props.cancelPawnPromotionModal();
    };

    handlePromotion = type => {
        const { options: opts } = this.props;
        const newPiece = {...opts.destination.newPiece, type: type};
        this.props.playTurn(opts.source.squareName, opts.destination.squareName, newPiece);
    };

    renderActions() {
        return (
            <button onClick={this.handleCancel} className="ui button">Cancel</button>
        );
    }

    renderContent() {
        return (
            <div>
                <div className="ui four column stackable center aligned grid">
                    <div className="row">
                        <div className="column">
                            <div onClick={() => this.handlePromotion('queen')} className="ui link card fluid">
                                <div className="image">
                                    <FontAwesomeIcon icon={`chess-queen`} size="6x" style={{margin:'20px'}} />
                                </div>
                                <div className="content">
                                    <div className="header">Queen</div>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => this.handlePromotion('knight')} className="column">
                            <div className="ui link card fluid">
                                <div className="image">
                                    <FontAwesomeIcon icon={`chess-knight`} size="6x" style={{margin:'20px'}} />
                                </div>
                                <div className="content">
                                    <div className="header">Knight</div>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => this.handlePromotion('rook')} className="column">
                            <div className="ui link card fluid">
                                <div className="image">
                                    <FontAwesomeIcon icon={`chess-rook`} size="6x" style={{margin:'20px'}} />
                                </div>
                                <div className="content">
                                    <div className="header">Rook</div>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => this.handlePromotion('bishop')} className="column">
                            <div className="ui link card fluid">
                                <div className="image">
                                    <FontAwesomeIcon icon={`chess-bishop`} size="6x" style={{margin:'20px'}} />
                                </div>
                                <div className="content">
                                    <div className="header">Bishop</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Modal
                title="Promote Pawn"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={this.handleCancel}
                />
        );
    }
}

const mapStateToProps = state => {
    return {
        options: state.player.showPawnPromotionModal
    };
};

export default connect(mapStateToProps, actions)(PromotePawn);