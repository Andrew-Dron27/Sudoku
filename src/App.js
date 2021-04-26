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
  render()
  {
    return(
      <div className="game">
      <div className="game-board">
        <Board 
        />
      </div>
      <div className="game-info">
        
        <button>Undo</button>
        <button>Redo</button>    
      </div>
    </div>
  );
  }    
 
}

class Board extends React.Component
{
  renderRow(row)
  {
    const squares = [];
    const offset = row * squaresPerRow;

    for(let i = 0; i < squaresPerRow; i++)
    {
      squares.push(
        Cell(offset + i)
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



function Cell(props)
{
  return(
    <td className="Cell">
      <input type="number" max="9" min="0" maxLength="1"></input>
      </td>
  )
}


export default App;
