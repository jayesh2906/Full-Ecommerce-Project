
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from "axios";

export default function UserSummary(props) {
    const option = props.match.params.option;

    const userSignin = useSelector((state) => state.userSignin);
    const { adminInfo } = userSignin;

    const [User, setUser] = useState([])
    const [Seller, setSeller] = useState([])

    useEffect(() => {

        if (option === "user") {
            Axios.get(`/api/users/summary/getAll`, {
                headers: {
                    Authorization: `Bearer ${adminInfo.token}`,
                },
            })
                .then(res => {
                    setUser(res.data)
                })
                .catch(error => {
                    console.log(error)
                });
        }
        else {
            Axios.get(`/api/customers/summary/getAll`, {
                headers: {
                    Authorization: `Bearer ${adminInfo.token}`,
                },
            })
                .then(res => {
                    setSeller(res.data)
                })
                .catch(error => {
                    console.log(error)
                });
        }

    });


    return (
        <>
            {(option === "seller") ?
                <>
                    <Link to="/admindashboard">Back to result</Link>
                    <h4 style={{ marginLeft: ".5rem" }} >All Sellers : </h4>

                    <table style={{ fontSize: "1.8rem" }} className="table">
                        <thead>
                            <tr>
                                <th >Seller Name</th>
                                <th >Seller Email</th>
                                <th >Seller Contact</th>
                                <th >Accout Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Seller.map((post) => (
                                    <tr>
                                        <td >{post.name}</td>
                                        <td >{post.email}</td>
                                        <td>{post.contact}</td>
                                        <td >{post.createdAt.split("T")[0]}, {post.createdAt.split("T")[1].split(".")[0]}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                </>
                :
                <>
                    <Link to="/admindashboard">Back to result</Link>
                    <h4 style={{ marginLeft: ".5rem" }} >All Users : </h4>

                    <table style={{ fontSize: "1.8rem" }} className="table">
                        <thead>
                            <tr>
                                <th >User Name</th>
                                <th >User Email</th>
                                <th >User Contact</th>
                                <th >Accout Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                User.map((post) => (
                                    <tr>
                                        <td >{post.name}</td>
                                        <td >{post.email}</td>
                                        <td>{post.contact}</td>
                                        <td >{post.createdAt.split("T")[0]}, {post.createdAt.split("T")[1].split(".")[0]}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </>
            }
        </>
    )
}