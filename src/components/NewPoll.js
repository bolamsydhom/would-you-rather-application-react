import React from 'react';
import { connect } from 'react-redux';
import { saveQuestion } from '../redux/actions/shared'
import { Link, Redirect } from 'react-router-dom';
import NavBar from './NavBar';


class NewPoll extends React.Component {

    refOne = React.createRef();
    refTwo = React.createRef();

    newPollHandler = () => {
        this.props.dispatch(saveQuestion({
            optionOneText: this.refOne.current.value.trim(),
            optionTwoText: this.refTwo.current.value.trim(),
            author: this.props.authedUser,
        }));
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
                <div className="new-poll">
                    <p>Create New Question</p>
                    <p>Would you rather...</p>
                    <form>
                        <input type="text" id="ans1" name="ans1" placeholder="Enter Option One Text Here" ref={this.refOne} />
                        <fieldset>
                            <legend>OR</legend>
                        </fieldset>
                        <input type="text" id="ans2" name="ans2" placeholder="Enter Option Two Text Here" ref={this.refTwo} />
                        <button type="button" onClick={this.newPollHandler}><Link to="/">Submit</Link></button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        authedUser: state.authedUser
    }
}

export default connect(mapStateToProps)(NewPoll);