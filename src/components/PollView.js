import React from "react";
import UnAnsweredPoll from "./UnAnsweredPoll";
import AnsweredPoll from "./AnsweredPoll";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { Redirect } from "react-router-dom";
import NotFound from "./NotFound";

class PollView extends React.Component {
  isAnsweredQuestion(id) {
    return this.props.users[this.props.authedUser]["answers"][id] !== undefined;
  }


  render() {
    // this.props.authedUser === null && <Redirect to={{ pathname: '/signin', state: { from: this.props.history.location }  }} />;
    if (this.props.authedUser === null)
      return (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: this.props.history.location },
          }}
        />
      );
    const qid = this.props.match.params.id;
    if (!this.props.questions[qid]) return <NotFound />;
    if (this.isAnsweredQuestion(qid))
      return (
        <React.Fragment>
          <NavBar />
          <AnsweredPoll qid={qid} />
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <NavBar />
        <UnAnsweredPoll qid={qid} />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...state,
    ...props,
  };
}

export default connect(mapStateToProps)(PollView);
