'use client'

import React, { useState } from 'react'

import './Game.css'

type State = 'initial' | 'wrong' | 'correct' | 'placement'

interface Key {
  letter: string
  state: State
}

export const Game = () => {
  const [keyboard, setKeyboard] = useState(INITIAL_KEYBOARD)
  const [board, setBoard] = useState(
    Array<Key>(25).fill({ letter: '', state: 'initial' })
  )

  return (
    <div className="game">
      <div className="board">
        {board.map((tile, i) => (
          <div className={`tile ${tile.state}`} key={i}>
            <span className="letter">{tile.letter}</span>
          </div>
        ))}
      </div>
      <div className="keyboard">
        {keyboard.map((row, i) => (
          <div className="keyboard-row" key={i}>
            <div className="keys">
              {row.map((key) => (
                <button
                  className={`key ${key.state}`}
                  key={key.letter}
                  onClick={() => {
                    const newBoard = addToBoard(board, key.letter)
                    if (newBoard) {
                      setBoard(newBoard)

                      const newKeyboard = updateKeyboard(keyboard, key.letter)
                      setKeyboard(newKeyboard)
                    }
                  }}
                >
                  {key.letter}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function addToBoard(board: Array<Key>, letter: string) {
  const emptyTileIndex = board.findIndex((tile) => !tile.letter)
  if (emptyTileIndex === -1) {
    console.log('no empty tiles')
    return
  }

  console.log('emptyTileIndex', emptyTileIndex)

  const newBoard = [...board]

  const currentRow = Math.floor(emptyTileIndex / 5)
  const word =
    newBoard
      .slice(currentRow * 5, (currentRow + 1) * 5)
      .map((tile) => tile.letter)
      .join('') + letter

  console.log('word', word)

  const emptyTile = newBoard[emptyTileIndex]
  if (emptyTile) {
    newBoard[emptyTileIndex] = {
      letter: letter,
      state: 'initial',
    }
  }

  console.log('new board', newBoard)

  return newBoard
}

function updateKeyboard(keyboard: Array<Array<Key>>, letter: string) {
  const newKeyboard = [...keyboard]

  const keyRow = newKeyboard.find((row) =>
    row.find((key) => key.letter === letter)
  )
  const activeKey = keyRow?.find((key) => key.letter === letter)
  if (activeKey) {
    activeKey.state = 'wrong'
  }

  return newKeyboard
}

const INITIAL_KEYBOARD: Array<Array<Key>> = [
  [
    { letter: 'Q', state: 'initial' },
    { letter: 'W', state: 'initial' },
    { letter: 'E', state: 'initial' },
    { letter: 'R', state: 'initial' },
    { letter: 'T', state: 'initial' },
    { letter: 'Y', state: 'initial' },
    { letter: 'U', state: 'initial' },
    { letter: 'I', state: 'initial' },
    { letter: 'O', state: 'initial' },
    { letter: 'P', state: 'initial' },
  ],
  [
    { letter: 'A', state: 'initial' },
    { letter: 'S', state: 'initial' },
    { letter: 'D', state: 'initial' },
    { letter: 'F', state: 'initial' },
    { letter: 'G', state: 'initial' },
    { letter: 'H', state: 'initial' },
    { letter: 'J', state: 'initial' },
    { letter: 'K', state: 'initial' },
    { letter: 'L', state: 'initial' },
  ],
  [
    { letter: 'ENTER', state: 'initial' },
    { letter: 'Z', state: 'initial' },
    { letter: 'X', state: 'initial' },
    { letter: 'C', state: 'initial' },
    { letter: 'V', state: 'initial' },
    { letter: 'B', state: 'initial' },
    { letter: 'N', state: 'initial' },
    { letter: 'M', state: 'initial' },
    { letter: 'DELETE', state: 'initial' },
  ],
]
