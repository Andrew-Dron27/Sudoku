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
      history: [],
      futurePast: [],
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
        <button id = "undo_button" onClick = {() => this.handleUndo()}>Undo</button>
        <button id = "redo_button" onClick = {() => this.handleRedo()}>Redo</button>
        <button id = "hint_button" onClick = {() => this.handleHint()}>Hint?</button>
        <button id = "diff_button">
          Difficulty
          <input id="diff_button_input" type="number" max="5" min="1" maxLength="1" value = "5"></input>
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

    let hist = this.state.history.slice();
    let curBoard = this.state.board.slice();
    hist.push(curBoard)

    this.setState ({
      board: newPuzzle,
      history: hist,
      futurePast : [],
      currentSolution: puzzleSol,
    });
  }

  handleUndo = () =>
  {
    if(this.state.history.length === 0)
    {
      return;
    }
    let hist = this.state.history.slice();
    let future = this.state.futurePast.slice();

    let prevBoard = hist.pop();
    future.push(this.state.board);

    this.setState({
      board: prevBoard,
      history: hist,
      futurePast: future,
      currentSolution: this.state.currentSolution,
    });
  }

  handleRedo = () =>
  {
    if(this.state.futurePast.length === 0)
    {
      return;
    }

    let hist = this.state.history.slice();
    let future = this.state.futurePast.slice();

    let prevBoard = future.pop();
    hist.push(this.state.board);

    this.setState({
      board: prevBoard,
      history: hist,
      futurePast: future,
      currentSolution: this.state.currentSolution,
    });
  }

  handleHint = () =>
  {
    for(let i = 0; i < 81; i++)
    {
      if(this.state.board[i] != this.state.currentSolution[i])
      {
        //TODO highlight incorrect entry
      }
    }

    for(let i = 0; i < 81; i++)
    {
      if(this.state.board[i] == 0)
      {
        //TODO highlight square green and enter value in square
        this.handleValueChange(this.state.currentSolution[i],i);
      }
    }
  }

  handleValueChange = (val, id)=>
  {
    let newBoard = this.state.board.slice();
    let history = this.state.history.slice();

    history.push(this.state.board);
    newBoard[id] = val;
    
    this.setState({
      board: newBoard,
      history: history,
      futurePast: [],
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
        //TODO your winner
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
    if(inputVal.toString().length === 1, !isNaN(inputVal))
    {
      this.props.parentValChange(inputVal,this.props.id)
    }
  }
}
export default App;
