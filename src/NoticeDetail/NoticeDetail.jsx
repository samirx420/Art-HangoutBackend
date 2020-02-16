import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//IMPORT ACTIONS
import { noticeActions, commentActions } from '../_actions';

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

class NoticeDetail extends React.Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            comment: ''
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        const { params } = this.props.match
        this.props.getNoticeDetail(params.id);
        this.props.getComments(params.id);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    addComment(e) {
        e.preventDefault();
        const { comment } = this.state;
        const { match , addComment} = this.props
        const { params} = match
        let commentToAdd = {
            body: comment,
            noticeId: params.id
        }
        addComment(commentToAdd);
        // call add comment
        this.setState({ comment: '' })
        console.log(comment)
    }
    render() {
        const { notices, comments } = this.props;
        const { comment } = this.state;
        return (
            <div>
                <Link to="/">Back to Notice</Link>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>

                {notices.notice &&
                    <div>
                        <span>{notices.notice.id}</span>
                        <span>{notices.notice.title}</span>
                    </div>
                }
                {comments.items &&
                    <ul>
                        {comments.items.map((comment, index) =>
                            <li key={comment.id} onClick={() => console.log('x')}>
                                <Link to="/notice/1">{comment.body}</Link>
                            </li>
                        )}
                    </ul>
                }

                <form name="form" onSubmit={this.addComment}>
                    <input type="text" className="form-control" name="comment" value={comment} onChange={this.handleChange} />
                    <button className="btn btn-primary">Comment</button>
                </form>

            </div>
        );
    }
}


// MAP STATE TO UI
function mapState(state) {
    const { notices, comments } = state;
    return { notices, comments };
}

// REGISTER EVENTS
const actionCreators = {
    getNoticeDetail: noticeActions.getNoticeDetail,
    getComments: commentActions.getComments,
    addComment: commentActions.addComment,
}

const connectedNoticeDetail = connect(mapState, actionCreators)(NoticeDetail);
export { connectedNoticeDetail as NoticeDetail };