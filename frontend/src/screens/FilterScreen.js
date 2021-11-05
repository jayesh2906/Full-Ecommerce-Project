import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { setSearch } from '../actions/productActions';


export default function FilterScreen(props) {
  const dispatch = useDispatch();
  const filterValue = props.location.state.response;
  const option = props.match.params.option;

  const [filterData, setFilterData] = useState([""])

  useEffect(() => {
    localStorage.setItem('search', "done")
    dispatch(setSearch())
    const data = JSON.stringify(filterValue)

    switch (option) {

      case "category":
        Axios.get(`/api/products/filter/category/${data}`)
          .then(res => {
            setFilterData(res.data.data)
          })
          .catch(error => {
            console.log(error)
          });
        break

      case "brand":

        Axios.get(`/api/products/filter/brand/${data}`)
          .then(res => {
            setFilterData(res.data.data)
          })
          .catch(error => {
            console.log(error)
          });
        break

    }
  }, []);


  return (
    <>
      <div>

        <Link onClick={() => { localStorage.removeItem('search'); dispatch(setSearch()) }} to="/">Back to result</Link>
        {(filterData.length === 0) ?
          <h1>No result found...</h1>

          :
          <div className="row center">

            {filterData.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}

          </div>
        }
      </div>
    </>
  );
}



