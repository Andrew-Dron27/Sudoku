import logo from './logo.svg';
import React from 'react';
import * as sudoku from './sudoku.js';
import './App.css';

const squaresPerRow = 9;
const rowsPerBox = 9;

function App() {
  return (
    <Game/>
  );
}

//
class Game extends React.Component
{
  constructor(props)
  {
    super(props);

    let newPuzzle = Array(81).fill(0);
    sudoku.generatePuzzle(newPuzzle, 3);
    let puzzleSol = newPuzzle.slice();
    sudoku.solvePuzzle(puzzleSol, []);

    this.state = {
      board: newPuzzle,
      history: null,
      currentSolution: puzzleSol,
    };
  }
    
  render()
  {
    return(
      <div className="game">
      <div className="game-board">
        <Board
          board = {this.state.board}
          parentValChange = {this.handleValueChange}
        />
      </div>
      <div className="game-info">
        <button id = "undo_button">Undo</button>
        <button id = "redo_button">Redo</button>
        <button id = "hint_button">Hint?</button>
        <button id = "diff_button">
          Difficulty
          <input id="diff_button_input" type="number" max="5" min="1" maxLength="1"></input>
        </button>
        <button id = "gen_button" onClick = {() => this.genPuzzle()}>Generate New Puzzle</button>    
      </div>
    </div>
  );
  }   

  genPuzzle = () =>
  {
    let newPuzzle = Array(81).fill(0);  
    let diff = document.getElementById("diff_button_input").value;

    sudoku.generatePuzzle(newPuzzle, diff);

    let puzzleSol = newPuzzle.slice();
    sudoku.solvePuzzle(puzzleSol,[]);

    this.setState ({
      board: newPuzzle,
      history: null,
      currentSolution: puzzleSol,
    });
  }

  handleValueChange = (val, id)=>
  {
    let newBoard = this.state.board.slice();
    newBoard[id] = val;
    this.setState({
      board: newBoard,
      history: null,
      currentSolution: this.state.currentSolution,
    });
    
  }

  checkBoard = () => 
  {
    //current board is full
    if(sudoku.findNextFree(this.state.board) !== [-1,-1])
    {
      if( this.state.board === this.state.currentSolution)
      {
        //your winner
      }
    }
    for(let i = 0; i < squaresPerRow; i++)
    {
      for(let j = 0; j < squaresPerRow; j++)
      {
        
      }
    }
  }

}

class Board extends React.Component
{
  render()
  {
    const rows = [];
    for(let i = 0; i < rowsPerBox; i++)
    {
      const squares = [];
      const offset = i * squaresPerRow; 
      for(let j = 0; j < squaresPerRow; j++)
      {
          squares.push(
            <Cell
              key = {offset + j}
              val = {this.props.board[offset + j]}
              id = {offset + j}
              parentValChange = {this.props.parentValChange}
            />
          );
      }
        rows.push(
          <tr key = {i} className="row">
            {squares}
          </tr>
        );
    }
    return(
      <table id="Board">
        <tbody>
          {rows}
        </tbody> 
      </table>
    )
  }

  handleValChange = (e, id) =>
  {
    this.state.parentValChange(e,id);
  }
}

class Cell extends React.Component
{
  render()
  {
    return(
      <td className="Cell" id={this.props.id}>
        <input 
          type="number" max="9" min="0" maxLength="1" value={this.props.val===0 ? '': this.props.val}
           disabled={false} onChange={this.onValChange}>
          </input>
        </td>
    )
  }

  onValChange = (e) => 
  {
    const inputVal = parseInt(e.target.value);
    if(inputVal.length === 1, !isNaN(inputVal))
    {
      this.props.parentValChange(inputVal,this.props.id)
    }
  }
}
export default App;
