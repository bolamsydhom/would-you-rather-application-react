import React from "react";
import { handleInitialData } from "../redux/actions/shared";
import { recieveUsers } from "../redux/actions/users";
import { setAuthedUser } from "../redux/actions/authedUser";
import { connect } from "react-redux";
import NavBar from "./NavBar";

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      users: {},
    };
  }
  componentDidMount() {
    //   this.props.recieveUsers();
    this.props.handleInitialData();
    this.generateDropdownData();
    this.setState({ users: this.props.users });
    // console.log("vvvvvvv", this.props);
  }

  
  handleSignIn = () => {
    // const { dispatch } = this.props;
    const userName = this.ref.current.value;
    const id = userName.replace(" ", "").toLowerCase();
    this.props.setAuthedUser(id);
    console.log(id);
    const to = this.props.location.state
      ? this.props.location.state.from.pathname
      : "/";
    setTimeout(() => {
      this.props.history.push(to);
    }, 1000);
  };



  generateDropdownData = () => {
    const { users } = this.state;
    console.log(users);
    const userArr = [];
    for (const key in users) {
        if (Object.hasOwnProperty.call(users, key)) {
            const user = users[key];
            userArr.push({
                key: user.id,
                text: user.name,
                value: user.id,
                image: { avatar: true, src: user.avatarURL },
              });
        }
    }
    console.log(userArr);
    return userArr;
  };

  render() {
    console.log(this.generateDropdownData());
    return (
      <React.Fragment>
        <NavBar />
        <div className="sign-in">
          <div className="header">
            <p>Welcome to the Would You Rather App!</p>
            <span>please sign in to continue</span>
          </div>
          <select ref={this.ref}>
            {this.generateDropdownData()?.map((feature) => (
              <option key={feature.key} id={feature.key} value={feature.value}>
                {feature.text}
              </option>
            ))}
          </select>
          <button type="button" onClick={this.handleSignIn}>
            Sign in
          </button>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
    // console.log(state);
  return {
    users: state.users,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setAuthedUser: (id) => dispatch(setAuthedUser(id)),
    recieveUsers: () => dispatch(recieveUsers()),
    handleInitialData: () => dispatch(handleInitialData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
