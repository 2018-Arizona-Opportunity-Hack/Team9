import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null
    };
  }

  handleClick = () => {
    const that = this;
    axios
      .post(`/authenticate/admin`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(function(response) {
        that.props.history.push({
          pathname: '/home',
          state: { auth: true }
        });
      })
      .catch(error => {
        console.log('ERR', error);
        if (error.response && (error.response.status === 404 || error.response.status === 400)) {
          this.setState({ error: 'Username or password is incorrect' });
        } else {
          this.setState({ error: 'An error has occured' });
        }
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="login-form">
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Message>Welcome</Message>
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <Button color="teal" fluid size="large" onClick={this.handleClick}>
                  Login
                </Button>
                {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
