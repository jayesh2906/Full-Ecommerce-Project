import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishList } from '../actions/wishlistActions';
import { setSearch } from '../actions/productActions';
import Rating from '../components/Rating';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';


const WishListScreen = (props) => {

  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const idArray = new Array()
  wishlistItems.map((post) => {
    idArray.push(post.product)
  })

  useEffect(() => {
    localStorage.setItem('search', 'done')
    dispatch(setSearch())
  }, [dispatch]);

  const addToCart = (productId) => {
    dispatch(removeFromWishList(productId));
    props.history.push(`/cart/${productId}`);
  };


  function getWish(e, productId) {
    if (!e.target.checked) {
      dispatch(removeFromWishList(productId));
    }
  }
  return (

    (wishlistItems.length === 0) ?
      <div className="row top">
        <h1>Please first add products to wishlist, Thank You!</h1>
      </div>
      :
      <>
        <div className="row top">

          <h1>Your Wishlist..</h1>
        </div>
        <div className="row center">
          {wishlistItems.map((product) => (
            <div key={product.product} className="card">
              <Link to={`/product/${product.product}`}>
                <img className="medium"
                  src={`http://localhost:3000/images/${product.image}`}
                  alt={product.name} />
              </Link>
              <div className="card-body">
                <Link to={`/product/${product.product}`}>
                  <h2>{product.name} </h2>
                </Link>
                <span style={{ float: "right", marginTop: "-13px" }}>
                  <Checkbox
                    checked={(idArray.find(element => element == product.product))}
                    value="wishlist"
                    color="secondary"
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    title="Remove from Wishlist"
                    classes={{ root: 'custom-checkbox-root' }}
                    onChange={(e) => getWish(e, product.product)} /> </span>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
                <div className="price">₹{product.price} </div>
                <button onClick={() => {
                  if (product.countInStock === 0) {
                    alert("Product is out of Stock")
                    return;
                  };
                  addToCart(product.product)
                }} className="primary" style={{ marginLeft: "6.3rem" }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </>
  )
}

export default WishListScreen
