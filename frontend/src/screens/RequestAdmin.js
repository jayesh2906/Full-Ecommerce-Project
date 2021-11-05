
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listRequestedProducts, deleteProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Pagination from '../components/Pagination';
import Axios from "axios";


export default function RequestAdmin() {

    const requestedProductList = useSelector((state) => state.requestedProductList);
    const { loading, error, requestedProducts } = requestedProductList;

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    if (requestedProducts) {
        var currentPosts = requestedProducts.slice(indexOfFirstPost, indexOfLastPost);
    }

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const userSignin = useSelector((state) => state.userSignin);
    const { adminInfo } = userSignin;

    const [show, setShow] = useState("requests")
    const [search, setSearch] = useState("")
    const [rating, setRating] = useState('');
    const [numReviews, setReviews] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listRequestedProducts());
    }, [dispatch]);

    const [requestStatus] = useState(false);

    function acceptRequest(name) {
        setSearch(name)
        setShow("add review");
    }


    function deleteRequest(productId) {
        dispatch(deleteProduct(productId));
        dispatch(listRequestedProducts());
        alert("Request is being deleted, Press ok");
    }

    function submitProduct() {

        let data = { requestStatus, rating, numReviews }
        Axios.patch(`api/products/admin/acceptRequest/${search}`, data, {
            headers: {
                Authorization: `Bearer ${adminInfo.token}`,
            },
        })
            .then(res => {
                dispatch(listRequestedProducts());
            })
            .catch(error => {
                console.log(error)
            });

        alert("Product added Successfully!")
        setShow("requests")
    }

    return (
        <>

            {(show === "requests") ?
                <>
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (<>
                        {
                            (requestedProducts.length === 0) ?
                                <>
                                    <Link to="/admindashboard">Back to result</Link>
                                    <h4 style={{ marginLeft: ".5rem" }} >No Requsest Pending: </h4>
                                </>
                                :
                                <>
                                    <Link to="/admindashboard">Back to result</Link>
                                    <h4 style={{ marginLeft: ".5rem" }} >All Requsest by Customers to add a new Product : </h4>

                                    <br />
                                    <table className="table">
                                        <thead className="">
                                            <tr>
                                                <th style={{ textAlign: "center" }} >Image</th>
                                                <th style={{ textAlign: "center" }}>Product</th>
                                                <th style={{ textAlign: "center" }} >Price</th>
                                                <th style={{ textAlign: "center" }} >Category</th>
                                                <th style={{ textAlign: "center" }}>Request Status</th>
                                                <th style={{ textAlign: "center" }}>Seller Name</th>
                                                <th style={{ textAlign: "center" }} colspan="2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentPosts.map((post) => (

                                                    <tr>
                                                        <td style={{ textAlign: "center" }}><img
                                                            src={`http://localhost:3000/images/${post.image}`}
                                                            alt={post.name}
                                                            className="small"
                                                        ></img></td>
                                                        <td style={{ textAlign: "center" }}>{post.name}</td>
                                                        <td style={{ textAlign: "center" }}>₹{post.price}</td>
                                                        <td style={{ textAlign: "center" }}>{post.category}</td>
                                                        <td style={{ textAlign: "center" }}>pending</td>
                                                        <td style={{ textAlign: "center" }}>{post.customer}</td>
                                                        <td style={{ textAlign: "center" }}><button style={{ backgroundColor: "green", color: "white" }} onClick={() => { acceptRequest(post.name) }} >Accept Request</button></td>
                                                        <td style={{ textAlign: "center" }}><button style={{ backgroundColor: "#292b2c", color: "white" }} onClick={() => { deleteRequest(post._id) }} className="primary">Delete Request</button></td>
                                                    </tr>

                                                ))}
                                            {(requestedProducts.length > 10) ?
                                                <Pagination
                                                    postsPerPage={postsPerPage}
                                                    totalPosts={requestedProducts.length}
                                                    paginate={paginate}
                                                    screen={"requestedProducts"}
                                                /> : null}
                                        </tbody>
                                    </table>
                                </>
                        }
                    </>
                    )

                    }
                </> :
                <div>
                    <form className="form" onSubmit={submitProduct}>
                        <div>
                            <h1>  Add Extra Details for Product...</h1>
                        </div>
                        <div>
                            <label htmlFor="rating"><b>Rating</b></label>
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
                            <label htmlFor="numReviews"><b>No. of Reviews</b></label>
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
                            <button style={{ marginTop: "2rem" }} className="primary" type="submit">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            }</>
    )
}