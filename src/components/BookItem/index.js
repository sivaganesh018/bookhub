import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {id, authorName, coverPic, rating, readStatus, title} = bookDetails
  return (
    <Link to={`/books/${id}`} className="link-item">
      <li className="book-item" testid="bookItem">
        <img className="book-image" src={coverPic} alt={title} />
        <div>
          <h1 className="book-heading">{title}</h1>
          <p className="author-name">{authorName}</p>
          <div className="rating-container">
            <p className="book-rating">Avg Rating: </p>
            <BsFillStarFill className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
          <p className="book-status">
            status: <span className="status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}
export default BookItem
