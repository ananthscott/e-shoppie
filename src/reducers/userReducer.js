import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_ERROR,
	USER_LOGIN_SUCESS,
	USER_LOGOUT,
	USER_REGISTER_SUCESS,
	USER_REGISTER_REQUEST,
	USER_REGISTER_ERROR,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCESS,
	USER_DETAILS_ERROR,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCESS,
	USER_UPDATE_PROFILE_ERROR,
	USER_DETAILS_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_ERROR:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_ERROR:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case USER_DETAILS_SUCESS:
			return { loading: false, user: action.payload };
		case USER_DETAILS_ERROR:
			return { loading: false, error: action.payload };
		case USER_DETAILS_RESET:
			return { user: {} };
		default:
			return state;
	}
};

export const updateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return { loading: true };
		case USER_UPDATE_PROFILE_SUCESS:
			return { loading: false, success: true, user: action.payload };
		case USER_UPDATE_PROFILE_ERROR:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
