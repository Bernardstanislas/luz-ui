import React, {Component} from 'react';
import 'react-toolbox/lib/commons.scss';
import {attemptLogin} from '../../actions';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import './style.scss';
import palette from '../../style/palette.js';

class Home extends Component {
    _handleLoginClick() {
        const {dispatch} = this.props;
        const email = this.refs.email.getValue();
        const password = this.refs.password.getValue();
        dispatch(attemptLogin(email, password));
    }

    render() {
        return (
            <div data-role='login-screen'>
                <Paper zDepth={2}>
                    <div data-role='head'>
                        <div data-role='title'>
                            Welcome to Luz !
                        </div>
                    </div>
                    <div data-role='body'>
                        <div data-role='container'>
                            <TextField
                                floatingLabelText='Email'
                                floatingLabelStyle={{color: palette.primaryColor}}
                                ref='email'
                                type='email'
                                underlineFocusStyle={{borderColor: palette.primaryColor}}
                                />
                            <TextField
                                floatingLabelText='Password'
                                floatingLabelStyle={{color: palette.primaryColor}}
                                ref='password'
                                type='password'
                                underlineFocusStyle={{borderColor: palette.primaryColor}}
                                />
                            <div data-role='login'>
                                <RaisedButton onClick={this._handleLoginClick.bind(this)} label='Log me in' primary={true} />
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default Home;
