import { Link } from 'react-router-dom'

const Nav = () => {
  const loginOptions = (
    <nav>
      <Link to="/">Home</Link>
    </nav>
  )
  return (
    <header>
      <p>Puck</p>
      {loginOptions}
    </header>
  )
}
export default Nav
