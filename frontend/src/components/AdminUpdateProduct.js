import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../actions/productActions';
import { listProducts, searchedProduct, setSearch } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AdminUpdateProduct(props) {

    const productId = props.match.params.id;


    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;


    const productSearch = useSelector((state) => state.productSearch);
    const { loading: loadingSearch, myProduct } = productSearch;


    useEffect(() => {

        localStorage.setItem('search', 'done')
        dispatch(setSearch())
        dispatch(listProducts());
        if (!loading) {
            dispatch(searchedProduct(products, productId));
        }
        if (!loadingSearch) {
            setName(myProduct.name);
            setCategory(myProduct.category);
            setPrice(myProduct.price);
            setCountInStock(myProduct.countInStock);
            setBrand(myProduct.brand);
            setRating(myProduct.rating);
            setReviews(myProduct.numReviews);
            setDescription(myProduct.description);
        }
    }, [myProduct], [dispatch]);


    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setReviews] = useState('');
    const [description, setDescription] = useState('');

    function submitProduct() {

        dispatch(updateProduct(productId, { name, category, price, countInStock, brand, rating, numReviews, description }));
        dispatch(listProducts());
        alert("Product updated successfully");
        props.history.push("/adminproductlist");
    }

    return (
        <div>
            {
                error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>
                        <form className="form" onSubmit={submitProduct}>
                            <div>
                                <h1>Update products...</h1>
                            </div>
                            <div>
                                <label htmlFor="name">Product Name</label>
                                <input
                                    value={name}
                                    type="text"
                                    id="name"
                                    placeholder="Enter name"

                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="email">Category</label>
                                <input
                                    value={category}
                                    type="text"
                                    id="category"
                                    placeholder="Enter category"
                                    required
                                    onChange={(e) => setCategory(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    value={price}
                                    type="Number"
                                    id="price"
                                    placeholder="Enter price"
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="countInStock">Count In Stock</label>
                                <input
                                    value={countInStock}
                                    type="Number"
                                    min="0"
                                    id="countInStock"
                                    placeholder="Enter count in Stock"
                                    required
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="brand">Brand</label>
                                <input
                                    value={brand}
                                    type="text"
                                    id="brand"
                                    placeholder="Enter brand name"
                                    required
                                    onChange={(e) => setBrand(e.target.value)}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor="rating">Rating</label>
                                <input
                                    value={rating}
                                    min="0"
                                    max="5"
                                    step=".01"
                                    type="Number"
                                    id="rating"
                                    placeholder="Enter Rating"
                                    required
                                    onChange={(e) => setRating(e.target.value)}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor="numReviews">No. of Reviews</label>
                                <input
                                    value={numReviews}
                                    type="Number"
                                    id="numReviews"
                                    min="0"
                                    placeholder="Enter no. of Reviews"
                                    required
                                    onChange={(e) => setReviews(e.target.value)}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    value={description}
                                    type="text"
                                    id="description"
                                    placeholder="Enter Description"
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                ></input>
                            </div>

                            {/* <div>
                    <label htmlFor="image">Image</label>
                    <input
                    
                    onChange={(e) => setImage(e.target.value)}
                     value={image}
                        type="text"
                        id="image"
                        placeholder="Enter Image Url"
                        required
                    ></input>
                </div> */}
                            <div>
                                <button className="primary" type="submit">
                                    Update Product
                                </button>
                            </div>
                        </form>
                    </div>
                )};
        </div>
    )
}