import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import CustomerProduct from '../components/CustomerProduct';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listCustomerProducts, setSearch } from '../actions/productActions';

export default function CustomerProductList() {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const dispatch = useDispatch();
  const customerProductList = useSelector((state) => state.customerProductList);
  const { loading, error, customerProducts } = customerProductList;

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  if (customerProducts) {
    var currentPosts = customerProducts.slice(indexOfFirstPost, indexOfLastPost);
  }


  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  useEffect(() => {
    dispatch(listCustomerProducts(customerInfo.name));
    localStorage.removeItem('search')
    dispatch(setSearch())
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row center">
            {currentPosts.map((product) => (
              <CustomerProduct key={product._id} product={product}></CustomerProduct>
            ))}
          </div>
          {(customerProducts.length > 10) ?
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={customerProducts.length}
              paginate={paginate}
            /> : null}
        </>
      )}
    </div>
  );
}