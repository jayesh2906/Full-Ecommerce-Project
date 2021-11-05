
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Axios from "axios";


export default function CustomerRequestStatus() {

    const [requestedProduct, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    var requestedProducts = requestedProduct.sort((b, a) => {
        return a.requestStatus - b.requestStatus;
    });


    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    if (requestedProducts) {
        var currentPosts = requestedProducts.slice(indexOfFirstPost, indexOfLastPost);
    }

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const customerSignin = useSelector((state) => state.customerSignin);
    const { customerInfo } = customerSignin;

    useEffect(() => {

        Axios.get(`api/products/customer/allRequest/${customerInfo.name}`, {
            headers: {
                Authorization: `Bearer ${customerInfo.token}`,
            },
        })
            .then(res => {
                setData(res.data.data)
            })
            .catch(error => {
                console.log(error)
            });

    }, []);


    return (
        <>
            {
                (requestedProducts.length === 0) ?
                    <>
                        <Link to="/admindashboard">Back to result</Link>
                        <h4 style={{ marginLeft: ".5rem" }} >No Requsest Pending: </h4>
                    </>
                    :
                    <>
                        <Link to="/admindashboard">Back to result</Link>
                        <h4 style={{ marginLeft: ".5rem" }} >Your all Requsests: </h4>

                        <br />
                        <table className="table">
                            <thead className="">
                                <tr>
                                    <th style={{ textAlign: "center" }} >Image</th>
                                    <th style={{ textAlign: "center" }}>Product</th>
                                    <th style={{ textAlign: "center" }} >Price</th>
                                    <th style={{ textAlign: "center" }} >Category</th>
                                    <th style={{ textAlign: "center" }} >Brand</th>
                                    <th style={{ textAlign: "center" }}>Requested at</th>
                                    <th style={{ textAlign: "center" }}>Request Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPosts.map((post) => (

                                        <tr>
                                            <td style={{ textAlign: "center" }}>
                                                <img
                                                    src={`http://localhost:3000/images/${post.image}`}
                                                    alt={post.name}
                                                    className="small"
                                                ></img>
                                            </td>
                                            <td style={{ textAlign: "center" }}>{post.name}</td>
                                            <td style={{ textAlign: "center" }}>₹{post.price}</td>
                                            <td style={{ textAlign: "center" }}>{post.category}</td>
                                            <td style={{ textAlign: "center" }}>{post.brand}</td>
                                            <td style={{ textAlign: "center" }} >{post.createdAt.split("T")[0]}, {post.createdAt.split("T")[1].split(".")[0]}</td>
                                            <td style={{ textAlign: "center" }}>
                                                {
                                                    (post.requestStatus.toString() === "true") ?
                                                        <h2 style={{ color: "red" }}>
                                                            Pending</h2>
                                                        : <h2 style={{ color: "green" }}>
                                                            Accepted</h2>
                                                }
                                            </td>
                                        </tr>

                                    ))}
                                {(requestedProducts.length > 10) ?
                                    <Pagination
                                        postsPerPage={postsPerPage}
                                        totalPosts={requestedProducts.length}
                                        paginate={paginate}
                                        screen={"customerRequestStatus"}
                                    /> : null}
                            </tbody>
                        </table>
                    </>
            }
        </>
    )
}