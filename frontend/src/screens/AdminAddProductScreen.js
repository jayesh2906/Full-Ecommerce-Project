import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listProducts, setSearch } from '../actions/productActions';
import { addProduct } from '../actions/productActions';

export default function AdminHomeScreen(props) {


    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setReviews] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.setItem('search', "done")
        dispatch(setSearch())
    }, [dispatch]);
    function submitProduct() {
        var fd = new FormData();

        fd.append("name", name);
        fd.append("category", category);
        fd.append("price", price);
        fd.append("countInStock", countInStock);
        fd.append("brand", brand);
        fd.append("rating", rating);
        fd.append("numReviews", numReviews);
        fd.append("description", description);
        fd.append("image", image);

        dispatch(addProduct(fd))

        dispatch(listProducts());

        alert("Product added successfully");
        props.history.push("/adminproductlist");
    }


    return (<>

        <div>
            <form className="form" onSubmit={submitProduct}>
                <div>
                    <h1>Add products...</h1>
                </div>
                <div>
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Category</label>
                    <input
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
                        type="Number"
                        min="0"
                        id="price"
                        placeholder="Enter price"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="countInStock">Count In Stock</label>
                    <input
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
                        type="Number"
                        min="0"
                        id="numReviews"
                        placeholder="Enter no. of Reviews"
                        required
                        onChange={(e) => setReviews(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="Enter Description"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        placeholder="Enter Image Url"
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                    ></input>
                </div>
                <div>
                    <button className="primary" type="submit">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    </>
    )
}