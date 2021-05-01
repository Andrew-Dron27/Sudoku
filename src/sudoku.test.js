import * as sudoku from './sudoku.js';

const testBoard1 = [ 
3, 0, 6, 5, 0, 8, 4, 0, 0 ,
5, 2, 0, 0, 0, 0, 0, 0, 0 ,
0, 8, 7, 0, 0, 0, 0, 3, 1 ,
0, 0, 3, 0, 1, 0, 0, 8, 0 ,
9, 0, 0, 8, 6, 3, 0, 0, 5 ,
0, 5, 0, 0, 9, 0, 6, 0, 0 ,
1, 3, 0, 0, 0, 0, 2, 5, 0 ,
0, 0, 0, 0, 0, 0, 0, 7, 4 ,
0, 0, 5, 2, 0, 6, 3, 0, 0 
];

const testBoard1Solved = [
3, 1, 6, 5, 7, 8, 4, 9, 2, 
5, 2, 9, 1, 3, 4, 7, 6, 8, 
4, 8, 7, 6, 2, 9, 5, 3, 1, 
2, 6, 3, 4, 1, 5, 9, 8, 7, 
9, 7, 4, 8, 6, 3, 1, 2, 5, 
8, 5, 1, 7, 9, 2, 6, 4, 3, 
1, 3, 8, 9, 4, 7, 2, 5, 6, 
6, 9, 2, 3, 5, 1, 8, 7, 4, 
7, 4, 5, 2, 8, 6, 3, 1, 9,
];

const testBoard2 = [
0, 0, 0, 0, 0, 6, 1, 8, 0,
0, 8, 0, 0, 7, 0, 3, 9, 0,
0, 3, 0, 4, 0, 0, 7, 0, 0,
0, 0, 0, 5, 0, 0, 8, 0, 0,
9, 0, 0, 0, 0, 0, 0, 0, 1,
0, 0, 7, 0, 0, 1, 0, 0, 0,
0, 0, 9, 0, 0, 3, 0, 5, 0,
0, 7, 5, 0, 6, 0, 0, 3, 0,
0, 2, 6, 9, 0, 0, 0, 0, 0,
];

const twoSols = [
3, 8, 7, 1, 6, 9, 5, 4, 2,
5, 2, 6, 4, 8, 7, 3, 9, 1,
4, 1, 9, 5, 3, 2, 6, 7, 8,
9, 5, 2, 3, 1, 4, 8, 6, 7,
8, 3, 4, 2, 7, 6, 1, 5, 9,
7, 6, 1, 9, 5, 8, 2, 3, 4,
6, 9, 5, 7, 2, 1, 4, 8, 3,
1, 7, 3, 8, 4, 5, 9, 2, 6,
2, 4, 8, 6, 9, 3, 7, 1, 5,
]


const noSol = [ 
0, 3, 6, 5, 0, 8, 4, 0, 0 ,
5, 2, 0, 0, 0, 0, 0, 0, 0 ,
0, 8, 7, 0, 0, 0, 0, 3, 1 ,
0, 0, 3, 0, 1, 0, 0, 8, 0 ,
9, 0, 0, 8, 6, 3, 0, 0, 5 ,
0, 5, 0, 0, 9, 0, 6, 0, 0 ,
1, 3, 0, 0, 0, 0, 2, 5, 0 ,
0, 0, 0, 0, 0, 0, 0, 7, 4 ,
0, 0, 5, 2, 0, 6, 3, 0, 0 
];

describe("Test board solving", () => {

    let input = testBoard1.slice();
    let board2 = testBoard2.slice();
    let noSolIn = noSol.slice();
    let numSols1 = [0];
    let numSols2 = [0];
    let numSols3 = [0];
    test('Test Board with solution 1', () => {
        expect(sudoku.solvePuzzle(input, numSols1)).toBe(true);  
        expect(input).toEqual(testBoard1Solved);
        expect(numSols1[0]).toEqual(1);
    });

    test('Test Board with solution 2', () => {
        expect(sudoku.solvePuzzle(board2, numSols2)).toBe(true);  
        expect(numSols2[0]).toEqual(1);
    });

    test('Test Board with no Solution', () => {
        expect(sudoku.solvePuzzle(noSolIn, numSols3)).toBe(false);  
        expect(noSolIn).toEqual(noSol);
        expect(numSols3[0]).toEqual(0);
    });
})

describe("Test Number Used", () => {
    let input = testBoard1.slice();
    test('Test number used in place', () => {
        expect(sudoku.isNumUsedRow(input, 0, 3)).toBe(true);
    });

    test('Test number used col', () => {
        expect(sudoku.isNumUsedCol(input, 0, 1)).toBe(true);
    });

    test('Test number used col 2', () => {
        expect(sudoku.isNumUsedCol(input, 8, 7)).toBe(false);
    });

    test('Test number used row', () => {
        expect(sudoku.isNumUsedRow(input, 0, 4)).toBe(true);   
    });

    test('Test number used square 1', () => {
        expect(sudoku.isNumUsedSquare(input, 0, 7)).toBe(true);
    });

    test('Test number used square 2', () => {
        expect(sudoku.isNumUsedSquare(input, 40, 2)).toBe(false);
    });

    test('Test number used square 2', () => {
        expect(sudoku.isNumUsedSquare(input, 80, 2)).toBe(true);
    });

    test('Test number not used 1', () => {
        expect(sudoku.isNumUsedRow(input, 1, 1)).toBe(false);
    });

    test('Test number not used 2', () => {
        expect(sudoku.isNumUsedCol(input, 4, 7)).toBe(false);
    });

    test('Test number not used in place', () => {
        expect(sudoku.isNumUsedSquare(input, 7, 9)).toBe(false);
    });
})

describe("Test Find Next Free", () => {
    let input = testBoard1.slice();

    let solvedPuzzle = testBoard1Solved.slice();
    solvedPuzzle[80] = 0;

    let input2 = input.slice();
    input2[1] = 1;

    let input3 = input2.slice();
    input3[4] = 1;

    let input4 = input3.slice();
    input4[7] = 1;
    input4[8] = 1;

    test('Test 1', () => {
        expect(sudoku.findNextFree(input)).toEqual([0,1]);
    });
    
    test('Test 2', () => {
        expect(sudoku.findNextFree(input2)).toEqual([0,4]);
    });

    test('Test 3', () => {
        expect(sudoku.findNextFree(input3)).toEqual([0,7]);
    });

    test('Test 4', () => {
        expect(sudoku.findNextFree(input4)).toEqual([1,2]);
    });

    test('Test full', () => {
        expect(sudoku.findNextFree(testBoard1Solved)).toEqual([-1,-1]);
    });

    test('Test almost full', () => {
        expect(sudoku.findNextFree(solvedPuzzle)).toEqual([8,8]);
    });
})

describe("Test Generate Puzzele:", () => {

    test('Test generated board is full', () => {
        var emptyBoard = Array(81).fill(0);
        sudoku.fillBoard(emptyBoard);
        expect(sudoku.findNextFree(emptyBoard)).toEqual([-1,-1]);
    })

    test("test generated puzzle has only one solution", () => {
        var emptyBoard = Array(81).fill(0);
        var numSols = [0];
        sudoku.generatePuzzle(emptyBoard, 1);
        sudoku.printBoard(emptyBoard);
        expect(sudoku.solvePuzzle(emptyBoard, numSols)).toEqual(true);
        expect(numSols).toEqual([1]);
    })
})

