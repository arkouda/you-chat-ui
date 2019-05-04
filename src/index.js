import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import Chat from './Chat';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoreApp = () => (
    <div>
        <ToastContainer />
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginPage}></Route>
                <Route path="/signin" component={SignIn}></Route>
                <Route path="/signup" component={SignUp}></Route>
                <Route path="/chat" component={Chat}></Route>

                {/* <Redirect from="/" to="/login"></Redirect> */}
            </Switch>
        </BrowserRouter>
    </div>
);

ReactDOM.render(<CoreApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();



