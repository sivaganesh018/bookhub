import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cookies from 'js-cookie'

import TopRatedBookItem from '../TopRatedBookItem'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    topRatedBooksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }))
      this.setState({
        topRatedBooksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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

  renderTopRatedBooks = () => {
    const {topRatedBooksList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <>
        <Slider {...settings}>
          {topRatedBooksList.map(eachBook => (
            <TopRatedBookItem
              key={eachBook.id}
              topRatedBookDetails={eachBook}
            />
          ))}
        </Slider>
      </>
    )
  }

  renderAllBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTopRatedBooks()
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
        <div className="home-container ">
          <h1 className="heading">Find Your Next Favorite Books?</h1>
          <p className="home-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/shelf" className="link-item">
            <button type="button" className="find-books-btn-mobile">
              Find Books
            </button>
          </Link>
          <div className="top-rated-books-container">
            <div className="rated-books-and-find-books">
              <h1 className="top-rated-books-text">Top Rated Books</h1>
              <Link to="/shelf" className="link-item">
                <button className="find-books-btn" type="button">
                  Find Books
                </button>
              </Link>
            </div>
            <div className="books-slider">{this.renderAllBooks()}</div>
          </div>
          <div className="contact-us">
            {apiStatus === apiStatusConstants.success && <Footer />}
          </div>
        </div>
      </div>
    )
  }
}
export default Home
