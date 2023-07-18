import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav className="pl-4">
        <h2 className="ml-2 text-xl font-semibold">Welcome {user.email}!</h2>
        <Link to="/tree">
          <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded m-2">
            Note View
          </button>
        </Link>
        <Link onClick={handleLogOut} to="/">
          <button className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded m-0.5">
            Sign Out
          </button>
        </Link>
      </nav>
    )
  }
  const loginOptions = (
    <nav className="mt-6 pl-3.5">
      <Link
        className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded m-2"
        to="/"
      >
        Home
      </Link>
      <Link
        className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded m-2"
        to="/register"
      >
        Sign Up
      </Link>
      <Link
        className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded m-2"
        to="/signin"
      >
        Log In
      </Link>
    </nav>
  )
  return (
    <header>
      <h1 className="ml-5 mb-0.5 text-5xl font-extrabold">Oberon</h1>
      {user ? userOptions : loginOptions}
    </header>
  )
}
export default Nav
