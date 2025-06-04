import { useState } from 'react'
import Square from './components/Square'
import { TURNS, WINNER_COMBOS } from './constants/constans'
import { checkEndGame } from './logic/board'
import Winner from './components/Winner'
import confetti from 'canvas-confetti'

function App () {
  const [board, setBoard] = useState(() => {
    const boardStorage = window.localStorage.getItem('board')
    if (boardStorage) { return JSON.parse(boardStorage) }
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnsStorage = window.localStorage.getItem('turns')
    return turnsStorage ?? TURNS.x
  })
  // null no hay ganador, false es empate
  const [winner, setWinner] = useState(null)

  // reset
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turns')
  }

  const checkWinner = (boardToCheck) => {
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

  const updateBoard = (index) => {
    if (board[index] !== null || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
      // Todo check if game is over
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turns', newTurn)
  }

  return (
    <main className='board'>
      <h1>ta-te-ti</h1>
      <button onClick={resetGame}>reset</button>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })}
      </section>

      <section className='turn'>
        <Square isSelect={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelect={turn === TURNS.o}>{TURNS.o}</Square>

      </section>

      <Winner winner={winner} resetGame={resetGame} />

    </main>
  )
}
export default App
