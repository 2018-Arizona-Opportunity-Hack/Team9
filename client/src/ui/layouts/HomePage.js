import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Form,
  TextArea
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MyComponent from '../components/MyComponent';
import axios from 'axios';


class HomepageHeading extends Component {
  render() {
    const { mobile, fileUpload } = this.props;
    return (
      <Container text>
        <Header
          as="h1"
          content="Children Cancer Network"
          inverted
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em'
          }}
        />
        <Header
          as="h2"
          content="Customized Notification Service"
          inverted
          style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em'
          }}
        />

        <Button animated="fade">
          <Button.Content visible>Please Upload Your File Here</Button.Content>
          <Button.Content hidden>
            <input type="file" id="csv" name="csv" accept=".csv" onChange={this.uploadFile} />
          </Button.Content>
        </Button>
      </Container>
    );
  }
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

class DesktopContainer extends Component {
  state = {};

  logout = () => {
    sessionStorage.clear();
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" />
                <Menu.Item as="a" />
                <Menu.Item as="a" />
                <Menu.Item as="a" />
                <Menu.Item position="right">
                  <Button inverted style={{ marginLeft: '0.5em' }}>
                    <a href="https://www.childrenscancernetwork.org/" target="_blank">
                      Website
                    </a>
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: '0.5em' }}
                    onClick={this.logout}
                  >
                    <Link to={{ location: '/', state: { auth: false } }}>Log Out</Link>
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading fileUpload={this.props.fileUpload} />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="uncover" inverted vertical visible={sidebarOpened}>
            <Menu.Item as="a" active />
            <Menu.Item as="a">Log Out</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right" />
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};


const ResponsiveContainer = ({ children, fileUpload }) => {
  return (
    <div>
      <DesktopContainer fileUpload={fileUpload}>{children}</DesktopContainer>
      <MobileContainer fileUpload={fileUpload}>{children}</MobileContainer>
    </div>
  );
};


ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

class HomepageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      selectedFile: null,
      error: false
    };
  }

  uploadFile = event => {
    console.log('event', event);
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitData = () => {
    if (!this.state.message || !this.state.selectedFile) {
      this.setState({ error: 'Message and file are both required' });
      return;
    }
    const formData = new FormData();
    formData.append('file', new Blob([this.state.selectedFile]));
    console.log(formData);
    axios
      .post('/send/message', formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state);
    console.log(this.props);
    return (

      <ResponsiveContainer fileUpload={this.uploadFile}>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <MyComponent />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="right">
                <Form>
                  <TextArea
                    autoHeight
                    placeholder="Try adding multiple lines"
                    style={{ minHeight: 100 }}
                    name="message"
                    onChange={this.handleChange}
                    value={this.state.message}
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="huge" onClick={this.submitData}>
                  Submit
                </Button>
                {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item>
                      <a href="https://www.childrenscancernetwork.org/" target="_blank">
                        Website
                      </a>
                    </List.Item>
                    <List.Item>
                      <a href="https://www.salesforce.com/" target="_blank">
                        Salesforce
                      </a>
                    </List.Item>
                    <List.Item>
                      <a
                        href="https://github.com/2018-Arizona-Opportunity-Hack/Team9"
                        target="_blank"
                      >
                        Work Source
                      </a>
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="">Trevor</List.Item>
                    <List.Item as="">Sepideh</List.Item>
                    <List.Item as="">Mohammad</List.Item>
                    <List.Item as="">Badri</List.Item>
                    <List.Item as="">Jonnathan</List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </ResponsiveContainer>
    );
  }
}

export default HomepageLayout;
