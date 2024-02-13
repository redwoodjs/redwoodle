'use client'

import React, { useState } from 'react'

import './Game.css'

const currentWord = 'align'

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
  const [gameRow, setGameRow] = useState(0)

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
                    if (key.letter === 'ENTER') {
                      const result = evaluateBoard(board)

                      if (result) {
                        setBoard(result.newBoard)
                        setGameRow((row) => row + 1)
                      }

                      if (result?.word?.toLocaleLowerCase() === currentWord) {
                        console.log('win')
                      }
                    } else if (key.letter === 'DELETE') {
                      const newBoard = deleteFromBoard(board, gameRow)

                      if (newBoard) {
                        setBoard(newBoard)
                      }
                    } else {
                      const newBoard = addToBoard(board, gameRow, key.letter)
                      if (newBoard) {
                        setBoard(newBoard)

                        const newKeyboard = updateKeyboard(keyboard, key.letter)
                        setKeyboard(newKeyboard)
                      }
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

function addToBoard(board: Array<Key>, row: number, letter: string) {
  const emptyTileIndex = board.findIndex((tile) => !tile.letter)
  if (emptyTileIndex === -1) {
    console.log('no empty tiles - you lose!')
    return
  }

  const newBoard = [...board]

  const word =
    newBoard
      .slice(row * 5, (row + 1) * 5)
      .map((tile) => tile.letter)
      .join('') + letter

  if (word.length > 5) {
    return
  }

  const emptyTile = newBoard[emptyTileIndex]
  if (emptyTile) {
    newBoard[emptyTileIndex] = {
      letter: letter,
      state: 'initial',
    }
  }

  return newBoard
}

function deleteFromBoard(board: Array<Key>, row: number) {
  const newBoard = [...board]
  const word = newBoard
    .slice(row * 5, (row + 1) * 5)
    .map((tile) => tile.letter)
    .join('')

  if (word.length === 0) {
    return
  }

  newBoard[row * 5 + word.length - 1] = {
    letter: '',
    state: 'initial',
  }

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

function evaluateBoard(board: Array<Key>) {
  const newBoard = [...board]
  let lastFullWord = ''

  Array(5)
    .fill(0)
    .forEach((_tile, i) => {
      const word = board
        .slice(i * 5, (i + 1) * 5)
        .map((tile) => tile.letter)
        .join('')

      if (word.length === 5) {
        const currentLetters = currentWord
          .split('')
          .map((letter) => letter.toUpperCase())

        word.split('').forEach((letter, letterPosition) => {
          newBoard[i * 5 + letterPosition].state = getLetterState(
            letter,
            letterPosition,
            currentLetters
          )
        })

        lastFullWord = word
      }
    })

  return { newBoard, word: lastFullWord }
}

function getLetterState(
  letter: string,
  position: number,
  currentLetters: Array<string>
) {
  if (!letter) {
    return 'initial'
  }

  const letterIndex = currentLetters.indexOf(letter)

  if (letterIndex === position) {
    currentLetters[letterIndex] = ''
    return 'correct'
  } else if (letterIndex >= 0) {
    currentLetters[letterIndex] = ''
    return 'placement'
  } else {
    return 'wrong'
  }
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
