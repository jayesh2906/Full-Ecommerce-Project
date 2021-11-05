import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import AdminProduct from '../components/AdminProduct';
import CustomerProduct from '../components/CustomerProduct';
import { searchProducts } from '../actions/productActions';
import { searchCustomerProducts } from '../actions/customerActions';
import { setSearch } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
const qs = require('qs');


export default function SearchScreen(props) {

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, adminInfo } = userSignin;

  const customerSearchedList = useSelector((state) => state.customerSearchedList);
  const { customerSearched } = customerSearchedList;

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  const search = props.match.params.search;
  const option = props.match.params.option;

  const searchedProducts = useSelector((state) => state.searchedProducts);
  const { loading, error, allSearchProducts } = searchedProducts;

  useEffect(() => {

    localStorage.setItem('search', "done")
    dispatch(setSearch())
    if (!customerInfo) {
      dispatch(searchProducts(option, search))
    }
    else {
      dispatch(searchCustomerProducts(option, search))
    }

  }, [dispatch]);


  return (
    <>
      <div>

        {(!customerInfo) ?
          loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div>
              {(adminInfo) ?
                <Link onClick={() => { localStorage.removeItem('search'); dispatch(setSearch()) }} to="/adminproductlist">Back to result</Link>
                :
                <Link onClick={() => { localStorage.removeItem('search'); dispatch(setSearch()) }} to="/">Back to result</Link>
              }
              {(allSearchProducts.length === 0) ?
                <h1>No result found...</h1>

                :
                <div className="row center">

                  {allSearchProducts.map((product) => (
                    (adminInfo) ?
                      <AdminProduct key={product._id} product={product}></AdminProduct>
                      :
                      <Product key={product._id} product={product}></Product>

                  ))}

                </div>
              }
            </div>
          )
          :
          <div>
            <Link onClick={() => { localStorage.removeItem('search'); dispatch(setSearch()) }} to="/customerproductlist">Back to result</Link>
            {(customerSearched.length === 0) ?
              <h1>No result found...</h1>

              :
              <div className="row center">

                {customerSearched.map((product) => (

                  <CustomerProduct key={product._id} product={product}></CustomerProduct>
                ))}
              </div>
            }
          </div>
        }
      </div>
    </>
  );
}



