import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpFlag: false
        }
    }

    toggleLoginPage = () => {
        this.setState({ signUpFlag: !(this.state.signUpFlag) });
        console.log('toggled');
    }

    render = () => {
        return (
            <div>
                {this.state.signUpFlag}
                {this.state.signUpFlag === true && <div>
                    <SignUp toggle={this.toggleLoginPage} history={this.props.history}/>
                </div>}
                {this.state.signUpFlag === false && <div>
                    <SignIn toggle={this.toggleLoginPage} history={this.props.history}/>
                </div>}
            </div>
        )
    }
}

export default LoginPage;
