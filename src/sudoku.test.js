import * as sudoku from './sudoku.js';
import {solvePuzzle} from './sudoku.js';

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

describe("Test board solving", () => {

    var input = testBoard1;
    test('Test Board with solution 1', () => {
        expect(solvePuzzle(input)).toBe(true);
    });

})

describe("Test Number Used / Find next free", () => {
 //const solvePuzzle = require('./sudoku/solvePuzzle');
    var input = testBoard1;
    test('Test number used 1', () => {
        expect(solvePuzzle(input, 0, 3)).toBe(true);
    });
})
