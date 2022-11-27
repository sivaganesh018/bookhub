import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import TabItem from '../TabItem'
import BookItem from '../BookItem'
import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    activeBookshelveValue: bookshelvesList[0].value,
    searchInput: '',
    bookShelvesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookshelvesBooks()
  }

  getBookshelvesBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, activeBookshelveValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeBookshelveValue}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookShelvesData: updatedData,
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

  renderBooksNotFound = () => {
    const {searchInput} = this.state
    return (
      <div className="no-books-found-container">
        <img
          className="books-not-found-image"
          src="https://res.cloudinary.com/djuobew9d/image/upload/v1669392344/Book%20Hub%20project-images/Asset_1_1_vyfzei.png"
          alt="no books"
        />
        <p className="books-not-found-description">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderBooksItems = () => {
    const {bookShelvesData} = this.state
    const isBooksAvailable = bookShelvesData.length === 0

    return isBooksAvailable ? (
      <>{this.renderBooksNotFound()}</>
    ) : (
      <ul className="books-list">
        {bookShelvesData.map(eachBook => (
          <BookItem key={eachBook.id} bookDetails={eachBook} />
        ))}
      </ul>
    )
  }

  changeActiveTab = tabValue => {
    this.setState({activeBookshelveValue: tabValue}, this.getBookshelvesBooks)
  }

  renderBookshelvesTabs = () => {
    const {activeBookshelveValue} = this.state
    return (
      <div className="tabslist-container">
        <h1 className="bookshelves-heading">Bookshelves</h1>
        <ul className="bookshelves-tabs-list">
          {bookshelvesList.map(eachShelve => (
            <TabItem
              key={eachShelve.id}
              tabDetails={eachShelve}
              activeTab={activeBookshelveValue}
              changeActiveTab={this.changeActiveTab}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderAllBookshelves = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksItems()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getBookshelvesBooks)
  }

  render() {
    const {searchInput, apiStatus} = this.state
    return (
      <div>
        <Header />
        <div className="bookshelves-container">
          <div className="bookshelves-tabs-desktop">
            {this.renderBookshelvesTabs()}
          </div>
          <div className="bookshelves-search-and-books-container">
            <div className="active-tab-search-container">
              <p className="active-tab">All Books</p>
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="search"
                  className="search-input"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-icon-btn"
                  onClick={this.onClickSearchBtn}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <div className="bookshelves-tabs-mobile">
              {this.renderBookshelvesTabs()}
            </div>
            <div className="render-books-container">
              {this.renderAllBookshelves()}
            </div>
            <div className="bookshelves-contact-us">
              {apiStatus === apiStatusConstants.success && <Footer />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Bookshelves
