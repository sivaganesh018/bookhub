import {Component} from 'react'

import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookItemDetails extends Component {
  state = {
    bookDetailsData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookItemDetails()
  }

  getBookItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        aboutAuthor: fetchedData.book_details.about_author,
        aboutBook: fetchedData.book_details.about_book,
        authorName: fetchedData.book_details.author_name,
        coverPic: fetchedData.book_details.cover_pic,
        id: fetchedData.book_details.id,
        rating: fetchedData.book_details.rating,
        readStatus: fetchedData.book_details.read_status,
        title: fetchedData.book_details.title,
      }
      this.setState({
        bookDetailsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderBookItemDetails = () => {
    const {bookDetailsData} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookDetailsData

    return (
      <div className="book-item-details-container">
        <div className="book-cover-and-details-container">
          <img
            className="book-item-details-cover"
            src={coverPic}
            alt="book-item-details"
          />
          <div className="book-details">
            <h1 className="book-item-details-title">{title}</h1>
            <p className="book-item-details-author-name">{authorName}</p>
            <div className="rating-container">
              <p className="book-item-details-rating">Avg Rating: </p>
              <BsFillStarFill className="star-icon" />
              <p className="book-item-rating">{rating}</p>
            </div>
            <p className="book-item-details-status">
              status: <span className="book-item-status">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="hr-line" />
        <h1 className="about-author-book-heading">About Author</h1>
        <p className="about-author-book-description">{aboutAuthor}</p>
        <h1 className="about-author-book-heading">About Book</h1>
        <p className="about-author-book-description">{aboutBook}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://res.cloudinary.com/djuobew9d/image/upload/v1669460162/Book%20Hub%20project-images/Group_7522_j7uau3.png"
        alt="failure-view"
      />
      <p className="failure-view-description">
        Something went wrong, Please try again.
      </p>
      <button className="failure-try-again-btn" type="button">
        Try Again
      </button>
    </div>
  )

  renderBookItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div>
        <Header />
        <div className="book-item-details">
          {this.renderBookItem()}
          <div className="book-shelves-contact-us">
            {apiStatus === apiStatusConstants.success && <Footer />}
          </div>
        </div>
      </div>
    )
  }
}
export default BookItemDetails
