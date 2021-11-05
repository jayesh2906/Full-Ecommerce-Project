
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';

export default function OrderSummary(props) {

    const orders = JSON.parse(localStorage.getItem("orders"))

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    if (orders) {
        var currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);
    }

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
    });

    return (
        <>
            <Link to="/admindashboard">Back to result</Link>
            <h4 style={{ marginLeft: ".5rem" }} >All Orders : </h4>

            <table style={{ fontSize: "1.8rem" }} className="table">
                <thead>
                    <tr>
                        <th >User Name</th>
                        <th >User Address</th>
                        <th >Items Price</th>
                        <th >Tax Price</th>
                        <th >Total Price</th>
                        <th >Order Items</th>
                        <th >Order Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentPosts.map((post) => (
                            <tr>
                                <td >{post.shippingAddress.fullName}</td>
                                <td >{post.shippingAddress.address}</td>
                                <td>{post.itemsPrice}</td>
                                <td>{post.taxPrice}</td>
                                <td>{post.totalPrice}</td>
                                <td>{post.orderItems.length}</td>
                                <td >{post.createdAt.split("T")[0]}, {post.createdAt.split("T")[1].split(".")[0]}</td>
                            </tr>
                        ))}

                </tbody>
            </table>
            {(orders.length > 10) ?
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={orders.length}
                    paginate={paginate}
                /> : null}
        </>
    )
}