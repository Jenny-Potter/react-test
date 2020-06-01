import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  function Square(props) {
    return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    
    renderSquare(i) {
      return <Square onClick={() => this.props.onClick(i)} value={this.props.square[i]} />;
    }
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        xIsNext:true,
        history:[
          {square:Array(9).fill(null)}
        ],
        stepNumber:0
      }
    }
    handleClick(i) {
      let history = this.state.history
      let length = history.length
      let square = history[length-1].square.slice()

      
      if(this.caculateWinner(square) || square[i]) {
        alert('wrong execute')
        return
      } else {
        square[i] = this.state.xIsNext? 'X':'O'
        this.setState({
          history:history.concat([{square:square}]),
          stepNumber:this.state.stepNumber+1,
          xIsNext:!this.state.xIsNext
        })
      }
    }
    caculateWinner(square) {
      let line = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [2,4,6],
        [0,4,8],
        [0,3,6],
        [1,4,7],
        [2,5,8]

      ]
      for(let i = 0; i < line.length; i++) {
        const [a,b,c] = line[i]
        if(square[a] && 
           square[a] === square[b] && 
           square[a] === square[c]
        ) {
          return square[a]
        }
      }
    }
    jumpTo(move) {
      let history = this.state.history.slice()
      this.setState({
        history:history.slice(0,move+1),
        stepNumber:move,
        xIsNext:move%2 === 0 ? true:false
      })

    }
    render() {
      const history = this.state.history
      const square = history[history.length-1].square.slice()
      const text1 = 'Winner is '
      const text2 = 'Next player:' + (this.state.xIsNext? 'X':'O')
      let winner = this.caculateWinner(square)
      const status = winner? text1 + winner: text2
      let moves = history.map((square,index) => {
        let des = index? ('Go to move #' + index):'Get game start'
        return (
          <li key={index}>
            <button onClick={() => this.jumpTo(index)}>{des}</button>
          </li>
        )
      })
      return (
        <div className="game">
          <div className="game-board">
            <Board onClick={(i) => this.handleClick(i)} square={square} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  