import React from 'react';
import { connect } from 'react-redux';
import { saveAnswer } from '../redux/actions/shared'
import { Link } from 'react-router-dom';

class UnAnsweredPoll extends React.Component {

    optionOneRef = React.createRef();
    optionTwoRef = React.createRef();

    getQuestionText = qid => {
        const {questions} = this.props;
        return {
            text_1: questions[qid].optionOne.text,
            text_2: questions[qid].optionTwo.text,
        }
    }

    getAuthorInfo = id => {
        const {questions, users} = this.props;
        // console.log(questions);
        return {
            name: users[questions[id].author].name,
            img: users[questions[id].author].avatarURL,
        }
    }

    saveAnswer = () => {
        const uid = this.props.authedUser;
        const qid = this.props.qid;
        if (this.optionOneRef.current.checked)
            this.props.dispatch(saveAnswer(uid, qid, 'optionOne'));
        else if (this.optionTwoRef.current.checked)
            this.props.dispatch(saveAnswer(uid, qid, 'optionTwo'));
    }

    render() {
        const {qid} = this.props;

        return (
            <div className="u-poll" >
                <div className="author">
                    <span className="author-name">{`${this.getAuthorInfo(qid).name} `}</span>
                    <span> asked: </span>
                </div>
                <div className="poll-card card">
                    <div className="avatar-container">
                        <div className="avatar" style={{ backgroundImage: `url(${this.getAuthorInfo(qid).img})` }}></div>
                    </div>
                    <div className="card-info">
                        <span>Would you rather...</span>
                        <input type="radio" name="option" id="o1" value={`${this.getQuestionText(qid).text_1}`} ref={this.optionOneRef} defaultChecked />
                        <label htmlFor="o1">{`${this.getQuestionText(qid).text_1}`}</label>
                        <br />
                        <input type="radio" name="option" id="o2" value={`${this.getQuestionText(qid).text_2}`} ref={this.optionTwoRef} />
                        <label htmlFor="o2">{`${this.getQuestionText(qid).text_2}`}</label>
                        <br />
                        <button type="button" onClick={this.saveAnswer}><Link to={`/questions/${qid}`}>submit</Link></button>
                    </div>
                </div>
            </div>
        );

    }
}

function mapStateToProps(state, props) {
    return {
        ...state,
        ...props,
    };
}

export default connect(mapStateToProps)(UnAnsweredPoll);