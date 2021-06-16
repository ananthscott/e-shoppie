import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCESS,
	PRODUCT_LIST_ERROR,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCESS,
	PRODUCT_DETAILS_ERROR,
} from "../constants/productsConstats";
import axios from "axios";
//api call using thunk
export const listProduct = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get("/api/products");

		dispatch({ type: PRODUCT_LIST_SUCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const productDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/products/${id}`);

		dispatch({ type: PRODUCT_DETAILS_SUCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
