/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Pagination = ({ postsPerPage, totalPosts, paginate, screen }) => {
  const pageNumbers = [];


  const userSignin = useSelector((state) => state.userSignin);
  const { adminInfo, userInfo } = userSignin;

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  const search = localStorage.getItem('search')


  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul style={{}} className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            {(customerInfo) ?
              (screen === "customerRequestStatus") ?
                <Link to="/customerRequestStatus"><a onClick={() => paginate(number)} className='page-link'>
                  {number}
                </a></Link>
                :
                <Link to="/customerproductlist"><a onClick={() => paginate(number)} className='page-link'>
                  {number}
                </a></Link>
              : (adminInfo) ?
                (search === "done") ?
                  (screen === "requestedProducts") ?
                    <Link to="/requestadmin"><a onClick={() => paginate(number)} className='page-link'>
                      {number}
                    </a></Link>
                    :
                    <Link to="/ordersummary"><a onClick={() => paginate(number)} className='page-link'>
                      {number}
                    </a></Link>
                  :
                  <Link to="/adminproductlist"><a onClick={() => paginate(number)} className='page-link'>
                    {number}
                  </a></Link>
                : (screen === "sortScreen") ?
                  <Link to="/sort/:sortValue"><a onClick={() => paginate(number)} className='page-link'>
                    {number}
                  </a></Link>
                  :
                  <Link to="/"><a onClick={() => paginate(number)} className='page-link'>
                    {number}
                  </a></Link>
            }
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;