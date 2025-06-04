import React from 'react'

export default function Square ({ children, updateBoard, index, isSelect }) {
  const clasName = `square ${isSelect ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={clasName}>
      {children}
    </div>
  )
}
