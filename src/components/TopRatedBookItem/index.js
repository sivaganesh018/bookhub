import './index.css'

const TopRatedBookItem = props => {
  const {topRatedBookDetails} = props
  const {authorName, coverPic, title} = topRatedBookDetails

  return (
    <div className="top-rated-book-item">
      <img
        className="top-rated-book-cover-image"
        src={coverPic}
        alt="cover-pic"
      />
      <h1 className="book-title">{title}</h1>
      <p className="book-author-name">{authorName}</p>
    </div>
  )
}
export default TopRatedBookItem
