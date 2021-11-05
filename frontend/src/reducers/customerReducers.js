import {
  CUSTOMER_REGISTER_FAIL,
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_SIGNIN_FAIL,
  CUSTOMER_SIGNIN_REQUEST,
  CUSTOMER_SIGNIN_SUCCESS,

  ADMIN_SIGNIN_SUCCESS,
  CUSTOMER_SIGNOUT,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_UPDATE_PROFILE_FAIL,
  CUSTOMER_UPDATE_PROFILE_REQUEST,
  CUSTOMER_UPDATE_PROFILE_SUCCESS,
  CUSTOMER_UPDATE_PROFILE_RESET,

  PRODUCTS_SEARCH_BY_NAME,
  PRODUCTS_SEARCH_BY_CATEGORY,
  PRODUCTS_SEARCH_BY_BRAND,
  PRODUCTS_SEARCH_BY_RATING,


  CUSTOMER_PRODUCTS_SORT_BY_NAMED,
  CUSTOMER_PRODUCTS_SORT_BY_NAMEA,
  CUSTOMER_PRODUCTS_SORT_BY_PRICED,
  CUSTOMER_PRODUCTS_SORT_BY_PRICEA,
  CUSTOMER_PRODUCTS_SORT_BY_RATINGD,
  CUSTOMER_PRODUCTS_SORT_BY_RATINGA,
} from '../constants/customerConstants';

export const customerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_REGISTER_REQUEST:
      return { loading: true };
    case CUSTOMER_REGISTER_SUCCESS:
      return { loading: false, customerInfo: action.payload };
    case CUSTOMER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_SIGNIN_REQUEST:
      return { loading: true };
    case CUSTOMER_SIGNIN_SUCCESS:
      return { loading: false, customerInfo: action.payload };
    case ADMIN_SIGNIN_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case CUSTOMER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_SIGNOUT:
      return {};
    default:
      return state;
  }
};


export const customerDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CUSTOMER_DETAILS_REQUEST:
      return { loading: true };
    case CUSTOMER_DETAILS_SUCCESS:
      return { loading: false, customer: action.payload };
    case CUSTOMER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerSearchedProducts = (state = { customerSearched: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_SEARCH_BY_NAME:
      return { customerSearched: action.payload };
    case PRODUCTS_SEARCH_BY_BRAND:
      return { customerSearched: action.payload };
    case PRODUCTS_SEARCH_BY_CATEGORY:
      return { customerSearched: action.payload };
    case PRODUCTS_SEARCH_BY_RATING:
      return { customerSearched: action.payload };
    default:
      return state;
  }
};


export const customerUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case CUSTOMER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case CUSTOMER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};


// customer sorting part

export const SortedCustomerProductsReducer = (state = { sortedCustomerProducts: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_PRODUCTS_SORT_BY_NAMED:
      return { sortedCustomerProducts: action.payload };
    case CUSTOMER_PRODUCTS_SORT_BY_PRICED:
      return { sortedCustomerProducts: action.payload };
    case CUSTOMER_PRODUCTS_SORT_BY_RATINGD:
      return { sortedCustomerProducts: action.payload };
    case CUSTOMER_PRODUCTS_SORT_BY_NAMEA:
      return { sortedCustomerProducts: action.payload };
    case CUSTOMER_PRODUCTS_SORT_BY_PRICEA:
      return { sortedCustomerProducts: action.payload };
    case CUSTOMER_PRODUCTS_SORT_BY_RATINGA:
      return { sortedCustomerProducts: action.payload };
    default:
      return state;
  }
};