import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCustomerProducts, setSearch, searchedProduct } from '../actions/productActions';
import MessageBox from '../components/MessageBox';
import Axios from "axios";

export default function CustomerUpdateProduct(props) {

    const productId = props.match.params.id;
    const [message, setMessage] = useState("");

    const customerSignin = useSelector((state) => state.customerSignin);
    const { customerInfo } = customerSignin;

    const dispatch = useDispatch();

    const customerProductList = useSelector((state) => state.customerProductList);
    const { loading, error, customerProducts } = customerProductList;

    const productSearch = useSelector((state) => state.productSearch);
    const { loading: loadingSearch, myProduct } = productSearch;

    useEffect(() => {

        localStorage.setItem('search', 'done')
        dispatch(setSearch())
        dispatch(listCustomerProducts(customerInfo.name));
        if (!loading) {
            dispatch(searchedProduct(customerProducts, productId));
        }
        if (!loadingSearch) {
            setName(myProduct.name);
            setCategory(myProduct.category);
            setPrice(myProduct.price);
            setCountInStock(myProduct.countInStock);
            setBrand(myProduct.brand);
            setDescription(myProduct.description);
        }
    }, [myProduct], [dispatch]);


    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');


    function submitProduct() {

        const data = { name, category, price, countInStock, brand, description }

        Axios.patch(`/api/products/customer/update/${productId}`, data, {
            headers: {
                Authorization: `Bearer ${customerInfo.token}`,
            },
        })
        dispatch(listCustomerProducts(name));
        setMessage("Product updated successfully")
        alert("Product updated successfully");
        props.history.push("/customerproductlist");
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
                                {message ?
                                    <MessageBox variant="success">
                                        Product updated successfully
                                    </MessageBox>
                                    : null}
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
                            <div>
                                <button className="primary" type="submit">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                )};
        </div>
    )
}