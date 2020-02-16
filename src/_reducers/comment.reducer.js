import { commentConstants } from '../_constants';

export const COMMENTS_DEFAULT_STATE = {
    loading: false,
    saving: false,
    error: '',
    items: []
}

export function comments(state = COMMENTS_DEFAULT_STATE, action) {
    switch (action.type) {
       
        case commentConstants.GETALL_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case commentConstants.GETALL_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        }
        case commentConstants.CREATE_REQUEST: {
            return {
                ...state,
                saving: true
            }
        }
        case commentConstants.CREATE_SUCCESS: {
            return {
                ...state,
                items: state.items.concat(action.payload),
                saving: false
            }
        }
        default:
            return state;
    }
}
