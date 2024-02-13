import './MainLayout.css'

interface MainLayoutProps {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <header>
        <div className="redwoodjs-com">
          <a
            href="https://redwoodjs.com?utm_source=redwoodle&utm_medium=header&utm_id=bhv01"
            target="_blank"
            rel="noreferrer"
          >
            RedwoodJS
          </a>
        </div>
        <h1>Redwoodle</h1>
        <div className="github">
          <a
            href="https://github.com/redwoodjs/redwood"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.shields.io/github/stars/redwoodjs/redwood?style=social"
              alt="GitHub"
            />
          </a>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default MainLayout
