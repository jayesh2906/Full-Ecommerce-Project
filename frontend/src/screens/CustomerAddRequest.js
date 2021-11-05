import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequestProduct } from '../actions/productActions';
import MessageBox from '../components/MessageBox';
import { setSearch } from '../actions/productActions';

export default function CustomerAddRequest(props) {


    const customerSignin = useSelector((state) => state.customerSignin);
    const { customerInfo } = customerSignin;
    const [message, setMessage] = useState("");

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem('search', 'done')
        dispatch(setSearch())
    }, [dispatch]);

    function submitProduct() {
        var fd = new FormData();

        fd.append("name", name);
        fd.append("category", category);
        fd.append("price", price);
        fd.append("countInStock", countInStock);
        fd.append("brand", brand);
        fd.append("description", description);
        fd.append("image", image);
        fd.append("customer", customerInfo.name);

        setMessage("Request Submitted successfully")

        dispatch(addRequestProduct(fd))
        alert("Request Submitted successfully");

    }


    return (<>

        <div>
            <form className="form" onSubmit={submitProduct}>
                <div>
                    <h1>Request admin to add product...</h1>
                </div>
                <div>
                    {(message !== "") ?
                        <MessageBox variant="success">
                            Product updated successfully
                        </MessageBox>
                        : null}
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
                        Request to add Product
                    </button>
                </div>
            </form>
        </div>
    </>
    )
}