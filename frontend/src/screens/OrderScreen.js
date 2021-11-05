import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import jsPDF from 'jspdf';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }

  }, [dispatch, order, orderId, sdkReady, successPay]);

  const [bag, setBag] = useState([]);


  useEffect(() => {
    if (order) {
      setBag(order.orderItems)
    }
  }, [order]);

  useEffect(() => {
    if (bag) {
      setText(`Hii ${userInfo.name}, Thank you for shopping on Icons Store. We're preparing your order with ${bag.length} item ${bag.map((bag) => (bag.name))} and will be delivered to you within 7 days. Stay Home, Stay Safe`)
    }
  }, [bag]);


  if (order) {
    let currentTime = new Date();
    let paidTime = new Date(order.paidAt);
    var days = (currentTime - paidTime) / (1000 * 3600 * 24);
  }

  const [recipient] = useState(userInfo.contact);
  const [textmessage, setText] = useState("");


  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
    fetch(`http://127.0.0.1:5000/send-text?recipient=${recipient}&textmessage=${textmessage}`)
      .catch(err => console.error(err))
  };

  function cancleOrder(orderId) {
    Axios.delete(`/api/orders/delete/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
      .then(res => {
        console.log("result :", res.data)
      })
      .catch(error => {
        console.log(error)
      });

    alert("Order canceled successfully")
    props.history.push("/orderhistory")
  }



  function generatePDF() {

    var doc = new jsPDF("l", "mm", [1340, 740])
    doc.html(
      document.querySelector("#content"), {
      callback: function (pdf) {
        pdf.save("Bill.pdf");
      }
    })
  }


  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div id="content">
      <h1 style={{ marginLeft: '1.8rem' }}>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
                {order.isPaid ?
                  (days < 30) ?
                    <div data-html2canvas-ignore="true">
                      <p>Cancle Order policy available for {Number((30 - days).toFixed(0))} days</p>
                      <button onClick={() => { generatePDF() }} className="primary">Generate Bill Slip</button>
                      <button style={{ marginLeft: "1rem" }} onClick={() => { cancleOrder(orderId) }} className="primary">Cancle Order</button>
                    </div>
                    :
                    <><p data-html2canvas-ignore="true">You can not Cancle the order as Cancle order policy has been expired</p>
                      <button data-html2canvas-ignore="true" onClick={() => { generatePDF() }} className="primary">Generate Bill Slip</button>
                    </>
                  : <div>
                    <button onClick={() => { cancleOrder(orderId) }} className="primary">Cancle Order</button>
                  </div>
                }
                {/* <button onClick={()=>{mssg()}}  className="primary">send sms</button> */}

              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={`http://localhost:3000/images/${item.image}`}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>₹{order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>₹{order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>₹{order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>₹{order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}