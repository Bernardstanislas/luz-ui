import React, {Component} from 'react';
import 'react-toolbox/lib/commons.scss';
import {attemptLogin} from '../../actions';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

class Home extends Component {
    _handleLoginClick() {
        const {dispatch} = this.props;
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        dispatch(attemptLogin(email, password));
    }

    render() {
        return (
            <div>
                <Input type='email' label='Email address' icon='email'/>
                <input type='email' ref='email'/>
                <input type='password' ref='password'/>
                <Button onClick={this._handleLoginClick.bind(this)} label='Log me in' raised accent />
                {JSON.stringify(this.props)}
            </div>
        )
    }
}

export default Home;
