import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchCustomerProducts } from '../actions/customerActions';
import CustomerProduct from '../components/CustomerProduct';
import AdminProduct from '../components/AdminProduct';
import Product from '../components/Product';
import { searchProducts } from '../actions/productActions';
import { setSearch } from '../actions/productActions';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SearchPriceScreen(props) {
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { adminInfo } = userSignin;

  const min = props.match.params.min;
  const max = props.match.params.max;
  const option = props.match.params.option;

  const searchedProducts = useSelector((state) => state.searchedProducts);
  const { loading, error, allSearchProducts } = searchedProducts;

  const customerSearchedList = useSelector((state) => state.customerSearchedList);
  const { customerSearched } = customerSearchedList;

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  useEffect(() => {
    localStorage.setItem('search', "done")
    dispatch(setSearch())
    if (max && min && option) {
      if (!customerInfo) {
        dispatch(searchProducts(option, "search", min, max))
      }
      else {
        dispatch(searchCustomerProducts(option, "search", min, max))
      }
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
                    (!adminInfo) ?
                      <Product key={product._id} product={product}></Product>
                      :
                      <AdminProduct key={product._id} product={product}></AdminProduct>
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



