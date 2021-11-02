/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, setBoard) => {
    {/* -- TODO 4-2 -- */}
    {/* Useful Hint: If the cell is already revealed, do nothing. */}
    {/* Useful Hint: If the value of the cell is not 0, only show the cell value. */}
    if(board[x][y].value === '💣') {
      let newArr = Array.from(board);
      newArr.map(row => {
        row.map(cell => {
          if(cell.value === '💣') cell.revealed = true;
        })
      })
      setBoard(newArr);
      return;
    }
    if(!board[x][y].revealed && !board[x][y].flagged) {
      let newArr = Array.from(board);
      newArr.map(row => {
        row.map(cell => {
          cell.revealed = true;
        })
      })
      setBoard(newArr);
      return;
    }
    else return;
    {/* -- TODO 4-2 -- */}
    {/* Useful Hint: If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0. */}
    {/* Useful Hint: The input variables 'newNonMinesCount' and 'board' may be changed in this function. */}
    
    
    return {board, newNonMinesCount};
};
