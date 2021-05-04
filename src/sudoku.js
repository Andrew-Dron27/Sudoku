
const rowSize = 9;
const numSet = [1,2,3,4,5,6,7,8,9];

export function solvePuzzle(board, numSols)
{
    let row;
    let col;
    [row,col] = findNextFree(board);
    
    if(row === -1 || col === -1)
    {
        numSols[0]++;
        return true;
    }
    let loc = row * rowSize + col;

    for(let i = 1 ; i <= 9; i++)
    {
        if(!isNumUsedRow(board,loc,i) && !isNumUsedCol(board,loc,i) && !isNumUsedSquare(board,loc,i))
        {
            board[loc] = i;

            if(solvePuzzle(board,numSols))
            {
                return true;
            }
            board[loc] = 0;
        }
    }
    return false;
}

export function isNumUsedRow(board, loc, num, conflict)
{
    const row = Math.floor(loc / rowSize);
    //check the rows and columns
    for(let i = 0; i < rowSize; i++)
    {
        if(board[row * rowSize + i] === num)
        {
            return true;
        }
    }

    return false;
}

export function isNumUsedCol(board,loc,num,conflict)
{
    const col = loc % rowSize;
    for(let i = 0; i < rowSize; i++)
    {
        if(board[i * rowSize + col] === num)
        {
            return true;
        }
    }
    return false;
}

export function isNumUsedSquare(board, loc, num, conflict)
{
    const row = Math.floor(loc / rowSize);
    const col = loc % rowSize;
    const squareRow = row - row % 3;
    const squareCol = col - col % 3;

    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            let rowIndex = squareRow + i;
            let colIndex = squareCol + j;
            if(board[rowIndex * rowSize + colIndex] === num)
            {
                return true;
            }
        }
    }
    return false;
}

export function findNextFree(board)
{
    for(let i = 0; i < rowSize; i++)
    {
        for(let j = 0; j < rowSize; j++)
        {
            if(board[i * rowSize + j] === 0)
            {
                return [i,j];
            }
        }
    }
    return [-1,-1];//no free space
}

export function isNumGucciGang(board,loc,num,conflict)
{
    return !isNumUsedRow(board,loc,num,conflict) && !isNumUsedCol(board,loc,num, conflict) && !isNumUsedSquare(board,loc,num,conflict);
}

//Same functionality as the solution with backtracking algorithm
//Except with a set of [1-9] in random order as the seed
//Try and have difficulty be 1-5
export function generatePuzzle(Board, difficulty)
{
    fillBoard(Board);
    createPuzzle(Board, difficulty);
}

function createPuzzle(filledBoard, difficulty)
{
    let i = 0;
    let numSols;
    let copy;
    let numIterations = Math.min(64, difficulty * 13)
    while(i <= numIterations)
    {
        //pick random locations till we strike a non-zero cell
        let randLoc = Math.floor(Math.random() * 81);
        while(filledBoard[randLoc] === 0)
        {
            randLoc = Math.floor(Math.random() * 81);
        }

        let tmp = filledBoard[randLoc];
        filledBoard[randLoc] = 0;
        numSols = [0];
        copy = filledBoard.slice();     
        //test for one possible solution
        solvePuzzle(copy, numSols);

        console.log(numSols[0]);
        
        if(numSols[0] !== 1)
        {
            filledBoard = tmp;
        }
        i++
    }
}

export function fillBoard(emptyBoard)
{
    let row;
    let col;
    let randNums = numSet.slice();
    [row,col] = findNextFree(emptyBoard);
    
    if(row === -1 || col === -1)
    {
        return true;
    }
    let loc = row * rowSize + col;

    for(let i of shuffle(randNums))
    {
        if(!isNumUsedRow(emptyBoard,loc,i) && !isNumUsedCol(emptyBoard,loc,i) && !isNumUsedSquare(emptyBoard,loc,i))
        {
            emptyBoard[loc] = i;

            if(fillBoard(emptyBoard))
            {
                return true;
            }
            emptyBoard[loc] = 0;
        }
    }
    return false;
}

// http://stackoverflow.com/questions/962802#962890
function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }

export function printBoard(board)
{
    if(board.length !== 81)
    {
        return;
    }
    let str = "";
    for(let i = 0 ; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            str += ", " + board[i * 9 + j].toString();
        }
        str += "\n";
    }
    console.log(str);
}