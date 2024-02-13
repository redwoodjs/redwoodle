import { Assets } from '@redwoodjs/vite/assets'
import { ProdRwRscServerGlobal } from '@redwoodjs/vite/rwRscGlobal'

import { Game } from 'src/components/Game/Game'

import './HomePage.css'

globalThis.rwRscGlobal = new ProdRwRscServerGlobal()

const HomePage = () => {
  return (
    <div className="home-page">
      {/* TODO (RSC) <Assets /> should be part of the router later */}
      <Assets />
      <div className="game-container">
        <Game />
      </div>
    </div>
  )
}

export default HomePage
