import Square from './Square'

export default function Winner ({ winner, resetGame }) {
  if (winner === null) return null
  const winnerText = winner === false ? 'Empate' : 'Gano'

  return (
    winner !== null && (
      <section className='winner'>
        <div className='text'>
          <h2>{winnerText}</h2>
          <header className='win'>
            {winner && <Square>{winner}</Square>}
          </header>
          <footer>
            <button onClick={resetGame}>Reset</button>
          </footer>
        </div>
      </section>
    )
  )
}
