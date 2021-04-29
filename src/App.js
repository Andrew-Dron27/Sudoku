import logo from './logo.svg';
import React from 'react';
import './App.css';

const squaresPerRow = 9;
const rowsPerBox = 9;

function App() {
  return (
    <Game/>
  );
}

class Game extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      board: Array(81).fill(0),
      history: null,
      current: null,
    };
  }
    
  render()
  {
    return(
      <div className="game">
      <div className="game-board">
        <Board
        board = {this.state.board}
        />
      </div>
      <div className="game-info">
        
        <button>Undo</button>
        <button>Redo</button>
        <button>Generate Puzzle</button>    
      </div>
    </div>
  );
  }    
 
}

class Board extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      board: props.board,
    }
  }

  renderRow(row)
  {
    const squares = [];
    const offset = row * squaresPerRow;

    for(let i = 0; i < squaresPerRow; i++)
    {
      squares.push(
        Cell(this.state.board[offset + i], offset + i)
      );
    }

    return(
      <tr className="row">
        {squares}
      </tr>
    )
  }

  render()
  {
    const rows = [];
    for(let i = 0; i < rowsPerBox; i++)
    {
      rows.push(
        this.renderRow(i)
      );
    }
    return(
      <table id="Board">
        {rows}
      </table>
    )
  }
}

function Cell(props, id)
{
  return(
    <td className="Cell" id={id}>
      <input type="number" max="9" min="0" maxLength="1" value={props==0 ? '': props}></input>
      </td>
  )
}




export default App;
