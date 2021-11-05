import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Product from '../components/Product';
import AdminProduct from '../components/AdminProduct';
import CustomerProduct from '../components/CustomerProduct';
import { sortProducts } from '../actions/productActions';
import { sortCustomerProducts } from '../actions/customerActions';
import { setSearch } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SortScreen(props) {

  const sortedProductList = useSelector((state) => state.sortedProductList);
  const { loading, error, sortedProducts } = sortedProductList;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  if (sortedProducts) {
    var currentPosts = sortedProducts.slice(indexOfFirstPost, indexOfLastPost);
  }


  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const option = props.match.params.sortValue;

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { adminInfo } = userSignin;

  const sortedCustomerProductList = useSelector((state) => state.sortedCustomerPoductList);
  const { sortedCustomerProducts } = sortedCustomerProductList

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  useEffect(() => {

    localStorage.setItem('search', "done")
    dispatch(setSearch())
    if (!customerInfo) {
      dispatch(sortProducts(option))
    }
    else {
      dispatch(sortCustomerProducts(option))
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
                <Link onClick={() => { localStorage.removeItem('search'); dispatch(setSearch()); }} to="/adminproductlist">Back to result</Link>
                :
                <Link onClick={() => { localStorage.removeItem('search'); dispatch(setSearch()); }} to="/">Back to result</Link>
              }  <div className="row center">

                {currentPosts.map((product) => (
                  (adminInfo) ?
                    <AdminProduct key={product._id} product={product}></AdminProduct>
                    :
                    <Product key={product._id} product={product}></Product>

                ))}

              </div>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={sortedProducts.length}
                paginate={paginate}
                screen={"sortScreen"}
              />
            </div>
          )
          :
          <div>
            <Link onClick={() => { localStorage.removeItem('search'); dispatch(setSearch()); }} to="/customerproductlist">Back to result</Link>
            <div className="row center">

              {sortedCustomerProducts.map((product) => (

                <CustomerProduct key={product._id} product={product}></CustomerProduct>
              ))}
            </div>

          </div>
        }
      </div>
    </>
  );
}



