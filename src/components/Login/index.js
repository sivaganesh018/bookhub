import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = `https://apis.ccbp.in/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <img
          className="mobile-login-banner"
          src="https://res.cloudinary.com/djuobew9d/image/upload/v1669269061/Book%20Hub%20project-images/Ellipse_99_ova49n.png"
          alt="login website logo"
        />
        <img
          className="book-hub-logo-mobile"
          src="https://res.cloudinary.com/djuobew9d/image/upload/v1668923627/Book%20Hub%20project-images/Group_7731_mtosvu.png"
          alt="website login"
        />
        <img
          className="login-page-background"
          src="https://res.cloudinary.com/djuobew9d/image/upload/v1668922438/Book%20Hub%20project-images/Rectangle_1467_dcwdyv.png"
          alt="login website logo"
        />
        <div className="login-form-container">
          <img
            className="book-hub-logo"
            src="https://res.cloudinary.com/djuobew9d/image/upload/v1668923627/Book%20Hub%20project-images/Group_7731_mtosvu.png"
            alt="website login"
          />
          <form className="form" onSubmit={this.onSubmitForm}>
            <label className="input-label" htmlFor="username">
              Username*
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="username"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label className="input-label" htmlFor="password">
              password*
            </label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder="password"
              onChange={this.onChangePassword}
              value={password}
            />
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
