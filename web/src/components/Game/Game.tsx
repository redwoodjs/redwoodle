'use client'

import React, { useState } from 'react'

import './Game.css'

type State = 'initial' | 'wrong' | 'correct' | 'placement'

interface Key {
  letter: string
  state: State
}

interface Props {
  correctWord: string
}

export const Game = ({ correctWord }: Props) => {
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
                      const result = evaluateBoard(board, correctWord)

                      if (result) {
                        setBoard(result.newBoard)
                        if (result.word.length === 5) {
                          setGameRow((row) => row + 1)
                        }
                      }

                      if (result?.word?.toLocaleLowerCase() === correctWord) {
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

function evaluateBoard(board: Array<Key>, correctWord: string) {
  const newBoard = [...board]
  let lastFullWord = ''

  Array(5)
    .fill(0)
    .forEach((_, row) => {
      const word = board
        .slice(row * 5, (row + 1) * 5)
        .map((tile) => tile.letter)
        .join('')

      if (word.length === 5) {
        const boardRow = board.slice(row * 5, (row + 1) * 5)
        const newRow = evaluateRow(boardRow, correctWord)
        newBoard.splice(row * 5, 5, ...newRow)

        lastFullWord = word
      }
    })

  return { newBoard, word: lastFullWord }
}

function evaluateRow(boardRow: Array<Key>, correctWord: string) {
  const currentLetters = correctWord
    .split('')
    .map((letter) => letter.toUpperCase())
  const newRow = [...boardRow]
  currentLetters.forEach((letter, position) => {
    if (letter === newRow[position].letter) {
      newRow[position] = {
        state: 'correct',
        // Temporarily set it to . so we don't match it again for "right letter
        // in the wrong place" if the user has guessed the same letter again but
        // for another position
        letter: '.',
      }
      currentLetters[position] = '.'
    }
  })

  newRow.forEach((tile) => {
    if (tile.letter === '.') {
      // Already processed
      return
    }

    const letterIndex = currentLetters.indexOf(tile.letter)

    if (letterIndex >= 0) {
      currentLetters[letterIndex] = '.'
      tile.state = 'placement'
    } else {
      tile.state = 'wrong'
    }
  })

  newRow.forEach((tile, position) => {
    // Reset all letters from . back to their original value
    tile.letter = boardRow[position].letter
  })

  return newRow
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
