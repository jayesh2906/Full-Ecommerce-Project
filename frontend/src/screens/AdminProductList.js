import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import AdminProduct from '../components/AdminProduct';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, setSearch } from '../actions/productActions';

export default function AdminProductList() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  if (products) {
    var currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  }


  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(listProducts());
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
              <AdminProduct key={product._id} product={product}></AdminProduct>
            ))}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={products.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}