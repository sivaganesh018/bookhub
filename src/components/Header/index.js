import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const renderMenu = () => (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="trigger-button">
            <FiMenu className="menu-icon" />
          </button>
        }
        position="bottom right"
      >
        {close => (
          <div className="pop-up-menu-mobile">
            <div>
              <ul className="header-menu-mobile">
                <Link to="/" className="link-item">
                  <li className="list-item">Home</li>
                </Link>
                <Link to="/shelf" className="link-item">
                  <li className="list-item">Bookshelves</li>
                </Link>
                <li>
                  <button
                    className="logout-btn"
                    type="button"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <button
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              <AiFillCloseCircle />
            </button>
          </div>
        )}
      </Popup>
    </div>
  )

  return (
    <div className="header-container">
      <Link to="/" className="link-item">
        <img
          className="book-hub-logo-img"
          src="https://res.cloudinary.com/djuobew9d/image/upload/v1668923627/Book%20Hub%20project-images/Group_7731_mtosvu.png"
          alt="website logo"
        />
      </Link>
      {renderMenu()}
      <ul className="header-menu">
        <Link to="/" className="link-item">
          <li className="list-item">Home</li>
        </Link>

        <Link to="/shelf" className="link-item">
          <li className="list-item">Bookshelves</li>
        </Link>
        <li>
          <button className="logout-btn" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
