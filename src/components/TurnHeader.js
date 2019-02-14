import React from 'react';
import { connect } from 'react-redux';
import { getCheckStatus } from "../selectors/playerSelectors";

class TurnHeader extends React.Component {

    renderCheck() {
        if (this.props.checkStatus) {
            return (
                <div className="ui negative icon message" style={{borderColor:'#D11919',backgroundColor:'#F2DCDC',color:'#D11919'}}>
                    <i className="icon exclamation triangle"></i>
                    <div className="content" style={{textAlign:'left'}}>
                        <h3 style={{textTransform:'capitalize'}}>{this.props.checkStatus}</h3>
                    </div>
                </div>
            );
        }
        return <>{this.props.checkStatus}</>;
    }

    render() {
        return (
            <div>
                <div className="ui segment" style={{backgroundColor:'#8E8080'}}>
                    <div className="ui two column stackable center aligned grid">
                        <div className="middle aligned row">
                            <div className="column">
                                <div className="ui statistic">
                                    <div className="value" style={{color:this.props.player}}>
                                        {this.props.number}
                                    </div>
                                    <div className="label" style={{color:this.props.player}}>
                                        Turn
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="ui statistic">
                                    <div className="value" style={{color:this.props.player}}>
                                        <i className="user icon"></i>
                                    </div>
                                    <div className="label" style={{color:this.props.player}}>
                                        {this.props.player}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{margin:'10px auto', height:'80px', width:'400px'}}>
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