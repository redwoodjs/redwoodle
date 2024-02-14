// @ts-expect-error node
import fs from 'node:fs'

import { Game } from 'src/components/Game/Game'

export const DATA = async () => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const words = fs.readFileSync('words.txt', 'utf8').split('\n')
  const index = Math.floor(Math.random() * words.length)

  return {
    word: words[index],
  }
}

export const Loading = () => (
  <div
    style={{ height: 870, paddingTop: 320, color: '#e59462', fontSize: '2em' }}
  >
    Loading...
  </div>
)

export const Success = ({ word }) => {
  console.log('word', word)

  return <Game correctWord={word} />
}
