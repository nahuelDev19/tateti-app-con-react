import { WINNER_COMBOS } from '../constants/constans'

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[b] === boardToCheck[c]
    ) { return boardToCheck[a] }
  }
  // no hay ganadores
  return null
}

// check end game
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}
