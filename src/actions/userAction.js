import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_ERROR,
	USER_LOGIN_SUCESS,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCESS,
	USER_REGISTER_ERROR,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCESS,
	USER_DETAILS_ERROR,
	USER_DETAILS_RESET,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCESS,
	USER_UPDATE_PROFILE_ERROR,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
export const userLoginAction = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const config = { headers: { "Content-Type": "application/json" } };

		const { data } = await axios.post(
			"/api/users/login",
			{ email, password },
			config
		);

		dispatch({ type: USER_LOGIN_SUCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//LOGOUT action
export const userLogout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: ORDER_LIST_MY_RESET });
};
//REGISTER ACTION
export const userRegisterAction =
	(name, email, password) => async (dispatch) => {
		try {
			dispatch({ type: USER_REGISTER_REQUEST });

			const config = { headers: { "Content-Type": "application/json" } };

			const { data } = await axios.post(
				"/api/users",
				{ name, email, password },
				config
			);
			dispatch({ type: USER_REGISTER_SUCESS, payload: data });
			dispatch({ type: USER_LOGIN_SUCESS, payload: data });
			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: USER_REGISTER_ERROR,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

//User Profile Details

//REGISTER ACTION
export const getUserDetailsAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(
			`/api/users/${id}`,

			config
		);
		dispatch({ type: USER_DETAILS_SUCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_DETAILS_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//UPDATE PROFILE
export const updateProfileAction = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`/api/users/profile`, user, config);
		dispatch({ type: USER_UPDATE_PROFILE_SUCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
