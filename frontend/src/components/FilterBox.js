import { useHistory } from "react-router"
import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Slider } from '@material-ui/core';
import { MuiThemeProvider } from 'material-ui';


export default function FilterBox() {
    const history = useHistory();

    const [optionValue, setOption] = useState("name");
    const [boxValue] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [rating, setRating] = useState(0);
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState([""]);

    const [sortPro] = useState(["Ascending Price", "Descending Price", "Ascending Name", "Descending Name", "Ascending Rating", "Descending Rating"]);
    const [sortValue, setSortOption] = useState("");

    ////////////////// category ///////////

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const categoryArray = new Array()
    if (products) {
        products.map((post) => {
            categoryArray.push(post.category)
        })
    }
    const uniqueCategory = categoryArray.filter((category, index) => {
        return categoryArray.indexOf(category) === index;
    })

    ////////////////// Brand ///////////


    const brandArray = new Array()
    if (products) {
        products.map((post) => {
            brandArray.push(post.brand)
        })
    }

    const uniqueBrand = brandArray.filter((brand, index) => {
        return brandArray.indexOf(brand) === index;
    })
    uniqueBrand.sort()

    ///////////////////////////////  remove array element
    function removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }


    ///////////////////////////// price//////////////////////////

    function getPrice(e) {
        setOption("price")
        if (e.target.checked)
            boxValue.push(e.target.value)
        else {
            removeA(boxValue, e.target.value);
        }
        boxValue.sort()

        if (boxValue.length === 1) {
            switch (boxValue[0]) {

                case "1":
                    setMinValue(100)
                    setMaxValue(500)
                    break
                case "2":
                    setMinValue(500)
                    setMaxValue(2000)
                    break
                case "3":
                    setMinValue(2000)
                    setMaxValue(5000)
                    break
                case "4":
                    setMinValue(5000)
                    setMaxValue(2000)
                    break
                case "5":
                    setMinValue(20000)
                    setMaxValue(60000)
                    break
                default:
                    setMinValue(0)
                    setMaxValue(0)
            }
        }

        if (boxValue.length > 1) {
            switch (boxValue[0] + boxValue[boxValue.length - 1]) {

                case "12":
                    setMinValue(100)
                    setMaxValue(2000)
                    break
                case "13":
                    setMinValue(100)
                    setMaxValue(5000)
                    break
                case "14":
                    setMinValue(100)
                    setMaxValue(20000)
                    break
                case "15":
                    setMinValue(100)
                    setMaxValue(50000)
                    break
                case "23":
                    setMinValue(500)
                    setMaxValue(5000)
                    break
                case "24":
                    setMinValue(500)
                    setMaxValue(20000)
                    break
                case "25":
                    setMinValue(500)
                    setMaxValue(60000)
                    break
                case "34":
                    setMinValue(2000)
                    setMaxValue(20000)
                    break
                case "35":
                    setMinValue(5000)
                    setMaxValue(60000)
                    break
                case "45":
                    setMinValue(20000)
                    setMaxValue(60000)
                    break
                default:
                    setMinValue(0)
                    setMaxValue(0)
            }
        }
    }

    function searchByPrice() {

        if (minValue !== 0 && maxValue !== 0) {
            history.push(`/searchByPrice/${optionValue}/${minValue}/${maxValue}`);
        }
    }


    //////////////////// rating /////////////

    function getRating(e) {
        setOption("rating")
        if (e.target.checked)
            boxValue.push(e.target.value)
        else {
            removeA(boxValue, e.target.value);
        }
        boxValue.sort()

        switch (boxValue[0]) {

            case "1":
                setRating(1)
                break
            case "2":
                setRating(2)
                break
            case "3":
                setRating(3)
                break
            case "4":
                setRating(4)
                break
            case "5":
                setRating(5)
                break
            default:
                setRating(0)
        }

    }

    function searchByRating() {

        if (rating !== 0) {
            history.push(`/search/${optionValue}/${rating}`);
        }
    }

    //////////////////// category /////////////

    function getCategory(e) {
        setOption("category")
        if (e.target.checked)
            boxValue.push(e.target.value)
        else {
            removeA(boxValue, e.target.value);
        }
        setCategory(boxValue)

    }

    function searchByCategory() {
        if (category !== "") {
            history.push({
                pathname: `/filter/${optionValue}`,
                state: {
                    response: category
                }
            })
        }
    }


    //////////////////// brand /////////////

    function getBrand(e) {
        setOption("brand")
        if (e.target.checked)
            boxValue.push(e.target.value)
        else {
            removeA(boxValue, e.target.value);
        }
        setBrand(boxValue)
    }

    function searchByBrand() {
        if (brand !== "") {
            history.push({
                pathname: `/filter/${optionValue}`,
                state: {
                    response: brand
                }
            })
        }
    }


    /////////////////////// sorting /////////


    function getSort(e) {

        if (e.target.checked)
            boxValue.push(e.target.value)
        else {
            removeA(boxValue, e.target.value);
        }
        switch (boxValue[0]) {

            case "Ascending Price":
                setSortOption("sortPricea")
                break
            case "Descending Price":
                setSortOption("sortPriced")
                break
            case "Ascending Name":
                setSortOption("sortNamea")
                break
            case "Descending Name":
                setSortOption("sortNamed")
                break
            case "Ascending Rating":
                setSortOption("sortRatinga")
                break
            case "Descending Rating":
                setSortOption("sortRatingd")
                break
            default:
                setSortOption("")
        }
    }

    function sortBy() {
        if (sortValue !== "") {
            history.push(`/sort/${sortValue}/`);
        }
    }


    ////////////////// price range //////////


    const marks = [

        {
            value: 0,
            label: "0"
        },
        {
            value: 500,
            label: "500"
        },
        {
            value: 1000,
            label: "1000"
        },
        {
            value: 1500,
            label: "1500"
        },
        {
            value: 2000,
            label: "2000"
        },
        {
            value: 2500,
            label: "2500"
        },
        {
            value: 3000,
            label: "3000"
        }
    ]


    const updateValue = (e, val) => {
        setOption("price")
        setVal(val)
        setMinValue(val[0])
        setMaxValue(val[1])
    }
    const [val, setVal] = useState([0, 3000]);

    //////////////////////////// search by price range /////////////

    function searchByPriceRange() {

        if (minValue !== 0 && maxValue !== 0) {
            history.push(`/searchByPrice/${optionValue}/${minValue}/${maxValue}`);
        }
    }

    return (
        <div style={{ paddingRight: "1.1rem", marginTop: "1rem", borderBottom: "0.1rem #c0c0c0 solid", borderRight: "0.1rem #c0c0c0 solid", backgroundColor: "#f8f8f8", borderRadius: "0.5rem" }}>
            <h1>FILTERS</h1>
            <hr />
            <h2>PRICE</h2>
            <div>
                <MuiThemeProvider>
                    <Slider
                        defaultValue={500}
                        step={7}
                        aria-labelledby="discrete-slider-custom"
                        max={3000}
                        color="primary"
                        marks={marks}
                        valueLabelDisplay="bottom"
                        onChange={updateValue}
                        value={val}
                    />
                </MuiThemeProvider>
            </div>
            <button style={{ marginLeft: "-.3rem" }} onClick={searchByPriceRange} className="primary">search by range</button>

            <br />
            <br />

            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="end"
                    control={<Checkbox value="1" onChange={(e) => getPrice(e)} color="primary" />}
                    label={<span style={{ fontSize: '1.5rem' }}>100-500</span>}
                    labelPlacement="100-500"
                /><FormControlLabel
                    value="end"
                    control={<Checkbox value="2" onChange={(e) => getPrice(e)} color="primary" />}
                    label={<span style={{ fontSize: '1.5rem' }}>500-2000</span>}
                    labelPlacement="500-2000"
                /><FormControlLabel
                    value="end"
                    control={<Checkbox value="3" onChange={(e) => getPrice(e)} color="primary" />}
                    label={<span style={{ fontSize: '1.5rem' }}>2000-5000</span>}
                    labelPlacement="2000-5000"
                /><FormControlLabel
                    value="end"
                    control={<Checkbox value="4" onChange={(e) => getPrice(e)} color="primary" />}
                    label={<span style={{ fontSize: '1.5rem' }}>5000-20000</span>}
                    labelPlacement="5000-20000"
                /><FormControlLabel
                    value="end"
                    control={<Checkbox value="5" onChange={(e) => getPrice(e)} color="primary" />}
                    label={<span style={{ fontSize: '1.5rem' }}>20000-60000</span>}
                    labelPlacement="20000-50000"
                />
            </FormGroup>
            <br />
            <button style={{ marginLeft: "-.3rem" }} onClick={searchByPrice} className="primary">search</button>
            <hr />

            <h2>CATEGORIES</h2>
            <FormGroup aria-label="position" row>
                {uniqueCategory.map((category) => {
                    return (
                        <FormControlLabel
                            value="end"
                            control={<Checkbox value={category} onChange={(e) => getCategory(e)} color="primary" />}
                            label={<span style={{ fontSize: '1.5rem' }}>{category}</span>}
                            labelPlacement={category}
                        />
                    )
                })}
            </FormGroup>
            <br />
            <button style={{ marginLeft: "-.3rem" }} onClick={searchByCategory} className="primary">search</button>
            <hr />

            <h2>BRAND</h2>
            <FormGroup aria-label="position" row>
                {uniqueBrand.map((brand) => {
                    return (
                        <FormControlLabel
                            value="end"
                            control={<Checkbox value={brand} onChange={(e) => getBrand(e)} color="primary" />}
                            label={<span style={{ fontSize: '1.5rem' }}>{brand}</span>}
                            labelPlacement={brand}
                        />
                    )
                })}
            </FormGroup>
            <br />
            <button style={{ marginLeft: "-.3rem" }} onClick={searchByBrand} className="primary">search</button>
            <hr />

            <h2>SORT</h2>
            <FormGroup aria-label="position" row>
                {sortPro.map((post) => {
                    return (
                        <FormControlLabel
                            value="end"
                            control={<Checkbox value={post} onChange={(e) => getSort(e)} color="primary" />}
                            label={<span style={{ fontSize: '1.5rem' }}>{post}</span>}
                            labelPlacement={post}
                        />
                    )
                })}
            </FormGroup>
            <br />
            <button style={{ marginLeft: "-.3rem" }} onClick={sortBy} className="primary">sort</button>
            <hr />

            <h2>RATING</h2>
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    width="3rem"
                    height="3rem"
                    value="end"
                    control={<Checkbox width="3rem"
                        height="3rem" color="primary" value="1" onChange={(e) => getRating(e)} />}
                    label={<span style={{ fontSize: '1.5rem' }}>Above 1 <span><i className={'fa fa-star'} ></i> </span></span>}
                    labelPlacement="1"
                /><FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" value="2" onChange={(e) => getRating(e)} />}
                    label={<span style={{ fontSize: '1.5rem' }}>Above 2  <span><i className={'fa fa-star'} ></i> </span></span>}
                    labelPlacement="2"
                /><FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" value="3" onChange={(e) => getRating(e)} />}
                    label={<span style={{ fontSize: '1.5rem' }}>Above 3  <span><i className={'fa fa-star'} ></i> </span></span>}
                    labelPlacement="3"
                /><FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" value="4" onChange={(e) => getRating(e)} />}
                    label={<span style={{ fontSize: '1.5rem' }}>Above 4  <span><i className={'fa fa-star'} ></i> </span></span>}
                    labelPlacement="4"
                />
                <FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" value="5" onChange={(e) => getRating(e)} />}
                    label={<span style={{ fontSize: '1.5rem' }}>Rating 5 <span><i className={'fa fa-star'} ></i> </span> </span>}
                    labelPlacement="5"
                />
            </FormGroup>
            <br />
            <button style={{ marginLeft: "-.3rem" }} onClick={searchByRating} className="primary">search</button>
            <br />
            <br />
        </div>
    )
}
