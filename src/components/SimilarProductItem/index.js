// Write your code here
import {FaStar} from 'react-icons/fa'
import './index.css'

const SimilarProductItem = props => {
  const {each} = props
  const neededFormatData = {
    imageUrl: each.image_url,
    brand: each.brand,
    title: each.title,
    rating: each.rating,
    price: each.price,
  }
  const {imageUrl, brand, title, rating, price} = neededFormatData

  const altValue = `similar product ${title}`

  return (
    <li className="eachCard">
      <img src={imageUrl} alt={altValue} className="" />
      <h1>{title}</h1>
      <p>by {brand}</p>
      <div className="priceRatingContainer">
        <p>RS {price}/-</p>
        <div className="ratingContainer">
          <p>{rating}</p>
          <FaStar />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
