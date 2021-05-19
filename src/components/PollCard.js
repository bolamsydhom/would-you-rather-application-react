import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class PollCard extends React.Component {

    getQuestionText = id => {
        const {questions} = this.props;
        const text = questions[id].optionOne.text;
        return text.length > 15 ? text.substr(0, 15) : text;

    }

    getAuthorInfo = id => {
        const {questions,users} = this.props;
        return {
            name: users[questions[id].author].name,
            img: users[questions[id].author].avatarURL,
        }
    }



    render() {
        const {qid} = this.props;
        return (
            <React.Fragment>
                <div className="author">
                    <span className="author-name">{`${this.getAuthorInfo(qid).name} `}</span>
                    <span> asks: </span>
                </div>
                <div className="avatar-container">
                    <div className="avatar" style={{ backgroundImage: `url(${this.getAuthorInfo(qid).img})` }}></div>
                <div className="card-info">
                    <span>Would you rather</span>
                    <span>{`${this.getQuestionText(qid)}`}</span>
                    <button type="button"><Link to={`/questions/${qid}`}>view poll</Link></button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        ...state,
        ...props,
    }
}

export default connect(mapStateToProps)(PollCard);