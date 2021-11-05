import React, { useState } from 'react';


export default function SearchBox(props) {
  const [search, setSearch] = useState('');
  const [ratingSearch, setRatingSearch] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [optionValue, setOption] = useState("name");

  const [sortValue, setSortOption] = useState("");

  function sortFunction() {
    if (sortValue !== "") {
      console.log("sort value ;", sortValue)
      props.history.push(`/sort/${sortValue}/`);
    }
  }


  const submitHandler = (e) => {
    e.preventDefault();
    if (optionValue === "name" || "brand" || "category")
      props.history.push(`/search/${optionValue}/${search}`);
    if (optionValue === "price")
      props.history.push(`/searchByPrice/${optionValue}/${minPrice}/${maxPrice}`);
    if (optionValue === "rating")
      props.history.push(`/search/${optionValue}/${ratingSearch}`);
  };

  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <select name="select" id="products"
          value={optionValue}
          onChange={(e) => {
            const selected = e.target.value;
            setOption(selected);
          }}>
          <option value="name">Name</option>
          <option value="brand">Brand</option>
          <option value="rating">Rating</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
        {
          (optionValue === "rating") ?
            <input
              type="Number"
              name="q"
              id="q"
              step="0.01"
              placeholder="Enter Minimum rating..."
              onChange={(e) => setRatingSearch(e.target.value)}
              required
            ></input>
            :
            (optionValue === "price") ?
              <>
                <input
                  type="Number"
                  name="q"
                  id="q"
                  step="0.01"
                  placeholder="Enter Min Price..."
                  onChange={(e) => setMinPrice(e.target.value)}
                  required
                ></input>
                <input
                  type="Number"
                  name="q"
                  id="q"
                  placeholder="Enter Max Price..."
                  onChange={(e) => setMaxPrice(e.target.value)}
                  required
                ></input>
              </>
              :
              <input
                type="text"
                name="q"
                id="q"
                placeholder="Enter to search..."
                onChange={(e) => setSearch(e.target.value)}
                required
              ></input>
        }
        <button style={{ color: "white", backgroundColor: "#3f3d3d" }} type="submit">
          <i className="fa fa-search"></i>
        </button>
        <select style={{ marginLeft: "1rem" }} onClick={() => { sortFunction() }} name="select" id="products"
          value={sortValue}
          onChange={(e) => {
            const selected = e.target.value;
            setSortOption(selected);
          }}>
          <option value="sortProducts">Sort Products :</option>
          <option value="sortPriced">Sort by Price ↑</option>
          <option value="sortNamed">Sort by Name ↑</option>
          <option value="sortRatingd">Sort by Rating ↑</option>
          <option value="sortNamea">Sort by Name ↓</option>
          <option value="sortPricea">Sort by Price ↓</option>
          <option value="sortRatinga">Sort by Rating ↓</option>
        </select>
      </div>
    </form>
  );
}