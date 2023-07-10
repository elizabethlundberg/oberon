import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav>
        <h3>Welcome {user.email}!</h3>
        <Link to="/tree">Tree Mode</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }
  const loginOptions = (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Sign Up</Link>
      <Link to="/signin">Log In</Link>
    </nav>
  )
  return (
    <header>
      <p>Puck</p>
      {user ? userOptions : loginOptions}
    </header>
  )
}
export default Nav
