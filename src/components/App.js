import React from 'react';
import TurnHeader from "./TurnHeader";
import Chessboard from "./Chessboard";

class App extends React.Component {

    render() {
        return (
            <div className="app">
                <TurnHeader/>
                <Chessboard/>
            </div>
        );
    }
}

export default App;