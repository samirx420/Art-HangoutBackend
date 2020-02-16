import { noticeConstants } from '../_constants';


export function notices(state = {}, action) {
    switch (action.type) {
        case noticeConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case noticeConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.notices,
                loading: false
            }
        case noticeConstants.GETALL_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case noticeConstants.GET_NOTICE_DETAIL_REQUEST:
            return {
                ...state,
                getByIdLoading: true
            };
        case noticeConstants.GET_NOTICE_DETAIL_SUCCESS:
            return Object.assign({}, state, notice, { notice: action.notice })

        case noticeConstants.GET_NOTICE_DETAIL_FAILURE:
            return {
                error: action.error
            };
        case noticeConstants.CREATE_REQUEST:
            return {
                ...state,
                saving: true
            };
        case noticeConstants.CREATE_SUCCESS:
            console.log(state)
            return {
                ...state,
                items: state.items.concat(action.payload),
                saving: false
            }

        case noticeConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
}