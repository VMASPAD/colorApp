import { Button } from 'keep-react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="flex gap-7 flex-row content-center justify-center mb-5 mt-5">
      <Link to="/">
        <Button size="md" type="default">
          Inicio
        </Button>
      </Link>
      <Link to="/EPDF">
        <Button size="md" type="default">
          Convertir a PDF
        </Button>
      </Link>
    </div>
  )
}

export default NavBar
