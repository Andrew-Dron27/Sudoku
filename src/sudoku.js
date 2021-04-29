
export function solvePuzzle(board)
{
    let row;
    let col;
    [row,col] = findNextFree(board);
    if(row == -1 || col == -1)
    {
        return true;
    }
    for(let i = 1 ; i <= 9; i++)
    {
        if(!isNumUsed)
        {
            board[row * 9 + col] = i;
            if(solvePuzzle(board))
            {
                return true;
            }
            board[row * 9 + col] = 0;
        }
    }
    return false;
}

export function isNumUsed(board, loc, num)
{
    const val = board[loc];
    const row = Math.floor(loc / 9);
    const col = loc % 9;

    const squareRow = row - row % 3;
    const squareCol = col - col % 3;

    let result = false;

    //check the rows and columns
    for(let i = 0; i < 9; i++)
    {
        let rowIndex = row + i;
        let colIndex = i * 9 + col;
        if((board[rowIndex] == num) || (board[colIndex] == num))
        {
            return true;
        }
    }

    //check the square
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            let rowIndex = squareRow + i;
            let colIndex = j * 9 + squareCol
            if(board[rowIndex + colIndex] == num)
            {
                return true;
            }
        }
    }

    return false;
}

export function findNextFree(board)
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(board[i * 9 + j] === 0)
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