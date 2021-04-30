
const rowSize = 9;
export function solvePuzzle(board)
{
    let row;
    let col;
    [row,col] = findNextFree(board);
    
    if(row == -1 || col == -1)
    {
        return true;
    }
    let loc = row * rowSize + col;

    for(let i = 1 ; i <= 9; i++)
    {
        if(!isNumUsedRow(board,loc,i) && !isNumUsedCol(board,loc,i) && !isNumUsedSquare(board,loc,i))
        {
            board[loc] = i;

            if(solvePuzzle(board))
            {
                return true;
            }
            board[loc] = 0;
        }
    }
    return false;
}

export function isNumUsedRow(board, loc, num)
{
    const row = Math.floor(loc / rowSize);
    //check the rows and columns
    for(let i = 0; i < rowSize; i++)
    {
        if(board[row * rowSize + i] == num)
        {
            return true;
        }
    }

    return false;
}

export function isNumUsedCol(board,loc,num)
{
    const col = loc % rowSize;
    for(let i = 0; i < rowSize; i++)
    {
        if(board[i * rowSize + col] == num)
        {
            return true;
        }
    }
    return false;
}

export function isNumUsedSquare(board, loc, num)
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
            if(board[rowIndex * rowSize + colIndex] == num)
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
            if(board[i * rowSize + j] == 0)
            {

                return [i,j];
            }
        }
    }
    return [-1,-1];//no free space
}

export function generatePuzzle(emptyBoard)
{

}