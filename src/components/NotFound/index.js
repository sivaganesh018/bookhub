import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      src="https://res.cloudinary.com/djuobew9d/image/upload/v1669356591/Book%20Hub%20project-images/Group_7484_c0ik6p.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/" className="link-item">
      <button type="button" className="go-back-to-home-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound
