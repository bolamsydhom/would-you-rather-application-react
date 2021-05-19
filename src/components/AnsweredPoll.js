import React from 'react';
import { connect } from 'react-redux';

class AnsweredPoll extends React.Component {


    getAuthorInfo = id => {
        const {questions, users} = this.props;
        // console.log(questions);
        return {
            name: users[questions[id].author].name,
            img: users[questions[id].author].avatarURL,
        }
    }

    getQuestInfo = id => {
        const {questions} = this.props;
        return {
            text_1: questions[id].optionOne.text,
            text_2: questions[id].optionTwo.text,
            optionOne: questions[id].optionOne.votes.length,
            optionTwo: questions[id].optionTwo.votes.length
        }
    }

    getChoice = id => {
        return this.props.users[this.props.authedUser]['answers'][id];
    }

    render() {
        const {qid} = this.props;
        const choice = this.getChoice(qid);
        const questionInfo = this.getQuestInfo(qid);
        const votes = questionInfo['optionOne'] + questionInfo['optionTwo'];
        const authorInfo = this.getAuthorInfo(qid);
        let progress = (questionInfo[choice] * 100 / (votes));
        progress = Number.isInteger(progress) ? progress : progress.toFixed(2);
        const widths = {
            one: choice === 'optionOne' ? progress : 100 - progress,
            two: choice === 'optionTwo' ? progress : 100 - progress
        }
        return (
            <div className="a-poll">
                <div className="author">
                    {`Asked by ${authorInfo.name}`}
                </div>
                <div className="content">
                    <div className="avatar-container">
                        <div className="avatar" style={{ backgroundImage: `url(${authorInfo.img})` }}></div>
                    </div>
                    <div className="card-info">
                        <span>Results:</span>
                        <div className={choice === 'optionOne' ? 'chosen' : ''}>
                            <p>{`Would you rather ${questionInfo.text_1}?`}</p>
                            <div className="progress">
                                <div className="bar" style={{ width: `${widths.one}%` }}>{`${widths.one}%`}</div>
                            </div>
                            <span className="votes">{`${questionInfo['optionOne']} out of ${votes}`}</span>
                            {choice === 'optionOne' && <i className="fas fa-check-circle"></i>}
                        </div>
                        <div className={choice === 'optionTwo' ? 'chosen' : ''}>
                            <p>{`Would you rather ${questionInfo.text_2}?`}</p>
                            <div className="progress">
                                <div className="bar" style={{ width: `${widths.two}%` }}>{`${widths.two}%`}</div>
                            </div>
                            <span className="votes">{`${questionInfo['optionTwo']} out of ${votes}`}</span>
                            {choice === 'optionTwo' && <i className="fas fa-check-circle"></i>}
                        </div>
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
    }
}

export default connect(mapStateToProps)(AnsweredPoll);