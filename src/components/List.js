import React from 'react';
import { connect } from 'react-redux';
import UserCard from './UserCard';
import NavBar from './NavBar';
import { Redirect } from 'react-router-dom';


class UsersList extends React.Component {

    getSortedUsers() {
        const users = this.props.users;
        const sorted = Object.values(users).sort((a, b) => {
            const numA = a.questions.length + Object.keys(a.answers).length;
            const numB = b.questions.length + Object.keys(b.answers).length;
            return numB - numA;
        })
        return sorted.map(u => u.id);
    }

    render() {

        if (this.props.authedUser === null)
            return <Redirect to={{
                pathname: '/signin',
                state: { from: this.props.history.location }
            }} />;

        return (
            <React.Fragment>
                <NavBar />
                <div className="main">
                    <ul className="user-cards-list">
                        {
                            this.getSortedUsers().map(id => <li key={id} className="user-card"><UserCard uid={id} /></li>)
                        }
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        authedUser: state.authedUser,
        users: state.users,
    }
}

export default connect(mapStateToProps)(UsersList);