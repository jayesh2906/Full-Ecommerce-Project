import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductChosen, setSearch } from '../actions/productActions';
import { deleteProductCustomer } from '../actions/productActions';
import { listCustomerProducts } from '../actions/productActions';

export default function CustomerProduct(props) {
    const { product } = props;
    const dispatch = useDispatch();

    const customerSignin = useSelector((state) => state.customerSignin);
    const { customerInfo } = customerSignin;

    const history = useHistory();

    function editProduct(productId) {
        dispatch(updateProductChosen(productId));
        history.push(`/cutomerupdateproduct/${productId}`);
    }

    function deleteProd(productId) {
        dispatch(deleteProductCustomer(productId));
        dispatch(listCustomerProducts(customerInfo.name));
        alert("Product is being deleted, Press ok");
        history.push(`/customerproductlist`);

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
                <div style={{ margin: "auto", width: "60%" }}>
                    <button onClick={() => { editProduct(product._id) }} className="primary" type="submit">
                        Edit
                    </button>
                    <button onClick={() => { deleteProd(product._id) }} style={{ marginLeft: "1rem", display: "inline" }} className="primary" type="submit">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </>
    );
}