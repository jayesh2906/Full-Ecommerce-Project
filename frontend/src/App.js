import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import { signoutCustomer } from './actions/customerActions';
import PrivateUserRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import FilterScreen from './screens/FilterScreen';
import SortScreen from './screens/SortScreen';
import UserSummary from './screens/UserSummary';
import OrderSummary from './screens/OrderSummary';
import SearchPriceScreen from './screens/SearchPriceScreen';
import PrivateCustomerRoute from './components/PrivateCustomerRoute';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import CartScreen from './screens/CartScreen';
import WishListScreen from './screens/WishListScreen';
import AdminDashboard from './screens/AdminDashboard';
import AdminProductScreen from './screens/AdminProductScreen';
import CustomerAddRequest from './screens/CustomerAddRequest';
import CustomerRequestStatus from './screens/CustomerRequestStatus';
import RequestAdmin from './screens/RequestAdmin';
import CustomerUpdateProduct from './components/CustomerUpdateProduct';
import AdminUpdateProduct from './components/AdminUpdateProduct';
import AdminAddProductScreen from './screens/AdminAddProductScreen';
import AdminProductList from './screens/AdminProductList';
import CustomerProductList from './screens/CustomerProductList';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import CustomerProfile from './screens/CustomerProfile';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, adminInfo } = userSignin;

  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;

  const searchdone = useSelector((state) => state.searchdone);
  const { searchStatus } = searchdone;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
    dispatch(signoutCustomer());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          {(userInfo) ? (
            <>
              <div>
                <Link className="brand" to="/">
                  Icons Store
                </Link>
              </div>
              <div>
                {(searchStatus === "done") ?
                  null :
                  <Route
                    render={({ history }) => (
                      <SearchBox history={history}></SearchBox>
                    )}
                  ></Route>
                }
              </div>
            </>) :
            (adminInfo) ?
              <>
                <div>
                  <Link className="brand" to="/adminproductlist">
                    Icons Store
                  </Link>
                </div>
                <div>
                  {(searchStatus === "done") ?
                    null :
                    <Route
                      render={({ history }) => (
                        <SearchBox history={history}></SearchBox>
                      )}
                    ></Route>
                  }
                </div>
              </>
              : (customerInfo) ?
                <>
                  <div>
                    <Link className="brand" to="/customerproductlist">
                      Icons Store
                    </Link>
                  </div>
                  <div>
                    {(searchStatus === "done") ?
                      null :
                      <Route
                        render={({ history }) => (
                          <SearchBox history={history}></SearchBox>
                        )}
                      ></Route>
                    }
                  </div>
                </> :
                <>
                  <div>
                    <Link className="brand" to="/">
                      Icons Store
                    </Link>
                  </div>
                  <div>
                    {(searchStatus === "done") ?
                      null :
                      <Route
                        render={({ history }) => (
                          <SearchBox history={history}></SearchBox>
                        )}
                      ></Route>
                    }
                  </div>
                </>
          }
          <div>

            {(userInfo) || (adminInfo) || (customerInfo) ? (
              ((userInfo) ? (
                <>
                  <Link className="cartHover" to="/wishlist">
                    <span><i className="fa fa-heart" style={{ fontSize: "1.9rem" }} /> Wishlist</span>
                    {wishlistItems.length > 0 && (
                      <span className="badge">{wishlistItems.length}</span>
                    )}
                  </Link>
                  <Link className="cartHover" to="/cart">
                    <span><i className="fa fa-shopping-cart" style={{ fontSize: "2rem" }} /> Cart</span>
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </Link>
                  <div className="dropdown">
                    <Link className="cartHover" to="#">
                      {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/profile">User Profile</Link>
                      </li>
                      <li>
                        <Link to="/orderhistory">Order History</Link>
                      </li>
                      <li>
                        <Link to="#signout" onClick={signoutHandler}>
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>)
                : (adminInfo) ?
                  (
                    <div className="dropdown">
                      <Link className="cartHover" to="#admin">
                        Admin :  {adminInfo.name}<i className="fa fa-caret-down"></i>
                      </Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/admindashboard">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/adminproductlist">ProductList</Link>
                        </li>
                        <li>
                          <Link to="/adminaddproduct">Add Product</Link>
                        </li>
                        <li>
                          <Link to="#signout" onClick={signoutHandler}>
                            Sign Out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="dropdown">
                      <Link className="cartHover" to="#customer">
                        Seller :  {customerInfo.name}<i className="fa fa-caret-down"></i>
                      </Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/customerprofile">Seller Profile</Link>
                        </li>
                        <li>
                          <Link to="/customerproductlist">ProductList</Link>
                        </li>
                        <li>
                          <Link to="/customeraddrequestproduct">Add Request</Link>
                        </li>
                        <li>
                          <Link to="/customerrequeststatus">Request Status</Link>
                        </li>
                        <li>
                          <Link to="#signout" onClick={signoutHandler}>
                            Sign Out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )

              ))
              : (
                <>
                  <Link className="cartHover" to="/wishlist">
                    <span><i className="fa fa-heart" style={{ fontSize: "1.9rem" }} /> Wishlist</span>
                    {wishlistItems.length > 0 && (
                      <span className="badge">{wishlistItems.length}</span>
                    )}
                  </Link>
                  <Link className="cartHover" to="/cart">
                    <span><i className="fa fa-shopping-cart" style={{ fontSize: "2rem" }} /> Cart</span>
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </Link>

                  <Link className="cartHover" to="/signin">Sign In</Link>
                </>
              )
            }
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/wishlist" component={WishListScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <PrivateUserRoute path="/shipping" component={ShippingAddressScreen}></PrivateUserRoute>
          <PrivateUserRoute path="/payment" component={PaymentMethodScreen}></PrivateUserRoute>
          <PrivateUserRoute path="/placeorder" component={PlaceOrderScreen}></PrivateUserRoute>
          <PrivateUserRoute path="/order/:id" component={OrderScreen}></PrivateUserRoute>
          <PrivateUserRoute path="/orderhistory" component={OrderHistoryScreen}></PrivateUserRoute>
          <Route path="/search/:option/:search" component={SearchScreen}></Route>
          <Route path="/filter/:option/" component={FilterScreen}></Route>
          <Route path="/searchByPrice/:option/:min/:max" component={SearchPriceScreen}></Route>
          <Route path="/sort/:sortValue" component={SortScreen}></Route>

          <PrivateUserRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateUserRoute>

          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>

          {(adminInfo) ?
            <PrivateAdminRoute path="/adminproductlist" component={AdminProductList} exact></PrivateAdminRoute>
            : (customerInfo) ?
              <PrivateCustomerRoute path="/customerproductlist" component={CustomerProductList} exact></PrivateCustomerRoute>
              :
              <Route path="/" component={HomeScreen} exact></Route>
          }

          <PrivateAdminRoute path="/requestadmin" component={RequestAdmin} exact></PrivateAdminRoute>
          <PrivateAdminRoute path="/admindashboard" component={AdminDashboard} exact></PrivateAdminRoute>
          <PrivateAdminRoute path="/adminupdateproduct/:id" component={AdminUpdateProduct} ></PrivateAdminRoute>
          <PrivateAdminRoute path="/adminaddproduct" component={AdminAddProductScreen} ></PrivateAdminRoute>
          <PrivateAdminRoute path="/summary/:option" component={UserSummary} ></PrivateAdminRoute>
          <PrivateAdminRoute path="/ordersummary" component={OrderSummary} ></PrivateAdminRoute>
          <Route path="/adminproduct/:id" component={AdminProductScreen}></Route>

          <PrivateCustomerRoute
            path="/customerprofile"
            component={CustomerProfile}
          ></PrivateCustomerRoute>

          <PrivateCustomerRoute path="/cutomerupdateproduct/:id" component={CustomerUpdateProduct}></PrivateCustomerRoute>
          <PrivateCustomerRoute path="/customeraddrequestproduct" component={CustomerAddRequest}></PrivateCustomerRoute>
          <PrivateCustomerRoute path="/customerrequeststatus" component={CustomerRequestStatus}></PrivateCustomerRoute>
          <PrivateCustomerRoute path="/customerproduct/:id" component={AdminProductScreen}></PrivateCustomerRoute>


        </main>
        <footer className="row center">All right reserved ©</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;