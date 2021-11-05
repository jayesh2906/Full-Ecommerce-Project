import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { wishlistReducer } from './reducers/wishlistReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderPayReducer,
} from './reducers/orderReducers';
import {
  productDetailsReducer,
  productListReducer,
  customerProductListReducer,
  productDeleteReducer,
  productUpdateReducer,
  productUpdateChosenReducer,
  productAddReducer,
  customerProductRequestAddReducer,
  requestedProductListReducer,
  productSearchReducer,
  searchProductsReducer,
  searchDoneReducer,
  SortedProductsReducer
} from './reducers/productReducers';
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';
import {
  customerDetailsReducer,
  customerUpdateProfileReducer,
  customerRegisterReducer,
  customerSigninReducer,
  customerSearchedProducts,
  SortedCustomerProductsReducer
} from './reducers/customerReducers';


export const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    adminInfo: localStorage.getItem('adminInfo')
      ? JSON.parse(localStorage.getItem('adminInfo'))
      : null,
  },
  customerSignin: {
    customerInfo: localStorage.getItem('customerInfo')
      ? JSON.parse(localStorage.getItem('customerInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
  wishlist: {
    wishlistItems: localStorage.getItem('wishlistItems')
      ? JSON.parse(localStorage.getItem('wishlistItems'))
      : [],
  },
  customerProductList: {
    customerProducts: localStorage.getItem('customerProduct')
      ? JSON.parse(localStorage.getItem('customerProduct'))
      : [],
  },
  productList: {
    products: localStorage.getItem('adminProduct')
      ? JSON.parse(localStorage.getItem('adminProduct'))
      : [],
  },
  searchdone: {
    searchStatus: localStorage.getItem('search')
  },
  customerSearchedList: {
    customerSearched: localStorage.getItem('customerSearched')
      ? JSON.parse(localStorage.getItem('customerSearched'))
      : [],
  },
  sortedProductList: {
    sortedProducts: localStorage.getItem('userSorted')
      ? JSON.parse(localStorage.getItem('userSorted'))
      : [],
  },
  sortedCustomerPoductList: {
    sortedCustomerProducts: localStorage.getItem('customerSorted')
      ? JSON.parse(localStorage.getItem('customerSorted'))
      : [],
  },
  requestedProductList: {
    requestedProducts: localStorage.getItem('requestedProducts')
      ? JSON.parse(localStorage.getItem('requestedProducts'))
      : [],
  }

};
const reducer = combineReducers({
  productUpdateChosen: productUpdateChosenReducer,
  productDelete: productDeleteReducer,
  productSearch: productSearchReducer,
  productUpdate: productUpdateReducer,
  productAdd: productAddReducer,
  productList: productListReducer,
  customerSearchedList: customerSearchedProducts,

  requestedProductList: requestedProductListReducer,
  customerProductList: customerProductListReducer,
  ProductaddRequest: customerProductRequestAddReducer,
  productDetails: productDetailsReducer,
  searchedProducts: searchProductsReducer,
  searchdone: searchDoneReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  customerSignin: customerSigninReducer,
  customerRegister: customerRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  customerDetails: customerDetailsReducer,
  customerUpdateProfile: customerUpdateProfileReducer,
  sortedProductList: SortedProductsReducer,
  sortedCustomerPoductList: SortedCustomerProductsReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;