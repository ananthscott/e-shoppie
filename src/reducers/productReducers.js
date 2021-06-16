import {
	PRODUCT_DETAILS_SUCESS,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCESS,
	PRODUCT_LIST_ERROR,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_ERROR,
} from "../constants/productsConstats";

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true };
		case PRODUCT_LIST_SUCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_LIST_ERROR:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productDetailsReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, ...state };
		case PRODUCT_DETAILS_SUCESS:
			return { loading: false, product: action.payload };
		case PRODUCT_DETAILS_ERROR:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
