import { useHistory } from "react-router"
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import Product from '../components/Product';
import FilterBox from '../components/FilterBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { setSearch } from '../actions/productActions';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from "./Slides/slide1.jpg"
import img2 from "./Slides/slide2.jpg"
import img4 from "./Slides/slide3.jpg"
import img5 from "./Slides/slide5.jpg"
import img3 from "./Slides/slide4.jpg"
import img6 from "./Slides/slide6.jpg"
import img7 from "./Slides/slide7.jpg"
import img8 from "./Slides/slide8.jpg"

export default function HomeScreen() {

  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const dispatch = useDispatch();
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

  const onClickItemEvent = (value) => {

    switch (value) {
      case 0:
        history.push(`/search/category/shirt`)
        break;
      case 1:
        history.push(`/search/category/mobile`)
        break;
      case 2:
        history.push(`/search/category/watch`)
        break;
      case 3:
        history.push(`/search/category/gadget`)
        break;
      case 4:
        history.push(`/search/category/footwear`)
        break;
      case 5:
        history.push(`/search/category/gadget`)
        break;
      case 6:
        history.push(`/search/category/footwear`)
        break;
      default:
        history.push(`/search/category/footwear`)

    }
  }

  return (
    <>

      <Carousel infiniteLoop useKeyboardArrows onClickItem={onClickItemEvent} showThumbs={false} autoPlay interval="3000">
        <div>
          <img
            src={img1}
            alt="First slide"
            style={{ height: '35rem' }}
          />
        </div>
        <div>
          <img
            src={img2}
            alt="First slide"
            style={{ height: '35rem' }}
          />
        </div>
        <div>
          <img
            src={img3}
            alt="Second slide"
            style={{ height: '35rem' }}
          />

        </div>
        <div>
          <img
            src={img5}
            alt="Fifth slide"
            style={{ height: '35rem' }}
          />
        </div>
        <div>
          <img
            src={img7}
            alt="Seventh slide"
            style={{ height: '35rem' }}
          />
        </div>
        <div>
          <img
            src={img6}
            alt="Fifth slide"
            style={{ height: '35rem' }}
          />
        </div>
        <div>
          <img
            src={img8}
            alt="Eight slide"
            style={{ height: '35rem' }}
          />
        </div>
        <div>
          <img
            src={img4}
            alt="Third slide"
            style={{ height: '35rem' }}
          />
        </div>

      </Carousel>

      <div className="navigation">
        <div className="topnav1">
          <FilterBox />
        </div>

        <div className="topnav2">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div className="row center">
                {currentPosts.map((product) => (
                  <Product key={product._id} product={product}></Product>
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
      </div>
    </>
  );
}