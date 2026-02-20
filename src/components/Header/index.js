import {withRouter, Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const {history} = props
  const onLogout = () => {
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <ul className="icons-container">
        <li className="nav-item">
          <Link to="/" className="link-item">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jobs" className="link-item">
            <BsFillBriefcaseFill className="icon" />
          </Link>
        </li>
        <li className="nav-item" onClick={onLogout}>
          <FiLogOut className="icon" />
        </li>
      </ul>
      <ul className="tabs-container">
        <li className="nav-item tab">
          <Link to="/" className="link-item">
            Home
          </Link>
        </li>
        <li className="nav-item tab">
          <Link to="/jobs" className="link-item">
            Jobs
          </Link>
        </li>
      </ul>
      <div className="tabs-container">
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
