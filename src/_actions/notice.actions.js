import { userConstants } from '../_constants';
import { userService, noticeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { noticeConstants } from '../_constants/notice.constants';

export const noticeActions = {
    addNotice,
    getAll,
    getNoticeDetail,
    // updated,
    delete: _delete
};

/**
 * get all notices
 */
function getAll() {
    return dispatch => {
        dispatch(request());

        noticeService.getAll()
            .then(
                notices => dispatch(success(notices)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: noticeConstants.GETALL_REQUEST } }
    function success(notices) { return { type: noticeConstants.GETALL_SUCCESS, notices } }
    function failure(error) { return { type: noticeConstants.GETALL_FAILURE, error } }
}

function addNotice(notice) {
    return dispatch => {
        dispatch(request());

        noticeService.create(notice)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: noticeConstants.CREATE_REQUEST } }
    function success(payload) { return { type: noticeConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: noticeConstants.CREATE_FAILURE, error } }
}

/**
 * get Notice Detail by id
 * @param {*} id 
 */
function getNoticeDetail(id) {
    return dispatch => {
        dispatch(request());

        noticeService.getById(id)
            .then(
                notice => dispatch(success(notice)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: noticeConstants.GET_NOTICE_DETAIL_REQUEST } }
    function success(notice) { return { type: noticeConstants.GET_NOTICE_DETAIL_SUCCESS, notice } }
    function failure(error) { return { type: noticeConstants.GET_NOTICE_DETAIL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}