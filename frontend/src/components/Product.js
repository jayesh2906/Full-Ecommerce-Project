import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList } from '../actions/wishlistActions';
import Rating from './Rating';


export default function Product(props) {
  const { product } = props;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const idArray = new Array()
  wishlistItems.map((post) => {
    idArray.push(post.product)
  })


  const dispatch = useDispatch();

  function getWish(e, productId) {
    if (e.target.checked) {
      dispatch(addToWishList(productId));
    } else {
      dispatch(removeFromWishList(productId));
    }
  }

  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium"
          // src={`images/${product.image}`}
          src={`http://localhost:3000/images/${product.image}`}
          alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name} </h2>
        </Link>
        <span style={{ float: "right", marginTop: "-13px" }}>
          <Checkbox
            checked={(idArray.find(element => element == product._id))}
            value="wishlist"
            color="secondary"
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            title="Add to Wishlist"
            classes={{ root: 'custom-checkbox-root' }}
            onChange={(e) => getWish(e, product._id)} /> </span>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="price">₹{product.price} </div>
        <Link to={`/product/${product._id}`}>
          <button className="primary" style={{ marginLeft: "8.5rem" }}>view</button>
        </Link>
      </div>
    </div>
  );
}