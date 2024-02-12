import { HashRouter, Route, Routes } from 'react-router-dom'
import Colors from './components/Colors'
import NavBar from './components/NavBar'
import Epdf from './components/EPDF'

function App() {
  return (
    <>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" index element={<Colors />} />
        </Routes>
        <Routes>
          <Route path="/Epdf" index element={<Epdf />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
