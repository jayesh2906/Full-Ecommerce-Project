const {
  CUSTOMER_PRODUCT_LIST_REQUEST,
  CUSTOMER_PRODUCT_LIST_SUCCESS,
  CUSTOMER_PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_UPDATE_CHOSEN_SUCCESS,
  PRODUCT_UPDATE_CHOSEN_REQUEST,
  PRODUCT_UPDATE_CHOSEN_FAIL,
  REQUEST_PRODUCT_ADD_REQUEST,
  REQUEST_PRODUCT_ADD_SUCCESS,
  REQUEST_PRODUCT_ADD_FAIL,

  REQUESTED_PRODUCT_LIST_FAIL,
  REQUESTED_PRODUCT_LIST_REQUEST,
  REQUESTED_PRODUCT_LIST_SUCCESS,

  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  SEARCH_STATUS,

  PRODUCT_SEARCH_BY_OPTION_REQUEST,
  PRODUCT_SEARCH_BY_OPTION_SUCCESS,
  PRODUCT_SEARCH_BY_OPTION_FAIL,



  PRODUCTS_SORT_BY_NAMED,
  PRODUCTS_SORT_BY_NAMEA,
  PRODUCTS_SORT_BY_PRICED,
  PRODUCTS_SORT_BY_PRICEA,
  PRODUCTS_SORT_BY_RATINGD,
  PRODUCTS_SORT_BY_RATINGA,
} = require('../constants/productConstants');

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productAddReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
      return { loading: true };
    case PRODUCT_ADD_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const productUpdateReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const productDeleteReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const productUpdateChosenReducer = (
  state = { loading: true, productIdChosen: null },
  action
) => {
  switch (action.type) {

    case PRODUCT_UPDATE_CHOSEN_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_CHOSEN_SUCCESS:
      return { loading: false, productIdChosen: action.payload };
    case PRODUCT_UPDATE_CHOSEN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const productSearchReducer = (
  state = { loading: true, myProduct: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true };
    case PRODUCT_SEARCH_SUCCESS:
      return { loading: false, myProduct: action.payload };
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//customer part

export const customerProductListReducer = (
  state = { loading: true, customerProducts: [] },
  action
) => {
  switch (action.type) {
    case CUSTOMER_PRODUCT_LIST_REQUEST:
      return { loading: true };
    case CUSTOMER_PRODUCT_LIST_SUCCESS:
      return { loading: false, customerProducts: action.payload };
    case CUSTOMER_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerProductRequestAddReducer = (
  state = { loading: true, requestproduct: {} },
  action
) => {
  switch (action.type) {
    case REQUEST_PRODUCT_ADD_REQUEST:
      return { loading: true };
    case REQUEST_PRODUCT_ADD_SUCCESS:
      return { loading: false, requestproduct: action.payload };
    case REQUEST_PRODUCT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//admin part

export const requestedProductListReducer = (
  state = { loading: true, requestedProducts: [] },
  action
) => {
  switch (action.type) {
    case REQUESTED_PRODUCT_LIST_REQUEST:
      return { loading: true };
    case REQUESTED_PRODUCT_LIST_SUCCESS:
      return { loading: false, requestedProducts: action.payload };
    case REQUESTED_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const searchProductsReducer = (
  state = { loading: true, allSearchProducts: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_SEARCH_BY_OPTION_REQUEST:
      return { loading: true };
    case PRODUCT_SEARCH_BY_OPTION_SUCCESS:
      return { loading: false, allSearchProducts: action.payload };
    case PRODUCT_SEARCH_BY_OPTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export const searchDoneReducer = (
  state = { loading: true, searchStatus: null },
  action
) => {
  switch (action.type) {

    case SEARCH_STATUS:
      return { loading: false, searchStatus: action.payload };
    default:
      return state;
  }
}


//sorting part

export const SortedProductsReducer = (state = { sortedProducts: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_SORT_BY_NAMED:
      return { sortedProducts: action.payload };
    case PRODUCTS_SORT_BY_PRICED:
      return { sortedProducts: action.payload };
    case PRODUCTS_SORT_BY_RATINGD:
      return { sortedProducts: action.payload };
    case PRODUCTS_SORT_BY_NAMEA:
      return { sortedProducts: action.payload };
    case PRODUCTS_SORT_BY_PRICEA:
      return { sortedProducts: action.payload };
    case PRODUCTS_SORT_BY_RATINGA:
      return { sortedProducts: action.payload };
    default:
      return state;
  }
};