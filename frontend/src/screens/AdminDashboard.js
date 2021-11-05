import { useHistory } from "react-router"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, listRequestedProducts } from '../actions/productActions';
import Axios from "axios"
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

export default function DashboardScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [UserCount, setUserCount] = useState(0);
  const [SellerCount, setSellerCount] = useState(0);
  const [Orders, setOrder] = useState(0);

  const userSignin = useSelector((state) => state.userSignin);
  const { adminInfo } = userSignin;

  useEffect(() => {
    if (requestedProducts.length === 0) {
      dispatch(listRequestedProducts());
    }
    localStorage.setItem('search', "done")
    dispatch(setSearch())

    Axios.get(`api/users/count/getAll`, {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    })
      .then(res => {
        setUserCount(res.data)
      })
      .catch(error => {
        console.log(error)
      });

    Axios.get(`api/customers/count/getAll`, {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    })
      .then(res => {
        setSellerCount(res.data)
      })
      .catch(error => {
        console.log(error)
      });


    Axios.get(`api/orders/summary/getAll`, {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    })
      .then(res => {
        setOrder(res.data)
      })
      .catch(error => {
        console.log(error)
      });
  }, [dispatch]);

  const requestedProductList = useSelector((state) => state.requestedProductList);
  const { loading, error, requestedProducts } = requestedProductList;

  localStorage.setItem("orders", JSON.stringify(Orders))

  return (
    <div>
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      <>
        <ul className="row summary">
          <li style={{ cursor: "pointer" }} onClick={() => { history.push("/requestadmin") }}>
            <div className="summary-title color4">
              <span>
                <i className="fa fa-bell" /> Requests
              </span>
            </div>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <div className="summary-body">
                {requestedProducts.length}
              </div>
            )}
          </li>
          <li style={{ cursor: "pointer" }} onClick={() => { history.push(`/summary/user`) }}>
            <div className="summary-title color1">
              <span>
                <i className="fa fa-users" /> Users
              </span>
            </div>
            <div className="summary-body">{UserCount}</div>
          </li>
          <li style={{ cursor: "pointer" }} onClick={() => { history.push(`/summary/seller`) }}>
            <div className="summary-title color2">
              <span>
                <i className="fa fa-money" /> Sellers
              </span>
            </div>
            <div className="summary-body">
              {SellerCount}
            </div>
          </li>
          <li style={{ cursor: "pointer" }} onClick={() => {
            history.push({
              pathname: "/ordersummary",
              state: {
                response: Orders
              }
            })
          }}>
            <div className="summary-title color3">
              <span>
                <i className="fa fa-shopping-cart" /> Orders
              </span>
            </div>
            <div className="summary-body">
              {Orders.length}
            </div>
          </li>
        </ul>
      </>
    </div>
  )
}