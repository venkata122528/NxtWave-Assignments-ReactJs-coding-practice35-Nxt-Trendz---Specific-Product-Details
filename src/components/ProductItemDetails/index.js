/* eslint-disable jsx-a11y/control-has-associated-label */
// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    status: apiStatus.initial,
    productCount: 1,
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getProductData(id)
  }

  getProductData = async productId => {
    this.setState({status: apiStatus.in_progress})
    const url = `https://apis.ccbp.in/products/${productId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }
      this.setState({productData: updatedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  onClickShoppingButton = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderInprogressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className=""
      />
      <h1>Product Not Found</h1>
      <button type="button" onClick={this.onClickShoppingButton}>
        Continue Shopping
      </button>
    </div>
  )

  onClickMinus = () => {
    const {productCount} = this.state

    if (productCount < 2) {
      this.setState({
        productCount: 1,
      })
    } else {
      this.setState(previousState => ({
        productCount: previousState.productCount - 1,
      }))
    }
  }

  onClickPlus = () => {
    this.setState(previousState => ({
      productCount: previousState.productCount + 1,
    }))
  }

  renderSuccessView = () => {
    const {productData, productCount} = this.state
    const {
      availability,
      brand,
      description,
      id,
      imageUrl,
      price,
      rating,
      similarProducts,
      style,
      title,
      totalReviews,
    } = productData
    console.log(productData)

    return (
      <div className="successContainer">
        <img src={imageUrl} alt="product" className="productImage" />
        <div className="productDetailsContainer">
          <h1>{title}</h1>
          <p>RS {price}/-</p>
          <div className="starAndReviewContainer">
            <div className="starContainer">
              <p>{rating}</p>
              <FaStar className="star" />
            </div>
            <p>{totalReviews} Reviews</p>
          </div>
          <p>{description}</p>
          <p>
            <span>Available: </span>
            {availability}
          </p>
          <p>
            <span>Brand: </span>
            {brand}
          </p>
          <hr />
          <div className="buttonsContainer">
            <button
              type="button"
              data-testid="minus"
              onClick={this.onClickMinus}
            >
              <BsDashSquare />
            </button>
            <p>{productCount}</p>
            <button type="button" data-testid="plus" onClick={this.onClickPlus}>
              <BsPlusSquare />
            </button>
          </div>
          <button type="button">ADD TO CART</button>
        </div>
        <div className="similarProductsContainer">
          <h1>Similar Products</h1>
          <ul className="similarCardsContainer">
            {similarProducts.map(each => (
              <SimilarProductItem each={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {status} = this.state

    return (
      <div className="mainContainer">
        <Header />
        {status === apiStatus.in_progress && this.renderInprogressView()}
        {status === apiStatus.success && this.renderSuccessView()}
        {status === apiStatus.failure && this.renderFailureView()}
      </div>
    )
  }
}

export default ProductItemDetails
