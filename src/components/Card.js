import React from 'react';
import { connect } from 'react-redux';

class UserCard extends React.Component {

    getUserInfo(uid) {
        const avatar = this.props.users[uid].avatarURL;
        const name = this.props.users[uid].name;
        const answered = Object.keys(this.props.users[uid].answers).length;
        const asked = this.props.users[uid].questions.length;
        return {
            avatar,
            name,
            answered,
            asked,
        }
    }

    render() {

        const { avatar, name, answered, asked } = this.getUserInfo(this.props.uid);

        return (
            <React.Fragment>
                <div className="avatar-container">
                    <div className="avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
                </div>
                <div className="info">
                    <p>{name}</p>
                    <span>{`Answered questions: ${answered}`}</span>
                    <span>{`Created questions: ${asked}`}</span>
                </div>
                <div className="score">
                    <p>Score</p>
                    <div>{answered + asked}</div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        users: state.users,
        ...props,
    }
}

export default connect(mapStateToProps)(UserCard);