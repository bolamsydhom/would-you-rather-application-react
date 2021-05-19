import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import Home from './components/Home';
import PollView from './components/PollView';
import NewPoll from './components/NewPoll';
import UsersList from './components/UsersList';
import NotFound from './components/NotFound';

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={SignInForm} />
                <Route exact path="/questions/:id" component={PollView} />
                <Route exact path="/add" component={NewPoll} />
                <Route exact path="/leaderboard" component={UsersList} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default App;
