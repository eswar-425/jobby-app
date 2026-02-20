import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {showErrorMsg: false, errorMsg: '', username: '', password: ''}

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      this.onSuccess(jwtToken)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMsg => this.setState({showErrorMsg: true, errorMsg})

  changeUsername = event => this.setState({username: event.target.value})

  changePassword = event => this.setState({password: event.target.value})

  render() {
    const {showErrorMsg, errorMsg, username, password} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-box">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              className="input"
              onChange={this.changeUsername}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              className="input"
              onChange={this.changePassword}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
