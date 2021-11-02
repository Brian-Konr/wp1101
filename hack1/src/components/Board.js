/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */}
        let temp = createBoard(boardSize, mineNum);
        setBoard(temp.board);
        setMineLocations(temp.mineLocations);
        {/* Useful Hint: createBoard(...) */}
    }
    console.log(board, mineLocations);
    const restartGame = () => {
        {/* -- TODO 5-2 -- */}
        {/* Useful Hint: freshBoard() */}
        
    }
    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        {/* -- TODO 3-2 -- */}
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}
        if(!board[x][y].revealed && board[x][y].value !== '💣') {
            if(board[x][y].flagged) setRemainFlagNum(prev => prev - 1);
            else setRemainFlagNum(prev => prev + 1);
            let newArr = Array.from(board);
            newArr[x][y].flagged = !newArr[x][y].flagged;
            setBoard(newArr);
            setNonMineCount(prev => prev + 1);
        }
        else {
            console.log("bomb");
            revealed(board, x, y, nonMineCount, setBoard);
        }
        
    };

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}
        if(board[x][y].value !== '💣') {
            if(nonMineCount + 1 + mineNum === (boardSize*boardSize)) {
                setNonMineCount(prev => prev + 1);
                setWin(true);
            }
            else { //normal reveal
                let newArr = Array.from(board);
                newArr[x][y].revealed = true;
                setBoard(newArr);
            }
        }
        else { //game over
            let newArr = Array.from(board);
            newArr.map(row => {
                row.map(cell => {
                if(cell.value === '💣') cell.revealed = true;
                })
            })
            setBoard(newArr);
            return;
        }
    };

    return(
        <div className = 'boardPage' >
            <div className = 'boardWrapper' >  {/* This line of code is just for testing. Please delete it if you finish this function. */}
                
                {/* -- TODO 3-1 -- */}
                <div className="boardContainer">
                    {board.map(row => (
                        <div id = {`row${row[0].x}`} style = {{display: 'flex'}}>
                            {row.map(cell => (
                                <Cell rowIdx = {cell.x} colIdx = {cell.y} detail = {cell} updateFlag = {updateFlag} revealCell = {revealCell}/>
                            ))}
                        </div>
                    ))}
                </div>
            {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
            {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
            
            </div>
        </div>
    ); 

    

}

export default Board