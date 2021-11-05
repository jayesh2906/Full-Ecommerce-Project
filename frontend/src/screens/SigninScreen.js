import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { signinCustomer } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { setSearch } from '../actions/productActions';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinAs, setSigninAs] = useState('User');

  const userSignin = useSelector((state) => state.userSignin);
  const { adminInfo, userInfo, loading, error } = userSignin;

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo, loading: loadingCustomer, error: errorCustomer } = customerSignin;


  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    if (signinAs === "Admin") {
      dispatch(signin(email, password, true));
    }
    if (signinAs === "User") {

      dispatch(signin(email, password, false))
    }
    if (signinAs === "Customer") {
      dispatch(signinCustomer(email, password))
    }
  }

  useEffect(() => {
    localStorage.setItem('search', "done")
    dispatch(setSearch())
    if (adminInfo) {
      props.history.push("/adminproductlist");
    }
    if (customerInfo) {
      props.history.push("/customerproductlist");
    }
    if (userInfo) {
      props.history.push("/")
    }

  }, [props.history, userInfo, customerInfo, adminInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {(loading || loadingCustomer) && <LoadingBox></LoadingBox>}
        {(error || errorCustomer) && <MessageBox variant="danger">{error || errorCustomer}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="Signin as">Signin as</label>
          <select id="SigninAs" name="SigninAs"
            value={signinAs}
            onChange={(e) => setSigninAs(e.target.value)}>
            <option value="User">User</option>
            <option value="Customer">Seller</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{' '}
            <Link to={`/register`}>
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}