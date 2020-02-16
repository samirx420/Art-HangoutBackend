import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from 'react-modal';

//IMPORT ACTIONS
import { userActions } from '../_actions';
import { noticeActions } from '../_actions';
import { commentActions } from '../_actions';


Modal.setAppElement('#app')
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


class HomePage extends React.Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            notice: '',
            comment: '',
            selectedNotice: {},
            title: '',
            description: '',
            commentModalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.addNotice = this.addNotice.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleNoticeClick = this.handleNoticeClick.bind(this);

    }

    componentDidMount() {
        const { notices } = this.props;
        // this.setState({
        //     selectedNotice: notices[0]
        // })

        this.props.getUsers();
        this.props.getNotices();
        this.props.getComments(1);
        // this.props.getNoticeDetail(1);
    }

    openModal() {
        console.log('asdf')
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false, commentModalIsOpen: false });
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    addNotice(e) {
        e.preventDefault();
        console.log('asf')
        const { title, description } = this.state;
        let noticeToAdd = {
            title: title,
            description: description,
            user_id: 1
        }
        console.log(noticeToAdd)
        this.props.addNotice(noticeToAdd);
        // call add comment
        this.setState({ modalIsOpen: false });
        this.setState({ notice: '' })
    }

    addComment(e) {
        e.preventDefault();
        const { comment, selectedNotice } = this.state;
        const { addComment } = this.props
        let commentToAdd = {
            message: comment,
            notice_id: selectedNotice.id,
            user_id: 1
        }
        addComment(commentToAdd);
        // call add comment
        this.setState({ comment: '' })
        console.log(comment)
    }

    handleNoticeClick(notice) {
        this.setState({ selectedNotice: notice, commentModalIsOpen: true });
        // this.props.getNoticeDetail(noticeId);
        this.props.getComments(notice.id);
        console.log('asdf')
    }


    render() {
        const { user, users, notices, comments } = this.props;
        const { notice, comment, selectedNotice, title, description } = this.state;
        return (
            <div className="container">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <div className="flex justify-between">
                        <h2 ref={subtitle => this.subtitle = subtitle}>Create New post</h2>
                        <button onClick={this.closeModal}>close</button>

                    </div>

                    <form className="mt-4" name="noticeForm" onSubmit={this.addNotice}>
                        <input
                            className="focus:outline-none w-full rounded border border-gray-400 p-2 text-sm text-gray-900 leading-relaxed focus:border-blue-500 mb-4"
                            type="text" name="title" placeholder="Title" value={title} onChange={this.handleChange} />
                        <input
                            className="focus:outline-none w-full rounded border border-gray-400 p-2 text-sm text-gray-900 leading-relaxed focus:border-blue-500"
                            type="text" placeholder="Description" name="description" value={description} onChange={this.handleChange} />

                        <button className="mt-4 cursor-pointer border border-green-500 rounded rounded-full py-2 text-white bg-green-800 px-5 hover:bg-green-700" type="submit"> Create</button>
                    </form>
                </Modal>
                <Modal
                    isOpen={this.state.commentModalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div style="width:500px;">


                        <div className="flex justify-between">
                            <h2 ref={subtitle => this.subtitle = subtitle}>Comments</h2>
                            <button onClick={this.closeModal}>close</button>

                        </div>
                        <div>
                            <div className="relative">
                                <div className="h-48vh overflow-auto">
                                    {comments.items &&
                                        <div>
                                            {comments.items.map((comment, index) =>
                                                <div className="flex mt-5" key={comment.id}>
                                                    <div className="rounded-full overflow-hidden w-8 h-8 mr-2 flex-shrink-0">
                                                        <img className="w-full h-full"
                                                            src={comment.user.avatar_path}
                                                            alt="" />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-900">{comment.user.username}</p>
                                                        <p className="text-sm mb-3 font-8E8E8E">{comment.message}</p>
                                                        <div className="flex mt-2">
                                                            <span className="text-xs text-green-500">Dec 10 | </span>
                                                            <svg className="w-4 ml-2"
                                                                viewBox="0 0 12 12"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M1.5 8.625V10.5H3.375L8.905 4.97L7.03 3.095L1.5 8.625ZM10.355 3.52C10.55 3.325 10.55 3.01 10.355 2.815L9.185 1.645C8.99 1.45 8.675 1.45 8.48 1.645L7.565 2.56L9.44 4.435L10.355 3.52Z"
                                                                    fill="#C6C6C6" />
                                                            </svg>

                                                            <svg className="w-4 ml-2"
                                                                viewBox="0 0 12 12"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M3 9.5C3 10.05 3.45 10.5 4 10.5H8C8.55 10.5 9 10.05 9 9.5V3.5H3V9.5ZM9.5 2H7.75L7.25 1.5H4.75L4.25 2H2.5V3H9.5V2Z"
                                                                    fill="#C6C6C6" />
                                                            </svg>

                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    }

                                </div>
                                <form name="form" onSubmit={this.addComment}>
                                    <div className="w-full border border-gray-500 h-8 flex justify-between p-2 items-center rounded">

                                        <input className="w-full h-full"
                                            type="text" name="comment" value={comment} onChange={this.handleChange} />
                                        <button><svg width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.005 10.5L11.5 6L1.005 1.5L1 5L8.5 6L1 7L1.005 10.5Z"
                                                fill="#3DB3CC" />
                                        </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {!selectedNotice.user &&
                            <div className="flex items-center justify-center flex-1">
                                <span>Select a notice to view detail</span>
                            </div>
                        }
                    </div>

                </Modal>
                <div className="justify-between flex items-center px-6">
                    <div className="flex items-center">
                        <h1 className="text-4xl">Posts</h1>
                    </div>
                    <div>
                        <Link to="/login"
                            className="border border-red-500 rounded rounded-full py-2 text-white bg-red-800 px-5 hover:bg-red-700 ml-4" >Logout
                    </Link>
                    </div>

                </div>

                <div className="flex p-5">

                    <div className="w-full border-l border-r flex-shrink-0">

                        <div className="p-6 hover:bg-green-100 cursor-pointer" key={notice.id} onClick={this.openModal}>
                            <h2 className="text-sm font-bold mb-1">Create new post</h2>
                            <p className="text-sm leading-none leading-normal font-8E8E8E">You can create a new post here.</p>
                        </div>
                        {notices.items &&
                            <div className="">
                                {notices.items.map((notice, index) =>
                                    <div className="p-6 hover:bg-green-100 cursor-pointer" key={notice.id} onClick={() => this.handleNoticeClick(notice)}>
                                        <h2 className="text-sm font-bold mb-1">{notice.title}</h2>
                                        <p className="text-sm leading-none leading-normal font-8E8E8E">{notice.description}</p>

                                        <div className="flex mt-2">
                                            <span className="text-xs text-green-500">Dec 10 | </span>
                                            <svg className="w-4 ml-2"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1.5 8.625V10.5H3.375L8.905 4.97L7.03 3.095L1.5 8.625ZM10.355 3.52C10.55 3.325 10.55 3.01 10.355 2.815L9.185 1.645C8.99 1.45 8.675 1.45 8.48 1.645L7.565 2.56L9.44 4.435L10.355 3.52Z"
                                                    fill="#C6C6C6" />
                                            </svg>

                                            <svg className="w-4 ml-2"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M3 9.5C3 10.05 3.45 10.5 4 10.5H8C8.55 10.5 9 10.05 9 9.5V3.5H3V9.5ZM9.5 2H7.75L7.25 1.5H4.75L4.25 2H2.5V3H9.5V2Z"
                                                    fill="#C6C6C6" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }

                        {!notices.items && <div>No Items</div>}




                    </div>
                    {/*{selectedNotice.user && 
                    <div className="p-6 flex-1">
                        <div>
                            <h1 className="text-xl font-semibold mb-3">{selectedNotice.title}</h1>
                            <p className="text-sm mb-3 font-8E8E8E">{selectedNotice.description}</p>
                            {selectedNotice.user &&

                                <div className="flex mb-8">

                                    <div className="rounded-full overflow-hidden w-8 h-8 mr-2">
                                        <img className="w-full h-full"
                                            src={selectedNotice.user.avatar_path}
                                            alt="" />
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-900">{selectedNotice.user.username}</span>
                                        <span className="text-xs text-green-500">Dec 10</span>
                                    </div>
                                </div>
                            }

                        </div>


                         <div className="none">
                            <h1 className="text-lg mb-4">Comments</h1>
                            <div className="relative">
                                <div className="h-48vh overflow-auto">
                                    {comments.items &&
                                        <div>
                                            {comments.items.map((comment, index) =>
                                                <div className="flex mt-5" key={comment.id}>
                                                    <div className="rounded-full overflow-hidden w-8 h-8 mr-2 flex-shrink-0">
                                                        <img className="w-full h-full"
                                                            src={comment.user.avatar_path}
                                                            alt="" />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-900">{comment.user.username}</p>
                                                        <p className="text-sm mb-3 font-8E8E8E">{comment.message}</p>
                                                        <div className="flex mt-2">
                                                            <span className="text-xs text-green-500">Dec 10 | </span>
                                                            <svg className="w-4 ml-2"
                                                                viewBox="0 0 12 12"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M1.5 8.625V10.5H3.375L8.905 4.97L7.03 3.095L1.5 8.625ZM10.355 3.52C10.55 3.325 10.55 3.01 10.355 2.815L9.185 1.645C8.99 1.45 8.675 1.45 8.48 1.645L7.565 2.56L9.44 4.435L10.355 3.52Z"
                                                                    fill="#C6C6C6" />
                                                            </svg>

                                                            <svg className="w-4 ml-2"
                                                                viewBox="0 0 12 12"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M3 9.5C3 10.05 3.45 10.5 4 10.5H8C8.55 10.5 9 10.05 9 9.5V3.5H3V9.5ZM9.5 2H7.75L7.25 1.5H4.75L4.25 2H2.5V3H9.5V2Z"
                                                                    fill="#C6C6C6" />
                                                            </svg>

                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    }

                                </div>
                                <form name="form" onSubmit={this.addComment}>
                                    <div className="w-full border border-gray-500 h-8 flex justify-between p-2 items-center rounded">

                                        <input className="w-full h-full"
                                            type="text" name="comment" value={comment} onChange={this.handleChange} />
                                        <button><svg width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.005 10.5L11.5 6L1.005 1.5L1 5L8.5 6L1 7L1.005 10.5Z"
                                                fill="#3DB3CC" />
                                        </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div> 
                    </div>
                    }
                    {!selectedNotice.user && 
                    <div className="flex items-center justify-center flex-1">
                        <span>Select a notice to view detail</span>
                    </div>
                        }*/}
                </div>
            </div>

        );
    }
}

// MAP STATE TO UI
function mapState(state) {
    const { users, authentication, notices, comments } = state;
    const { user } = authentication;
    return { user, users, notices, comments };
}

// REGISTER EVENTS
const actionCreators = {
    getUsers: userActions.getAll,
    getNotices: noticeActions.getAll,
    deleteUser: userActions.delete,
    getComments: commentActions.getComments,
    getNoticeDetail: noticeActions.getNoticeDetail,
    addComment: commentActions.addComment,
    addNotice: noticeActions.addNotice,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };