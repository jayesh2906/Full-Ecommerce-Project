import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsCustomer, updateCustomerProfile } from '../actions/customerActions';
import { setSearch } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CUSTOMER_UPDATE_PROFILE_RESET } from '../constants/customerConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;
  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;
  const customerUpdateProfile = useSelector((state) => state.customerUpdateProfile);

  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = customerUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem('search', 'done')
    dispatch(setSearch())
    if (!customer) {
      dispatch({ type: CUSTOMER_UPDATE_PROFILE_RESET });
      dispatch(detailsCustomer(customerInfo._id));
    } else {
      setName(customer.name);
      setEmail(customer.email);
    }
  }, [dispatch, customerInfo._id, customer]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      Axios.patch(`api/customers/update/${customer.name}`, { name }, {
        headers: {
          Authorization: `Bearer ${customerInfo.token}`,
        },
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        });
      dispatch(updateCustomerProfile({ customerId: customer._id, name, email, password }));
      dispatch({ type: CUSTOMER_UPDATE_PROFILE_RESET });
      dispatch(detailsCustomer(customerInfo._id));
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Seller Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}