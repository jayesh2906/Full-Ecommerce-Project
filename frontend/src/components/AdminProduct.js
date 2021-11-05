import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { updateProductChosen, setSearch } from '../actions/productActions';
import { deleteProduct } from '../actions/productActions';
import { listProducts } from '../actions/productActions';

export default function AdminProduct(props) {
    const dispatch = useDispatch();
    const { product } = props;


    const history = useHistory();

    function editProduct(productId) {
        dispatch(updateProductChosen(productId));
        history.push(`/adminupdateproduct/${productId}`);
    }

    function deleteProd(productId) {
        dispatch(deleteProduct(productId));
        dispatch(listProducts());
        alert("Product is being deleted, Press ok");
    }

    return (<>

        <div key={product._id} className="card">
            <Link to={`/adminproduct/${product._id}`}>
                <img className="medium" src={`http://localhost:3000/images/${product.image}`} alt={product.name} />
            </Link>
            <div className="card-body">
                <Link to={`/adminproduct/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
                <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                ></Rating>
                <div className="price">₹{product.price}</div>
                <div style={{ marginTop: ".5rem", margin: "auto", width: "60%" }}>
                    <button onClick={() => { editProduct(product._id) }} className="primary" type="submit">
                        Edit
                    </button>
                    <button onClick={() => { deleteProd(product._id) }} style={{ marginTop: ".5rem", marginLeft: "1rem", display: "inline" }} className="primary" type="submit">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </>
    );
}