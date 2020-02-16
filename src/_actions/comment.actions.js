import { commentService } from '../_services';
import { commentConstants } from '../_constants';

export const commentActions = {
    addComment,
    getComments,
    // getNoticeDetail,
    // updated,
    // delete: _delete
};

/**
 * get all notices
 */
function getComments(noticeId) {
    return dispatch => {
        dispatch(request());

        commentService.getComments(noticeId)
            .then(
                comments => dispatch(success(comments)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: commentConstants.GETALL_REQUEST } }
    function success(payload) { return { type: commentConstants.GETALL_SUCCESS, payload } }
    function failure(error) { return { type: commentConstants.GETALL_FAILURE, error } }
}

function addComment(comment) {
    return dispatch => {
        dispatch(request());
        commentService.addComment(comment)
            .then(
                comment => { 
                    console.log('comment', comment)
                    return dispatch(success(comment))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: commentConstants.CREATE_REQUEST } }
    function success(payload) { return { type: commentConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: commentConstants.CREATE_FAILURE, error } }
}

// /**
//  * get Notice Detail by id
//  * @param {*} id 
//  */
// function getNoticeDetail(id) {
//     return dispatch => {
//         dispatch(request());

//         noticeService.getById(id)
//             .then(
//                 notice => dispatch(success(notice)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };

//     function request() { return { type: noticeConstants.GET_NOTICE_DETAIL_REQUEST } }
//     function success(notice) { return { type: noticeConstants.GET_NOTICE_DETAIL_SUCCESS, notice } }
//     function failure(error) { return { type: noticeConstants.GET_NOTICE_DETAIL_FAILURE, error } }
// }

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         userService.delete(id)
//             .then(
//                 user => dispatch(success(id)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };

//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }