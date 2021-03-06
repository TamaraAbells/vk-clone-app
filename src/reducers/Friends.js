import {
	FETCH_FRIENDS,
	REQUESTED_FRIENDS_FAILED,
	REQUESTED_FRIENDS_SUCCEEDED,
	SEARCH_FRIENDS,
	FILTER_FRIENDS_MALE,
	FILTER_FRIENDS_FEMALE,
	FILTER_FRIENDS_ANY,
	FILTER_FRIENDS_AGE_FROM,
	FILTER_FRIENDS_AGE_TO,
	FILTER_FRIENDS_AGE_NUMBERS
} from './../constants/ActionTypes';

const initialState = {
	searchFriends: '',
};

export default function Friends(state = initialState, action) {
	if (action.type === FILTER_FRIENDS_AGE_FROM) {
		return {
			...state,
			filterFriends: action.data
		}
	}
	if (action.type === FILTER_FRIENDS_AGE_TO) {
		return {
			...state,
			filterFriends: action.data
		}
	}
	if (action.type === FILTER_FRIENDS_AGE_NUMBERS) {
		return {
			...state,
			filterAgesNumbers: action.data,
		}
	}
	if (action.type === FILTER_FRIENDS_MALE) {
		return {
			...state,
			filterFriends: action.data,
		};
	}
	if (action.type === FILTER_FRIENDS_ANY) {
		return {
			...state,
			filterFriends: action.data,
		};
	}
	if (action.type === FILTER_FRIENDS_FEMALE) {
		return {
			...state,
			filterFriends: action.data,
		};
	}
	if (action.type === SEARCH_FRIENDS) {
		return {
			...state,
			searchFriends: action.data,
		};
	}
	if (action.type === FETCH_FRIENDS) {
		return {
			...state,
			data: '',
			loading: true,
			error: false,
		};
	}
	if (action.type === REQUESTED_FRIENDS_SUCCEEDED) {
		return {
			...state,
			data: action.data,
			loading: false,
			error: false,
		};
	}
	if (action.type === REQUESTED_FRIENDS_FAILED) {
		return {
			...state,
			data: '',
			loading: false,
			error: true,
		};
	}
	return state;
}
